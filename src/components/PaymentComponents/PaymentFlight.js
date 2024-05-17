import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import '../../styles/PaymentFlightStyles.css'
import PaymentInput from './PaymentInput';

const PaymentFlight = () => {
    const [getBookingOptionsSelected, setBookingOptionsSelected] = useLocalStorage('bookingOptionsSelected');
    const [bookingOptions, setBookingOptions] = useState({});
    const [getBookingDataSelected, setBookingDataSelected] = useLocalStorage('bookingDataSelected');
    const [bookingData, setBookingData] = useState({});
    const [getBookingNameSelected, setBookingNameSelected] = useLocalStorage('bookingNameSelected');
    const [bookingName, setBookingName] = useState({});
    const [expiry, setExpiry] = useState('');
    const [validExpiryDate, setValidExpiryDate] = useState(true);

    const [name,setName]=useState('');
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    useEffect(() => {
        const bookingNameSelected = getBookingNameSelected();
        setBookingName(bookingNameSelected)
        if (bookingNameSelected && bookingNameSelected.length!==0){
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const bookingOptionsSelected = getBookingOptionsSelected();
        const bookingDataSelected = getBookingDataSelected();
        setBookingOptions(bookingOptionsSelected);
        setBookingData(bookingDataSelected)
        if (bookingOptionsSelected===undefined || bookingOptionsSelected.length===0) {
            navigate("/");
        } else if (bookingDataSelected===undefined || bookingDataSelected.length===0){
            navigate("/");
        }
    }, [navigate]);
 
    const handlePayed= async (e) =>{
        const personalInfo= {
            name
          };

        await setBookingNameSelected(personalInfo);
        navigate("/confirmation");
    }

    const handleExpiryChange = (e) => {
        let newExpiry = e.target.value;

        if (newExpiry.length === 2 && expiry.length === 1 && newExpiry[newExpiry.length - 1] !== '/') {
            newExpiry += '/';
        }

        setExpiry(newExpiry);

        if (newExpiry.length === 5){
            const [month, year] = newExpiry.split('/');
            const currentYear = new Date().getFullYear() % 100;

            const monthNum = parseInt(month, 10);
            const yearNum = parseInt(year, 10);

            var isExpiryDateValid = yearNum > currentYear || (yearNum === currentYear && monthNum >= new Date().getMonth() + 1)
            setValidExpiryDate(isExpiryDateValid);
        }
    };

    return (
        <div>
            <div className="payment-container">  
                <form onSubmit={handlePayed} className="payment-form">
                    <h2 className="payment-title">Last step to go</h2>
                    <PaymentInput label="Name" id="name" name="name" type="text" value={name} onChange={handleNameChange} pattern="[A-Za-z\s]{1,50}" classNames={"payment-group"} required />
                    <PaymentInput label="Card number" id="card" name="card" type="text" classNames={"payment-group"} pattern="[0-9]{16}" maxLength={16} required />
                    <div className='payment-group payment-grid-group'>
                        <div className="payment-shared-group row-group">
                            <PaymentInput label="Expiration date" id="expiry_date" name="expiry_date" value={expiry} type="text" classNames={"payment-shared-group row-group"} pattern="(0[1-9]|1[0-2])\/([0-9]{2})" maxLength={5} placeholder="MM/YY" valid={validExpiryDate} onChange={handleExpiryChange} required />
                        </div>
                        <div className="payment-shared-group row-group">
                            <PaymentInput label="CVC" id="cvc" name="cvc" type="text" pattern="[0-9]{3}" maxLength={3} required />
                        </div>
                    </div>
                    <br/>
                    <div className="payment-amount">
                        Total Amount: <b>{bookingData.totalPrice}€</b>
                    </div>
                    <div className="payment-form-button">
                        <button type="submit" className="payment-submit" disabled={!validExpiryDate}><b>Pay</b></button>
                    </div>
                </form> 
            </div>
        </div>
    );
}

export default PaymentFlight;

import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import img_takeoff from '../../images/takeoff.png';
import img_landing from '../../images/landing.png';
import '../../styles/SelectFlightStyles.css'
import { TotalPrice } from './TotalPrice';
import { FlightInfo } from './FlightInfo';
import { FlightTable } from './FlightTable';
import useSchedules from '../../hooks/useSchedules';

const SelectFlight = () => {
    const schedules = useSchedules();
    const navigate = useNavigate();

    const [selection, setSelection] = useState({ origin: null, destination: null });
    const [showAllOptions, setShowAllOptions] = useState({ origin: true, destination: true});
    const [showOptions, setShowOptions] = useState(false);
    const [getBookingDataSelected, setBookingDataSelected] = useLocalStorage('bookingDataSelected')
    const [getBookingNameSelected, setBookingNameSelected] = useLocalStorage('bookingNameSelected')
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [bookingData, setBookingData] = useState({});
    const [bookingOptions, setBookingOptions] = useState({});

    const [getBookingOptionsSelected, setBookingOptionsSelected] = useLocalStorage('bookingOptionsSelected');
   
    useEffect(() => {
        const name = getBookingNameSelected();
        if (name && name.length!==0){
            navigate("/");
        }else{
            localStorage.removeItem('bookingNameSelected');
            localStorage.removeItem('bookingDataSelected');
        }
    }, [navigate]);
    
    useEffect(() => {
        const options = getBookingOptionsSelected();
        setBookingOptions(options)
        if (options===undefined || options.length===0) {
          navigate("/");
        } else{
            setShowOptions(true);
        }
    }, [navigate]);


    const handleSelection = (type, index) => {
        const selected = type === 'origin' ? departureSchedules[index] : arrivalSchedules[index];
        let newTotalPrice = totalPrice;
        if (selection[type] !== null) {
            const selectedFlight = type === 'origin' ? departureSchedules[selection[type]] :  arrivalSchedules[selection[type]];
            if (type === 'origin' ? setOrigin(null): setDestination(null));
            setSelection(prevState => ({...prevState, [type]: null}));            
            setShowAllOptions(prevState => ({...prevState, [type]: !showAllOptions[type]}));
            newTotalPrice -= selectedFlight.price;
        } else { 
            if (type === 'origin' ? setOrigin(selected): setDestination(selected));
            setSelection(prevState =>({...prevState, [type]: index}));
            setShowAllOptions(prevState => ({...prevState, [type]: !showAllOptions[type]}));
            
            newTotalPrice += selected.price;
        }
        setTotalPrice(newTotalPrice);
    };

    const handlePayment = async (e) => {
        if (selection.origin === null || selection.destination === null) {
          console.error('Origin and destination must be selected.');
          return;
        }
        const bookingItems = {
          origin: origin,
          destination: destination,
          totalPrice
        };
        await setBookingDataSelected(bookingItems);
        navigate('/payment');
    };

    const departureSchedules = schedules.slice(0, Math.ceil(schedules.length / 2));
    const arrivalSchedules = schedules.slice(schedules.length / 2);
    return (
        <div>
            {showOptions ?
                <div>
                    <FlightInfo origin={bookingOptions.originData} destination={bookingOptions.destinationData} startDate={bookingOptions.startDate} img={img_takeoff} />
                    <FlightTable showAllOptions={showAllOptions.origin} schedules={departureSchedules} origin={bookingOptions.originData} type="origin" destination={bookingOptions.destinationData} selectedIndex={selection.origin} handleSelection={handleSelection} />

                    <br/>
                    <FlightInfo origin={bookingOptions.destinationData} destination={bookingOptions.originData} startDate={bookingOptions.endDate} img={img_landing} />
                    <FlightTable showAllOptions={showAllOptions.destination} schedules={arrivalSchedules} origin={bookingOptions.destinationData} type="destination" destination={bookingOptions.originData} selectedIndex={selection.destination} handleSelection={handleSelection} />

                    <br/>
                    <TotalPrice totalPrice={totalPrice} selectedDepartureIndex={selection.origin} selectedArrivalIndex={selection.destination} handlePayment={handlePayment} />
                </div>
                : null }
        </div>
    );
}

export default SelectFlight;

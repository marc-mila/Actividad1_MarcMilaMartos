import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import "../../styles/ConfirmationFlightStyles.css";
import visitIcon from "../../images/visitIcon.png";
import locationIcon from "../../images/locationIcon.png";
import planeRight from "../../images/planeRight.png";
import planeLeft from "../../images/planeLeft.png";
import ConfirmationInfoJourney from './ConfirmationInfoJourney';

const ConfirmationFlight = () => {
    const [getBookingOptionsSelected, setBookingOptionsSelected] = useLocalStorage('bookingOptionsSelected');
    const [getBookingDataSelected, setBookingDataSelected] = useLocalStorage('bookingDataSelected');
    const [getBookingNameSelected, setBookingNameSelected] = useLocalStorage('bookingNameSelected');
    const [bookingOptions, setBookingOptions] = useState({});
    const [bookingData, setBookingData] = useState({});
    const [bookingName, setBookingName] = useState({});

    const [viewPage, setViewPage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const options = getBookingOptionsSelected();
        setBookingOptions(options);
        const name = getBookingNameSelected();
        setBookingName(name);
        const data = getBookingDataSelected();
        setBookingData(data);
        if (options===undefined || options.length===0) {
          navigate("/");
        } else if (name ===undefined || name.length===0){
            navigate("/");
        } else if (data ===undefined || data.length===0){
            navigate("/");
        }else{
            setViewPage(true);
        }
      }, [navigate]);

    useEffect(() => {
        const storedBookingOptions = getBookingOptionsSelected();
        if (storedBookingOptions) {
            setBookingOptions(storedBookingOptions);
        }
    }, []);
    
    const formatDate = (startDate) => {
        const date = new Date(startDate);
        return date.toLocaleDateString('es-ES');
    }; 

    const handleNavigate = () => {
        navigate("/");
    };

    return (
        <div>
            {viewPage && (
                <div className="confirmation-body">
                    <div className="confirmation-container">
                        <div className="confirmation-title">
                            <h2>Congrats {bookingName.name}</h2>
                            <h3>Get ready to enjoy your flight!</h3>
                        </div>
                        <div className="confirmation-content-title">
                            <br/>
                            <b>DEPART</b>
                        </div>
                        <ConfirmationInfoJourney originData={bookingOptions.originData} destinationData={bookingOptions.destinationData} date={bookingOptions.startDate} bookingData={bookingData.origin} formatDate={formatDate} planeIcon={planeRight} originIcon={locationIcon} departureIcon={visitIcon} />

                        <br/>
                        <div className="confirmation-content-title">
                            <br/>
                            <b>RETURN</b>
                        </div>
                        <ConfirmationInfoJourney originData={bookingOptions.destinationData} destinationData={bookingOptions.originData} date={bookingOptions.endDate} bookingData={bookingData.destination} formatDate={formatDate} planeIcon={planeLeft} originIcon={visitIcon} departureIcon={locationIcon} />
                        <div className="confirmation-content-title">
                            <button className="confirmation-button" type="submit" onClick={handleNavigate}>
                                <b className="confirmation-home">Get more flights!</b>
                            </button>
                        </div>                    
                    </div>
                </div>
            )}   
        </div>
    );
}

export default ConfirmationFlight;

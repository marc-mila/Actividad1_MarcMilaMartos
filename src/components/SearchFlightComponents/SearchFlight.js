import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import * as moment from 'moment';
import '../../styles/SearchFlightStyles.css'
import { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import SelectForm from './SelectForm';
import SelectDatePicker from './SelectDatePicker';
import useAirports from '../../hooks/useAirports';

const SearchFlight = () => {
    const { airports, destinationAirportsFetched }  = useAirports();

    const navigate = useNavigate();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [destinationAirports, setDestinationAirports] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const now = new Date();
    now.setDate(now.getDate() + 7);
    const [endDate, setEndDate] = useState(now);
    const [arrivalDisabled, setArrivalDisabled] = useState(true);
    const [bookingOptions, setBookingOptions] = useLocalStorage('bookingOptionsSelected')
    
    registerLocale('enGB', {
        ...enGB,
        options: { ...enGB.options, weekStartsOn: 1}
      });

    useEffect(() => {
            localStorage.removeItem('bookingNameSelected');
            localStorage.removeItem('bookingDataSelected');
            localStorage.removeItem('bookingOptionsSelected');   
    }, [navigate]);

    useEffect(() => {
        if (destinationAirportsFetched) {
            setDestinationAirports(destinationAirportsFetched)
        }
      }, [destinationAirportsFetched]);

    const handleOptionChangeOrigin = (e) => {
        setOrigin(e.target.value);
        setDestinationAirports(airports.filter(a => a.code !== e.target.value));
        setArrivalDisabled(false);
    };

    const handleOptionChangeDestination = (e) => {
        setDestination(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        var endDateDefault = new Date();
        endDateDefault.setDate(date.getDate() + 1)
        if (endDateDefault > endDate) setEndDate(endDateDefault);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSubmit = async (e) => {
        const originData = airports.find(a => a.code === origin);
        const destinationData = airports.find(a => a.code === destination);
        const bookingItems = {
            originData,
            destinationData,
            startDate,
            endDate
          };
        
        await setBookingOptions(bookingItems);
        navigate("/select");
    };

    return (
        <div className="search-container">
            <h2 className="search-form-title">BOOK A FLIGHT</h2>
            <p className="search-form-subtitle">Search for flights and book online.<br/>See our routes and schedules, and discover more about the experience you can look forward to on board.</p>
            <form onSubmit={handleSubmit}>
                <div className="search-form-group">
                    <div className="search-form-groupLeft">
                        <SelectForm id="option-origin" options={airports} value={origin} onChange={handleOptionChangeOrigin} optionTitle="From" />

                        <SelectDatePicker label="startDate" text="Depart " locale="enGB" minDate={moment().toDate()} endDate={startDate.toDateString()} onSelectMethod={handleStartDateChange} required />
                    </div>
                    <div className="search-form-groupRight">
                        <SelectForm id="option-destination" options={destinationAirports} value={destination} onChange={handleOptionChangeDestination} optionTitle="To" disabled={arrivalDisabled}/>
 
                        <SelectDatePicker label="endDate" text="Return " locale="enGB" minDate={moment(startDate).toDate()} endDate={endDate.toDateString()} onSelectMethod={handleEndDateChange} required />
                    </div>
                </div>
                <br/>
                <div className="search-form-button">
                    <button type="submit" className="search-form-submit"><b>Continue</b></button>       
                </div>
            </form>
        </div>
    );
}

export default SearchFlight;

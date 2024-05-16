import React from 'react';
import ConfirmationFlightInfo from './ConfirmationFlightInfo';

const ConfirmationInfoJourney = ({ originData, destinationData, date, bookingData, formatDate, planeIcon, originIcon, departureIcon }) => {
    return (
        <div className="confirmation-content">
            <ConfirmationFlightInfo
                icon={originIcon}
                labelCity={originData.city}
                labelCode={originData.code}
                labelDate={formatDate(date)}
                labelTime={bookingData.departureDate}
            />
            <div className="confirmation-line-horizontal" />
            <div className="confirmation-image-container">
                <div className="confirmation-image-centered">
                    <img src={planeIcon} alt="Imagen"/>
                </div>
            </div>
            <div className="confirmation-line-horizontal" />
            <ConfirmationFlightInfo
                icon={departureIcon}
                labelCity={destinationData.city}
                labelCode={destinationData.code}
                labelDate={formatDate(date)}
                labelTime={bookingData.arrivalDate}
            />
        </div>
    );
}

export default ConfirmationInfoJourney;
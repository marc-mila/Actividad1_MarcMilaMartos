import React from 'react';

const ConfirmationFlightInfo = ({ icon, labelCity, labelCode, labelDate, labelTime }) => {
    return (
        <div className="confirmation-image-container">
            <div className="confirmation-image">
                <img src={icon} alt="flight icon"/>
            </div>
            <div className="confirmation-info">
                <div className="confirmation-label">
                    <label htmlFor="place">{labelCity} ({labelCode})</label>
                </div>
                <div className="confirmation-label">
                    <label htmlFor="date">{labelDate}</label>
                </div>
                <div className="confirmation-label">
                    <label htmlFor="time">{labelTime}</label>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationFlightInfo;
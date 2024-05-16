import React from 'react';

const SelectForm = ({ id, value, onChange, options, optionTitle, disabled = false }) => {
    return (
        <select 
            className="search-form-groupSelect" 
            id={id} 
            value={value} 
            onChange={onChange}
            disabled={disabled} 
            required
        >
            <option value="" disabled hidden>{optionTitle}</option>
            {options.map((option, index) => (
                <option key={index} value={option.code}>{option.city}, {option.country} ({option.code})</option>
            ))}
        </select>
    );
}

export default SelectForm;
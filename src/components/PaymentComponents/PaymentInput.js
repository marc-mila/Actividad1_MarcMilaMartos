import React from 'react';

const FormInput = ({ label, id, name, type, value, onChange, maxLength, pattern, required, placeholder, valid = true, classNames }) => {
    return (
        <div className={classNames}>
            <label htmlFor={id}>{label}</label>
            <input 
                type={type} 
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange} 
                maxLength={maxLength} 
                pattern={pattern} 
                placeholder={placeholder} 
                required={required}
                style={{ borderColor: valid ? '' : 'red' }}
            />
        </div>
    );
}

export default FormInput;
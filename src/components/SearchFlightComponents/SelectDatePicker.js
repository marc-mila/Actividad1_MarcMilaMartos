import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SelectDatePicker = ({label, text, locale, minDate, endDate, onSelectMethod}) => {
    return (
        <div className="search-form-groupLeft-centered">
            <label htmlFor={label}><b className="search-form-b">{text}</b></label>
            <DatePicker 
                locale={locale} 
                className="search-form-groupDate" 
                dateFormat="EEEE dd/MM/YYYY" 
                id={label} 
                minDate={minDate} 
                selected={endDate} 
                onSelect={onSelectMethod} 
                required
            /> 
        </div>
    )
}

export default SelectDatePicker;
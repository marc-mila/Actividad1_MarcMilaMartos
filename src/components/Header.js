import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }
    
    return (
        <div className="header" onClick={handleClick}>
            <h1>UNIR Airlines by</h1><img alt="unirIcon" src="https://www.unir.net/wp-content/uploads/2019/11/Unir_2021_logo_white.svg" className="header-image"/>
        </div>
    );
}
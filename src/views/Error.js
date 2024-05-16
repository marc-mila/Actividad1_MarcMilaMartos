import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import "../styles/ErrorStyles.css";

function Error() {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    };

    return (
        <div>
            <Header />
            <div className="error-body">
                <div className="error-title">
                    <h1>Error 404: URL Not Found</h1>
                    <div className="error-explanation">
                        <p>The specified URL does not exist.</p>
                        <p>Please return back home.</p>
                    </div>
                </div>
                <div className="error-home-button-container">
                    <button className="error-home-button" type="submit" onClick={handleNavigate}>
                        <b className="error-home">Go Home</b>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Error;
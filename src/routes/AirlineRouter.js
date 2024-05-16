import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Search } from '../views/Search';
import Error from '../views/Error';
import { Select } from '../views/Select';
import { Payment } from '../views/Payment';
import { Confirmation } from '../views/Confirmation';

function AirlineRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/select" element={<Select />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AirlineRouter;
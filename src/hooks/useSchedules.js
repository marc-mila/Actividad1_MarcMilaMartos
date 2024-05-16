import { useState, useEffect } from 'react';

const useSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    
    const generateRandomPrice = () => {
        return Math.floor(Math.random() * (200 - 50 + 1)) + 50; 
    };

    const scheduleArray = [
      {id: 0, departureDate: '06:00', arrivalDate: '09:00', price:generateRandomPrice()},
      {id: 1, departureDate: '08:00', arrivalDate: '11:00', price:generateRandomPrice()},
      {id: 2, departureDate: '10:00', arrivalDate: '13:00', price:generateRandomPrice()}, 
      {id: 3, departureDate: '16:00', arrivalDate: '19:00', price:generateRandomPrice()},
      {id: 4, departureDate: '18:00', arrivalDate: '21:00', price:generateRandomPrice()},
      {id: 5, departureDate: '20:00', arrivalDate: '23:00', price:generateRandomPrice()}
    ];

    setSchedules(scheduleArray);
  }, []);

  return schedules;
};

export default useSchedules;
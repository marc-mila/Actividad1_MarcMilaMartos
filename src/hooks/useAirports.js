import { useState, useEffect } from 'react';

const useAirports = () => {
  const [airports, setAirports] = useState([]);
  const [destinationAirportsFetched, setDestinationAirportsFetched] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://freetestapi.com/api/v1/airports?limit=25");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setAirports(jsonData);
        setDestinationAirportsFetched(jsonData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { airports, destinationAirportsFetched };
};

export default useAirports;
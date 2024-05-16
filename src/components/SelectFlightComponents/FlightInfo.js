export const FlightInfo = ({ origin, destination, startDate, img }) => (
    <div className="select-flight-title">
      <img src={img} alt="icon img" className="select-flight-image"/>
      <h2>{origin.city} ({origin.code}) - {destination.city} ({destination.code}) - {formatDate(startDate)}</h2>
    </div>
  );

  const formatDate = (startDate) => {
    const date = new Date(startDate);
    return date.toLocaleDateString('es-ES');
}; 
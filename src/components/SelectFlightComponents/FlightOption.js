export const FlightOption = ({ schedule, origin, destination, index, type, handleSelection }) => (
    <tr>
      <td><b>{origin.code}</b><br/>{schedule.departureDate}</td>
      <td><b>{destination.code}</b><br/>{schedule.arrivalDate}</td>
      <td>
        <button className="select-flight-button" onClick={() => handleSelection(type, index)}>
          <b>{schedule.price} €</b>
        </button>
      </td>
    </tr>
  );
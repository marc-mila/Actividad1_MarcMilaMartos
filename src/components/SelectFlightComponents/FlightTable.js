import { FlightOption } from "./FlightOption";

export const FlightTable = ({ showAllOptions, schedules, origin, destination, selectedIndex, type, handleSelection }) => (
    <div className="select-show-table">
      <table className="select-table">
        <thead>
          <tr>
            <th>DEPARTURE</th>
            <th>ARRIVAL</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
        {showAllOptions ? 
                            schedules.map((s, index) => (
                                <FlightOption key={index} schedule={s} origin={origin} destination={destination} index={index} type={type} handleSelection={handleSelection} />
                              )) :
                            [schedules[selectedIndex]].map((s, index) => (
                                <FlightOption key={index} schedule={s} origin={origin} destination={destination} index={index} type={type} handleSelection={handleSelection} />
                            ))
                        }
        </tbody>
      </table>
    </div>
  );
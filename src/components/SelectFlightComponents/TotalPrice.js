export const TotalPrice = ({ totalPrice, selectedDepartureIndex, selectedArrivalIndex, handlePayment }) => (
    <div className="select-flight-total-price">
      {totalPrice > 0 && selectedDepartureIndex !== null && selectedArrivalIndex !== null && (
        <button type='submit' className="select-flight-payment-button" onClick={handlePayment}>
          <b>CHECKOUT {totalPrice}€</b>
        </button>
      )}
    </div>
  );
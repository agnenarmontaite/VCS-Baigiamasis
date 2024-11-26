import { useState } from 'react';
import ReservationForm from './ReservationForm';
import ReservationConfirmation from './ReservationConfirmation';

function BookingForm() {
  const [reservation, setReservation] = useState(null);

  const handleReservationSubmit = (formData) => {
    console.log('Reservation submitted:', formData);
    setReservation(formData);
  };
  return (
    <div className="p-6">
      <div className="container mx-auto">
        {!reservation ? (
          <ReservationForm onSubmit={handleReservationSubmit} />
        ) : (
          <ReservationConfirmation reservation={reservation} />
        )}
      </div>
    </div>
  );
}

export default BookingForm;

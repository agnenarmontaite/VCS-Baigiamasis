import BookingForm from '../components/BookingForm';

function Booking() {
  return (
    <div className=" min-h-[70vh] flex items-center justify-center">
      <div className="container mx-auto p-6 max-w-7xl">
        <BookingForm />
      </div>
    </div>
  );
}

export default Booking;

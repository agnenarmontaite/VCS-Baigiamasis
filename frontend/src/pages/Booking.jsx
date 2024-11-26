import BookingForm from "../components/BookingForm";

function Booking() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Rezervacija</h2>
        <BookingForm />
      </div>
    </div>
  );
}

export default Booking;

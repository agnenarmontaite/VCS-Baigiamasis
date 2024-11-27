function ReservationConfirmation({ reservation }) {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-600">Reservation approved!</h2>
        <p className="text-gray-600 mt-2">Thank you for making a reservation with us 🤝</p>
      </div>

      <div className="space-y-4">
      <div className="flex items-center">
          <span className="mr-3 text-blue-600">📃</span>
          <span>Category: {reservation.toolType}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3 text-blue-600">🔧</span>
          <span>Tool: {reservation.tool}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3 text-blue-600">📅</span>
          <span>Reservation starts at: {reservation.startDate}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3 text-blue-600">📅</span>
          <span>Reservation finishes at: {reservation.endDate}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3 text-blue-600">🚚</span>
          <span>Pickup location: {reservation.pickupLocation}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3 text-blue-600">⏰</span>
          <span>Reservation status: Approved</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">A confirmation email has been sent to {reservation.contactEmail}</p>
      </div>
    </div>
  );
}

export default ReservationConfirmation;
import { Link } from 'react-router-dom';

function ReservationConfirmation({ reservation }) {
  const reservationData = reservation.reservation;
  const startDate = reservationData.dateRange.from ? new Date(reservationData.dateRange.from).toLocaleDateString() : '';
  const endDate = reservationData.dateRange.to ? new Date(reservationData.dateRange.to).toLocaleDateString() : '';

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 relative p-4 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Reservation Approved!</h2>
            <p className="text-gray-700 mt-2 text-base md:text-lg">Thank you for making a reservation with us 🤝</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-4">📃</span>
                  <span className="text-gray-900 text-sm md:text-base">
                    Category:<span className="ml-2 font-semibold">{reservationData.toolType}</span>
                  </span>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-4">🔧</span>
                  <span className="text-gray-900 text-sm md:text-base">
                    Tool:<span className="ml-2 font-semibold">{reservationData.tool}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-4">📅</span>
                  <span className="text-gray-900 text-sm md:text-base">
                    Starts:<span className="ml-2 font-semibold">{startDate}</span>
                  </span>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-4">📅</span>
                  <span className="text-gray-900 text-sm md:text-base">
                    Ends:<span className="ml-2 font-semibold">{endDate}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-4">🚚</span>
                  <span className="text-gray-900 text-sm md:text-base">
                    Location:<span className="ml-2 font-semibold">{reservationData.pickupLocation}</span>
                  </span>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-4">⏰</span>
                  <span className="text-gray-900 text-sm md:text-base">
                    Status:<span className="ml-2 font-semibold">{reservationData.status}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-900 text-sm md:text-base">
              A confirmation email has been sent to <span className="font-semibold text-red-500">{reservationData.contactEmail}</span>
            </p>
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <Link to="/" className="bg-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-red-600 transition duration-300 inline-block text-sm md:text-base">
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationConfirmation;

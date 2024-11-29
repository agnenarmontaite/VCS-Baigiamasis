import {Link} from 'react-router-dom';

function ReservationConfirmation({ reservation }) {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-xl border-2 border-red500">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-red500">Reservation Approved!</h2>
        <p className="text-gray-700 mt-2 text-lg">Thank you for making a reservation with us 🤝</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center border-b pb-2 border-orange-300">
          <span className="mr-4">📃</span>
          <span className="text-black">Category:<span className='ml-2 font-bold'>{reservation.toolType}</span></span>
        </div>
        <div className="flex items-center border-b pb-2 border-orange-300">
          <span className="mr-4">🔧</span>
          <span className="text-black">Tool:<span className='ml-2 font-bold'>{reservation.tool}</span></span>
        </div>
        <div className="flex items-center border-b pb-2 border-orange-300">
          <span className="mr-4">📅</span>
          <span className="text-black">Reservation Starts:<span className='ml-2 font-bold'>{reservation.startDate}</span></span>
        </div>
        <div className="flex items-center border-b pb-2 border-orange-300">
          <span className="mr-4">📅</span>
          <span className="text-black">Reservation Ends: <span className='ml-3 font-bold'>{reservation.endDate}</span></span>
        </div>
        <div className="flex items-center border-b pb-2 border-orange-300">
          <span className="mr-4">🚚</span>
          <span className="text-black">Pickup Location: <span className='ml-2 font-bold'>{reservation.pickupLocation}</span></span>
        </div>
        <div className="flex items-center">
          <span className="mr-4">⏰</span>
          <span className="text-black">Reservation Status: <span className='ml-2 font-bold'>Approved</span></span>
        </div>
      </div>
      <div className="mt-6 text-center bg-orange-50 p-4 rounded-lg">
        <p className="text-black">A confirmation email has been sent to <span className="font-bold text-red500">{reservation.contactEmail}</span></p>
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/"
          className="bg-red500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 inline-block shadow-lg"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}

export default ReservationConfirmation;

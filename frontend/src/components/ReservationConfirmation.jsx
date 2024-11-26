function ReservationConfirmation({ reservation }) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-600">Rezervacija patvirtinta!</h2>
          <p className="text-gray-600 mt-2">Ačiū už jūsų rezervaciją</p>
        </div>
  
        <div className="space-y-4">
        <div className="flex items-center">
            <span className="mr-3 text-blue-600">📃</span>
            <span>Įrankio tipas: {reservation.toolType}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-blue-600">🔧</span>
            <span>Įrankis: {reservation.tool}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-blue-600">📅</span>
            <span>Datos: {reservation.startDate} iki {reservation.endDate}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-blue-600">🚚</span>
            <span>Atsiėmimo vieta: {reservation.pickupLocation}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-blue-600">⏰</span>
            <span>Rezervacijos statusas: Patvirtinta</span>
          </div>
        </div>
  
        <div className="mt-6 text-center">
          <p className="text-gray-600">Patvirtinimo laiškas buvo išsiųstas į {reservation.contactEmail}</p>
        </div>
      </div>
    );
  }
  
  export default ReservationConfirmation;
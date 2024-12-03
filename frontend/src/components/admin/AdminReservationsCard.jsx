import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminReservationsCard = ({ reservation, onStatusUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Declined: 'bg-red-100 text-red-800',
    Completed: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{reservation.product?.description?.nameRetail || 'Tool Name Not Available'}</h3>
          <p className="text-gray-600">Reserved by: {reservation.contactName || 'Name Not Available'}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[reservation.status || 'Pending']}`}>{reservation.status || 'Pending'}</span>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-600">
          Dates: {new Date(reservation.dateRange.from).toLocaleDateString()} - {new Date(reservation.dateRange.to).toLocaleDateString()}
        </p>
      </div>

      <button className="text-blue-500 mt-2 text-sm" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Contact Email:</span> {reservation.contactEmail || 'Not provided'}
          </p>
          <p>
            <span className="font-semibold">Contact Phone:</span> {reservation.contactPhone || 'Not provided'}
          </p>
          <p>
            <span className="font-semibold">Pickup Location:</span> {reservation.pickupLocation || 'Not specified'}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {reservation.quantity || 1}
          </p>

          {reservation.status === 'Pending' && (
            <div className="flex gap-2 mt-4">
              <button onClick={() => onStatusUpdate(reservation._id, 'Approved')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Approve
              </button>
              <button onClick={() => onStatusUpdate(reservation._id, 'Declined')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Decline
              </button>
            </div>
          )}

          <Link to={`edit/${reservation._id}`} className="block text-blue-500 hover:text-blue-700 mt-2">
            Edit Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminReservationsCard;

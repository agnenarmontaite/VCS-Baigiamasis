import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && (user.userId || user._id)) {
      fetchUserReservations();
    }
  }, [user]);

  const fetchUserReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = user.userId || user._id;
      const response = await fetch(`http://localhost:3000/reservations/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      const sortedReservations = Array.isArray(data) ? data.sort((a, b) => b._id.localeCompare(a._id)) : [];
      setReservations(sortedReservations);
    } catch (error) {
      toast.error('Failed to fetch reservations');
      setReservations([]);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Reservations</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tool Info</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Dates</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{reservation.tool}</div>
                      <div className="text-sm text-gray-500">{reservation.toolType}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">From: {new Date(reservation.dateRange.from).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-900">To: {new Date(reservation.dateRange.to).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{reservation.contactName}</div>
                      <div className="text-sm text-gray-500">{reservation.contactEmail}</div>
                      <div className="text-sm text-gray-500">{reservation.contactPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            reservation.status === 'Completed'
                              ? 'bg-blue-100 text-blue-800'
                              : reservation.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : reservation.status === 'Declined'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationList;

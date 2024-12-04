import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminReservationsNewForm from './AdminReservationsNewForm';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(15);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showNewReservationModal, setShowNewReservationModal] = useState(false);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:3000/reservations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();

      // Turetu tikrint ar rezervacija pasibaige. Jei rezervacija pasibaige, tada keiciame statusu i Completed.
      const updatedReservations = await Promise.all(
        data.reservations.map(async (reservation) => {
          const endDate = new Date(reservation.dateRange.to);
          const currentDate = new Date();

          if (currentDate > endDate && reservation.status === 'Approved') {
            await handleStatusUpdate(reservation._id, 'Completed');
            return { ...reservation, status: 'Completed' };
          }
          return reservation;
        })
      );

      setReservations(updatedReservations);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch reservations');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusUpdate = async (reservationId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/reservations/${reservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success(`Reservation ${newStatus.toLowerCase()}`);
        fetchReservations();
      } else {
        throw new Error('Failed to update reservation status');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRowClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  // Get current reservations
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);
  const totalPages = Math.ceil(reservations.length / reservationsPerPage);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Headeris */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Reservation Management</h2>
          </div>
          <button onClick={() => setShowNewReservationModal(true)} className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-500/90 transform transition-all duration-200 hover:shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Reservation
          </button>
        </div>

        {/* Lentele */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tool</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Start Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">End Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentReservations.map((reservation) => (
                      <tr key={reservation._id} className="hover:bg-gray-50 transition-colors duration-200" onClick={() => handleRowClick(reservation)}>
                        <td className="px-6 py-4 text-sm text-gray-900">{reservation.tool}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{reservation.contactName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{new Date(reservation.dateRange.from).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{new Date(reservation.dateRange.to).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{reservation.quantity}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${reservation.status === 'Approved' ? 'bg-green-100 text-green-800' : reservation.status === 'Declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}
                          >
                            {reservation.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Puslapiai */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Atidaryta rezervacija modalas*/}
        {selectedReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full m-4 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Reservation Details</h3>
                <button onClick={() => setSelectedReservation(null)} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Tool</p>
                  <p>{selectedReservation.tool}</p>
                </div>
                <div>
                  <p className="font-semibold">Contact Information</p>
                  <p>Name: {selectedReservation.contactName}</p>
                  <p>Email: {selectedReservation.contactEmail}</p>
                  <p>Phone: {selectedReservation.contactPhone}</p>
                </div>
                <div>
                  <p className="font-semibold">Pickup Location</p>
                  <p>{selectedReservation.pickupLocation}</p>
                </div>
                <div>
                  <p className="font-semibold">Dates</p>
                  <p>From: {new Date(selectedReservation.dateRange.from).toLocaleDateString()}</p>
                  <p>To: {new Date(selectedReservation.dateRange.to).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Status</p>
                  <p>{selectedReservation.status || 'Pending'}</p>
                </div>

                <div className="flex gap-2 mt-6">
                  {selectedReservation.status === 'Pending' && (
                    <>
                      <button onClick={() => handleStatusUpdate(selectedReservation._id, 'Approved')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Approve
                      </button>
                      <button onClick={() => handleStatusUpdate(selectedReservation._id, 'Declined')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Decline
                      </button>
                    </>
                  )}
                  <Link to={`edit/${selectedReservation._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sukurti nauja rezervacija modalas */}
        {showNewReservationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full m-4 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Create New Reservation</h3>
                <button onClick={() => setShowNewReservationModal(false)} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <AdminReservationsNewForm onClose={() => setShowNewReservationModal(false)} refreshReservations={fetchReservations} />
            </div>
          </div>
        )}

        {/* Rezervacijos koregavimo modalas */}
        <div className="relative z-[100]">
          <Outlet context={{ refreshReservations: fetchReservations }} className="z-[70]" />
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;

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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reservation Management</h2>
        <button onClick={() => setShowNewReservationModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Reservation
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Tool</th>
                  <th className="px-6 py-3 text-left">Start Date</th>
                  <th className="px-6 py-3 text-left">End Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentReservations.map((reservation) => (
                  <tr key={reservation._id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(reservation)}>
                    <td className="px-6 py-4">{reservation.tool}</td>
                    <td className="px-6 py-4">{new Date(reservation.dateRange.from).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(reservation.dateRange.to).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{reservation.status || 'Pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
              Next
            </button>
          </div>

          {selectedReservation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg max-w-2xl w-full m-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Reservation Details</h3>
                  <button onClick={() => setSelectedReservation(null)} className="text-gray-500 hover:text-gray-700">
                    ✕
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

          {showNewReservationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg max-w-2xl w-full m-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Create New Reservation</h3>
                  <button onClick={() => setShowNewReservationModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                <AdminReservationsNewForm onClose={() => setShowNewReservationModal(false)} refreshReservations={fetchReservations} />
              </div>
            </div>
          )}
        </>
      )}
      <Outlet context={{ refreshReservations: fetchReservations }} />
    </div>
  );
};

export default AdminReservations;

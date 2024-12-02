import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminUsersNewForm from './AdminUsersNewForm';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setUsers(users.filter((user) => user._id !== userId));
          toast.success('User deleted successfully');
        }
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button onClick={() => setShowNewUserModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create User
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
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone Number</th>
                  <th className="px-6 py-3 text-left">Date of Birth</th>
                  <th className="px-6 py-3 text-left">Address</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Rented Tools</th>
                  <th className="px-6 py-3 text-left">Reservations</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phoneNumber}</td>
                    <td className="px-6 py-4">{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{user.address}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.rentedTools?.length || 0}</td>
                    <td className="px-6 py-4">{user.reservations?.length || 0}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link to={`edit/${user._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
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
        </>
      )}

      {showNewUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full m-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Create New User</h3>
              <button onClick={() => setShowNewUserModal(false)} className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <AdminUsersNewForm onClose={() => setShowNewUserModal(false)} refreshUsers={fetchUsers} />
          </div>
        </div>
      )}

      <Outlet context={{ refreshUsers: fetchUsers }} />
    </div>
  );
};

export default AdminUsers;

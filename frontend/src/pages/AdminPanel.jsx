import { Link, Outlet } from 'react-router-dom';

// import AdminReservations from "../components/admin/AdminReservations";
// import AdminTools from "../components/admin/AdminTools";
// import AdminUsers from "../components/admin/AdminUsers";

function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="tools">
          <div className="p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300">
            <h3 className="font-bold m-2 text-center">Tools</h3>
          </div>
        </Link>
        <Link to="reservations">
          <div className="p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300">
            <h3 className="font-bold m-2 text-center">Reservations</h3>
          </div>
        </Link>
        <Link to="users">
          <div className="p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300">
            <h3 className="font-bold m-2 text-center">Users</h3>
          </div>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;

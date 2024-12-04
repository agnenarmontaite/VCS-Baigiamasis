import { Link, Outlet } from 'react-router-dom';

function ProfilePanel() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="details">
          <div className="p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300">
            <h3 className="font-bold m-2 text-center">Profile Details</h3>
          </div>
        </Link>
        <Link to="my-reservations">
          <div className="p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300">
            <h3 className="font-bold m-2 text-center">My Reservations</h3>
          </div>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePanel;

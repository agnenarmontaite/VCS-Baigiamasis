function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Valdymo Skydas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-bold mb-2">Tvarkyti įrankius</h3>
          {/* Tool management section */}
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-bold mb-2">Rezervacijos</h3>
          {/* Reservations management */}
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-bold mb-2">Vartotojai</h3>
          {/* User management */}
        </div>
      </div>
    </div>
  );
}

export default Admin;

import { useState } from 'react';

function ReservationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    toolType: '',
    tool: '',
    startDate: '',
    endDate: '',
    pickupLocation: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const toolTypes = {
    'Drilling equipment': ['Drill', 'Screwdriver', 'Hammer drill', 'Impact drill', 'Rotary hammer'],
    'Cutting equipment':  ['Circular saw', 'Jigsaw', 'Reciprocating saw', 'Miter saw', 'Table saw'],
    'Mounting equipment': ['Screwdriver', 'Impact wrench', 'Impact driver', 'Screw gun'],
    'Plumbing equipment': ['Pipe wrench', 'Pipe cutter', 'Pipe bender', 'Pipe threader', 'Pipe reamer'],
    'Cleaning equipment': ['Vacuum cleaner', 'Pressure washer', 'Carpet cleaner', 'Steam cleaner', 'Floor scrubber'],
  };

  const toolTypeOptions = Object.keys(toolTypes);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'toolType' && { tool: '' })
    }));
  };

  const handleSubmit = (e) => {
       // Čia reikės sujungti su backendu
    e.preventDefault();
    onSubmit(formData);
       // Čia reikės sujungti su backendu
 
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-3 text-blue-600 text-xl">🛠️</span> Reservation form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Irankio tipo pasirinkimas */}
        <div>
          <label className="block mb-2 font-bold">Select Category</label>
          <select 
            name="toolType"
            value={formData.toolType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Categories</option>
            {toolTypeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Irankio pasirinkimas */}
        <div>
          <label className="block mb-2 font-bold">Select Tool</label>
          <select 
            name="tool"
            value={formData.tool}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={!formData.toolType}
          >
            <option value="">Tools</option>
            {formData.toolType && toolTypes[formData.toolType].map(tool => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
          </select>
        </div>

        {/* Atsiemimo vietos pasirinkimas */}
        <div>
          <label className="block mb-2 font-bold">Pickup Location</label>
          <select 
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Locations</option>
            {['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'].map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Rezervacijos datos */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-bold">Start Date</label>
            <input 
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-bold">End Date</label>
            <input 
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Kontaktiniai duomenys */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Contact Name</label>
            <input 
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Contact Email</label>
            <input 
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
    
        <div>
          <label className="block mb-2">Contact Phone</label>
          <input 
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
           
            {/* Submit mygtukas */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Make a reservation
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
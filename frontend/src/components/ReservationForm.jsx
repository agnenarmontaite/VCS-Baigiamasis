import { useState } from 'react';
import { PulseLoader } from 'react-spinners';

import Datepicker from "react-tailwindcss-datepicker";

function ReservationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    toolType: '',
    tool: '',
    startDate: null,
    endDate: null,
    pickupLocation: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });
 

  const [loading, setLoading] = useState(false);

  const toolTypes = {
    'Drilling equipment': ['Drill', 'Screwdriver', 'Hammer drill', 'Impact drill', 'Rotary hammer'],
    'Cutting equipment': ['Circular saw', 'Jigsaw', 'Reciprocating saw', 'Miter saw', 'Table saw'],
    'Mounting equipment': ['Screwdriver', 'Impact wrench', 'Impact driver', 'Screw gun'],
    'Plumbing equipment': ['Pipe wrench', 'Pipe cutter', 'Pipe bender', 'Pipe threader', 'Pipe reamer'],
    'Cleaning equipment': ['Vacuum cleaner', 'Pressure washer', 'Carpet cleaner', 'Steam cleaner', 'Floor scrubber']
  };

  // manually budu neaktyviu rezervacijos datu nustatymas
  const disabledDates = [
    {
      startDate: new Date(2024, 11, 1), // December 1, 2024
      endDate: new Date(2024, 11, 10)   // December 10, 2024
    },
    {
      startDate: new Date(2024, 11, 20), // December 20, 2024
      endDate: new Date(2024, 11, 25)   // December 25, 2024
    },
  ];

  const toolTypeOptions = Object.keys(toolTypes);


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'toolType' && { tool: '' })
    }));
  };

  const handleDateChange = (newValue) => {
    setFormData(prev => ({
      ...prev,
      startDate: newValue.startDate,
      endDate: newValue.endDate
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
      setTimeout(() => {
      setLoading(false);
      onSubmit({
        // nepatinka datos ir laiko atskirimas. reikia pakeisti
        ...formData,
        startDate: formData.startDate ? formData.startDate.toISOString().replace('T', ' / ').split('.')[0] : null,
        endDate: formData.endDate ? formData.endDate.toISOString().replace('T', ' / ').split('.')[0] : null
      });
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-2xl rounded-xl border-2 border-red500">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-black">
        Tool Reservation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Irankio tipo pasirinkimas */}
        <div>
          <label className="block mb-1 font-bold text-black">Select Category</label>
          <select
            name="toolType"
            value={formData.toolType}
            onChange={handleChange}
            className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
            required
          >
            <option value="" className="text-gray-500">Categories</option>
            {toolTypeOptions.map(type => (
              <option key={type} value={type} className="text-black">{type}</option>
            ))}
          </select>
        </div>
        {/* Irankio pasirinkimas */}
        <div>
          <label className="block mb-1 font-bold text-black">Select Tool</label>
          <select
            name="tool"
            value={formData.tool}
            onChange={handleChange}
            className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black disabled:opacity-50"
            required
            disabled={!formData.toolType}
          >
            <option value="" className="text-gray-500">Tools</option>
            {formData.toolType && toolTypes[formData.toolType].map(tool => (
              <option key={tool} value={tool} className="text-black">{tool}</option>
            ))}
          </select>
        </div>
        {/* Atsiemimo vietos pasirinkimas */}
        <div>
          <label className="block mb-1 font-bold text-black">Pickup Location</label>
          <select
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
            required
          >
            <option value="" className="text-gray-500">Locations</option>
            {['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'].map(location => (
              <option key={location} value={location} className="text-black">{location}</option>
            ))}
          </select>
        </div>
        {/* Datepickeris. Neiseina pakeisti backgroundo is dark i white. */}
        <div className="grid md:grid-cols-1 gap-3">
          <Datepicker
            primaryColor={"red"}
            value={{ startDate: formData.startDate, endDate: formData.endDate }} 
            onChange={handleDateChange}
            showShortcuts={true}
            disabledDates={disabledDates}
        /> 
        </div>
        {/* Kontaktiniai duomenys */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-black">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-black">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-black">Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
            required
          />
        </div>
        {/* Submit mygtukas */}
        <button
          type="submit"
          className="w-full bg-red500 text-white p-4 rounded-lg hover:bg-red-600 transition duration-300 transform hover:shadow-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <PulseLoader color="#ffffff" size={15} />
          ) : (
            "Make a Reservation"
          )}
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;

import { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import Datepicker from 'react-tailwindcss-datepicker';
import { useContext } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Map from './Map';

function ReservationForm({ onSubmit }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const quantity = parseInt(searchParams.get('quantity')) || 1;
  const category = searchParams.get('category');
  const toolName = searchParams.get('name');
  const { id } = useParams();
  const [pickupLocations, setPickupLocations] = useState([]);
  const [data_send, setData_send] = useState([]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({});
  const [tools, setTools] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const today = new Date();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const disabledDates = [
    {
      startDate: new Date(2024, 11, 1),
      endDate: new Date(2024, 11, 10)
    },
    {
      startDate: new Date(2024, 11, 20),
      endDate: new Date(2024, 11, 25)
    }
  ];

  const [formData, setFormData] = useState(() => ({
    toolType: '',
    tool: '',
    toolName: '',
    quantity: quantity,
    startDate: today,
    endDate: today,
    pickupLocation: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  }));

  const getAddress = (address) => setPickupAddress(address);

  useEffect(() => {
    const fetchStoresLocations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/stores');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const pullArray = data.stores.map((store) => store.location_city);
        setPickupLocations(pullArray);
        setData_send(data);
      } catch (error) {
        setFetchError('Failed to load stores. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoresLocations();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/tools');
        const data = await response.json();
        console.log('Fetched tools:', data.tools);

        const categorized = {};
        data.tools.forEach((product) => {
          const toolType = product.toolType;
          console.log('Processing tool:', {
            name: product.name,
            toolType,
            id: product._id
          });

          if (!categorized[toolType]) {
            categorized[toolType] = [];
          }
          categorized[toolType].push({
            _id: product._id,
            name: product.description.nameRetail,
            description: product.description,
            toolType: toolType
          });
        });

        console.log('Categorized data:', categorized);
        setCategories(categorized);

        if (category && toolName) {
          const categoryTools = categorized[category];
          if (categoryTools) {
            setTools(categoryTools);
            const selectedTool = categoryTools.find((t) => t.name === toolName);
            if (selectedTool) {
              setFormData((prev) => ({
                ...prev,
                toolType: category,
                tool: id,
                toolName: toolName
              }));
            }
          }
        }
      } catch (error) {
        setFetchError('Failed to load products');
      }
    };

    fetchProducts();
  }, [category, toolName, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tool') {
      const selectedTool = tools.find((tool) => tool._id === value);
      setFormData((prev) => ({
        ...prev,
        tool: value,
        toolName: selectedTool ? selectedTool.name : '',
        toolType: selectedTool ? selectedTool.toolType : prev.toolType
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'toolType' && { tool: '', toolName: '' })
      }));

      if (name === 'toolType') {
        setTools(categories[value] || []);
      }
    }
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      startDate: newValue.startDate,
      endDate: newValue.endDate
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to make a reservation.');
      setLoading(false);
      return;
    }

    const payload = {
      productId: formData.tool,
      toolType: formData.toolType,
      tool: formData.toolName,
      quantity: formData.quantity,
      pickupLocation: pickupAddress,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      dateRange: {
        from: formData.startDate,
        to: formData.endDate
      }
    };

    try {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        onSubmit(result);
      } else {
        const errorData = await response.json();
        alert('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while submitting your reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-2xl rounded-xl border-2 border-red500">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-black">Tool Reservation</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <PulseLoader color="#000000" size={15} />
        </div>
      ) : fetchError ? (
        <p className="text-red-500">{fetchError}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-bold text-black">Select Category</label>
            <select name="toolType" value={formData.toolType} onChange={handleChange} className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black" required>
              <option value="" className="text-gray-500">
                Categories
              </option>
              {Object.keys(categories).map((type) => (
                <option key={type} value={type} className="text-black">
                  {type}
                </option>
              ))}
            </select>
          </div>

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
              <option value="" className="text-gray-500">
                Tools
              </option>
              {tools.map((tool) => (
                <option key={tool._id} value={tool._id} className="text-black">
                  {tool.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-bold text-black">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black" required />
          </div>

          <div>
            <label className="block mb-1 font-bold text-black">Pickup Location</label>
            <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black" required>
              <option value="" className="text-gray-500">
                Locations
              </option>
              {pickupLocations.map((location) => (
                <option key={location} value={location} className="text-black">
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Map className="size-fit aspect-auto" data={data_send} getAddress={getAddress} current_location={formData.pickupLocation} />
          </div>

          <div className="grid md:grid-cols-1 gap-3">
            <p className="font-bold">Reservation date</p>
            <Datepicker
              primaryColor={'red'}
              value={{ startDate: formData.startDate, endDate: formData.endDate }}
              onChange={handleDateChange}
              showShortcuts={true}
              placeholder="Select your date"
              showFooter={true}
              disabledDates={disabledDates}
              className={''}
              timezone="UTC"
              startWeekOn="monday"
              startFrom={new Date()}
              configs={{
                shortcuts: {
                  today: {
                    text: 'Today',
                    period: {
                      start: new Date(),
                      end: new Date()
                    }
                  },
                  tomorrow: {
                    text: 'Tomorrow',
                    period: {
                      start: new Date(new Date().setDate(new Date().getDate() + 1)),
                      end: new Date(new Date().setDate(new Date().getDate() + 1))
                    }
                  },
                  next3Days: {
                    text: 'Next 3 days',
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 3))
                    }
                  },
                  next5Days: {
                    text: 'Next 5 days',
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 5))
                    }
                  },
                  next7Days: {
                    text: 'Next 7 days',
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 7))
                    }
                  },
                  next14Days: {
                    text: 'Next 14 days',
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 14))
                    }
                  },
                  next30days: {
                    text: 'Next 30 days',
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 30))
                    }
                  }
                }
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-black">Contact Name</label>
              <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black" required />
            </div>
            <div>
              <label className="block mb-1 text-black">Contact Email</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black" required />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-black">Contact Phone</label>
            <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black" required />
          </div>

          <button type="submit" className="w-full bg-black text-white p-4 rounded-lg hover:bg-red-600 transition duration-300 transform hover:shadow-lg flex items-center justify-center" disabled={loading}>
            {loading ? <PulseLoader color="#ffffff" size={15} /> : 'Make a Reservation'}
          </button>
        </form>
      )}
    </div>
  );
}

export default ReservationForm;

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
  const [formError, setFormError] = useState('')
  const quantity = parseInt(searchParams.get('quantity')) || 1;
  const category = searchParams.get('category');
  const toolName = searchParams.get('name');
  const { id } = useParams();
  const [pickupLocations, setPickupLocations] = useState([]);
  const [data_send, setData_send] = useState([])
  const [pickupAddress, setPickupAddress] = useState("")

  if (!user) {
    return <Navigate to="/login" />;
  }

  const [formData, setFormData] = useState({
    toolType: category || '',
    tool: id,
    toolName: toolName || '',
    quantity: quantity,
    startDate: null,
    endDate: null,
    pickupLocation: '',
    contactName: user.name || '',
    contactEmail: user.email || '',
    contactPhone: user.phoneNumber || ''
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({});
  const [tools, setTools] = useState([]);
  const [fetchError, setFetchError] = useState(null);

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
  useEffect(() => {
    const fecthStoresLocations = async () => {
      setIsLoading(true);
      try{
        const response = await fetch('http://localhost:3000/stores')
        if(!response.ok) {
          throw new Error(`HTTP! error! status: ${response.status}` )
        }
        const data = await response.json()
        let pullArray = []
        if(pullArray > 0) {
          pullArray = []
        }
        data.stores.forEach((store) => {
          pullArray.push(store.location_city)
        })
        setPickupLocations(pullArray)
        setData_send(data)
      } catch (error) {
        console.error('Error fetching stores:', error);
        setFetchError('Failed to load stores. Please try again later.');
      } finally {
      }
    }
    fecthStoresLocations()
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/tools');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const categorized = {};
        data.tools.forEach((product) => {

          const toolType = product.description['Prekės tipas'];
          if (toolType) {
            if (!categorized[toolType]) {
              categorized[toolType] = [];
            }
            categorized[toolType].push({
              _id: product._id,
              name: product.name,
              description: product.description
            });
          } else {
            console.warn(`Tool with ID ${product._id} has an undefined category.`);

          const toolType = product.description['productType'];
          if (!categorized[toolType]) {
            categorized[toolType] = [];

          }
          }
        });

        

        setCategories(categorized);

        // If category exists, set the tools for that category
        if (category && categorized[category]) {
          setTools(categorized[category]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setFetchError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (categories[category]) {
      setTools(categories[category]);
      const selectedTool = categories[category].find((tool) => tool.name === toolName);
      if (selectedTool) {
        setFormData((prev) => ({
          ...prev,
          tool: selectedTool._id,
          toolName: selectedTool.name
        }));
      }
    }
  }, [categories, category, toolName]);

const getAddress = (address) => {
  return setPickupAddress(address)
}

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'tool') {
      const selectedTool = tools.find((tool) => tool._id === value);
      setFormData((prev) => ({
        ...prev,
        tool: value,
        toolName: selectedTool ? selectedTool.name : ''
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

    if (newValue.startDate && newValue.endDate) {
      setFormError('');
    }
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


    if (!formData.startDate || !formData.endDate) {
      setFormError('Please select a reservation date.');
      setLoading(false);
      return;
    }

    const payload = {
      productId: formData.tool, // This is the MongoDB _id
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
        console.error('Failed to submit reservation:', errorData.message);
        alert('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
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
            <select name="toolType" value={formData.toolType} onChange={handleChange} className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black" required
              onInvalid={(e) => e.target.setCustomValidity('Please select a category from the list')}
              onInput={(e) => e.target.setCustomValidity('')}>
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
              onInvalid={(e) => e.target.setCustomValidity('Please select a tool from the list')}
              onInput={(e) => e.target.setCustomValidity('')}
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
            <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black" required
            onInvalid={(e) => e.target.setCustomValidity('Please select a location from the list ')}
            onInput={(e) => e.target.setCustomValidity('')}>
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
            <Map className="size-fit aspect-auto" data={data_send} getAddress={getAddress} current_location={formData.pickupLocation}/>
          </div>

          <div className="grid md:grid-cols-1 gap-3">
            <p className="font-bold">Reservation date </p>
            {formError && <span className="text-red-500">{formError}</span>}
            <Datepicker
              primaryColor={'red'}
              value={{ startDate: formData.startDate, endDate: formData.endDate }}
              onChange={handleDateChange}
              showShortcuts={true}
              placeholder="Select your date"
              showFooter={true}
              disabledDates={disabledDates}
              className={''}
              
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
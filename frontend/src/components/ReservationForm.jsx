import { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import Datepicker from 'react-tailwindcss-datepicker';
import { useContext } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Map from './Map';
import { toast } from 'react-toastify';

function ReservationForm({ onSubmit }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [formError, setFormError] = useState('');
  const quantity = parseInt(searchParams.get('quantity')) || 1;
  const category = searchParams.get('category');
  const toolName = searchParams.get('name');
  const [pickupLocations, setPickupLocations] = useState([]);
  const [data_send, setData_send] = useState([]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({});
  const [tools, setTools] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const today = new Date();
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const [formData, setFormData] = useState({
    toolType: '',
    tool: '',
    toolName: '',
    quantity: '',
    startDate: today,
    endDate: today,
    pickupLocation: '',
    contactName: user.name,
    contactEmail: user.email,
    contactPhone: user.phoneNumber
  });

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
        const categorized = {};

        data.tools.forEach((product) => {
          const toolType = product.toolType;
          if (!categorized[toolType]) {
            categorized[toolType] = [];
          }
          categorized[toolType].push({
            _id: product._id,
            name: product.name,
            toolType: toolType
          });
        });

        setCategories(categorized);
        const exactTool = data.tools.find((t) => t.name.trim() === toolName?.trim());

        if (exactTool) {
          setTools(categorized[exactTool.toolType] || []);
          setFormData((prev) => ({
            ...prev,
            toolType: exactTool.toolType,
            tool: exactTool._id,
            toolName: exactTool.name,
            quantity: quantity
          }));
        }
      } catch (error) {
        setFetchError('Failed to load products');
      }
    };

    fetchProducts();
  }, [category, toolName, quantity]);

  useEffect(() => {
    if (formData.tool) {
      fetchReservationsForTool(formData.tool);
    } else {
      setDisabledDates([]);
    }
  }, [formData.tool]);

  const fetchReservationsForTool = async (toolId) => {
    try {
      const response = await fetch(`http://localhost:3000/reservations/product/${toolId}`);
      const data = await response.json();

      if (response.ok) {
        const disabledDateRanges = data.reservations.map((reservation) => ({
          startDate: new Date(reservation.from),
          endDate: new Date(reservation.to)
        }));
        setDisabledDates(disabledDateRanges);
      } else {
        console.error('Error fetching reservations:', data.error);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    if (formData.tool) {
      fetch(`http://localhost:3000/tools/${formData.tool}`)
        .then((res) => res.json())
        .then((data) => {
          setBasePrice(data.product.description.basePrice);
          calculateTotalPrice(data.product.description.basePrice, formData.quantity);
        });
    }
  }, [formData.tool]);

  useEffect(() => {
    if (basePrice && formData.quantity && formData.startDate && formData.endDate) {
      const days = Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24));
      const total = basePrice * formData.quantity * (days + 1);
      setTotalPrice(total);
    }
  }, [basePrice, formData.quantity, formData.startDate, formData.endDate]);

  const validatePhone = (phoneNumber) => {
    return phoneRegex.test(phoneNumber);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

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

      // Kai pasirenkam tool apskaiciuojam
      if (selectedTool && selectedTool.description?.basePrice) {
        setBasePrice(selectedTool.description.basePrice);
        calculateTotalPrice(selectedTool.description.basePrice, formData.quantity);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'toolType' && { tool: '', toolName: '' })
      }));

      if (name === 'toolType') {
        setTools(categories[value] || []);
      }

      // Jeigu pasikeicia kiekis
      if (name === 'quantity' && basePrice) {
        calculateTotalPrice(basePrice, value);
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
      toast.error('You must be logged in to make a reservation.');
      setLoading(false);
      return;
    }

    if (!validatePhone(formData.contactPhone)) {
      toast.error('Please enter a valid phone number (e.g., +37065551111)');
      setLoading(false);
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setFormError('Please select a reservation date.');
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
        toast.error('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while submitting your reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (price, qty) => {
    const days = formData.startDate && formData.endDate ? Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) : 1;
    setTotalPrice(price * qty * days);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-3xl font-bold p-6 border-b border-gray-200">Tool Reservation</h2>

        {isLoading ? (
          <div className="flex justify-center p-6">
            <PulseLoader color="#000000" size={15} />
          </div>
        ) : fetchError ? (
          <p className="text-red-500 p-6">{fetchError}</p>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* First category tool quantity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Select Category</label>
                <select name="toolType" value={formData.toolType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2" required>
                  <option value="">Categories</option>
                  {Object.keys(categories).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Select Tool</label>
                <select name="tool" value={formData.tool} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 disabled:bg-gray-100" required disabled={!formData.toolType}>
                  <option value="">Tools</option>
                  {tools.map((tool) => (
                    <option key={tool._id} value={tool._id}>
                      {tool.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2" required />
              </div>
            </div>
            {/* Second name email phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Name</label>
                <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Email</label>
                <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Phone</label>
                <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2" required />
              </div>
            </div>
            {/* Third date location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 z-50">
                <label className="block text-sm font-semibold text-gray-900">Reservation Date</label>
                {formError && <span className="text-red-500">{formError}</span>}
                <Datepicker
                  primaryColor={'blue'}
                  value={{ startDate: formData.startDate, endDate: formData.endDate }}
                  onChange={handleDateChange}
                  showShortcuts={true}
                  placeholder="Select your date"
                  showFooter={true}
                  containerClassName="rounded-lg border-2 border-black relative z-10"
                  disabledDates={disabledDates}
                  timezone="UTC"
                  startWeekOn="mon"
                  startFrom={new Date()}
                  minDate={new Date()}
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

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Pickup Location</label>
                <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2" required>
                  <option value="">Locations</option>
                  {pickupLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>

                {formData.pickupLocation && (
                  <div className="mt-4">
                    <Map className="w-full rounded-lg border border-gray-300" data={data_send} pickupAddress={setPickupAddress} current_location={formData.pickupLocation} />
                  </div>
                )}
              </div>
            </div>

            {/* Fourth prices */}
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">Base Price</p>
                  <p className="text-xl font-bold">€{basePrice} / day</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">Total Price</p>
                  <p className="text-xl font-bold">€{totalPrice}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="h-4 w-4 text-red-500 rounded border-gray-300" required />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            {/*
          <div>
            <Map className="size-fit aspect-auto" data={data_send} getAddress={getAddress} current_location={formData.pickupLocation} />
          </div> */}
            <button type="submit" className="w-full bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center" disabled={loading}>
              {loading ? <PulseLoader color="#ffffff" size={15} /> : 'Make a Reservation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ReservationForm;

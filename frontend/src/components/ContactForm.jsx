import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = { lat: 54.703046, lng: 25.277954 }; // Vilnius Coding School

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          phoneNumber,
          message
        })
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setEmail('');
        setPhoneNumber('');
        setMessage('');
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container lg:h-[auto] m-auto text-center">
      <div className="bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden">
        <h1 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">Contact us</h1>

        <div>
          <form className="px-10" onSubmit={handleSubmit}>
            <label className="block text-gray-700 mb-2 text-left font-bold">Your email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg mb-5" required />

            <label className="block text-gray-700 mb-2 text-left font-bold">Your phone number:</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg mb-5" required />

            <label className="block text-gray-700 mb-2 text-left font-bold">Your message:</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg mb-5" required />

            <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-gray-500 text-white rounded-md mt-4 hover:bg-red-500 transition duration-300">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="bg-white overflow-hidden shadow-lg mt-8 mx-auto max-w-full px-10">
          <h1 className="text-2xl sm:text-3xl text-black mb-5 mt-10">Main headquarters:</h1>

          <MapContainer className="border-gray-300 rounded-lg h-[300px] mx-auto mb-10" center={location} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            <Marker
              position={location}
              icon={
                new Icon({
                  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41]
                })
              }
            >
              <Popup>Žalgirio st. 90, Vilnius</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

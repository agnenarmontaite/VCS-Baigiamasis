import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet'; //  npm install react-leaflet leaflet
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

const ContactUs = () => {
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')
    const location = {lat:54.703046, lng:25.277954}; //Vilnius Coding School 
   
    const handleMessageSubmit = async (e) => {
        e.preventDefault()

        console.log(email, phoneNumber, message)
    }

  return (
    <div className="container lg:h-[1000px] m-auto p-10  text-center ">
        <div className=" bg-white border  border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden">
            <h1 className='text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center'>Contact us</h1>
            <div>
                <form className='px-10'
                onSubmit={handleMessageSubmit}>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Your email: </label>
                    <input type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg"/>
                    <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">Your phone number:</label>
                    <input type="tel" 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber} 
                    className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg"/>
                    <label htmlFor="message" className="block text-gray-700 mb-2">Your message:</label>
                    <textarea
                    onChange={(e) => setMessage(e.target.value)} 
                    value={message} 
                    className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg"  
                    >
                    </textarea>
                    <button type="submit" className="w-full py-2 px-4 bg-gray-600 text-white rounded-md mt-4">Send message</button>
                </form>
            </div>
            <div className="bg-white overflow-hidden shadow-lg mt-8 mx-auto max-w-full"> 
            <h1 className="text-2xl sm:text-3xl text-black mb-5">You can find us here:</h1>
                    {/* map */}
                <MapContainer className='border-gray-300 rounded-lg h-[300px] w-1/2 mx-auto mb-10'
                    center={location}
                    zoom={13} // zoom in level on load lg:h-[300px] lg:w-[400px]
                >
                    <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                        position={location}
                        icon={
                        new Icon({
                                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                        })
                        }
                    >
                        <Popup>Žalgirio st. 90, Vilnius </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    </div>
  )
}

export default ContactUs

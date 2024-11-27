import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          dateOfBirth,
          phoneNumber,
          address
        })
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to login page after successful signup
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 md:w-full" onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2">Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <label className="block text-gray-700 mb-2">Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <label className="block text-gray-700 mb-2">Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <label className="block text-gray-700 mb-2">Date of Birth:</label>
          <input type="date" onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <label className="block text-gray-700 mb-2">Phone Number:</label>
          <input type="tel" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <label className="block text-gray-700 mb-2">Address:</label>
          <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />

          <button type="submit" className="w-full py-2 px-4 bg-gray-600 text-white rounded-md mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const SignupForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Existing form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [emptyFields, setEmptyFields] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // New validation states
  const [agreed, setAgreed] = useState(false);
  const [terms, setTerms] = useState(false);
  const [ageError, setAgeError] = useState('');
  const [termsError, setTermsError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmptyFields('');
    setAgeError('');
    setTermsError('');

    // Age validation
    const birthDate = new Date(dateOfBirth);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const isUnder18 = age < 18 || (age === 18 && new Date() < new Date(new Date().getFullYear(), birthDate.getMonth(), birthDate.getDate()));

    if (isUnder18) {
      setAgeError('You must be at least 18 years old to sign up.');
      return;
    }

    // Checkbox validations
    if (!agreed) {
      setAgeError('Please confirm your date of birth is correct.');
      return;
    }

    if (!terms) {
      setTermsError('Please confirm you understand your responsibilities.');
      return;
    }

    const formData = {
      name,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      address
    };

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        register();
        navigate('/login');
      } else {
        toast.error(data.message || 'Registration failed');
        setEmptyFields(data.message);
      }
    } catch (error) {
      console.log('Error details:', error);
      toast.error('Server error. Please try again later.');
    }
    setIsSubmitted(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full md:w-full" onSubmit={handleSubmit}>
          {/* Existing form fields remain the same */}
          <label className="block text-gray-700 mb-2">Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && name === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} required/>

          <label className="block text-gray-700 mb-2">Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && email === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} required/>

          <label className="block text-gray-700 mb-2">Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && password === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} required/>

          <label className="block text-gray-700 mb-2">Date of Birth:</label>
          <input type="date" onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && dateOfBirth === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} required/>
          {ageError && <p className="text-red-600 mt-2">{ageError}</p>}

          <label className="block text-gray-700 mb-2">Phone Number:</label>
          <input type="tel" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && phoneNumber === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} required/>

          <label className="block text-gray-700 mb-2">Address:</label>
          <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && address === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} required/>

          {/* New checkbox sections */}
          <div className="mt-4">
            <div className="flex items-center">
              <input type="checkbox" onChange={() => setAgreed(!agreed)} checked={agreed} className="mr-2" required/>
              <label className="text-gray-700">I confirm that my date of birth is correct.</label>
            </div>

            <div className="flex items-center mt-2">
              <input type="checkbox" onChange={() => setTerms(!terms)} checked={terms} className="mr-2" required/>
              <label className="text-gray-700">I take full responsibility for my actions using the rented equipment and confirm that I have proper knowledge to handle this equipment.</label>
            </div>
          </div>

          {emptyFields && <p className="text-red-600 mt-2 ml-6">{emptyFields}</p>}
          {termsError && <p className="text-red-600 mt-2">{termsError}</p>}

          <button type="submit" className="w-full py-2 px-4 bg-gray-500  hover:bg-red-500 text-white rounded-md mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

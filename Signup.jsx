import { useState } from "react";

const Signup = () => {
  
    // add sign up hook

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [date, setDate] = useState('')
    
    //add address input
    const [address, setAddress] = useState('')

    //checkbox errors
    const [agreed, setAgreed] = useState(false)
    const [ageError, setAgeError] = useState('')
    const [terms, setTerms] = useState(false)
    const [error, setError] = useState('')

    //age validation
    const [adultError, setAdultError] = useState('')


    const handleSubmit = async (e) => {
    e.preventDefault()
    setAgeError('')
    setError('')
    setAdultError('')

    // checbox errors
    if(!agreed) {
      setAgeError('Please confirm your date of birth is correct.')
      return
    }
    setError('')
    console.log('checkbox', agreed)

    if(!terms) {
      setError('Please confirm you understand your responsabilities.')
      return
    }

    // age validation
    const birthDate = new Date(date);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const isUnder18 = age < 18 || (age === 18 && (new Date() < new Date(new Date().getFullYear(), birthDate.getMonth(), birthDate.getDate())));

    if (isUnder18) return setAdultError('You must be at least 18 years old to sign up.');

      console.log('Email address:', email, 'Password:', password, 'Birthdate:', date)
      // change to save and encript login data in data base 
      console.log('checkboxes:', agreed, terms)

  }

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome, please sign up</h2>

        <form className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96"  onSubmit={handleSubmit}>  
            <label 
            className="block text-gray-700 mb-2">Email:</label>
            <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <label
            className="block text-gray-700 mb-2"
            >Password:</label>
            <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <label
            className="block text-gray-700 mb-2"
            >Date of birth:</label>
            <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {/* error message if user is under 18 on submit */}
            {adultError && <p className="text-red-600 mt-2 ml-6">{adultError}</p>}

            <div className="flex items-center mt-4">
            <input
            type="checkbox"
            onChange={() => setAgreed(!agreed)}
            checked={agreed}
            className="mr-2"
            />
            <label>I confirm that my date of birth is correct.</label>
            </div>
            {/* error message if user has not confirmed their age is correct */}
            {ageError && <p className="text-red-600 mt-2 pl-8"> {ageError}</p>
            }
             <div className="flex items-center mt-4">
            <input
            type="checkbox"
            onChange={() => setTerms(!terms)}
            checked={terms}
            className="mr-2"
            />
            <label>I take full reponsability for my actions using the rented equipment and confirm that I have proper knowledge to handle this equipment.</label>
            </div>
            {/* error message if user has not agree with our terms */}
            {error && <p className="text-red-600 mt-2 pl-8"> {error}</p>
            }

            <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-md"
            >Sign up</button>
             
        </form>

      </div>
    </div>
  );
};

export default Signup;

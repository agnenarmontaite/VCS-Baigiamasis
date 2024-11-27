import { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // add login hook

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Email address:', email, 'Password:', password)
    // change to save and encript login data in data base   

  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome, please login</h2>
       
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
            <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-md"
            >Login</button>
             
        </form>

      </div>
    </div>
  );
};

export default Login;

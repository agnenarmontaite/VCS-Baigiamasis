import SignupForm from './auth/SignupForm';

const Signup = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <SignupForm />
    </div>
  );
};

export default Signup;

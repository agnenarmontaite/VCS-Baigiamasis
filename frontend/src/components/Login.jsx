import LoginForm from './auth/LoginForm';

const Login = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <LoginForm />
    </div>
  );
};

export default Login;

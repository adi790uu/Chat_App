import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem('token');

  if (token) {
    window.location.href = '/home';
    return;
  }

  const submitHandler = async e => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    const response = await api.post('/users/register', data);
    console.log(response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('loggedUser', response.data.newUser._id);
    setUsername('');
    setPassword('');
  };

  const passView = e => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="w-full max-w-sm" onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">
            Username:
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-md"
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password:
          </label>
          <div className="relative">
            <input
              className="w-full border border-gray-300 p-2 rounded-md pr-10"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
              onClick={passView}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
      <span className="mt-4">
        Already a member? <Link to="/">Login</Link>
      </span>
    </div>
  );
};

export default Signup;

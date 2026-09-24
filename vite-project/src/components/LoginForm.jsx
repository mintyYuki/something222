import { useState } from 'react';
import api from '../api/axios';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/login/', formData);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      alert('Login successful!');
      window.location.href = '/profile';
    } catch (error) {
      alert('Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;

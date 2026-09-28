import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      setErrors({ form: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.username && formData.email && formData.password;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
      {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
      
      <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
      {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
      
      <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
      {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
      
      {errors.form && <p style={{color: 'red'}}>{errors.form}</p>}
      
      <button type="submit" disabled={loading || !isFormValid}>
        {loading ? 'Загрузка...' : 'Register'}
      </button>
    </form>
  );
}

export default RegisterForm;

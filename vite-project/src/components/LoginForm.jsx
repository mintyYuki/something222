import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
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
      await login(formData.username, formData.password);
      navigate('/profile');
    } catch (error) {
      setErrors({ form: 'Login failed. Check your credentials.' });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.username && formData.password;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
      {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
      
      <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
      {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
      
      {errors.form && <p style={{color: 'red'}}>{errors.form}</p>}
      
      <button type="submit" disabled={loading || !isFormValid}>
        {loading ? 'Загрузка...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;

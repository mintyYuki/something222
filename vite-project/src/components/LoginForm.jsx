import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch (err) {
      const serverErrors = err.response?.data || {};
      setErrors({ form: serverErrors.detail || 'Неверное имя пользователя или пароль.' });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.username && formData.password;

  return (
    <div className="animate-slide-in">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
        {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
        
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
        
        {errors.form && <p style={{color: 'red'}}>{errors.form}</p>}
        
        <button type="submit" disabled={loading || !isFormValid}>
          {loading ? 'Загрузка...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

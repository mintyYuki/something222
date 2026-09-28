import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await register(formData);
      alert('Регистрация успешна!');
      navigate('/login');
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ form: 'Ошибка регистрации. Попробуйте снова.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.username && formData.email && formData.password;

  return (
    <div className="animate-slide-in">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
        {errors.username && <p style={{color: 'red'}}>{errors.username[0]}</p>}
        
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        {errors.email && <p style={{color: 'red'}}>{errors.email[0]}</p>}
        
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        {errors.password && <p style={{color: 'red'}}>{errors.password[0]}</p>}
        
        {errors.form && <p style={{color: 'red'}}>{errors.form}</p>}
        
        <button type="submit" disabled={loading || !isFormValid}>
          {loading ? 'Загрузка...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

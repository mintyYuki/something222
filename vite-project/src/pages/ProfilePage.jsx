import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

function ProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ bio: '', avatar_url: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || '',
        avatar_url: user.avatar_url || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.patch('auth/me/', formData);
      setMessage('Профиль успешно обновлен');
    } catch (error) {
      setMessage('Ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <img 
        src={user.avatar_url || 'https://via.placeholder.com/150'} 
        alt="Avatar" 
        style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
      />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea 
            value={formData.bio} 
            onChange={(e) => setFormData({...formData, bio: e.target.value})} 
          />
        </div>
        <div>
          <label>Avatar URL:</label>
          <input 
            type="url" 
            value={formData.avatar_url} 
            onChange={(e) => setFormData({...formData, avatar_url: e.target.value})} 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfilePage;

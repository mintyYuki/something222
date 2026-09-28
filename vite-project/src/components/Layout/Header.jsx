import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', padding: '16px', borderBottom: '1px solid var(--border)' }}>
      {user && (
        <>
          <span>{user.email}</span>
          <img 
            src={user.avatar_url || 'https://via.placeholder.com/40'} 
            alt="Avatar" 
            style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
          />
          <Link to="/profile" className="nav-link">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </header>
  );
}

export default Header;

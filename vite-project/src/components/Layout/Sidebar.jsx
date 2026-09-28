import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside style={{ width: '200px', borderRight: '1px solid var(--border)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2>Logo</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/settings" className="nav-link">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;

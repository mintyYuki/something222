import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function MainLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

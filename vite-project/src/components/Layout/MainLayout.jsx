import Header from './Header';
import Sidebar from './Sidebar';

function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

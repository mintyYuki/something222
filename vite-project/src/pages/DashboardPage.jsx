function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
        <div className="profile-card"><h3>Welcome</h3><p>Glad to see you back!</p></div>
        <div className="profile-card"><h3>Statistics</h3><p>Your activity is looking great.</p></div>
      </div>
    </div>
  );
}

export default DashboardPage;

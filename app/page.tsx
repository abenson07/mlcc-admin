export default function Home() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Home</h1>
        <p className="page-description">Dashboard of charts for revenue</p>
      </div>
      <div className="dashboard-grid">
        <div className="chart-card">
          <h2 className="chart-title">Revenue Overview</h2>
          <div className="chart-placeholder">
            Chart placeholder - Revenue data will be displayed here
          </div>
        </div>
        <div className="chart-card">
          <h2 className="chart-title">Monthly Revenue</h2>
          <div className="chart-placeholder">
            Chart placeholder - Monthly revenue data will be displayed here
          </div>
        </div>
        <div className="chart-card">
          <h2 className="chart-title">Revenue Trends</h2>
          <div className="chart-placeholder">
            Chart placeholder - Revenue trends will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
}


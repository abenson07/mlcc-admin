export default function Routes() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Routes</h1>
        <p className="page-description">Table of Routes</p>
      </div>
      <div className="content-card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Route Name</th>
                <th>Distance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="placeholder-text">
                  Routes table will be displayed here
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


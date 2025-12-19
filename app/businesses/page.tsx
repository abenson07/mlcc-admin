export default function Businesses() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Businesses</h1>
        <p className="page-description">Table of Businesses</p>
      </div>
      <div className="content-card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Business Name</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="placeholder-text">
                  Businesses table will be displayed here
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


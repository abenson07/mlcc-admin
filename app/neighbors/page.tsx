export default function Neighbors() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Neighbors</h1>
        <p className="page-description">Table of neighbors</p>
      </div>
      <div className="content-card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="placeholder-text">
                  Neighbors table will be displayed here
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


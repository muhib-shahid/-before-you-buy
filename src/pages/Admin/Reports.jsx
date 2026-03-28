import { useState, useEffect } from 'react';
import { getReports, resolveReport, dismissReport } from '../../services/reportsService';
// import './Reports.css';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await getReports();
      setLoading(false);
      if (error) setError(error);
      else setReports(data || []);
    };
    fetchReports();
  }, []);

  const handleResolve = async (id) => {
    const { error } = await resolveReport(id);
    if (error) {
      alert(error);
    } else {
      setReports(reports.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    }
  };

  const handleDismiss = async (id) => {
    const { error } = await dismissReport(id);
    if (error) {
      alert(error);
    } else {
      setReports(reports.map(r => r.id === id ? { ...r, status: 'dismissed' } : r));
    }
  };

  if (loading) return <div className="loading-spinner">Loading reports...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-reports">
      <h1><i className="fas fa-flag"></i> User Reports</h1>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Target ID</th>
            <th>Target Type</th>
            <th>Reason</th>
            <th>Reported By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.report_type}</td>
              <td>{report.target_id}</td>
              <td>{report.target_type}</td>
              <td>{report.reason}</td>
              <td>{report.reporter?.username || 'Anonymous'}</td>
              <td>{report.status}</td>
              <td>
                {report.status === 'pending' && (
                  <>
                    <button onClick={() => handleResolve(report.id)} className="resolve">
                      Resolve
                    </button>
                    <button onClick={() => handleDismiss(report.id)} className="dismiss">
                      Dismiss
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReports;
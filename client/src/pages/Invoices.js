
// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import InvoiceViewer from '../components/InvoiceViewer';
// import './Invoices.css';
// export default function Invoices() {
//   const [invoices, setInvoices] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch invoices from backend
//   const fetchInvoices = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/invoices');
//       setInvoices(res.data || []);
//       if (res.data?.length) setSelected(res.data[0]);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to fetch invoices');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   // Create new invoice (stock decreases automatically in backend)
//   const createInvoice = async (invoiceData) => {
//     try {
//       await api.post('/invoices', invoiceData);
//       alert('Purchase successful! Stock updated automatically.');
//       fetchInvoices(); // Refresh invoice list
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || 'Purchase failed');
//     }
//   };

//   return (
//     <div className="grid">
//       {/* Invoice List */}
//       <div className="card" style={{ minHeight: 320 }}>
//         <div className="kicker">Invoices</div>
//         <div style={{ marginTop: 8 }}>
//           <button className="btn btn-ghost" onClick={fetchInvoices}>Refresh</button>
//         </div>
//         <div style={{ marginTop: 12 }}>
//           {loading ? (
//             <div className="muted">Loading...</div>
//           ) : invoices.length === 0 ? (
//             <div className="muted">No invoices yet</div>
//           ) : (
//             <div style={{ display: 'grid', gap: 8 }}>
//               {invoices.map(inv => (
//                 <div
//                   key={inv._id}
//                   className="product-row"
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => setSelected(inv)}
//                 >
//                   <div>
//                     <strong>#{inv._id.slice(-6)}</strong>
//                     <div className="muted">{inv.customer?.name || '—'}</div>
//                   </div>
//                   <div style={{ textAlign: 'right' }}>
//                     <div style={{ fontWeight: 800 }}>₹{inv.total}</div>
//                     <div className="muted">{new Date(inv.createdAt).toLocaleString()}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Invoice Preview */}
//       <div className="card" style={{ minHeight: 320 }}>
//         <div className="kicker">Invoice Preview</div>
//         {selected ? (
//           <InvoiceViewer invoice={selected} />
//         ) : (
//           <div className="muted" style={{ marginTop: 8 }}>
//             Select an invoice to preview
//           </div>
//         )}
//       </div>

    
//       </div>
//     
//   );
// }
import React, { useEffect, useState } from 'react';
import api from '../api';
import InvoiceViewer from '../components/InvoiceViewer';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch invoices from backend
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/invoices');
      setInvoices(res.data || []);
      if (res.data?.length) setSelected(res.data[0]);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Create new invoice
  const createInvoice = async (invoiceData) => {
    try {
      await api.post('/invoices', invoiceData);
      alert('Purchase successful! Stock updated automatically.');
      fetchInvoices();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  // ✅ Inline styles
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
      transition: '0.3s ease',
    },
    kicker: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      borderBottom: '2px solid #f0f0f0',
      paddingBottom: '8px',
    },
    btn: {
      backgroundColor: '#4f46e5',
      color: '#fff',
      border: 'none',
      padding: '8px 14px',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '10px',
      fontWeight: '600',
    },
    muted: {
      color: '#777',
      fontSize: '14px',
    },
    productRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      border: '1px solid #eee',
      borderRadius: '8px',
      backgroundColor: '#fafafa',
      cursor: 'pointer',
      transition: '0.3s',
    },
  };

  return (
    <div style={styles.grid}>
      {/* Invoice List */}
      <div style={styles.card}>
        <div style={styles.kicker}>Invoices</div>
        <button style={styles.btn} onClick={fetchInvoices}>
          Refresh
        </button>

        <div style={{ marginTop: 12 }}>
          {loading ? (
            <div style={styles.muted}>Loading...</div>
          ) : invoices.length === 0 ? (
            <div style={styles.muted}>No invoices yet</div>
          ) : (
            <div style={{ display: 'grid', gap: 8, marginTop: '10px' }}>
              {invoices.map((inv) => (
                <div
                  key={inv._id}
                  style={styles.productRow}
                  onClick={() => setSelected(inv)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#f0f0ff')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#fafafa')
                  }
                >
                  <div>
                    <strong>#{inv._id.slice(-6)}</strong>
                    <div style={styles.muted}>
                      {inv.customer?.name || '—'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800 }}>₹{inv.total}</div>
                    <div style={styles.muted}>
                      {new Date(inv.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invoice Preview */}
      <div style={styles.card}>
        <div style={styles.kicker}>Invoice Preview</div>
        {selected ? (
          <InvoiceViewer invoice={selected} />
        ) : (
          <div style={{ ...styles.muted, marginTop: 8 }}>
            Select an invoice to preview
          </div>
        )}
      </div>
    </div>
  );
}
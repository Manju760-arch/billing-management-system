
// import React, { useEffect, useState } from 'react';
// import api from '../api';

// export default function CreateInvoice() {
//   const [products, setProducts] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [lines, setLines] = useState([]); // {productId, qty}
//   const [selectedCustomer, setSelectedCustomer] = useState('');
//   const [tax, setTax] = useState(0);

//   useEffect(() => { fetchAll(); }, []);

//   const fetchAll = async () => {
//     const p = await api.get('/products'); setProducts(p.data);
//     const c = await api.get('/customers'); setCustomers(c.data);
//   };
    
//   const addLine = () => setLines([...lines, { productId: '', qty: 1 }]);
//   const updateLine = (idx, patch) => { const copy = [...lines]; copy[idx] = { ...copy[idx], ...patch }; setLines(copy); };
//   const removeLine = (idx) => { const copy = [...lines]; copy.splice(idx, 1); setLines(copy); };

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const items = lines.map(l => ({ product: l.productId, qty: +l.qty }));
//       await api.post('/invoices', { customer: selectedCustomer, items, taxPercent: +tax });
//       alert('Invoice created');
//       setLines([]);
//       fetchAll(); // refresh product stock
//     } catch (err) {
//       alert(err.response?.data?.error || 'Error creating invoice');
//     }
//   };

//   const computeTotal = () => {
//     let subtotal = 0;
//     for (const l of lines) {
//       const p = products.find(x => x._id === l.productId);
//       if (p) subtotal += p.price * (l.qty || 0);
//     }
//     const taxAmount = subtotal * (tax / 100);
//     return (subtotal + taxAmount).toFixed(2);
//   };

//   return (
//     <div>
//       <h3>Create Invoice</h3>
//       <form onSubmit={submit}>
//         <div>
//           <label>Customer:</label>
//           <select value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)} required>
//             <option value="">--select--</option>
//             {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
//           </select>
//         </div>

//         <div style={{ marginTop: 8 }}>
//           <button type="button" onClick={addLine}>Add item</button>
//         </div>

//         <div>
//           {lines.map((l, idx) => (
//             <div key={idx} style={{ marginTop: 8 }}>
//               <select value={l.productId} onChange={e => updateLine(idx, { productId: e.target.value })} required>
//                 <option value="">--product--</option>
//                 {products.map(p => (
//                   <option key={p._id} value={p._id} disabled={p.stock === 0}>
//                     {p.name} — ₹{p.price} {p.stock === 0 ? '(Out of stock)' : `(Stock: ${p.stock})`}
//                   </option>
//                 ))}
//               </select>
//               <input type="number" value={l.qty} min="1" onChange={e => updateLine(idx, { qty: +e.target.value })} style={{ width: 80 }} />
//               <button type="button" onClick={() => removeLine(idx)}>Remove</button>
//             </div>
//           ))}
//         </div>

//         <div style={{ marginTop: 8 }}>
//           <label>Tax %</label>
//           <input type="number" value={tax} onChange={e => setTax(e.target.value)} />
//         </div>

//         <div style={{ marginTop: 8 }}>Total: ₹{computeTotal()}</div>

//         <div style={{ marginTop: 12 }}>
//           <button type="submit">Create Invoice</button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import api from '../api';

export default function CreateInvoice() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [tax, setTax] = useState(0);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const p = await api.get('/products');
    setProducts(p.data);
    const c = await api.get('/customers');
    setCustomers(c.data);
  };

  const addLine = () => setLines([...lines, { productId: '', qty: 1 }]);
  const updateLine = (idx, patch) => {
    const copy = [...lines];
    copy[idx] = { ...copy[idx], ...patch };
    setLines(copy);
  };
  const removeLine = (idx) => {
    const copy = [...lines];
    copy.splice(idx, 1);
    setLines(copy);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const items = lines.map((l) => ({ product: l.productId, qty: +l.qty }));
      await api.post('/invoices', {
        customer: selectedCustomer,
        items,
        taxPercent: +tax,
      });
      alert('Invoice created');
      setLines([]);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.error || 'Error creating invoice');
    }
  };

  const computeTotal = () => {
    let subtotal = 0;
    for (const l of lines) {
      const p = products.find((x) => x._id === l.productId);
      if (p) subtotal += p.price * (l.qty || 0);
    }
    const taxAmount = subtotal * (tax / 100);
    return (subtotal + taxAmount).toFixed(2);
  };

  // ✅ Inline styles
  const styles = {
    container: {
      maxWidth: '700px',
      margin: '40px auto',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      color: '#444',
    },
    select: {
      width: '100%',
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '15px',
    },
    input: {
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '15px',
      width: '80px',
      marginLeft: '8px',
    },
    button: {
      backgroundColor: '#4f46e5',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      marginRight: '8px',
      transition: '0.3s',
    },
    removeBtn: {
      backgroundColor: '#dc2626',
      color: '#fff',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '6px',
      cursor: 'pointer',
      marginLeft: '8px',
      fontSize: '14px',
    },
    addBtn: {
      backgroundColor: '#10b981',
      color: '#fff',
      border: 'none',
      padding: '8px 14px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      marginTop: '8px',
    },
    total: {
      fontWeight: 'bold',
      fontSize: '18px',
      color: '#333',
      marginTop: '12px',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Create Invoice</h3>

      <form onSubmit={submit}>
        {/* Customer Selection */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Customer:</label>
          <select
            style={styles.select}
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            required
          >
            <option value="">-- Select Customer --</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add Line Button */}
        <div style={styles.formGroup}>
          <button
            type="button"
            style={styles.addBtn}
            onClick={addLine}
          >
            + Add Item
          </button>
        </div>

        {/* Line Items */}
        {lines.map((l, idx) => (
          <div key={idx} style={{ marginTop: 10, display: 'flex', alignItems: 'center' }}>
            <select
              style={{ ...styles.select, width: '60%' }}
              value={l.productId}
              onChange={(e) => updateLine(idx, { productId: e.target.value })}
              required
            >
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p._id} disabled={p.stock === 0}>
                  {p.name} — ₹{p.price}{' '}
                  {p.stock === 0 ? '(Out of stock)' : `(Stock: ${p.stock})`}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={l.qty}
              min="1"
              onChange={(e) => updateLine(idx, { qty: +e.target.value })}
              style={styles.input}
            />

            <button
              type="button"
              style={styles.removeBtn}
              onClick={() => removeLine(idx)}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Tax Input */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Tax %:</label>
          <input
            type="number"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Total */}
        <div style={styles.total}>Total: ₹{computeTotal()}</div>

        {/* Submit */}
        <div style={{ marginTop: 20 }}>
          <button type="submit" style={styles.button}>
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import api from '../api';
import CustomerForm from '../components/CustomerForm';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/customers');
      setCustomers(res.data || []);
    } catch (err) {
      console.error(err); alert('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const addCustomer = async (c) => {
    try {
      await api.post('/customers', c);
      fetchCustomers();
    } catch (err) { console.error(err); alert('Create failed'); }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm('Delete this customer?')) return;
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  return (
    <div>
      <div className="grid">
        <div className="card">
          <div className="kicker">Customers</div>
          <div className="muted" style={{ marginTop:6 }}>Add and manage your customers</div>
          <div style={{ marginTop:12 }}>
            <CustomerForm onSubmit={addCustomer} />
          </div>
        </div>

        <div className="card">
          <div className="kicker">All Customers</div>
          <div style={{ marginTop:12 }}>
            {loading ? <div className="muted">Loading...</div> : (
              customers.length === 0 ? <div className="muted">No customers yet</div> : (
                <div style={{ display:'grid', gap:10 }}>
                  {customers.map(c => (
                    <div key={c._id} className="product-row" style={{ alignItems:'center' }}>
                      <div>
                        <strong>{c.name}</strong>
                        <div className="muted">{c.phone || '—'} • {c.email || '—'}</div>
                      </div>
                      <div style={{ display:'flex', gap:8 }}>
                        <button className="btn btn-danger" onClick={() => deleteCustomer(c._id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function CustomerForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, name: form.name.trim() });
    setForm({ name: '', phone: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="kicker">Add customer</div>
      <div style={{ display: 'grid', gap: 10 }}>
        <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <button className="btn btn-primary" type="submit">Add Customer</button>
        </div>
      </div>
    </form>
  );
}
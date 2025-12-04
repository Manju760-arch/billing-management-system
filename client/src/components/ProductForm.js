
import React, { useState, useEffect } from "react";

export default function ProductForm({ onSubmit, initial = null }) {
  useEffect(() => {
  if (initial) setForm(initial);
}, [initial]);
 const saving = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: form.name.trim(),
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
    });
    setForm({ name: '', price: '', stock: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="kicker">Add product</div>
      <div style={{ display: 'grid', gap: 10 }}>
        <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <div style={{ display:'flex', gap:8 }}>
          <input className="input" placeholder="Price (₹)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} type="number" step="0.01" />
          <input className="input" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} type="number" />
        </div>
        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <button className="btn btn-primary" type="submit">{saving ? 'Saving...' : 'Add Product'}</button>
        </div>
      </div>
    </form>
  );
}
import React from 'react';

export default function InvoiceViewer({ invoice }) {
  if (!invoice) return null;
  return (
    <div className="card">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h3 style={{ marginBottom:6 }}>Invoice #{invoice._id?.slice(-6)}</h3>
          <div className="muted">Customer: <strong>{invoice.customer?.name || '—'}</strong></div>
          <div className="muted">Date: {new Date(invoice.createdAt).toLocaleString()}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:18, fontWeight:800 }}>₹{invoice.total}</div>
          <div className="muted">Tax: {invoice.taxPercent}%</div>
        </div>
      </div>

      <table className="table" style={{ marginTop:12 }}>
        <thead>
          <tr>
            <th>Product</th>
            <th style={{width:80}}>Qty</th>
            <th style={{width:110}}>Unit</th>
            <th style={{width:110}}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((it, i) => (
            <tr key={i}>
              <td>{it.name}</td>
              <td>{it.qty}</td>
              <td>₹{it.price}</td>
              <td>₹{it.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
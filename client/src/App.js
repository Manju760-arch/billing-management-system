import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import './style.css';
import Products from './pages/Products';
import Customers from './pages/Customers';
import CreateInvoice from './pages/CreateInvoice';
import Invoices from './pages/Invoices';

export default function App() {
  return (
    <Router>
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="logo">🧾</div>
            <div>
              <h1>BillingPro</h1>
              <small>Simple • Fast • Pretty</small>
            </div>
          </div>

          <nav className="nav">
            <NavLink to="/" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} end>Products</NavLink>
            <NavLink to="/customers" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Customers</NavLink>
            <NavLink to="/create-invoice" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Create Invoice</NavLink>
            <NavLink to="/invoices" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Invoices</NavLink>
          </nav>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/create-invoice" element={<CreateInvoice />} />
            <Route path="/invoices" element={<Invoices />} />
          </Routes>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} BillingPro</span>
          <span>Made with ❤</span>
        </footer>
      </div>
    </Router>
  );
}
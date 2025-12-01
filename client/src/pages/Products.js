import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductForm from '../components/ProductForm';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // ✅ Use backend URL from Render
      const res = await api.get('https://billing-management-system-1.onrender.com/api/products');
      // ✅ Handle if backend sends { products: [...] }
      const data = Array.isArray(res.data) ? res.data : res.data.products || [];
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const addProduct = async (p) => {
    try {
      await api.post('/products', p);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to create product');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="grid" style={{ marginBottom: 16 }}>
        {/* Product Form */}
        <div className="card" style={{ minWidth: 300 }}>
          <div className="kicker">Products</div>
          <div style={{ marginTop: 8 }} className="muted">
            Manage items you sell. Add price and stock.
          </div>
          <div style={{ marginTop: 12 }}>
            <ProductForm onSubmit={addProduct} />
          </div>
        </div>

        {/* Product List */}
        <div className="card" style={{ minWidth: 320 }}>
          <div className="kicker">All Products</div>
          <div style={{ marginTop: 12 }}>
            {loading ? (
              <div className="muted">Loading...</div>
            ) : Array.isArray(products) && products.length === 0 ? (
              <div className="muted">No products yet</div>
            ) : Array.isArray(products) ? (
              <div style={{ display: 'grid', gap: 10 }}>
                {products.map((p) => (
                  <div key={p._id} className="product-row">
                    <div className="product-meta">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong>{p.name}</strong>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div className="product-tag">₹{p.price}</div>
                      <div className="muted">Stock: {p.stock}</div>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="muted">Failed to load products</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
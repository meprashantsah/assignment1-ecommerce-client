import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  // Track selections per product by id
  const [selections, setSelections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);

        // Initialize default selections for ALL products
        const initialSelections = {};
        data.forEach((product, index) => {
          // Use index as fallback if product.id doesn't exist
          const productKey = product._id || index;
          initialSelections[productKey] = {
            color: product.color?.[0] || '',
            size: product.sizes?.[0] || '',
            quantity: 1
          };
        });
        setSelections(initialSelections);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSelectionChange = useCallback((productId, field, value) => {
    setSelections(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  }, []);

  const handleBuyNow = (product, index) => {
    const productKey = product._id || index;
    const selection = selections[productKey];
    navigate('/checkout', {
      state: {
        productId: product._id || productKey,
        title: product.title,
        color: selection?.color || '',
        size: selection?.size || '',
        quantity: selection?.quantity || 1,
        price: product.price
      }
    });
  };


  if (products.length === 0) return <div className="landing-container">Loading...</div>;

  return (
    <div className="landing-container grid-container">
      {products.map((product, index) => {
        const productKey = product._id || index;
        return (
          <div key={productKey} className="product-card">
            <img src={product.image_url} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>

            <div className="selectors">
              <div className="selectors-row">
                {/* Only show color selector if product has colors */}
                {product.color && product.color.length > 0 && (
                  <label>
                    Color:
                    <select
                      value={selections[productKey]?.color || ''}
                      onChange={e => handleSelectionChange(productKey, 'color', e.target.value)}
                    >
                      {product.color.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                )}

                {/* Only show size selector if product has sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <label>
                    Size:
                    <select
                      value={selections[productKey]?.size || ''}
                      onChange={e => handleSelectionChange(productKey, 'size', e.target.value)}
                    >
                      {product.sizes.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>

              <div className="actions-row">
                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={selections[productKey]?.quantity || 1}
                    onChange={e => handleSelectionChange(productKey, 'quantity', Number(e.target.value))}
                  />
                </label>
                <button className="buy-now-button" onClick={() => handleBuyNow(product, index)}>
                  Buy Now
                </button>

              </div>
            </div>
          </div>
        );
      })} 
    </div>
  );
};

export default LandingPage;
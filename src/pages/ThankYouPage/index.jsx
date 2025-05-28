import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const { state } = useLocation();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // TODO: Uncomment and use actual backend order ID to fetch real order data
        // const response = await fetch(`/api/orders/${state.orderId}`);
        // const data = await response.json();
        // setOrder(data);

        // 🔧 TEMP: Static fallback data, remove once backend is ready
        setOrder({
          orderNumber: state?.order?.orderNumber || 'ORD123456',
          title: state?.order?.title || 'Classic T-Shirt',
          variant: state?.order?.variant || 'Blue',
          size: state?.order?.size || 'L',
          quantity: state?.order?.quantity || 2,
          price: state?.order?.price || 29.99,
          total: state?.order?.total || 59.98,
          fullName: state?.order?.fullName || 'John Doe',
          email: state?.order?.email || 'john@example.com',
          phone: state?.order?.phone || '1234567890',
          address: state?.order?.address || '123 Main St',
          city: state?.order?.city || 'Springfield',
          state: state?.order?.state || 'IL',
          zip: state?.order?.zip || '62704'
        });
      } catch (error) {
        console.error('Error fetching order:', error);
        navigate('/');
      }
    };

    fetchOrderDetails();
  }, [state, navigate]);

  if (!order) return <div className="thank-you-page">Loading...</div>;

  return (
    <div className="thank-you-page">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been placed successfully.</p>

      <div className="confirmation-box">
        <h2>Order #: {order.orderNumber}</h2>

        <h3>Order Summary</h3>
        <ul>
          <li><strong>Product:</strong> {order.title} ({order.variant}, {order.size})</li>
          <li><strong>Quantity:</strong> {order.quantity}</li>
          <li><strong>Price:</strong> ${order.price.toFixed(2)}</li>
          <li><strong>Total:</strong> ${order.total.toFixed(2)}</li>
        </ul>

        <h3>Customer Info</h3>
        <ul>
          <li><strong>Name:</strong> {order.fullName}</li>
          <li><strong>Email:</strong> {order.email}</li>
          <li><strong>Phone:</strong> {order.phone}</li>
          <li><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.zip}</li>
        </ul>

        <div className="final-msg">
          A confirmation email has been sent to <strong>{order.email}</strong>.
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

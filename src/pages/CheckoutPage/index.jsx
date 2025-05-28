// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './CheckoutPage.css';

// const CheckoutPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   // Add these debug logs
//   console.log('CheckoutPage mounted');
//   console.log('Location state:', state);
//   console.log('Current pathname:', window.location.pathname);

//   const [productDetails, setProductDetails] = useState(null);
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     zip: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);


//   useEffect(() => {
//     if (state?.productId) {
//       setProductDetails({
//         id: state.productId,
//         title: state.title,
//         price: state.price,
//         color: state.color,
//         size: state.size,
//         quantity: state.quantity
//       });
//     } else {
//       // This might be redirecting you back immediately
//       console.log('No product state found, redirecting to home');
//       navigate('/', { replace: true });
//     }
//   }, [state, navigate]);



//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const errs = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const cardRegex = /^[0-9]{16}$/;
//     const cvvRegex = /^[0-9]{3}$/;
//     const today = new Date();
//     const expDate = new Date(form.expiryDate);

//     if (!form.fullName) errs.fullName = 'Full Name is required';
//     if (!emailRegex.test(form.email)) errs.email = 'Invalid email';
//     if (!phoneRegex.test(form.phone)) errs.phone = 'Phone must be 10 digits';
//     if (!form.address) errs.address = 'Address is required';
//     if (!form.city) errs.city = 'City is required';
//     if (!form.state) errs.state = 'State is required';
//     if (!form.zip) errs.zip = 'Zip code is required';
//     if (!cardRegex.test(form.cardNumber)) errs.cardNumber = 'Card must be 16 digits';
//     if (!cvvRegex.test(form.cvv)) errs.cvv = 'CVV must be 3 digits';
//     if (isNaN(expDate) || expDate <= today) errs.expiryDate = 'Expiry must be a future date';

//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) return;

//     setIsSubmitting(true);

//     const orderData = {
//       ...form,
//       ...productDetails,
//       total: productDetails.price * productDetails.quantity,
//       orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000)
//     };

    
//     // Simulate transaction result
//     setTimeout( async() => {
//       const outcomes = ['approved', 'declined', 'error'];
//       const result = outcomes[Math.floor(Math.random() * outcomes.length)];

//       if (result === 'approved') {
//         // 1. Send confirmation email
//         try {
//           await fetch('http://localhost:8000/api/email/send-confirmation', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               email: form.email,
//               name: form.fullName,
//               productTitle: productDetails.title,
//               quantity: productDetails.quantity,
//               total: productDetails.price * productDetails.quantity,
//               orderNumber: orderData.orderNumber
//             })
//           });
//         } catch (err) {
//           console.error('Error sending email:', err);
//         }

//         // 2. Navigate to thank-you page
//         navigate('/thank-you', { state: { order: orderData } });
//       }

//       setIsSubmitting(false);
//     }, 1500);
//   };

//   if (!productDetails) return <div className="checkout-container">Loading...</div>;

//   const { title, color, size, quantity, price } = productDetails;
//   const subtotal = price * quantity;

//   return (
//     <div className="checkout-container">
//       <form className="checkout-form" onSubmit={handleSubmit}>
//         <h2>Checkout</h2>

//         {[
//           { name: 'fullName', label: 'Full Name' },
//           { name: 'email', label: 'Email' },
//           { name: 'phone', label: 'Phone Number' },
//           { name: 'address', label: 'Address' },
//           { name: 'city', label: 'City' },
//           { name: 'state', label: 'State' },
//           { name: 'zip', label: 'Zip Code' },
//           { name: 'cardNumber', label: 'Card Number' },
//           { name: 'expiryDate', label: 'Expiry Date', type: 'month' },
//           { name: 'cvv', label: 'CVV' }
//         ].map(({ name, label, type }) => (
//           <label key={name}>
//             {label}
//             <input
//               type={type || 'text'}
//               name={name}
//               value={form[name]}
//               onChange={handleChange}
//             />
//             {errors[name] && <span>{errors[name]}</span>}
//           </label>
//         ))}

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Processing...' : 'Submit Payment'}
//         </button>
//       </form>

//       <div className="order-summary">
//         <h3>Order Summary</h3>
//         <p><strong>Product:</strong> {title} ({color}, {size})</p>
//         <p><strong>Quantity:</strong> {quantity}</p>
//         <p><strong>Price:</strong> ${price.toFixed(2)}</p>
//         <p><strong>Total:</strong> ${subtotal.toFixed(2)}</p>
//       </div>

        

//     </div>
//   );
// };

// export default CheckoutPage;








import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log('CheckoutPage mounted');
  console.log('Location state:', state);
  console.log('Current pathname:', window.location.pathname);

  const [productDetails, setProductDetails] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState(''); // New state for messages

  useEffect(() => {
    if (state?.productId) {
      setProductDetails({
        id: state.productId,
        title: state.title,
        price: state.price,
        color: state.color,
        size: state.size,
        quantity: state.quantity
      });
    } else {
      console.log('No product state found, redirecting to home');
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const cardRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3,4}$/; // CVV can be 3 or 4 digits (Amex)
    const today = new Date();
    const [year, month] = form.expiryDate.split('-').map(Number);
    const expDate = new Date(year, month - 1); // Month is 0-indexed in JS Date

    if (!form.fullName) errs.fullName = 'Full Name is required';
    if (!emailRegex.test(form.email)) errs.email = 'Invalid email format';
    if (!phoneRegex.test(form.phone)) errs.phone = 'Phone must be 10 digits';
    if (!form.address) errs.address = 'Address is required';
    if (!form.city) errs.city = 'City is required';
    if (!form.state) errs.state = 'State is required';
    if (!form.zip) errs.zip = 'Zip code is required';
    if (!cardRegex.test(form.cardNumber)) errs.cardNumber = 'Card must be 16 digits';
    if (!cvvRegex.test(form.cvv)) errs.cvv = 'CVV must be 3 or 4 digits';
    
    // Validate expiry date: must be in the future
    if (!form.expiryDate) {
        errs.expiryDate = 'Expiry date is required';
    } else if (isNaN(expDate.getTime())) { // Check for invalid date
        errs.expiryDate = 'Invalid expiry date format';
    } else {
        // Create a date for the first day of the *next* month after today
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1);

        // Compare the entered expiry month/year with the current month/year
        // The expiry month is valid if it's strictly after the current month,
        // or if it's the current month AND the year is strictly after the current year.
        if (expDate < firstDayOfNextMonth) {
            errs.expiryDate = 'Expiry date must be in the future';
        }
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTransactionMessage(''); // Clear previous messages

    if (Object.keys(validationErrors).length > 0) {
      console.log('Validation errors:', validationErrors); // Log validation errors
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      ...form,
      productId: productDetails.id, // Ensure productId is passed, not the whole productDetails object
      title: productDetails.title,
      price: productDetails.price,
      color: productDetails.color,
      size: productDetails.size,
      quantity: productDetails.quantity,
      total: productDetails.price * productDetails.quantity,
      orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000)
    };

    // Simulate transaction result
    setTimeout(async () => {
      const outcomes = ['approved', 'declined', 'error'];
      const result = outcomes[Math.floor(Math.random() * outcomes.length)];
      // const result = 'declined'; // Uncomment to force a specific outcome for testing

      if (result === 'approved') {
        setTransactionMessage('Payment Approved! Redirecting...');
        // 1. Send confirmation email
        try {
          await fetch('http://localhost:8000/api/email/send-confirmation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: form.email,
              fullName: form.fullName,
              title: productDetails.title,
              quantity: productDetails.quantity,
              total: productDetails.price * productDetails.quantity,
              orderNumber: orderData.orderNumber
            })
          });
          console.log('Confirmation email sent successfully.');
        } catch (err) {
          console.error('Error sending email:', err);
          setTransactionMessage('Payment Approved, but failed to send confirmation email.');
        }

        // 2. Navigate to thank-you page
        navigate('/thank-you', { state: { order: orderData } });
      } else if (result === 'declined') {
        setTransactionMessage('Payment Declined. Please check your card details or try another card.');
        console.log('Payment Declined for order:', orderData);
      } else { // result === 'error'
        setTransactionMessage('An error occurred during payment processing. Please try again later.');
        console.error('Payment Error for order:', orderData);
      }

      setIsSubmitting(false);
    }, 1500);
  };

  if (!productDetails) return <div className="checkout-container">Loading...</div>;

  const { title, color, size, quantity, price } = productDetails;
  const subtotal = price * quantity;

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>

        {[
          { name: 'fullName', label: 'Full Name' },
          { name: 'email', label: 'Email' },
          { name: 'phone', label: 'Phone Number' },
          { name: 'address', label: 'Address' },
          { name: 'city', label: 'City' },
          { name: 'state', label: 'State' },
          { name: 'zip', label: 'Zip Code' },
          { name: 'cardNumber', label: 'Card Number' },
          { name: 'expiryDate', label: 'Expiry Date', type: 'month' },
          { name: 'cvv', label: 'CVV' }
        ].map(({ name, label, type }) => (
          <label key={name}>
            {label}
            <input
              type={type || 'text'}
              name={name}
              value={form[name]}
              onChange={handleChange}
              // Add a class for error styling if you have it in CSS
              className={errors[name] ? 'input-error' : ''}
            />
            {errors[name] && <span className="error-message">{errors[name]}</span>}
          </label>
        ))}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Submit Payment'}
        </button>
        {transactionMessage && <p className="transaction-message">{transactionMessage}</p>} {/* Display message */}
      </form>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p><strong>Product:</strong> {title} ({color}, {size})</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Price:</strong> ${price.toFixed(2)}</p>
        <p><strong>Total:</strong> ${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutPage;

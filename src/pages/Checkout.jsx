import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

const GHANA_REGIONS = [
  'Greater Accra',
  'Ashanti',
  'Central',
  'Eastern',
  'Western',
  'Volta',
  'Northern',
  'Upper East',
  'Upper West',
  'Bono',
  'Bono East',
  'Ahafo',
  'Oti',
  'Savannah',
  'North East',
  'Western North'
];

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shippingCost = subtotal > 1000 || cart.length === 0 ? 0 : 50;
  const grandTotal = subtotal + shippingCost;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: 'Greater Accra',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-[#0a0a0c] border border-[#8B263E]/40 p-10 rounded-xs text-center space-y-5 shadow-2xl relative overflow-hidden">
          
          <div className="w-16 h-16 mx-auto bg-[#2c1218] border border-[#8B263E] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(179,57,91,0.4)]">
            <CheckCircle2 className="w-8 h-8 text-[#B3395B]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black uppercase tracking-wider text-white">Order Received!</h1>
            <p className="text-xs text-gray-300">
              Thank you, <span className="font-bold text-[#B3395B]">{formData.firstName}</span>. Your order summary has been logged.
            </p>
            <p className="text-[11px] text-gray-500 pt-1">
              (Note: This is a frontend demo application. No payment was charged.)
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full inline-flex items-center justify-center px-8 py-3.5 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs"
          >
            Return Home
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Title Header matching Contact.jsx */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest text-white">
          Checkout
        </h1>
        <p className="text-xs text-[#B3395B] uppercase tracking-widest font-semibold">
          Finalize your luxury selection
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Customer & Shipping Details Card */}
        <div className="lg:col-span-2 bg-[#0a0a0c] border border-[#8B263E]/40 p-8 rounded-xs space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#B3395B] border-b border-[#8B263E]/40 pb-3 flex items-center gap-2">
            <span>1. Customer & Shipping Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all rounded-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all rounded-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all rounded-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g. 024 123 4567"
                value={formData.phone}
                onChange={handleChange}
                className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all rounded-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Delivery Address *
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="Street name, landmark, house number"
              value={formData.address}
              onChange={handleChange}
              className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all rounded-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                City / Town *
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all rounded-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Region *
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all rounded-xs"
              >
                {GHANA_REGIONS.map((reg) => (
                  <option key={reg} value={reg} className="bg-[#18181b] text-white">
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Order Overview Sidebar */}
        <div className="bg-[#0a0a0c] border border-[#8B263E]/40 p-8 space-y-6 h-fit rounded-xs">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#B3395B] border-b border-[#8B263E]/40 pb-3">
            2. Order Overview
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="font-medium text-gray-300 truncate max-w-[180px]">
                  {item.name || item.title} (x{item.quantity})
                </span>
                <span className="font-bold text-white">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#8B263E]/40 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="text-white font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery Fee</span>
              <span className="text-[#B3395B] font-semibold">
                {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
              </span>
            </div>
            <div className="border-t border-[#8B263E]/40 pt-3 flex justify-between text-sm font-extrabold text-white">
              <span>Total</span>
              <span className="text-[#B3395B] text-base">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs"
          >
            Place Order
          </button>
        </div>

      </form>
    </div>
  );
};

export default Checkout;
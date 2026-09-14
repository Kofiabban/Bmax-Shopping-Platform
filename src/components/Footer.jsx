import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

const Footer = () => {
  const [status, setStatus] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      // Replace with your actual Formspree Endpoint ID
      const response = await fetch("https://formspree.io/f/xaeyaapw", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <footer className="bg-[#0a0a0c] text-white pt-16 pb-12 border-t border-[#8B263E]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why BMAX Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-[#8B263E]/30">
          <div className="flex items-start gap-3.5">
            <Award className="w-6 h-6 text-[#B3395B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white leading-snug">
                Quality Fashion
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Carefully selected for premium style & comfort.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-[#B3395B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white leading-snug">
                Affordable Prices
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                High-end fashion without excessive markups.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Truck className="w-6 h-6 text-[#B3395B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white leading-snug">
                Fast Delivery
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Reliable nationwide delivery across Ghana.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-6 h-6 text-[#B3395B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white leading-snug">
                Secure Shopping
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Simple, reliable, protected user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          
          {/* Brand Info & Social Media Links */}
          <div>
            <span className="text-2xl font-black tracking-widest text-white uppercase block mb-4">
              BMAX
            </span>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Style That Defines You. Crafted modern wear designed with modern precision for Men, Women, and Children.
            </p>
            <div className="flex gap-3">
              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/tb.abban?stkn=bmpsbTF3N291YWdr&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#2c1218] border border-[#8B263E]/60 text-gray-300 hover:text-white hover:bg-[#82354b] hover:shadow-[0_0_15px_rgba(179,57,91,0.5)] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Facebook Link */}
              <a
                href="https://www.facebook.com/share/1d4XA4nd15/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#2c1218] border border-[#8B263E]/60 text-gray-300 hover:text-white hover:bg-[#82354b] hover:shadow-[0_0_15px_rgba(179,57,91,0.5)] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              {/* Twitter / X Link */}
              <a
                href="https://x.com/abbannn1?s=11"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#2c1218] border border-[#8B263E]/60 text-gray-300 hover:text-white hover:bg-[#82354b] hover:shadow-[0_0_15px_rgba(179,57,91,0.5)] transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Collections Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B3395B] mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link to="/men" className="hover:text-[#B3395B] transition-colors">Men's Fashion</Link></li>
              <li><Link to="/women" className="hover:text-[#B3395B] transition-colors">Women's Fashion</Link></li>
              <li><Link to="/children" className="hover:text-[#B3395B] transition-colors">Kids Collection</Link></li>
              <li><Link to="/shop" className="hover:text-[#B3395B] transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B3395B] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link to="/contact" className="hover:text-[#B3395B] transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-[#B3395B] transition-colors">About BMAX</Link></li>
              <li><span className="cursor-pointer hover:text-[#B3395B] transition-colors">Shipping & Delivery</span></li>
              <li><span className="cursor-pointer hover:text-[#B3395B] transition-colors">Returns & Exchanges</span></li>
            </ul>
          </div>

          {/* Connected Formspree Newsletter Form */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B3395B] mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2.5">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="bg-[#18181b] text-white text-xs px-4 py-3 border border-[#8B263E]/50 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_15px_rgba(179,57,91,0.5)] active:scale-95"
              >
                Subscribe
              </button>
            </form>

            {status === "SUCCESS" && (
              <p className="text-xs text-green-400 mt-2 font-medium">
                Thank you for subscribing to BMAX!
              </p>
            )}
            {status === "ERROR" && (
              <p className="text-xs text-red-400 mt-2 font-medium">
                Oops! Something went wrong,try again.
              </p>
            )}
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[#8B263E]/30 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} BMAX Clothing. All rights reserved. Built with precision.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
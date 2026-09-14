import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest text-white">
          Get In Touch
        </h1>
        <p className="text-xs text-[#B3395B] uppercase tracking-widest font-semibold">
          We are here to assist your styling journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information Sidebar */}
        <div className="bg-[#0a0a0c] border border-[#8B263E]/40 p-8 space-y-8 rounded-xs text-white">
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-[#B3395B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Phone Support</h4>
              <p className="text-xs text-gray-400 mt-1">+233 (0) 55 999 6435</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-[#B3395B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Email Inquiry</h4>
              <p className="text-xs text-gray-400 mt-1">support@bmaxstyle.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-[#B3395B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Flagship Store</h4>
              <p className="text-xs text-gray-400 mt-1">Accra, Greater Accra Region, Ghana</p>
            </div>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="lg:col-span-2 bg-[#0a0a0c] border border-[#8B263E]/40 p-8 rounded-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all"
              />
            </div>
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all"
            />
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Your Message"
              className="bg-[#18181b] border border-[#8B263E]/50 p-3 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#B3395B] focus:ring-1 focus:ring-[#B3395B] transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs"
            >
              Send Message
            </button>
          </form>

          {status === "SUCCESS" && (
            <p className="text-xs text-green-400 mt-4 font-medium">
              Thank you! Your message has been sent successfully.
            </p>
          )}
          {status === "ERROR" && (
            <p className="text-xs text-red-400 mt-4 font-medium">
              Oops! Something went wrong,try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
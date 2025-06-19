import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              We are committed to providing the best products at the best prices. Shop with confidence and enjoy fast shipping worldwide.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/returns" className="hover:text-white transition">Returns</a></li>
              <li><a href="/shipping" className="hover:text-white transition">Shipping Info</a></li>
              <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-gray-400">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white transition">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.8v-7H8v-3h2.5V9.5a3.5 3.5 0 013.7-3.8 15 15 0 012 .1v2.3h-1.3c-1 0-1.3.5-1.3 1.2V12h2.6l-.4 3h-2.2v7A10 10 0 0022 12z"/></svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white transition">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.1.9A5.4 5.4 0 0022.4.4a11 11 0 01-3.5 1.3A5.5 5.5 0 0016 0a5.5 5.5 0 00-5.5 5.5c0 .4 0 .8.1 1.2A15.6 15.6 0 013 1.7a5.5 5.5 0 001.7 7.3 5.4 5.4 0 01-2.5-.7v.1a5.5 5.5 0 004.4 5.4 5.5 5.5 0 01-2.5.1 5.5 5.5 0 005.1 3.8A11 11 0 010 20.4a15.6 15.6 0 008.4 2.5c10 0 15.5-8.3 15.5-15.5v-.7A11 11 0 0023 3z"/></svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white transition">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.3.1 2.1.3 2.6.5.6.3 1 .6 1.5 1.1.5.5.8.9 1.1 1.5.2.5.4 1.3.5 2.6.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.3-.3 2.1-.5 2.6-.3.6-.6 1-1.1 1.5-.5.5-.9.8-1.5 1.1-.5.2-1.3.4-2.6.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.3-.1-2.1-.3-2.6-.5-.6-.3-1-.6-1.5-1.1-.5-.5-.8-.9-1.1-1.5-.2-.5-.4-1.3-.5-2.6C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.3.3-2.1.5-2.6.3-.6.6-1 1.1-1.5.5-.5.9-.8 1.5-1.1.5-.2 1.3-.4 2.6-.5C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.5.5 3.5 1c-1 .5-1.8 1.2-2.5 2C.5 4.3.2 5.5.1 6.8 0 8.1 0 8.5 0 12c0 3.5 0 3.9.1 5.2.1 1.3.4 2.5.9 3.5.5 1 1.2 1.8 2 2.5.7.7 1.5 1.2 2.5 1.7 1 .4 2.2.7 3.5.8 1.3.1 1.7.1 5.2.1s3.9 0 5.2-.1c1.3-.1 2.5-.4 3.5-.9 1-.5 1.8-1.2 2.5-2 .7-.7 1.2-1.5 1.7-2.5.4-1 .7-2.2.8-3.5.1-1.3.1-1.7.1-5.2s0-3.9-.1-5.2c-.1-1.3-.4-2.5-.9-3.5-.5-1-.9-1.8-2-2.5C20.5.5 19.3.2 18 .1 16.7 0 16.3 0 12 0z"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} YourShopName. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export default function Footer() {
return (
  <footer className="bg-black text-indigo-500 mt-10">
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      
      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold">CampusMarket</h2>
        <p className="mt-3 text-sm text-white leading-relaxed">
          Student-only marketplace to buy & sell products and services 
          within your campus. Secure and simple.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-3 border-b border-white pb-1">Quick Links</h3>
        <ul className="space-y-2 text-white text-sm">
          <li><a href="/about" className="hover:text-indigo-500 transition">About Us</a></li>
          <li><a href="/listings" className="hover:text-indigo-500 transition">Browse Listings</a></li>
          <li><a href="/sell" className="hover:text-indigo-500 transition">Sell an Item</a></li>
          <li><a href="/contact" className="hover:text-indigo-500 transition">Contact</a></li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-lg font-semibold mb-3 border-b border-white pb-1">Support</h3>
        <ul className="space-y-2 text-white text-sm">
          <li><a href="/faq" className="hover:text-indigo-500 transition">FAQs</a></li>
          <li><a href="/terms" className="hover:text-indigo-500 transition">Terms & Conditions</a></li>
          <li><a href="/privacy" className="hover:text-indigo-500 transition">Privacy Policy</a></li>
        </ul>
      </div>

      {/* Socials */}
      <div>
        <h3 className="text-lg font-semibold mb-3 border-b border-white pb-1">Connect</h3>
        <div className="flex space-x-4 text-white">
          <a href="#" className="hover:text-indigo-500 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38c-.83.5-1.75.86-2.73 1.06a4.27 4.27 0 0 0-7.27 3.9A12.12 12.12 0 0 1 3.15 4.6a4.27 4.27 0 0 0 1.32 5.7c-.68-.02-1.32-.21-1.88-.52v.05c0 2.06 1.46 3.78 3.4 4.18-.36.1-.75.16-1.14.16-.28 0-.55-.03-.81-.08.55 1.73 2.14 2.98 4.03 3.02a8.57 8.57 0 0 1-5.3 1.83c-.34 0-.68-.02-1.01-.06A12.08 12.08 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0 0 22.46 6z"/>
            </svg>
          </a>
          <a href="#" className="hover:text-indigo-500 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.52 0-10 4.48-10 10.02 0 4.99 3.66 9.13 8.44 9.89v-6.99h-2.54v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.9h-2.33v6.99c4.78-.76 8.44-4.9 8.44-9.89 0-5.54-4.48-10.02-10-10.02z"/>
            </svg>
          </a>
          <a href="#" className="hover:text-indigo-500 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M21.6 0H2.4A2.4 2.4 0 0 0 0 2.4v19.2A2.4 2.4 0 0 0 2.4 24h19.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 21.6 0zM7.2 20.4H3.6V9h3.6v11.4zM5.4 7.6c-1.15 0-2.1-.96-2.1-2.1s.95-2.1 2.1-2.1 2.1.96 2.1 2.1-.95 2.1-2.1 2.1zM20.4 20.4h-3.6v-5.7c0-1.36-.03-3.1-1.89-3.1-1.9 0-2.19 1.48-2.19 3v5.8h-3.6V9h3.45v1.56h.05c.48-.9 1.65-1.86 3.39-1.86 3.63 0 4.29 2.39 4.29 5.49v6.21z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white mt-6 py-4 text-center text-sm text-white">
      © {new Date().getFullYear()} CampusMarket · Built for Students, by Students 🎓
    </div>
  </footer>
);
}
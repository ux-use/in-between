export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-globe text-primary text-xl"></i>
              <h3 className="text-lg font-bold text-gray-900">WebScrape Pro</h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Advanced website analysis and frontend asset extraction tool for developers. Built for cross-platform compatibility and ease of use.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary" data-testid="link-github">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary" data-testid="link-twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary" data-testid="link-linkedin">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#analyze" className="text-gray-600 hover:text-gray-900" data-testid="footer-analyzer">Website Analyzer</a></li>
              <li><a href="#downloads" className="text-gray-600 hover:text-gray-900" data-testid="footer-downloads">Asset Downloads</a></li>
              <li><a href="#dashboard" className="text-gray-600 hover:text-gray-900" data-testid="footer-dashboard">Dashboard</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900" data-testid="footer-api">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900" data-testid="footer-docs">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900" data-testid="footer-help">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900" data-testid="footer-contact">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900" data-testid="footer-privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 WebScrape Pro. Built for cross-platform deployment and developer productivity.
          </p>
        </div>
      </div>
    </footer>
  );
}

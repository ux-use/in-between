export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-globe text-primary text-2xl"></i>
              <h1 className="text-xl font-bold text-gray-900">WebScrape Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#analyze" className="text-primary font-medium" data-testid="nav-analyze">
                Analyze
              </a>
              <a href="#dashboard" className="text-gray-600 hover:text-gray-900" data-testid="nav-dashboard">
                Dashboard
              </a>
              <a href="#downloads" className="text-gray-600 hover:text-gray-900" data-testid="nav-downloads">
                Downloads
              </a>
            </nav>
          </div>
          {/* Empty top-right area as requested */}
          <div className="w-20"></div>
        </div>
      </div>
    </header>
  );
}

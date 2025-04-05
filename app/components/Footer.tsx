const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">FitPlanner</h3>
            <p className="text-sm mt-1">Achieve your fitness goals efficiently</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <a href="#" className="text-gray-400 hover:text-white mb-2 md:mb-0">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white mb-2 md:mb-0">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} FitPlanner. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
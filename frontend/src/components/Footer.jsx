function Footer() {
  return (
    <footer className="bg-teal-700 text-white py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2025 NestTrend. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-yellow-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-yellow-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-yellow-300">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

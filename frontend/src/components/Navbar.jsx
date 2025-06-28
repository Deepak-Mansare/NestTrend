import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAndClearCart } from "../features/user/userSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items || []);

  const handleLogout = () => {
    dispatch(logoutAndClearCart());
    navigate("/login");
  };

  return (
    <nav className="bg-teal-700 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          NestTrend
        </Link>

        {/* Hamburger (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/category/men" className="hover:text-yellow-300">
            Men
          </Link>
          <Link to="/category/women" className="hover:text-yellow-300">
            Women
          </Link>
          <Link to="/category/kids" className="hover:text-yellow-300">
            Kids
          </Link>
          <Link to="/orders" className="hover:text-yellow-300">
            Orders
          </Link>
          <Link to="/cart" className="relative hover:text-yellow-300">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="bg-yellow-400 text-black px-4 py-1.5 rounded hover:bg-yellow-300 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-2 text-sm font-medium">
          <Link to="/category/men" onClick={() => setIsOpen(false)}>
            Men
          </Link>
          <Link to="/category/women" onClick={() => setIsOpen(false)}>
            Women
          </Link>
          <Link to="/category/kids" onClick={() => setIsOpen(false)}>
            Kids
          </Link>
          <Link to="/orders" onClick={() => setIsOpen(false)}>
            Orders
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>
            Cart ({cartItems.length})
          </Link>
          {!user ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-400 text-black px-4 py-1.5 rounded hover:bg-yellow-300 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

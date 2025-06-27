import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAndClearCart } from "../features/user/userSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const handleLogout = () => {
    dispatch(logoutAndClearCart());
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-teal-700 text-white px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-white">
            NestTrend
          </Link>

          {/* Hamburgar for small screens */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 " />}
          </button>

          {/* Navigation Links */}
          <div
            className={`flex-col md:flex-row md:flex gap-6 text-sm font-medium ${
              isOpen
                ? "flex absolute top-16 left-0 w-full bg-teal-700 p-4"
                : "hidden"
            } md:static md:bg-transparent`}
          >
            <Link
              to="/category/men"
              className="hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              Men
            </Link>
            <Link
              to="/category/women"
              className="hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              women
            </Link>
            <Link
              to="/category/kids"
              className="hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              kids
            </Link>
            <Link
              to="/orders"
              className="hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>
            <Link
              to="/cart"
              className="relative hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full ">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {!user ? (
              <Link
                to="/login"
                className="bg-yellow-400 text-black px-4 py-1.5 rounded hover:bg-yellow-300 transition mt-2 md:mt-0"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3 mt-2 md:mt-0">
                <span className="font-medium text-sm">{user.name}</span>
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
        </div>
      </nav>
    </>
  );
}
export default Navbar;

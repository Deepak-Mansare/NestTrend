import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

function Navbar() {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const handleLogout = () => {
    dispatch(logoutUser());
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

          {/* Navigation Links */}
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/category/men" className="hover:text-yellow-300">
              Men
            </Link>
            <Link to="/category/women" className="hover:text-yellow-300">
              Women
            </Link>
            <Link to="/category/kids" className="hover:text-yellow-300">
              Kids
            </Link>
          </div>

          {/* Right side: cart,orders,auth */}
          <div className="flex items-center gap-6 text-sm font-medium">
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
                <span className="font-medium text-sm">{user.name}</span>
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
      </nav>
    </>
  );
}
export default Navbar;

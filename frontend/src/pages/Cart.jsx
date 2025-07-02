import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  updateCartQuantityBackend,
  clearCartFromBackend,
  removeFromCartBackend,
} from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discount = totalPrice * 0.1;
  const grandTotal = totalPrice - discount;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600 transition"
        >
          shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Cart Items Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">Your Cart Items</h2>
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm">Qty: {quantity}</p>
                  <p className="text-sm text-gray-600">₹{product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        const newQty = quantity - 1;
                        if (newQty >= 1) {
                          dispatch(
                            updateCartQuantityBackend({
                              productId: product._id,
                              quantity: newQty,
                            })
                          );
                        }
                      }}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span className="text-sm">{quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartQuantityBackend({
                            productId: product._id,
                            quantity: quantity + 1,
                          })
                        )
                      }
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(removeFromCartBackend(product._id)).then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                      toast.success("Product removed from cart");
                    } else {
                      toast.error("Failed to remove product");
                    }
                  });
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
        <p className="text-lg font-medium">Total Items: {totalItems}</p>
        <p className="text-lg font-medium">Total: ₹{totalPrice.toFixed(2)}</p>
        <p className="text-md text-gray-600">
          Discount (10%): ₹{discount.toFixed(2)}
        </p>
        <p className="text-xl font-semibold mt-2">
          Grand Total: ₹{grandTotal.toFixed(2)}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/checkout"
            className="bg-emerald-500 text-white text-center py-2 rounded hover:bg-emerald-600 transition duration-200"
          >
            CHECKOUT
          </Link>
          <Link
            to="/products"
            className="bg-sky-500 text-white text-center py-2 rounded hover:bg-sky-600 transition duration-200"
          >
            SHOP MORE
          </Link>
          <button
            onClick={() => {
              dispatch(clearCartFromBackend()).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                  dispatch(clearCart());
                  toast.success("Cart cleared");
                } else {
                  toast.error("Failed to clear cart");
                }
              });
            }}
            className="bg-rose-500 text-white py-2 rounded hover:bg-rose-600 transition duration-200"
          >
            CLEAR CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

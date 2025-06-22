import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCartBackend } from "../features/cart/cartSlice";
import { useSelector } from "react-redux";

function ProductCard({ product }) {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition p-4 bg-white w-[240px] mx-auto">
      <Link to={`/product/${product._id}`} className="block test-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-contain mb-2"
        />
        <h2 className="text-base font-semibold">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-1">{product.brand}</p>
        <p className="text-green-600 font-bold text-sm mb-2">
          ₹{product.price}
        </p>
      </Link>

      <button
        onClick={() => {
          if (!user) {
            toast.error("Please login to add items to cart");
            return;
          }
          dispatch(addToCartBackend(product));
          toast.success("Product added to cart");
        }}
        className="bg-yellow-600 text-white text-sm px-3 py-1 rounded hover:bg-yellow-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

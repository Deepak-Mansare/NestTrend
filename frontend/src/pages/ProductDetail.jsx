import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../features/products/productSlice";
import { addToCartBackend } from "../features/cart/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const {
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <>
      <div className="p-4 flex flex-col md:flex-row gap-8 items-start max-w-5xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md h-auto rounded-lg object-cover mx-auto md:mx-0"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Your selected product</h1>
          <h2 className="text-2xl font-bold">Product name: {product.name}</h2>
          <p className="text-gray-600 text-lg">Brand: {product.brand}</p>
          <p className="text-green-600 text-2xl font-semibold">
            price: ₹{product.price}
          </p>
          <p className="text-sm text-gray-500">category: {product.category}</p>
          <p className="text-gray-700">Description: {product.description}</p>
          <button
            onClick={() => {
              if (!user) {
                toast.error("Please login to add items to cart");
                return;
              }
              dispatch(addToCartBackend(product));
              toast.success("Product added to cart");
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;

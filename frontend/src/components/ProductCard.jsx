import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition p-4 bg-white flex flex-col">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-md font-bold text-green-600 mt-2">
          ₹{product.price}
        </p>
      </Link>
    </div>
  );
}

export default ProductCard;

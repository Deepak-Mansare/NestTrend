import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const { category } = useParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filteredProducts = category
    ? items.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    : items;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {category ? `showing ${category} Products` : "All Products"}
      </h1>

      {loading && <p>Loading Products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found in this category</p>
        )}
      </div>
    </div>
  );
}
export default Home;

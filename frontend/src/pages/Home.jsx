import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

function Home() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All products</h1>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.length > 0
            ? items.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            : !loading && <p>No product found.</p>}
        </div>
      </div>
    </>
  );
}
export default Home;

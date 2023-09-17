import { useEffect } from "react";
import { setProducts } from "../redux/reducers/product";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/product/ProductCard";

export default function ProductListPage() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");

      if (response.status === 200) {
        const products = await response.json();
        dispatch(setProducts(products));
      } else {
        console.log("Error fetching products");
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

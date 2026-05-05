import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../store/products/productThunks";
import PublicLayout from "../../../components/PublicLayout";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const finalPrice = product.discountPrice || product.price;

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-4"
    >
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg mb-3"
      />

      <h2 className="text-sm font-medium line-clamp-2">{product.name}</h2>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-semibold text-black">₹{finalPrice}</span>

        {product.discountPrice && (
          <span className="text-sm line-through text-gray-400">
            ₹{product.price}
          </span>
        )}
      </div>

      {product.discountPrice && (
        <span className="text-xs text-green-600 font-medium">Sale</span>
      )}
    </div>
  );
};

const ProductsPublic = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <PublicLayout>
      <div className="">
      <div className="page-heading mb-4">
        <h1 className="text-gradient w-40">Products</h1>

      </div>

        {loading ? (
          <div className="text-gray-500 animate-pulse">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default ProductsPublic;

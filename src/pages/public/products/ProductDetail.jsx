import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../store/products/productThunks";
import PublicLayout from "../../../components/PublicLayout";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { selectedProduct, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (loading || !selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-rose-200 border-t-rose-500 animate-spin" />
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Loading product
          </p>
        </div>
      </div>
    );
  }

  const product = selectedProduct;
  const discount = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : null;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* ── LEFT: Image Gallery ── */}
            <div className="flex gap-4">
              {/* Thumbnail strip */}
              {product.images?.length > 1 && (
                <div className="flex flex-col gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        activeImage === i
                          ? "border-rose-400 shadow-md scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1 relative group">
                <div className="aspect-4/5 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
                  <img
                    src={product.images?.[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {discount && (
                  <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                    {discount}% OFF
                  </div>
                )}

                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 font-semibold tracking-widest uppercase text-sm">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Product Info ── */}
            <div className="flex flex-col">
              {/* Category tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                  {product.category?.name}
                </span>
                {product.occasion && (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    {product.occasion}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-1">
                {product.name}
              </h1>
              {product.subcategory && (
                <p className="text-sm text-gray-400 mb-4">
                  {product.subcategory}
                </p>
              )}

              {/* Divider */}
              <div className="h-px bg-gray-100 my-4" />

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₹
                  {(product.discountPrice || product.price).toLocaleString(
                    "en-IN",
                  )}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-xl text-gray-300 line-through">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Save ₹
                      {(product.price - product.discountPrice).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Inclusive of all taxes
              </p>

              {/* Stock & Delivery */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-emerald-400" : "bg-red-400"}`}
                  />
                  <span
                    className={`text-sm font-medium ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock} left)`
                      : "Out of Stock"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Delivery in {product.estimatedDeliveryDays} days
                </div>
                {product.codAvailable && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    COD Available
                  </div>
                )}
              </div>

              {/* Quick Specs */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 grid grid-cols-2 gap-y-3 gap-x-4">
                {product.fabric && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                      Fabric
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {product.fabric}
                    </p>
                  </div>
                )}
                {product.occasion && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                      Occasion
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {product.occasion}
                    </p>
                  </div>
                )}
                {product.tags?.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-500 font-medium">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-900 text-gray-900 font-semibold py-3.5 rounded-2xl hover:bg-gray-900 hover:text-white transition-all duration-200 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3.5 rounded-2xl transition-colors duration-200 text-sm shadow-lg shadow-rose-200">
                  Buy Now
                </button>
              </div>

              {/* Wishlist */}
              <button className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-rose-400 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Save to Wishlist
              </button>
            </div>
          </div>

          {/* ── BOTTOM: Details Section ── */}
          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-rose-400 rounded-full inline-block" />
                Product Description
              </h2>
              <div
                className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            {/* Care & Includes */}
            <div className="flex flex-col gap-6">
              {product.careInstructions && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-rose-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Care Instructions
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {product.careInstructions}
                  </p>
                </div>
              )}

              {product.whatsIncluded && (
                <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
                  <h3 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    What's Included
                  </h3>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    {product.whatsIncluded}
                  </p>
                </div>
              )}

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                {[
                  {
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                    label: "Secure Payments",
                  },
                  {
                    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                    label: "Easy Returns",
                  },
                  {
                    icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
                    label: "Original Products",
                  },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-sm text-gray-500"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={icon}
                      />
                    </svg>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ProductDetail;

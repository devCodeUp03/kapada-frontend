import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const [product, setProduct] = useState(false);
  useEffect(() => {
    setProduct(
      products.find((product) => {
        if (product._id === productId) {
          setImage(product.image[0]);
          return product;
        }
      })
    );
  }, [productId]);


  return product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((item, idx) => {
              return (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={idx}
                  className="s-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%] ">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1">
          <h1 className="font-medium text--2xl mt-2 ">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((item, idx) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border border-gray-100 py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  } cursor-pointer`}
                  key={idx}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description & review */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm border-gray-200">
            Description
          </b>
          <p className="border px-5 py-3 text-sm border-gray-200">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            This e-commerce store brings fashion directly to your fingertips. We
            offer a diverse range of clothing for men, women, and children,
            making it easy to shop, discover trends, and enjoy hassle-free
            delivery
          </p>
          <p>
            Our platform is an e-commerce store designed to make shopping for
            clothing easy and convenient. We offer a curated collection for men,
            women, and children, allowing you to explore the latest trends,
            compare options, and purchase securely online.
          </p>
        </div>
      </div>
      {/* related products */}

      <RelatedProducts category={product.category} subCategory={product.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

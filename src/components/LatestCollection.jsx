import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";
import { backendUrl } from "../App";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LatestCollection = () => {
  // const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(backendUrl + "/api/product/list");

    setLatestProducts(response.data.products.slice(0, 10));
  };
  useEffect(() => {
    fetchList();
    // setLatestProducts(products.slice(0, 10));
  }, []);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"collections"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest collection – where style meets comfort.
        </p>
      </div>

      {/* Rendering latest products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts && latestProducts.length > 0
          ? latestProducts.map((item, idx) => {
              return (
                <ProductItem
                  key={idx}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              );
            })
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
              return <Skeleton height={320} key={idx}/>;
            })}
      </div>
    </div>
  );
};

export default LatestCollection;

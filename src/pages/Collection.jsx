import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { backendUrl } from "../App";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const SortOptions = {
  PRICE_LOW_TO_HIGH: "PRICE_LOW_TO_HIGH",
  PRICE_HiGH_TO_LOW: "PRICE_HIGH_TO_LOW",
  RELEVANT: "RELEVANT",
};
const Collection = () => {
  const { search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortBy, setSortBy] = useState(SortOptions.RELEVANT);
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(backendUrl + "/api/product/list");
    setProducts(response.data.products);
  };
  const handleSubCategory = (e) => {
    const { checked, value } = e.target;

    if (checked) setSubCategory([...subCategory, value]);
    else {
      setSubCategory(subCategory.filter((cat) => cat != value));
    }
  };

  const handleFilter = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories?.filter((cat) => cat != value));
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    let updated = [...products];
    setFiltered(updated);
    if (categories.length > 0) {
      updated = updated.filter((product) =>
        categories.includes(product.category)
      );
    }
    if (sortBy == SortOptions.PRICE_HiGH_TO_LOW) {
      updated = updated.sort((a, b) => b.price - a.price);
    }
    if (sortBy == SortOptions.PRICE_LOW_TO_HIGH) {
      updated = updated.sort((a, b) => a.price - b.price);
    }
    if (showSearch && search) {
      updated = updated.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (subCategory.length > 0) {
      updated = updated.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }

    // setFiltered(updated/);

    setFilterProducts(updated);
  }, [categories, sortBy, search, subCategory, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 pt-10 border-t">
      {/* filters */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter((prev) => !prev)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown_icon"
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={handleFilter}
                className="w-3"
                type="checkbox"
                value={"Men"}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleFilter}
                className="w-3"
                type="checkbox"
                value={"Women"}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleFilter}
                className="w-3"
                type="checkbox"
                value={"Kids"}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={handleSubCategory}
                className="w-3"
                type="checkbox"
                value={"Topwear"}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSubCategory}
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSubCategory}
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* PRODUCTS SORTING */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value={SortOptions.RELEVANT}>Sort by: Relevant</option>
            <option value={SortOptions.PRICE_LOW_TO_HIGH}>
              Sort by: Low to High
            </option>
            <option value={SortOptions.PRICE_HiGH_TO_LOW}>
              Sort by: High to Low
            </option>
          </select>
        </div>
        {/* products */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts && filterProducts.length > 0 ? (
            filterProducts.map((item, idx) => (
              <ProductItem
                key={idx}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
              Array(20).fill(0).map((_, idx) => (
                <Skeleton height={320} width={260}  />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;

import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import axios from "axios"
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [productCountAddedToCart, setProductCountAddedToCart] = useState(0);
  const navigate = useNavigate();


  const fetchList = async () => {
    const response = await axios.get(backendUrl + "/api/product/list");
    setProducts(response.data.products);
  }

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select sizes!");
      return;
    }


    
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    setProductCountAddedToCart(getProductCount(cartData));
  };

  const getProductCount = (cartItems) => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    // console.log(totalCount);

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    setProductCountAddedToCart(getProductCount(cartData));
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item] * itemInfo.price;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    // console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    fetchList();

  },[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    productCountAddedToCart,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

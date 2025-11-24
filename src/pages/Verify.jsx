import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { backendUrl } from "../App";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, frontendToken, setCartItems, setProductCountAddedToCart } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPayment = async () => {
    try {
      if (!frontendToken) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { frontendToken } }
      );
      
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success("Payment successful");
        setProductCountAddedToCart(0);
      } else {
        toast.error("Payment Unsuccessful")
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [frontendToken]);
  return <div></div>;
};

export default Verify;

import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/cart_reducer";

const CartContext = React.createContext<any>({});
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart") || "{}");
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 5,
};
export const CartProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id: any, color: any, amount: any, product: any) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };
  const removeItem = (id: any) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const updateAmount = (id: any, value: any) => {
    dispatch({
      type: "UPDATE_AMOUNT",
      payload: {
        id,
        value,
      },
    });
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, clearCart, updateAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};

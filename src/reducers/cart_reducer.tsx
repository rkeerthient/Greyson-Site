const cart_reducer = (state: any, action: any) => {
  if (action.type === "ADD_TO_CART") {
    const { id, color, amount, product } = action.payload;

    const tempItem = state.cart.find((i: any) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem: any) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.primaryPhoto.image.url,
        price: parseInt(product.price.value),
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === "REMOVE_CART_ITEM") {
    const tempCart = state.cart.filter(
      (item: any) => item.id !== action.payload
    );
    return { ...state, cart: tempCart };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "UPDATE_AMOUNT") {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item: any) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === "CALCULATE_TOTAL") {
    const { total_items, total_amount } = state.cart.reduce(
      (total: any, cartItem: any) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      { total_items: 0, total_amount: 0 }
    );
    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;

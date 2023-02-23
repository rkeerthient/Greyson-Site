import { Link } from "react-router-dom";
import styled from "styled-components";
import CartColumns from "../components/CartComponents/CartHeaders";
import CartItem from "../components/CartComponents/CartItem";
import CartTotals from "../components/CartComponents/CartTotals";
import PageHero from "../components/PageHero";
import { useCartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, clearCart } = useCartContext();
  return cart.length >= 1 ? (
    <>
      <PageHero title="Cart" />
      <Wrapper className="section section-center">
        <CartColumns />
        {cart.map((item: any) => {
          return <CartItem key={item.id} {...item} />;
        })}
        <hr />
        <div className="link-container">
          <Link to="/products" className="link-btn">
            continue shopping
          </Link>
          <button
            type="button"
            className="link-btn clear-btn"
            onClick={clearCart}
          >
            clear shopping cart
          </button>
        </div>
        <CartTotals />
      </Wrapper>
    </>
  ) : (
    <>
      <PageHero title="Cart" />
      <Wrapper
        className="section section-center"
        style={{ textAlign: "center" }}
      >
        <div className="empty">
          <h3>Your cart is empty</h3>
          <Link to="/products" className="btn">
            Add some products
          </Link>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;

export default CartPage;

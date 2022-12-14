import { removeCartItem } from "../api/cart";
import CartContext from "../contexts/CartContext";
import CloseButton from "../components/CloseButton";

export default function IndexPage() {
  return <>
      <CartContext.Consumer>
        {({cart, setCart}) =>  
          <ul
          suppressHydrationWarning
          style={{
            display: "inline-block",
            padding: "1em 2em",
            margin: 0
          }}
          >
            {cart.length === 0 ? (
              <li suppressHydrationWarning>The Cart is Empty</li>
            ) : (
              cart.map((cartItem, index) => (
                <li key={index} suppressHydrationWarning>
                  {`${cartItem.name} -- ${Object.keys(cartItem.variation)
                    .map((key) => cartItem.variation[key])
                    .join(" + ")} `}
                    <CloseButton onClick={() => setCart(removeCartItem(cart, index))} />
                </li>
              ))
            )}
          </ul>
      }
      </CartContext.Consumer>
  </>;
}

import Link from "next/link";
import React, { useContext } from "react";
import { products } from "../api/products";
import CartContext from "../contexts/CartContext";

export default function Nav() {
  const {cart} = useContext(CartContext);

  return (
    <>
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        <Link href="/"><a suppressHydrationWarning>{(cart?.length ? "Cart (" + cart?.length + ")" : 'Cart')}</a></Link>
        {products.map((product) => (
          <Link key={product} href={`/products/${product}`} passHref>
            <a href style={{ textTransform: "capitalize" }}>{product}</a>
          </Link>
        ))}
      </nav>
      <hr />
    </>
  );
}

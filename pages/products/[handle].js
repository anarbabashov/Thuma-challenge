import { useMemo, useState, useContext, useEffect } from "react";
import {
  productVariation,
  products,
  variationChoices
} from "../../api/products";
import { addCartItem } from "../../api/cart";
import CartContext from "../../contexts/CartContext";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ProductPage({ handle }) {
  const attributes = useMemo(() => {
    return productVariation[handle].reduce((acc, variationKey) => {
      acc[variationKey] = variationChoices[variationKey];
      return acc;
    }, {});
  }, [handle]);

  const [chosenVariant, setChosenVariant] = useState({});

  const {cart, setCart} = useContext(CartContext);

  function onValueChange(attributeKey, attributeValue) {
    setChosenVariant((oldVariant) => ({
      ...oldVariant,
      [attributeKey]: attributeValue
    }));
  }

  // By default, we set the first element as active.
  useEffect(() => {
    if (attributes['oneSize']) {
      onValueChange('oneSize', 'one-size')
    } else {
      const attributesMap = Object.entries(attributes);
      if (attributesMap?.length) {
        attributesMap.forEach((item) => {
          const [key, value] = item;
          onValueChange(key, value[0])
        })
      }
    } 
  }, []);

  return (
    <>
      <h1>{capitalize(handle)} product page</h1>
      <div style={{ textAlign: "center" }}>
        <img src="https://via.placeholder.com/300x200" alt="placeholder" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {Object.keys(attributes).map((attributeKey) => {
          const attributeValuePicker = attributes[attributeKey].map(
            (attributeValue) => (
              <label key={attributeValue} style={{ lineHeight: 2 }}>
                <input
                  checked={chosenVariant[attributeKey] === attributeValue}
                  type="radio"
                  name={attributeKey}
                  value={attributeValue}
                  onChange={(e) => onValueChange(attributeKey, e.target.value)}
                />
                {attributeValue}
              </label>
            )
          );
          return (
            <div key={attributeKey}>
              <h2
                style={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  textDecoration: "underline"
                }}
              >
                {attributeKey}
              </h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {attributeValuePicker}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: "2em" }}>
        <button
          onClick={() => setCart(addCartItem(cart, handle, chosenVariant))}
          style={{
            background: "transparent",
            padding: "1em 2em",
            border: "1px solid gray"
          }}
        >
          Add To Cart
        </button>
      </div>
    </>
  );
}


export async function getStaticProps({ params }) {
  return { props: { ...params, key: params.handle } };
}

export async function getStaticPaths() {
  return {
    paths: products.map((handle) => ({
      params: { handle }
    })),
    fallback: false
  };
}

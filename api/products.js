const sizes = ["twin", "full", "queen", "king", "cali-king"];
const oneSizes = ["one-size"];
const colors = ["walnut", "natural"];

export const variationChoices = {
  color: colors,
  size: sizes,
  oneSize: oneSizes
};

export function makeBed({ color, size }) {
  return {
    name: "bed",
    variation: {
      color,
      size
    }
  };
}

export function makeMattress({ size }) {
  return {
    name: "mattress",
    variation: {
      size
    }
  };
}

export function makeNightstand({ oneSize }) {
  return {
    name: "nightstand",
    variation: {
      oneSize
    }
  };
}

export const products = ["bed", "mattress", "nightstand"];

export const productConstructors = {
  bed: makeBed,
  mattress: makeMattress,
  nightstand: makeNightstand
};

export const productVariation = {
  bed: ["color", "size"],
  mattress: ["size"],
  nightstand: ["oneSize"]
};
import { Product } from "../types/Product";

export const literalSort = (
  products: Product[],
  reversed: boolean,
  sortBy: keyof Product
): Product[] => {
  return products.sort((prev: Product, curr: Product) =>
    reversed
      ? prev[sortBy].toString().localeCompare(curr[sortBy].toString())
      : curr[sortBy].toString().localeCompare(prev[sortBy].toString())
  );
};

export const numericSort = (
  products: Product[],
  reversed: boolean,
  sortBy: keyof Product
): Product[] => {
  return products.sort((prev: Product, curr: Product) =>
    reversed
      ? Number.parseFloat(prev[sortBy].toString()) -
        Number.parseFloat(curr[sortBy].toString())
      : Number.parseFloat(curr[sortBy].toString()) -
        Number.parseFloat(prev[sortBy].toString())
  );
};

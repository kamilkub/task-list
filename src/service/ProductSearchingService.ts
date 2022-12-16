import { Product } from "../types/Product";

export const searchProvidedProducts = (
  products: Product[],
  name: string,
  searchBy: keyof Product
): Product[] => {
  if (!name) return [];

  return products.filter((product: Product) =>
    product[searchBy].toString().includes(name)
  );
};

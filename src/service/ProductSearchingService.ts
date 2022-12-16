import Product from "../interfaces/Product";

export const searchProvidedProducts = (products: Product[], name: string, searchBy: string): Product[] => {
    if (!name.trim()) return [];

    // @ts-ignore
    return products.filter((product: Product) => product[searchBy].toString().includes(name))
}



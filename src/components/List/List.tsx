import React, { FC, useRef, useState } from "react";
import ListItem from "./ListItem/ListItem";
import ListHeaderItem from "./ListHeaderItem/ListHeaderItem";
import { productsData } from "./products";
import { Product } from "../../types/Product";
import { literalSort, numericSort } from "../../service/ProductSortingService";
import ListSearchInput from "./ListSearchInput/ListSearchInput";
import { searchProvidedProducts } from "../../service/ProductSearchingService";

type ListProps = {};

export type SearchCriteriaState = {
  name: boolean;
  description: boolean;
  price: boolean;
};

const List: FC<ListProps> = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>(productsData);

  const searchCriteriaState = useRef<SearchCriteriaState>({
    name: false,
    description: false,
    price: false,
  });

  const isAnyCriteriaSet = (): boolean => {
    return !Object.values(searchCriteriaState.current).every(
      (criteria: boolean) => criteria === false
    );
  };

  const sort = (sortBy: keyof Product, sortOrder: boolean): void => {
    let sortedProducts = [];

    switch (typeof products[0][sortBy]) {
      case "string":
        sortedProducts = literalSort(products, sortOrder, sortBy);
        break;
      case "number":
        sortedProducts = numericSort(products, sortOrder, sortBy);
        break;
    }
    setProducts(sortedProducts);
  };

  const renderProducts = (): Array<JSX.Element> => {
    return products.map((product: Product, id: number) => {
      return (
        <ListItem
          key={id}
          name={product.name}
          description={product.description}
          price={product.price}
        />
      );
    });
  };

  const searchProducts = (value: string, searchBy: keyof Product): void => {
    const foundProducts = searchProvidedProducts(products, value, searchBy);

    if (foundProducts.length > 0) {
      setProducts(foundProducts);
    } else if (
      foundProducts.length == 0 &&
      products.length < productsData.length &&
      isAnyCriteriaSet()
    ) {
      setProducts(products);
    } else {
      setProducts(productsData);
    }

    console.log(searchCriteriaState.current);
  };

  const renderSearchInputs = (): JSX.Element => {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <ListSearchInput
          searchFunction={searchProducts}
          criteriaState={searchCriteriaState.current}
          searchBy={"name"}
        />
        <ListSearchInput
          criteriaState={searchCriteriaState.current}
          searchFunction={searchProducts}
          searchBy={"description"}
        />
        <ListSearchInput
          criteriaState={searchCriteriaState.current}
          searchFunction={searchProducts}
          searchBy={"price"}
        />
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <ListHeaderItem
              sortBy={"name"}
              sortFunction={sort}
              productField={"Product Name"}
            />
            <ListHeaderItem
              sortBy={"description"}
              sortFunction={sort}
              productField={"Description"}
            />
            <ListHeaderItem
              sortBy={"price"}
              sortFunction={sort}
              productField={"Price"}
            />
          </tr>
        </thead>
        <tbody>
          {renderSearchInputs()}
          {renderProducts()}
        </tbody>
      </table>
    </div>
  );
};

export default List;

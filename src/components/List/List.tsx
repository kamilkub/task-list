import React, {FC, useState} from 'react';
import ListItem from "./ListItem/ListItem";
import ListHeaderItem from "./ListHeaderItem/ListHeaderItem";
import {productsData} from './products';
import Product from '../../interfaces/Product';
import {literalSort, numericSort} from "../../service/ProductSortingService";
import ListSearchInput from "./ListSearchInput/ListSearchInput";
import { searchProvidedProducts } from "../../service/ProductSearchingService";
import {ProductSearchSortType} from "../../enums/ProductSearchSortType";

type ListProps = {};

const List: FC<ListProps> = (): JSX.Element => {

    const [products, setProducts] = useState<Product[]>(productsData);
    const [sortNameReversed, setSortNameReversed] = useState<boolean>(false);
    const [sortDescReversed, setSortDescReversed] = useState<boolean>(false);
    const [sortPriceReversed, setSortPriceReversed] = useState<boolean>(false);


    const sortByName = (e: Event): void => {
        e.preventDefault();
        const presentValue = !sortNameReversed;
        setSortNameReversed(presentValue);
        setProducts(literalSort(products, presentValue, ProductSearchSortType.BY_PRODUCT_NAME));
    }

    const sortByDesc = (e: Event): void => {
        e.preventDefault();
        const presentValue = !sortDescReversed;
        setSortDescReversed(presentValue);
        setProducts(literalSort(products, presentValue, ProductSearchSortType.BY_DESCRIPTION));
    }

    const sortByPrice = (e: Event): void => {
        e.preventDefault();
        const presentValue = !sortPriceReversed;
        setSortPriceReversed(presentValue);
        setProducts(numericSort(products, presentValue, ProductSearchSortType.BY_PRICE));
    }

    const renderProducts = (): Array<JSX.Element> => {
        return products.map((product: Product, id) => {
            return (<ListItem key={id} name={product.name} description={product.description} price={product.price}/>);
        });
    }

    const searchProducts = (value: string, searchBy: string): void => {
        const foundProducts = searchProvidedProducts(products, value, searchBy);
        setProducts(foundProducts.length > 0 ? foundProducts : productsData);
    }

    const renderSearchInputs = (): JSX.Element => {
        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <ListSearchInput searchFunction={searchProducts} searchBy={ProductSearchSortType.BY_PRODUCT_NAME}/>
                <ListSearchInput searchFunction={searchProducts} searchBy={ProductSearchSortType.BY_DESCRIPTION}/>
                <ListSearchInput searchFunction={searchProducts} searchBy={ProductSearchSortType.BY_PRICE}/>
            </tr>
        );
    }

    return (

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <ListHeaderItem name={"Product name"} sortFunction={sortByName}/>
                    <ListHeaderItem name={"Description"} sortFunction={sortByDesc}/>
                    <ListHeaderItem name={"Price"} sortFunction={sortByPrice}/>
                </tr>
                </thead>
                <tbody>
                {renderSearchInputs()}
                {renderProducts()}
                </tbody>
            </table>
        </div>

    );
}

export default List;

import Product from "../interfaces/Product";
import {ProductSearchSortType} from "../enums/ProductSearchSortType";


export const literalSort = (products: Product[], reversed: boolean, sortBy: ProductSearchSortType): Product[] => {

    return products.sort((prev, curr) =>
        //@ts-ignore
        reversed ? prev[sortBy].toString().localeCompare(curr[sortBy]) : curr[sortBy].toString().localeCompare(prev[sortBy])
    );
}

export const numericSort = (products: Product[], reversed: boolean, sortBy: ProductSearchSortType): Product[] => {
    return products.sort((prev, curr) =>
        //@ts-ignore
        reversed ? prev[sortBy] - curr[sortBy] : curr[sortBy] - prev[sortBy]
    );
}


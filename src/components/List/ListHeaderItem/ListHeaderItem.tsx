import React, { FC, useRef } from "react";
import "./ListHeaderItem.css";
import { Product } from "../../../types/Product";

type ListHeaderItemProps = {
  sortBy: keyof Product;
  sortFunction: Function;
  productField: string;
};
const ListHeaderItem: FC<ListHeaderItemProps> = ({
  sortBy,
  sortFunction,
  productField,
}): JSX.Element => {
  const sortOrder = useRef<boolean>(false);

  const sort = (): void => {
    sortFunction(sortBy, !sortOrder.current);
    sortOrder.current = !sortOrder.current;
  };

  return (
    <th scope="col" className="py-3 px-6">
      <div className="flex items-center">
        {productField}
        <a>
          <svg
            onClick={() => sort()}
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 w-3 h-3 pointer"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 320 512"
          >
            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
          </svg>
        </a>
      </div>
    </th>
  );
};

export default ListHeaderItem;

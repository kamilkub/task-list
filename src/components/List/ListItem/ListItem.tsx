import React, {FC} from 'react';

type ListItemProps = {

    name: string;
    description: string;
    price: number;
}

const ListItem: FC<ListItemProps> = ({name, description, price}): JSX.Element => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-4 px-6">
                {name}
            </td>
            <td className="py-4 px-6">
                {description}
            </td>
            <td className="py-4 px-6">
                {price}
            </td>
        </tr>
    );
}

export default ListItem;

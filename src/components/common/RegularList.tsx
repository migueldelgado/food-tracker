import React from 'react';

interface Props {
    items: string[];
    type: string;
    itemComponent: React.FC<any>;
}

const RegularList: React.FC<Props> = ({items, type, itemComponent: ItemComponent}) => {

  return (
    <div>
        {
            items.map(item => <ItemComponent {...{ [type]: item }} />)
        }
    </div>
  )
}

export default RegularList;
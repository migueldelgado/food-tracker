import React from 'react'

interface Props {
    food: string;
}

const FoodListItem: React.FC<Props> = ({ food }) => {
  const onClickButton = () => {
    console.log('Button clicked!!!!!!');
  }
  return (
    <div>
        <div className="food">{food}</div>
        <button onClick={(e) => onClickButton()}>Do an event</button>
    </div>
  )
}

export default FoodListItem;
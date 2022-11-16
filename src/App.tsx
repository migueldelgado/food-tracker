import React from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';

const Right: React.FC = () => {
  return (
    <div>This is the right side</div>
  )
}

const food = ['pasta', 'rice', 'quinoa'];

const App: React.FC = () => {
  return (
    <div className="App" style={{
      width: '100%',
      height: '100%'
    }}>
      <Calendar />
      {/* <SplitScreen leftWidth={1} rightWidth={3}>
        <Left />
        <Right />
      </SplitScreen> */}
      {/* <RegularList items={food} type={'food'} itemComponent={FoodListItem} /> */}
      {/* <Modal>
        <FoodListItem food="This is amazing!" />
      </Modal> */}
      
    </div>
  );
}

export default App;

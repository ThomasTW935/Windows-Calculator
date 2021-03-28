import React, { useState } from 'react';
import ConverterTile from './Components/ConverterTile';
import Navigation from './Components/Navigation';
// import './styles/main.css'

const data = {
  weight: {
      grams: 1,
      kilograms: 1000,
  },
  length: {
      meter: 1,
      kilometer: 1000,
  },
  volume: {
      milliliters:1,
      liter: 1000
  }
}

function App() {
  const [unit, setUnit] = useState('weight')
  const [activeTile, setActiveTile] = useState(0)
  const buttons = [``, `CE`, `DEL`,7,8,9,4,5,6,1,2,3,``,0,`.`]
  return (
    <div className="App">
      <Navigation data={data} unit={unit} setUnit={setUnit}/>
      <div className='display'>
        <ConverterTile data={data} unit={unit} position={0} activeTile={activeTile} setActiveTile={setActiveTile}/>
        <ConverterTile data={data} unit={unit} position={1} activeTile={activeTile} setActiveTile={setActiveTile}/>
      </div>
      <div className='buttons'>
        {
          buttons.map(button=>
            <button>{button}</button>
          )
          }
      </div>
    </div>
  );
}

export default App;

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

  return (
    <div className="App">
      <Navigation data={data} unit={unit} setUnit={setUnit}/>
      <div className='display'>
        <ConverterTile data={data} unit={unit}/>
        <ConverterTile data={data} unit={unit}/>
      </div>
      <div className='buttons'>

      </div>
    </div>
  );
}

export default App;

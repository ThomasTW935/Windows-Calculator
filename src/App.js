import React, { useState } from 'react';
import Calculator from './Components/Calculator';
import Converter from './Components/Converter';
import Navigation from './Components/Navigation';

export const CATEGORIES = {
  CALCULATOR:['Standard', 'Scientific', 'Programmer', 'Date Calculation'],
  CONVERTER:['Weight', 'length', 'Volume','Currency'],
}

function App() {
  const [category, setCategory] = useState(CATEGORIES.CONVERTER[1])
  const [type, setType] = useState('CONVERTER')


  return (
    <div className="App">
      <Navigation 
        category={category} 
        setCategory={setCategory}
        setType={setType}
        />

      { (type === 'CONVERTER') && <Converter category={category}/>}
      { (type === 'CALCULATOR') && <Calculator category={category}/>}

      
    </div>
  );
}

export default App;

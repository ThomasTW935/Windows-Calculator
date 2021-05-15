import React, { useState } from 'react';
import Calculator from './Components/Calculator';
import Converter from './Components/Converter';
import Navigation from './Components/Navigation';

export const CATEGORIES = {
  CALCULATOR:['Standard', 'Scientific', 'Programmer', 'Date Calculation'],
  CONVERTER:['Weight', 'Length', 'Volume','Currency'],
}

function App() {
  const [category, setCategory] = useState(CATEGORIES.CALCULATOR[0])
  const [type, setType] = useState('CALCULATOR')


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

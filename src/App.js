import React, { useState } from 'react';
import { useEffect } from 'react';
import Calculator from './Components/Calculator';
import Converter from './Components/Converter';
import Navigation from './Components/Navigation';
// import './styles/main.css'


export const CATEGORIES = {
  CALCULATOR:['Standard', 'Scientific', 'Programmer', 'Date Calculation'],
  CONVERTER:['Weight', 'Length', 'Volume','Currency'],
}


export const ACTIONS = {
  ADD_NUM: 'add-num',
  DELETE_NUM: 'delete-num',
  RESET_NUM: 'reset-num',
  UPDATE_UNIT: 'update-unit',
  UPDATE_TILE_VALUES: 'update-tile-values',
  UPDATE_ACTIVE_VALUE: 'update-active-value',
  UPDATE_ACTIVE_TILE: 'update-active-tile',
  UPDATE_INACTIVE_TILE_VALUE: 'update-inactive-tile-value',
}

function App() {
  const [category, setCategory] = useState(CATEGORIES.CONVERTER[0])
  const [type, setType] = useState('CONVERTER')


  return (
    <div className="App">
      <Navigation 
        category={category} 
        setCategory={setCategory}
        setType={setType}
        />

      { (type === 'CONVERTER') && <Converter category={category}/>}
      {/* { (type === 'CALCULATOR') && <Calculator category={category}/>} */}

      
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import Calculator from './Components/Calculator';
import Converter from './Components/Converter';
import Navigation from './Components/Navigation';
// import './styles/main.css'


export const CATEGORIES = {
  CALCULATOR:['Standard', 'Scientific', 'Programmer', 'Date Calculation'],
  CONVERTER:['Weight', 'Length', 'Volume'],
}

export const SPECIAL_BUTTONS = {
  BLANK: '',
  CE: 'CE',
  C: 'C',
  DEL: 'del',
  DIVIDE: '/',
  MULTIPLY: 'X',
  SUBTRACT: '-',
  ADD: '+',
  EQUALS: '=',
  PERIOD: '.'
}

const {BLANK,CE,C,DEL,DIVIDE,MULTIPLY,SUBTRACT,ADD,EQUALS,PERIOD} = SPECIAL_BUTTONS



export const BUTTONS = {
  CONVERTER: [BLANK,CE,DEL,7,8,9,4,5,6,1,2,3,BLANK,0,PERIOD],
  STANDARD: [CE,C,DEL, DIVIDE, 7,8,9, MULTIPLY, 4,5,6, SUBTRACT, 1,2,3, ADD, BLANK, 0, PERIOD, EQUALS , ]
}

export const ACTIONS = {
  ADD_NUM: 'add-num',
  DELETE_NUM: 'delete-num',
  RESET_NUM: 'reset-num',
  UPDATE_UNIT: 'update-unit',
  UPDATE_TILE_VALUES: 'update-tile-values',
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
      { (type === 'CALCULATOR') && <Calculator category={category}/>}
      
      
    </div>
  );
}

export default App;

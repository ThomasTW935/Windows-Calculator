import React, { useState,useReducer } from 'react';
import ConverterTile from './Components/ConverterTile';
import Navigation from './Components/Navigation';
// import './styles/main.css'

const data = [
  {
    id: 0,
    category: 'weight',
    default: 'grams',
    units: {
      grams: 1,
      kilograms: .001,
    }
  },
  {
    id: 1,
    category: 'length',
    default: 'meter',
    units: {
      meter: 1,
      kilometer: .001,
    }
  },
  {
    id: 2,
    category: 'volume',
    default: 'liters',
    units: {
      milliliters: 1000,
      liters: 1,
    }
  }
]

const ACTIONS = {
  ADD_NUM: 'add-num',
  DELETE_NUM: 'delete-num',
  RESET_NUM: 'reset-num',
  UPDATE_UNIT: 'update-unit'
}

function reducer(type,action){}

function App() {
  const [unitCategory, setUnitCategory] = useState('weight')
  
  const [tiles, dispatch] = useReducer(reducer,[
    {id: 0,value:0, },
    {id: 1,value:0, },
  ])

  const [activeTile, setActiveTile] = useState(tiles[0].id)


  const buttons = [``, `CE`, `DEL`,7,8,9,4,5,6,1,2,3,``,0,`.`]


  return (
    <div className="App">
      <Navigation data={data} unitCategory={unitCategory} setUnitCategory={setUnitCategory}/>
      <div className='display'>
        { tiles.map((tile,index)=>
            <ConverterTile 
              key={tile.id} 
              data={data} 
              unitCategory={unitCategory} 
              tile={tile}
              tiles={tiles}
              activeTile={activeTile}
              setActiveTile={setActiveTile}
              />
          )
        }
      </div>
      <div className='buttons'>
        {
          buttons.map((button,index)=>
            <button key={index} >{button}</button>
          )
          }
      </div>
    </div>
  );
}

export default App;

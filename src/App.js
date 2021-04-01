import React, { useState,useReducer, useEffect } from 'react';
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

export const ACTIONS = {
  ADD_NUM: 'add-num',
  DELETE_NUM: 'delete-num',
  RESET_NUM: 'reset-num',
  UPDATE_UNIT: 'update-unit',
  UPDATE_TILE_VALUES: 'update-tile-values',
}

const BUTTONS = {
  converter: [``, `CE`, `DEL`,7,8,9,4,5,6,1,2,3,``,0,`.`],
}

function reducer(tiles,action){
  switch(action.type){
    case ACTIONS.UPDATE_UNIT: 
      return tiles.map(tile=>{
        if(action.payload.id &&  action.payload.id !== tile.id) return tile
        return {...tile, unit: {name: action.payload.name, rate: action.payload.rate}}
      })
    case ACTIONS.UPDATE_TILE_VALUES: 
      return tiles.map(tile=>{
        if(tile.id === action.payload.id) return {...tile, value: action.payload.value}
        let newValue = action.payload.value * tile.unit.rate
        return {...tile, value: newValue}
      })
    default: return tiles
  }
}

function App() {
  const [unitCategory, setUnitCategory] = useState('weight')
  const [tiles, dispatch] = useReducer(reducer,[
    {id: 101111,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
    {id: 121312321,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
  ])

  const [activeTile, setActiveTile] = useState(tiles[0].id)
  const [activeTileValue, setActiveTileValue] = useState(0)
  useEffect(()=>{
    dispatch({
        type: ACTIONS.UPDATE_TILE_VALUES, 
        payload: { 
          id: activeTile, 
          value: activeTileValue  
        }})
  },[activeTileValue])

  function handleButtonClick(e){
    let target = e.target
    let value = target.innerHTML
    if(value === 'CE'){
      setActiveTileValue(0)
      return
    }
    
    if(value === 'DEL'){
      if(activeTileValue === 0 ) return
      let newValue = activeTileValue.slice(0,-1) || 0
      setActiveTileValue( newValue )
      return
    }
    let newValue = (activeTileValue !== 0) ? activeTileValue + `${value}` : value
    setActiveTileValue(newValue)
  }
  console.log(tiles)
  return (
    <div className="App">
      <Navigation 
        data={data} 
        unitCategory={unitCategory} 
        setUnitCategory={setUnitCategory}
        dispatch={dispatch}
        />
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
              dispatch={dispatch}
              />
          )
        }
      </div>
      <div className='buttons'>
        {
          BUTTONS['converter'].map((button,index)=>
            <button key={index} onClick={ (e)=>{ handleButtonClick(e) } }>{button}</button>
          )
          }
      </div>
    </div>
  );
}

export default App;

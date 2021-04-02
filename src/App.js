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
  console.log(tiles)
  console.log(action)
  switch(action.type){
    case ACTIONS.UPDATE_UNIT: 
      return tiles.map(tile=>{
        let payload = action.payload
        if(payload.id && payload.activeTile.id !== tile.id && payload.id === tile.id) return {...tile, value: (payload.activeTile.value * action.payload.computedRate)}
        return {...tile, unit: {name: action.payload.name, rate: action.payload.rate}}
      })
    case ACTIONS.UPDATE_TILE_VALUES: 
      return tiles.map(tile=>{
        if(tile.id === action.payload.id) return {...tile, value: action.payload.value}
        let newValue = ((action.payload.value*100) * (tile.unit.rate*100) / (100*100)).toFixed(2)
        return {...tile, value: newValue.toLocaleString('en-US')}
      })
    default: return tiles
  }
}

function App() {
  const [unitCategory, setUnitCategory] = useState('weight')
  const [tiles, dispatch] = useReducer(reducer,[
    {id: 101111,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
    {id: 121312321,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
    {id: 12131232321,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
  ])

  // const [activeTile, setActiveTile] = useState(tiles[0].id)
  // const [activeTileValue, setActiveTileValue] = useState(0)
  // const [actilveTiveRate, setActiveTileRate] = useState(tiles[0].unit.rate)
  const [activeTile, setActiveTile] = useState({ id: tiles[0].id, value: 0, rate: tiles[0].unit.rate})

  useEffect(()=>{
    dispatch({
        type: ACTIONS.UPDATE_TILE_VALUES, 
        payload: { 
          id: activeTile.id, 
          value: activeTile.value  
        }})
  },[activeTile.value])

  useEffect(()=>{
    console.log(activeTile)
  },[activeTile.id])

  function handleButtonClick(e){
    let target = e.target
    let value = target.innerHTML
    if(value === 'CE'){
      setActiveTile({...activeTile,value: 0})
      return
    }
    
    if(value === 'DEL'){
      if(activeTile.value === 0 ) return
      let newValue = activeTile.value.slice(0,-1) || 0
      setActiveTile( {...activeTile,value:newValue} )
      return
    }
    let newValue = (activeTile.value !== 0) ? activeTile.value + `${value}` : value
    setActiveTile({...activeTile,value: newValue})
  }
  return (
    <div className="App">
      <Navigation 
        data={data} 
        unitCategory={unitCategory} 
        setUnitCategory={setUnitCategory}
        activeTile={activeTile}
        setActiveTile={setActiveTile}
        dispatch={dispatch}
        />
      <div className='tileCon'>
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
      <div className='buttonCon'>
        {
          BUTTONS['converter'].map((button,index)=>
            {
              if(button === '' ) return <button className='button'>{button}</button>
              let className = (/[0-9.]/.test(button)) ? 'button button__normal' : 'button button__special'
              return <button className={className} key={index} onClick={ (e)=>{ handleButtonClick(e) } }>{button}</button>
            }        
          )
          }
      </div>
    </div>
  );
}

export default App;

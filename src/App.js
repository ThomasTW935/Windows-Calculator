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
      carats: 5,
      milligrams: 1000,
      centigrams: 100,
      decigrams: 10,
      grams: 1,
      dekagrams: .1,
      hecktograms: 0.01,
      kilograms: .001,
      metric_tonnes: .000001,
      ounces: 0.035274,
      pounds: 0.002205,
      stone: 0.000157,
      short_tons_US: 0.000001,
      long_tons_UK: 0.000000984206528
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
      let payload = action.payload
      let newUnit = {name: action.payload.name, rate: action.payload.rate}
      
      if(!payload.id) return {...tile, unit: newUnit }

      if(tile.id === payload.id && payload.id === payload.activeTile.id) return { ...tile , unit: newUnit}
      
      let newValue = payload.activeTile.value * (payload.rate / payload.activeTile.rate)
      if(tile.id === payload.id && tile.id !== payload.activeTile.id) return {...tile,value: newValue , unit: newUnit}
      
      newValue = payload.activeTile.value * (tile.unit.rate / payload.rate)
      if(tile.id !== payload.id && payload.id === payload.activeTile.id) return {...tile, value: newValue }
      
      return tile
      })
    case ACTIONS.UPDATE_TILE_VALUES: 
      return tiles.map(tile=>{
        let payload = action.payload
        if(tile.id === payload.activeTile.id) return {...tile, value: parseFloat(payload.activeTile.value)}
        let newValue = payload.activeTile.value * (tile.unit.rate / payload.activeTile.rate)
        return {...tile, value: newValue}
      })
    default: return tiles
  }
}

function App() {
  const [unitCategory, setUnitCategory] = useState('weight')
  const [tiles, dispatch] = useReducer(reducer,[
    {id: 1,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
    {id: 2,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
    {id: 3,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
  ])
  const [activeTile, setActiveTile] = useState({ id: tiles[0].id, value: 0, rate: tiles[0].unit.rate})

  useEffect(()=>{
    dispatch({type: ACTIONS.UPDATE_TILE_VALUES, payload: {activeTile:activeTile} })
    console.log(activeTile)
  },[activeTile.value])


  function handleButtonClick(e){
    let target = e.target
    let value = target.innerHTML
    if(value === 'CE'){
      setActiveTile(prevActiveTile => {return {...prevActiveTile,value: 0}})
      return
    }
    
    if(value === 'DEL'){
      if(activeTile.value === 0 ) return
      let newValue = activeTile.value.slice(0,-1) || 0
      setActiveTile(prevActiveTile => {return {...prevActiveTile,value:newValue}} )
      return
    }
    let newValue = (activeTile.value !== 0) ? activeTile.value + `${value}` : value
    setActiveTile(prevActiveTile => {return {...prevActiveTile,value: newValue}})
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
              if(button === '' ) return <span key={index}>{button}</span>
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

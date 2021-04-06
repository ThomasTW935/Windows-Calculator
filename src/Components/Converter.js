import React, {useReducer, useEffect,useState} from 'react'
import { ACTIONS, BUTTONS } from '../App';
import ConverterTile from './ConverterTile';
import Buttons from './Buttons'

export const data = [
    {
      id: 0,
      category: 'Weight',
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
      category: 'Length',
      default: 'meter',
      units: {
        meter: 1,
        kilometer: .001,
      }
    },
    {
      id: 2,
      category: 'Volume',
      default: 'liters',
      units: {
        milliliters: 1000,
        liters: 1,
      }
    }
]

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

export default function Converter({category}) {
    
    const [tiles, dispatch] = useReducer(reducer,[
        {id: 1,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
        {id: 2,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
        {id: 3,value:0, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
      ])
      const [activeTile, setActiveTile] = useState({ id: tiles[0].id, value: 0, rate: tiles[0].unit.rate})
    
      useEffect(()=>{
        dispatch({type: ACTIONS.UPDATE_TILE_VALUES, payload: {activeTile:activeTile} })
      },[activeTile, activeTile.value])

      useEffect(()=>{
        let newData = data.filter(value =>  value.category === category)
        console.log('Hello from Converter.js')
        let unitName = newData[0].default
        let unitRate = newData[0].units[unitName]
        setActiveTile( (prevActiveTile) => {return { ...prevActiveTile, value: 0 , rate: unitRate}})
        dispatch({type: ACTIONS.UPDATE_UNIT, payload: { name: unitName, rate: unitRate }})
      }, [category])

    return (
        <>
            <div className='tileCon'>
                { tiles.map((tile,index)=>
                    <ConverterTile 
                    key={tile.id} 
                    category={category} 
                    tile={tile}
                    tiles={tiles}
                    activeTile={activeTile}
                    setActiveTile={setActiveTile}
                    dispatch={dispatch}
                    />
                    )
                }
            </div>
            <Buttons buttons={BUTTONS.converter} activeTile={activeTile} setActiveTile={setActiveTile} />
        </>
    )
}

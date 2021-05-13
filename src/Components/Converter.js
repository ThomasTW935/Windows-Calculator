import React, {useReducer, useEffect,useState,useRef} from 'react'
import { ACTIONS,  } from '../App';
import ConverterTile from './ConverterTile';
import Buttons from './Buttons'
import axios from 'axios'

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

function reducer(tiles,{type,payload}){
    switch(type){
      case ACTIONS.UPDATE_ACTIVE_TILE:
        return tiles.map(tile=>{
          return {...tile, active: (tile.id === payload.id)} 
        })
      case ACTIONS.UPDATE_ACTIVE_VALUE:
        return tiles.map(tile=>{
          if(!tile.active) return tile
          return {...tile, value: payload.value}
        })
      case ACTIONS.UPDATE_UNIT:
        return tiles.map(tile=>{
          if(tile.id !== payload.id) return tile
          return { ...tile, unit: { name: payload.name, rate: payload.rate } }
        })
      case ACTIONS.UPDATE_INACTIVE_TILE_VALUE:
        return tiles.map(tile=>{
          if(tile.active) return tile
          let activeTile =  tiles.filter(tile=> tile.active)[0]
          return {...tile, value: (Number(activeTile.value) / activeTile.unit.rate) * tile.unit.rate}
        })
      case ACTIONS.UPDATE_TILE_VALUES: 
        return tiles.map(tile=>{
          if(tile.id === payload.activeTile.id) return {...tile, value: parseFloat(payload.activeTile.value)}
          let newValue = payload.activeTile.value * (tile.unit.rate / payload.activeTile.rate)
          return {...tile, value: newValue}
        })
      default: return tiles
    }
}



export default function Converter({category}) {
  // const {CE,DEL} = SPECIAL_BUTTONS
  const upperTileRef = useRef()
  const lowerTileRef = useRef()
  const [tiles, dispatch] = useReducer(reducer,[
      {id: 1,ref: upperTileRef,value:0, active:true, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
      {id: 2,ref: lowerTileRef,value:0, active:false, unit: {name: data[0].default, rate: data[0].units[data[0].default]}},
  ])

  const [inputValue, setInputValue] = useState(0)

  useEffect(()=>{
    dispatch({type: ACTIONS.UPDATE_ACTIVE_VALUE, payload: {value:inputValue.toLocaleString('en-US')}})
    dispatch({ type: ACTIONS.UPDATE_INACTIVE_TILE_VALUE, payload: {} })
  },[inputValue])

  

  useEffect(()=>{
    const apiUrl = "https://api.ratesapi.io/api/latest"
    axios.get(apiUrl).then(res=>{
      let rates =  {...res.data.rates, EUR:1}
      let sortedRates = Object.fromEntries(Object.entries(rates).sort())
      let newItem = {
        id:4,
        category: 'Currency',
        default: res.data.base,
        units: sortedRates
      }
      data.push(newItem)
    }).catch(err=>{
      console.log(`Error Here: ${err}`)
    })
  }, [])

  useEffect(()=>{
    let newData = data.filter(value =>  value.category === category)
    let unitName = newData[0].default
    let unitRate = newData[0].units[unitName]
    dispatch({type: ACTIONS.UPDATE_UNIT, payload: { name: unitName, rate: unitRate }})
  }, [])
  console.log(data)
  console.log(tiles)
  return (
      <>
          <div className='tileCon'>
              { tiles.map((tile,index)=>
                  <ConverterTile 
                  key={tile.id} 
                  category={category} 
                  tile={tile}
                  tiles={tiles}
                  dispatch={dispatch}
                  />
                  )
              }
          </div>
          <Buttons 
            currentValue={inputValue} 
            setCurrentValue={setInputValue} 
            name='converter' />
      </>
  )
}

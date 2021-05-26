import React,{useReducer, useState} from 'react'
import ConverterTile from './ConverterTile';
import Buttons from './Buttons'
import { SPECIAL_BUTTONS, ACTIONS, Button } from '../Data';


type Props = {
  category: string
}




type Reducer<State,Action> = (state: State, action: Action)=> State

export interface tile{
  id:number,
  value:number,
  unit:string,
}

interface payload{
  id:number,
  value:number,
  unit:String,
}

type State = {
  tiles: tile[],
  active: number
}

export type Action =
 | { type: ACTIONS.UPDATE_UNIT, payload: {id: number, unit: string} }
 | { type: ACTIONS.UPDATE_ACTIVE_TILE, payload: {id: number} }


const initialState: State = {
  tiles: [
    {id:1,value:0,unit:'m'},
    {id:2,value:0,unit:'km'},
  ],
  active:1
}



const reducer: Reducer<State, Action> = (states, action)=>{
  const {type, payload} = action
  switch(action.type){
    case ACTIONS.UPDATE_UNIT: 
      const newTiles: tile[] = states.tiles.map(tile=>{
        if(tile.id !== payload.id) return tile
        return {...tile, unit: action.payload.unit}
      })
      return {...states, tiles: newTiles}
    case ACTIONS.UPDATE_ACTIVE_TILE:
      return {...states, active: payload.id}
    default: return states
  }
}

const {CE,DEL} = SPECIAL_BUTTONS
export default function Converter({category}:Props) {
  
  const [states,dispatch] = useReducer<Reducer<State,Action>>(reducer, initialState)
  const [activeValue,setActiveValue] = useState(0)
  // useEffect(()=>{
  //   const apiUrl = "https://api.ratesapi.io/api/latest"
  //   axios.get(apiUrl).then(res=>{
  //     let rates =  {...res.data.rates, EUR:1}
  //     let sortedRates = Object.fromEntries(Object.entries(rates).sort())
  //     let newItem = {
  //       id:4,
  //       category: 'Currency',
  //       default: res.data.base,
  //       units: sortedRates
  //     }
  //     data.push(newItem)
  //   }).catch(err=>{
  //     console.log(`Error Here: ${err}`)
  //   })
  // }, [])

  // function buttonClickReturnValue(button, currentValue=0, name=''){
  //   let {value} = button
  //   let newValue;
  //   if(value === CE.value) return 0
  //   if(value === DEL.value){
  //     if(currentValue === 0 ) return 0
  //     let reformatValue = (typeof currentValue !== 'String') ? currentValue.toString() : currentValue
  //     let newValue = reformatValue.slice(0,-1) || 0
  //     return newValue
  //   }
  //   let regex = /[0-9.]/
  //   if(!regex.test(value)) return currentValue + `${value}`
  //   newValue = (parseFloat(currentValue) !== 0) ? currentValue + `${value}` : value
  //   return newValue
  // }
  function handleButtonAction(button:Button){
    // let newValue = buttonClickReturnValue(button, activeValue)
    const value = Number(button.value)
    setActiveValue(value)
  }
  return (
      <>
        <div className='tileCon'>
            { states.tiles.map((tile,index)=>
                <ConverterTile 
                key={tile.id} 
                category={category} 
                tile={tile}
                active={states.active}
                dispatch={dispatch}
                />
                )
            }
        </div>
        <Buttons 
          action={handleButtonAction}
          name='converter' />
      </>
  )
}

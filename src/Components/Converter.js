import React,{useReducer, useState} from 'react'
import ConverterTile from './ConverterTile';
import Buttons from './Buttons'
import { SPECIAL_BUTTONS } from '../Data';

function reducer(state,{type,payload}){

}

const {CE,DEL} = SPECIAL_BUTTONS
export default function Converter({category}) {
  const [states,dispatch] = useReducer(reducer, [
    {id:1,value:0,unit:'', isActive: true},
    {id:2,value:0,unit:'', isActive: false},
  ])
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

  function buttonClickReturnValue(button, currentValue=0, name=''){
    let {value} = button
    let newValue;
    if(value === CE.value) return 0
    if(value === DEL.value){
      if(currentValue === 0 ) return 0
      let reformatValue = (typeof currentValue !== 'String') ? currentValue.toString() : currentValue
      let newValue = reformatValue.slice(0,-1) || 0
      return newValue
    }
    let regex = /[0-9.]/
    if(!regex.test(value)) return currentValue + `${value}`
    newValue = (parseFloat(currentValue) !== 0) ? currentValue + `${value}` : value
    return newValue
  }
  function handleButtonAction(value){
    let newValue = buttonClickReturnValue(value, activeValue)
    setActiveValue(newValue)
  }

  return (
      <>
        <div className='tileCon'>
            { states.map((state,index)=>
                <ConverterTile 
                key={state.id} 
                category={category} 
                state={state}
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

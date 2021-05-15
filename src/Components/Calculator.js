import React, {useState} from 'react'
import Buttons from './Buttons'
import CalculatorTile from './CalculatorTile'
import {evaluate} from 'mathjs'
import {SPECIAL_BUTTONS, NORMAL_BUTTONS} from '../Data'
import { useReducer } from 'react'
import { Satellite } from '@material-ui/icons'

const ACTIONS = {
  CLEAR: 'clear',
  DEL: 'delete',
  ADD_NUM: 'add-num',
  ADD_SPECIAL_CHAR: 'add-special-char',
  EVALUATE: 'evaluate',
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.CLEAR: return {value: 0, equation: ''}
    case ACTIONS.DEL: return {...state,value: payload.value}
    case ACTIONS.ADD_NUM: return {...state, value: payload.value}
    case ACTIONS.ADD_SPECIAL_CHAR: return {value: 0, equation: state.equation + payload.value}
    case ACTIONS.EVALUATE: return {value: evaluate(state.equation + state.value), equation: ''}
    default: return state
  }

}
export default function Calculator({category}) {
  const [state,dispatch] = useReducer(reducer, {value: 0, equation: ''})
  const [value, setValue] = useState(0)

  const {C,CE,EQUALS, MULTIPLY,DEL} = SPECIAL_BUTTONS

  function buttonClickReturnValue(button, value=0, name=''){
    if(button === CE.value) {
        return dispatch({type: ACTIONS.CLEAR, payload: {}})
    }
    if(button === DEL.value){
      if(value === 0 ) return 
      let reformatValue = (typeof value !== 'String') ? value.toString() : value
      let newValue = reformatValue.slice(0,-1) || 0
      return dispatch({ type: ACTIONS.DEL, payload: {value: newValue} })
    }
    if(button === EQUALS.value) {
    //   console.log(equation + button)
    //   setInputValue(evaluate(equation + button))
    //   setEquation('')
      dispatch({type: ACTIONS.EVALUATE, payload: {}})
      return 
    }
    let regex = /[0-9.]/
    let newValue = (parseFloat(value) !== 0) ? value + `${button}` : button
    if(!regex.test(button)) {
      dispatch({type: ACTIONS.ADD_SPECIAL_CHAR, payload:{ value: newValue }})
      return
      // return value + `${button}`
    }
    dispatch({type: ACTIONS.ADD_NUM, payload: { value: newValue }})
  }
  function handleButtonClick(button){
    buttonClickReturnValue(button, state.value)
  }


  return (
    <>
      <CalculatorTile state={state}/>
      <Buttons name='CALCULATOR' action={handleButtonClick}/>  
    </>
  )
}

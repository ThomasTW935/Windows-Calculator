import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBackspace, faDivide, faTimes} from '@fortawesome/free-solid-svg-icons'


export const SPECIAL_BUTTONS = {
  BLANK: {label: '', value: ''},
  CE: {label:'CE', value: 'clear-entry'},
  C: {label:'C', value: 'clear'},
  DEL: {label:<FontAwesomeIcon icon={faBackspace}/>, value: 'del'},
  DIVIDE: {label:<FontAwesomeIcon icon={faDivide}/>, value: '/'},
  MULTIPLY: {label:<FontAwesomeIcon icon={faTimes}/>, value: '*'},
  SUBTRACT: {label:'-', value: '-'},
  ADD: {label:'+', value: '+'},
  EQUALS: {label:'=', value: 'equals'},
  PERIOD: {label:'.', value: '.'},
}
const NORMAL_BUTTONS = {
  zero: {label: '0', value: '0'},
  one:  {label: '1', value: '1'},
  two:  {label: '2', value: '2'},
  three:{label: '3', value: '3'},
  four: {label: '4', value: '4'},
  five: {label: '5', value: '5'},
  six:  {label: '6', value: '6'},
  seven:{label: '7', value: '7'},
  eight:{label: '8', value: '8'},
  nine: {label: '9', value: '9'},
}

const {BLANK,CE,C,DEL,DIVIDE,MULTIPLY,SUBTRACT,ADD,EQUALS,PERIOD} = SPECIAL_BUTTONS
const {zero,one,two,three,four,five,six,seven,eight,nine} = NORMAL_BUTTONS

export const buttonClickReturnValue = (button, value=0)=>{
  let newValue;
  if(button === CE.value) return 0
  if(button === DEL.value){
    if(value === 0 ) return 0
    let reformatValue = (typeof value !== 'String') ? value.toString() : value
    let newValue = reformatValue.slice(0,-1) || 0
    return newValue
  }
  let regex = /[0-9.]/
  if(!regex.test(button)) return 0
  newValue = (parseFloat(value) !== 0) ? value + `${button}` : button
  return newValue
}


export default function Buttons({currentValue,setCurrentValue, name = ''}) {
  const [buttons,setButtons] = useState([])
  const handleButtonClick = (value)=>{
    let newValue = buttonClickReturnValue(value, currentValue)
    setCurrentValue(newValue)
  }
  
  
  useEffect(()=>{
    const converterButtons = [BLANK,CE,DEL,seven,eight,nine,four,five,six,one,two,three,BLANK,zero,PERIOD]
    if(name === 'converter') setButtons(converterButtons)
  }, [name])
    return (
        <div className={`buttonCon buttonCon__${name}`}>
        {
          buttons.map((button,index)=>
            {
              if(button.value === '' ) return <span key={index}>{button.label}</span>
              let className = (/[0-9.]/.test(button.value)) ? 'button button__normal' : 'button button__special'
              return <button data-value={button.value} className={className} key={index} onClick={ ()=>{ handleButtonClick(button.value) } }>{button.label}</button>
            }        
          )
          }
      </div>
    )
}

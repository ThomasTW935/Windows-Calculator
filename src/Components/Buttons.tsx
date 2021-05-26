import React from 'react'
import {SPECIAL_BUTTONS, NORMAL_BUTTONS, Button} from '../Data'


const {BLANK,CE,C,DEL,DIVIDE,MULTIPLY,SUBTRACT,ADD,EQUALS,PERIOD} = SPECIAL_BUTTONS
const {zero,one,two,three,four,five,six,seven,eight,nine} = NORMAL_BUTTONS

type ButtonsProps = {
  name:string,
  action: (arg0: Button) => void
}

export default function Buttons({name = '', action}: ButtonsProps) {
  const buttons = getButtons(name) 
  function getButtons(name:string){
    const converterButtons = [BLANK,CE,DEL,seven,eight,nine,four,five,six,one,two,three,BLANK,zero,PERIOD]
    const calculatorButtons = [
      CE,C,DEL,DIVIDE,
      seven,eight,nine,MULTIPLY,
      four,five,six,SUBTRACT,
      one,two,three,ADD,
      BLANK,zero,PERIOD, EQUALS]
    switch(name){
      case "converter" : return converterButtons
      case "CALCULATOR" : return calculatorButtons
      default: return []
    } 
  }
  
  return (
      <div className={`buttonCon buttonCon__${name}`}>
      {
        buttons.map((button,index)=>
          {
            if(button.value === '' ) return <span key={index}>{button.label}</span>
            let className = (/[0-9.]/.test(button.value)) ? 'button button__normal' : 'button button__special'
            return <button data-value={button.value} aria-label={button.value} className={className} key={index} onClick={ ()=>{ action(button) } }>{button.label}</button>
          }        
        )
      }
    </div>
  )
}

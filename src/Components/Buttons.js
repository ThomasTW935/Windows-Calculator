import React from 'react'
import {SPECIAL_BUTTONS} from '../App';


export default function Buttons({buttons,activeTile, setActiveTile}) {
  const {CE,DEL} = SPECIAL_BUTTONS
    function handleButtonClick(e){
        let target = e.target
        let value = target.innerHTML
        if(value === CE){
          setActiveTile(prevActiveTile => {return {...prevActiveTile,value: 0}})
          return
        }
        
        if(value === DEL){
          if(activeTile.value === 0 ) return
          console.log(typeof activeTile.value)
          let value = (activeTile.value !== 'String') ? activeTile.value.toString() : activeTile.value
          let newValue = value.slice(0,-1) || 0
          setActiveTile(prevActiveTile => {return {...prevActiveTile,value:newValue}} )
          return
        }
        let newValue = (activeTile.value !== 0) ? activeTile.value + `${value}` : value
        setActiveTile(prevActiveTile => {return {...prevActiveTile,value: newValue}})
      }
    return (
        <div className='buttonCon'>
        {
          buttons.map((button,index)=>
            {
              if(button === '' ) return <span key={index}>{button}</span>
              let className = (/[0-9.]/.test(button)) ? 'button button__normal' : 'button button__special'
              if(button === DEL) className += ` DEL`
              return <button className={className} key={index} onClick={ (e)=>{ handleButtonClick(e) } }>{button}</button>
            }        
          )
          }
      </div>
    )
}

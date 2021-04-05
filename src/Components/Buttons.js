import React from 'react'

export default function Buttons({buttons,activeTile, setActiveTile}) {
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
        <div className='buttonCon'>
        {
          buttons.map((button,index)=>
            {
              if(button === '' ) return <span key={index}>{button}</span>
              let className = (/[0-9.]/.test(button)) ? 'button button__normal' : 'button button__special'
              return <button className={className} key={index} onClick={ (e)=>{ handleButtonClick(e) } }>{button}</button>
            }        
          )
          }
      </div>
    )
}

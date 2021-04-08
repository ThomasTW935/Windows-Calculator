import React from 'react'


export default function Buttons({buttons, action, name = ''}) {
 
    return (
        <div className={`buttonCon buttonCon__${name}`}>
        {
          buttons.map((button,index)=>
            {
              if(button === '' ) return <span key={index}>{button}</span>
              let className = (/[0-9.]/.test(button)) ? 'button button__normal' : 'button button__special'
              return <button className={className} key={index} onClick={ (e)=>{ action(e) } }>{button}</button>
            }        
          )
          }
      </div>
    )
}

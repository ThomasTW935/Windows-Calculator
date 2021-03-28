import React from 'react';

function Navigation({data, unit,setUnit}) {
    
    
    return (
        <div className='nav'>
            <div className='nav__burger'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <select>
                {
                    Object.keys(data).map(key=>
                         <option key={key} onClick={ ()=>{setUnit(key)} } >{key}</option>
                    )
                }
            </select>      
            <h3 className='nav__title'>{unit.unit}</h3>
        </div>
    );
}

export default Navigation;
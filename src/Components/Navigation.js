import React from 'react';

function Navigation({data, unitCategory,setUnitCategory}) {
    
    
    return (
        <div className='nav'>
            <div className='nav__burger'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <select>
                {
                    data.map(item=>
                        <option key={item.id} onClick={ ()=>{setUnitCategory(item.category)} }>{item.category}</option> 
                    )
                }
            </select>      
            <h3 className='nav__title'>{unitCategory}</h3>
        </div>
    );
}

export default Navigation;
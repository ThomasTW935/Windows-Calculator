import React, { useState } from 'react';

function Navigation() {
    const data = {
        weight: {
            grams: 1,
            kilograms: 1000,
        },
        length: {
            meter: 1,
            kilometer: 1000,
        },
        volume: {
            milliliters:1,
            liter: 1000
        }
    }
    const [unit, setUnit] = useState('weight')
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
            <h3 className='nav__title'>{unit}</h3>
        </div>
    );
}

export default Navigation;
import React from 'react';
import {  CATEGORIES } from '../App';

function Navigation({category,setCategory}) {
    
    // function handleOptionChange(e){
    //     let target = e.target
    //     let idx = target.selectedIndex
    //     let dataset =  target.options[idx].dataset

    //     let unitName = dataset.default
    //     let unitRate = dataset.rate

    //     setUnitCategory(target.value)
    //     setActiveTile( (prevActiveTile) => {return { ...prevActiveTile, value: 0 , rate: unitRate}})
    //     dispatch({type: ACTIONS.UPDATE_UNIT, payload: { name: unitName, rate: unitRate }})
    // }
    
    return (
        <div className='nav'>
            <div className='nav__burger'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <select className='select' value={category} onChange={ (e)=>{ setCategory(e.target.value) } }>
                {
                    Object.entries(CATEGORIES).map(([key,values],index)=>{
                        return <optgroup key={index} label={key}>
                            {values.map((value,index)=>{
                                return <option key={index}>{value}</option>
                            })}
                        </optgroup>
                    })

                    // data.map(item=>
                    //     <option key={item.id} data-default={item.default} data-rate={item.units[item.default]} >{item.category}</option> 
                    // )
                }
            </select>      
            <h3 className='nav__title'>{category}</h3>
            
        </div>
    );
}

export default Navigation;
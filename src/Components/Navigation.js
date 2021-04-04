import React from 'react';
import { ACTIONS } from '../App';

function Navigation({data, unitCategory,setUnitCategory,activeTile,setActiveTile, dispatch}) {
    
    function handleOptionChange(e){
        let target = e.target
        let idx = target.selectedIndex
        let dataset =  target.options[idx].dataset

        let unitName = dataset.default
        let unitRate = dataset.rate

        setUnitCategory(target.value)
        setActiveTile( (prevActiveTile) => {return { ...prevActiveTile, value: 0 , rate: unitRate}})
        dispatch({type: ACTIONS.UPDATE_UNIT, payload: { name: unitName, rate: unitRate }})
    }

    return (
        <div className='nav'>
            <div className='nav__burger'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <select className='select' value={unitCategory} onChange={ (e)=>{ handleOptionChange(e) } }>
                {
                    data.map(item=>
                        <option key={item.id} data-default={item.default} data-rate={item.units[item.default]} >{item.category}</option> 
                    )
                }
            </select>      
            <h3 className='nav__title'>{unitCategory}</h3>
            
        </div>
    );
}

export default Navigation;
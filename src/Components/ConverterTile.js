import { Tooltip } from '@material-ui/core';
import React from 'react';
import {ACTIONS} from '../App';
import {data} from './Converter';

function ConverterTile({category,tile,dispatch}) {
    let {id,value} = tile
    let {name,rate} = tile.unit
    function handleOptionChange(e){
        // let target = e.target
        // let dataset = target.options[target.selectedIndex].dataset
        // let {name,rate} = dataset

        // if(id === activeTile.id) setActiveTile({...activeTile, rate: rate}); console.log('im here')
        
        // dispatch({type: ACTIONS.UPDATE_UNIT, payload: {id: id,name:name, rate: rate, activeTile: activeTile, computedRate: rate/activeTile.rate}})
    }
    function handleTileClick(id){
        dispatch({type: ACTIONS.UPDATE_ACTIVE_TILE, payload:{ id: id }})
        // dispatch({type: ACTIONS.UPDATE_UNIT, payload: {id: id,name:name, rate: rate, activeTile: activeTile, computedRate: rate/activeTile.rate}})
    }
    return (
        <div className='tilee'>
            <input 
                ref={tile.ref} 
                value={tile.value}
                style={{fontWeight:tile.active ? 'bold' : ''} }  
                onClick={ () => handleTileClick(tile.id) }
                autoFocus={ tile.active }
                />
            <select className='select' value={name} >
                {
                    data.map((item,index)=>
                        {
                            if(item.category === category)
                                {
                                    return Object.keys(item['units']).map((value,index)=>
                                    { 
                                        return <option key={index} data-name={value} data-rate={item.units[value]} >{value}</option> 
                                    }
                                )}
                            return []
                        }
                    )
                }           
            </select>
        </div>
    );
}

export default ConverterTile;
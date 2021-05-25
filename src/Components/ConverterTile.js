import React from 'react';
import {ACTIONS, CONVERTER_DATA as data} from '../Data';

function ConverterTile({category,tile,dispatch}) {
    let {id,value} = tile
    let {name,rate} = tile.unit
    function handleOptionChange(e){
        let target = e.target
        let dataset = target.options[target.selectedIndex].dataset
        let {name,rate} = dataset
        dispatch({type: ACTIONS.UPDATE_UNIT, payload: {id: id,name:name, rate: rate}})
        dispatch({ type: ACTIONS.UPDATE_INACTIVE_TILE_VALUE, payload:{} })
    }
    function handleTileClick(id){
        dispatch({type: ACTIONS.UPDATE_ACTIVE_TILE, payload:{ id: id }})
    }
    return (
        <div className='tile'>
            <input 
                ref={tile.ref} 
                value={tile.value.toLocaleString('en-US')}
                style={{fontWeight:tile.active ? 'bold' : ''} }  
                onClick={ () => handleTileClick(tile.id) }
                autoFocus={ tile.active }
                readOnly
                />
            <select className='select' value={name} onChange={ (e)=>{handleOptionChange(e)} }>
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
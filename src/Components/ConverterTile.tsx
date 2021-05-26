import React, { Dispatch, FormEvent } from 'react';
import {ACTIONS, TEST_DATA as data} from '../Data';
import {tile,Action} from './Converter'

type Props = {
    key: number; 
    category: string; 
    tile: tile; 
    active: number; 
    dispatch: Dispatch<Action>
}

function ConverterTile({category,tile,active,dispatch}: Props) {
    let {id,value,unit} = tile
    function handleOptionChange(e:FormEvent<HTMLSelectElement>){
        const target = e.currentTarget
        dispatch({type: ACTIONS.UPDATE_UNIT, payload:{ id: id, unit: target.value }})
    }
    function handleTileClick(id:number){
        dispatch({type: ACTIONS.UPDATE_ACTIVE_TILE, payload:{ id: id }})
    }
    return (
        <div className='tile'>
            <input 
                value={value.toLocaleString('en-US')}
                style={{fontWeight:active === id ? 'bold' : 'normal'} }  
                onClick={ () => handleTileClick(id) }
                autoFocus={ active === id }
                readOnly
                />
            <select className='select' value={unit} onChange={handleOptionChange}>
                {
                    data.map((item,index)=>
                        {
                            if(item.category !== category) return []
                            return Object.entries(item.units).map(([key,value],index)=>
                                <option key={index} value={key}>{value + `(${key})`}</option>
                            )
                        }
                    )
                }           
            </select>
        </div>
    );
}

export default ConverterTile;
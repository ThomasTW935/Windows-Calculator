import React, { FormEvent } from 'react';
import {ACTIONS, TEST_DATA as data} from '../Data';


interface state {
    id:number,
    value:number,
    unit:string, 
    isActive: boolean
}

type Props = {
    category: string,
    state: state,
    dispatch: (arg0: Object)=> void,
}

function ConverterTile({category,state,dispatch}: Props) {
    let {id,value,unit,isActive} = state
    function handleOptionChange(e:FormEvent<HTMLSelectElement>){
        const target = e.currentTarget
        dispatch({type: ACTIONS.UPDATE_UNIT, payload:{ id: id, unit: target.value }})
    }
    function handleTileClick(id:number){
        dispatch({type: ACTIONS.UPDATE_ACTIVE_TILE, payload:{ id: id }})
    }
    console.log(category)
    return (
        <div className='tile'>
            <input 
                value={value.toLocaleString('en-US')}
                style={{fontWeight:isActive ? 'bold' : 'normal'} }  
                onClick={ () => handleTileClick(id) }
                autoFocus={ isActive }
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
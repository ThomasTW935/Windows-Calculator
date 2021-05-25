import React from 'react';
import {ACTIONS, TEST_DATA as data} from '../Data';


function ConverterTile({category,state,dispatch}) {
    let {id,value,unit,isActive} = state
    function handleOptionChange(e){
        
    }
    function handleTileClick(id){
        dispatch({type: ACTIONS.UPDATE_ACTIVE_TILE, payload:{ id: id }})
    }
    return (
        <div className='tile'>
            <input 
                value={value.toLocaleString('en-US')}
                style={{fontWeight:isActive ? 'bold' : ''} }  
                onClick={ () => handleTileClick(id) }
                autoFocus={ isActive }
                readOnly
                />
            <select className='select' value={unit} onChange={ (e)=>{handleOptionChange(e)} }>
                {
                    data.map((item,index)=>
                        {
                            if(item.category === category) return []
                                
                            return []
                        }
                    )
                }           
            </select>
        </div>
    );
}

export default ConverterTile;
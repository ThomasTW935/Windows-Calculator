import React from 'react';
import {ACTIONS} from '../App';

function ConverterTile({data,unitCategory,tile,activeTile,setActiveTile,dispatch}) {
    let {id,value} = tile
    let {name,rate} = tile.unit

    function handleOptionChange(e){
        let target = e.target
        let dataset = target.options[target.selectedIndex].dataset
        let {name,rate} = dataset

        if(id === activeTile.id) setActiveTile({...activeTile, rate: rate}); console.log('im here')
        
        dispatch({type: ACTIONS.UPDATE_UNIT, payload: {id: id,name:name, rate: rate, activeTile: activeTile, computedRate: rate/activeTile.rate}})
    }
    function handleClickEvent(e){
        console.log(tile)
        setActiveTile( (prevActiveTile) => {return {...prevActiveTile,id:id,value: value, rate: rate }})
        // dispatch({type: ACTIONS.UPDATE_UNIT, payload: {id: id,name:name, rate: rate, activeTile: activeTile, computedRate: rate/activeTile.rate}})
    }
    return (
        <div className='converterTile'>
            <p
                className={ (activeTile.id === id) ? `fontBold` : ``} 
                onClick={  (e) => handleClickEvent(e)  }
            >{value.toLocaleString('en-US')}</p>
            <select className='select' value={name} onChange={ (e)=>{ handleOptionChange(e) } } >
                {
                    data.map((item,index)=>
                        {
                            if(item.category === unitCategory)
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
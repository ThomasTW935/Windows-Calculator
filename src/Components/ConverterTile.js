import React from 'react';

function ConverterTile({data,unitCategory,tile,activeTile,setActiveTile}) {
    let {id,value,unit} = tile

    return (
        <div className='converterTile'>
            <p className={ (activeTile === id) ? `fontBold` : ``} onClick={  ()=>setActiveTile(id) } >{value}</p>
            <select>
                {
                    data.map((item,index)=>
                        {
                            if(item.category === unitCategory)
                                {
                                    return Object.keys(item['units']).map((value,index)=>
                                    { return <option key={index}>{value}</option> }
                                )}
                        }
                    )
                }           
            </select>
        </div>
    );
}

export default ConverterTile;
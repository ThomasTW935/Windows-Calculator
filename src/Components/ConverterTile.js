import React from 'react';

function ConverterTile({data,unit,position,activeTile,setActiveTile}) {
    return (
        <div class='converterTile'>
            <p className={ (activeTile === position) ? `fontBold` : `` } onClick={ () => { setActiveTile( (position) ? 1 : 0 ) } }>0</p>
            <select>
                {
                    Object.keys(data[unit]).map(key=>
                        <option>{key}</option>
                    )
                }           
            </select>
        </div>
    );
}

export default ConverterTile;
import React from 'react';

function ConverterTile({data,unit}) {
    return (
        <div>
            <p>0</p>
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
import React from 'react'

export default function CalculatorTile({value}) {
    return (
        <div className='calculatorTile'>
            <input value={value}/>
        </div>
    )
}

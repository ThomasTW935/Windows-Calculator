import React from 'react'

export default function CalculatorTile({value,equation}) {
    return (
        <div className='tile justify-right'>
            <p className='equation'>{equation}</p>
            <p>{value}</p>
        </div>
    )
}

import React from 'react'

export default function CalculatorTile({state}) {
    const {value,equation} = state
    return (
        <div className='tile tile-calculator justify-right'>
            <p className='equation'>{equation}</p>
            <p>{value}</p>
        </div>
    )
}

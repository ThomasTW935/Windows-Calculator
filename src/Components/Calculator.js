import React, {useState} from 'react'
import Buttons from './Buttons'
import CalculatorTile from './CalculatorTile'
import {ACTIONS, SPECIAL_BUTTONS, BUTTONS} from '../App';

export default function Calculator({category}) {
    const calculate = (value)=>{

    }


    let buttons = Object.entries(BUTTONS).filter(([key,value],index)=>{return key === category.toUpperCase()})

    const [value, setValue] = useState(0)
    return (
        <>
            <CalculatorTile value={value}/>
            <Buttons buttons={buttons[0][1]} action={calculate} name='calculator'/>  
        </>
    )
}

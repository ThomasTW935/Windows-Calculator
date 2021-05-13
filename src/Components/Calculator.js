import React, {useState} from 'react'
import Buttons from './Buttons'
import CalculatorTile from './CalculatorTile'
import {SPECIAL_BUTTONS, buttonClickReturnValue} from './Buttons'

export default function Calculator({category}) {
    const [inputValue, setInputValue] = useState(0)
    const [equation, setEquation] = useState('')

    const {C,CE,EQUALS, MULTIPLY,DEL} = SPECIAL_BUTTONS

    // const handleButtonClick = (e)=>{
    //     let target = e.target
    //     let button = target.innerHTML
    //     let newValue = buttonClickReturnValue(button, tile)
    //     setTile( newValue )
    //     let regex = /[0-9.]/
    //     if(regex.test(button) || button === DEL) return
    //     if(button === CE || button === C) return setEquation('')

    //     if(button === EQUALS){
    //         setEquation(prevEquation => {return  equation + tile })
    //         setTile(calculate(button, equation,tile))
    //         setEquation('')
    //         return 
    //     }
    //     setEquation( prevEquation => {return (prevEquation !==0) ? prevEquation + tile + button : tile + button } )
    //     let result = calculate(button,equation,tile)
    //     console.log(equation.match(/[+|X|\-|*|/]/g))
    //     setTile(result)
    // }
    const calculate = (button,prevEquation,tile)=>{
        let equation = (prevEquation.indexOf(MULTIPLY) !== -1) ? prevEquation.replaceAll(MULTIPLY, '*') + tile : prevEquation + tile
        let result = eval(equation)
        return result
    }
    
    return (
        <>
            <CalculatorTile value={inputValue} equation={equation}/>
            <Buttons currentValue={inputValue} setCurentValue={setInputValue} name='CALCULATOR'/>  
        </>
    )
}

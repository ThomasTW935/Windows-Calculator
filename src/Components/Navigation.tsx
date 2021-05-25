import React, {ChangeEvent, ChangeEventHandler, InputHTMLAttributes, useState} from 'react';
import {  CATEGORIES } from '../App';

type Props = {
    category: string,
    setCategory: (arg0:string)=>void,
    setType: (arg0:string)=>void,
}

function Navigation({category,setCategory, setType}: Props) {
    
    function handleRadioChange(e:ChangeEvent<HTMLInputElement>){
        const {target} = e
        setCategory(target.value)
        console.log(target.dataset.type)
        if(target.dataset.type) setType(target.dataset.type)
        setShowNav( prev=>{ return !prev } )
    }

    const [showNav,setShowNav] = useState(false)
    const hiddenNav = (!showNav)? 'nav__list hidden' : 'nav__list' 
    return (
        <div className='nav'>
            <div className='nav__burger' onClick={ ()=>{ setShowNav( (prev)=>{ return !prev } ) } }>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <form className={hiddenNav}>
                {
                    Object.entries(CATEGORIES).map(([key,values],index)=>{
                        return <div key={index}>
                            <span className='category'>{key.toLowerCase()}</span>
                            {values.map((value,i)=>{
                                return <label key={i}>
                                    <input 
                                        type='radio' 
                                        name='category' 
                                        value={value} 
                                        checked={(value === category)}
                                        data-type={key}
                                        onChange={ handleRadioChange } />
                                    <span>#</span>
                                    <span>{value}</span>
                                        
                                </label>
                            })}
                        </div>
                    })
                }
            </form>      
            <h3 className='nav__title'>{category}</h3>
            
        </div>
    );
}

export default Navigation;
import React from 'react';
import {  CATEGORIES } from '../App';

function Navigation({category,setCategory, setType}) {
    
    function handleRadioChange(e){
        let target = e.target
        console.log(target)
        setCategory(target.value)
        setType(target.dataset.type)
    }
    
    return (
        <div className='nav'>
            <div className='nav__burger'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <form className='nav__list'>
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
                                            onChange={ (e)=> handleRadioChange(e) } />{value}</label>
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
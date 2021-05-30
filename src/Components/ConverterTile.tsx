import React,{ ChangeEvent, Dispatch } from 'react';
import {ACTIONS, TEST_DATA as data} from '../Data';
import {tile,Action} from './Converter'
import { Select,FormControl, InputLabel, MenuItem, createStyles, makeStyles, Theme } from '@material-ui/core';

type Props = {
    key: number; 
    category: string; 
    tile: tile; 
    active: number; 
    activeValue: string | number
    dispatch: Dispatch<Action>
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectLabel:{color: 'white'},
    select: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    menu:{
        "&:hover": {
            backgroundColor: '#484848'
        }
    }
  }),
);
const MenuProps = {
    PaperProps: {
      style: {
        backgroundColor:"#1f1f1f",
        color: 'white',
        border: 'solid white',
        borderWidth: '0 1px',
        margin: 0,
      },
    },
  };

function ConverterTile({category,tile,active,activeValue,dispatch}: Props) {
  let {id,value,unit} = tile
  const classes = useStyles()


  function handleOptionChange(e:ChangeEvent<{ name?: string | undefined; value: unknown; }>){
      const target = e.target 
      dispatch({type: ACTIONS.UPDATE_UNIT, payload:{ id: id, unit: target.value as string }})
      dispatch({type: ACTIONS.UPDATE_INACTIVE_TILE_VALUE, payload:{ value:Number(activeValue) }})
  }
  function handleTileClick(id:number){
      dispatch({type: ACTIONS.UPDATE_ACTIVE_TILE, payload:{ id: id }})
  }
  return (
    <div className='tile'>
      <input 
        value={value.toLocaleString('en-US')}
        style={{fontWeight:active === id ? 'bold' : 'normal'} }  
        onClick={ () => handleTileClick(id) }
        autoFocus={ active === id }
        readOnly/>
    <FormControl>
      <InputLabel className={classes.selectLabel} id='select-label'>Unit</InputLabel>
      <Select MenuProps={ MenuProps } className={classes.select} labelId='select-label' value={unit} onChange={handleOptionChange}>
        {
          data.map((item,index)=>
            {
              if(item.category !== category) return []
                return Object.entries(item.units).map(([key,value],index)=>
                  <MenuItem className={classes.menu} key={index} value={value}>{value + `(${key})`}</MenuItem>
              )
            }
          )
        }           
      </Select>
    </FormControl>
    </div>
  );
}

export default ConverterTile;
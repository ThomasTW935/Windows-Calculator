import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBackspace, faDivide, faTimes} from '@fortawesome/free-solid-svg-icons'

export const ACTIONS = {
  ADD_NUM: 'add-num',
  DELETE_NUM: 'delete-num',
  RESET_NUM: 'reset-num',
  UPDATE_UNIT: 'update-unit',
  UPDATE_TILE_VALUES: 'update-tile-values',
  UPDATE_ACTIVE_VALUE: 'update-active-value',
  UPDATE_ACTIVE_TILE: 'update-active-tile',
  UPDATE_INACTIVE_TILE_VALUE: 'update-inactive-tile-value',
}


export const CONVERTER_DATA = [
  {
    id: 0,
    category: 'Weight',
    default: 'grams',
    units: {
      carats: 5,
      milligrams: 1000,
      centigrams: 100,
      decigrams: 10,
      grams: 1,
      dekagrams: .1,
      hecktograms: 0.01,
      kilograms: .001,
      metric_tonnes: .000001,
      ounces: 0.035274,
      pounds: 0.002205,
      stone: 0.000157,
      "short tons US": 0.000001,
      long_tons_UK: 0.000000984206528
    }
  },
  {
    id: 1,
    category: 'Length',
    default: 'meter',
    units: {
      nanometers: 1000000000,
      microns: 1000000,
      millimeters: 1000,
      centimeters: 100,
      meter: 1,
      kilometer: .001,
      inches: 39.37008,
      feet: 3.28084,
      yards: 1.093613,
      miles: 0.000621,
      "nautical miles": 0.00054
    }
  },
  {
    id: 2,
    category: 'Volume',
    default: 'liters',
    units: {
      milliliters: 1000,
      liters: 1,
    }
  }
]

export const SPECIAL_BUTTONS = {
  BLANK: {label: '', value: ''},
  CE: {label:'CE', value: 'clear-entry'},
  C: {label:'C', value: 'clear'},
  DEL: {label:<FontAwesomeIcon icon={faBackspace}/>, value: 'del'},
  DIVIDE: {label:<FontAwesomeIcon icon={faDivide}/>, value: '/'},
  MULTIPLY: {label:<FontAwesomeIcon icon={faTimes}/>, value: '*'},
  SUBTRACT: {label:'-', value: '-'},
  ADD: {label:'+', value: '+'},
  EQUALS: {label:'=', value: 'equals'},
  PERIOD: {label:'.', value: '.'},
}
export const NORMAL_BUTTONS = {
  zero: {label: '0', value: '0'},
  one:  {label: '1', value: '1'},
  two:  {label: '2', value: '2'},
  three:{label: '3', value: '3'},
  four: {label: '4', value: '4'},
  five: {label: '5', value: '5'},
  six:  {label: '6', value: '6'},
  seven:{label: '7', value: '7'},
  eight:{label: '8', value: '8'},
  nine: {label: '9', value: '9'},
}
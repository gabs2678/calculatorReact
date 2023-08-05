import React from 'react'
import {ACTIONS} from './App';

function DigitButton({id,dispatch, digit}) {
  return (
    <button id={id} onClick={()=> dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>{digit}</button>
  )
}

export default DigitButton

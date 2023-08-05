import React from 'react'
import {ACTIONS} from './App';

function OperationButon({id,dispatch, operation}) {
  return (
    <button id={id} onClick={()=> dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>{operation}</button>
  )
}

export default OperationButon

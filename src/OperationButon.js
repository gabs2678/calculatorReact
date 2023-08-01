import React from 'react'
import {ACTIONS} from './App';

function OperationButon({dispatch, operation}) {
  return (
    <button onClick={()=> dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>{operation}</button>
  )
}

export default OperationButon

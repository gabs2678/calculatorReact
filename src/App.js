import { useReducer } from 'react';
import DigitButton from './DigitButton';
import './style.css';
import OperationButon from './OperationButon';

export const ACTIONS = 
{
  ADD_DIGIT : 'add-digit',
  CHOOSE_OPERATION: 'choose-op',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}
function evaluate(state)
{

  switch(state.operation)
  {
    case "/":
      return ((parseFloat(state.previous)/parseFloat(state.current)).toFixed(10)).toString()
    case "*":
      return (parseFloat(state.previous)*parseFloat(state.current)).toFixed(10).toString()
    case "-":
      return (parseFloat(state.previous)-parseFloat(state.current)).toFixed(10).toString()
    case "+":
      return (parseFloat(state.previous)+parseFloat(state.current)).toFixed(10).toString()
  }
  // if(state.operation=="/")
  // {
  //   return (parseInt(state.previous)/parseInt(state.current)).toString()
  // }
  // else if(state.operation=="*")
  // {
  //   return (parseInt(state.previous)*parseInt(state.current)).toString()
  // }
  // else if(state.operation=="-")
  // {
  //   return (parseInt(state.previous)-parseInt(state.current)).toString()
  // }
  // else
  // {
  //   return (parseInt(state.previous)+parseInt(state.current)).toString()
  // }
}
function reducer(state,{type, payload})
{
  switch(type)
  {
    case ACTIONS.ADD_DIGIT:
      //const current = state.current || '';
      if(payload.digit === "0" && state.current ==="0") return state;
      if(payload.digit ==="." && state.current == null) return{
        ...state,
        current: "0.",
      }
      // //18.36
      // //state.current= "0.";
      if(payload.digit === "." && state.current.includes(".")) return state;
      return {
        ...state,
        current: `${state.current || "" }${payload.digit}`,
      }
      // case ACTIONS.CHOOSE_OPERATION:
      //   return {
      //     ...state,
      //   }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.current == null && state.previous == null) return state;

      if(state.previous == null){ return{
        ...state,
        previous: state.current,
        operation: payload.operation,
        current: null
        }
      }
      if(state.current == null) return{
        ...state,
        operation: payload.operation
      };

      return{
        ...state,
        previous: evaluate(state),
        current: null,
        operation: payload.operation
      }


    case ACTIONS.EVALUATE:
      if(state.current == null || state.operation== null|| state.previous==null) return state;
      return{
        ...state,
        current: evaluate(state),
        previous:null,
        operation:null,
      }


    case ACTIONS.DELETE_DIGIT:
      if(state.current== null) return state;
      return{
        ...state,
        current: state.current.length === 1 ? null : state.current.slice(0,-1)
      }
    case ACTIONS.CLEAR:
      return{}
  }
}

function App() {
  const [{current, previous,operation}, dispatch] = useReducer(reducer, {});

  //dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: 1}});

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'> {previous} {operation}</div>
        
        <div className='current-operand'>{current}</div>
      </div>
      <button className='span-two' onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButon operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButon operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButon operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButon operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>

      <button className='span-two' onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
      {/* <ResultButton result="=" dispatch={dispatch}></ResultButton> */}
    </div>
  );
}

export default App;

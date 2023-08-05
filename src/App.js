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
      return ((parseFloat(state.previous)/parseFloat(state.current))).toString()
    case "*":
      return (parseFloat(state.previous)*parseFloat(state.current)).toString()
    case "-":
      return (parseFloat(state.previous)-parseFloat(state.current)).toString()
    case "+":
      return (parseFloat(state.previous)+parseFloat(state.current)).toString()
    default:
      return;
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
      //"5 * - + 5" =10
      if(state.current==null && state.operation!= null && payload.operation === "-")
      {
        return{
          ...state,
          current:"-"
        }
      }
      // if(state.current=="-")
      // {
      //   return{
      //     ...state,
      //     current:null
      //   }
      // }
      if(state.current == null || state.current=== "-") {return{
        ...state,
        operation: payload.operation,
        current:null
      }}

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
      return{current:0}
    default:
      return;
  }
}

function App() {
  const [{current, previous,operation}, dispatch] = useReducer(reducer, {});

  //dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: 1}});

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'> {previous} {operation}</div>
        
        <div id="display" className='current-operand'>{current}</div>
      </div>
      <button id="clear" className='span-two' onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButon id="divide" operation="/" dispatch={dispatch} />
      <DigitButton id="one" digit="1" dispatch={dispatch}/>
      <DigitButton id="two" digit="2" dispatch={dispatch}/>
      <DigitButton id="three" digit="3" dispatch={dispatch}/>
      <OperationButon id="multiply" operation="*" dispatch={dispatch} />
      <DigitButton id="four" digit="4" dispatch={dispatch}/>
      <DigitButton id="five" digit="5" dispatch={dispatch}/>
      <DigitButton id="six" digit="6" dispatch={dispatch}/>
      <OperationButon id="add" operation="+" dispatch={dispatch} />
      <DigitButton id="seven" digit="7" dispatch={dispatch}/>
      <DigitButton id="eight" digit="8" dispatch={dispatch}/>
      <DigitButton id="nine" digit="9" dispatch={dispatch}/>
      <OperationButon id="subtract" operation="-" dispatch={dispatch} />
      <DigitButton id="decimal" digit="." dispatch={dispatch}/>
      <DigitButton id="zero" digit="0" dispatch={dispatch}></DigitButton>

      <button id="equals" className='span-two' onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
      {/* <ResultButton result="=" dispatch={dispatch}></ResultButton> */}
    </div>
  );
}

export default App;

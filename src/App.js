import React,{useReducer}from 'react';
import './App.css';
import OperationButton from './OperationButton';
import DigitButton from './DigitButton';
export const ACTIONS={
  ADD_DIGIT:"ADDDIGIT",
  CHOOSE_OPERATION:"CHOOSEOPERATION",
  DELETE_DIGIT:"DELETEDIGIT",
  EVALUATE:"EVALUATE",
  CLEAR:"CLEAR"
}
 function reducer(state,{type,payload}){
  switch (type){
    case ACTIONS.ADD_DIGIT:
      if(state.currentOperand==="0"&&payload.digit==="0") return state
      if(state.currentOperand==="."&&payload.digit===".") return state
      
      return{
        ...state,
        currentOperand:`${state.currentOperand||""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand==null && state.previousOperand==null) return state
      if(state.currentOperand==null){
        return{
          ...state,
          Operation:payload.operation
        }
      }
      
      if(state.previousOperand==null){
        return{
          ...state,
          previousOperand:state.currentOperand,
          Operation:payload.operation,
          currentOperand:null
        }
      }
      return{
        ...state,
        previousOperand:evaluate(state),
        Operation:payload.operation,
        currentOperand:null,
      }
      
      case ACTIONS.CLEAR:
        return ""
      case ACTIONS.DELETE_DIGIT:
       if(state.currentOperand==null) return state
       if(state.currentOperand.length === 1){
        return{
          ...state,
          currentOperand:null
        }
       } 
       return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
       }
      case ACTIONS.EVALUATE:
        if(state.currentOperand==null && state.previousOperand==null && state.Operation==null) return state
        return{
          ...state,
          currentOperand: evaluate(state),
          previousOperand:null,
          Operation:null
        }
        default : return state
    }
  }

function evaluate({currentOperand,previousOperand,Operation}){
  const prev = parseFloat(previousOperand);
  const curnt = parseFloat(currentOperand);
  if(isNaN(prev)||isNaN(curnt)) return"";
  let result="";
  switch(Operation){
  case "+":
    result = prev + curnt
    break
  case "-":
    result = prev - curnt
    break
  case "*":
    result = prev * curnt
    break
  case "/":
    result = prev / curnt
    break
     default:
}
return result.toString();
}
function App() {
const [{currentOperand, previousOperand,Operation},dispatch]=useReducer(reducer,{})
  return (
    <div className="container-grid">
      <div className="output">
        <div className="previousoperator">{previousOperand}{Operation}</div>
        <div className="currentoperator">{currentOperand}</div></div>
        <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
        <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
        <OperationButton operation="/" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperationButton operation="*" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
      </div>
    
  )
}

export default App;

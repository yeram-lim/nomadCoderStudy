import logo from './logo.svg';
import './App.css';
import { useState } from 'react'

const useInput = (initalValue, validator) => {
  const [value, setValue] = useState(initalValue);
  const onChange = (event) => {
    const {
      target: {value}
    } = event;
    let willUpdate = true;
    if(typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  }
  return {value, onChange}
}

function App() {
  const maxLen = (value) => value.includes("@");
  const name = useInput("Mr.", maxLen);
  return (
    <div className="App">
      <h1>hello</h1>
      <input placeholder='Name' {...name}></input>
    </div>
  );
}

export default App;

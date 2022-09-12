import './App.css';
import { useState } from 'react'

export const useInput = (initalValue, validator) => {
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
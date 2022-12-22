import { useState } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState(0);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [tempInput, setTempInput] = useState(null);
  const [tempOperator, setTempOperator] = useState(null);
  const [isClickedOperator, setClickedOperator] = useState(false);
  const [isClickedEqual, setClickedEqual] = useState(false);

  const hasInput = !!input;

  const onPressNum = (num) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setClickedOperator(false);
    } else {
      const newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator === "=") {
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input;
      const finalOperator = isClickedEqual ? tempOperator : currentOperator;
      switch (currentOperator) {
        case "+":
          finalResult = result + finalInput;
          break;
        case "-":
          finalResult = result - finalInput;
          break;
        case "*":
          finalResult = result * finalInput;
          break;
        case "/":
          finalResult = result / finalInput;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperator(null);
      setTempOperator(finalOperator);
      setClickedEqual(true);
    } else {
      setCurrentOperator(operator);
      setClickedOperator(true);
      setClickedEqual(false);
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      // C
      setInput(0);
    } else {
      // AC
      setInput(0);
      setCurrentOperator(null);
      setResult(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };

  return {
    input,
    hasInput,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    onPressNum,
    onPressOperator,
    onPressReset,
  }
};
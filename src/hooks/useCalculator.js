import { useState } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState(0);
  const [expression, setExpression] = useState([]);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [tempInput, setTempInput] = useState(null);
  const [tempOperator, setTempOperator] = useState(null);
  const [isClickedOperator, setClickedOperator] = useState(false);
  const [isClickedOperatorMoreThanOnce, setClickedOperatorMoreThanOnce] = useState(false);
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
      if (result) {
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
        setExpression([...expression, `${input}`])
        setTempOperator(finalOperator);
        setClickedEqual(true);
      }
    } else {
      if (currentOperator && isClickedOperatorMoreThanOnce) {
        let finalResult = result;
        switch (currentOperator) {
          case "+":
            finalResult = result + input;
            break;
          case "-":
            finalResult = result - input;
            break;
          case "*":
            finalResult = result * input;
            break;
          case "/":
            finalResult = result / input;
            break;
          default:
            break;
        }
        setResult(finalResult);
        setInput(finalResult);
      }
      setCurrentOperator(operator);
      setExpression([...expression, `${input} ${operator} `]);
      setClickedOperator(true);
      setClickedOperatorMoreThanOnce(true);
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
      setExpression([]);
    }
  };

  return {
    input,
    expression,
    hasInput,
    currentOperator,
    onPressNum,
    onPressOperator,
    onPressReset,
  }
};
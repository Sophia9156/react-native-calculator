import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native"

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
};

// Button type: 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type, isSelected }) => {
  const backgroundColor = 
    type === 'reset' 
      ? COLOR.RESET 
      : type === 'operator' 
        ? COLOR.OPERATOR 
        : type === 'num' 
          ? COLOR.NUM : 'transparent';

  return (
    <TouchableOpacity
      style={{
        flex,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: "black",
      }} 
      onPress={onPress}
    >
      <Text style={{ color: "white", fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  )
};

const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
  padding: 10px 5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export default function Calculator() {
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

  return (
    <View style={{ flex: 1, width: 250, justifyContent: "center" }}>
      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: "white", fontSize: 35 }}>{input}</Text>
      </InputContainer>
      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button 
          type="reset"
          text={hasInput ? "C" : "AC"}
          onPress={onPressReset}
          flex={3}
        />
        <Button 
          type="operator"
          text="/"
          onPress={() => onPressOperator("/")}
          flex={1}
          isSelected={currentOperator === "/"}
        />
      </ButtonContainer>
      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7, 8, 9].map((num) => (
          <Button 
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button 
          type="operator"
          text="*"
          onPress={() => onPressOperator("*")}
          flex={1}
          isSelected={currentOperator === "*"}
        />
      </ButtonContainer>
      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4, 5, 6].map((num) => (
          <Button 
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button 
          type="operator"
          text="-"
          onPress={() => onPressOperator("-")}
          flex={1}
          isSelected={currentOperator === "-"}
        />
      </ButtonContainer>
      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1, 2, 3].map((num) => (
          <Button 
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button 
          type="operator"
          text="+"
          onPress={() => onPressOperator("+")}
          flex={1}
          isSelected={currentOperator === "+"}
        />
      </ButtonContainer>
      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button 
          type="num"
          text="0"
          onPress={() => onPressNum(0)}
          flex={2}
        />
        <Button 
          type="num"
          text="."
          onPress={() => null}
          flex={1}
        />
        <Button 
          type="operator"
          text="="
          onPress={() => onPressOperator("=")}
          flex={1}
          isSelected={currentOperator === "="}
        />
      </ButtonContainer>
    </View>
  )
};

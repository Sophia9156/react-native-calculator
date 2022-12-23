import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { useCalculator } from "../hooks/useCalculator";

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#c79f7d',
  OPERATOR: '#d49688',
  NUM: '#F2DCDC',
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
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: "black",
      }} 
      onPress={onPress}
    >
      <Text style={{ color: "#4e4c51", fontSize: 25 }}>{text}</Text>
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
  const {
    input,
    hasInput,
    currentOperator,
    onPressNum,
    onPressOperator,
    onPressReset,
  } = useCalculator();

  return (
    <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
      {/* 결과 */}
      <InputContainer style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 35 }}>{input}</Text>
      </InputContainer>
      <View style={{ flex: 2 }}>
        {/* [AC ~ /] */}
        <ButtonContainer style={{ flex: 1 }}>
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
        <ButtonContainer style={{ flex: 1 }}>
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
        <ButtonContainer style={{ flex: 1 }}>
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
        <ButtonContainer style={{ flex: 1 }}>
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
        <ButtonContainer style={{ flex: 1 }}>
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
    </View>
  )
};

import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Display = styled.div`
  width: 100%;
  padding: 10px;
  background: #eee;
  text-align: right;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px;
`;

const Calculator = () => {
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setExpression(eval(expression).toString());
      } catch {
        setExpression('Error');
      }
    } else if (value === 'C') {
      setExpression('');
    } else {
      setExpression(expression + value);
    }
  };

  return (
    <CalculatorContainer>
      <Display>{expression}</Display>
      <div>
        <Button onClick={() => handleButtonClick('1')}>1</Button>
        <Button onClick={() => handleButtonClick('2')}>2</Button>
        <Button onClick={() => handleButtonClick('3')}>3</Button>
        <Button onClick={() => handleButtonClick('+')}>+</Button>
      </div>
      <div>
        <Button onClick={() => handleButtonClick('4')}>4</Button>
        <Button onClick={() => handleButtonClick('5')}>5</Button>
        <Button onClick={() => handleButtonClick('6')}>6</Button>
        <Button onClick={() => handleButtonClick('-')}>-</Button>
      </div>
      <div>
        <Button onClick={() => handleButtonClick('7')}>7</Button>
        <Button onClick={() => handleButtonClick('8')}>8</Button>
        <Button onClick={() => handleButtonClick('9')}>9</Button>
        <Button onClick={() => handleButtonClick('*')}>*</Button>
      </div>
      <div>
        <Button onClick={() => handleButtonClick('0')}>0</Button>
        <Button onClick={() => handleButtonClick('C')}>C</Button>
        <Button onClick={() => handleButtonClick('=')}>=</Button>
        <Button onClick={() => handleButtonClick('/')}>/</Button>
      </div>
    </CalculatorContainer>
  );
};

export default Calculator;

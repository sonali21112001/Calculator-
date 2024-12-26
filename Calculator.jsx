import React, { useState } from 'react';
import './style.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [isNewInput, setIsNewInput] = useState(false); // To manage new input after operator or calculation

  const handleNumberClick = (value) => {
    if (isNewInput) {
      setDisplayValue(value);
      setIsNewInput(false);
    } else {
      setDisplayValue(displayValue === '0' ? value : displayValue + value);
    }
  };

  const handleOperatorClick = (value) => {
    if (operator && !isNewInput) {
      calculate();
    }
    setOperator(value);
    setPreviousValue(displayValue);
    setIsNewInput(true);
  };

  const calculate = () => {
    if (!operator || previousValue === null) return;

    const current = parseFloat(displayValue);
    const previous = parseFloat(previousValue);

    let result;
    switch (operator) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = current !== 0 ? previous / current : 'Error';
        break;
      default:
        return;
    }

    setDisplayValue(result.toString());
    setOperator(null);
    setPreviousValue(null);
    setIsNewInput(true);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setPreviousValue(null);
    setIsNewInput(false);
  };

  const handleDelete = () => {
    setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : '0');
  };

  const handleDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  return (
    <div className="calculator">
      <input type="text" className="display" value={displayValue} readOnly />
      <div className="buttons">
        <button className="button function" onClick={handleClear}>
          AC
        </button>
        <button className="button function" onClick={handleDelete}>
          DEL
        </button>
        <button className="button function" onClick={() => handleOperatorClick('%')}>
          %
        </button>
        <button className="button operator" onClick={() => handleOperatorClick('/')}>
          /
        </button>

        <button className="button number" onClick={() => handleNumberClick('7')}>
          7
        </button>
        <button className="button number" onClick={() => handleNumberClick('8')}>
          8
        </button>
        <button className="button number" onClick={() => handleNumberClick('9')}>
          9
        </button>
        <button className="button operator" onClick={() => handleOperatorClick('*')}>
          *
        </button>

        <button className="button number" onClick={() => handleNumberClick('4')}>
          4
        </button>
        <button className="button number" onClick={() => handleNumberClick('5')}>
          5
        </button>
        <button className="button number" onClick={() => handleNumberClick('6')}>
          6
        </button>
        <button className="button operator" onClick={() => handleOperatorClick('-')}>
          -
        </button>

        <button className="button number" onClick={() => handleNumberClick('1')}>
          1
        </button>
        <button className="button number" onClick={() => handleNumberClick('2')}>
          2
        </button>
        <button className="button number" onClick={() => handleNumberClick('3')}>
          3
        </button>
        <button className="button operator" onClick={() => handleOperatorClick('+')}>
          +
        </button>

        <button className="button number zero" onClick={() => handleNumberClick('0')}>
          0
        </button>
        <button className="button number" onClick={handleDecimal}>
          .
        </button>
        <button className="button operator" onClick={calculate}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;

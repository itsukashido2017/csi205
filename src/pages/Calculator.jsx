import { useState } from "react";
import "./Calculator.css";

const MAX_DIGITS = 12;

const computeTotal = (currentTotal, operator, operand) => {
  switch (operator) {
    case "+":
      return currentTotal + operand;
    case "-":
      return currentTotal - operand;
    case "*":
      return currentTotal * operand;
    case "/":
      if (operand === 0) {
        return null;
      }
      return currentTotal / operand;
    default:
      return operand;
  }
};

function Calculator() {
  const [screen, setScreen] = useState("0");
  const [calcState, setCalcState] = useState("S1");
  const [lastOperator, setLastOperator] = useState("");
  const [total, setTotal] = useState(0);
  const [lastOperand, setLastOperand] = useState(null);

  const handleError = () => {
    setScreen("Error");
    setCalcState("S1");
    setLastOperator("");
    setTotal(0);
    setLastOperand(null);
  };

  const handleNumberClick = (num) => {
    if (screen === "Error") {
      setScreen(num.toString());
      setCalcState("S2");
      return;
    }

    if (calcState === "S1" || calcState === "S3") {
      setScreen(num.toString());
      setCalcState("S2");
    } else if (calcState === "S2" && screen.length < MAX_DIGITS) {
      setScreen((prev) => (prev === "0" ? num.toString() : prev + num.toString()));
    }
  };

  const handleOperatorClick = (operator) => {
    if (screen === "Error") {
      return;
    }

    const currentValue = parseFloat(screen);

    if (lastOperator === "" && calcState !== "S1") {
      setTotal(currentValue);
    } else if (calcState !== "S1") {
      const newTotal = computeTotal(total, lastOperator, currentValue);
      if (newTotal === null) {
        handleError();
        return;
      }
      setTotal(newTotal);
    }

    setLastOperator(operator);
    setCalcState("S3");
  };

  const handleEqualClick = () => {
    if (screen === "Error") {
      return;
    }

    let operand;
    const currentValue = parseFloat(screen);

    if (calcState === "S2") {
      operand = currentValue;
      setLastOperand(currentValue);
    } else if (calcState === "S1" || calcState === "S3") {
      if (lastOperand !== null) {
        operand = lastOperand;
      } else {
        operand = total;
        setLastOperand(total);
      }
    } else {
      operand = currentValue;
    }

    if (Number.isNaN(operand)) {
      operand = 0;
    }

    const result = computeTotal(total, lastOperator, operand);
    if (result === null) {
      handleError();
      return;
    }

    setTotal(result);
    setScreen(result.toString());
    setCalcState("S1");
  };

  const handleClear = () => {
    setScreen("0");
    setCalcState("S1");
    setLastOperator("");
    setTotal(0);
    setLastOperand(null);
  };

  const operatorClass = (operator) =>
    lastOperator === operator ? "w03-btn-yellow" : "w03-btn-green";

  return (
    <div className="calculator-container">
      <div className="w03-cal" aria-live="polite">
        <div className="w03-lcd" data-testid="calculator-screen">
          {screen}
        </div>

        <button type="button" className="w03-btn w03-btn-green" disabled>
          MC
        </button>
        <button type="button" className="w03-btn w03-btn-green" disabled>
          MR
        </button>
        <button type="button" className="w03-btn w03-btn-green" disabled>
          M+
        </button>
        <button type="button" className="w03-btn w03-btn-green" disabled>
          M-
        </button>
        <button
          type="button"
          className="w03-btn w03-btn-red w03-btn-active-red"
          onClick={handleClear}
        >
          CE
        </button>

        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(7)}
        >
          7
        </button>
        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(8)}
        >
          8
        </button>
        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(9)}
        >
          9
        </button>
        <button
          type="button"
          id="divide"
          className={`w03-btn w03-btn-operator ${operatorClass("/")}`}
          onClick={() => handleOperatorClick("/")}
        >
          &divide;
        </button>
        <button type="button" className="w03-btn w03-btn-green" disabled>
          &radic;
        </button>

        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(4)}
        >
          4
        </button>
        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(5)}
        >
          5
        </button>
        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(6)}
        >
          6
        </button>
        <button
          type="button"
          id="multiply"
          className={`w03-btn w03-btn-operator ${operatorClass("*")}`}
          onClick={() => handleOperatorClick("*")}
        >
          &times;
        </button>
        <button type="button" className="w03-btn w03-btn-green" disabled>
          %
        </button>

        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(1)}
        >
          1
        </button>
        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(2)}
        >
          2
        </button>
        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(3)}
        >
          3
        </button>
        <button
          type="button"
          id="minus"
          className={`w03-btn w03-btn-operator ${operatorClass("-")}`}
          onClick={() => handleOperatorClick("-")}
        >
          &minus;
        </button>
        <button type="button" className="w03-btn w03-btn-green" disabled>
          1/x
        </button>

        <button
          type="button"
          className="w03-btn w03-btn-blue"
          onClick={() => handleNumberClick(0)}
        >
          0
        </button>
        <button type="button" className="w03-btn w03-btn-blue" disabled>
          .
        </button>
        <button type="button" className="w03-btn w03-btn-blue" disabled>
          <sup>+</sup>/<sub>&minus;</sub>
        </button>
        <button
          type="button"
          id="plus"
          className={`w03-btn w03-btn-operator ${operatorClass("+")}`}
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>
        <button
          type="button"
          className="w03-btn w03-btn-green w03-btn-eq"
          onClick={handleEqualClick}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;

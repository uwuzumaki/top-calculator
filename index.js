let displayValue = "";
let storedValue = "";
let storedOperator = "";

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (operation, num1, num2) => {
  if (operation === "add") {
    return add(num1, num2);
  } else if (operation === "subtract") {
    return subtract(num1, num2);
  } else if (operation === "multiply") {
    return multiply(num1, num2);
  } else if (operation === "divide") {
    return divide(num1, num2);
  }
};

const buttons = document.querySelectorAll(".button");
let buttonsArray = Array.from(buttons);
buttons.forEach((button) => {
  const display = document.querySelector(".display");
  button.addEventListener("click", (e) => {
    const buttonPressed = e.target.id;
    if (button.classList.contains("clear-button")) {
      displayValue = "";
      storedValue = "";
      storedOperator = "";
      display.innerHTML = "0";
    } else if (button.classList.contains("del-button")) {
      displayValue = displayValue.slice(0, -1);
      if (displayValue.charAt(displayValue.length - 1) === ".") {
        displayValue = displayValue.slice(0, -1);
        display.innerHTML = displayValue;
      }
      if (displayValue === "") {
        display.innerHTML = "0";
      } else {
        display.innerHTML = displayValue;
      }
    } else if (button.classList.contains("number")) {
      if (displayValue.length < 12) {
        if (buttonPressed === "decimal") {
          if (!displayValue.includes(".")) {
            displayValue += ".";
            display.innerHTML = displayValue;
          }
        } else {
          displayValue += buttonPressed;
          display.innerHTML = displayValue;
        }
      }
    } else {
      if (storedValue === "" || storedOperator === "") {
        if (buttonPressed !== "enter") {
          storedOperator = buttonPressed;
          storedValue = parseFloat(displayValue);
          displayValue = "";
        }
      } else {
        if (buttonPressed === "enter") {
          if (displayValue !== "") {
            console.log(displayValue, storedValue, storedOperator);
            const result = operate(
              storedOperator,
              storedValue,
              parseFloat(displayValue)
            );
            storedValue = result;
            displayValue = "";
            display.innerHTML = result;
          }
        } else {
          console.log(displayValue, storedValue, storedOperator);
          if (displayValue === "") {
            storedOperator = buttonPressed;
          } else {
            const initialResult = operate(
              storedOperator,
              storedValue,
              parseFloat(displayValue)
            );
            display.innerHTML = initialResult;
            displayValue = "";
            storedValue = initialResult;
            storedOperator = buttonPressed;
          }
        }
      }
    }
  });
});

import { hellos } from "./displayHello"
import { equationDisplay, config, resultDisplay, calculatorDisplay } from "./main"

const MAX_CHARACTERS = 10
let canAddDecimal = true
let current_number = ""

export const inputCharacter = (value: string) => {

  let tempDisplay = resultDisplay!.innerHTML;

  if (!config.isOn) return;

  if (hellos.includes(tempDisplay) || value == "AC" || value == "Delete") {
    tempDisplay = "0";
    equationDisplay!.innerHTML = ""
  }

  if (value == "C" || value == "Backspace") {
    tempDisplay = tempDisplay.slice(0, resultDisplay!.innerHTML.length - 1)
    if (tempDisplay.length == 0) {
      tempDisplay = "0"
    }
  }
  
  const operators = ["-", "+", "x", "/", ".", "*"]
  
  if (Number.parseInt(value) ||
      operators.includes(value) ||
      (value == "0" && resultDisplay!.innerHTML != "")) {
        
    if (tempDisplay.startsWith("0") && tempDisplay.length == 1 && !operators.includes(value)) {
      tempDisplay = ""
    }
    console.log(Number.parseInt(value))

    if (!tempDisplay.includes(".") || value != ".") {
      tempDisplay += value
      tempDisplay = tempDisplay.replace("x", "*")
    }
  }

  if (value == "=" || value == "Enter") {
    equationDisplay!.innerHTML = tempDisplay
    const x = tempDisplay
    try {
      console.log(x)
      const res = eval(x)

      if (res == Infinity || isNaN(res)) {
        throw Error
      }
      console.log(res);
      tempDisplay = res.toString()
      if (tempDisplay.split(".").length == 2) {
        console.log(tempDisplay.split("."))

        const fracDigits = tempDisplay.split(".")[1].length
        console.log(tempDisplay)
        
        tempDisplay = Number.parseFloat(tempDisplay).toFixed(fracDigits-1)
        console.log(tempDisplay)
      }
    } catch (e) {
      console.log(e)
      resultDisplay!.innerHTML = "Math Error"
      return;
    }
  }

  let final_display = tempDisplay

  if (final_display.length > MAX_CHARACTERS) {
    final_display = final_display.slice(0, MAX_CHARACTERS)
    console.log(`current display (max ${MAX_CHARACTERS} characters), `, final_display)
  }
  if (final_display.charAt(MAX_CHARACTERS) == ".") {
    final_display = final_display.slice(0, MAX_CHARACTERS -1)
    console.log("current display (with '.'), ", final_display)
  }
  console.log(final_display)
  console.log(tempDisplay)

  if (final_display.includes(".")) {
    canAddDecimal = false
  }
  if (operators.includes("value")) {
    canAddDecimal = true
    current_number = ""
  }

  resultDisplay!.innerHTML = final_display
}

export const onCalculator = () => {
  if (!config.isOn && !config.isTransitioning) {
    config.isOn = true
    calculatorDisplay!.style.backgroundColor = "rgb(100,100,100)"
    resultDisplay!.innerHTML += "0"
  }
}

export const offCalculator = () => {
  if (config.isOn) {
    config.isOn = false
    config.isTransitioning = true
    resultDisplay!.innerHTML = "Bye!"
    setTimeout(() => {
      resultDisplay!.innerHTML = ""
      equationDisplay!.innerHTML = ""
      calculatorDisplay!.style.backgroundColor = "rgb(67,67,67)"
      config.isTransitioning = false
    }, 2000);
  }
}
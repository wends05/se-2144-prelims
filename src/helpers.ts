import { hellos } from "./displayHello"
import { equationDisplay, config, resultDisplay, calculatorDisplay } from "./main"

const MAX_CHARACTERS = 12
let canAddDecimal = true
let current_number = ""


export const inputCharacter = (value: string) => {

  if (!config.isOn) return;

  let tempDisplay = resultDisplay!.innerHTML;
  const operators = ["-", "+", "x", "/", "*"]

  if (hellos.includes(tempDisplay) || value == "AC" || value == "Delete") {
    tempDisplay = "0";
    equationDisplay!.innerHTML = ""
    current_number = ""
    canAddDecimal = true
  }

  if (value == "C" || value == "Backspace") {

    if (tempDisplay.endsWith(".")) canAddDecimal = true;

    // check if to be backspaced is an operator
    if (operators.some(op => tempDisplay.endsWith(op))) {
      // split per operator to string[]
      const splitNumbers = tempDisplay.split(/[+\-*/]/)
      // false canAddDecimal if previous number has a decimal
      // last index of string [] is empty string
      if (splitNumbers[splitNumbers.length - 2].includes(".")) {
        console.log("last number on the display includes a .")
        canAddDecimal = false
      }
    }

    if (tempDisplay == "0" || !tempDisplay.includes(".")) {
      canAddDecimal = true
    }

    tempDisplay = tempDisplay.slice(0, resultDisplay!.innerHTML.length - 1)
    if (tempDisplay.length == 0) {
      tempDisplay = "0"
    }
  }
  
  
  if (Number.parseInt(value) ||
      value == "." ||
      operators.includes(value) ||
      (value == "0" && resultDisplay!.innerHTML != "")) {
    
    if (resultDisplay!.innerHTML.length > MAX_CHARACTERS) return;
        
    if (tempDisplay.startsWith("0") && tempDisplay.length == 1 && !operators.includes(value)) {
      tempDisplay = ""
    }

    
    if (canAddDecimal || value != ".") {
      tempDisplay += value
      tempDisplay = tempDisplay.replace("x", "*")
    }
  }

  if (["=", "Enter"].includes(value)) {
    equationDisplay!.innerHTML = tempDisplay
    const x = tempDisplay
    try {
      const res = eval(x)

      if (res == Infinity || isNaN(res)) {
        throw Error
      }
      tempDisplay = res.toString()
      // has a decimal result
      
    } catch (e) {
      console.log(e)
      resultDisplay!.innerHTML = "Math Error"
      return;
    }
  }

  let final_display = tempDisplay

  if (operators.includes(value)) {
    canAddDecimal = true
    current_number = ""
  }
  if (Number.parseInt(value)) {
    current_number += value
  }
  if (value == "." && canAddDecimal) {
    canAddDecimal = false
  }
  
  console.log(current_number)
  console.log(canAddDecimal)

  // removes "." if its the last character
  if (final_display.charAt(MAX_CHARACTERS) == ".") {
    final_display = final_display.slice(0, MAX_CHARACTERS -1)
    console.log("current display (with '.'), ", final_display)
  }

  // set max characters
  if (final_display.length > MAX_CHARACTERS) {
    final_display = final_display.slice(0, MAX_CHARACTERS)
    console.log(`current display (max ${MAX_CHARACTERS} characters), `, final_display)
  }
  // round off result so that number with decimal is still up to Max Characters
  if (final_display.split(".").length == 2 && ["=", "Enter"].includes(value)) {
    const fracDigits = final_display.split(".")[1].length
    final_display = Number.parseFloat(tempDisplay).toFixed(fracDigits)
  }
  console.log(final_display)
  console.log(tempDisplay)

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
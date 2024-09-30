import { hellos } from "./displayHello"
import { equationDisplay, config, resultDisplay, calculatorDisplay } from "./main"


const MAX_CHARACTERS = 10

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

  if (Number.parseInt(value) ||
      ["-", "+", "x", "/", ".", "*"].includes(value) ||
      (value == "0" && resultDisplay!.innerHTML != "")) {
    
    
    if (tempDisplay.startsWith("0")) {
      tempDisplay = ""
    }
    console.log(Number.parseInt(value))

    if (!tempDisplay.includes(".") || value != ".") {
      tempDisplay += value
    }
  }

  if (value == "=" || value == "Enter") {
    tempDisplay = tempDisplay.replace("x", "*")
    equationDisplay!.innerHTML = tempDisplay
    const x = resultDisplay!.innerHTML
    try {
      console.log(x)
      const res = eval(x)
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

  resultDisplay!.innerHTML = final_display

  // implement check only for 8 characters
  // splice up to 8 characters
  // 2 decimal places
  // up to 6 digits
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
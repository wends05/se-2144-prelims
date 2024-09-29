import { hellos } from "./displayHello"
import { equationDisplay, resultDisplay } from "./main"


export const inputCharacter = (value: string) => {
  
  if (hellos.includes(resultDisplay!.innerHTML) || value == "AC" || value == "Delete") {
    resultDisplay!.innerHTML = ""
  }

  if (value == "C" || value == "Backspace") {
    resultDisplay!.innerHTML = resultDisplay!.innerHTML.slice(0, resultDisplay!.innerHTML.length - 1)
  }
  if (value == "=" || value == "Enter") {
    resultDisplay!.innerHTML = resultDisplay!.innerHTML.replace("x", "*")
    equationDisplay!.innerHTML = resultDisplay!.innerHTML
    const x = resultDisplay!.innerHTML
    const res = eval(x)
    resultDisplay!.innerHTML = res
  }
  if (Number.parseInt(value) ||
      ["-", "+", "x", "/", ".", "*"].includes(value) ||
      (value == "0" && resultDisplay!.innerHTML != "")) {
    console.log(Number.parseInt(value))
    resultDisplay!.innerHTML += value  
  }

}

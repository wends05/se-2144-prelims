import displayHello from './displayHello'
import { inputCharacter } from './helpers'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div>
    <div class="calculator-container">
      <div class="calculator-display">
        <div id="equation">
          equation
        </div>
        <div id="result" class="result"></div>    
      </div>
      <div class="special-buttons">
        <button id="hello">hello</button>
        <button id="bye">bye</button>
      </div>
      <div class="buttons">
        <button class="two-space">AC</button>
        <button>C</button>
        <button>/</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>x</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>
        <button>0</button>
        <button>.</button>
        <button class="two-space">=</button>
      </div>
    </div>
  </div>
`


document.querySelector<HTMLButtonElement>("#hello")

document.addEventListener("keydown", e => {
  console.log(e.key)
  inputCharacter(e.key)
})

const allButtons = document.querySelectorAll("button")
allButtons.forEach(button => {
  button.addEventListener("click", () => {


    console.log(button.innerHTML)
    inputCharacter(button.innerHTML)
  })
})

export const resultDisplay = document.querySelector<HTMLDivElement>("#result")
export const equationDisplay = document.querySelector<HTMLDivElement>("#equation")
const helloButton = document.querySelector<HTMLButtonElement>("#hello")
helloButton?.addEventListener("click", () => {
  console.log(displayHello())
  resultDisplay!.innerHTML = displayHello()
})
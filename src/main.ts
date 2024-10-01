import displayHello from './displayHello'
import { inputCharacter, offCalculator, onCalculator } from './helpers'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div>
    <div class="calculator-container">
      <div class="calculator-display" id="calculator-display">
        <div id="equation"></div>
        <div id="result" class="result"></div>    
      </div>
      <div class="special-buttons">
        <button id="hello">hello</button>
        <button id="bye">bye</button>
      </div>
      <div class="buttons">
        <button id="AC" class="two-space">AC</button>
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
`;

export let config = {
  isOn: false,
  isTransitioning: false
};

export const calculatorDisplay = document.querySelector<HTMLDivElement>("#calculator-display")
export const resultDisplay = document.querySelector<HTMLDivElement>("#result")
export const equationDisplay = document.querySelector<HTMLDivElement>("#equation")
export const byeButton = document.querySelector<HTMLButtonElement>("#bye")
const ACButton = document.querySelector<HTMLButtonElement>("#AC");
const helloButton = document.querySelector<HTMLButtonElement>("#hello")

document.addEventListener("keydown", e => {
  console.log(e.key)
  inputCharacter(e.key)
});

const allButtons = document.querySelectorAll("button")
allButtons.forEach(button => {
  button.addEventListener("click", () => {
    console.log(button.innerHTML)
    inputCharacter(button.innerHTML)
  });
});

helloButton?.addEventListener("click", () => {
  onCalculator();
  resultDisplay!.innerHTML = displayHello()
});

byeButton?.addEventListener("click", offCalculator);

ACButton?.addEventListener("click", onCalculator);

document.addEventListener("DOMContentLoaded", () => {
  console.log("document is loaded");
});
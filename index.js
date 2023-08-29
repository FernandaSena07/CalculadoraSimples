let previousNumber = ""
let nextNumber = ""
let operation = ""


function calculate() {
  previousNumber = Number(previousNumber.replace(/,/g, ""))
  nextNumber = Number(nextNumber.replace(/,/g, ""))

  switch (operation) {
    case "+":
      previousNumber = previousNumber + nextNumber
      break
    
    case "-":
      previousNumber = previousNumber - nextNumber
      break
    
    case "x":
      previousNumber = previousNumber * nextNumber
      break
    
    case "÷":
      previousNumber = previousNumber / nextNumber
      break
    
    default:
      break
  }

  operation = ""
  nextNumber = ""
}

function formatNumber(number) {
  number = number.toString()

  const integerDigits = Number(number.split(".")[0].replace(/,/g, ""))
  const decimalDigits = number.split(".")[1]

  if (decimalDigits === undefined) {
    number = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0
    })
  } else {
    number = `${integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0
    })}.${decimalDigits}`
  }

  return number
}

function updateScreen() {
  if (operation === "") {
    previousNumber = formatNumber(previousNumber)
    $exibeResposta.innerHTML = previousNumber

  } else {
    previousNumber = formatNumber(previousNumber)

    if (nextNumber !== "") {
      nextNumber = formatNumber(nextNumber)
    }

    $exibeResposta.innerHTML = `${previousNumber} ${operation} ${nextNumber}`
  }
}

function appendNumber(number) {
  if (operation === "") {
    if (previousNumber.includes(".") && number === ".") return
    previousNumber += number

  } else {
    if (nextNumber.includes(".") && number === ".") return
    nextNumber += number
  }

  updateScreen()
}


function chooseOperation(operator) {
  if (operation !== "" && nextNumber !== "") {
    calculate()
  }

  operation = operator
  updateScreen()
}

function clearAll() {
  previousNumber = ""
  nextNumber = ""
  operation = ""
  $exibeResposta.innerHTML = "0"
}

function deleteDigit() {
  if (operation === "") {
    previousNumber = previousNumber.slice(0, -1)
  } else {
    nextNumber = nextNumber.slice(0, -1)
  }

  updateScreen()
}


const $exibeResposta = document.querySelector(".exibeResposta")

const $numberButtons = document.querySelectorAll("[data-number]")
$numberButtons.forEach(button => button.addEventListener("click", () => appendNumber(button.dataset.number)))

const $operatorButtons = document.querySelectorAll("[data-operator]")
$operatorButtons.forEach(button => button.addEventListener("click", () => chooseOperation(button.dataset.operator)))

const $equalButton = document.querySelector("[data-equal]")
$equalButton.addEventListener("click", () => {
  calculate()
  updateScreen()
})

const $clearAllButton = document.querySelector("[data-clear-all]")
$clearAllButton.addEventListener("click", () => clearAll())

const $deleteButton = document.querySelector("[data-delete]")
$deleteButton.addEventListener("click", () => deleteDigit())
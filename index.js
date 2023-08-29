let numeroInicial = "" //primeiro numero clicado//
let proximoNumero = "" //próximo numero clicado//
let operacao = "" //operacao selecionada//


function calculate() {
  numeroInicial = Number(numeroInicial.replace(/,/g, "")) //formata o dado de string para number//
  proximoNumero = Number(proximoNumero.replace(/,/g, ""))

  switch (operacao) { //Estrutura caso escolha para operações//
    case "+":
      numeroInicial = numeroInicial + proximoNumero //resultado sendo armazenado no Numero inicial//
      break //final do caso
    
    case "-":
      numeroInicial = numeroInicial - proximoNumero
      break
    
    case "x":
      numeroInicial = numeroInicial * proximoNumero
      break
    
    case "÷":
      numeroInicial = numeroInicial / proximoNumero
      break
    
    default: //será exec utado quando nenhuma das opções seja selecionada. //
      break
  }

  operacao = "" // zera o valor//
  proximoNumero = "" // zera o valor//
}

function formatNumber(number) {
  number = number.toString()
//formata o retorno da variavel dividindo o numeo com "." ou "," //
  const integerDigits = Number(number.split(".")[0].replace(/,/g, "")) //substitui todas as virgulas por string vazia//
  const decimalDigits = number.split(".")[1]

  //verifica se é numero decimal, se a variável é inteira para realizar sozinha a formatação.//
  if (decimalDigits === undefined) {
    number = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0 //Determinando que o primeiro valor não tenha valores decimais zerados.//
    })
  } else {
    number = `${integerDigits.toLocaleString("en", { 
      maximumFractionDigits: 0
    })}.${decimalDigits}` //Adiciona o . de separação da parte inteira. //
  }

  return number
}

function updateScreen() {
  if (operacao === "") {
    numeroInicial = formatNumber(numeroInicial) //primeiro numero recebe a função formatar numero atualizando assim a resposta //
    $exibeResposta.innerHTML = numeroInicial //exibe a resposta final no html.//

  } else {
    numeroInicial = formatNumber(numeroInicial)

    if (proximoNumero !== "") {
      proximoNumero = formatNumber(proximoNumero)
    }

    $exibeResposta.innerHTML = `${numeroInicial} ${operacao} ${proximoNumero}` //exibe valores na tela html//
  }
}

function appendNumber(number) {
  //verifica se esta puxando o primeiro ou o próximo numero. Se a string estiver vazia está lidando com o numero incial. senão é o próximo numero//
  if (operacao === "") {
    if (numeroInicial.includes(".") && number === ".") return ////
    numeroInicial += number

  } else {
    //verifica se o próximo numero já tem casa decimal, não permitindo que coloque mais. //
    if (proximoNumero.includes(".") && number === ".") return
    proximoNumero += number //ela mais ela mesma e o botão clicado pelo usuário//
  }

  updateScreen()
}


function escolherOperacao(operator) {
  //verifica se a operação esta vazia ou o próximo valor esta vazio para realizar o calculo//
  if (operacao !== "" && proximoNumero !== "") {
    calculate()
  }

  operacao = operator
  updateScreen()
}

//Reinicia a calculadora, zera as variaáveis//
function clearAll() {
  numeroInicial = ""
  proximoNumero = ""
  operacao = ""
  $exibeResposta.innerHTML = "0" //Volta a aparecer o zero no exibe resposta na tela//
}

//Apaga o ultimo digito//
function deleteDigit() {
  //Verifica se está chamando o primerio numero digitado ou o ultimo numero. Para retirar o ultimo caracter slice por ser string//
  if (operacao === "") {
    numeroInicial = numeroInicial.slice(0, -1) //Se a operaçao estiver vazia, esta trabalhando com o numero inicial//
  } else {
    proximoNumero = proximoNumero.slice(0, -1) //Senão está trabalhando com o último numero digitado. //
  }

  updateScreen()//chama a fuçao atualiza a tela da calculadora//
}


const $exibeResposta = document.querySelector(".exibeResposta")
//Usa-se o "$"(não obrigatório) caso seja criado uma variável com o mesmo nome que já foi criado no html. Cria uma função para todos os botões com data-number //
const $numberButtons = document.querySelectorAll("[data-number]")
//Adiciona o evento click, que significa que toda vez que o botão for clicado acontecerá algo// 
$numberButtons.forEach(button => button.addEventListener("click", () => appendNumber(button.dataset.number)))//usa-se o dataset para achar o elemento clicado e .number para saber qual numero foi clicado//
//Adiciona o evento click, que significa que toda vez que o botão for clicado acontecerá algo//

const $operatorButtons = document.querySelectorAll("[data-operator]")
$operatorButtons.forEach(button => button.addEventListener("click", () => escolherOperacao(button.dataset.operator)))//usa-se o dataset para achar o elemento clicado e .number para saber qual operador foi clicado//

//Adiciona ouvidor do evento click ao botão de igual//
const $equalButton = document.querySelector("[data-equal]")
$equalButton.addEventListener("click", () => {
  calculate() //a operação calcular é chamada//
  updateScreen() //a operação atualizar resultado é chamada//
})

//Adiciona o evento click, quando clicado a função clearAll() é acionada//
const $clearAllButton = document.querySelector("[data-clear-all]")
$clearAllButton.addEventListener("click", () => clearAll())

//chama a função//
const $deleteButton = document.querySelector("[data-delete]")
//Adiciona o ouvidor do evento click,quando clicado apaga o ultimo digito//
$deleteButton.addEventListener("click", () => deleteDigit())
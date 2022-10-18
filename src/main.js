import "./css/index.css"  // <- importando o JS

// Mechendo no DOM 

/* Pegando os elementos no DOM  */
const ccBgcolor01 = window.document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgcolor02 = window.document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = window.document.querySelector(".cc-logo span:nth-child(2) img")

/* Função que irá trocar as cores no DOM */
function setCardType(type){
    const colors = {
        "visa": ["#436d99", "#2D57F2"], // Elemento 1
        "mastercard": ["#DF6F29", "#C69347"], // Elemento 2
        "default": ["black", "black"], // Elemento 3
    }

    ccBgcolor01.setAttribute("fill", colors[type][0]) // passar dois args
    ccBgcolor02.setAttribute("fill", colors[type][1]) // passat dois args
    ccLogo.setAttribute("src", `cc-${type}.svg`) // troca de img 
}

setCardType("default") // passando o parâmetro da função
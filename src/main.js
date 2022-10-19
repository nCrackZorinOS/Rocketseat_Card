import "./css/index.css"  // <- importando o JS
import IMask from "imask"

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

// security code

const securitycode = window.document.querySelector('#security-code')
const securityCodePattern = {
    mask: "0000",
}

const securityCodeMask = IMask(securitycode, securityCodePattern)

const expirationDate = window.document.querySelector("#expiration-date")
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2),
        },
       MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        }
    }
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardnumber = window.document.querySelector('#card-number')
const cardNumberPattern = {
    mask: [
        {
            mask: '0000 0000 0000 0000',
            regex: /^4\d{0,15}/, // Expressão regulares
            cardtype: 'visa',
        },
        {
            mask: '0000 0000 0000 0000',
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/, // Expressão regulares
            cardtype: 'mastercard',
        },
        {
            mask: '0000 0000 0000 0000',
            cardtype: 'default',
        },
    ],
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '')
        const foundMask = dynamicMasked.compiledMasks.find(function(item){
            return number.match(item.regex)
        })
        console.log(foundMask)
        return foundMask
    },
}

const cardNumberMasked = IMask(cardnumber, cardNumberPattern)
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

const addButton = window.document.querySelector('#add-card')

addButton.addEventListener('click', () => {
    alert('Cartão Adicionado')
})

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
})

const cardHolder = window.document.querySelector('#card-holder')
cardHolder.addEventListener('input', () => {
    const ccHolder = window.document.querySelector('.cc-holder > .value')

    ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value

})

securityCodeMask .on('accept', () => {
    updateSecurityCode(securityCodeMask.value);
})

function updateSecurityCode(code){
    const ccSecurity = window.document.querySelector('.cc-security > .value')

    ccSecurity.innerText = code.length === 0 ? '123' :  code
}

cardNumberMasked.on('accept', () => {
    const cardType = cardNumberMasked.masked.currentMask.cardtype
    setCardType(cardType) 
    updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number){
    const ccNumber = window.document.querySelector('.cc-number')

    ccNumber.innerText = number.length === 0 ? '1234 5678 9012 3456' : number
}

expirationDateMasked.on('accept', () => {
 updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date){
    const ccExpiration = window.document.querySelector('.cc-extra .value')

    ccExpiration.innerText = date.length === 0 ? '02/32' : date
}
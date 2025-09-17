let card = document.querySelectorAll(".card");

const movimientos = document.querySelector("#mov");
const btn = document.querySelector("#btn"); 

const message = document.querySelector(".message");
const texto = document.querySelector(".text-fin");

let hasFlipperCard = false;
let loakBoard = false;
let firstCard, secondCard;

// Número de intentos
let sum = 0;
let contadorInicial = 0, contadorFinal = 6;

function flipCard() {
    // this.style.transition = "transform .7s";

    // Si es verdad, retorna vacio
    if(loakBoard) return;
    // Si el elemento es la primera carta, retorna vacio
    if(this == firstCard) return;

    // Añade la clase flip
    this.classList.add("flip");

    // Si no esta volteada, lo convierte en la primera carta y termina la condición
    if(!hasFlipperCard) {
        firstCard = this;
        hasFlipperCard = true;
        return;
    }

    // Continuando la funcion, el elemento seleccionado
    // se convierte en la 2da carta
    secondCard = this;

    // Checamos si son iguales
    checkForMatch();
}

function checkForMatch() {
    let data = firstCard.dataset.info === secondCard.dataset.info;
    // Si son iguales, deshabilitamos el evento click, si no, voltemos y lo dejamos en su estado default
    data ? disabledCard() : unflipCards();
}

function disabledCard() {
    intentos();
    completeTask();

    // Retiramos el evento click
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    
    // Reiniciamos las cartas y los valores
    resetBoard();
}

function completeTask() {
    contadorInicial++
    
    if(contadorInicial == contadorFinal) {
        message.style.opacity = "1";
        texto.textContent = `Has completado el juego en ${sum} movimientos`;
    }

}

function intentos() {
    sum++;
    movimientos.textContent = `${sum}`;
}

function unflipCards() {
    intentos();

    // Se convierte en true
    loakBoard = true;

    // Despues de 1s, se quita la clase flip
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        // Reiniciamos las cartas y los valores
        resetBoard();
    }, 1000);
}

// Reiniciamos las cartas y los valores
function resetBoard() {
    [hasFlipperCard, loakBoard] = [false, false];
    [firstCard, firstCard] = [null, null];
}

// Cambia el order de las cartas de forma random
function randomOrder() {
    card.forEach(ele => {
        ele.style.order = Math.floor(Math.random() * 12);
    })
}

randomOrder();

// Cada carta tendra el evento click, añadido la funcion flipCard
card.forEach(ele => ele.addEventListener("click", flipCard))

// Reiniciar
btn.addEventListener("click", () => {
    sum = 0;
    contadorInicial = 0;

    message.style.opacity = 0; 
    movimientos.textContent = `${sum}`;


    card.forEach(ele => {
        ele.style.transition = "none";
        ele.classList.remove("flip");
        ele.addEventListener("click", flipCard);
        setTimeout(()=> {
            ele.style.transition = "transform .7s";
        }, 150)
    })

    randomOrder();
});
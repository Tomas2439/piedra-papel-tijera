// 1. Variables de estado
let puntajeJugador = 0;
let puntajeComputadora = 0;

// 2. Seleccionar elementos del DOM
const botones = document.querySelectorAll('.controles button');
const divResultado = document.querySelector('#resultado-ronda');
const divMarcador = document.querySelector('#marcador');
const tablero = document.querySelector('.tablero');

// 3. Funciones del juego base
function getComputerChoice() {
    const opciones = ["piedra", "papel", "tijera"];
    return opciones[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    const player = playerSelection.toLowerCase();
    const reglas = { piedra: "tijera", papel: "piedra", tijera: "papel" };

    if (player === computerSelection) return "¡Es un empate!";
    if (reglas[player] === computerSelection) return `¡Ganaste! ${player} vence a ${computerSelection}`;
    return `¡Perdiste! ${computerSelection} vence a ${player}`;
}

// 4. Lógica de la interfaz (Event Listeners)
botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
        const playerSelection = e.target.id;
        const computerSelection = getComputerChoice();
        const resultadoTexto = playRound(playerSelection, computerSelection);

        // Mostrar el texto de la ronda
        divResultado.textContent = resultadoTexto;

        // Sumar puntos
        if (resultadoTexto.includes("Ganaste")) {
            puntajeJugador++;
        } else if (resultadoTexto.includes("Perdiste")) {
            puntajeComputadora++;
        }

        // Actualizar pantalla
        divMarcador.textContent = `Jugador: ${puntajeJugador} - Computadora: ${puntajeComputadora}`;

        // Revisar si alguien ganó la partida
        if (puntajeJugador === 5 || puntajeComputadora === 5) {
            terminarPartida();
        }
    });
});

// 5. Funciones para terminar y reiniciar
function terminarPartida() {
    // Apagar botones
    botones.forEach(boton => {
        boton.disabled = true;
    });

    // Mensaje final
    if (puntajeJugador === 5) {
        divResultado.textContent = "¡Partida terminada! Eres el ganador definitivo. 🎉";
    } else {
        divResultado.textContent = "¡Partida terminada! La computadora te destruyó. 🤖";
    }

    crearBotonReinicio();
}

function crearBotonReinicio() {
    const btnReinicio = document.createElement('button');
    btnReinicio.textContent = "Volver a jugar";
    btnReinicio.id = "reinicio";

    // Lo agregamos al div del tablero para que quede bien posicionado con el CSS
    tablero.appendChild(btnReinicio);

    // Darle vida al nuevo botón
    btnReinicio.addEventListener('click', () => {
        // Resetear todo
        puntajeJugador = 0;
        puntajeComputadora = 0;
        divMarcador.textContent = "Jugador: 0 - Computadora: 0";
        divResultado.textContent = "Haz tu jugada para empezar";

        // Prender botones de nuevo
        botones.forEach(boton => {
            boton.disabled = false;
        });

        // Destruir el botón de reinicio
        btnReinicio.remove();
    });
}
const cartas = [
    '🦐', '🦐', '🦞', '🦞',
    '🐙', '🐙', '🦑', '🦑',
    '🦀', '🦀', '🪼', '🪼',
    '🐳', '🐳', '🐡', '🐡'
];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueioTabuleiro = false; 
let paresEncontrados = 0; 

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function criarTabuleiro() {
    const tabuleiro = document.querySelector('.game-board');
    tabuleiro.innerHTML = '';

    embaralhar(cartas); 
    
    cartas.forEach(carta => {
        const cartaElemento = document.createElement('div');
        cartaElemento.classList.add('card');
        cartaElemento.dataset.icone = carta;
        cartaElemento.innerHTML = `
            <div class="card-inner">
                <div class="card-front">❔</div>
                <div class="card-back">${carta}</div>
            </div>
        `;
        cartaElemento.addEventListener('click', virarCarta);
        tabuleiro.appendChild(cartaElemento);
    });

    revelarCartasTemporariamente();
}

function virarCarta() {
    if (bloqueioTabuleiro || this === primeiraCarta || this.classList.contains('flipped')) return;

    this.classList.add('flipped');

    if (!primeiraCarta) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    verificarPar();
}

function verificarPar() {
    let combinam = primeiraCarta.dataset.icone === segundaCarta.dataset.icone;

    combinam ? desativarCartas() : desvirarCartas();
}

function desativarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    paresEncontrados++;

    if (paresEncontrados === cartas.length / 2) {
        setTimeout(() => alert("Você ganhou!"), 500);
    }

    resetarTabuleiro();
}

function desvirarCartas() {
    bloqueioTabuleiro = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('flipped');
        segundaCarta.classList.remove('flipped');
        resetarTabuleiro();
    }, 1000);
}

function resetarTabuleiro() {
    [primeiraCarta, segundaCarta, bloqueioTabuleiro] = [null, null, false];
}

// Função para revelar as cartas temporariamente
function revelarCartasTemporariamente() {
    const todasCartas = document.querySelectorAll('.card');
    todasCartas.forEach(carta => carta.classList.add('flipped'));

    setTimeout(() => {
        todasCartas.forEach(carta => carta.classList.remove('flipped'));
        bloqueioTabuleiro = false; 
    }, 5000);
}

document.getElementById('reset-button').addEventListener('click', () => {
    paresEncontrados = 0;
    criarTabuleiro();
});

document.addEventListener('DOMContentLoaded', criarTabuleiro);

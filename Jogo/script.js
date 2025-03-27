const canvas = document.getElementById('JogoCanvas');
const ctx = canvas.getContext('2d');

let gravidade = 0.5;
let gameOver = false;
let pontuacao = 0;
let pontuacaoMaxima = localStorage.getItem('pontuacaoMaxima') ? parseInt(localStorage.getItem('pontuacaoMaxima')) : 0;

document.addEventListener('keypress', (evento) => {
    if (evento.code === 'Space' && !personagem.pulando) {  
        personagem.velocidade_y = 15;
        personagem.pulando = true;
    }
});

let personagem = {
    x: 100,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    pulando: false,
    imagem: new Image()
};
personagem.imagem.src = 'personagem.png'; // Adicione uma imagem válida aqui

let obstaculo = {
    x: canvas.width - 100,
    y: canvas.height - 100,
    largura: 30,
    altura: gerarAlturaObstaculo(),
    velocidade_x: 3,
    aumentoVelocidade: 2,
    passou: false
};

function gerarAlturaObstaculo() {
    return Math.floor(Math.random() * (150 - 90 + 1)) + 90;
}

function desenharPersonagem() {
    ctx.fillStyle = 'red';
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function atualizaPersonagem() {
    personagem.y -= personagem.velocidade_y;
    personagem.velocidade_y -= gravidade;

    if (personagem.y >= canvas.height - personagem.altura) {
        personagem.y = canvas.height - personagem.altura;
        personagem.pulando = false;
        personagem.velocidade_y = 0;
    }
}

function desenharObstaculo() {
    ctx.fillStyle = 'black';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidade_x;

    if (obstaculo.x <= -obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.altura = gerarAlturaObstaculo();
        obstaculo.velocidade_x += obstaculo.aumentoVelocidade;
        pontuacao++;
    }
}

function verificaColisao() {
    if (
        obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.x + obstaculo.largura > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true;
        ctx.fillStyle = 'black';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', 50, 100);

        if (pontuacao > pontuacaoMaxima) {
            pontuacaoMaxima = pontuacao;
            localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima);
        }
    }
}

function reiniciarJogo() {
    personagem.y = canvas.height - 50;
    personagem.velocidade_y = 0;
    personagem.pulando = false;

    obstaculo.x = canvas.width - 100;
    obstaculo.altura = gerarAlturaObstaculo();
    obstaculo.velocidade_x = 3;

    pontuacao = 0;
    gameOver = false;
    loop();
}

document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJogo);

function desenharPontuacao() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Pontuação: ' + pontuacao, canvas.width - 150, 30);
    ctx.fillText('Pontuação Máxima: ' + pontuacaoMaxima, canvas.width - 200, 60);
}

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharPersonagem();
        atualizaPersonagem();
        desenharObstaculo();
        atualizarObstaculo();
        verificaColisao();
        desenharPontuacao();
        requestAnimationFrame(loop);
    }
}

loop();

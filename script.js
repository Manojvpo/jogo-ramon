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
    pulando: false
};

let obstaculo = {
    x: canvas.width - 100,
    y: canvas.height - 100,
    largura: 30,
    altura: 100,
    velocidade_x: 3, 
    aumentoVelocidade: 2,  
    passou: false 
};

function desenharPersonagem() {
    ctx.fillStyle = 'red'; 
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura
    );
}

function atualizaPersonagem() {
    if (personagem.pulando) {
        personagem.y -= personagem.velocidade_y; 
        personagem.velocidade_y -= gravidade; 

        
        if (personagem.y >= canvas.height - personagem.altura) {
            personagem.y = canvas.height - personagem.altura;  
            personagem.pulando = false;  
            personagem.velocidade_y = 0; 
        }
    }
}

function desenharObstaculo() {
    ctx.fillStyle = 'black'; 
    ctx.fillRect(
        obstaculo.x,
        obstaculo.y,
        obstaculo.largura,
        obstaculo.altura
    );
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidade_x;  
   
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width;  
        obstaculo.velocidade_x += obstaculo.aumentoVelocidade;  
        if (!obstaculo.passou) { 
            pontuacao++; 
            obstaculo.passou = true;  
        }
    } else {
        obstaculo.passou = false;  
    }
}

function verificaColisao() {
    if (obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.largura + obstaculo.x > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y) {
       
        obstaculo.velocidade_x = 0;  
        personagem.velocidade_y = 0;
        ctx.fillStyle = 'black';
        ctx.font = '50px Arial'; 
        ctx.fillText('SE FODEU', 50, 100);

        
        if (pontuacao > pontuacaoMaxima) {
            pontuacaoMaxima = pontuacao;  
            localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima); 
        }

        gameOver = true;
    }
}


function reiniciarJogo() {
   
    personagem = {
        x: 100,
        y: canvas.height - 50,
        largura: 50,
        altura: 50,
        velocidade_y: 0,
        pulando: false
    };
    obstaculo = {
        x: canvas.width - 100,
        y: canvas.height - 100,
        largura: 30,
        altura: 100,
        velocidade_x: 10,
        aumentoVelocidade: 2,
        passou: false
    };
    pontuacao = 0;  
    gameOver = false; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

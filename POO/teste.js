class Veiculo {
    constructor(tipo, marca, cor, velocidade, passageiros) {
        this.tipo = tipo;
        this.marca = marca;
        this.cor = cor;
        this.velocidade = velocidade;
        this.Passageiros = passageiros;
    }
    acelerar () {
        this.velocidade += 10
        console.log('vrum vrum')
    }
    frear () {
        this.velocidade -= 5
        console.log('skrrrrrr')
    }
    apresentar () {
        console.log(`0 ${this.tipo} de marca ${this.marca} esta a ${this.velocidade} km/h`)
    }
}

let Veiculo1 = new Veiculo( 'Jestski', 'Yamaha', 'Vermelha', 100, 2)
let Veiculo2 = new Veiculo('Carro', 'BMW', 'azul', 140, 4)
Veiculo1.apresentar()
Veiculo2.apresentar()
Veiculo1.acelerar()
Veiculo1.apresentar()
Veiculo1.frear()
Veiculo1.apresentar()
Veiculo2.frear()
Veiculo2.apresentar()
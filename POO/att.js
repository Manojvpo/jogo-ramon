class Veiculo {
    #velocidade;

    constructor(marca, cor, velocidade = 0) {
        this.marca = marca;
        this.cor = cor;
        this.#velocidade = velocidade;
    }

    getVelocidade() {
        return this.#velocidade;
    }

    setVelocidade(valor) {
        this.#velocidade = Math.max(0, valor);
    }

    acelerar(valor) {
        this.setVelocidade(this.getVelocidade() + valor);
        console.log(`${this.marca} acelerou para ${this.getVelocidade()} km/h.`);
    }

    frear(valor) {
        this.setVelocidade(this.getVelocidade() - valor);
        console.log(`${this.marca} reduziu para ${this.getVelocidade()} km/h.`);
    }
}

class Carro extends Veiculo {
    constructor(marca, cor, velocidade, placa) {
        super(marca, cor, velocidade);
        this.placa = placa;
    }
}

class Barco extends Veiculo {
    constructor(marca, cor, velocidade, leme, ancora) {
        super(marca, cor, velocidade);
        this.leme = leme;
        this.ancora = ancora;
    }

    acelerar(valor) {
        super.acelerar(valor / 2);
    }

    frear(valor) {
        super.frear(valor / 2);
    }
}

class Aviao extends Veiculo {
    constructor(marca, cor, velocidade, asas, turbina) {
        super(marca, cor, velocidade);
        this.asas = asas;
        this.turbina = turbina;
    }

    acelerar(valor) {
        super.acelerar(valor * 2);
    }

    frear(valor) {
        super.frear(valor * 2);
    }
}

let carro = new Carro('BMW', 'Vermelha', 100, 'ABC1234');
carro.acelerar(20);
carro.frear(50);

let barco = new Barco('Yamaha', 'Branco', 30, true, true);
barco.acelerar(20);
barco.frear(15);

let aviao = new Aviao('Boeing', 'Branco', 300, true, true);
aviao.acelerar(50);
aviao.frear(100);

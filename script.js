const perguntas = [
    {
        pergunta: "Qual destes é um ser vivo?",
        opcoes: ["Pedra", "Água", "Árvore", "Areia"],
        resposta: "Árvore"
    },
    {
        pergunta: "Qual é o maior bioma brasileiro?",
        opcoes: ["Amazônia", "Pampa", "Pantanal", "Caatinga"],
        resposta: "Amazônia"
    },
    {
        pergunta: "Qual gás os seres humanos precisam para respirar?",
        opcoes: ["Oxigênio", "Gás carbônico", "Hélio", "Hidrogênio"],
        resposta: "Oxigênio"
    },
    {
        pergunta: "Qual destes animais é um mamífero?",
        opcoes: ["Sapo", "Cachorro", "Galinha", "Tartaruga"],
        resposta: "Cachorro"
    },
    {
        pergunta: "Qual atitude ajuda a preservar o meio ambiente?",
        opcoes: [
            "Jogar lixo no rio",
            "Desperdiçar água",
            "Reciclar materiais",
            "Queimar lixo"
        ],
        resposta: "Reciclar materiais"
    },
    {
        pergunta: "Qual órgão bombeia o sangue pelo corpo?",
        opcoes: ["Pulmão", "Coração", "Estômago", "Cérebro"],
        resposta: "Coração"
    },
    {
        pergunta: "Qual destes é um recurso natural?",
        opcoes: ["Plástico", "Água", "Celular", "Computador"],
        resposta: "Água"
    },
    {
        pergunta: "As plantas produzem seu próprio alimento por meio da:",
        opcoes: [
            "Respiração",
            "Digestão",
            "Fotossíntese",
            "Evaporação"
        ],
        resposta: "Fotossíntese"
    },
    {
        pergunta: "Qual destes animais é herbívoro?",
        opcoes: ["Leão", "Coelho", "Tigre", "Cobra"],
        resposta: "Coelho"
    },
    {
        pergunta: "O que pode acontecer quando o lixo é jogado nos rios?",
        opcoes: [
            "A água fica mais limpa",
            "Os animais ganham alimento",
            "Pode ocorrer poluição da água",
            "A água fica potável"
        ],
        resposta: "Pode ocorrer poluição da água"
    }
];

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementById("opcoes");

const pontosElemento = document.getElementById("pontos");
const vidasElemento = document.getElementById("vidas");

const numeroPergunta = document.getElementById("numero-pergunta");
const barraProgresso = document.getElementById("barra-progresso");

const pontuacaoFinal = document.getElementById("pontuacao-final");
const mensagemFinal = document.getElementById("mensagem-final");

let perguntaAtual = 0;
let pontos = 0;
let vidas = 3;

btnIniciar.addEventListener("click", iniciarJogo);

function iniciarJogo() {
    perguntaAtual = 0;
    pontos = 0;
    vidas = 3;

    pontosElemento.textContent = pontos;
    vidasElemento.textContent = vidas;

    telaInicial.classList.add("escondido");
    telaFinal.classList.add("escondido");
    telaJogo.classList.remove("escondido");

    mostrarPergunta();
}

function mostrarPergunta() {
    btnProxima.classList.add("escondido");

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent = pergunta.pergunta;

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    barraProgresso.style.width =
        `${(perguntaAtual / perguntas.length) * 100}%`;

    opcoesElemento.innerHTML = "";

    pergunta.opcoes.forEach(opcao => {
        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.classList.add("opcao");

        botao.addEventListener("click", () => {
            verificarResposta(botao, opcao);
        });

        opcoesElemento.appendChild(botao);
    });
}

function verificarResposta(botaoSelecionado, respostaEscolhida) {
    const pergunta = perguntas[perguntaAtual];

    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (respostaEscolhida === pergunta.resposta) {
        botaoSelecionado.classList.add("correta");

        pontos += 10;
        pontosElemento.textContent = pontos;
    } else {
        botaoSelecionado.classList.add("errada");

        vidas--;
        vidasElemento.textContent = vidas;

        botoes.forEach(botao => {
            if (botao.textContent === pergunta.resposta) {
                botao.classList.add("correta");
            }
        });
    }

    btnProxima.classList.remove("escondido");

    if (vidas === 0) {
        btnProxima.textContent = "Ver resultado 🏆";
    }
}

btnProxima.addEventListener("click", proximaPergunta);

function proximaPergunta() {
    if (vidas === 0 || perguntaAtual === perguntas.length - 1) {
        finalizarJogo();
    } else {
        perguntaAtual++;

        btnProxima.textContent = "Próxima ➡️";

        mostrarPergunta();
    }
}

function finalizarJogo() {
    telaJogo.classList.add("escondido");
    telaFinal.classList.remove("escondido");

    pontuacaoFinal.textContent = pontos;

    if (pontos >= 80) {
        mensagemFinal.textContent =
            "🌟 Excelente! Você mandou muito bem em Ciências!";
    } else if (pontos >= 50) {
        mensagemFinal.textContent =
            "👏 Muito bem! Você está aprendendo bastante!";
    } else {
        mensagemFinal.textContent =
            "💪 Continue estudando! Você pode melhorar ainda mais!";
    }
}

btnReiniciar.addEventListener("click", iniciarJogo);
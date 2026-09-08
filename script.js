/* =========================================================
   PESQUISA DIGITAL
   script.js
========================================================= */


/* =========================================================
   1. PERGUNTAS
========================================================= */

const questions = [

    {
        question:
            "Caso você utilize aplicativos de vídeos curtos, qual das opções abaixo você mais usa?",

        help:
            "Você pode selecionar uma ou mais opções.",

        multiple: true,

        options: [
            "TikTok",
            "Instagram Reels",
            "YouTube Shorts",
            "Kwai",
            "Outra"
        ]
    },


    {
        question:
            "Caso você use, qual conteúdo você consome?",

        help:
            "Selecione todas as opções que se aplicam.",

        multiple: true,

        options: [
            "Entretenimento",
            "Notícias",
            "Educação",
            "Humor",
            "Música",
            "Esportes",
            "Outra"
        ]
    },


    {
        question:
            "Quanto tempo você passa em frente às telas?",

        help:
            "Escolha uma opção.",

        multiple: false,

        options: [
            "Menos de 1 hora por dia",
            "Entre 1 e 3 horas",
            "Entre 3 e 5 horas",
            "Entre 5 e 8 horas",
            "Mais de 8 horas"
        ]
    },


    {
        question:
            "Com que frequência você utiliza redes sociais?",

        help:
            "Escolha uma opção.",

        multiple: false,

        options: [
            "Raramente",
            "Algumas vezes por semana",
            "Todos os dias",
            "Várias vezes ao dia",
            "Praticamente o tempo todo"
        ]
    },


    {
        question:
            "Você considera que passa muito tempo utilizando telas?",

        help:
            "Escolha uma opção.",

        multiple: false,

        options: [
            "Sim",
            "Não",
            "Às vezes",
            "Não sei"
        ]
    }

];


/* =========================================================
   2. ESTADO DO QUESTIONÁRIO
========================================================= */

let currentQuestion = 0;


/*
    Cada posição do array representa
    uma pergunta.

    Exemplo:

    answers[0] = [0, 2]

    significa que na pergunta 1
    foram selecionadas as opções 0 e 2.
*/

let answers = [];


/*
    Respostas digitadas no campo "Outra".

    Exemplo:

    otherAnswers[0] = "Facebook Reels"
*/

let otherAnswers = [];


/* =========================================================
   3. ELEMENTOS HTML
========================================================= */

const quiz =
    document.getElementById("quiz");


const result =
    document.getElementById("result");


const questionElement =
    document.getElementById("question");


const helpElement =
    document.getElementById("help");


const optionsElement =
    document.getElementById("options");


const progressBar =
    document.getElementById("progressBar");


const progressText =
    document.getElementById("progressText");


const percentage =
    document.getElementById("percentage");


const other =
    document.getElementById("other");


const otherInput =
    document.getElementById("otherInput");


const characterCount =
    document.getElementById("characterCount");


const backButton =
    document.getElementById("back");


const nextButton =
    document.getElementById("next");


const restartButton =
    document.getElementById("restart");


/* =========================================================
   4. INICIALIZAÇÃO
========================================================= */

function initialize() {

    loadQuestion();

}


/* =========================================================
   5. CARREGAR PERGUNTA
========================================================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    /*
        Atualiza o texto da pergunta.
    */

    questionElement.textContent =
        question.question;


    /*
        Atualiza o texto auxiliar.
    */

    helpElement.textContent =
        question.help;


    /*
        Atualiza o contador.
    */

    progressText.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;


    /*
        Calcula porcentagem.
    */

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;


    progressBar.style.width =
        `${progress}%`;


    percentage.textContent =
        `${Math.round(progress)}%`;


    /*
        Limpa as opções antigas.
    */

    optionsElement.innerHTML = "";


    /*
        Recupera as respostas
        dessa pergunta.
    */

    const selected =
        answers[currentQuestion] || [];


    /*
        Cria cada opção.
    */

    question.options.forEach(
        (optionText, index) => {

            const optionElement =
                createOption(
                    optionText,
                    index,
                    selected
                );


            optionsElement.appendChild(
                optionElement
            );

        }
    );


    /*
        Atualiza o campo "Outra".
    */

    updateOtherField();


    /*
        Configura botão voltar.
    */

    backButton.disabled =
        currentQuestion === 0;


    /*
        Configura texto do botão.
    */

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Finalizar ✓";

    } else {

        nextButton.textContent =
            "Continuar →";

    }

}


/* =========================================================
   6. CRIAR UMA OPÇÃO
========================================================= */

function createOption(
    text,
    index,
    selected
) {

    const option =
        document.createElement("div");


    option.classList.add("option");


    /*
        Verifica se essa opção
        já estava selecionada.
    */

    if (
        selected.includes(index)
    ) {

        option.classList.add(
            "selected"
        );

    }


    /*
        Acessibilidade básica.
    */

    option.setAttribute(
        "role",
        "button"
    );


    option.setAttribute(
        "tabindex",
        "0"
    );


    /*
        Estrutura interna.
    */

    option.innerHTML = `

        <div class="checkbox"></div>

        <div class="option-text">
            ${escapeHTML(text)}
        </div>

    `;


    /*
        Clique.
    */

    option.addEventListener(
        "click",
        () => {

            selectOption(index);

        }
    );


    /*
        Permite usar Enter ou espaço
        pelo teclado.
    */

    option.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                selectOption(index);

            }

        }
    );


    return option;

}


/* =========================================================
   7. SELECIONAR OPÇÃO
========================================================= */

function selectOption(index) {

    const question =
        questions[currentQuestion];


    /*
        Recupera respostas existentes.
    */

    let selected =
        answers[currentQuestion] || [];


    /*
        PERGUNTA DE MÚLTIPLA ESCOLHA
    */

    if (question.multiple) {

        if (
            selected.includes(index)
        ) {

            /*
                Se já estiver selecionada,
                remove.
            */

            selected =
                selected.filter(
                    item => item !== index
                );

        } else {

            /*
                Se não estiver selecionada,
                adiciona.
            */

            selected.push(index);

        }

    }


    /*
        PERGUNTA DE ESCOLHA ÚNICA
    */

    else {

        selected = [index];

    }


    /*
        Salva.
    */

    answers[currentQuestion] =
        selected;


    /*
        Atualiza a interface.
    */

    loadQuestion();

}


/* =========================================================
   8. CAMPO "OUTRA"
========================================================= */

function updateOtherField() {

    const question =
        questions[currentQuestion];


    /*
        Procura a opção "Outra".
    */

    const otherIndex =
        question.options.findIndex(
            option =>
                option.toLowerCase() ===
                "outra"
        );


    /*
        Se a pergunta não possuir
        "Outra", esconde o campo.
    */

    if (otherIndex === -1) {

        other.classList.remove(
            "visible"
        );

        return;

    }


    /*
        Recupera respostas.
    */

    const selected =
        answers[currentQuestion] || [];


    /*
        Verifica se "Outra"
        foi selecionada.
    */

    const isOtherSelected =
        selected.includes(otherIndex);


    if (isOtherSelected) {

        other.classList.add(
            "visible"
        );


        /*
            Recupera texto anterior.
        */

        otherInput.value =
            otherAnswers[currentQuestion] || "";


        updateCharacterCount();

    } else {

        other.classList.remove(
            "visible"
        );

    }

}


/* =========================================================
   9. CAMPO DE TEXTO "OUTRA"
========================================================= */

otherInput.addEventListener(
    "input",
    () => {

        otherAnswers[currentQuestion] =
            otherInput.value;


        updateCharacterCount();

    }
);


/* =========================================================
   10. CONTADOR DE CARACTERES
========================================================= */

function updateCharacterCount() {

    if (!characterCount) {
        return;
    }


    characterCount.textContent =
        otherInput.value.length;

}


/* =========================================================
   11. VALIDAR RESPOSTA
========================================================= */

function validateQuestion() {

    const question =
        questions[currentQuestion];


    const selected =
        answers[currentQuestion] || [];


    /*
        Verifica se alguma opção
        foi selecionada.
    */

    if (selected.length === 0) {

        showMessage(
            "Selecione pelo menos uma opção para continuar."
        );

        return false;

    }


    /*
        Verifica "Outra".
    */

    const otherIndex =
        question.options.findIndex(
            option =>
                option.toLowerCase() ===
                "outra"
        );


    if (
        selected.includes(otherIndex)
    ) {

        const text =
            otherAnswers[currentQuestion] || "";


        if (
            !text.trim()
        ) {

            showMessage(
                'Você selecionou "Outra". Escreva uma resposta.'
            );


            otherInput.focus();


            return false;

        }

    }


    return true;

}


/* =========================================================
   12. PRÓXIMA PERGUNTA
========================================================= */

function nextQuestion() {

    /*
        Não avança se a resposta
        for inválida.
    */

    if (!validateQuestion()) {

        return;

    }


    /*
        Ainda existem perguntas?
    */

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;


        loadQuestion();


        /*
            Volta o scroll para o topo
            do card.
        */

        scrollToQuestion();

    }


    /*
        Última pergunta.
    */

    else {

        finishQuiz();

    }

}


/* =========================================================
   13. PERGUNTA ANTERIOR
========================================================= */

function previousQuestion() {

    if (
        currentQuestion > 0
    ) {

        currentQuestion--;


        loadQuestion();


        scrollToQuestion();

    }

}


/* =========================================================
   14. SCROLL
========================================================= */

function scrollToQuestion() {

    const card =
        document.querySelector(".card");


    if (!card) {
        return;
    }


    /*
        Em telas pequenas,
        volta suavemente para o card.
    */

    if (
        window.innerWidth <= 600
    ) {

        card.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   15. FINALIZAR QUESTIONÁRIO
========================================================= */

function finishQuiz() {

    /*
        Monta os dados finais.
    */

    const finalAnswers =
        buildFinalAnswers();


    /*
        Mostra no console
        para podermos testar.
    */

    console.log(
        "================================"
    );

    console.log(
        "RESPOSTAS DO QUESTIONÁRIO"
    );

    console.log(
        "================================"
    );

    console.log(
        finalAnswers
    );


    /*
        Esconde questionário.
    */

    quiz.style.display =
        "none";


    /*
        Mostra resultado.
    */

    result.style.display =
        "block";


    /*
        Vai para o topo.
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   16. MONTAR RESPOSTAS FINAIS
========================================================= */

function buildFinalAnswers() {

    const finalAnswers = [];


    questions.forEach(
        (question, questionIndex) => {

            const selected =
                answers[questionIndex] || [];


            const selectedOptions =
                selected.map(
                    optionIndex =>
                        question.options[
                            optionIndex
                        ]
                );


            finalAnswers.push({

                question:
                    question.question,

                answers:
                    selectedOptions,

                other:
                    otherAnswers[
                        questionIndex
                    ] || null

            });

        }
    );


    return finalAnswers;

}


/* =========================================================
   17. REINICIAR
========================================================= */

function restartQuiz() {

    currentQuestion = 0;

    answers = [];

    otherAnswers = [];


    /*
        Limpa o campo.
    */

    otherInput.value = "";


    updateCharacterCount();


    /*
        Esconde resultado.
    */

    result.style.display =
        "none";


    /*
        Mostra questionário.
    */

    quiz.style.display =
        "block";


    /*
        Carrega primeira pergunta.
    */

    loadQuestion();


    /*
        Volta para o topo.
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   18. MENSAGEM
========================================================= */

function showMessage(message) {

    /*
        Por enquanto usamos um alert
        simples.

        Depois podemos transformar
        isso em uma notificação bonita
        dentro da página.
    */

    alert(message);

}


/* =========================================================
   19. ESCAPAR HTML
========================================================= */

function escapeHTML(text) {

    const element =
        document.createElement("div");


    element.textContent =
        text;


    return element.innerHTML;

}


/* =========================================================
   20. EVENTOS DOS BOTÕES
========================================================= */

nextButton.addEventListener(
    "click",
    nextQuestion
);


backButton.addEventListener(
    "click",
    previousQuestion
);


restartButton.addEventListener(
    "click",
    restartQuiz
);


/* =========================================================
   21. ATALHOS DO TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
            Enter avança,
            desde que o usuário
            não esteja digitando
            no campo "Outra".
        */

        if (
            event.key === "Enter" &&
            document.activeElement !== otherInput
        ) {

            nextQuestion();

        }

    }
);


/* =========================================================
   22. INICIAR A APLICAÇÃO
========================================================= */

initialize();

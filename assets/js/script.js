// querySelectors
const timerEl = document.querySelector('#time');
const startBtn = document.querySelector('#start');
const questionsEl = document.querySelector('#questions');
const optionsEl = document.querySelector('options');
const submitBtn = document.querySelector('#submit');
const initialsEl = document.querySelector('#initials');

var cQuestionsIndex = 0;
var seconds = 76;
var holdI; 


// Questions Array
const questions = [
    {    
        question: "Commonly used data types DO Not include:",
        answer: "3. alerts",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    },
    {
        question: "The condition in an if / else statement is enclosed with _______.",
        answer: "3. parenthesis",
        options: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"]
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answer: "4. all of the above",
        options: ["1. numbers and strings", "2. other arrays", "3. booleans",  "4. all of the above"]
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answer: "3. quotes",
        options: ["1. commas","2. curly brackets", "3. quotes", "4. parenthesis"]
    },
    {
        question: "A very useful tool used during development and debuggin for printing content to the debugger is:",
        answer: "4. console log",
        options: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"]
    }
];

// Start/Timer
function startGame() {
    var quizChallElement = document.querySelector('#quizChallenge');
    quizChallElement.setAttribute('class', 'hide')
    questionsEl.removeAttribute('class');
    holdI = setInterval(countDown, 1000);
    timerEl.textContent = time;

    revealQuiz();
}
// reveal quiz function
function revealQuiz(){
    const cQuestion = questions[cQuestionsIndex];
    const choiceEl = document.querySelector('questionsTitle');
    questionsEl.textContent = cQuestion.question;
    optionsEl.innerHTML='';

    cQuestion.options.forEach(function (option, i) {
        var optionEl = document.createElement('button');
        optionEl.setAttribute.apply('class', 'option');
        optionEl.setAttribute('result', 'option');
        optionEl.textContent = i+1+'. '+option;
        optionEl.onclick=answerClick;
        optionEl.appendChild(optionEl);
    })
}
// answer click function
function answerClick() {
    if(this.result !== questions[cQuestionsIndex].answer) {
        seconds -= 10;
    if(seconds < 0) {
        seconds = 0;
    }
    timerEl.textContent = seconds;
    }
}

startBtn.onclick = startGame;
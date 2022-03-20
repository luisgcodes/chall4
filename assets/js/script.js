// querySelectors
var timerEl = document.querySelector('#time');
var startBtn = document.querySelector('#start');
var questionsEl = document.querySelector('#questions');
var optionsEl = document.querySelector('#options');
var submitBtn = document.querySelector('#submit');
var initialsEl = document.querySelector('#initials');
var outcomeEl = document.querySelector('#outcome');

var cQuestionsIndex = 0;
var time = 76;
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
    quizChallElement.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');
    holdI = setInterval(countDown, 1000);
    timerEl.textContent = time;

    revealQuiz();
}
// reveal quiz function
function revealQuiz(){
    var cQuestion = questions[cQuestionsIndex];
    var choiceEl = document.querySelector('questionsTitle');
    questionsEl.textContent = cQuestion.question;
    optionsEl.innerHTML = "";

    cQuestion.options.forEach(function (option, i) {
        var optionEl = document.createElement('button');
        optionsEl.setAttribute('class', 'option');
        optionsEl.setAttribute('result', 'option');
        optionsEl.textContent = i+1+'. '+option;
        optionsEl.onclick=answerClick;
        optionsEl.appendChild(optionEl);
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

    outcomeEl.textContent = "Wrong!";
    } else {
        outcomeEl.textContent = "Correct!";
    }
    outcomeEl.setAttribute('class', 'outcome hide');
    setTimeout(function () {
        outcomeEl.setAttribute('class', 'outcome hide');
    }, 1000);
cQuestionsIndex++;
    if (cQuestionsIndex === questions.length) {
        done();
    }else {
        revealQuiz();
    }
}

function done(){
    clearInterval(holdI);
    var allDoneEl = document.querySelector('#allDone');
    allDoneEl.removeAttribute('class');
    
    var yourScoreEl = document.querySelector('#yourScore');
    yourScoreEl.textContent = seconds;

    questionsEl.setAttribute('class', 'hide');
}

function countDown() {
    seconds--;
    timerEl.textContent = seconds;
    if (seconds <=0) {
        done();
    }
}

function saveScore(){
    var initials = initialsEl.value.trim();
    if (initials!=="") {
        var hScores = 
        JSON.parse(window.localStorage.getItem('hScores')) || [];
        var newScore = {
            score: seconds,
            initials: initials,
        };
        hScores.push(newScore);
        window.localStorage.setItem('hScores', JSON.stringify(hScores));
        window.location.href = "scores.html";
    }
}

startBtn.onclick = startGame;

submitBtn.onclick = saveScore;
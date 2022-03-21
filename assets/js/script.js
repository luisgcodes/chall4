// querySelectors
var timerEl = document.querySelector('#time');
var startBtn = document.querySelector('#start');
var questionsEl = document.querySelector('#questions');
var optionsEl = document.querySelector('#options');
var submitBtn = document.querySelector('#submit');
var initialsEl = document.querySelector('#initials');
var outcomeEl = document.querySelector('#outcome');


var cQuestionsIndex = 0;
var time = 75;
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
    quizChallElement.style.display = 'none';

    revealQuiz();
}
// reveal quiz function
function revealQuiz(){
    var cQuestion = questions[cQuestionsIndex];
    var questionTitleEl = document.querySelector('#questionTitle');
    questionTitleEl.textContent = cQuestion.question;
    optionsEl.innerHTML = "";

    cQuestion.options.forEach(function (option, i) {
        var optionEl = document.createElement('button');

        optionEl.setAttribute('class', 'option');
        optionEl.setAttribute('value', 'option');

        optionEl.textContent = option;
        optionEl.onclick=answerClick;
        optionsEl.appendChild(optionEl);
    });
}
// answer click function
function answerClick() {
    if(this.value !== questions[cQuestionsIndex].answer) {
        // adds penalty if wrong
        time -= 10;
    if(time < 0) {
        time = 0;
    }
    timerEl.textContent = time;

    outcomeEl.textContent = "Wrong!";
    } else {
        outcomeEl.textContent = "Correct!";
    }
    outcomeEl.setAttribute('class', 'outcome');
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
    yourScoreEl.textContent = time;

    questionsEl.setAttribute('class', 'hide');
}

function countDown() {
    time--;
    timerEl.textContent = time;
    if (time <=0) {
        done();
    }
}

function saveScore() {
    var initials = initialsEl.value.trim();
    if (initials!=="") {
        var highscores = 
        JSON.parse(window.localStorage.getItem('highscores')) || [];
        var nScore = {
            score: time,
            initials: initials,
        };
        highscores.push(nScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href = "scores.html";
    }
}

submitBtn.onclick = saveScore;

startBtn.onclick = startGame;


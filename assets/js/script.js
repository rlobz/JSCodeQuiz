//GIVEN I am taking a code quiz

var timer = document.getElementById("timer");
var startButton = document.getElementById("start");
var frontPage = document.getElementById("frontPage");
var questionsPage = document.getElementById("questionsPage");
var questionPlace = document.getElementById("questionPlace");
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var correctIncorrect = document.getElementById("correct-incorrect");
var highscoresPage = document.getElementById("highscorePage");
var highscores = document.getElementById("highscores");
var highscoresList = document.getElementById("highscores-list");
var allDone = document.getElementById("allDonePage");
var finalScore = document.getElementById("final-score");
var clearHighscores = document.getElementById("clear-highscores");
var initials = document.getElementById("inputdefault");
var submitInitials = document.getElementById("submit-initials");
var timeInterval;
var isGameOver = false;
var gameStarted = false;
var gameStartedAndFinished = false;





function scores() {
  frontPage.style.display = "none";
  highscoresPage.style.display = "block";
  questionsPage.style.display = "none";
}

function theFront() {
  if (gameStartedAndFinished) {
    gameStartedAndFinished = false;
    gameStarted = false;
    questionIndex = 0;
    timer.textContent = "";
    highscoresPage.style.display = "none";
    questionsPage.style.display = "none";
    frontPage.style.display = "block";
    return;
  }
  if (gameStarted) {
    highscoresPage.style.display = "none";
    questionsPage.style.display = "block";
    return;
  } else {
  isGameOver = true;
  timer.textContent = "";
  highscoresPage.style.display = "none";
  frontPage.style.display = "block";
}}


var myQuestions = [
  {
    question: "Which of the following is NOT a JavaScript framework or library?",
    answer: ["Vue.js", "Angular", "Laravel", "React"],
    correct: 2
  },
  {
    question: "Which method can be used to decode a JSON string",
    answer: ["JSON.stringify()", "JSON.decode()", "JSON.toArray()", "JSON.parse()"],
    correct: 3
  },
  {
    question: "The three fundamental programming languages of the modern web are: HTML, CSS, and _________.",
    answer: ["Dothraki", "Hebrew", "JavaScript", "HTML"],
    correct: 2
  },
  { 
    question: "Variables are the _______ of programming.",
    answer: ["verbs", "icebergs", "whales", "nouns"],
    correct: 3
  },
  { 
    question: "Which identifier will surround a string in JavaScript?",
    answer: ["bulbs", "lampshades", "quotation marks", "parentheses"],
    correct: 2
  },
  { 
    question: "Where will the \"console.log()\" method display data?",
    answer: ["in the garden", "in the browser", "in the console", "in the toolbar"],
    correct: 2
  },
  { 
    question: "When an alert is executed it will popup in the _____",
    answer: ["console", "browser", "dictionary", "atmosphere"],
    correct: 1
  },
];

//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over

    var userScore = 0;
    var timeLeft = 90;
    var questionIndex = 0;
    
    function startQuiz() {
      if (!gameStarted) {
        gameStarted = true;
        isGameOver = false;
        userScore = 0;
        timeLeft = 90;
        correctIncorrect.textContent = "";
        timeInterval = setInterval(function() {
          if (isGameOver) {
          clearInterval(timeInterval)
          return;
        }
        timer.textContent = "" + timeLeft;
        console.log("Time left:", timeLeft);
        timeLeft--;
    
        if (timeLeft <= 0 || questionIndex >= myQuestions.length) {
          timer.textContent = "";
          clearInterval(timeInterval);
          endGame();
        }
      }, 1000);
    }
    showQuestion(questionIndex);
    }
    
    function questions() {
      questionsPage.style.display = "block";
      frontPage.style.display = "none";
      showQuestion(questionIndex);
      startQuiz();
    }

    function showQuestion(index) {
      if (index < myQuestions.length) {
        var currentQuestion = myQuestions[index];
        questionPlace.textContent = currentQuestion.question;
        one.textContent = currentQuestion.answer[0];
        two.textContent = currentQuestion.answer[1];
        three.textContent = currentQuestion.answer[2];
        four.textContent = currentQuestion.answer[3];
      } else {
        endGame();
      }
    }

//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock

     function checkAnswer(answerIndex) {
      var currentQuestion = myQuestions[questionIndex];
      if (answerIndex === currentQuestion.correct) {
        userScore++;
        correctIncorrect.textContent = "Correct!";
      } else {
        correctIncorrect.textContent = "Wrong!";
        timeLeft -= 10;
      }
      
      questionIndex++;
      showQuestion(questionIndex);
}

    
    function endGame() {
      gameStartedAndFinished = true
      isGameOver = true;
      clearInterval(timeInterval);
      questionIndex = 0;
      questionsPage.style.display = "none";
      highscoresPage.style.display = "none";
      frontPage.style.display = "none";
      allDone.style.display = "block";
      finalScore.textContent = "Your final score is: " + timeLeft;
      clearInterval(timeInterval);
    }

//WHEN the game is over
//THEN I can save my initials and my score  

var userHighscores = [];

function addHighscore() {
  var loggedHighscores = JSON.parse(localStorage.getItem("userHighscores"));
  if (Array.isArray(loggedHighscores) && loggedHighscores !== null) {
    userHighscores = loggedHighscores;
  }

  questionsPage.style.display = "none";
  allDone.style.display = "none";
  frontPage.style.display = "none";
  highscoresPage.style.display = "block";

  highscoresList.innerHTML = "";
  for (var j = 0; j < userHighscores.length; j++) {
      var userHighscore = userHighscores[j];
      var li = document.createElement("li");
      li.textContent = userHighscore;
      li.setAttribute("data-index", j);
      highscoresList.appendChild(li);
  }
}
  
  var storeHighscore = function() {
  localStorage.setItem("userHighscores", JSON.stringify(userHighscores));
}
  
submitInitials.addEventListener("click", function(event) {
  event.preventDefault();
  var userInitialsScore = initials.value + " - " + timeLeft;
  if (userInitialsScore === "") {
    return;
  }

  userHighscores.push(userInitialsScore);
  initials.value = "";
  storeHighscore();
  addHighscore();
});

var clearScores = function() {
  localStorage.clear();
  userHighscores = [];
  console.log(userHighscores)
  highscoresList.textContent = "";
  console.log(localStorage);
  addHighscore();
}

    
    startButton.addEventListener("click", startQuiz);
  
    highscores.addEventListener("click", addHighscore);
    clearHighscores.addEventListener("click", clearScores);




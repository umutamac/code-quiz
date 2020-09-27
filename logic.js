var hiScoreBtn = document.querySelector("#hi-scores")
var startBtn = document.querySelector("#start-btn")
var time = document.getElementById("time");

var set1 = document.querySelector("QA1");
var set2 = document.querySelector("QA2");
var set3 = document.querySelector("QA3");
var set4 = document.querySelector("QA4");
var q1answer = document.querySelector("q1answer");
var q2answer = document.querySelector("q2answer");
var q3answer = document.querySelector("q3answer");
var q4answer = document.querySelector("q4answer");
var correctAnswer = document.getElementById("correctAnswer");

var currentScore = document.getElementById("resultSave");

// Showing/Hiding questions
function showQuestion1(){
    set1.style.display = "block"
}
function showQuestion2(){
    set1.style.display = "none"
    set2.style.display = "block"
}
function showQuestion3(){
    set2.style.display = "none"
    set3.style.display = "block"
}
function showQuestion4(){
    set3.style.display = "none"
    set4.style.display = "block"
}
function resultEntry(){
    set4.style.display = "none"
    currentScore.style.display="block"
}

// Countdown Timer
var secondsLeft = 10;
function countdown(){
    time.textContent = "";
    time.textContent += secondsLeft;
    secondsLeft--;
    
}

startBtn.addEventListener("click", function() {
    set1.style.display = "block"


    secondsLeft = 10;
    var x = setInterval(countdown,1000);
    if (secondsLeft<0){
        clearInterval(x);
        time.textContent = "Time is up!";
    }

});

q1answer.addEventListener("click",showQuestion2);
q2answer.addEventListener("click",showQuestion3);
q3answer.addEventListener("click",showQuestion4);
q2answer.addEventListener("click",resultEntry);

correctAnswer.addEventListener()
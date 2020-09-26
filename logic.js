var hiScoreBtn = document.querySelector("#hi-scores")
var startBtn = document.querySelector("#start-btn")
var answerBtn = document.querySelector("#start-btn")
var qa = document.getElementById("q&a-window")
var time = document.getElementById("time");

// var hiScoreBtn = document.querySelector("#hi-scores")
// var hiScoreBtn = document.querySelector("#hi-scores")
// var hiScoreBtn = document.querySelector("#hi-scores")
// var hiScoreBtn = document.querySelector("#hi-scores")

// Questions
qa.style.display="none";

var questions = 
["What keyword is used to call a function when an element is clicked on?",
"Which one is used to link a JS file to the HTML file?",
"What syntax is used to create comments in JS?",
"Which keyword is used for manipulating an array?",]

var answers = 
[""
];


// Countdown Timer

var secondsLeft = 10;
function countdown(){
    
    time.textContent = "";
    time.textContent += secondsLeft;
    secondsLeft--;
    
}
if (secondsLeft<0){
    var y = clearInterval(countdown);
    time.textContent = "Done";
}





startBtn.addEventListener("click", function(event) {
    var x = setInterval(countdown,1000)
    qa.style.display="block"
    if (secondsLeft==0){
        qa.style.display="none"
    }
});

hiScoreBtn.addEventListener("click", function(event) {
    
});



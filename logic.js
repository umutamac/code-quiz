var startBtn = document.getElementById("start-btn");
var time = document.getElementById("time");

var index = 0;
var QAwindow = document.querySelector(".QA-window");
var Question = document.getElementById("question");
var answerBtnsDiv = document.querySelector(".answer-buttons-div");
var feedback = document.querySelector(".feedback");

var resultSavePage = document.querySelector(".result-save-page");
var currentScore = document.getElementById("currentScore");
var saveScoreBtn = document.getElementById("saveScoreBtn");
var nameinput = document.getElementById("fname");
var interval = 0; // introduce interval variable
var secondsLeft = 0; // introduce remaining time variable

// scores page variables
var scoresPage = document.querySelector(".scores-page");
var scoresList = document.querySelector("#scores-list");

var nameinput = [];
var scoreinput = [];



var questionSets = [
    {question: "What keyword is used to call a function when an element is clicked on?",
    answers: ["addEventListener","setInterval","getElementById","querySelector"],
    correct: "addEventListener"},
    {question: "Which one is used to link a JS file to the HTML file?", 
    answers: ["<script src=\"\"></script>","<link rel=\"stylesheet\" href=\"style.css\">","getElementById","querySelector"],
    correct:"<script src=\"\"></script>"},
    {question: "What syntax is used to create comments in JS?", 
    answers: ["[]","{}","/**/","~"],
    correct:"/**/"},
    {question: "Which keyword is used for manipulating an array?", 
    answers: ["Math","splice","setAttribute","preventDefault"],
    correct:"splice"},
];

function showQuestionAndAnswers(index){
    answerBtnsDiv.innerHTML = ""; // empty out any existing answer buttons
    Question.textContent = questionSets[index].question; // fill in question text with 1st question
    QAwindow.prepend(question); // add question to the existing paragraph in html file

    for (var i=0; i<questionSets[index].answers.length; i++) {   
        var ansBtn = document.createElement("button"); // create button elements for answers to go in
        ansBtn.textContent = questionSets[index].answers[i]; // fill in answer text to button
        answerBtnsDiv.appendChild(ansBtn); // put the button in answers div
        ansBtn.className = "answerbutton"; // give the button a class name
        if (questionSets[index].answers[i] === questionSets[index].correct){ // if it is the correct answer, 
            ansBtn.setAttribute("data-correct", true); //give it an attribute
        }
    }
}

function countdown(){ // countdown starts at one second less than secondsLeft variable
    secondsLeft--;
    time.textContent = "";
    time.textContent += secondsLeft;
    if (secondsLeft<0){  //when timer comes to zero,   hide other stuff
        secondsLeft=0; // stop timer at zero
        currentScore.textContent = secondsLeft; // make current score equal to time left(=0)
        clearInterval(interval); //stop timershow score
        resultSavePage.style.display = "block" // show score saving page
        QAwindow.style.display = "none" //hide everything else
        time.textContent = "Time is up!"; // say time is up
    }
};




function renderScores() {
    scoresList.innerHTML = "";
  
    // Render a new li for each score 
    for (var i=0; i < scoreinput.length; i++) {
      var score = scoreinput[i];
      var name = nameinput[i];
      var li = document.createElement("li");
      li.textContent = "Name: " + name + " \- Score: " + score;
      li.setAttribute("data-index", i);
      scoresList.appendChild(li);
    }
};
function scoresPageInitialize() {
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var storednames = JSON.parse(localStorage.getItem("nameinput"));
    var storedscores = JSON.parse(localStorage.getItem("scoreinput"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storednames !== null) {
      nameinput = storednames;
    }
    if (storedscores !== null) {
        scoreinput = storedscores;
    }
    renderScores();
}








// Program the start button
startBtn.addEventListener('click', function(){
    resultSavePage.style.display="none"; //hide score saving div
    feedback.textContent = ""; // empty out the text of feedback

    QAwindow.style.display = "block"; //Show question and answer div
    index = 0; //reset index to reset the questions
    showQuestionAndAnswers(index); // show first question and answer

    clearInterval(interval); // clear any remaining timer from previous quizzes
    secondsLeft = 30; // set timer
    interval = setInterval(countdown,1000); //start timer
});

// program each answer button for every round of question
document.body.addEventListener("click", function(event){
    var target = event.target;
    if (target.classList.contains("answerbutton")){
        var correctanswer = target.getAttribute("data-correct");
        if (correctanswer) {
            feedback.textContent = "Correct!";
        }
        if(!correctanswer){
            feedback.textContent = "Wrong. -5 seconds";
            secondsLeft = secondsLeft-5;
        }

        index++; // move to next question set 

        if (index >= questionSets.length) { // if we run out of question sets,
        clearInterval(interval); // stop timer
        QAwindow.style.display = "none"; // hide question answer window
        resultSavePage.style.display="block"; // show result saving form
        resultEntry();
        }
        currentScore.textContent = secondsLeft;
        showQuestionAndAnswers(index) // show next question and asnwers
    }
});

// program the save button after quiz
saveScoreBtn.addEventListener("click", function(event) {
    event.preventDefault(); // do not refresh page
  
    var name = fname.value.trim(); 
  
    // Return from function early if submitted name is blank
    if (name === "") {
      return;
    }
  
    // Add new name and score with same indexes to array, clear the input
    nameinput.push(name);
    scoreinput.push(secondsLeft);
    fname.value = "";

    // Stringify and save score and name 
    // with respective keys in localStorage
    localStorage.setItem("nameinput", JSON.stringify(nameinput));
    localStorage.setItem("scoreinput", JSON.stringify(scoreinput));

});



scoresPageInitialize();


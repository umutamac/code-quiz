// var ScoresBtn = document.getElementById("scores-btn")
var startBtn = document.getElementById("start-btn")
var time = document.getElementById("time");

var index = 0;
var QAwindow = document.querySelector(".QA-window");
var question = document.getElementById("question");
var answerBtnsDiv = document.querySelector(".answer-buttons-div");
var feedback = document.querySelector(".feedback");

var resultSavePage = document.querySelector(".result-save-page");
var currentScore = document.getElementById("currentScore");
var saveScoreBtn = document.getElementById("saveScoreBtn");

var scoresPage = document.querySelector(".scores-page");

var nameinput = [];
var scoreinput = [];

var interval = 0; // introduce interval variable
var secondsLeft = 0; // introduce remaining time variable

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
    question.textContent = questionSets[index].question; // fill in question text with 1st question
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



function resultEntry(){ 
    currentScore.textContent = secondsLeft; // Display seconds left on score saving form
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







function init() {
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
//     renderTodos();
}
var nameinput = document.getElementById("fname");

function saveScore() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("nameinput", JSON.stringify(nameinput));
    localStorage.setItem("scoreinput", JSON.stringify(scoreinput));
}

function showScores(){  //when view scores is clicked,
    clearInterval(interval); //stop timer
    secondsLeft = 0;         //reset timer
    scoresPage.style.display = "block"; // show scores page
    QAwindow.style.display = "none"; //hide questions and answers
    resultSavePage.style.display="none"; // hide result save form
}


saveScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
  
    var todoText = todoInput.value.trim();
  
    // Return from function early if submitted todoText is blank
    if (todoText === "") {
      return;
    }
  
    // Add new todoText to todos array, clear the input
    todos.push(todoText);
    todoInput.value = "";
  
    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
});





// Program the start button
startBtn.addEventListener('click', function(){
    resultSavePage.style.display="none"; //hide score saving div
    scoresPage.style.display = "none";  //hide scores list div
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
        var isCorrect = target.getAttribute("data-correct");
        if (isCorrect) {
            feedback.textContent = "Correct!";
        }
        if(!isCorrect){
            feedback.textContent = "Wrong. -5 seconds";
            secondsLeft = secondsLeft-5;
        }
        index++;

        if (index >= questionSets.length) { // if we run out of question sets,
        clearInterval(interval); // stop timer
        QAwindow.style.display = "none"; // hide question answer window
        resultSavePage.style.display="block"; // show result saving form
        resultEntry();
        }
        showQuestionAndAnswers(index) // show next question and asnwers
    }
});

// ScoresBtn.addEventListener("click",showScores);




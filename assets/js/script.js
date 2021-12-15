var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var ulCreate = document.createElement("ul");
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 20;








var questions = [
    {
      title: "What attribute is used in html to decorate content?",
      choices: ["css", "class", "src", "style"],
      answer: "style"
    },
    {
      title: "An array’s length can be evaluated with the what property?",
      choices: [".loop", ".log", "the console", ".length"],
      answer: ".length"
    },
    {
      title: "Arrays in JavaScript can be used to store ______.",
      choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
      answer: "All of the Above"
    },
    {
      title: "String values must be enclosed within ______ when being assigned to variables.",
      choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
      answer: "Quotes"
    },
    {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "Terminal / Bash", "For Loops", "Console.log"],
      answer: "Console.log"
    }
  ];






  timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});





function render(questionIndex) {

    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
       
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("button");
        listItem.setAttribute("class", "btn btn-success");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}







function compare(event) {
    var element = event.target;

    if (element.matches("button")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer; 
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
 
    questionIndex++;

    if (questionIndex >= questions.length) {
      
        allDone();
    } else {
        render(questionIndex);
    }
}








function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";


    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

  
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

 
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);


    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);


    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.setAttribute("class", "btn btn-success");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);








    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./highscores.html");
        }
    });

}
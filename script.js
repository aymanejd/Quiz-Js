document.addEventListener("DOMContentLoaded", function () {
    let buttons = [];
    let qeust = 1;
    let set = 0;
    let quiz = document.querySelector(".quiz")
    let head = document.querySelector(".headr")
    const questions = [
        {
            question: "Which is the largest animal in the world?",
            answers: [
                { text: "Elephant", correct: false },
                { text: "Blue Whale", correct: true }, 
                { text: "Giraffe", correct: false },
                { text: "Hippopotamus", correct: false }
            ]
        },
        {
            question: "Which is the smallest continent in the world?",
            answers: [
                { text: "Africa", correct: false },
                { text: "Europe", correct: false },
                { text: "Australia", correct: true },
                { text: "South America", correct: false }
            ]
        },
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false },
                { text: "London", correct: false }
            ]
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: [
                { text: "Vincent van Gogh", correct: false },
                { text: "Pablo Picasso", correct: false },
                { text: "Leonardo da Vinci", correct: true },
                { text: "Michelangelo", correct: false }
            ]
        },
        {
            question: "What is the capital of Japan?",
            answers: [
                { text: "Beijing", correct: false },
                { text: "Tokyo", correct: true },
                { text: "Seoul", correct: false },
                { text: "Osaka", correct: false }
            ]
        },
        {
            question: "Who wrote the play 'Romeo and Juliet'?",
            answers: [
                { text: "William Shakespeare", correct: true },
                { text: "Charles Dickens", correct: false },
                { text: "Jane Austen", correct: false },
                { text: "Mark Twain", correct: false }
            ]
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Venus", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: false }
            ]
        },
        {
            question: "What is the largest ocean in the world?",
            answers: [
                { text: "Indian Ocean", correct: false },
                { text: "Atlantic Ocean", correct: false },
                { text: "Arctic Ocean", correct: false },
                { text: "Pacific Ocean", correct: true }
            ]
        },
        // New questions added
        {
            question: "Which element has the chemical symbol 'O'?",
            answers: [
                { text: "Oxygen", correct: true },
                { text: "Gold", correct: false },
                { text: "Osmium", correct: false },
                { text: "Oganesson", correct: false }
            ]
        },
        {
            question: "Who developed the theory of relativity?",
            answers: [
                { text: "Isaac Newton", correct: false },
                { text: "Nikola Tesla", correct: false },
                { text: "Albert Einstein", correct: true },
                { text: "Galileo Galilei", correct: false }
            ]
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            answers: [
                { text: "China", correct: false },
                { text: "Japan", correct: true },
                { text: "Thailand", correct: false },
                { text: "South Korea", correct: false }
            ]
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answers: [
                { text: "Gold", correct: false },
                { text: "Diamond", correct: true },
                { text: "Iron", correct: false },
                { text: "Platinum", correct: false }
            ]
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            answers: [
                { text: "Oxygen", correct: false },
                { text: "Nitrogen", correct: false },
                { text: "Carbon Dioxide", correct: true },
                { text: "Hydrogen", correct: false }
            ]
        },
        {
            question: "In which year did the Titanic sink?",
            answers: [
                { text: "1910", correct: false },
                { text: "1912", correct: true },
                { text: "1915", correct: false },
                { text: "1920", correct: false }
            ]
        }
    ];
    
    const questionElement = document.getElementById("question");
    const answersButton = document.getElementById("answer-buttons");
    const nextButton = document.querySelector("#next");
    let currentQuestionIndex = 0;
    let score = 0;
    
    let bt = document.createElement("button");
    bt.classList.add("btn");
    bt.textContent = "awnsers";
    answersButton.appendChild(bt);

    function showQuestion() {
        console.log(set)
        quesnombre();
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        let nombre = currentQuestionIndex + 1;
        questionElement.textContent = nombre + ". " + currentQuestion.question;
        questionElement.appendChild(answersButton);
        qeust += 1
        buttons = [];

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("btn");
            answersButton.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", () => {
                selectAnswer(button);
                disableAnswerButtons();
            });
            buttons.push(button);
        });

        nextButton.addEventListener("click", nextQuestion);
    }

    function resetState() {
        nextButton.style.display = "none";
        while (answersButton.firstChild) {
            answersButton.removeChild(answersButton.firstChild);
        }
    }

    function selectAnswer(selectedButton) {
        const isCorrect = selectedButton.dataset.correct;

        if (isCorrect) {
            selectedButton.classList.add("correct");
            score++;
        } else {
            selectedButton.classList.add("incorrect");

        }
        const correctButton = buttons.find(button => button.dataset.correct === "true");
        if (correctButton) {
            correctButton.classList.add("correct");
        }
        set = setTimeout(nextQuestion, 3000)
        nextButton.style.display = "block";
    }

    function disableAnswerButtons() {
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function nextQuestion() {
        clearTimeout(set)
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    function showScore() {
        questionElement.textContent = ""; 

        answersButton.innerHTML = "";
        nextButton.style.display = "none";
        head.style.display = "none";
        quiz.style.padding = "0px";
    
        const scoreContainer = document.createElement("div");
        scoreContainer.classList.add("score-container");
    
        const scoreMessage = document.createElement("h2");
        scoreMessage.textContent = `Your Score: ${score} out of ${questions.length}`;
        
        const motivationalMessage = document.createElement("p");
        motivationalMessage.textContent = score === questions.length 
            ? "Excellent work!" 
            : score > questions.length / 2 
            ? "Good job! Keep it up!" 
            : "Better luck next time!";
    
        scoreContainer.appendChild(scoreMessage);
        scoreContainer.appendChild(motivationalMessage);
    
        quiz.appendChild(scoreContainer);
    }
    
    let nomb = document.querySelector(".num")
    showQuestion();
    function quesnombre() {
        nomb.textContent = `${qeust} of ${questions.length} `
    }
});

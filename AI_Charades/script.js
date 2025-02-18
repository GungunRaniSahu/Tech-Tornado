
document.addEventListener("DOMContentLoaded", function () {
    const riddles = [
        { question: "I speak without a mouth and hear without ears. What am I?", answer: "Echo", hint: "I repeat what you say." },
        { question: "The more of me you take, the more you leave behind. What am I?", answer: "Footsteps", hint: "You leave me behind while walking." },
        { question: "I have keys but open no locks. What am I?", answer: "Piano", hint: "I make music when played." },
        // Add more riddles up to 30
    ];

    let currentRiddleIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 60;
    let timerRunning = false;

    function displayRiddle() {
        document.getElementById("riddle").textContent = riddles[currentRiddleIndex].question;
        document.getElementById("answer").value = "";
        document.getElementById("hint-text").classList.add("hidden");

        // Start timer only if it's not already running
        if (!timerRunning) {
            resetTimer();
        }
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 60;
        document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

        timer = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

            if (timeLeft === 0) {
                clearInterval(timer);
                timerRunning = false;
                skipRiddle();
            }
        }, 1000);
        timerRunning = true;
    }

    window.checkAnswer = function () {
        let userAnswer = document.getElementById("answer").value.trim().toLowerCase();
        let correctAnswer = riddles[currentRiddleIndex].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            score++;
            document.getElementById("score").textContent = score;
            showSuccessAnimation();
            
            // Move to the next riddle without restarting the timer
            currentRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
            document.getElementById("riddle").textContent = riddles[currentRiddleIndex].question;
            document.getElementById("answer").value = "";
            document.getElementById("hint-text").classList.add("hidden");
        } else {
            showErrorAnimation();
        }
    };

    window.skipRiddle = function () {
        currentRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
        document.getElementById("riddle").textContent = riddles[currentRiddleIndex].question;
        document.getElementById("answer").value = "";
        document.getElementById("hint-text").classList.add("hidden");
    };

    window.previousRiddle = function () {
        currentRiddleIndex = (currentRiddleIndex - 1 + riddles.length) % riddles.length;
        document.getElementById("riddle").textContent = riddles[currentRiddleIndex].question;
        document.getElementById("answer").value = "";
        document.getElementById("hint-text").classList.add("hidden");
    };

    window.showHint = function () {
        document.getElementById("hint-text").textContent = riddles[currentRiddleIndex].hint;
        document.getElementById("hint-text").classList.remove("hidden");
    };

    window.quitGame = function () {
        alert("Thanks for playing! Your final score: " + score);
        score = 0;
        document.getElementById("score").textContent = score;
        currentRiddleIndex = 0;
        displayRiddle();
    };

    function showErrorAnimation() {
        let gameContainer = document.getElementById("game-container");
        gameContainer.style.boxShadow = "0 0 30px red";
        setTimeout(() => {
            gameContainer.style.boxShadow = "0 0 15px #0f0";
        }, 500);
    }

    displayRiddle();
});

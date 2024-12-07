const UPPERCASE_START = 65;
const UPPERCASE_END = 90;

const words = ["list", "game", "strawberry", "hangman", "reality"];
const chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(chosenWord.length).fill("_");
let lives = 7;

function updateWordDisplay() {
    const wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.innerHTML = ' ';
    guessedWord.forEach(letter  => {
        const span = document.createElement("span");
        span.textContent = letter;
        wordDisplay.appendChild(span);
    });
}

function updateLivesDisplay() {
    const livesDisplay = document.getElementById("lives");
    livesDisplay.textContent = ' ';
    const livesText = document.createTextNode('Remaining lives: ' + lives);
    livesDisplay.appendChild(livesText);
}

function createLetterButtons() {
    const lettersContainer = document.getElementById("lettersContainer");
    for (let i = UPPERCASE_START; i <= UPPERCASE_END; ++i) {
        const button = document.createElement("button");
        button.className = "btn btn-secondary letter-btn";
        button.textContent = String.fromCharCode(i);
        button.addEventListener("click", () => 
            handleGuess(button.textContent.toLowerCase()));
        lettersContainer.appendChild(button);
    }
}

function handleGuess(letter) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        if (button.textContent.toLowerCase() == letter) {
            button.disabled = true;
        }
    });
    if (chosenWord.includes(letter)) {
        chosenWord.split("").forEach((char, index) => {
            if (char == letter) {
                guessedWord[index] = char;
            }
        });
    } else {
        --lives;
    }
    updateWordDisplay();
    updateLivesDisplay();
    checkGameStatus();
}

function checkGameStatus() {
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.innerHTML = ' ';
    if (guessedWord.join("") == chosenWord) {
        const successMessage = document.createElement("div");
        successMessage.className = "alert alert-success";
        successMessage.textContent = "Congratulations! You won!";
        resultMessage.appendChild(successMessage);
        disableAllButtons();
    } else if (lives === 0) {
        const failureMessage = document.createElement("div");
        failureMessage.className = "alert alert-danger";
        failureMessage.textContent = "You lost!";
        resultMessage.appendChild(failureMessage);        
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);
}
    
updateWordDisplay();
updateLivesDisplay();
createLetterButtons();
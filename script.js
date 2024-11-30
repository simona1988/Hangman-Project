const words = ["programare", "calculator", "internet", "joc", "javascript"];
const chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(chosenWord.length).fill("_");
let lives = 7;

function updateWordDisplay() {
    const wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.innerHTML = guessedWord.map(letter => `<span>${letter}</span>`).join("");
}

function updateLivesDisplay() {
    const livesDisplay = document.getElementById("lives");
    livesDisplay.textContent = `Vieți rămase: ${lives}`;
}

function createLetterButtons() {
    const lettersContainer = document.getElementById("lettersContainer");
    for (let i = 65; i <= 90; ++i) {
        const button = document.createElement("button");
        button.className = "btn btn-secondary letter-btn";
        button.textContent = String.fromCharCode(i);
        button.addEventListener("click", () => handleGuess(button.textContent.toLowerCase()));
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
            if (char == letter) guessedWord[index] = char;
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

    if (guessedWord.join("") == chosenWord) {
        resultMessage.innerHTML = `<div class="alert alert-success">Felicitări! Ai câștigat!</div>`;
        disableAllButtons();
    } else if (lives === 0) {
        resultMessage.innerHTML = `<div class="alert alert-danger">Ai pierdut!</div>`;
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
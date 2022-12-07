const synth = new Tone.Synth().toDestination();
const tones = ["F3", "G4", "D5", "F2"];
const keys = ["KeyA", "KeyB", "KeyC", "KeyD"];
const gameState = {
    patternState: [],
    playerState: []
};

function playTone (note) {
    synth.triggerAttackRelease(note, "8n");
    Tone.start();
}

function randomArrayElement (array) {
    const randomIndex = Math.random() * array.length;
    return array[Math.floor(randomIndex)];
}

function selectRandomToneAndPlay () {
    const btn = randomArrayElement(Array.from(btns));
    const index = btn.dataset.index;

    gameState.patternState.push(index);

    const clonedPattern = gameState.patternState.slice(0);

    const patternInterval = setInterval(function () {
        const i = clonedPattern.shift();

        btns[i].classList.toggle("on");

        playTone(tones[i]);

        setTimeout(function () {
            btns[i].classList.toggle("on");
        }, 500);

        if (clonedPattern.length === 0) {
            clearInterval(patternInterval);
        }
    }, 800);
}

function btnActivated (event) {
    const btn = event.target;
    const index = btn.dataset.index;

    gameState.playerState.push(index);

    playTone(tones[index]);

    if (gameState.patternState.length === gameState.playerState.length) {
        if (gameState.patternState.join("") === gameState.playerState.join("")) {
            gameState.playerState = [];

            selectRandomToneAndPlay();

            return true;
        }

        alert("Game over");
    }
}

const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn, index) {
    btn.dataset.index = index;

    btn.addEventListener("click", btnActivated);
});

document.onkeydown = function (event) {
    const keyCode = event.code;
    const index = keys.indexOf(keyCode);

    if (index !== -1) {
        btns[index].click();
        btns[index].classList.toggle("on");
    }
}

document.onkeyup = function (event) {
    const keyCode = event.code;
    const index = keys.indexOf(keyCode);

    if (index !== -1) {
        btns[index].classList.toggle("on");
    }
}

document.querySelector("button").onclick = function () {
    gameState.patternState = [];
    gameState.playerState = [];

    selectRandomToneAndPlay();
}
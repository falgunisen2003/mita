// let boxes = document.querySelectorAll('.box');
// let resetBtn = document.querySelector('#reset');
// let turnO = true; // Player O starts
// let newGameBtn = document.querySelector('#new-btn');
// let msgContainer = document.querySelector('.msg-container');
// let msg = document.querySelector('#msg');

// const winPatterns = [
//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8]
// ];

// boxes.forEach((box) => {
//     box.addEventListener('click', function () {
//         if (turnO) {
//             box.innerText = 'O';
//             box.style.color = 'green';
//             turnO = false;
//             box.disabled = true;
//             checkWinner();
//         } else {
//             box.innerText = 'X';
//             box.style.color = 'black';
//             turnO = true;
//             box.disabled = true;
//             checkWinner();
//         }
//     });
// });

// const enableBoxes = () => {
//     for (let box of boxes) {
//         box.disabled = false;
//         box.innerText = "";
//     }
// };

// const disableBoxes = () => {
//     for (let box of boxes) {
//         box.disabled = true;
//     }
// };

// const showWinner = (winner) => {
//     msg.innerText = `Congratulations, Winner is ${winner}`;
//     msg.style.color = "green";
//     msg.style.textAlign = "center";
//     msg.style.textShadow = "5px 5px 8px rgb(12, 34, 232)";
//     msgContainer.classList.remove('hide');
//     disableBoxes();
// };

// const checkWinner = () => {
//     let hasWin = false;
//     for (let pattern of winPatterns) {
//         let pos1Val = boxes[pattern[0]].innerText;
//         let pos2Val = boxes[pattern[1]].innerText;
//         let pos3Val = boxes[pattern[2]].innerText;

//         if (pos1Val !== "" && pos2Val!=="" && pos3Val!=="" 
//             && pos1Val === pos2Val && pos2Val === pos3Val) {
//             showWinner(pos1Val);
//             hasWin = true;
//             return;
//         }
//     }

//     if (!hasWin) {
//         const allBoxes = [...boxes].every((box) => box.innerText !== "");
//         if (allBoxes) {
//             msgContainer.classList.remove('hide');
//             msg.innerText = 'Match Drawn';
//             msg.style.color = "green";
//             msg.style.textAlign = "center";
//             msg.style.textShadow = "5px 5px 8px rgb(6, 33, 234)";
//             msg.style.marginTop="20 px";
//         }
//     }
// };

// const resetGame = () => {
//     turnO = true;
//     enableBoxes();
//     msgContainer.classList.add('hide');
// };

// newGameBtn.addEventListener('click', resetGame);
// resetBtn.addEventListener('click', resetGame);


let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let turnO = true; // User starts

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

// Function to check if there's a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
        }
    }

    // Check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = 'Match Drawn';
        msgContainer.classList.remove('hide');
        return true;
    }
    return false;
};

// Function to display the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.style.color = "green";
    msg.style.textAlign = "center";
    msg.style.textShadow = "5px 5px 8px rgb(12, 34, 232)";
    msgContainer.classList.remove('hide');
    disableBoxes();
};

// Function to disable all boxes after a win
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Function to enable all boxes for a new game
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Function for AI to make a move
const computerMove = () => {
    let emptyBoxes = [...boxes].filter(box => box.innerText === "");
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerText = 'X';
        randomBox.style.color = 'black';
        randomBox.disabled = true;

        if (!checkWinner()) {
            turnO = true; // Give turn back to the player
        }
    }
};

// Function to handle player move
boxes.forEach(box => {
    box.addEventListener('click', function () {
        if (turnO) {
            box.innerText = 'O';
            box.style.color = 'green';
            box.disabled = true;
            turnO = false;

            if (!checkWinner()) {
                setTimeout(computerMove, 500); // Let AI play after user move
            }
        }
    });
});

// Function to reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

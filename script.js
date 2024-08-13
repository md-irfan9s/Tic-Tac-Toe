const boxes = document.querySelectorAll(".box");
const GameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

// generate winning positon 
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // Even, I can change color with the help of css properties using backticks 

    })
    newGameBtn.classList.remove("active");
    GameInfo.innerText = `Current Player - ${currentPlayer}`;

    // if player X or O has Won, then remove green color
    winningPosition.forEach((position) => {
        boxes[position[0]].classList.remove("win");
        boxes[position[1]].classList.remove("win");
        boxes[position[2]].classList.remove("win");
    });
}

initGame();


function swapTurn() {
    // if Current Player is X then Switch to O
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // Upadation in UI 
    GameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function CheckGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        // all boxes should not be equal and even all boxes of values are same 
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] ===
                gameGrid[position[2]] )) {

                    // check if winner is X and winner is O
                    if(gameGrid[position[0]] === "X") 
                        answer = "X";
                    else    
                        answer = "O";

                    // disable pointer events 
                    boxes.forEach((box) => {
                        box.style.pointerEvents = "none";
                    })

                    // now we got the winner 
                    boxes[position[0]].classList.add("win");
                    boxes[position[1]].classList.add("win");
                    boxes[position[2]].classList.add("win");
                }
    });

    // now we have winner 

    if(answer !== "") {
        GameInfo.innerText = `Winner Player ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount = 0;

    gameGrid.forEach((box) => {
        if(box != "")
            fillCount++;
    });

    // if all boxes are filled then render GAME TIED!
    if(fillCount == 9) {
        GameInfo.innerText = "Game Tied! ";
        newGameBtn.classList.add("active");
    }


}

function handleClick(index) {
    if(gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;   // Insert current player in  UI 
        gameGrid[index] = currentPlayer;    // insert current player in an each boxes
        boxes[index].style.pointerEvents = "none";
        swapTurn();             // Swap the current player 

        CheckGameOver();            // Check current player is win or not

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
})

newGameBtn.addEventListener("click", initGame);
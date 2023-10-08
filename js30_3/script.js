let player = 'X', stepCount = 0; winner = false; gamesAmount = 0; winNumberX = 0; winNumberO = 0; draw = 0;
let winCombinations = [
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [2,5,8],
    [3,6,9],
    [3,5,7],
    [4,5,6],
    [7,8,9]
],
dataX = [];
dataO = [];

const gameBlock = document.querySelector(".game"),
      gameTitle= document.querySelector(".game-title"),
      gameItem = document.querySelectorAll(".game_item"),
      clearBtn = document.querySelector(".clear");
      gamesCount = document.querySelector(".gamesAmount");
      winX = document.querySelector(".winX");
      winO = document.querySelector(".winO");
      drawCount = document.querySelector(".draw");

for (let i = 0; i < gameItem.length; i++) {
    gameItem[i].addEventListener('click', currentChoice)
}

function currentChoice(e) {
        let num = Number(e.target.getAttribute("data-ceil"));
        winner = false;
        if (stepCount == 0 || stepCount % 2 ===0) {
            currentChoiceX(e);
            dataX.push(num);
            if (dataX.length > 2 && checkWinner(dataX, num)) {
                checkWinner(dataX, num);
            }
        }
        else {
            currentChoiceO(e);
            dataO.push(num);
            if (dataO.length > 2 && checkWinner(dataO, num)) {
                checkWinner(dataO, num);
            }
        }
        stepCount++;
        if (stepCount===9 && winner === false) {
            gamesAmount++;
            draw++;
            gameTitle.innerText ="Ничья";
            gamesCount.innerText ="Количество игр " + gamesAmount;
            drawCount.innerText = "Количество ничьих = " + draw;
            localStorage.setItem('gamesAmount', gamesAmount);
            localStorage.setItem('winner', "X+O");
            localStorage.setItem('draw', draw);
        }
        else if (winner === true){
            gameTitle.innerText ="Победил игрок " + player + "\nна " + stepCount + " ходу игры";
            gamesAmount++;
            gamesCount.innerText ="Количество игр = " + gamesAmount;
            player === 'X' ? (winNumberX++) : (winNumberO++);
            winX.innerText = "Количество побед Х игрока = " + winNumberX;
            winO.innerText = "Количество побед O игрока = " + winNumberO;
            localStorage.setItem('gamesAmount', gamesAmount);
            localStorage.setItem('winner', player);
            localStorage.setItem('winNumberX', winNumberX);
            localStorage.setItem('winNumberO', winNumberO);
            localStorage.setItem('draw', draw);
        }
        else if (winner === false) {
            if (player == 'X') {
                gameTitle.innerText ="Ходит игрок O";
            }
            else {
                gameTitle.innerText ="Ходит игрок X";
            }
        }
    }

function currentChoiceX (e) {
    let step = document.createElement("span");
    player = "X";
    step.classList = 'playerName'
    step.innerText = "X";
    e.target.appendChild(step);
    e.target.removeEventListener('click', currentChoice)
}

function currentChoiceO (e) {
    let step = document.createElement("span");
    player = "O";
    step.classList = 'playerName'
    step.innerText = "O";
    e.target.appendChild(step);
    e.target.removeEventListener('click', currentChoice)
}

clearBtn.addEventListener('click', clearGame);

function clearGame() {
    gameItem.forEach(item => item.innerText ="");
    dataX = [];
    dataO = [];
    player = "X";
    stepCount = 0;
    gameTitle.innerText ="Ходит игрок " + player;
    for (let i = 0; i < gameItem.length; i++) {
        gameItem[i].addEventListener('click', currentChoice)
    }
}

function checkWinner(array, number) {
        for (let j=0; j < winCombinations.length; j++){
            let winArray = winCombinations[j];
            count = 0;
            if (winArray.indexOf(number) !== -1) {
                for (let t = 0; t < winArray.length; t++) {
                    if (array.indexOf(winArray[t]) !== -1) {
                        count++;
                        console.log(count)
                        if (count === 3) {
                            winner = true;
                            for (let i = 0; i < gameItem.length; i++) {
                                gameItem[i].removeEventListener('click', currentChoice)
                            }
                        }
                    }
                }
                count = 0;
            }
        }
    }
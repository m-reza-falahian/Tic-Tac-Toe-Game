const winingMoods = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"], ["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"], ["00", "11", "22"], ["02", "11", "20"]]
const winningLine = document.querySelector(".winner-line");
let spaces = document.querySelectorAll(".space");
let board;
let turn;
let x;
let o;
let winner = null;
let gStatus;

//print the game status
function gameStatus(st) {
    switch (st) {
        case "x":
            gStatus = "X winned";
            break;
        case "o":
            gStatus = "O winned";
            break;
        case "=":
            gStatus = "Equal";
            break;
        default:
            gStatus = "";
            break;
    }
    document.querySelector(".winner-status").innerHTML = gStatus;
}

//check the table
function wCheck() {
    let i = 0;
    while (i <= 1) {
        r = i ? x : o;
        winingMoods.map(a => {
            q = 0;
            a.map(s => {
                if (r.includes(s)) q++;
            })
            if (q == 3) {
                if (i == 1) gameStatus("x"); else gameStatus("o");
                winner = a;
                spaces.forEach((item) => {
                    document.getElementById('' + item.id).style.pointerEvents = "none";
                });
                pWinningLine();
            }
        }
        )
        i++;
    }
    if ((x.length + o.length) == 9 && winner == null) gameStatus("=");
}

//Print the game-board and information box
function print() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != undefined) document.getElementById(i + "" + j).innerHTML = board[i][j] ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-circle"></i>';
            else document.getElementById(i + "" + j).innerHTML = "";
        }
    }
    turn = turn ? 0 : 1;
    let dturn = document.querySelector(".inf-main h3");
    dturn.innerHTML = turn ? "X turn" : "O turn";
    wCheck();
}

//print winning line 
function pWinningLine() {
    const winnigMood = (mood) => mood == winner;
    let winningNum = winingMoods.findIndex(winnigMood);
    console.log(winningNum);
    winningLine.style.display = "block";
    switch (winningNum) {
        case 0:
            winningLine.style.bottom = "83.2%";
            break;
        case 1:
            winningLine.style.bottom = "50%";
            break;
        case 2:
            winningLine.style.bottom = "16.5%";
            break;
        case 3:
            winningLine.style.rotate = "90deg";
            winningLine.style.left = "-29%";
            break;
        case 4:
            winningLine.style.rotate = "90deg";
            winningLine.style.left = "";
            break;
        case 5:
            winningLine.style.rotate = "90deg";
            winningLine.style.left = "39%";
            break;
        case 6:
            winningLine.style.rotate = "45deg";
            winningLine.style.width = "115%";
            break;
        case 7:
            winningLine.style.rotate = "135deg";
            winningLine.style.width = "115%";
            break;
        default:
            winningLine.style.display = "none";
            break;
    }
}

//add a sign
function add(i, j, id) {
    if (board[i][j] == undefined) {
        board[i][j] = turn;
        if (turn == 1) x.push(i + "" + j); else o.push(i + "" + j);
        document.getElementById(id).style.pointerEvents = "none";
        print();
    } else {
        document.querySelector(".error").innerHTML = "Space has selected";
        document.querySelector(".error").style.display = "flex";
    }
}

//start & restarting the game 
function start() {
    x = [];
    o = [];
    board = [[], [], []];
    winner = null;
    winningLine.style.display = "none";
    winningLine.style.width = "90%";
    winningLine.style.rotate = "0deg";
    winningLine.style.bottom = "50%";
    winningLine.style.left = "";
    spaces.forEach((item) => {
        document.getElementById(item.id).style.pointerEvents = "auto";
    });
    turn = Math.floor(Math.random() * 2);
    gameStatus(null);
    print();
}

spaces.forEach((item) => {
    item.addEventListener("click", () => {
        let space = item.id.split("");
        document.querySelector(".error").innerHTML = "";
        document.querySelector(".error").style.display = "none";
        add(space[0], space[1], item.id);
    });
});

document.querySelector(".new-game").addEventListener("click", start)

start();
print();
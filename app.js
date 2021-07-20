const player = "O";
const computer = "X";

// "computer" - Play with the computer
// "player"   - 2 player game
var opponent = "player"
var active_player;

var board_full = false;
var play_board = ["", "", "", "", "", "", "", "", ""];
var moveTTT = [
  [4, 0, 8],
  [4, 2, 6],
  [4, 1, 7],
  [4, 3, 5],
  [0, 2, 1],
  [6, 8, 7],
  [0, 6, 3],
  [2, 8, 5]  
];

const board_container = document.querySelector(".play-area");

const winner_statement = document.getElementById("winner");

check_board_complete = () => {
  let flag = true;
  play_board.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = flag;
};

const check_line = (a, b, c) => {
  return (
    play_board[a] == play_board[b] &&
    play_board[b] == play_board[c] &&
    (play_board[a] == player || play_board[a] == computer)
  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 1}`).classList.add("win");
      document.querySelector(`#block_${i + 2}`).classList.add("win");
      return play_board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 3}`).classList.add("win");
      document.querySelector(`#block_${i + 6}`).classList.add("win");
      return play_board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    document.querySelector("#block_0").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_8").classList.add("win");
    return play_board[0];
  }
  if (check_line(2, 4, 6)) {
    document.querySelector("#block_2").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_6").classList.add("win");
    return play_board[2];
  }
  return "";
};

const check_for_winner = () => {
  let res = check_match()
  if (res == player) {
    winner.innerText = "Winner is player!!";
    winner.classList.add("playerWin");
    board_full = true
  } else if (res == computer) {
    winner.innerText = "Winner is computer";
    winner.classList.add("computerWin");
    board_full = true
  } else if (board_full) {
    winner.innerText = "Draw!";
    winner.classList.add("draw");
  }
};

const render_board = () => {
  board_container.innerHTML = ""
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const game_loop = () => {
  render_board();
  check_board_complete();
  check_for_winner();
}

const addPlayerMove = e => {
  if (!board_full && play_board[e] == "") {
    play_board[e] = active_player;

    game_loop();
      
    if (opponent == "computer") 
      addComputerMove()
    else {
      if(active_player == computer)
        active_player = player;
      else
        active_player = computer;
    }
  }
};

const addComputerMove = () => {
  if (!board_full) {
    /*
    do {
      selected = Math.floor(Math.random() * 9);
    } while (play_board[selected] != "");*/

    let maxDirC = 0, maxDirP = 0, maxScoreC = 0, maxScoreP = 0;
    let dir;
    for(dir = 0; dir < 8; dir++) {
      let a, b, c;
      let scoreP, scoreC;
      // extract cell values 
      a = play_board[moveTTT[dir][0]];
      b = play_board[moveTTT[dir][1]];
      c = play_board[moveTTT[dir][2]];

      // score for player 
      scoreP = ((a==player)+(b==player)+(c==player))*((a!=computer)*(b!=computer)*(c!=computer));
      // score for computer
      scoreC = ((a==computer)+(b==computer)+(c==computer))*((a!=player)*(b!=player)*(c!=player));
      // Finding highest score and direction for player
      if (scoreP > maxScoreP) {
        maxScoreP = scoreP;
        maxDirP = dir;
      }
      // Finding highest score and direction for computer
      if (scoreC > maxScoreC) {
        maxScoreC = scoreC;
        maxDirC = dir;
      }
    }

    // Blocking the player's move
    if (maxScoreP > maxScoreC) {
      for (var i=0; i<3; i++) {
        let index;
        index = moveTTT[maxDirP][i];
        if (play_board[index] == "") {
          selected = index;
          break;
        }
      }
    }
    else {
      for (var i=0; i<3; i++) {
        let index;
        index = moveTTT[maxDirC][i];
        if (play_board[index] == "") {
          selected = index;
          break;  
        }
      }
    }
    console.log(selected)
    play_board[selected] = computer;
    game_loop();
    active_player = player;
  }
};

const chooseRandomPlayer = () => {
  if (parseInt(Math.random()*10) % 2 == 0) {
    active_player = player;
    console.log("Player to play first")
  }
  else {
    active_player = computer;
    addComputerMove();
    console.log("Computer to play first")
  }
}


const reset_board = () => {
  play_board = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  if (opponent == "computer") {
    chooseRandomPlayer();
  }
  render_board();
};

/* When the user selects the opponent as computer */
function opponentComputer() {
  opponent = "computer"
  document.getElementById("dropDownContentID").classList.toggle("show");
  playingAgainst.innerText = "Playing against Computer!!";
  reset_board();
  active_player = player;
}

/* When the user selects the opponent as player */
function opponentPlayer() {
  opponent = "player"
  document.getElementById("dropDownContentID").classList.toggle("show");
  playingAgainst.innerText = "Playing against another player!!";
  reset_board()
  active_player = player
}

function opponentAI() {
  opponent = "AI"
  document.getElementById("dropDownContentID").classList.toggle("show");
  playingAgainst.innerText = "Playing against AI!!";
  reset_board()
  active_player = player
}

function buttonClick() {
  document.getElementById("dropDownContentID").classList.toggle("show");
}

if (opponent == "computer") {
  playingAgainst.innerText = "Playing against Computer!!";
  chooseRandomPlayer();
}
else {
  playingAgainst.innerText = "Playing against another player!!";
  active_player = player;
}

//initial render
render_board();

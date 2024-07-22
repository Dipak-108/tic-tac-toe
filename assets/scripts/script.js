let allDivs = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"];
let userOccupied = [];
let computerOccupied = [];
let bestMoves = [];

let index;
let userChoice;
let computerChoice;

let userChoiceContainer = document.getElementsByClassName("userchoice")[0];
let resetbtn = document.getElementById("reset_btn");
let winnerMessage = document.getElementById("winnerMessage");
let container =document.getElementsByClassName("container")[0];

let images = {
  O: "./images/O.png",
  X: "./images/X.png",
};

let winnerPattern = [
  ["a1", "a2", "a3"],
  ["a4", "a5", "a6"],
  ["a7", "a8", "a9"],
  ["a1", "a4", "a7"],
  ["a2", "a5", "a8"],
  ["a3", "a6", "a9"],
  ["a1", "a5", "a9"],
  ["a3", "a5", "a7"],
]; //all the winning pattern are listed here to check later during the game

// get user choice and computer choice
function getUserChoice(event) {
  if (event) {
    userChoice = event.target.id;
    userChoice === "O" ? (computerChoice = "X") : (computerChoice = "O");
    userChoiceContainer.style.display = "none";
    resetbtn.style.display = "block";
  }
  return [userChoice, computerChoice];
}

//get which box is selected by user in the game
function selectDiv(event) {
  currentDiv = event.target.id;
  userChoice = getUserChoice()[0];
  computerChoice = getUserChoice()[1];
  if (!userChoice) {
    alert("First choose a sign to start game");
    return;
  }
  userMove();
  setTimeout(computerMove, 1000);
  return currentDiv;
}

//function to play computer move
function userMove() {
  container.style.pointerEvents="none";
  userChoice = getUserChoice()[0];
  document.getElementById(
    currentDiv
  ).innerHTML = `<img src=${images[userChoice]} alt="">`;
  userOccupied.unshift(currentDiv);
  userOccupied.sort();

  allDivs.splice(allDivs.indexOf(currentDiv), 1);
  checkWinner(userOccupied, userChoice);
  setTimeout(() => {
    if (allDivs.length == 0) {
      movesFinish();
    }
  }, 1500);
  return [allDivs, userOccupied];
}

//function to play computer move
function computerMove() {
  container.style.pointerEvents="auto";
  container.addEventListener('onreload', function (event){
    event.stopPropagation();
      })
  computerChoice = getUserChoice()[1];

  returnProbableWinningmove(computerOccupied); //sends computer occupied divs for winning move if exist
  if (
    bestMoves.find((move) => {
      allDivs.includes(move);
    })
  ) {
    computerChosenDiv = bestMoves.find((move) => allDivs.includes(move));
  } else {
    returnProbableWinningmove(userOccupied);
  }

  index = Math.floor(Math.random() * allDivs.length);
  //checks if element of best move is present in allDivs(remaining divs) or not
  let computerChosenDiv =
    bestMoves.find((move) => allDivs.includes(move)) || allDivs[index]; //bestMoves comes from returnProbableWinningmove() function
  computerOccupied.push(computerChosenDiv);

  allDivs.splice(allDivs.indexOf(computerChosenDiv), 1);
  document.getElementById(
    computerChosenDiv
  ).innerHTML = `<img src=${images[computerChoice]} alt="">`;

  checkWinner(computerOccupied, computerChoice);

  return computerOccupied;
}

//function to check if any of the player is winner or not after 3 move are done
function checkWinner(checkDiv, playerSymbol) {
  if (checkDiv.length < 3) {
    return;
  }
  checkDiv.sort();

  for (let i = 0; i < winnerPattern.length; i++) {
    let winningArr = [...winnerPattern[i]];
    let didWin = winningArr.every((element) => checkDiv.includes(element));

    if (didWin) {
      winnerMessage.style.display = "block";
      winnerMessage.innerHTML = `<span><p>🎉congratulations🎉 </p><img src=${images[playerSymbol]} alt=""> <p>🎉won🎉</p></span>`;
      movesFinish();
      return;
    }
  }
}

//done to check if user has any winning move and computer plays that move to neutralize user
function returnProbableWinningmove(xoccupied) {
  if (xoccupied.length >= 2) {
    for (let i = 0; i < xoccupied.length - 1; i++) {
      let IthArrayKey = xoccupied[i]; //[1,2,3,4] takes 1 initially
      let searchingCombination = [];
      for (let j = i + 1; j < xoccupied.length; j++) {
        let takenTogetherarray = xoccupied[j]; //[1,2,3,4] takes 2 initially
        searchingCombination.push(IthArrayKey, takenTogetherarray); //pairs 1 with 2 and moves forward, next time its 1,3 and 1,4
        searchingCombination.sort();
        for (let k = 0; k < winnerPattern.length; k++) {
          let bestMoveArr = [...winnerPattern[k]]; //done to avoid mutation of global winnerPattern array

          let doesContain = searchingCombination.every((element) =>
            bestMoveArr.includes(element)
          );

          if (doesContain) {
            searchingCombination.forEach((element) => {
              bestMoveArr.splice(bestMoveArr.indexOf(element), 1);
            }); //checks if each element of searching combinatin is in each array of winning pattern or not  [bestMoveArr=winningPattern[k]]

            if (!bestMoves.includes(bestMoveArr[0]))
              bestMoves.push(bestMoveArr[0]);
          }
        }
      }
    }
  }
}

//function to reload the game if all moves are finished
function movesFinish() {
  setTimeout(() => {
    alert("do you still want to play?");
    window.location.reload();
  }, 2000);
}

//function to reload window after player clicks reset button
resetbtn.addEventListener("click", function () {
  window.location.reload();
});

let allDivs = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"];
let userOccupied = [];
let computerOccupied = [];
let index;
let userChoice;
let computerChoice;
let userChoiceContainer = document.getElementsByClassName("userchoice")[0];
let resetbtn = document.getElementById("reset_btn");
let images = {
  O: "./images/O.png",
  X: "./images/X.png",
};
let winnerPattern = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

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
  setTimeout(computerMove, 2000);
  return currentDiv;
}

function userMove() {
  userChoice = getUserChoice()[0];
  document.getElementById(
    currentDiv
  ).innerHTML = `<img src=${images[userChoice]} alt="">`;
  userOccupied.push(currentDiv);
  allDivs.splice(allDivs.indexOf(currentDiv), 1);
  setTimeout(() => {
    if (allDivs.length == 0) {
      movesFinish();
    }
  }, 1500);
  return [allDivs, userOccupied];
}

function computerMove() {
  computerChoice = getUserChoice()[1];
  index = Math.floor(Math.random() * allDivs.length);
  computerChosenDiv = allDivs[index];
  computerOccupied.push(computerChosenDiv);
  allDivs.splice(allDivs.indexOf(computerChosenDiv), 1);
  document.getElementById(
    computerChosenDiv
  ).innerHTML = `<img src=${images[computerChoice]} alt="">`;

  return computerOccupied;
}

function checkWinner(checkDiv,playerSymbol) {
if(checkDiv.length<3){
  return;
}
}

resetbtn.addEventListener("click", function () {
  window.location.reload();
});


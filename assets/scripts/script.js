let allDivs = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"];
let userOccupied = [];
let computerOccupied = [];
let index;
let userChoice;
let computerChoice;
let userChoiceContainer = document.getElementsByClassName("userchoice")[0];
let resetbtn = document.getElementById("reset_btn");
let winnerMessage = document.getElementById("winnerMessage");
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
  setTimeout(computerMove, 1300);
  return currentDiv;
}

function userMove() {
  userChoice = getUserChoice()[0];
  document.getElementById(
    currentDiv
  ).innerHTML = `<img src=${images[userChoice]} alt="">`;
  userOccupied.unshift(currentDiv);
  allDivs.splice(allDivs.indexOf(currentDiv), 1);
  checkWinner(userOccupied, userChoice);
  setTimeout(() => {
    if (allDivs.length == 0) {
      movesFinish();
    }
  }, 1500);
  return [allDivs, userOccupied];
}

function computerMove() {
  computerChoice = getUserChoice()[1];
  // console.log(userOccupied.length);
  if (userOccupied.length >= 2) {
    for (let i = 0; i < userOccupied.length - 1; i++) {
      let takenArrayKey = userOccupied[i];
      for (let j = i + 1; j < userOccupied.length; j++) {
        let abc = [];
        let takenTogetherarray = userOccupied[j];
        abc.push(takenArrayKey, takenTogetherarray);
        abc.sort();
        for (let k = 0; k < winnerPattern.length - 1; k++) {
          let bestMoveArr = winnerPattern[k];
          // console.log(abc);

          let didWin = abc.every((element) => bestMoveArr.includes(element));

          if(didWin===true){
            console.log(bestMoveArr); //completed till the best array is found, tomorrow this needs to be refactored
          }
        }
        
      }
    }
  }

  index = Math.floor(Math.random() * allDivs.length);
  computerChosenDiv = allDivs[index];
  computerOccupied.push(computerChosenDiv);
  allDivs.splice(allDivs.indexOf(computerChosenDiv), 1);
  document.getElementById(
    computerChosenDiv
  ).innerHTML = `<img src=${images[computerChoice]} alt="">`;
  checkWinner(computerOccupied, computerChoice);

  return computerOccupied;
}

function checkWinner(checkDiv, playerSymbol) {
  if (checkDiv.length < 3) {
    return;
  }
  checkDiv.sort();

  for (let i = 0; i < winnerPattern.length; i++) {
    let winningArr = winnerPattern[i];

    let didWin = winningArr.every((element) => checkDiv.includes(element));
    if (didWin === true) {
      winnerMessage.style.display = "block";
      winnerMessage.innerHTML = `<span><p>🎉congratulations🎉 </p><img src=${images[playerSymbol]} alt=""> <p>🎉won🎉</p></span>`;
      movesFinish();
    }
  }
}

resetbtn.addEventListener("click", function () {
  window.location.reload();
});

function movesFinish() {
  setTimeout(() => {
    alert("do you still want to play?");
    window.location.reload();
  }, 2000);
}

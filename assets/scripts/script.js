let allDivs = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"];
let userOccupied = [];
let computerOccupied = [];
let thisss = [];
let fileldDivs = [];
let userChoice;
let computerChoice;
let userChoiceContainer = document.getElementsByClassName("userchoice")[0];
let resetbtn = document.getElementById("reset_btn");
let images = {
  O: "./images/O.png",
  X: "./images/X.png",
};

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

function selectDiv(event) {
  currentDiv = event.target.id;
  userChoice = getUserChoice()[0];
  computerChoice = getUserChoice()[1];
  if (!userChoice) {
    alert("First choose a sign to start game");
    return;
  }

  let userOccupied = userMove()[1];
  // JSON.parse(userOccupied);
  console.log(userOccupied);

  setTimeout(() => {
    let computerOccupied = computerMove();

    console.log(`tyoe of cmr ${typeof computerOccupied}`);
  }, 2000);

  return currentDiv;
}

function userMove() {
  userChoice = getUserChoice()[0];
  document.getElementById(
    currentDiv
  ).innerHTML = `<img src=${images[userChoice]} alt="">`;
  userOccupied.push(currentDiv);
  allDivs.splice(allDivs.indexOf(currentDiv), 1);
  // console.log(allDivs);
  return [allDivs, userOccupied];
}

function computerMove() {
  computerChoice = getUserChoice()[1];

  function choosingIndex() {
    return Math.floor(Math.random() * allDivs.length) + 1;
  }

  let index = choosingIndex();

  computerChosenDiv = allDivs[index];
  while (userOccupied.includes(computerChosenDiv)) {
    index = choosingIndex();
    console.log("index was same");
  }
  computerChosenDiv = allDivs[index];
  computerOccupied.push(computerChosenDiv);
  allDivs.splice(allDivs.indexOf(computerChosenDiv), 1);
  document.getElementById(
    computerChosenDiv
  ).innerHTML = `<img src=${images[computerChoice]} alt="">`;

  return computerOccupied;
}

resetbtn.addEventListener("click", function () {
  window.location.reload();
});

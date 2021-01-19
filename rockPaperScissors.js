

const buttons = document.querySelectorAll(".game-buttons");
buttons.forEach(button => button.addEventListener("click", onButtonClick));

function onButtonClick(e){
    const playerSelection = (e.target.id).substr(0,1).toUpperCase() + (e.target.id).substr(1);
    round(playerSelection);
}


const gameStateEnum = Object.freeze({"win":0, "lose":1, "tie":2, "invalid":3});
const textColorEnum = Object.freeze({"rock":" #F5654D", "paper":"#5FBDBC", "scissors":" #F7BE3B"});
let playerScore = 0;
let computerScore = 0;
let roundCount = 0;

function computerPlay(){
    let gameOptions = Array("Rock", "Paper", "Scissors");
    return gameOptions[Math.floor(Math.random() * gameOptions.length)];
}



function playRockPaperScissors(playerSelection, computerSelection){
    playerSelection = playerSelection.toLowerCase();
    switch(playerSelection){
        case "rock":
            if (computerSelection == "Rock"){
                return gameStateEnum.tie;
            } else if(computerSelection == "Paper"){
                return gameStateEnum.lose;
            } else if(computerSelection == "Scissors"){
                return gameStateEnum.win;
            }
            break;
        case "paper":
            if (computerSelection == "Rock"){
                return gameStateEnum.win;
            } else if(computerSelection == "Paper"){
                return gameStateEnum.tie;
            } else if(computerSelection == "Scissors"){
                return gameStateEnum.lose;
            }
            break;
        case "scissors":
            if (computerSelection == "Rock"){
                return gameStateEnum.lose;
            } else if(computerSelection == "Paper"){
                return gameStateEnum.win;
            } else if(computerSelection == "Scissors"){
                return gameStateEnum.tie;
            }
            break;
        default:
            return gameStateEnum.invalid;
    }

}

function round(playerSelection){

    let computerSelection = computerPlay();
    let roundOutcome = playRockPaperScissors(playerSelection, computerSelection);
    roundCount++;

    const roundScores = document.querySelector("#round-scores");
    const roundElement = roundScores.querySelector("#round");
    roundElement.textContent = roundCount;
    const result = roundScores.querySelector("#result");
    let roundResult = "";
    let roundColor = "";

    const compChoice = document.querySelector("#comp-image");
    compChoice.style.backgroundImage = `url(images/${computerSelection.toLowerCase()}.jpg)`;

    if (roundOutcome == gameStateEnum.win){
        playerScore++;
        const playerScoreElement = roundScores.querySelector("#player-score");
        playerScoreElement.textContent = playerScore;
        roundResult = `${playerSelection} beats ${computerSelection}. Player wins round!`;
        roundColor = textColorEnum[playerSelection.toLowerCase()];
    } else if (roundOutcome == gameStateEnum.lose){ 
        computerScore++;
        const compScoreElement = roundScores.querySelector("#comp-score");
        compScoreElement.textContent = computerScore;
        roundResult = `${playerSelection} is beaten by ${computerSelection}. Computer wins round :(`;
        roundColor = textColorEnum[computerSelection.toLowerCase()];
    } else if (roundOutcome == gameStateEnum.tie){
        roundResult = `${playerSelection} ties ${computerSelection}. No winner this round.`;
        roundColor = "black";
    }

    
    result.style.color = roundColor;
    result.textContent = roundResult;
    
    //If one of the players has reached 5 points end the game
    if (computerScore === 5 || playerScore === 5){
        let gameResult = "";
        if (computerScore === 5){
            gameResult = "Computer won this game :("
        } else{
            gameResult = "You won this game!"
        }
        const gameResultElement = document.querySelector("#game-result");
        gameResultElement.textContent = gameResult;
        const newGameButtonElement = document.querySelector("#new-game");
        newGameButtonElement.style.visibility = "visible";
        newGameButtonElement.addEventListener("click", function(e){
            location.reload();
        });
        
        //Remove event listeners from the buttons
        buttons.forEach(button => button.removeEventListener("click", onButtonClick));
    }
    
}
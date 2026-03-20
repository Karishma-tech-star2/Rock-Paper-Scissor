let userScore=0;
let compuScore=0;

const right = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorepara = document.querySelector("#user-score");
const compuScorepara = document.querySelector("#compu-score");
const compImg = document.querySelector("#comp-img");
const exitBtn = document.querySelector("#exit-btn");
const resetBtn = document.querySelector("#reset-btn");

const genCompuChoice = () => {
    const options = ["rock","paper","scissor"];
    const randIdx= Math.floor(Math.random()*3);
    return options[randIdx];
};

const drawGame = () =>{
    console.log("Game was Draw.");
    msg.innerText="Game was draw, PLAY Again";
    msg.style.backgroundColor = "#FFF2D0";
}

const showWinner=(userwin,userchoice,compuChoice)=>{
    if(userwin)
        {
           userScore++; 
           userScorepara.innerText = userScore;
           console.log("You win!");
           msg.innerText=`You Win! You ${userchoice} beats ${compuChoice}`;
           msg.style.backgroundColor = "green";
        }
    else
        {   
            compuScore++;
            compuScorepara.innerText = compuScore;
            console.log("You lose");
            msg.innerText=`You Lose ${compuChoice} beats You ${userchoice}`;
            msg.style.backgroundColor = "red";
        }    
};

const playGame =(userchoice) =>{
    console.log("User Choice = ",userchoice);
    //Generate computer choice ->
    const compuChoice = genCompuChoice();
    console.log("Computer Choice = ",compuChoice);

     if(compuChoice === "rock"){
        compImg.src = "./rock.png";
    }
    else if(compuChoice === "paper"){
        compImg.src = "./paper.png";
    }
    else{
        compImg.src = "./scissors.png";
    }

    if(userchoice == compuChoice)
        {
            drawGame();
        } 
    else   
        {
            let userwin = true;
            if(userchoice == "rock")  
              {
                //scissor , paper
                userwin = compuChoice == "paper"?false : true;
              }
            else if(userchoice == "paper")
              {
                //rock,scissors
                userwin = compuChoice == "scissor"?false : true;
              }   
            else
              {
                //paper,rock
                 userwin = compuChoice == "rock"?false : true;
              }  
            showWinner(userwin,userchoice,compuChoice);  
        } 
};

right.forEach((choice)=>{
    console.log(choice);
    choice.addEventListener("click",()=>{
        const userchoice = choice.getAttribute("id");
    // console.log("choice was clicked",userchoice);
        playGame(userchoice);
    });
});


exitBtn.addEventListener("click", () => {
    
    // 🔥 Final winner decide karo
    if(userScore > compuScore){
        msg.innerText = "🏆 Final Winner: YOU";
        msg.style.backgroundColor = "green";
    }
    else if(compuScore > userScore){
        msg.innerText = "💻 Final Winner: COMPUTER";
        msg.style.backgroundColor = "red";
    }
    else{
        msg.innerText = "🤝 Match Draw";
        msg.style.backgroundColor = "gray";
    }

    // ❌ Game disable (user click na kar sake)
    right.forEach((choice)=>{
        choice.style.pointerEvents = "none";
    });
});

resetBtn.addEventListener("click", () => {
    
    // 🔁 Score reset
    userScore = 0;
    compuScore = 0;

    userScorepara.innerText = 0;
    compuScorepara.innerText = 0;

    // 📝 Message reset
    msg.innerText = "Play Your Move";
    msg.style.backgroundColor = "#FFF2D0";

    // 🖼️ Computer image hata do
    compImg.src = "";

    // ✅ Game dobara enable
    right.forEach((choice)=>{
        choice.style.pointerEvents = "auto";
    });
});
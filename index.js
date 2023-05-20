const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
const lives_element = document.querySelector(".lives");
const time_element = document.querySelector(".timer");
const word_elements = document.querySelector(".word");
const popupMenu = document.querySelector(".popup-menu")
const Buttons = document.querySelectorAll(".popup-menu button")
const grid_change = document.querySelector(".Grid")
const game_1 = document.querySelector(".game")

let frame_inc = 0;
let frame_c =0;
let frames=100;
pause_element = document.querySelector(".fa-pause")
let rows = Number(localStorage.getItem("rows") || 30)
let columns = Number(localStorage.getItem("columns") || 30)


playBoard.setAttribute('style', `grid-template: repeat(${rows}, 1fr) / repeat(${columns}, 1fr);`)

const audio = new Audio("food.mp3")
let booster = false;
let score_booster = false;
let booster_coordinates;
let rand_number;
let booster_c_c = 0;
let time = 60;
let play = 0;
let time_increase = 0;
const words = [
    "RED",
    "DELTA",
    "TRICHY",
    "BED",
    "BREAD",
    "LED",
    "FED",
    "MEDAL",
    "THREAD",
    "CREDIT",
    "WED",
    "STEADY",
    "TRICKLE",
    "REDDEN",
    "ELDER",
    "DELIGHT",
    "REDEMPTION",
    "TRICK",
    "DELTIC",
    "TRENDY"
  ];
  

let play_velx,play_vely; 
let n=0;
let a=0;
let booster_frame_c;
let keypress = 0;
let pause_press = 0;
current_string = words[n];
eaten_string = "";
length = current_string.length;
let eaten_checker = "";
let j=0;
let lives = 4;
let portal = [{x:4,y:4},{x:8,y:8}]
let BoostX,BoostY;
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [[5,5],[4,5],[3,5]];
let food = [];
let setIntervalId;
let score = 0;
let booster_timer;
let newX,newY;




// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
   
    foodX = Math.floor(Math.random() * (columns-1)) + 1;
    foodY = Math.floor(Math.random() * (rows-1)) + 1;
}
function lives_update(){
    for(i=0;i<lives;i++){
    lifing = document.createElement("span");
    lifing.innerHTML = `<i class="fa-solid fa-heart" style="color: #d20404;"></i>`;
    lives_element.appendChild(lifing);
    }


    

}
function word_update(){
    for(i=0;i<words[n].length;i++){
        Word_element = document.createElement("span");
        if(eaten_checker[i]===words[n][i]){
        Word_element.innerHTML = words[n][i];
        Word_element.classList.add("green");
        }
        else{
            Word_element.innerHTML = words[n][i];

        }
        
        
        word_elements.appendChild(Word_element);

    }
}

const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();


}


const changeDirection = e => {
   
    keypress = 1;
    if(e.key==="Pause"){
        pause1();
    }
    // Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1) {
        play = 1;
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        play = 1;
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        play = 1;
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        play = 1;
        velocityX = 1;
        velocityY = 0;
    }
}
const pause = f =>{
    if(f.key===" "){
        keypress = 0;
        pause_press++;
        if(pause_press%2===1){
        document.removeEventListener("keyup",changeDirection);

        play = 0;

        

        
        }
        else{


            play =1;

            document.addEventListener("keyup",changeDirection);
        }

    }
}
function pause1(){
    
        keypress = 0;
        pause_press++;
        if(pause_press%2===1){
        document.removeEventListener("keyup",changeDirection);


        play = 0;
        
        }
        else{


            play =1;
            document.addEventListener("keyup",changeDirection);

        }

    
}
function length_half(presentS){
    if(presentS.length!=1){
    presentS = presentS.slice(0,Math.floor(presentS.length/2))
    }
    return presentS;
}

function booster_div(bname){
    
    if(booster_c_c===0){
        BoostX = Math.floor(Math.random()*(columns-1)) + 1;
        BoostY = Math.floor(Math.random()*(rows-1)) + 1;
        booster_c_c++;
        
    }
    if(booster){
    booster_element = document.createElement("div");

    booster_element.style.gridRowStart = BoostY;
    booster_element.style.gridColumnStart = BoostX;
    
    
    booster_element.classList.add(`${bname}`);
    booster_element.innerHTML = `<img src="${bname}.png">`
    playBoard.appendChild(booster_element);
    }



    
}
function frameinc(){
    clearInterval(setIntervalId);
    frames = 100 - frame_inc;
    setIntervalId = setInterval(initGame, frames);

}
const change_grid = m => {
    
    
    if(m.key != "resume"){

        clearInterval(setIntervalId);
        localStorage.setItem("rows", Number(m.key));
        localStorage.setItem("columns", Number(m.key));
        location.reload();
    }
    else{
        popupMenu.setAttribute('style','display:none');
        pause1();

    }





    
}



controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));


grid_change.addEventListener("click",()=>{
    pause1();
    popupMenu.setAttribute('style','display:flex');
    

})
Buttons.forEach(button => button.addEventListener("click", () => change_grid({ key: button.dataset.key })));
const initGame = () => {
    playBoard.innerHTML="";
    lives_element.innerHTML="";
    word_elements.innerHTML="";
    lives_update();
    word_update();
    if(keypress){
    
    a++;
    

    if(a%10===0){
        time--;
    }
    if(a%100==0 && frame_c<=4){
        frame_inc++;
        frame_inc++;
        frame_c++;
        console.log(frame_inc,frames)
        frameinc();
        


    }
    
    time_element.innerHTML = `TIME:${time}`
    if(time===0){
        lives--;
        time = 60;
    }
}
    if(!booster){
        if(time%7===0){
            booster_timer = 0;
            booster_frame_c = a;
            rand_number = Math.floor(Math.random()*4) + 1;
            booster_timer=0;
            

            
            booster = true;

        }
    

    }
    if(booster){
 
        if(rand_number===1 && lives<=3){
            
            booster_div("life_booster");
        }
        else if(rand_number===2){
            booster_div("score_booster");
        }
        else if(rand_number===3 && snakeBody.length>=6){
            booster_div("length_halfer")
        }

    }
    if((a-booster_frame_c)%10===0){
        booster_timer++;

    }
    if(booster_timer===10 && booster){
        booster=false;
        score_booster=false;
    }




    if(gameOver) return handleGameOver();

    
    if(eaten_checker === words[n]){
        eaten_checker = "";
        eaten_string = "";
        n++;
        current_string = words[n];
        j = 0;
        length = current_string.length;
        time += 10;

    }
    if(j===0){
        get_foodc();
        j++;

    }

    for(i=0;i<food.length;i++){
        food_element = document.createElement("div");
        food_element.style.gridRowStart = food[i].y;
        food_element.style.gridColumnStart = food[i].x;
        food_element.classList.add("food");
        food_element.classList.add(`${current_string[i]}`);
        food_element.innerHTML = current_string[i];
        playBoard.appendChild(food_element);
        
    
    }
    if((snakeX===BoostX && snakeY===BoostY)&&booster){
        if(rand_number===1&&lives<=3){
            lives++;
            
        }
        else if(rand_number===2){
            score_booster=true;
        }
        else if(rand_number==3 && snakeBody.length>=4){
            snakeBody = length_half(snakeBody);
        }
        booster_c_c=0;

        


    }

    // Checking if the snake hit the food
    for(i=0;i<food.length;i++){
    if(snakeX === food[i].x && snakeY === food[i].y) {
        audio.play();
        eaten_string += current_string[i];
        if(check_e_s(eaten_string)){
            eaten_string = "";
            eaten_checker+=current_string[i];
            if(current_string.length!=1){
            current_string = current_string.slice(1,length);
            }
            length--;
                     

        
            snakeBody.push([food[i].y, food[i].x]); // Pushing food position to snake body array
            const indextoremove = food.findIndex(obj=>obj.x===food[i].x && obj.y===food[i].y);
            food.splice(indextoremove,1); 
            if(score_booster){
                score = score + 3;
            }
            else{
                score++;

            }
             // increment score by 1
            highScore = score >= highScore ? score : highScore;
            localStorage.setItem("high-score", highScore);
            scoreElement.innerText = `SCORE: ${score}`;
            highScoreElement.innerText = `HIGH SCORE: ${highScore}`;
            //lives_element.innerHTML = `lives:${lives}`;

         }
        else{
        if(lives!=1){
            lives--;
            eaten_string = "";
            //lives_element.innerHTML = `lives:${lives}`;
        }
        else{
            handleGameOver();
        }
        }
    }}

    // Updating the snake's head position based on the current velocity

    if(play){
        snakeX += velocityX;
        snakeY += velocityY;
        
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

}
    snakeBody[0] = [snakeX, snakeY]; 

    // Setting first element of snake body to current snake position
    console.log(snakeY > Number(rows)+1);


    // Checking if the snake's head is out of wall, if so setting gameOver to true
    if(snakeX <= 0 || snakeX > Number(columns+1) || snakeY <= 0 || (snakeY > rows+1)) {
        gameOver=true;

    }

    for (let i = 0; i < snakeBody.length; i++) {
        if(i===0){
        // Adding a div for each part of the snake's body
        snake_element = document.createElement("div");
        snake_element.style.gridRowStart = snakeBody[i][1];
        snake_element.style.gridColumnStart = snakeBody[i][0];
        snake_element.classList.add("head");
        
        playBoard.appendChild(snake_element);
        }
        else{
            snake_element = document.createElement("div");
            snake_element.style.gridRowStart = snakeBody[i][1];
            snake_element.style.gridColumnStart = snakeBody[i][0];
            snake_element.classList.add("body");
            
            playBoard.appendChild(snake_element);

        }
        
        // Checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver=true;

            
        }
    }
    



    
}
function get_foodc(){
    for(var i=0;i<length;i++){

        food.push({x:Math.floor(Math.random()*28)+1,y:Math.floor(Math.random()*28)+1});

        
    }
    
}
function check_e_s(e_s){
    if(e_s[e_s.length-1]===current_string[e_s.length - 1]){
        return true;
    }
}
    


//updateFoodPosition();
setIntervalId = setInterval(initGame, frames);
document.addEventListener("keyup", changeDirection);
document.addEventListener("keyup",pause);


let gameSeq = [];
let userSeq = [];
let btns = ['red','yellow','blue','green'];

let level = 0;
let started = false;
let highestScore = 0;

let h2 = document.querySelector('h2');
let h1 = document.querySelector('h1');

h1.innerText= `Simon Game (Your Highest Score ${highestScore})`;

document.addEventListener('keydown',function(){
    if (started==false){
        started = true;
        console.log("Game Started");

        levelUp();
    }
});

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    let rand = Math.floor(Math.random()*4);
    let randColor = btns[rand];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    gameSeq.push(randColor);
}

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash')
    },200);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',function(event){
        let color = event.target.classList[1];
        console.log(color);
        let flashBtn = document.querySelector(`.${color}`);
        btnFlash(flashBtn);
        userSeq.push(color);
        checkAns(userSeq.length-1);
    });
}

function highest(){
    if(level>highestScore){
        highestScore = level-1;
    }
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]) {
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        highest();
        h2.innerText = `Game Over. Your Score was ${level}. Press any key to continue.`;
        h1.innerText = `Simon Game (Your Highest Score ${highestScore})`;
        let body = document.querySelector('body');
        body.style.backgroundColor='red'
        setTimeout(function(){
            body.style.backgroundColor ='burlywood';
        },200);
        reset();
    }
}

function reset() {
    level = 0;
    userSeq = [];
    gameSeq = [];
    started = false;
}
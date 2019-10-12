
class  item {
    shape;
    x;
    y;

    constructor(shape , x , y ) {
        this.shape = shape;
        this.x = x;
        this.y = y;
        this.shape.style.left = x + 'px';
        this.shape.style.top = y + 'px';
    }
}

class food extends item {
    constructor(shape , x , y) {
        super(shape , x , y);
    }       

    recreate() {
        this.x = getRandom24Px(window.innerWidth - 24);
        this.y = getRandom24Px(window.innerHeight - 24);
        this.shape.style.left = this.x + 'px';
        this.shape.style.top = this.y + 'px';
    }
}

class player extends item {

    constructor(shape , x , y) {
        super(shape , x , y);
    }

    moveUp() {
        this.y -= 24;
        this.shape.style.top = this.y + 'px';
    }

    moveDown() {
        this.y += 24;
        this.shape.style.top = this.y + 'px';
    }

    moveLeft() {
        this.x -= 24;
        this.shape.style.left = this.x + 'px';
    }

    moveRight() {
        this.x += 24;
        this.shape.style.left = this.x + 'px';
    }
}

function getRandom24Px(ends) {      // the function of random values of the moving shape
    let value = Math.round(Math.random() * ends);
    return value - (value % 24);
}

let foodObj = new food (            // object of class food
    document.querySelector('.food'),    
    getRandom24Px(window.innerWidth - 24),
    getRandom24Px(window.innerHeight - 24)
);

let playerObj = new player(         // object of class player
    document.querySelector('.player'),
    getRandom24Px(window.innerWidth - 24),
    getRandom24Px(window.innerHeight - 24)
);


/* ======================================================================= */

let timer = document.querySelector('.timer');               // this is the timer of the game 
let timeAmount = timer.value;
timeAmount = 0;
timer.innerHTML = timeAmount;

setInterval( e => (
    timeAmount++,
    timer.innerHTML = timeAmount
) , 1000 );

let userTime = document.querySelector('.user_time');         // this is the time of the user
let realTime = userTime.value;
realTime = timeAmount;

let congratsHader = document.querySelector('.congrats_header');

let starNo1 = document.getElementById('start_1');       // this for star 1
let starNo2 = document.getElementById('start_2');       // this for star 2
let starNo3 = document.getElementById('start_3');       // this for star 3


let counter = document.querySelector('.counter');       // this is the span of counter 
counter.value = 0;
let counterNumber = counter.value;

let successDiv = document.querySelector('.sucess');      // this is the div of success screen
let reloadPage = document.querySelector('#reload_page');   // this is the button to reload the current page 

reloadPage.addEventListener('click' , e => {       // this is function to reload the current page
    location.reload();
});

/* ======================================================================= */


window.addEventListener('keydown' , e => {
    switch (e.keyCode) {

        case 37: {      // the arrow left             
            if(playerObj.x > 0)  playerObj.moveLeft();
            break;
        }

        case 38: {      // the arrow top 
            if(playerObj.y > 0) playerObj.moveUp();
            break;
        }
        
        case 39: {      // the arrow right 
            if(playerObj.x < window.innerWidth-25) playerObj.moveRight();
            break;
        }

        case 40: {      // the arrow down 
            if(playerObj.y < window.innerHeight-30) playerObj.moveDown();
            break;
        }
    }

    if (playerObj.y === foodObj.y && playerObj.x === foodObj.x) {
        foodObj.recreate();  
        counter.innerHTML = ++counterNumber;

        if(counterNumber === 10) {          // this the total score 
            successDiv.style.visibility = 'visible'; 
            userTime.innerHTML = timeAmount; 
            
            if (timeAmount <= 15) {         // this the time of the first Score
                starNo1.style.color = 'gold';
                starNo2.style.color = 'gold';
                starNo3.style.color = 'gold';
                congratsHader.innerHTML = 'Very Good!!';
            } 

            else if(timeAmount > 15  && timeAmount <= 25) {      // this the time of the second Score
                starNo1.style.color = 'gold';
                starNo2.style.color = 'gold';
                congratsHader.innerHTML = 'Good!!';
            }
            
            else if(timeAmount > 25) {       // this the time of the third Score
                starNo1.style.color = 'gold';
                congratsHader.innerHTML = 'Good Luck!!';
            }             
        }
    }  
});



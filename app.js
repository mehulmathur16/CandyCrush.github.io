
const grid = document.querySelector('.grid');
var width = 8;
const squares = [];
var score = 0;
const s = document.querySelector('.displayScore');

var x = window.matchMedia("(max-width: 768px)");

if(x.matches)
    width = 5;

const candyColors = [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/blue-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
];

function createBoard(){

    for(let i = 0 ; i < width*width ; i++){
        const square = document.createElement("div");
        square.setAttribute('draggable' , true);
        square.setAttribute('id' , i);
        square.style.backgroundImage = candyColors[ Math.floor(Math.random() * candyColors.length) ];
        grid.appendChild(square);
        squares.push(square);
    }
}

createBoard();

let colorBeingDragged;
let colorBeingReplaced;
let idBeingDragged;
let idBeingReplaced;

squares.forEach( square => square.addEventListener('dragstart' , dragStart) );
squares.forEach( square => square.addEventListener('dragend' , dragEnd) );
squares.forEach( square => square.addEventListener('dragover' , dragOver) );
squares.forEach( square => square.addEventListener('dragenter' , dragEnter) );
squares.forEach( square => square.addEventListener('dragleave' , dragLeave) );
squares.forEach( square => square.addEventListener('drop' , dragDrop) );

function dragStart(){
    colorBeingDragged = this.style.backgroundImage;
    idBeingDragged = parseInt(this.id);
    
    // console.log(this.id + "dragStart");
}


function dragEnd(){
    // console.log(this.id + "dragEnd");

    let validMoves = [
        idBeingDragged + 1,
        idBeingDragged - 1,
        idBeingDragged - width,
        idBeingDragged + width,
    ];

    //checking for a valid move
    let validMove = validMoves.includes(idBeingReplaced);

    if(idBeingReplaced && validMove){
        idBeingReplaced = null;
    }

    else if(idBeingReplaced && !validMove){
        squares[idBeingDragged].style.backgroundImage = colorBeingDragged;
        squares[idBeingReplaced].style.backgroundImage = colorBeingReplaced;
    }

    else{
        squares[idBeingDragged].style.backgroundImage = colorBeingDragged;   
    }

}


function dragOver(e){
    e.preventDefault();
    // console.log(this.id + "dragOver");
}


function dragEnter(e){
    e.preventDefault();
    // console.log(this.id + "dragEnter");
}


function dragLeave(){
    // console.log(this.id + "dragLeave");
}

function dragDrop(){
    
    colorBeingReplaced = this.style.backgroundImage;
    idBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;

    squares[idBeingDragged].style.backgroundImage = colorBeingReplaced;

    console.log(this.id + "drop");
}

function checkRowOfThree(){

    for(let i = 0 ; i < width*width - 2 ; i++ ){

        let rowOfThree = [i , i+1 , i+2];

        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === '';

        if( rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank ){
            score += 3;
            rowOfThree.forEach(index => squares[index].style.backgroundImage = '');
        }
    }
}

function checkColumnOfThree(){

    for(let i = 0 ; i < width*width - 2*width ; i++ ){

        let columnOfThree = [i , i+width , i+(2*width)];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === '';

        if( columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank ){
            score += 3;
            columnOfThree.forEach(index => squares[index].style.backgroundImage = '');
        }
    }
}

function checkRowOfFour(){

    for(let i = 0 ; i < width*width - 3 ; i++ ){

        let rowOfFour = [i , i+1 , i+2 , i+3];

        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === '';

        if( rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank ){
            score += 4;
            rowOfFour.forEach(index => squares[index].style.backgroundImage = '');
        }
    }
}

function checkColumnOfFour(){

    for(let i = 0 ; i < width*width - 3*width ; i++ ){

        let columnOfFour = [i , i+width , i+(2*width) , i+(3*width)];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === '';

        if( columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank ){
            score += 4;
            columnOfFour.forEach(index => squares[index].style.backgroundImage = '');
        }
    }
}

function moveDown(){

    for(let i = 0 ; i < width*width - width ; i++){

        if(squares[i + width].style.backgroundImage === ''){
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = candyColors[ Math.floor(Math.random() * candyColors.length) ];
        }
        
        if(squares[i].style.backgroundImage === ''){
            squares[i].style.backgroundImage = candyColors[ Math.floor(Math.random() * candyColors.length) ];
        }
    }
}

window.setInterval( () => {
    moveDown();
    checkRowOfFour();
    checkColumnOfFour();
    checkRowOfThree();
    checkColumnOfThree();
    s.textContent = "Score : " + score;
} , 100);

const h = document.querySelector(".heading");
const appreciation = document.querySelector(".nice");
const appDiv = document.querySelector(".appreciation");

h.addEventListener('mouseover' , () => {
    appreciation.textContent = "Well Played!";
    appDiv.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    appDiv.style.border = "solid rgb(209, 24, 85) 2px";
});

h.addEventListener('mouseout' , () => {
    appreciation.textContent = "";
    appDiv.style.backgroundColor = "";
    appDiv.style.border = "";
});


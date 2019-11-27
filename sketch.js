var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var car_1,car_2,car_3,car_4,track;
var cars, car1, car2, car3, car4;

function preload(){
  car_1=loadImage("./images/car1.png");
  car_2=loadImage("./images/car2.png");
  car_3=loadImage("./images/car3.png");
  car_4=loadImage("./images/car4.png");
  track=loadImage("./images/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (gameState==2){
    game.end();
  }
}

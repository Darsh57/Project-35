var database, position;
var balloon, back;

function preload(){
  backImg = loadImage("back.png");
  balloonImg = loadImage("balloonpic.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 750);
  balloon = createSprite(300, 400, 20, 20);
  balloon.addImage(balloonImg);

  var balloonpos = database.ref("balloon/position");
  balloonpos.on("value", readPosition);
}

function draw() {
  background(backImg);  

  if(position!==undefined){

    if(keyDown(LEFT_ARROW)){
      changePosition(-1, 0);
     } 
     else if(keyDown(RIGHT_ARROW)){
       changePosition(+1, 0);
     } 
     else if(keyDown(DOWN_ARROW)){
       changePosition(0, +1);
     } 
     else if(keyDown(UP_ARROW)){
       changePosition(0, -1);
     }
   
  }
  drawSprites();
}

function changePosition(){
database.ref("balloon/position").set(
  {
    "x": position.x + x, 
    "y": position.y + y
}
)
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

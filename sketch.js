var backgroundImg;
var balloon,balloonImg,balloonImgright,balloonImgleft;
var position,database;

function preload(){
  balloonImg = loadImage("Hot Air Ballon-02.png");
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImgleft = loadImage("Hot Air Ballon-03.png");
  balloonImgright = loadImage("Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1400,700);
  balloon = createSprite(120, 450, 50, 50);
  balloon.addImage(balloonImg);
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
    background(backgroundImg);
    if(keyDown(LEFT_ARROW)){
      balloon.addImage(balloonImg);
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.addImage(balloonImg);
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      balloon.addImage(balloonImgleft);
      balloon.scale=balloon.scale -0.01;
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.addImage(balloonImgright);
      writePosition(0,+1);
    }  
    drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
      'x':position.x + x,
      'y':position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log("Error in Writing Database")
}

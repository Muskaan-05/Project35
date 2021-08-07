var balloon;
var database;
var balloonImg, bg;

function preload(){
    balloonImg=loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png")
    bg=loadImage("cityImage.png");
}



function setup(){
    createCanvas(1200,800);
    database=firebase.database();
    balloon = createSprite(250,250,10,10);
    balloon.addAnimation("balloon", balloonImg);
    var locInDb=database.ref("balloon/Position");
    locInDb.on("value",readPosition);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        balloon.scale-=0.05
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        balloon.scale+=0.05
    }
    drawSprites();
}

function writePosition(x,y){
 database.ref("balloon/Position").set({
     x:balloon.x+x, y:balloon.y+y
 })

}

function readPosition(value){
    var posInDb=value.val();
    balloon.x=posInDb.x;
    balloon.y=posInDb.y;
}



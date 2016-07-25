var canvas;
var FANS = 0;
var FPS = 0;

var shack;
var mouseSprite;

function setup(){
	createCanvas(1000, 500);
	textAlign(CENTER);

	mouseSprite = createSprite(mouseX, mouseY, 1, 1);
	mouseSprite.visible = false;

	shack = createSprite(buildingWidth(width)/2, upgradeHeight(height)/2, 50, 50);
	shack.shapeColor = 255;
}

function draw(){
	background(100);
	mouseSprite.position.x = mouseX;
	mouseSprite.position.y = mouseY;


	line(0, upgradeHeight(height), buildingWidth(width), upgradeHeight(height));
	line(buildingWidth(width), 0, buildingWidth(width), height);


	//drawing FPS and FANS
	text(FANS + "\n" + FPS, buildingWidth(width)/2, upgradeHeight(height)/2 * 1/4);

	if(shack.overlap(mouseSprite)){
		alert("overlap");
	}


	drawSprites();
}
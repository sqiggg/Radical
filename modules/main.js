var canvas;
var FANS = 0;
var FPS = 0;
var FRAMER8 = 30;

var shackSprite;
var mouseSprite;
var shack = new Shack(1);


var buildings = getBuildings();
var buildingSprites = {};


function setup(){
	createCanvas(1000, 500);
	frameRate(FRAMER8);
	textAlign(CENTER);

	//making invisible mouse sprite for collision between other sprites
	mouseSprite = createSprite(mouseX, mouseY, 1, 1);
	mouseSprite.visible = false;

	//shack sprite 
	shackSprite = createSprite(buildingWidth(width)/2, upgradeHeight(height)/2, 50, 50);
	shackSprite.shapeColor = 255;

	//init all buildings
	//console.log(buildings);
	drawBuilding();

}

function draw(){
	background(100);

	//setting the mouse sprite to the position of the mouse
	mouseSprite.position.x = mouseX;
	mouseSprite.position.y = mouseY;

	//every second
	if(frameCount%FRAMER8 === 0){
		FANS += FPS;
	}

	//diving lines
	line(0, upgradeHeight(height), buildingWidth(width), upgradeHeight(height));
	line(buildingWidth(width), 0, buildingWidth(width), height);

	//drawing FPS and FANS
	textSize(20);
	text("Fans: " + FANS + "\n" + "Fans per second: " + FPS, buildingWidth(width)/2, upgradeHeight(height)/2 * 1/4);

	//drawing all the sprites
	drawSprites();
}

function mousePressed(){
	//pressed shack
	if(shackSprite.overlap(mouseSprite)){
		FANS = shack.onClick(FANS);
	}
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]])){
			console.log(Object.keys(buildingSprites)[i]);
		}
	}
}
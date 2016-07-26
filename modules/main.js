var canvas;
var FANS = 50;
var FPS = 0;
var FRAMER8 = 30;

var shackSprite;
var mouseSprite;
var shack = new Shack(1);
var overlay;
var overlayed = "student";


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
	overlay = overlayUpdate();
}

function draw(){
	background(100);
	//setting the mouse sprite to the position of the mouse
	mouseSprite.position.x = mouseX;
	mouseSprite.position.y = mouseY;

	overlay.position.y = mouseY;
	if (overlay.position.y - overlay.height/2< 0){
		overlay.position.y = overlay.height/2;
	} else if(overlay.position.y + overlay.height/2 > height){
		overlay.position.y = height-overlay.height/2;
	}


	//every second
	if(frameCount%FRAMER8 === 0){
		FANS += FPS;
		window.document.title = FANS + " fans";
	}

	//diving lines
	line(0, upgradeHeight(height), buildingWidth(width), upgradeHeight(height));
	line(buildingWidth(width), 0, buildingWidth(width), height);

	//drawing FPS and FANS
	textSize(20);
	text("Fans: " + FANS + "\n" + "Fans per second: " + FPS, buildingWidth(width)/2, upgradeHeight(height)/2 * 1/4);

	//drawing all the sprites
	drawSprites();

	//showing overlay and displaying text
	overlay.visible = false;
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]])){
			overlayed = Object.keys(buildingSprites)[i];
			var text_to_display = buildings[overlayed].amount +" -- " +buildings[overlayed].name + "\n\n Each " + buildings[overlayed].name + " produces " + buildings[overlayed].baseFps + " fps\n" + "total producing: " + buildings[overlayed].producing + "\nCost: " + buildings[overlayed].cost;
			text(text_to_display, overlay.position.x-overlay.width/2, overlay.position.y-overlay.height/2, overlay.position.x-overlay.width/2, overlay.position.y + overlay.width/2);
			overlay.visible = true;
		}
	}
	fill(255);
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];
		text(buildings[tmp].name + " -- " + buildings[tmp].cost, buildingSprites[tmp].position.x - buildingSprites[tmp].width/6, buildingSprites[tmp].position.y + buildingSprites[tmp].height/6);
	}
	fill(0);
}

function mousePressed(){
	//pressed shack
	if(shackSprite.overlap(mouseSprite)){
		FANS = shack.onClick(FANS);
	}
	//click check for buying
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]])){
			console.log(Object.keys(buildingSprites)[i]);
			pressed = Object.keys(buildingSprites)[i];
			
			//buying the buildings
			if(FANS >= buildings[pressed].getCost()){
				FANS -= buildings[pressed].cost;
				FPS += buildings[pressed].buy();
			}
		}
	}
}
var canvas;
var MONEY = 50;
var MPS = 0;
var FRAMER8 = 30;

var shackSprite;
var mouseSprite;
var shack = new Shack(1);
var overlay;
var overlayed;


/*
var w;
if (typeof(w) == "undefined") {
    w = new Worker("webWorker.js");
    console.log("GO");
}*/


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

	//buy mode buttons
	//TODO

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
		MONEY += MPS;
		//set title of page to amount of money
		window.document.title = round(MONEY) + " Money";
	}


	//diving lines
	line(0, upgradeHeight(height), buildingWidth(width), upgradeHeight(height));
	line(buildingWidth(width), 0, buildingWidth(width), height);

	//drawing MPS and MONEY
	textSize(20);
	text("Money: " + Math.round(MONEY) + "\n" + "Monies per second: " + Math.round(MPS * 10) / 10, buildingWidth(width)/2, upgradeHeight(height)/2 * 1/4);

	//drawing all the sprites
	drawSprites();

	//showing overlay and displaying text
	overlay.visible = false;
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]]) && buildingSprites[Object.keys(buildingSprites)[i]].visible === true){
			overlayed = Object.keys(buildingSprites)[i];

			if(overlayed)
			var text_to_display = buildings[overlayed].amount +" -- " +buildings[overlayed].name + "\n\n Each " + buildings[overlayed].name + " produces " + Math.round(buildings[overlayed].baseMps*10)/10 + " mps\n" + "total producing: " + Math.round(buildings[overlayed].producing*10)/10 + "\nCost: " + buildings[overlayed].cost + " -> " + buildings[overlayed].unlocked;
			text(text_to_display, overlay.position.x-overlay.width/2, overlay.position.y-overlay.height/2, overlay.position.x-overlay.width/2, overlay.position.y + overlay.width/2);
			overlay.visible = true;
		}
	}




	fill(255);
	//money and unlocking
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];
		var displayingText = "Not Displayed";

		if (Math.round(MONEY) >= buildings[tmp].cost){
			buildings[tmp].unlocked = true;
		}

		if (buildings[tmp].unlocked){
			displayedText = buildings[tmp].name + " -- " + buildings[tmp].cost;

		} else if(i > 0 && buildings[Object.keys(buildings)[i-1]].unlocked === true){
			//limited information
			displayedText = "LOCKED";
			buildingSprites[tmp].visible = true;
		} else{
			buildingSprites[tmp].visible = false;
			displayedText = '';
		}

		text(displayedText, buildingSprites[tmp].position.x - buildingSprites[tmp].width/6, buildingSprites[tmp].position.y + buildingSprites[tmp].height/6);
	}
	fill(0);
}

function mousePressed(){
	//pressed shack
	if(shackSprite.overlap(mouseSprite)){
		MONEY = shack.onClick(MONEY);
	}
	//click check for buying
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]])){
			console.log(Object.keys(buildingSprites)[i]);
			pressed = Object.keys(buildingSprites)[i];
			
			//buying the buildings
			if(MONEY >= buildings[pressed].getCost() && buildings[pressed].unlocked){
				MONEY -= buildings[pressed].cost;
				MPS += buildings[pressed].buy();
			}
		}
	}
}

var canvas;
var MONEY = 50;
var MPS = 0;
var FRAMER8 = 30;

var shackSprite;
var mouseSprite;
var shack = new Shack(5);
var overlay;
var overlayed;
var surfboards;
var w = 1000;
var h = 500;

var buildings = getBuildings();
var buildingSprites = {};

function preload(){
	img = loadImage("assets/shack.png");
	surfboards = [loadImage("assets/surfboard1.png"), loadImage("assets/surfboard2.png"), loadImage("assets/surfboard3.png")];

	//shack sprite
	shackSprite = createSprite(buildingWidth(w)/2, upgradeHeight(h)/2, 75, 75);
	shackSprite.addImage(img);

}

function setup(){
	createCanvas(w, h);
	frameRate(FRAMER8);
	textAlign(CENTER);


	//making invisible mouse sprite for collision between other sprites
	mouseSprite = createSprite(mouseX, mouseY, 1, 1);
	mouseSprite.visible = false;

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
		window.document.title = bigNumbers(MONEY) + " Money";
	}


	//diving lines
	line(0, upgradeHeight(height), buildingWidth(width), upgradeHeight(height));
	line(buildingWidth(width), 0, buildingWidth(width), height);

	//drawing MPS and MONEY
	textSize(20);
	text("Money: " + bigNumbers(Math.round(MONEY), 1) + "\n" + "Monies per second: " + bigNumbers(MPS), buildingWidth(width)/2, upgradeHeight(height)/2 * 1/4);

	//drawing all the sprites
	drawSprites();

	//showing overlay and displaying text
	overlay.visible = false;
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]]) && buildingSprites[Object.keys(buildingSprites)[i]].visible === true){
			var text_to_display;

			overlayed = Object.keys(buildingSprites)[i];

			if(buildings[overlayed].unlocked === true){
				 text_to_display = buildings[overlayed].amount +" -- " +buildings[overlayed].name + "\n\n Each " + buildings[overlayed].name + " produces " + bigNumbers(buildings[overlayed].baseMps) + " mps\n" + "total producing: " + bigNumbers(buildings[overlayed].producing) + "\nCost: " + buildings[overlayed].cost;
			} else{
				text_to_display = "???" + "\n\n\nCost: " + buildings[overlayed].cost;
			}

			text(text_to_display, overlay.position.x-overlay.width/2, overlay.position.y-overlay.height/2, overlay.position.x-overlay.width/2, overlay.position.y + overlay.width/2);
			overlay.visible = true;
		}
	}




	fill(255);
	//money and unlocking
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];
		var displayingText = "Not Displayed";
		buildings[Object.keys(buildings)[0]].unlocked = true;

		if (Math.round(MONEY) >= buildings[tmp].cost){
			buildings[tmp].unlocked = true;
		}

		if (buildings[tmp].unlocked){
			displayedText = buildings[tmp].amount + "x " + buildings[tmp].name + " -- " + buildings[tmp].cost;

		} else if(i > 0 && buildings[Object.keys(buildings)[i-1]].unlocked === true){
			//limited information
			displayedText = "??? -- " + buildings[tmp].cost;
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

		//surfbaords coming off
		var surfboard = createSprite(mouseX, mouseY, 10, 10);
		surfboard.addImage(surfboards[Math.round(Math.random() * 2)]);
		surfboard.shapeColor = 0;
		surfboard.velocity = createVector(random(-0.5, 0.5), random(-1.5, -1));
		surfboard.velocity.mult(5);

		//text coming off

		//make the shack "Bounce" on click
		shackSprite.scale = 0.9;
		setTimeout(function() {shackSprite.scale = 1;}, 100);
	}

	//click check for buying
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]])){
			//console.log(Object.keys(buildingSprites)[i]);
			pressed = Object.keys(buildingSprites)[i];
			
			//buying the buildings
			if(MONEY >= buildings[pressed].getCost() && buildings[pressed].unlocked){
				MONEY -= buildings[pressed].cost;
				MPS += buildings[pressed].buy();
			}
		}
	}
}


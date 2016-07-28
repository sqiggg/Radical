var canvas;
var MONEY = 0;
var MPS = 0;
var FRAMER8 = 30;

var shackSprite;
var mouseSprite;
var shack = new Shack(5);
var overlay;
var overlayed;
var surfboards;
var w = 1000;
var h = 500
var buyButton;
var buyButtonMode = 1;
var upgradesButton;

var techTreeBuildings = {};
var buildingsImg = []
var buildings = getBuildings();
var buildingSprites = {};
var buildingMode = true;
var upgrades = getUpgrades();
var upgradesSprites = {};

function preload(){
	shackImg = loadImage("assets/shack.png");
	buy1 = loadImage("assets/buy1.png");
	buy10 = loadImage("assets/buy10.png");
	buy100 = loadImage("assets/buy100.png");

	surfboards = [loadImage("assets/surfboard1.png")];

	//shack sprite
	shackSprite = createSprite(buildingWidth(w)/2, upgradeHeight(h)/2, 75, 75);
	shackSprite.addImage(shackImg);

	buildingsImg = [loadImage("assets/buttonc1.png"), loadImage("assets/buttonc2.png")];
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
	buyButton = createSprite(buildingWidth(width) + buildingWidth(width)/6, (height * 1/buildingHeightDiv())/3);
	buyButton.addImage(buy1);

	upgradesButton = createSprite(buildingWidth(width)/2-200, height-60, 200, 60);
	upgradesButton.shapeColor = 0;


	//init all buildings
	overlay = overlayUpdate();
	drawBuilding();	
	drawUpgrades();
	buildingScene();
	techTreeInit();	
	techTreeBuildings;
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
		window.document.title = bigNumbers(Math.round(MONEY)) + " Money";
	}


	//diving lines
	line(0, upgradeHeight(height), buildingWidth(width), upgradeHeight(height));
	line(buildingWidth(width), 0, buildingWidth(width), height);

	//drawing MPS and MONEY
	textSize(20);
	text("Money: " + bigNumbers(Math.round(MONEY)) + "\n" + "Money per second (mps): " + bigNumbers(Math.round(MPS*10)/10), buildingWidth(width)/2, upgradeHeight(height)/2 * 1/4);

	//drawing all the sprites
	drawSprites();

	//showing overlay and displaying text
	overlayDisplay();

	//showing mode buttons' text
	fill(255);
	text("Upgrades/Buildings", upgradesButton.position.x, upgradesButton.position.y);

	fill(0);

	//money and unlocking
<<<<<<< Updated upstream
	buildingsUnlocking();
=======
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];
		//var displayingText = "Not Displayed";
		buildings[Object.keys(buildings)[0]].unlocked = true;

		if (Math.round(MONEY) >= buildings[tmp].cost){
			buildings[tmp].unlocked = true;
		}

		if (buildings[tmp].unlocked){
			displayedText = buildings[tmp].name + " -- " + bigNumbers(Math.round(buildings[tmp].getCost(buyButtonMode)));

		} else if(i > 0 && buildings[Object.keys(buildings)[i-1]].unlocked === true){
			//limited information
			displayedText = "??? -- " + bigNumbers(Math.round(buildings[tmp].getCost(buyButtonMode)));
			buildingSprites[tmp].visible = buildingMode
			//buyButton.visible = buildingMode;
		} else{
			buildingSprites[tmp].visible = false;
			displayedText = '';
		}

		if(buildingSprites[tmp].visible){
			text(displayedText, buildingSprites[tmp].position.x, buildingSprites[tmp].position.y + buildingSprites[tmp].height/6);
			textAlign(LEFT);
			text(buildings[tmp].amount + "x " + buildings[tmp].name + "(s)", width-100 - buildingSprites[tmp].position.x, buildingSprites[tmp].position.y + buildingSprites[tmp].height/6)
			textAlign(CENTER);
			}

		/*if((building[tmp].name === "Student")) && ((building[tmp].amount === 10));
			window.alert("News Flash: Surprise Motherfucker");*/
	}
>>>>>>> Stashed changes


	//dealing with change of MPS in regards to upgrades
	var tmpMPS = 0;
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		pressed = Object.keys(buildingSprites)[i];		
		tmpMPS += buildings[pressed].producing;
	}
	MPS = tmpMPS;

	if(buildingMode === false){
		techTreeDisplay();
	}

	displayText();
	fill(0);
}

function mousePressed(){
	mousePress();
}


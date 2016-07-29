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
var upgradeButtonImg;

var techTreeBuildings = {};
var buildingsImg = []
var buildings = getBuildings();
var buildingSprites = {};
var buildingMode = true;
var upgrades = getUpgrades();
var upgradesSprites = {};
var buildingsIconsSprites = {};
var techTreeIcons = {};

var lineDivImg
var sunburst;
var imgIconCount = {};
var pixelFont;

var music;
var boop;
var toot;

function preload(){
	shackImg = loadImage("assets/shack.png");
	buy1 = loadImage("assets/buy1.png");
	buy10 = loadImage("assets/buy10.png");

	//loading custom font
	pixelFont = loadFont("assets/fonts/04B_03__.TTF")

	surfboards = [loadImage("assets/surfboard1.png")];

	sunburst = loadImage("assets/sunburst.png");
	lineDivImg = loadImage("assets/line.png")

	sunburstSprite = [loadImage("assets/surfboard1.png")];
	sunburstSprite = createSprite(buildingWidth(w)/2, upgradeHeight(h)/2);

	music = loadSound("assets/music/Pixelland.wav");
	boop = loadSound("assets/music/boop.wav");
	toot = loadSound("assets/music/toot.wav");


	var widget = createSprite(w-lineDivImg.width*8 + buildingWidth(w)/6, h/2, buildingWidth(w), h);
	widget.shapeColor = '#ec3d91';


	//shack sprite
	shackSprite = createSprite(buildingWidth(w)/2, upgradeHeight(h)/2, 75, 75);
	shackSprite.addImage(shackImg);

	buildingsImg = [loadImage("assets/buttonc1.png"), loadImage("assets/buttonc2.png")];
	buildingsIcons = [loadImage("assets/student1.png"), loadImage("assets/designteam1.png"), loadImage("assets/treefarm1.png"), loadImage("assets/onlinestore1.png"), loadImage("assets/surftruck1.png"), loadImage("assets/hippieReserve0.png"), loadImage("assets/legalWeed0.png"), loadImage("assets/prosurferEndorsement0.png"), loadImage("assets/hawaiiExpansion0.png"), loadImage("assets/alienSurf0.png"), loadImage("assets/universalExpansion0.png")];
}

function setup(){
  	music.setVolume(0.4);
  	music.loop();
	textFont(pixelFont);

	createCanvas(w, h);
	frameRate(FRAMER8);
	textAlign(CENTER);


	//making invisible mouse sprite for collision between other sprites
	mouseSprite = createSprite(mouseX, mouseY, 1, 1);
	mouseSprite.visible = false;


	//buy mode buttons
	buyButton = createSprite(buildingWidth(width) + buildingWidth(width)/6-50, (height * 1/buildingHeightDiv())/3);
	buyButton.addImage(buy1);

	upgradesButton = createSprite(buildingWidth(width) + buildingWidth(width)/6+50, (height * 1/buildingHeightDiv())/3, 100, 40);
	upgradesButton.shapeColor = 0;
	//upgradesButton.rotation = 300;


	//init all buildings

	drawBuilding();
	drawUpgrades();
	buildingScene();
	techTreeInit();
	//techTreeBuildings;
	displayAmountInit();
	overlay = overlayUpdate();

	//TODO
	//CREATE Kuston Line
	divLine = createSprite(buildingWidth(width)-lineDivImg.width/2, height/2, 2, height)
	divLine.addImage(lineDivImg);
	divLine.shapeColor = 0

	sunburstSprite.addImage(sunburst)


}

function draw(){
	background(100);
	//setting the mouse sprite to the position of the mouse
	mouseSprite.position.x = mouseX;
	mouseSprite.position.y = mouseY;
	//drawing all the sprites

	drawSprites();

	sunburstSprite.rotation += 0.4;
	if(sunburstSprite.rotation >= 360){
		sunburstSprite.rotation = 0;
	}

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


	textSize(25);

	//drawing MPS and MONEY
	if(buildingMode)
		text("Money: " + bigNumbers(Math.round(MONEY)) + "\n" + "Money per second (mps): " + bigNumbers(Math.round(MPS*10)/10), buildingWidth(width)/2, upgradeHeight(height)/2 * 1/4);	

	textSize(20);
	
	for(var i = 0; i < Object.keys(techTreeBuildings).length; i++){
		var tmp = Object.keys(techTreeBuildings)[i];
		buildingsIconsSprites[tmp].position.x = buildingSprites[tmp].position.x-90;
		buildingsIconsSprites[tmp].position.y = buildingSprites[tmp].position.y;
	}




	//showing mode buttons' text
	fill(255);
	text("Selection", upgradesButton.position.x, upgradesButton.position.y);

	fill(0);

	//money and unlocking
	buildingsUnlocking();

	if(buildingMode === false){
		techTreeDisplay();
	}

	for(var i = 0; i < Object.keys(techTreeBuildings).length; i++){
		var tmp = Object.keys(techTreeBuildings)[i];

		//console.log(buildings[tmp].selected, buildings[tmp].name);
		if(tmp != 'back' && buildings[tmp].selected === true)
			techTreeBuildings[tmp].shapeColor = color(0,128,0);
		else
			techTreeBuildings[tmp].shapeColor = color(255,0,0);

	}


	//alert system
	//alertSystem();

	//dealing with change of MPS in regards to upgrades
	var tmpMPS = 0;
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		pressed = Object.keys(buildingSprites)[i];
		tmpMPS += buildings[pressed].producing;
	}
	MPS = tmpMPS;


	//diving lines
	//line(0, 30, width, 30);
	//line(0, upgradeHeight(height), buildingWidth(width), upgradeHeight(height));

	displayText();

	//showing overlay and displaying text
	overlayDisplay();

	fill(0);
}

function mousePressed(){
	mousePress();
}


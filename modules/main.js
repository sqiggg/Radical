var canvas;
var FANS = 0;
var FPS = 0;

function setup(){
	createCanvas(1000, 500);
	textAlign(CENTER);

	
}

function draw(){
	background(100);

	line(0, upgradeHeight(height), buildingWidth(width), upgradeHeight(height));
	line(buildingWidth(width), 0, buildingWidth(width), height);


	//drawing FPS and FANS
	text(FANS + "\n" + FPS, buildingWidth(width)/2, upgradeHeight(height)/2 * 1/4);

	rect(buildingWidth(width)/2-25, upgradeHeight(height)/2-25, 50, 50);

}
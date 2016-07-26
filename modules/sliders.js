var buildingWidth = function(width){
	return width/4 * 3;
}

var upgradeHeight = function(height){
	return height - height/4; 
}

var buildingHeightDiv = function(){
	return 7;
}

var getBuildings = function(){

	var obj = JSON.parse(data);
	//console.log(obj);
	var buildings = {};

	for(var i = 0; i < Object.keys(obj[0].buildings).length; i++){

		//Fetching all of the data from the json 
		var name = Object.keys(obj[0].buildings)[i];
		var cost = obj[0].buildings[name].cost;
		var description = obj[0].buildings[name].description;
		var FPS = obj[0].buildings[name].BFPS;

		//putting them into the buildings dict
		buildings[Object.keys(obj[0].buildings)[i]] = new Building(name, cost, description, FPS);
	}

	console.log(buildings);
	return buildings;
}

var drawBuilding = function(){
	fill(0);

	var offset = 10;
	var offsetDiff = 10;

	//drawing the building icons
	var heightNew = height - (buildingHeightDiv() * (offsetDiff+1));
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];
		buildingSprites[tmp] = createSprite(buildingWidth(width) + buildingWidth(width)/4, heightNew * i/buildingHeightDiv() + offset + (heightNew * 1/buildingHeightDiv())/2, buildingWidth(width)/2, heightNew * 1/buildingHeightDiv());
		offset += offsetDiff;
		buildingSprites[tmp].shapeColor = 0;
	}
}
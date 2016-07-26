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

	var student = new Building('student', 100, 'a student', 1);
	var treeFarm = new Building('treeFarm', 1100, 'a farm', 8);

	var buildings = {
		'student':student,
		'treeFarm':treeFarm
	};

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
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
		var id = Object.keys(obj[0].buildings)[i];
		var name = obj[0].buildings[id].name;
		var cost = obj[0].buildings[id].cost;
		var description = obj[0].buildings[id].description;
		var MPS = obj[0].buildings[id].BMPS;

		//putting them into the buildings dict
		buildings[Object.keys(obj[0].buildings)[i]] = new Building(name, cost, description, MPS);
	}

	//console.log(buildings);
	return buildings;
}
var getUpgrades = function(){
	var obj = JSON.parse(data);
	//console.log(obj);
	var upgrades = {};

	for(var i = 0; i < Object.keys(obj[0].upgrades).length; i++){

		//Fetching all of the data from the json 
		var id = Object.keys(obj[0].upgrades)[i];
		var name = obj[0].upgrades[id].name;
		var cost = obj[0].upgrades[id].cost;
		var description = obj[0].upgrades[id].description;
		var effected = obj[0].upgrades[id].effected;
		var mult = obj[0].upgrades[id].mult;

		//putting them into the buildings dict
		upgrades[Object.keys(obj[0].upgrades)[i]] = new Upgrade(mult, name, description, effected, cost);
	}
	//console.log(upgrades);
	return upgrades
}

var drawBuilding = function(){
	fill(0);

	var offset = 50;
	var offsetDiff = 0;
	offset += offsetDiff;

	//drawing the building icons
	var heightNew = height - (buildingHeightDiv() * (offsetDiff+1));
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];

		var scale = (buildingWidth(width)/3)/buildingsImg[0].width;
		var buildingHeight = buildingsImg[0].height*scale;
		offsetDiff = buildingHeight/5;


		buildingSprites[tmp] = createSprite(buildingWidth(width) + buildingWidth(width)/6, heightNew * i/buildingHeightDiv() + offset + (heightNew * 1/buildingHeightDiv())/2);

		//Started to impliment the images
		buildingSprites[tmp].addImage('1', buildingsImg[0]);
		buildingSprites[tmp].addImage('2', buildingsImg[1]);
		buildingSprites[tmp].scale = scale;
		buildingSprites[tmp].visible = false;

		offset += offsetDiff;
		buildingSprites[tmp].shapeColor = 0;
	}
}
var drawUpgrades = function(){
	fill(0);

	var offset = 50;
	var offsetDiff = 0;
	offset += offsetDiff;
	//drawing the building icons
	var heightNew = height - (buildingHeightDiv() * (offsetDiff+1));
	
	upgradesSprites["back"] = createSprite(buildingWidth(width)+250, height/2, height, 700);
	upgradesSprites.back.shapeColor = 0;

	for(var i = 0; i < Object.keys(upgrades).length; i++){
		var tmp = Object.keys(upgrades)[i];

		/*
		var scale = (buildingWidth(width)/3)/buildingsImg[0].width;
		var buildingHeight = buildingsImg[0].height*scale;*/
		var buildingHeight = 60;
		offsetDiff = buildingHeight/5;

		upgradesSprites[tmp] = createSprite(buildingWidth(width) + buildingWidth(width)/6, heightNew * i/buildingHeightDiv() + offset + (heightNew * 1/buildingHeightDiv())/2, buildingWidth(width)/4, buildingHeight);
		upgradesSprites[tmp].visible = false;
		offset += offsetDiff;
		upgradesSprites[tmp].shapeColor = 255;
	}
}

var overlayUpdate = function(){

	var overlay = createSprite(buildingWidth(width)-buildingWidth(width)/4, mouseY, buildingWidth(width)/2, height*2/buildingHeightDiv());
	overlay.shapeColor = 255;

	return overlay;
}

var niceNumbers = function(num, floats){
	var str='';
	num=Math.round(num*100000)/100000;//get rid of weird rounding errors
	if (floats>0)
	{
		var floater=num-Math.floor(num);
		floater=Math.round(floater*100000)/100000;//get rid of weird rounding errors
		var floatPresent=floater?1:0;
		floater=(floater.toString()+'0000000').slice(2,2+floats);//yes this is hacky (but it works)
		str=niceNumbers(Math.floor(num))+(floatPresent?('.'+floater):'');
	}
	else
	{
		num=Math.floor(num);
		num=(num+'').split('').reverse();
		for (var i in num)
		{
			if (i%3==0 && i>0) str=','+str;
			str=num[i]+str;
		}
	}
	return str;
}

var bigNumbers = function(num){
	num = Math.round(num*10)/10;
	stringedNum = num.toString();
	var numbers = ["Thousand", "Million", "Billion", "Trillion", "Quadrillion"];


	if(stringedNum.length > 15){
		return stringedNum.slice(0, -15) + "." + stringedNum.slice(0, -(stringedNum.length-3)) + " " + numbers[4];
	} else if(stringedNum.length > 12){
		return stringedNum.slice(0, -12) + "." + stringedNum.slice(0, -(stringedNum.length-3)) + " " + numbers[3];
	} else if(stringedNum.length > 9){
		return stringedNum.slice(0, -9) + "." + stringedNum.slice(0, -(stringedNum.length-3)) + " " + numbers[2];
	} else if(stringedNum.length > 6){
		return stringedNum.slice(0, -6) + "." + stringedNum.slice(0, -(stringedNum.length-3)) + " " + numbers[1];
	}

	return niceNumbers(num, 1);
}

var changeVisible = function(spriteGroup, state){
	for(var i = 0; i< Object.keys(spriteGroup).length; i++){
		pressed = Object.keys(spriteGroup)[i];

		//making sure that bought upgrades & locked buildings will not be reshown
		if(spriteGroup[pressed].bought === true || spriteGroup[pressed].unlocked === false){
			spriteGroup[pressed].visible = false;
		} else{
			spriteGroup[pressed].visible = state;
		}
	}
}

var buildingScene = function(){
	changeVisible(buildingSprites, true);
	changeVisible(upgradesSprites, false);
	buildingMode = true;
}
var upgradeScene = function(){
	changeVisible(buildingSprites, false);
	changeVisible(upgradesSprites, true);
	buildingMode = false;
}

var displayText = function(){
	for(var i = 0; i< Object.keys(upgradesSprites).length; i++){
		var pressed = Object.keys(upgradesSprites)[i];

		fill(0);
		if(pressed !== "back" && upgrades[pressed].unlocked && !upgrades[pressed].bought && !buildingMode){
			text(upgrades[pressed].name + "-- " + upgrades[pressed].cost, upgradesSprites[pressed].position.x, upgradesSprites[pressed].position.y);
		}
	}

}

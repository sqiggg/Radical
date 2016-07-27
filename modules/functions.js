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

		console.log(buildingHeight);
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
	stringedNum = num.toString()
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

var buildingScene = function(){
	buildingMode = true;
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		pressed = Object.keys(buildingSprites)[i];
		buildingSprites[pressed].visible = true;
	}
}
var upgradeScene = function(){
	buildingMode = false;
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		pressed = Object.keys(buildingSprites)[i];
		buildingSprites[pressed].visible = false;
	}
}
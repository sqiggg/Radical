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
		buildingsIconsSprites[tmp] = createSprite(buildingWidth(width)+30, heightNew * i/buildingHeightDiv() + offset + (heightNew * 1/buildingHeightDiv())/2, 1, 1);

		try {
			buildingsIconsSprites[tmp].addImage('icon', buildingsIcons[i]);
			buildingsIconsSprites[tmp].scale = 40/buildingsIcons[i].height;
		} catch(error){

		}

		//Started to impliment the images
		buildingSprites[tmp].addImage('1', buildingsImg[0]);
		buildingSprites[tmp].addImage('2', buildingsImg[1]);

		buildingSprites[tmp].scale = scale;
		buildingSprites[tmp].visible = false;
		buildingsIconsSprites[tmp].visible = false;

		offset += offsetDiff;
		buildingSprites[tmp].shapeColor = 0;
		buildingsIconsSprites[tmp].shapeColor = 0;

		if (i<2)
			buildings[tmp].selected = true;
	}
}

var drawUpgrades = function(){
	fill(0);

	var offset = 50;
	var offsetDiff = 0;
	offset += offsetDiff;
	//drawing the building icons
	var heightNew = height - (buildingHeightDiv() * (offsetDiff+1));
	
	upgradesSprites["back"] = createSprite(width/2 - buildingWidth(width)/3+125, upgradeHeight(height)/2, buildingWidth(width), upgradeHeight(height));
	upgradesSprites.back.shapeColor = 50;
}

var overlayUpdate = function(){

	var overlay = createSprite(buildingWidth(width)-buildingWidth(width)/4, mouseY, buildingWidth(width)/2, height*2/buildingHeightDiv());
	overlay.shapeColor = 255;
	overlay.visible = buildingMode;

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

var changeVisibleTechTree = function(spriteGroup, state){
	for(var i = 0; i< Object.keys(spriteGroup).length; i++){
		pressed = Object.keys(spriteGroup)[i];

		//making sure that bought upgrades & locked buildings will not be reshown
		if(spriteGroup[pressed].bought === true || buildings[pressed].unlocked === false){
			spriteGroup[pressed].visible = false;
		} else{
			spriteGroup[pressed].visible = state;
		}
	}
}

var techTreeDisplay = function(){
	
	var offset = 10;
	for(var i = 0; i < Object.keys(techTreeBuildings).length; i++){
		var tmp = Object.keys(techTreeBuildings)[i];

		var textDisplay = buildings[tmp].name;

		if(buildings[tmp].unlocked){
			text(textDisplay, techTreeBuildings[tmp].position.x, techTreeBuildings[tmp].position.y);
		}
		offset += 50;
	}
}

var techTreeInit = function(){
	var initOffset = 100;
	var offset = 10;
	var xVal = 150;
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];

		var textDisplay = buildings[tmp].name;

		techTreeBuildings[tmp] = createSprite(xVal, initOffset+offset, 200, 40);
		techTreeBuildings[tmp].shapeColor = color(255,0,0);
		techTreeBuildings[tmp].visible = false;


		techTreeIcons[tmp] = createSprite(xVal-80, initOffset+offset, 1, 1);

		try{
			techTreeIcons[tmp].addImage(buildingsIcons[i]);
			techTreeIcons[tmp].scale = 20/buildingsIcons[i].height;
			techTreeIcons[tmp].shapeColor = 0;
			techTreeIcons[tmp].visible = false;
		} catch(err){
		}

		offset += 50;

		if (offset+150 >= upgradeHeight(height)){
			offset = 10;
			xVal += 210
		}
	}
}

var buildingScene = function(){
	changeVisible(buildingSprites, true);
	changeVisible(buildingsIconsSprites, true);
	//changeVisible(imgIconCount, true);

	changeVisible(upgradesSprites, false);
	changeVisibleTechTree(techTreeBuildings, false);
	changeVisibleTechTree(techTreeIcons, false);
	buildingMode = true;
}

var upgradeScene = function(){
	changeVisible(buildingSprites, false);
	changeVisible(buildingsIconsSprites, false);
	//changeVisible(imgIconCount, false);

	changeVisible(upgradesSprites, true);
	changeVisibleTechTree(techTreeBuildings, true);
	changeVisibleTechTree(techTreeIcons, true);

	buildingMode = false;
}

var displayText = function(){
	for(var i = 0; i< Object.keys(upgradesSprites).length; i++){
		var pressed = Object.keys(upgradesSprites)[i];

		fill(0);
		if(pressed !== "back" && upgrades[pressed].unlocked && !upgrades[pressed].bought && !buildingMode){
			text(upgrades[pressed].name + "\n" + upgrades[pressed].cost, upgradesSprites[pressed].position.x, upgradesSprites[pressed].position.y);
		}
	}
}

var buildingsUnlocking = function(){
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];
		//var displayingText = "Not Displayed";

		buildings[Object.keys(buildings)[0]].unlocked = true;
			//console.log(buildings[Object.keys(buildings)[tmp]])
		

		buildingSprites[tmp].visible = buildings[tmp].selected;
		buildingsIconsSprites[tmp].visible = buildings[tmp].selected;



		if (Math.round(MONEY) >= buildings[tmp].cost && buildings[tmp].unlocked == false){

			buildings[tmp].unlocked = true;
			buildings[tmp].selected = true;
		}


		if (buildings[tmp].unlocked){
			displayedText = buildings[tmp].name + "\n" + bigNumbers(Math.round(buildings[tmp].getCost(buyButtonMode)));

		} else if(i > 0 && buildings[Object.keys(buildings)[i-1]].unlocked === true){
			//limited information
			displayedText = "???\n" + bigNumbers(Math.round(buildings[tmp].getCost(buyButtonMode)));
			buildingSprites[tmp].visible = buildingMode
			buildingsIconsSprites[tmp].visible = buildingMode
		} else{
			buildingSprites[tmp].visible = false;
			buildingsIconsSprites[tmp].visible = false;

			displayedText = '';
		}

		if(buildingSprites[tmp].visible){
			textAlign(CENTER)
			text(displayedText, buildingSprites[tmp].position.x, buildingSprites[tmp].position.y);
			textAlign(RIGHT);
			displayAmount();

			//text(buildings[tmp].amount + "x " + buildings[tmp].name + "(s)", width-100 - buildingSprites[tmp].position.x, buildingSprites[tmp].position.y + buildingSprites[tmp].height/6)
			textAlign(CENTER);
		}


			textAlign(CENTER);
		}

		//12345
		console.log(tmp)

		if(buildingSprites[tmp].position.y+buildingSprites[tmp].height/2 >= height){
			buildings[tmp].selected = false;
		}

		//buildingWidth(width) + buildingWidth(width)/6, heightNew * i/buildingHeightDiv() + offset + (heightNew * 1/buildingHeightDiv())/2
}
var alertSystem = function(){
	for(var i = 0; i < Object.keys(buildings).length; i++){
	var tmp = Object.keys(buildings)[i];
	if ((buildings[tmp].name === "Student") && (buildings[tmp].amount === 5)){
		var student = "News Flash: Students working at a local SurfShop make shoddy surfboards.(Click to dismiss)"
			fill('#fae');
			textSize(20);
			text(student, 0, 0, 200, 100);
			fill(0);
			if (mousePress == true){
				student = '';
			}
			
		}
	}

}

var overlayDisplay = function(){
	overlay.visible = false;
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]]) && buildingSprites[Object.keys(buildingSprites)[i]].visible === true){
			var text_to_display = '';

			overlayed = Object.keys(buildingSprites)[i];

			if(buildingMode){
				if(buildings[overlayed].unlocked === true){
					 text_to_display = buildings[overlayed].amount +" -- " +buildings[overlayed].name + "\n\n Each " + buildings[overlayed].name + " produces " + bigNumbers(buildings[overlayed].baseMps) + " mps\n" + "total producing: " + bigNumbers(buildings[overlayed].producing) + "\nCost: " + buildings[overlayed].cost;
				} else{
					text_to_display = "???" + "\n\n\nCost: " + buildings[overlayed].cost;
				}
			}

			text(text_to_display, overlay.position.x-overlay.width/2, overlay.position.y-overlay.height/2, overlay.position.x-overlay.width/2, overlay.position.y + overlay.width/2);
			overlay.visible = true;
		}
	}
}

var displayAmount = function(){
	var initOffset = upgradeHeight(height);
	var offset = 30;
	var xVal = 50;
	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];

		var textDisplay = buildings[tmp].name;

		if(buildings[tmp].unlocked)
			imgIconCount[tmp].visible = buildingMode;
		else
			imgIconCount[tmp].visible = false;

		if(buildingMode && buildings[tmp].unlocked){
			text(buildings[tmp].amount + "x ", xVal, initOffset+offset)
		}


		offset += 50;
		//console.log(offset, height)
		if (offset+initOffset+10 >= height){
			offset = 30;
			xVal += 160
		}
	}
}

var displayAmountInit = function(){
	var initOffset = upgradeHeight(height);
	var offset = 30;
	var xVal = 50;

	for(var i = 0; i < Object.keys(buildings).length; i++){
		var tmp = Object.keys(buildings)[i];
		var textDisplay = buildings[tmp].name;


		//&& buildings[tmp].unlocked){
		if(buildingMode ){
			imgIconCount[tmp] = createSprite(xVal+20, initOffset+offset-5, 1, 1);

			try{
				imgIconCount[tmp].addImage(buildingsIcons[i]);
				imgIconCount[tmp].scale = 30/buildingsIcons[i].height;
				imgIconCount[tmp].shapeColor = 0;
				imgIconCount[tmp].position.x += (buildingsIcons[i].width * 30/buildingsIcons[i].height)/2
				//console.log(buildingsIcons[i].width * 30/buildingsIcons[i].height)

			} catch(err){
			}
		}

		offset += 50;
		//console.log(offset, height)
		if (offset+initOffset+10 >= height){
			offset = 30;
			xVal += 160
		}
	}
}

var mousePress = function(){
	//pressed shack
	if(shackSprite.overlap(mouseSprite)&&buildingMode){
		MONEY = shack.onClick(MONEY);

		//surfbaords coming off
		var surfboard = createSprite(mouseX, mouseY, 10, 10);
		surfboard.addImage(surfboards[Math.round(Math.random() * (surfboards.length-1))]);
		surfboard.shapeColor = 0;

		surfboard.velocity = createVector(random(-0.5, 0.5), random(-1.5, -1));
		surfboard.velocity.mult(5);


		//make the shack "Bounce" on click
		shackSprite.scale = 0.9;
		setTimeout(function() {shackSprite.scale = 1;}, 100);
	}

	//click check for buying buildings
	for(var i = 0; i< Object.keys(buildingSprites).length; i++){
		if(mouseSprite.overlap(buildingSprites[Object.keys(buildingSprites)[i]]) && buildingSprites[Object.keys(buildingSprites)[i]].visible === true){
			pressed = Object.keys(buildingSprites)[i];
			
			//buying the buildings
			if(MONEY >= buildings[pressed].getCost(buyButtonMode) && buildings[pressed].unlocked){
				MONEY -= buildings[pressed].getCost(buyButtonMode);
				for(var x = 0; x < buyButtonMode; x++){
					buildings[pressed].buy();		
					buildingSprites[pressed].changeImage('2');
					setTimeout(function(){buildingSprites[pressed].changeImage('1');}, 100); 

				}
			}
		}
	}


	if(buyButton.overlap(mouseSprite) && buyButton.visible === true){
		if (buyButtonMode === 100){
			buyButtonMode = 1;
			buyButton.addImage(buy1);
		} else if (buyButtonMode === 10){
			buyButtonMode = 100;
			buyButton.addImage(buy100);
		} else if(buyButtonMode === 1){
			buyButtonMode = 10;
			buyButton.addImage(buy10);
		}
	}

	if(upgradesButton.overlap(mouseSprite)){
		if(buildingMode)
			upgradeScene();
		else
			buildingScene();

	}

	//Check for selecting IN Tech tree
	for(var i = 0; i< Object.keys(techTreeBuildings).length; i++){
		if(mouseSprite.overlap(techTreeBuildings[Object.keys(techTreeBuildings)[i]]) && techTreeBuildings[Object.keys(techTreeBuildings)[i]].visible === true){
			pressed = Object.keys(techTreeBuildings)[i];
			

			//console.log(buildings[pressed].name);
			if (buildings[pressed].selected === false){
				techTreeBuildings[pressed].shapeColor = color(0,128,0);
				buildings[pressed].selected = true;
			} else{
				techTreeBuildings[pressed].shapeColor = color(255,0,0);
				buildings[pressed].selected = false;
			}
		}
	}
}
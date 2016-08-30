var mousePress = function(){
	//pressed shack
	if(shackSprite.overlap(mouseSprite)&&buildingMode){
		MONEY = shack.onClick(MONEY);

		//surfbaords coming off
		surfboard.push(createSprite(mouseX, mouseY, 10, 10));

		try{
			var randNum = Math.round(Math.random() * (surfboards.length-1));
			surfboard[surfboard.length-1].addImage(surfboards[randNum]);
			surfboard[surfboard.length-1].scale = surfboards[0].width/surfboards[randNum].width
		}catch(err){

		}	
		surfboard[surfboard.length-1].shapeColor = 0;
		boop.setVolume(0.8 * mute);
		boop.play();

		surfboard[surfboard.length-1].velocity = createVector(random(-0.5, 0.5), random(-1.5, -1));
		surfboard[surfboard.length-1].velocity.mult(5);


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
					toot.setVolume(0.6 * mute);
					toot.play();
					buildingSprites[pressed].changeImage('1');
					setTimeout(function(){
						buildingSprites[pressed].changeImage('2');
					}, 100);

				}
			}
		}
	}

	if(musicButton.overlap(mouseSprite)){
		if(musicButton.getAnimationLabel() === 'cross') {
			musicButton.changeImage('nocross');
			music.setVolume(vol);
		} else {
			musicButton.changeImage('cross');
			music.setVolume(0);
		}
	}

	if(sfxButton.overlap(mouseSprite)){
		if(sfxButton.getAnimationLabel() === 'cross') {
			sfxButton.changeImage('nocross');
			mute = 1;
		} else {
			sfxButton.changeImage('cross');
			mute = 0;
		}
	}


	if(buyButton.overlap(mouseSprite) && buyButton.visible === true){

		 if (buyButtonMode === 10){
			buyButtonMode = 1;
			buyButton.addImage(buy1);
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
				buildings[pressed].selected = true;
			} else{
				buildings[pressed].selected = false;
			}

			//Redrawing the order
			var offset = 50;
			var offsetDiff = 0;
			offset += offsetDiff;

			//moving the icons
			var heightNew = height - (buildingHeightDiv() * (offsetDiff+1));
			var p = 0;
			for(var i = 0; i < Object.keys(buildings).length; i++){
				var tmp = Object.keys(buildings)[i];
				if (buildings[tmp].selected || !buildings[tmp].unlocked){
					var scale = (buildingWidth(width)/3)/buildingsImg[0].width;
					var buildingHeight = buildingsImg[0].height*scale;
					
					offsetDiff = buildingHeight/5;

					buildingSprites[tmp].position.x = buildingWidth(width) + buildingWidth(width)/6;
					buildingSprites[tmp].position.y = heightNew * p/buildingHeightDiv() + offset + (heightNew * 1/buildingHeightDiv())/2;

					buildingSprites[tmp].scale = scale;
					p++;
					offset += offsetDiff;
				}
			}
		}
	}
};

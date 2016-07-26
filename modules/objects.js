var Shack = function(fps) {
	this.fansPerClick = fps;

	this.onClick = function(fans) {
		return fans += this.fansPerClick;
	}
}
var Building = function(name, cost, description, baseFps){
	this.baseFps = baseFps;
	this.initCost = cost;
	this.description = description;
	this.name = name;
	this.amount = 0;
	this.modifier = 0;
	this.totalFansMade = 0;
	this.cost;

	this.getFps = function(){
		return this.baseFps * this.modifier * this.amount;
	}
	this.applyModifier = function(mod){
		this.modifier += mod;
	}
	this.buy = function(amount){
		this.amount += amount
	}
}

var Upgrade = function(){
	this.modifier;
	this.name;
	this.quote;
	this.description;
	this.affectedBuilding;
	this.bought = false;

	this.buy = function(){
		this.bought = true;
		Building[this.affectedBuilding].applyModifier(this.modifier);
	}
}
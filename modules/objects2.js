var Building = function(){
	this.baseFps;
	this.initCost;
	this.description;
	this.name;
	this.amount;
	this.modifier;
	this.totalFansMade;
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
		Building.[this.affectedBuilding].applyModifier(this.modifier);
	}
}
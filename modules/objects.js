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
	this.modifier = 1;
	this.totalFansMade = 0;
	this.cost = cost;
	this.producing = 0;

	this.getFps = function(){
		return this.baseFps * this.modifier * this.amount;
	}
	this.applyModifier = function(mod){
		this.modifier += mod;
	}
	this.buy = function(){
		this.amount += 1;
		//incramentally getting more expensive the more the player buys
		this.cost = Math.round(this.initCost * Math.pow(1.15, this.amount));
		this.producing += this.baseFps * this.modifier;
		return this.baseFps * this.modifier;
	}
	this.getCost = function(){
		return Math.round(this.initCost * Math.pow(1.15, this.amount));
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
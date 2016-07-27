var Shack = function(Mps) {
	this.MoneyPerClick = Mps;

	this.onClick = function(Money) {
		return Money += this.MoneyPerClick;
	}
}
var Building = function(name, cost, description, baseMps){
	this.baseMps = baseMps;
	this.initCost = cost;
	this.description = description;
	this.name = name;
	this.amount = 0;
	this.modifier = 1;
	this.totalMoneyMade = 0;
	this.cost = cost;
	this.producing = 0;
	this.unlocked = false;

	this.getMps = function(){
		return this.baseMps * this.modifier * this.amount;
	}
	this.applyModifier = function(mod){
		this.modifier += mod;
	}
	this.buy = function(){
		this.amount += 1;
		//incramentally getting more expensive the more the player buys
		this.cost = Math.round(this.initCost * Math.pow(1.15, this.amount));
		this.producing += this.baseMps * this.modifier;
		return this.baseMps * this.modifier;
	}
	this.getCost = function(n){
		//console.log(Math.round(this.initCost * Math.pow(1.15, this.amount)));
		return (this.initCost * (Math.pow(1.15, this.amount+n) - Math.pow(1.15, this.amount)))/0.15;
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
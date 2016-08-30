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
	this.selected = false;

	this.getMps = function(){
		return this.baseMps * this.modifier * this.amount;
	}
	this.applyModifier = function(mod){
		this.modifier *= mod;
		this.baseMps *= this.modifier;
		this.producing *= this.modifier;
	}
	this.buy = function(){
		this.amount += 1;

		//incramentally getting more expensive the more the player buys
		this.cost = Math.round(this.initCost * Math.pow(1.15, this.amount));
		
		//console.log(this.baseMps);
		this.producing += this.baseMps;
		return this.baseMps;
	}
	this.getCost = function(n){
		return (this.initCost * (Math.pow(1.15, this.amount+n) - Math.pow(1.15, this.amount)))/0.15;
	}
}

var Upgrade = function(mod, name, description, affectedBuilding, cost){
	this.modifier = mod;
	this.name = name;
	this.description = description;
	this.affectedBuilding = affectedBuilding;
	this.bought = false;
	this.unlocked = true;
	this.cost = cost

	this.buy = function(){
		this.bought = true;
		buildings[this.affectedBuilding].applyModifier(parseInt(this.modifier));
	}
}
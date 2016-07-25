var shack = function() {
	this.fansPerClick;

	this.onClick = function(fans) {
		return fans += this.fansPerClick;
	}
}
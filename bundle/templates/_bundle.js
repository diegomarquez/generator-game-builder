define(function(require) {	
	//Insert require calls to other modules this bundle will use here

	// This properties are available to a bundle
	// this.gameObjectPool. A reference to the Game Objects Pool	
	// this.componentPool. A reference to the Components Pool
	// this.canvas. A reference to the canvas.

	var <% print( _(name).classify() ) %> = require('bundle').extend({
		create: function(args) {
			//Add things to the gameObjectPool and componentPool objects here
		}
	});

	return new <% print( _(name).classify() ) %>();
});
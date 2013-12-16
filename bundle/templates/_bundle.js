define(function(require) {	
	//Insert require calls to other modules this bundle will use here

	var <% print( _(name).classify() ) %> = require('bundle').extend({
		create: function(args) {
			//Add things to the gameObjectPool and componentPool objects here
		}
	});

	return new <% print( _(name).classify() ) %>();
});
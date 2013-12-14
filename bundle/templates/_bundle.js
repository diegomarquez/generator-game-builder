define(function(require) {
	var gb = require('gb');
	var bundle = require('bundle');
	
	var goPool = gb.goPool;
	var coPool = gb.coPool;

	//Insert require calls to other modules this bundle will use here

	var <%= name %> = bundle.extend({
		create: function() {
			//Add things to the goPool and coPool objects here			
		}
	});

	return new <%= name %>();
});
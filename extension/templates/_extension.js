define([<% print(allModules.join(', ')) %>], function(<% print( print(moduleArguments.join(', ')) ) %>) {
	//Don't forget to call this._super() when overriding these methods.
	//Unless you want things to go horribly undefined.

	var <% print( _(name).classify() ) %> = <% print( _(mainModule).classify() ) %>.extend({		
		// Uncomment the type you want this extension to have
		type: function() {
			// return gb.game.CREATE; 
			// return gb.game.BLUR; 
			// return gb.game.FOCUS;
			// return gb.game.UPDATE;
		},

		// This is the method this extension will execute to make your stuff happen.
		execute: function() {
	
		}
	});

	return <% print( _(name).classify() ) %>;
});


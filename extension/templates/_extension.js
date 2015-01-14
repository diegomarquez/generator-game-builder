define([<% print(allModules.join(', ')) %>], function(<% print( print(moduleArguments.join(', ')) ) %>) {
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


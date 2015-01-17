define([<% print(allModules.join(', ')) %>], function(<% print( print(moduleArguments.join(', ')) ) %>) {
	var <% print( _(name).classify() ) %> = <% print( _(mainModule).classify() ) %>.extend({		
		// Uncomment the type you want this extension to have
		type: function() {
			return Gb.game.<% print(extensionType) %>
		},

		// This is the method this extension will execute to make your stuff happen.
		execute: function() {
	
		},

		// This method should undo what this extensions does should it be removed
		destroy: function() {
	
		}
	});

	return <% print( _(name).classify() ) %>;
});


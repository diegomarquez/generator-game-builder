define([<% print(allModules.join(', ')) %>], function(<% print( print(moduleArguments.join(', ')) ) %>) {
	//Don't forget to call this._super() when overriding these methods.
	//Unless you want things to go horribly undefined.

	var <% print( _(name).classify() ) %> = <% print( _(mainModule).classify() ) %>.extend({		
		// Contructor
		init: function() {
			this._super();
		},

		// Called after a game object is pulled out of a pool to start using it
		reset: function() {
			this._super();
		},

		// Called after reset(). Receives initialization arguments
		configure: function(args) {
			this._super(args);	
		},

		// All game objects must call this method before they can start doing their thing
		start: function() {
			this._super();
		},

		// Called continually through the main update loop, as the name implies	
		// Receives the delta time between this frame and the last, in milliseconds.
		update: function(delta) {
			this._super(delta);
		},

		// Called before the game object is sent back to its pool for reuse
		destroy: function() {
			this._super();
		},

		// If the game object has a collider component this method will be executed
		// Receives the game objects that it collided with
		onCollide: function(other) {
			this._super(other);	
		}
	});

	return <% print( _(name).classify() ) %>;
});

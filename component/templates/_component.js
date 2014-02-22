define(['component'], function(Component){
	//Don't forget to call this._super() when overriding these methods.
	//Unless you want things to go horribly undefined.

	var Component = Component.extend({
		// Contructor
		init: function() {
			this._super();
		},

		// Receives initialization arguments
		configure: function(args) {
			this._super(args);
		},

		// Called when the component is added to a game object
		added: function(parent) {
			this._super();			
		},

		// Called when the component is removed from a game object
		removed: function(parent) {
			this._super();
		},

		// Called the the component is sent back to the component pool for re-use
		recycle: function() {
			this._super();
		},

		// Called after the start method of the parent is called
		start: function() {
			this._super();
		},
		
		// Called continually through the main update loop, as the name implies	
		// Receives the delta time between this frame and the last, in milliseconds.
		update: function(delta) {
			this._super();
		},

		// Called before the component is sent back to its pool for reuse
		destroy: function() {
			this._super();
		},

		// Use this method for debugging purposes. If the parent game object
		// has it's debug property set to true this method is called.
		// And you can draw things using the context that is passed in.
		debug_draw: function(context) {

		}
	});

	return <% print( _(name).classify() ) %>;
});

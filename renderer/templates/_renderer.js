define(function(require) {
	var draw = require('draw');

	var <% print( _(name).classify() ) %> = require('renderer').extend({
		//context property is the context of the canvas we are using, somehow it becomes available here.
		draw: function(context) {

		}
	});

	return <% print( _(name).classify() ) %>;
});
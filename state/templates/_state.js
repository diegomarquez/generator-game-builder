define(function(require){
	var state_machine_factory = require("state_machine");

	// The states can dispatch three types of events, 
	// 'next'. Only a fixed state machine understands this event, it makes it move to the next state.
		// state.execute('next', {nextInitArgs:{}, lastCompleteArgs:{} });
	// 'previous'. Only a fixed state machine understands this event, it makes it move to the previous state.
		// state.execute('previous', {nextInitArgs:{}, lastCompleteArgs:{} });
	// 'change'. Only a loose state machine understands this event, it make it move to the specified state.
		// state.execute('change', {next:'id', nextInitArgs:{}, lastCompleteArgs:{} });

	return function(name) {
		var state = state_machine_factory.createState(this, name);

		// This will be executes when this state begins execution
		state.addStartAction(function(args){

		});

		// This will be executes when this state ends execution
		state.addCompleteAction(function(args){

		});

		// This will be executed when the update method of the state machine containing this state is executed
		state.addUpdateAction(function(args){

		});

		return state;
	};
});

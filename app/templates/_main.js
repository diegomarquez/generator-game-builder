// <%= name %>'s main entry point 

// The 'gb' module in turns loads the main dependencies of the framework.
// Since all of them work together, it's better to have a single module load them all.
define(['gb'], function(gb){
	// Typing gb.'something' for everything can make things look messy.
	var game = gb.game;
	var root = gb.root;

	// This is the main initialization function
	game.on("init", this, function() {
		console.log("Hi!")
	});

	// This is the main update loop
	game.on("update", this, function() {
		// Updates all the things
		root.update(game.delta);
		// Draws all the things
		root.transformAndDraw(game.context);
	});

	// This is the main setup that kicks off the whole thing
	// Notice how it needs to find a div '#main' and a div '#game' in the document
	game.create(document.getElementById('main'), document.getElementById('game'));
});
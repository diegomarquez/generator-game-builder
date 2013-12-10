// <%= name %>'s main entry point 

// The 'gb' module in turns loads the main dependencies of game-builder.
// Since all of them work together, it's better to have a single module load them all.
define(['gb'], function(gb){
	// Typing gb.'something' for everything can make things look messy.
	var game = gb.game;
	var root = gb.root;

	//This extensions are code that is generic enough to be on their own module.
	//Not generic enough to be on the core of game-builder, thought.
	<% _.forEach(extensions, function(extension) { %>game.add_extension(require("<%= extension %>"));
	<% }); %>
	// This is the main initialization function
	game.on("init", this, function() {
		console.log("Welcome to Game-Builder!");
	});

	// This called when the game is paused
	game.on("pause", this, function() {
		console.log("<%= name %> is now paused");
	});

	// This called when the game is resumed
	game.on("resume", this, function() {
		console.log("<%= name %> resumes action");
	});

	// This is the main update loop
	game.on("update", this, function() {
		// Updates ALL the things.
		root.update(game.delta);
		// Draws ALL the things.
		root.transformAndDraw(game.context);
	});

	// This is the main setup that kicks off the whole thing
	// Notice how it needs to find a '#main' and '#game' in the document
	game.create(document.getElementById('main'), document.getElementById('game'));
});

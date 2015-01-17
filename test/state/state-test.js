describe('SubGenerator Renderer', function () {
	
	describe('file creation with required arguments', function() {
		beforeEach(function (done) {
			createSubGeneratorWithPrompt('state', ['myState'], {}, done);
		});

		it('creates a file', function () {
	    assertFileExists(__dirname + '/temp/mystate.js');    
	  });

	  it('creates a file with a dasherized name', function (done) {
	    createSubGeneratorWithPrompt('state', ['my state'], {},
	    	function() {
					assertFileExists(__dirname + '/temp/my-state.js');
		    	done();
	    	}
	    );
	  });
	});

	describe('file generation with optional arguments', function() {
		it('generates require calls', function (done) {
	    createSubGenerator('state', [
	  		'my State',
	  		'module1',
	  		'module2',
	  		'module3', 
	    ], function() {

	    	assertFileExists(__dirname + '/temp/my-state.js');
	    	
	    	assert.fileContent('my-state.js', new RegExp("var module1 = require\\(\\'module1\\'\\)"));
	    	assert.fileContent('my-state.js', new RegExp("var module2 = require\\(\\'module2\\'\\)"));
	    	assert.fileContent('my-state.js', new RegExp("var module3 = require\\(\\'module3\\'\\)"));

	    	done();
	    });
	  });

	  it('underscorizes variable names of generated require calls if there are spaces in the arguments', function (done) {
	    createSubGenerator('state', [
	  		'my State',
	  		'module 1',
	  		'module 2',
	  		'module 3', 
	    ], function() {

	    	assert.file('my-state.js');
	    	assert.fileContent('my-state.js', new RegExp("var module_1 = require\\(\\'module 1\\'\\)"));
	    	assert.fileContent('my-state.js', new RegExp("var module_2 = require\\(\\'module 2\\'\\)"));
	    	assert.fileContent('my-state.js', new RegExp("var module_3 = require\\(\\'module 3\\'\\)"));

	    	done();
	    });
	  });
	});
});

describe('SubGenerator Extension', function () {
	
	describe('file creation with no arguments', function() {
		beforeEach(function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { extensionType: 'CREATE'}, done);
		});

		it('creates a file', function () {
	    assertFileExists(__dirname + '/temp/myextension.js');    
	  });

	  it('creates a file extending from default module and adding default dependencies', function () {
	  	assertDependencies('myextension.js', ["extension", "gb"]);
	  });

	  it('creates a file with a dasherized name', function (done) {
	    createSubGeneratorWithPrompt('extension', ['my Extension'], {},
	    	function() {
					assertFileExists(__dirname + '/temp/my-extension.js');
		    	done();
	    	}
	    );
	  });
	});

	describe('file creation with dependencies', function() {
		it('adds 1 dependency', function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { dependencies: 'dep1' }, function() {
				assertDependencies('myextension.js', ["extension", "dep1", "gb"]);
				done();	
			});
	  });

	  it('adds 2 dependencies', function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { dependencies: 'dep1, dep2' }, function() {
				assertDependencies('myextension.js', ["extension", "dep1", "dep2", "gb"]);
				done();	
			});
	  });

	  it('adds 3 dependencies', function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { dependencies: 'dep1, dep2, dep3' }, function() {
				assertDependencies('myextension.js', ["extension", "dep1", "dep2", "dep3", "gb"]);
				done();	
			});
	  });

	  it('spaces before and after dependency names are ignored', function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { dependencies: '    dep 1   ,    dep 2   ,    dep 3    ' }, function() {
				assertDependencies('myextension.js', ["extension", "dep 1", "dep 2", "dep 3", "gb"]);
				done();	
			});
	  });
	}); 

	describe('extension types', function() {
		it('sets CREATE type', function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { extensionType: 'CREATE'}, function() {
				assert.fileContent('myextension.js', new RegExp('return Gb.game.CREATE'));
				done();
			});
		});

		it('sets FOCUS type', function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { extensionType: 'FOCUS'}, function() {
				assert.fileContent('myextension.js', new RegExp('return Gb.game.FOCUS'));
				done();
			});
		});

		it('sets BLUR type', function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { extensionType: 'BLUR'}, function() {
				assert.fileContent('myextension.js', new RegExp('return Gb.game.BLUR'));
				done();
			});
		});

		it('sets UPDATE type', function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { extensionType: 'UPDATE'}, function() {
				assert.fileContent('myextension.js', new RegExp('return Gb.game.UPDATE'));
				done();
			});
		});
	});

	describe('module has expected methods', function() {
		before(function (done) {
			createSubGeneratorWithPrompt('extension', ['MyExtension'], { extensionType: 'CREATE'}, done);
		});

		it(' :type', function() {
			assertMethodExistance('myextension.js', 'type', "");
			rejectSuperCallExistance('myextension.js', 'type');
		});

		it(' :execute', function() {
			assertMethodExistance('myextension.js', 'execute', "");
			rejectSuperCallExistance('myextension.js', 'execute');
		});

		it(' :destroy', function() {
			assertMethodExistance('myextension.js', 'destroy', "");
			rejectSuperCallExistance('myextension.js', 'destroy');
		});
	});
});

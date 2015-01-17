describe('SubGenerator Component', function () {
	
	describe('file creation with default arguments', function() {
		beforeEach(function (done) {
			createSubGeneratorWithPrompt('component', ['myComponent'], {}, done);
		});

		it('creates a file', function () {
	    assertFileExists(__dirname + '/temp/mycomponent.js');    
	  });

	  it('creates a file extending from default module', function () {
	  	assertDependencies('mycomponent.js', ["component"]);
	  });

	  it('creates a file with a dasherized name', function (done) {
	    createSubGeneratorWithPrompt('component', ['my Component'], {},
	    	function() {
					assertFileExists(__dirname + '/temp/my-component.js');
		    	done();
	    	}
	    );
	  });
	});

	describe('file creation with mainModule argument', function() {
		beforeEach(function (done) {
			createSubGeneratorWithPrompt('component', ['myComponent'], {mainModule: 'custom-component'}, done);
		});

		it('creates a file with a custom module to extend from', function () {
			assertDependencies('mycomponent.js', ["custom-component"]);
	  });
	});

	describe('file creation with dependencies argument', function() {
		it('adds 1 dependency', function (done) {
			createSubGeneratorWithPrompt('component', ['myComponent'], {dependencies: 'dep1'}, function() {
				assertDependencies('mycomponent.js', ["component", "dep1"]);
				done();	
			});
	  });

	  it('adds 2 dependencies', function (done) {
			createSubGeneratorWithPrompt('component', ['myComponent'], {dependencies: 'dep1, dep2'}, function() {
				assertDependencies('mycomponent.js', ["component", "dep1", "dep2"]);
				done();	
			});
	  });

	  it('adds 3 dependencies', function (done) {
			createSubGeneratorWithPrompt('component', ['myComponent'], {dependencies: 'dep1, dep2, dep3'}, function() {
				assertDependencies('mycomponent.js', ["component", "dep1", "dep2", "dep3"]);
				done();	
			});
	  });

	  it('cleans up white space in argument', function (done) {
			createSubGeneratorWithPrompt('component', ['myComponent'], {dependencies: 'dep11,      dep22     ,    dep33      '}, function() {
				assertDependencies('mycomponent.js', ["component", "dep11", "dep22", "dep33"]);
				done();	
			});
	  });
	}); 

	describe('module has expected methods', function() {
		before(function (done) {
			createSubGeneratorWithPrompt('component', ['myComponent'], {}, done);
		});

		it(' :init', function() {
			assertMethodExistance('mycomponent.js', 'init', "");
			assertSuperCallExistance('mycomponent.js', 'init', "");
		});

		it(' :configure', function() {
			assertMethodExistance('mycomponent.js', 'configure', "args");
			assertSuperCallExistance('mycomponent.js', 'configure', "args");
		});

		it(' :added', function() {
			assertMethodExistance('mycomponent.js', 'added', "parent");
			assertSuperCallExistance('mycomponent.js', 'added', "parent");
		});

		it(' :removed', function() {
			assertMethodExistance('mycomponent.js', 'removed', "parent");
			assertSuperCallExistance('mycomponent.js', 'removed', "parent");
		});

		it(' :recycle', function() {
			assertMethodExistance('mycomponent.js', 'recycle', "");
			assertSuperCallExistance('mycomponent.js', 'recycle', "");
		});

		it(' :start', function() {
			assertMethodExistance('mycomponent.js', 'start', "parent");
			assertSuperCallExistance('mycomponent.js', 'start', "parent");
		});

		it(' :update', function() {
			assertMethodExistance('mycomponent.js', 'update', "delta");
			assertSuperCallExistance('mycomponent.js', 'update', "delta");
		});

		it(' :destroy', function() {
			assertMethodExistance('mycomponent.js', 'destroy', "");
			assertSuperCallExistance('mycomponent.js', 'destroy', "");
		});

		it(' :debug_draw', function() {
			assertMethodExistance('mycomponent.js', 'destroy', "context, viewport, draw");
		});
	});
});

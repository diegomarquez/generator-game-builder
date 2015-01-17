describe('SubGenerator Renderer', function () {
	
	describe('file creation with default arguments', function() {
		beforeEach(function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], {}, done);
		});

		it('creates a file', function () {
	    assertFileExists(__dirname + '/temp/myrenderer.js');    
	  });

	  it('creates a file extending from default module', function () {
	  	assertDependencies('myrenderer.js', ["renderer"]);
	  });

	  it('creates a file with a dasherized name', function (done) {
	    createSubGeneratorWithPrompt('renderer', ['my renderer'], {},
	    	function() {
					assertFileExists(__dirname + '/temp/my-renderer.js');
		    	done();
	    	}
	    );
	  });
	});

	describe('file creation with mainModule argument', function() {
		it('creates a file with a custom module to extend from', function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], { mainModule: 'custom-module' }, function () {
				assertDependencies('myrenderer.js', ["custom-module"]);
				done();
			});
	  });

	  it('creates a file with the required helper for a bitmap-renderer', function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], { mainModule: 'bitmap-renderer' }, function () {
				assertDependencies('myrenderer.js', ["bitmap-renderer", "image-cache"]);
				done();
			});
	  });

	  it('creates a file with the required helper for a path-renderer', function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], { mainModule: 'path-renderer' }, function () {
				assertDependencies('myrenderer.js', ["path-renderer", "path-cache"]);
				done();
			});
	  });

	  it('creates a file with the required helper for a text-renderer', function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], { mainModule: 'text-renderer' }, function () {
				assertDependencies('myrenderer.js', ["text-renderer", "text-cache"]);
				done();
			});
	  });
	});

	describe('file creation with dependencies argument', function() {
		it('adds 1 dependency', function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], { mainModule: 'bitmap-renderer', dependencies: 'dep1' }, function() {
				assertDependencies('myrenderer.js', ["bitmap-renderer", "dep1", "image-cache"]);
				done();	
			});
	  });

	  it('adds 2 dependencies', function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], { mainModule: 'bitmap-renderer', dependencies: 'dep1, dep2' }, function() {
				assertDependencies('myrenderer.js', ["bitmap-renderer", "dep1", "dep2", "image-cache"]);
				done();	
			});
	  });

	  it('adds 3 dependencies', function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], { mainModule: 'bitmap-renderer', dependencies: 'dep1, dep2, dep3' }, function() {
				assertDependencies('myrenderer.js', ["bitmap-renderer", "dep1", "dep2", "dep3", "image-cache"]);
				done();	
			});
	  });

	  it('cleans up white space in argument', function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], { mainModule: 'bitmap-renderer', dependencies: 'dep11,      dep22     ,    dep33      ' }, function() {
				assertDependencies('myrenderer.js', ["bitmap-renderer", "dep11", "dep22", "dep33", "image-cache"]);
				done();	
			});
	  });
	}); 

	describe('module has expected methods', function() {
		before(function (done) {
			createSubGeneratorWithPrompt('renderer', ['myRenderer'], {}, done);
		});

		it(' :init', function() {
			assertMethodExistance('myrenderer.js', 'init', "");
			assertSuperCallExistance('myrenderer.js', 'init', "");
		});

		it(' :configure', function() {
			assertMethodExistance('myrenderer.js', 'configure', "args");
			assertSuperCallExistance('myrenderer.js', 'configure', "args");
		});

		it(' :added', function() {
			assertMethodExistance('myrenderer.js', 'added', "parent");
			assertSuperCallExistance('myrenderer.js', 'added', "parent");
		});

		it(' :removed', function() {
			assertMethodExistance('myrenderer.js', 'removed', "parent");
			assertSuperCallExistance('myrenderer.js', 'removed', "parent");
		});

		it(' :recycle', function() {
			assertMethodExistance('myrenderer.js', 'recycle', "");
			assertSuperCallExistance('myrenderer.js', 'recycle', "");
		});

		it(' :start', function() {
			assertMethodExistance('myrenderer.js', 'start', "parent");
			assertSuperCallExistance('myrenderer.js', 'start', "parent");
		});

		it(' :update', function() {
			assertMethodExistance('myrenderer.js', 'update', "delta");
			assertSuperCallExistance('myrenderer.js', 'update', "delta");
		});

		it(' :destroy', function() {
			assertMethodExistance('myrenderer.js', 'destroy', "");
			assertSuperCallExistance('myrenderer.js', 'destroy', "");
		});

		it(' :rendererWidth', function() {
			assertMethodExistance('myrenderer.js', 'rendererWidth', "");
			assertSuperCallExistance('myrenderer.js', 'rendererWidth', "");
		});

		it(' :rendererHeight', function() {
			assertMethodExistance('myrenderer.js', 'rendererHeight', "");
			assertSuperCallExistance('myrenderer.js', 'rendererHeight', "");
		});

		it(' :rendererOffsetX', function() {
			assertMethodExistance('myrenderer.js', 'rendererOffsetX', "");
			assertSuperCallExistance('myrenderer.js', 'rendererOffsetX', "");
		});

		it(' :rendererOffsetY', function() {
			assertMethodExistance('myrenderer.js', 'rendererOffsetY', "");
			assertSuperCallExistance('myrenderer.js', 'rendererOffsetY', "");
		});

		it(' :draw', function() {
			assertMethodExistance('myrenderer.js', 'draw', "context");
			assertSuperCallExistance('myrenderer.js', 'draw', "context");
		});

		it(' :debug_draw', function() {
			assertMethodExistance('myrenderer.js', 'debug_draw', "context, viewport, draw");
			rejectSuperCallExistance('myrenderer.js', 'debug_draw');
		});
	});
});

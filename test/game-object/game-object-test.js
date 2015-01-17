describe('SubGenerator GameObject', function () {
	
	describe('file creation with default arguments', function() {
		beforeEach(function (done) {
			createSubGeneratorWithPrompt('game-object', ['myGameObject'], {}, done);
		});

		it('creates a file', function () {
	    assertFileExists(__dirname + '/temp/mygameobject.js');    
	  });

	  it('creates a file extending from default module', function () {
	  	assertDependencies('mygameobject.js', ["game-object"]);
	  });

	  it('creates a file with a dasherized name', function (done) {
	    createSubGeneratorWithPrompt('game-object', ['my gameobject'], {},
	    	function() {
					assertFileExists(__dirname + '/temp/my-gameobject.js');
		    	done();
	    	}
	    );
	  });
	});

	describe('file creation with mainModule argument', function() {
		beforeEach(function (done) {
			createSubGeneratorWithPrompt('game-object', ['myGameObject'], {mainModule: 'custom-game-object'}, done);
		});

		it('creates a file with a custom module to extend from', function () {
			assertDependencies('mygameobject.js', ["custom-game-object"]);
	  });
	});

	describe('file creation with dependencies argument', function() {
		it('adds 1 dependency', function (done) {
			createSubGeneratorWithPrompt('game-object', ['myGameObject'], {dependencies: 'dep1'}, function() {
				assertDependencies('mygameobject.js', ["game-object", "dep1"]);
				done();	
			});
	  });

	  it('adds 2 dependencies', function (done) {
			createSubGeneratorWithPrompt('game-object', ['myGameObject'], {dependencies: 'dep1, dep2'}, function() {
				assertDependencies('mygameobject.js', ["game-object", "dep1", "dep2"]);
				done();	
			});
	  });

	  it('adds 3 dependencies', function (done) {
			createSubGeneratorWithPrompt('game-object', ['myGameObject'], {dependencies: 'dep1, dep2, dep3'}, function() {
				assertDependencies('mygameobject.js', ["game-object", "dep1", "dep2", "dep3"]);
				done();	
			});
	  });

	  it('cleans up white space in argument', function (done) {
			createSubGeneratorWithPrompt('game-object', ['myGameObject'], {dependencies: 'dep11,      dep22     ,    dep33      '}, function() {
				assertDependencies('mygameobject.js', ["game-object", "dep11", "dep22", "dep33"]);
				done();	
			});
	  });
	}); 

	describe('module has expected methods', function() {
		before(function (done) {
			createSubGeneratorWithPrompt('game-object', ['myGameObject'], {}, done);
		});

		it(' :init', function() {
			assertMethodExistance('mygameobject.js', 'init', "");
			assertSuperCallExistance('mygameobject.js', 'init', "");
		});

		it(' :configure', function() {
			assertMethodExistance('mygameobject.js', 'configure', "args");
			assertSuperCallExistance('mygameobject.js', 'configure', "args");
		});

		it(' :added', function() {
			assertMethodExistance('mygameobject.js', 'added', "parent");
			assertSuperCallExistance('mygameobject.js', 'added', "parent");
		});

		it(' :removed', function() {
			assertMethodExistance('mygameobject.js', 'removed', "parent");
			assertSuperCallExistance('mygameobject.js', 'removed', "parent");
		});

		it(' :start', function() {
			assertMethodExistance('mygameobject.js', 'start', "");
			assertSuperCallExistance('mygameobject.js', 'start', "");
		});

		it(' :update', function() {
			assertMethodExistance('mygameobject.js', 'update', "delta");
			assertSuperCallExistance('mygameobject.js', 'update', "delta");
		});

		it(' :destroy', function() {
			assertMethodExistance('mygameobject.js', 'destroy', "");
			assertSuperCallExistance('mygameobject.js', 'destroy', "");
		});

		it(' :onCollide', function() {
			assertMethodExistance('mygameobject.js', 'onCollide', "other");
			assertSuperCallExistance('mygameobject.js', 'onCollide', "other");
		});
	});
});

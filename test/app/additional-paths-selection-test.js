describe('Generator Game-Builder with additional paths selection', function () {
	describe('boolean is true', function() {
		beforeEach(function (done) {
			createAppGenerator({
	    	'name': 'my game',
	      'width': 400,
	    	'height': 300,
	      'defaultGeneration': false,
	      'frameworkTag': 'master',
		    'additionalPaths': true,
		    'additionalSrcPaths': '../custom-src-path',
		    'additionalAssetPaths': '../custom-asset-path',
	    }, done);
	  });
		
		it('adds the paths to package.json properly', function () {
			assertPackageJson('name', 'my game');
			assertPackageJson('additionalSrcPaths', '../custom-src-path');
			assertPackageJson('additionalAssetPaths', '../custom-asset-path');
			assertPackageJson('framework', './game-builder');
			assertPackageJson('lib', './lib');
			assertPackageJson('frameworkTag', 'master');
		});	
	});

	describe('boolean is false', function() {
		beforeEach(function (done) {
			createAppGenerator({
	    	'name': 'my game',
	      'width': 400,
	    	'height': 300,
	      'defaultGeneration': false,
		    'frameworkTag': 'master',
		    'additionalPaths': false,
		    'additionalSrcPaths': '../custom-src-path',
		    'additionalAssetPaths': '../custom-asset-path',
	    }, done);
	  });

		it('ignores the paths when building package.json', function () {
			assertPackageJson('name', 'my game');
			assertPackageJson('additionalSrcPaths', '');
			assertPackageJson('additionalAssetPaths', '');
			assertPackageJson('framework', './game-builder');
			assertPackageJson('lib', './lib');
			assertPackageJson('frameworkTag', 'master');
		});
	});
});


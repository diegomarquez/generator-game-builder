describe('Generator Game-Builder with branch selection', function () {
	beforeEach(function (done) {
		createAppGenerator({
    	'name': 'my game',
    	'height': 300,
      'width': 400,
      'defaultGeneration': false,
	    'frameworkTag': 'master'
    }, done);
  });
	
	it('builds package.json properly', function () {
		assertPackageJson('name', 'my game');
		assertPackageJson('additionalSrcPaths', '');
		assertPackageJson('additionalAssetPaths', '');
		assertPackageJson('framework', './game-builder');
		assertPackageJson('lib', './lib');
		assertPackageJson('frameworkTag', 'master');
	});
});

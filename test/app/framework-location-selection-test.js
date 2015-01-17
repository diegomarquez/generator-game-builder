describe('Generator Game-Builder with framework location selection', function () {
	beforeEach(function (done) {
		createAppGenerator({
    	'name': 'my game',
      'width': 400,
    	'height': 300,
      'defaultGeneration': false,
	    'frameworkTag': 'master',
	    'frameworkLocation': '../custom-framework-location'
    }, done);
  });
	
	it('builds package.json properly', function () {
		assertPackageJson('name', 'my game');
		assertPackageJson('additionalSrcPaths', '');
		assertPackageJson('additionalAssetPaths', '');
		assertPackageJson('framework', '../custom-framework-location');
		assertPackageJson('lib', './lib');
		assertPackageJson('frameworkTag', 'master');
	});
});

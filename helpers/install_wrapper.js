module.exports = function() {
	return {
		bowerInstall: function(context, options, cb) {
			context.installDependencies({ 
        		skipInstall: options['skip-install'],
        		bower: true,
        		npm: false,
        		callback:cb
      		});
		},

		npmInstall: function(context, options, cb) {
			context.installDependencies({ 
        		skipInstall: options['skip-install'],
        		bower: false,
        		npm: true,
        		callback:cb
      		});
		}
	}
}
module.exports = function(grunt) {
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

  	shell: {
  		yo: {
  			command: 'yo canvas-game-scaffold:build-setup --force <%= pkg.additionalSrcPaths %>'
  		}
  	},

  	open: {
  		index : {
    	  path : 'index.html'
    	}
  	}
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['shell:yo', 'open:index']);
  grunt.registerTask('refresh', ['shell:yo', 'open:index']);
  grunt.registerTask('run', ['open:index']);
};
module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      dist: ['dist']
    },
    shell: {
      build: {
        command: 'tsc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['clean', 'shell:build']);
};

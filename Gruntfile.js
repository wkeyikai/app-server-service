var grunt = require('grunt');

grunt.config.init({
  pkg: grunt.file.readJSON('./dist/pack/package.json'),
  'create-windows-installer': {
    ia32: {
      appDirectory: './dist/pack/test-win32-x64',
      outputDirectory: './dist/pack/installer64',
      authors: 'aaron',
      title: 'test',
      exe: 'test.exe',
      description: 'test',
      noMsi: true,
      loadingGif: 'cc.ico',
      setupIcon: 'cc.ico',
      icon: 'cc.ico',
    }
  }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);
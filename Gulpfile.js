var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var exec = require('child_process').exec;

var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app.js', 'client/scripts/**/*.js'],
  html: ['client/views/*.html', 'client/index.html'],
  styles: ['client/styles/*.css'],
  test: ['specs/**/*.js']
};

// Runs client-side tests
gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// Runs server-side tests
gulp.task('mocha', function(done) {
  exec('mocha specs/server --compilers js:babel-register', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if(err) {
      process.exit(1);
    }
  });
});

// TODO: npm test should call gulp test which should do tasks mocha, karma
gulp.task('test', ['mocha', 'karma']);

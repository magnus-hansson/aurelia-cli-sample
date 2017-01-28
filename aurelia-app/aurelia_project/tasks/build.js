import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';
import del from 'del';

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS
  ),
  writeBundles,
  copyToCordova
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}

function copyToCordova() {  
  del(['../www/**/*'], {force:true});
  return gulp.src([
    '**/*',

    '!node_modules',
    '!node_modules/**',
    '!aurelia_project',
    '!aurelia_project/**',
    '!custom_typings',
    '!custom_typings/**',
    '!typings',
    '!typings/**',
    '!src',
    '!src/**',
    '!test',
    '!test/**',
    '!*.js',
    '!*.json'

    ])
    .pipe(gulp.dest('../www'))
}
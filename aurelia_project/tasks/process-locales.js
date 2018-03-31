import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processLocales() {
  return gulp.src(project.localesProcessor.source)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(build.bundle());
}

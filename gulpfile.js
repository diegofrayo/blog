//------------------------------------------------------------------
//-------------- Load Plugins And Their Settings -------------------
const gulp = require('gulp');
const fs = require('fs');
const g = require('gulp-load-plugins')({ lazy: false });
const browserSync = require('browser-sync').create();
const showdown = require('showdown');

const HTML_MIN_OPTS = {
  removeComments: true,
  collapseWhitespace: true,
  removeEmptyAttributes: false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true,
};

const tm = new Date().getTime();
const mdParser = new showdown.Converter({ ghCompatibleHeaderId: true, rawHeaderId: true });
let destPath = './build/blog';
let environment = 'development';

//----------------------------------------------------
//------------------- Util Functions -----------------
const sortByDate = (a, b) => {

  let aDate = a.date;
  let bDate = b.date;

  if (aDate === bDate) {
    return 0;
  } else if (aDate > bDate) {
    return -1;
  }

  return 1;
};

const createHTMLEntries = () => {

  let html = '';
  const posts = JSON.parse(fs.readFileSync('./assets/posts.json', 'utf8')).data.sort(sortByDate);
  const extension = environment === 'development' ? '.html' : '';

  return posts
    .map(
      post => `<article class="post">
        <p class="date">${post.date}</p>
        <a href="/blog/${post.slug}${extension}" class="title">${post.title}</a>
        <section class="tags-container">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </section>
      </article>`
    )
    .join('');
};

const createServer = () => {
  browserSync.init({
    server: {
      baseDir: './build',
    },
  });
};

//----------------------------------------------------
//------------------- JS Tasks -----------------------
gulp.task('build-js', () => {

  let stream = gulp
    .src(`${__dirname}/src/js/main.js`)
    .pipe(g.babel({ presets: ['env'] }));

  if (environment === 'production') {
    stream = stream.pipe(g.uglify());
  }

  stream.pipe(gulp.dest(`${destPath}/js`));
});

//----------------------------------------------------
//------------------- CSS Tasks -----------------------
gulp.task('build-css', () => {

  let stream = gulp
    .src(`${__dirname}/src/styles/main.less`)
    .pipe(g.less())
    .pipe(g.rename('styles.css'));

  if (environment === 'production') {
    stream = stream.pipe(g.minifyCss());
  }

  stream.pipe(gulp.dest(`${destPath}/css`));
});

//----------------------------------------------------
//------------------- HTML Tasks ---------------------
gulp.task('build-homepage', () => {

  let stream = gulp
    .src('./src/index.html')
    .pipe(g.replace('<!-- HTML -->', createHTMLEntries()))
    .pipe(g.replace('<!-- TIMESTAMP -->', tm));

  if (environment === 'production') {
    stream = stream
      .pipe(g.htmlmin(HTML_MIN_OPTS))
  }

  stream.pipe(gulp.dest(environment === 'development' ? destPath.replace('/blog', '') : destPath));
});

gulp.task('build-posts', () => {

  const posts = JSON.parse(fs.readFileSync('./assets/posts.json', 'utf8')).data;

  posts.forEach(post => {
    const html = mdParser.makeHtml(fs.readFileSync(`./assets/md/${post.slug}.md`, 'utf8'));
    gulp
      .src('./src/post.html')
      .pipe(g.replace('<!-- HTML -->', html))
      .pipe(g.replace('<!-- TITLE -->', post.title))
      .pipe(g.replace('<!-- DATE -->', post.date))
      .pipe(g.replace('<!-- SLUG -->', post.slug))
      .pipe(g.replace('<!-- IMAGE -->', post.image))
      .pipe(g.replace('<!-- DESCRIPTION -->', post.description))
      .pipe(g.replace('<!-- TIMESTAMP -->', tm))
      .pipe(g.htmlmin(HTML_MIN_OPTS))
      .pipe(g.rename(`${post.slug}.html`))
      .pipe(gulp.dest(destPath));
  });
});

//----------------------------------------------------
//------------------- Copy Assets Tasks --------------
gulp.task('copy-assets', () => {
  gulp.src('./assets/images/**/*')
    .pipe(g.imagemin())
    .pipe(gulp.dest(`${destPath}/images`));
});

//-------------------------------------------------------
//----------------- Main Tasks --------------------------
gulp.task('watch', ['build-homepage', 'build-css', 'build-js', 'build-posts', 'copy-assets'], () => {

  createServer();

  gulp
    .watch('./src/styles/*.less', ['build-css'])
    .on('change', browserSync.reload);

  gulp
    .watch('./src/js/*.js', ['build-js'])
    .on('change', browserSync.reload);

  gulp
    .watch('./src/index.html', ['build-homepage'])
    .on('change', browserSync.reload);

  gulp
    .watch(['./assets/md/*', './src/post.html'], ['build-posts'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['watch']);

//-------------------------------------------------------
//----------------- Builds Tasks ------------------------
gulp.task('build-production', () => {
  environment = 'production';
  destPath = './../website-router/public/blog';
  gulp.start('build-homepage', 'build-css', 'build-js', 'build-posts', 'copy-assets');
});

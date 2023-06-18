const fs = require('fs');
const path = require('path');
const asciidoctor = require('@asciidoctor/core')();
const revealjs = require('@asciidoctor/reveal.js');
const mkdirp = require('mkdirp');

const inputFile = path.join(__dirname, 'src', 'index.adoc');
const outputDir = path.join(__dirname, 'dist');
const revealjsSrc = 'https://cdn.jsdelivr.net/npm/reveal.js@4.0.2';
const imagesSrcDir = path.join(__dirname, 'src', 'images');
const imagesDestDir = path.join(__dirname, 'dist', 'images');

(async function build() {
  revealjs.register();

  mkdirp.sync(outputDir);

  // Copy image files.
  fs.mkdirSync(imagesDestDir);
  fs.readdirSync(imagesSrcDir).forEach(file => {
    fs.copyFileSync(path.join(imagesSrcDir, file), path.join(imagesDestDir, file));
  });
  console.log('Copied images to dist.');

  const options = {
    safe: 'safe',
    backend: 'revealjs',
    to_dir: outputDir,
    attributes: {
      'source-highlighter': 'highlight.js',
      'linkattrs': true,
      'revealjsdir': revealjsSrc,
      'revealjs_history': true,
      'revealjs_theme': 'moon', // 'black' 'moon' 'night'
      'revealjs_transition': 'slide'
    }
  };

  await asciidoctor.convertFile(inputFile, options);

  console.log('Converted AsciiDoc slides to HTML');
})();

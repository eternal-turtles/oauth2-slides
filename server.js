const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const path = require('path');
const process = require('process');

const app = express();
const port = process.env.PORT || 5555;
const outputDir = path.join(__dirname, 'dist');

// Setup LiveReload server.
const livereloadServer = livereload.createServer({
  // Reload on changes to these file extensions.
  exts: ['adoc', 'png', 'gif', 'jpg', 'jpeg', 'svg'],
});

// Start LiveReload server.
livereloadServer.watch(outputDir);

// Inject livereload.js into HTML files served by the server.
app.use(connectLivereload());

// Serve static files from dist directory.
app.use(express.static('dist'));

// Start server and listen on port.
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}/`);
});

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'dist');

(function clean() {
  if (!fs.existsSync(outputDir)) {
    return;
  }
  fs.readdirSync(outputDir).forEach(file => {
    if (file !== '.keep') {
      const filePath = path.join(outputDir, file);
      const fileStats = fs.statSync(filePath);
      if (fileStats.isDirectory()) {
        fs.rmdirSync(filePath, {recursive: true});
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });
  console.log('Cleaned dist');
})();

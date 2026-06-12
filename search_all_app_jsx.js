const fs = require('fs');
const path = require('path');

function findAppJsx(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        return; // skip if cannot stat
      }
      if (stat && stat.isDirectory()) {
        if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
          results = results.concat(findAppJsx(fullPath));
        }
      } else {
        if (file === 'App.jsx' || file.includes('App.jsx')) {
          results.push({ path: fullPath, size: stat.size, mtime: stat.mtime });
        }
      }
    });
  } catch (e) {
    // ignore directory read error
  }
  return results;
}

console.log('Searching C:\\laragon\\www for App.jsx...');
const matches = findAppJsx('C:\\laragon\\www');
console.log(`Found ${matches.length} matches:`);
matches.forEach(m => {
  console.log(`${m.path} (${m.size} bytes) - Modified: ${m.mtime}`);
});

const fs = require('fs');
const path = require('path');

function getFileTree(dirPath) {
  const result = [];

  function readDir(currentPath, resultArray) {
    const items = fs.readdirSync(currentPath);

    items.forEach(item => {
      const itemPath = path.join(currentPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        const folder = {
          name: item,
          type: 'folder',
          files: []
        };
        readDir(itemPath, folder.files);
        resultArray.push(folder);
      } else if (stats.isFile()) {
        const file = {
          name: path.basename(item, path.extname(item)),
          type: 'file',
          file: path.relative(dirPath, itemPath)
        };
        resultArray.push(file);
      }
    });
  }

  readDir(dirPath, result);
  return result;
}

// Path to the public directory
const publicDirPath = 'public/pages';
const fileTree = getFileTree(publicDirPath);

// Save the result to a JSON file
fs.writeFileSync(
    'public/data_json/content.json',
    JSON.stringify(fileTree, null, 2)
  );
  
  console.log('File tree generated successfully');

console.log(JSON.stringify(fileTree, null, 2));

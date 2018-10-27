/**
 * Remove unwanted files from `dist` folder
 *
 * When developing on docs2page, it is useful to put dummy client project files
 * into the public folder so you can see content when running with `npm run serve`.
 * These are the `package.json`, `README.md` and `docs.json` files that are the
 * source of a docs2page website's content. However, whilst these files are not
 * commited to the repo because they have been added to the `.gitignore` file,
 * they still get automatically output to the `dist` folder by `npm run build`.
 * We don't want these dummy files to be included in the npm package distribution
 * so this module removes them.
 */
const path = require('path');
const fs = require('fs-extra');

const root = process.env.PWD;
const dist = path.join(root, 'dist');

const removeFiles = [
  'docs.json',
  'README.md',
  'package.json',
];

console.log('Removing unwanted files from', dist, '...');
removeFiles.forEach(file => fs.removeSync(path.join(dist, file)));
console.log('Done.');

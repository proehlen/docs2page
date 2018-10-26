#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const documentation = require('documentation');

const d2pDist = path.join(__dirname, '../', 'dist');
const clientRoot = process.env.PWD;
const clientDocs = path.join(process.env.PWD, 'docs');

const overrideFiles = [
  'index.html',
  'GitHub.png',
  'css',
  'js',
];

const preserveFiles = [
  'favicon.ico',
  'logo.png',
];

const clientProjectFiles = [
  'README.md',
  'package.json',
];

console.log('Copying web app to', clientDocs, '...');
fs
  .ensureDir(clientDocs)
  .then(() => {
    const emptyDirectories = [
      fs.emptyDir(path.join(clientDocs, 'js')),
      fs.emptyDir(path.join(clientDocs, 'css')),
    ];
    Promise
      .all(emptyDirectories)
      .then(() => {
        const copyFiles = [];
        clientProjectFiles
          .forEach((file) => {
            const src = path.join(clientRoot, file);
            const dest = path.join(clientDocs, file);
            console.log('Copying', src, 'to', dest);
            copyFiles.push(fs.copy(src, dest));
          });

        overrideFiles
          .forEach((file) => {
            const src = path.join(d2pDist, file);
            const dest = path.join(clientDocs, file);
            console.log('Copying', src, 'to', dest);
            copyFiles.push(fs.copy(src, dest));
          });

        preserveFiles
          .forEach((file) => {
            const src = path.join(d2pDist, file);
            const dest = path.join(clientDocs, file);
            console.log('Maybe copying', src, 'to', dest);
            copyFiles.push(fs.copy(src, dest, { overwrite: false }));
          });

        Promise.all(copyFiles).then(() => {
          console.log('Building docs.json in', clientDocs);
          documentation.build(['src'], {})
            .then(comments => documentation.formats.json(comments, {}))
            .then((output) => {
              // output is a string of JSON data
              const dest = path.join(clientDocs, 'docs.json');
              fs.writeFileSync(dest, output);
              console.log('Finished.');
            });
        });
      });
  })
  .catch((err) => {
    console.error(err);
  });

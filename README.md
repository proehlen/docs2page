# docs2page - Automagic project websites

Docs2page automatically builds a web app to serve as your project website using information from your project's:

* `README.md` file
* `package.json` file
* Code comments

Web apps produced by this package can be hosted on GitHub Pages or any other cheap hosting option since it requires no server.

**Note:** This software is under construction and in pre-alpha state.

## Prerequisites

### Package file

Your `package.json` file should have the following fields maintained:

* `name`
* `version`
* `repository.url`

### Code comments

Docs2page generates the API page from output produced by the excellent [documentation.js](http://documentation.js.org/) package - a jsdocs builder with a lot of smarts built in to intelligently and automatically infer many tags.  `documentation.js` is particularly good for [Flow](https://flow.org/) projects since it can produce docs automatically from flow type annotations.  Docs2page will install and run `documentation.js` for you but it is up to you to document your source code according to its [easy to follow conventions](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md).

## Set up

* `npm install docs2page --save-dev`
* Include `docs2page` as a script your `package.json` file like this:
  ```
  "scripts": {
    ...
    "docs": "docs2page"
    ...
  }
  ```
* Run `npm run docs`.  Your project webpage will be created in the `docs` folder.

## Icons and logos 
 
Docs2page will create a default placeholder favicon and logo for you in the `docs` folder.  You may overwrite these with custom files for your project.  The two files are:

* `docs/logo.png`
* `docs/favicon.ico`

  All other content produced by this package in the `docs` folder will be automatically overwritten whenever the script is run but the above 2 files will be preserved.

## Publishing

The many options for hosting and publishing your project website are beyond the scope of this document, however [GitHub Pages provides an easy (automated) and cheap (free) service that will automatically update for you without requiring any extra steps](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/).  My personally prefered strategy is to publish from the `/docs` folder in the `master` branch.


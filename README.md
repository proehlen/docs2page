# docs2page - Automatically create and maintain a website for your project

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

Docs2page generates the API page from output produced by the excellent [documentation.js](http://documentation.js.org/) package - a jsdocs builder with a lot of smarts built in to intelligently and automatically infer many tags without you having to laboriously write them.  It is particularly good for [Flow](https://flow.org/) projects since it can produce docs automatically from flow type annotations.  Docs2page will install and run `documentation.js` for you but it is up to you to document your source code according to its [easy to follow conventions](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md).

## Set up

* `npm install docs2page --save-dev`
* Create a `docs` folder in the root of your project and add to it the following image files that represent your project:
  * `logo.svg`
  * `favicon.ico`

  All other content in this folder will be produced automatically and the above 2 files should be the only files you may wish to change in future.
* Include `docs2page` somewhere in your build or pre-publishing pipeline, eg in your `package.json` file like this:
  ```
  "scripts": {
    ...
    "prepare": "docs2page"
    ...
  }
  ```

## Publishing

The many options for hosting and publishing your project website are beyond the scope of this document, however [GitHub Pages provides an easy (automated) and cheap (free) service that will automatically update for you without requiring any extra steps](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/).  My personally prefered strategy is to publish from the `/docs` folder in the `master` branch.


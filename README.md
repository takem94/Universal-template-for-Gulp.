# Universal template for Gulp.
This template contains all of the most famous and useful plugins. 

## What it can do
* Compile SCSS/SASS to CSS.
* Cleans unused styles and minifying CSS.
* Compile Jade/Pug to HTML.
* Make your JavaScript code [es2015](ES6) to [es2011](ES5).
* Making possible to use node.js modules for the browsers.
* Reduces the size of pictures with formats: jpg,jpeg,svg,gif and png.
* Making sprites from png and svg files.

## Usage
Before you begin, you need to download and install [node.js](https://nodejs.org/).

1. **[Download this template]() and unpackage in a folder.**

2. **To get started use, you need open the folder with template and initialize by this commands in console:**
 ```
 $ npm install
 ```
 ```
 $ npm init
 ```
3. **Then you can start use Gulp tasks by this commands:**

 * `$ gulp` - Default command for watching all changes in the ***src/*** folder. 
 * `$ gulp build` - This command compiling all files in the ***src/*** folder and deploy to ***dist/*** folder. Use this command, when your project is done to production.
 * `$ gulp clearcached`

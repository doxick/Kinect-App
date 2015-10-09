"use strict";
require('./polyfills/requestanimationframe');
var App = require('./demoapp/demoapp');

(function initialize(){
    var app = new App(document.body, window.innerWidth, window.innerHeight);
    window.app = app;
    app.run();
})();
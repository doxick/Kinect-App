/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var App = __webpack_require__(2);

	(function initialize() {
	    var app = new App(document.body, window.innerWidth, window.innerHeight);
	    window.app = app;
	    app.run();
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	(function () {
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    var lastTime = 0;

	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        var vendor = vendors[x];
	        window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame) {
	        window.requestAnimationFrame = function (callback) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function () {
	                return callback(currTime + timeToCall);
	            }, timeToCall);

	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }

	    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
	        return clearTimeout(id);
	    };
	})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Three = __webpack_require__(3),
	    BaseApp = __webpack_require__(4),
	    ThreeTrackballControls = __webpack_require__(28),
	    HandState = __webpack_require__(8),
	    JointType = __webpack_require__(7);

	/*
	    We cache some geometry and materials so we don't have to create them on the fly every iteration
	    Saves memory + performance

	    OTHERWISE:
	        if you remove a mesh from a scene, do not forgot to mesh.geometry.dispose() otherwise it won't be removed.
	        If geometry is shared: this will remove it from memory so only remove it from the last mesh.
	 */
	var SPHERE = new Three.SphereGeometry(2.5, 16, 6);
	var MATERIALS = [new Three.MeshPhongMaterial({ color: 0xFF0000, specular: 0x009900, shininess: 30, shading: Three.FlatShading }), new Three.MeshPhongMaterial({ color: 0x00FF00, specular: 0x009900, shininess: 30, shading: Three.FlatShading }), new Three.MeshPhongMaterial({ color: 0x0000FF, specular: 0x009900, shininess: 30, shading: Three.FlatShading }), new Three.MeshPhongMaterial({ color: 0x00FFFF, specular: 0x009900, shininess: 30, shading: Three.FlatShading }), new Three.MeshPhongMaterial({ color: 0xFFFF00, specular: 0x009900, shininess: 30, shading: Three.FlatShading }), new Three.MeshPhongMaterial({ color: 0xFF00FF, specular: 0x009900, shininess: 30, shading: Three.FlatShading })];

	var DemoApp = (function (_BaseApp) {
	    _inherits(DemoApp, _BaseApp);

	    function DemoApp(container, width, height) {
	        _classCallCheck(this, DemoApp);

	        _get(Object.getPrototypeOf(DemoApp.prototype), 'constructor', this).call(this, container, width, height);

	        // add some trackball controls
	        this.controls = new ThreeTrackballControls(this.camera);
	        this.controls.target.set(0, 0, 0);

	        // add some light to show what's on
	        this.rootScene.add(new Three.AmbientLight(0xaaaaaa));
	        // add some shading light sources
	        var directionalLight = new Three.DirectionalLight(0xffffff, 0.5);
	        directionalLight.position.set(0, 0, 10);
	        this.rootScene.add(directionalLight);

	        // just a collection of the skeletons
	        this.baseNode = new Three.Object3D();
	        this.rootScene.add(this.baseNode);
	    }

	    _createClass(DemoApp, [{
	        key: 'onBodyData',
	        value: function onBodyData(bodyData) {
	            var _this = this;

	            this.baseNode.children.forEach(function (skeleton) {
	                _this.baseNode.remove(skeleton);
	            });

	            if (bodyData.bodies.length == 0) return;

	            bodyData.bodies.forEach(function (body, bodyIdx) {

	                var skeleton = new Three.Group();
	                body.joints.forEach(function (joint) {
	                    var mesh = new Three.Mesh(SPHERE, MATERIALS[[body.leftHandState, body.rightHandState].indexOf(HandState.Closed) > -1 ? 6 : bodyIdx]);
	                    mesh.position.set(joint.position.x * 100, joint.position.y * 100, joint.position.z * 100);
	                    skeleton.add(mesh);
	                });
	                _this.baseNode.add(skeleton);
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            this.controls.update();
	        }
	    }]);

	    return DemoApp;
	})(BaseApp);

	module.exports = DemoApp;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';var self=self || {}; // File:src/Three.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */var THREE={REVISION:'72'}; //
	if(true){!(__WEBPACK_AMD_DEFINE_FACTORY__ = (THREE), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else if('undefined' !== typeof exports && 'undefined' !== typeof module){module.exports = THREE;} // polyfills
	if(self.requestAnimationFrame === undefined || self.cancelAnimationFrame === undefined){ // Missing in Android stock browser.
	(function(){var lastTime=0;var vendors=['ms','moz','webkit','o'];for(var x=0;x < vendors.length && !self.requestAnimationFrame;++x) {self.requestAnimationFrame = self[vendors[x] + 'RequestAnimationFrame'];self.cancelAnimationFrame = self[vendors[x] + 'CancelAnimationFrame'] || self[vendors[x] + 'CancelRequestAnimationFrame'];}if(self.requestAnimationFrame === undefined && self.setTimeout !== undefined){self.requestAnimationFrame = function(callback){var currTime=Date.now(),timeToCall=Math.max(0,16 - (currTime - lastTime));var id=self.setTimeout(function(){callback(currTime + timeToCall);},timeToCall);lastTime = currTime + timeToCall;return id;};}if(self.cancelAnimationFrame === undefined && self.clearTimeout !== undefined){self.cancelAnimationFrame = function(id){self.clearTimeout(id);};}})();}if(Math.sign === undefined){ // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
	Math.sign = function(x){return x < 0?-1:x > 0?1:+x;};}if(Function.prototype.name === undefined && Object.defineProperty !== undefined){ // Missing in IE9-11.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
	Object.defineProperty(Function.prototype,'name',{get:function get(){return this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];}});} // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button
	THREE.MOUSE = {LEFT:0,MIDDLE:1,RIGHT:2}; // GL STATE CONSTANTS
	THREE.CullFaceNone = 0;THREE.CullFaceBack = 1;THREE.CullFaceFront = 2;THREE.CullFaceFrontBack = 3;THREE.FrontFaceDirectionCW = 0;THREE.FrontFaceDirectionCCW = 1; // SHADOWING TYPES
	THREE.BasicShadowMap = 0;THREE.PCFShadowMap = 1;THREE.PCFSoftShadowMap = 2; // MATERIAL CONSTANTS
	// side
	THREE.FrontSide = 0;THREE.BackSide = 1;THREE.DoubleSide = 2; // shading
	THREE.FlatShading = 1;THREE.SmoothShading = 2; // colors
	THREE.NoColors = 0;THREE.FaceColors = 1;THREE.VertexColors = 2; // blending modes
	THREE.NoBlending = 0;THREE.NormalBlending = 1;THREE.AdditiveBlending = 2;THREE.SubtractiveBlending = 3;THREE.MultiplyBlending = 4;THREE.CustomBlending = 5; // custom blending equations
	// (numbers start from 100 not to clash with other
	// mappings to OpenGL constants defined in Texture.js)
	THREE.AddEquation = 100;THREE.SubtractEquation = 101;THREE.ReverseSubtractEquation = 102;THREE.MinEquation = 103;THREE.MaxEquation = 104; // custom blending destination factors
	THREE.ZeroFactor = 200;THREE.OneFactor = 201;THREE.SrcColorFactor = 202;THREE.OneMinusSrcColorFactor = 203;THREE.SrcAlphaFactor = 204;THREE.OneMinusSrcAlphaFactor = 205;THREE.DstAlphaFactor = 206;THREE.OneMinusDstAlphaFactor = 207; // custom blending source factors
	//THREE.ZeroFactor = 200;
	//THREE.OneFactor = 201;
	//THREE.SrcAlphaFactor = 204;
	//THREE.OneMinusSrcAlphaFactor = 205;
	//THREE.DstAlphaFactor = 206;
	//THREE.OneMinusDstAlphaFactor = 207;
	THREE.DstColorFactor = 208;THREE.OneMinusDstColorFactor = 209;THREE.SrcAlphaSaturateFactor = 210; // depth modes
	THREE.NeverDepth = 0;THREE.AlwaysDepth = 1;THREE.LessDepth = 2;THREE.LessEqualDepth = 3;THREE.EqualDepth = 4;THREE.GreaterEqualDepth = 5;THREE.GreaterDepth = 6;THREE.NotEqualDepth = 7; // TEXTURE CONSTANTS
	THREE.MultiplyOperation = 0;THREE.MixOperation = 1;THREE.AddOperation = 2; // Mapping modes
	THREE.UVMapping = 300;THREE.CubeReflectionMapping = 301;THREE.CubeRefractionMapping = 302;THREE.EquirectangularReflectionMapping = 303;THREE.EquirectangularRefractionMapping = 304;THREE.SphericalReflectionMapping = 305; // Wrapping modes
	THREE.RepeatWrapping = 1000;THREE.ClampToEdgeWrapping = 1001;THREE.MirroredRepeatWrapping = 1002; // Filters
	THREE.NearestFilter = 1003;THREE.NearestMipMapNearestFilter = 1004;THREE.NearestMipMapLinearFilter = 1005;THREE.LinearFilter = 1006;THREE.LinearMipMapNearestFilter = 1007;THREE.LinearMipMapLinearFilter = 1008; // Data types
	THREE.UnsignedByteType = 1009;THREE.ByteType = 1010;THREE.ShortType = 1011;THREE.UnsignedShortType = 1012;THREE.IntType = 1013;THREE.UnsignedIntType = 1014;THREE.FloatType = 1015;THREE.HalfFloatType = 1025; // Pixel types
	//THREE.UnsignedByteType = 1009;
	THREE.UnsignedShort4444Type = 1016;THREE.UnsignedShort5551Type = 1017;THREE.UnsignedShort565Type = 1018; // Pixel formats
	THREE.AlphaFormat = 1019;THREE.RGBFormat = 1020;THREE.RGBAFormat = 1021;THREE.LuminanceFormat = 1022;THREE.LuminanceAlphaFormat = 1023; // THREE.RGBEFormat handled as THREE.RGBAFormat in shaders
	THREE.RGBEFormat = THREE.RGBAFormat; //1024;
	// DDS / ST3C Compressed texture formats
	THREE.RGB_S3TC_DXT1_Format = 2001;THREE.RGBA_S3TC_DXT1_Format = 2002;THREE.RGBA_S3TC_DXT3_Format = 2003;THREE.RGBA_S3TC_DXT5_Format = 2004; // PVRTC compressed texture formats
	THREE.RGB_PVRTC_4BPPV1_Format = 2100;THREE.RGB_PVRTC_2BPPV1_Format = 2101;THREE.RGBA_PVRTC_4BPPV1_Format = 2102;THREE.RGBA_PVRTC_2BPPV1_Format = 2103; // DEPRECATED
	THREE.Projector = function(){console.error('THREE.Projector has been moved to /examples/js/renderers/Projector.js.');this.projectVector = function(vector,camera){console.warn('THREE.Projector: .projectVector() is now vector.project().');vector.project(camera);};this.unprojectVector = function(vector,camera){console.warn('THREE.Projector: .unprojectVector() is now vector.unproject().');vector.unproject(camera);};this.pickingRay = function(vector,camera){console.error('THREE.Projector: .pickingRay() is now raycaster.setFromCamera().');};};THREE.CanvasRenderer = function(){console.error('THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js');this.domElement = document.createElement('canvas');this.clear = function(){};this.render = function(){};this.setClearColor = function(){};this.setSize = function(){};}; // File:src/math/Color.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Color = function(color){if(arguments.length === 3){return this.setRGB(arguments[0],arguments[1],arguments[2]);}return this.set(color);};THREE.Color.prototype = {constructor:THREE.Color,r:1,g:1,b:1,set:function set(value){if(value instanceof THREE.Color){this.copy(value);}else if(typeof value === 'number'){this.setHex(value);}else if(typeof value === 'string'){this.setStyle(value);}return this;},setHex:function setHex(hex){hex = Math.floor(hex);this.r = (hex >> 16 & 255) / 255;this.g = (hex >> 8 & 255) / 255;this.b = (hex & 255) / 255;return this;},setRGB:function setRGB(r,g,b){this.r = r;this.g = g;this.b = b;return this;},setHSL:(function(){function hue2rgb(p,q,t){if(t < 0)t += 1;if(t > 1)t -= 1;if(t < 1 / 6)return p + (q - p) * 6 * t;if(t < 1 / 2)return q;if(t < 2 / 3)return p + (q - p) * 6 * (2 / 3 - t);return p;}return function(h,s,l){ // h,s,l ranges are in 0.0 - 1.0
	h = THREE.Math.euclideanModulo(h,1);s = THREE.Math.clamp(s,0,1);l = THREE.Math.clamp(l,0,1);if(s === 0){this.r = this.g = this.b = l;}else {var p=l <= 0.5?l * (1 + s):l + s - l * s;var q=2 * l - p;this.r = hue2rgb(q,p,h + 1 / 3);this.g = hue2rgb(q,p,h);this.b = hue2rgb(q,p,h - 1 / 3);}return this;};})(),setStyle:function setStyle(style){var parseAlpha=function parseAlpha(strAlpha){var alpha=parseFloat(strAlpha);if(alpha < 1){console.warn('THREE.Color: Alpha component of color ' + style + ' will be ignored.');}return alpha;};var m;if(m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)){ // rgb / hsl
	var color;var name=m[1];var components=m[2];switch(name){case 'rgb':if(color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$/.exec(components)){ // rgb(255,0,0)
	this.r = Math.min(255,parseInt(color[1],10)) / 255;this.g = Math.min(255,parseInt(color[2],10)) / 255;this.b = Math.min(255,parseInt(color[3],10)) / 255;return this;}if(color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*$/.exec(components)){ // rgb(100%,0%,0%)
	this.r = Math.min(100,parseInt(color[1],10)) / 100;this.g = Math.min(100,parseInt(color[2],10)) / 100;this.b = Math.min(100,parseInt(color[3],10)) / 100;return this;}break;case 'rgba':if(color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9]*\.?[0-9]+)\s*$/.exec(components)){ // rgba(255,0,0,0.5)
	this.r = Math.min(255,parseInt(color[1],10)) / 255;this.g = Math.min(255,parseInt(color[2],10)) / 255;this.b = Math.min(255,parseInt(color[3],10)) / 255;parseAlpha(color[4]);return this;}if(color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*([0-9]*\.?[0-9]+)\s*$/.exec(components)){ // rgba(100%,0%,0%,0.5)
	this.r = Math.min(100,parseInt(color[1],10)) / 100;this.g = Math.min(100,parseInt(color[2],10)) / 100;this.b = Math.min(100,parseInt(color[3],10)) / 100;parseAlpha(color[4]);return this;}break;case 'hsl':if(color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*$/.exec(components)){ // hsl(120,50%,50%)
	var h=parseFloat(color[1]);var s=parseInt(color[2],10) / 100;var l=parseInt(color[3],10) / 100;return this.setHSL(h,s,l);}break;case 'hsla':if(color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*([0-9]*\.?[0-9]+)\s*$/.exec(components)){ // hsla(120,50%,50%,0.5)
	var h=parseFloat(color[1]);var s=parseInt(color[2],10) / 100;var l=parseInt(color[3],10) / 100;parseAlpha(color[4]);return this.setHSL(h,s,l);}break;}}else if(m = /^\#([A-Fa-f0-9]+)$/.exec(style)){ // hex color
	var hex=m[1];var size=hex.length;if(size === 3){ // #ff0
	this.r = parseInt(hex.charAt(0) + hex.charAt(0),16) / 255;this.g = parseInt(hex.charAt(1) + hex.charAt(1),16) / 255;this.b = parseInt(hex.charAt(2) + hex.charAt(2),16) / 255;return this;}else if(size === 6){ // #ff0000
	this.r = parseInt(hex.charAt(0) + hex.charAt(1),16) / 255;this.g = parseInt(hex.charAt(2) + hex.charAt(3),16) / 255;this.b = parseInt(hex.charAt(4) + hex.charAt(5),16) / 255;return this;}}if(style && style.length > 0){ // color keywords
	var hex=THREE.ColorKeywords[style];if(hex !== undefined){ // red
	this.setHex(hex);}else { // unknown color
	console.warn('THREE.Color: Unknown color ' + style);}}return this;},clone:function clone(){return new this.constructor(this.r,this.g,this.b);},copy:function copy(color){this.r = color.r;this.g = color.g;this.b = color.b;return this;},copyGammaToLinear:function copyGammaToLinear(color,gammaFactor){if(gammaFactor === undefined)gammaFactor = 2.0;this.r = Math.pow(color.r,gammaFactor);this.g = Math.pow(color.g,gammaFactor);this.b = Math.pow(color.b,gammaFactor);return this;},copyLinearToGamma:function copyLinearToGamma(color,gammaFactor){if(gammaFactor === undefined)gammaFactor = 2.0;var safeInverse=gammaFactor > 0?1.0 / gammaFactor:1.0;this.r = Math.pow(color.r,safeInverse);this.g = Math.pow(color.g,safeInverse);this.b = Math.pow(color.b,safeInverse);return this;},convertGammaToLinear:function convertGammaToLinear(){var r=this.r,g=this.g,b=this.b;this.r = r * r;this.g = g * g;this.b = b * b;return this;},convertLinearToGamma:function convertLinearToGamma(){this.r = Math.sqrt(this.r);this.g = Math.sqrt(this.g);this.b = Math.sqrt(this.b);return this;},getHex:function getHex(){return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;},getHexString:function getHexString(){return ('000000' + this.getHex().toString(16)).slice(-6);},getHSL:function getHSL(optionalTarget){ // h,s,l ranges are in 0.0 - 1.0
	var hsl=optionalTarget || {h:0,s:0,l:0};var r=this.r,g=this.g,b=this.b;var max=Math.max(r,g,b);var min=Math.min(r,g,b);var hue,saturation;var lightness=(min + max) / 2.0;if(min === max){hue = 0;saturation = 0;}else {var delta=max - min;saturation = lightness <= 0.5?delta / (max + min):delta / (2 - max - min);switch(max){case r:hue = (g - b) / delta + (g < b?6:0);break;case g:hue = (b - r) / delta + 2;break;case b:hue = (r - g) / delta + 4;break;}hue /= 6;}hsl.h = hue;hsl.s = saturation;hsl.l = lightness;return hsl;},getStyle:function getStyle(){return 'rgb(' + (this.r * 255 | 0) + ',' + (this.g * 255 | 0) + ',' + (this.b * 255 | 0) + ')';},offsetHSL:function offsetHSL(h,s,l){var hsl=this.getHSL();hsl.h += h;hsl.s += s;hsl.l += l;this.setHSL(hsl.h,hsl.s,hsl.l);return this;},add:function add(color){this.r += color.r;this.g += color.g;this.b += color.b;return this;},addColors:function addColors(color1,color2){this.r = color1.r + color2.r;this.g = color1.g + color2.g;this.b = color1.b + color2.b;return this;},addScalar:function addScalar(s){this.r += s;this.g += s;this.b += s;return this;},multiply:function multiply(color){this.r *= color.r;this.g *= color.g;this.b *= color.b;return this;},multiplyScalar:function multiplyScalar(s){this.r *= s;this.g *= s;this.b *= s;return this;},lerp:function lerp(color,alpha){this.r += (color.r - this.r) * alpha;this.g += (color.g - this.g) * alpha;this.b += (color.b - this.b) * alpha;return this;},equals:function equals(c){return c.r === this.r && c.g === this.g && c.b === this.b;},fromArray:function fromArray(array){this.r = array[0];this.g = array[1];this.b = array[2];return this;},toArray:function toArray(array,offset){if(array === undefined)array = [];if(offset === undefined)offset = 0;array[offset] = this.r;array[offset + 1] = this.g;array[offset + 2] = this.b;return array;}};THREE.ColorKeywords = {'aliceblue':0xF0F8FF,'antiquewhite':0xFAEBD7,'aqua':0x00FFFF,'aquamarine':0x7FFFD4,'azure':0xF0FFFF,'beige':0xF5F5DC,'bisque':0xFFE4C4,'black':0x000000,'blanchedalmond':0xFFEBCD,'blue':0x0000FF,'blueviolet':0x8A2BE2,'brown':0xA52A2A,'burlywood':0xDEB887,'cadetblue':0x5F9EA0,'chartreuse':0x7FFF00,'chocolate':0xD2691E,'coral':0xFF7F50,'cornflowerblue':0x6495ED,'cornsilk':0xFFF8DC,'crimson':0xDC143C,'cyan':0x00FFFF,'darkblue':0x00008B,'darkcyan':0x008B8B,'darkgoldenrod':0xB8860B,'darkgray':0xA9A9A9,'darkgreen':0x006400,'darkgrey':0xA9A9A9,'darkkhaki':0xBDB76B,'darkmagenta':0x8B008B,'darkolivegreen':0x556B2F,'darkorange':0xFF8C00,'darkorchid':0x9932CC,'darkred':0x8B0000,'darksalmon':0xE9967A,'darkseagreen':0x8FBC8F,'darkslateblue':0x483D8B,'darkslategray':0x2F4F4F,'darkslategrey':0x2F4F4F,'darkturquoise':0x00CED1,'darkviolet':0x9400D3,'deeppink':0xFF1493,'deepskyblue':0x00BFFF,'dimgray':0x696969,'dimgrey':0x696969,'dodgerblue':0x1E90FF,'firebrick':0xB22222,'floralwhite':0xFFFAF0,'forestgreen':0x228B22,'fuchsia':0xFF00FF,'gainsboro':0xDCDCDC,'ghostwhite':0xF8F8FF,'gold':0xFFD700,'goldenrod':0xDAA520,'gray':0x808080,'green':0x008000,'greenyellow':0xADFF2F,'grey':0x808080,'honeydew':0xF0FFF0,'hotpink':0xFF69B4,'indianred':0xCD5C5C,'indigo':0x4B0082,'ivory':0xFFFFF0,'khaki':0xF0E68C,'lavender':0xE6E6FA,'lavenderblush':0xFFF0F5,'lawngreen':0x7CFC00,'lemonchiffon':0xFFFACD,'lightblue':0xADD8E6,'lightcoral':0xF08080,'lightcyan':0xE0FFFF,'lightgoldenrodyellow':0xFAFAD2,'lightgray':0xD3D3D3,'lightgreen':0x90EE90,'lightgrey':0xD3D3D3,'lightpink':0xFFB6C1,'lightsalmon':0xFFA07A,'lightseagreen':0x20B2AA,'lightskyblue':0x87CEFA,'lightslategray':0x778899,'lightslategrey':0x778899,'lightsteelblue':0xB0C4DE,'lightyellow':0xFFFFE0,'lime':0x00FF00,'limegreen':0x32CD32,'linen':0xFAF0E6,'magenta':0xFF00FF,'maroon':0x800000,'mediumaquamarine':0x66CDAA,'mediumblue':0x0000CD,'mediumorchid':0xBA55D3,'mediumpurple':0x9370DB,'mediumseagreen':0x3CB371,'mediumslateblue':0x7B68EE,'mediumspringgreen':0x00FA9A,'mediumturquoise':0x48D1CC,'mediumvioletred':0xC71585,'midnightblue':0x191970,'mintcream':0xF5FFFA,'mistyrose':0xFFE4E1,'moccasin':0xFFE4B5,'navajowhite':0xFFDEAD,'navy':0x000080,'oldlace':0xFDF5E6,'olive':0x808000,'olivedrab':0x6B8E23,'orange':0xFFA500,'orangered':0xFF4500,'orchid':0xDA70D6,'palegoldenrod':0xEEE8AA,'palegreen':0x98FB98,'paleturquoise':0xAFEEEE,'palevioletred':0xDB7093,'papayawhip':0xFFEFD5,'peachpuff':0xFFDAB9,'peru':0xCD853F,'pink':0xFFC0CB,'plum':0xDDA0DD,'powderblue':0xB0E0E6,'purple':0x800080,'red':0xFF0000,'rosybrown':0xBC8F8F,'royalblue':0x4169E1,'saddlebrown':0x8B4513,'salmon':0xFA8072,'sandybrown':0xF4A460,'seagreen':0x2E8B57,'seashell':0xFFF5EE,'sienna':0xA0522D,'silver':0xC0C0C0,'skyblue':0x87CEEB,'slateblue':0x6A5ACD,'slategray':0x708090,'slategrey':0x708090,'snow':0xFFFAFA,'springgreen':0x00FF7F,'steelblue':0x4682B4,'tan':0xD2B48C,'teal':0x008080,'thistle':0xD8BFD8,'tomato':0xFF6347,'turquoise':0x40E0D0,'violet':0xEE82EE,'wheat':0xF5DEB3,'white':0xFFFFFF,'whitesmoke':0xF5F5F5,'yellow':0xFFFF00,'yellowgreen':0x9ACD32}; // File:src/math/Quaternion.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author bhouston / http://exocortex.com
	 */THREE.Quaternion = function(x,y,z,w){this._x = x || 0;this._y = y || 0;this._z = z || 0;this._w = w !== undefined?w:1;};THREE.Quaternion.prototype = Object.defineProperties({constructor:THREE.Quaternion,set:function set(x,y,z,w){this._x = x;this._y = y;this._z = z;this._w = w;this.onChangeCallback();return this;},clone:function clone(){return new this.constructor(this._x,this._y,this._z,this._w);},copy:function copy(quaternion){this._x = quaternion.x;this._y = quaternion.y;this._z = quaternion.z;this._w = quaternion.w;this.onChangeCallback();return this;},setFromEuler:function setFromEuler(euler,update){if(euler instanceof THREE.Euler === false){throw new Error('THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.');} // http://www.mathworks.com/matlabcentral/fileexchange/
	// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
	//	content/SpinCalc.m
	var c1=Math.cos(euler._x / 2);var c2=Math.cos(euler._y / 2);var c3=Math.cos(euler._z / 2);var s1=Math.sin(euler._x / 2);var s2=Math.sin(euler._y / 2);var s3=Math.sin(euler._z / 2);var order=euler.order;if(order === 'XYZ'){this._x = s1 * c2 * c3 + c1 * s2 * s3;this._y = c1 * s2 * c3 - s1 * c2 * s3;this._z = c1 * c2 * s3 + s1 * s2 * c3;this._w = c1 * c2 * c3 - s1 * s2 * s3;}else if(order === 'YXZ'){this._x = s1 * c2 * c3 + c1 * s2 * s3;this._y = c1 * s2 * c3 - s1 * c2 * s3;this._z = c1 * c2 * s3 - s1 * s2 * c3;this._w = c1 * c2 * c3 + s1 * s2 * s3;}else if(order === 'ZXY'){this._x = s1 * c2 * c3 - c1 * s2 * s3;this._y = c1 * s2 * c3 + s1 * c2 * s3;this._z = c1 * c2 * s3 + s1 * s2 * c3;this._w = c1 * c2 * c3 - s1 * s2 * s3;}else if(order === 'ZYX'){this._x = s1 * c2 * c3 - c1 * s2 * s3;this._y = c1 * s2 * c3 + s1 * c2 * s3;this._z = c1 * c2 * s3 - s1 * s2 * c3;this._w = c1 * c2 * c3 + s1 * s2 * s3;}else if(order === 'YZX'){this._x = s1 * c2 * c3 + c1 * s2 * s3;this._y = c1 * s2 * c3 + s1 * c2 * s3;this._z = c1 * c2 * s3 - s1 * s2 * c3;this._w = c1 * c2 * c3 - s1 * s2 * s3;}else if(order === 'XZY'){this._x = s1 * c2 * c3 - c1 * s2 * s3;this._y = c1 * s2 * c3 - s1 * c2 * s3;this._z = c1 * c2 * s3 + s1 * s2 * c3;this._w = c1 * c2 * c3 + s1 * s2 * s3;}if(update !== false)this.onChangeCallback();return this;},setFromAxisAngle:function setFromAxisAngle(axis,angle){ // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
	// assumes axis is normalized
	var halfAngle=angle / 2,s=Math.sin(halfAngle);this._x = axis.x * s;this._y = axis.y * s;this._z = axis.z * s;this._w = Math.cos(halfAngle);this.onChangeCallback();return this;},setFromRotationMatrix:function setFromRotationMatrix(m){ // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
	// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
	var te=m.elements,m11=te[0],m12=te[4],m13=te[8],m21=te[1],m22=te[5],m23=te[9],m31=te[2],m32=te[6],m33=te[10],trace=m11 + m22 + m33,s;if(trace > 0){s = 0.5 / Math.sqrt(trace + 1.0);this._w = 0.25 / s;this._x = (m32 - m23) * s;this._y = (m13 - m31) * s;this._z = (m21 - m12) * s;}else if(m11 > m22 && m11 > m33){s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);this._w = (m32 - m23) / s;this._x = 0.25 * s;this._y = (m12 + m21) / s;this._z = (m13 + m31) / s;}else if(m22 > m33){s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);this._w = (m13 - m31) / s;this._x = (m12 + m21) / s;this._y = 0.25 * s;this._z = (m23 + m32) / s;}else {s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);this._w = (m21 - m12) / s;this._x = (m13 + m31) / s;this._y = (m23 + m32) / s;this._z = 0.25 * s;}this.onChangeCallback();return this;},setFromUnitVectors:(function(){ // http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
	// assumes direction vectors vFrom and vTo are normalized
	var v1,r;var EPS=0.000001;return function(vFrom,vTo){if(v1 === undefined)v1 = new THREE.Vector3();r = vFrom.dot(vTo) + 1;if(r < EPS){r = 0;if(Math.abs(vFrom.x) > Math.abs(vFrom.z)){v1.set(-vFrom.y,vFrom.x,0);}else {v1.set(0,-vFrom.z,vFrom.y);}}else {v1.crossVectors(vFrom,vTo);}this._x = v1.x;this._y = v1.y;this._z = v1.z;this._w = r;this.normalize();return this;};})(),inverse:function inverse(){this.conjugate().normalize();return this;},conjugate:function conjugate(){this._x *= -1;this._y *= -1;this._z *= -1;this.onChangeCallback();return this;},dot:function dot(v){return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;},lengthSq:function lengthSq(){return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;},length:function length(){return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);},normalize:function normalize(){var l=this.length();if(l === 0){this._x = 0;this._y = 0;this._z = 0;this._w = 1;}else {l = 1 / l;this._x = this._x * l;this._y = this._y * l;this._z = this._z * l;this._w = this._w * l;}this.onChangeCallback();return this;},multiply:function multiply(q,p){if(p !== undefined){console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');return this.multiplyQuaternions(q,p);}return this.multiplyQuaternions(this,q);},multiplyQuaternions:function multiplyQuaternions(a,b){ // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
	var qax=a._x,qay=a._y,qaz=a._z,qaw=a._w;var qbx=b._x,qby=b._y,qbz=b._z,qbw=b._w;this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;this.onChangeCallback();return this;},multiplyVector3:function multiplyVector3(vector){console.warn('THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.');return vector.applyQuaternion(this);},slerp:function slerp(qb,t){if(t === 0)return this;if(t === 1)return this.copy(qb);var x=this._x,y=this._y,z=this._z,w=this._w; // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
	var cosHalfTheta=w * qb._w + x * qb._x + y * qb._y + z * qb._z;if(cosHalfTheta < 0){this._w = -qb._w;this._x = -qb._x;this._y = -qb._y;this._z = -qb._z;cosHalfTheta = -cosHalfTheta;}else {this.copy(qb);}if(cosHalfTheta >= 1.0){this._w = w;this._x = x;this._y = y;this._z = z;return this;}var halfTheta=Math.acos(cosHalfTheta);var sinHalfTheta=Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);if(Math.abs(sinHalfTheta) < 0.001){this._w = 0.5 * (w + this._w);this._x = 0.5 * (x + this._x);this._y = 0.5 * (y + this._y);this._z = 0.5 * (z + this._z);return this;}var ratioA=Math.sin((1 - t) * halfTheta) / sinHalfTheta,ratioB=Math.sin(t * halfTheta) / sinHalfTheta;this._w = w * ratioA + this._w * ratioB;this._x = x * ratioA + this._x * ratioB;this._y = y * ratioA + this._y * ratioB;this._z = z * ratioA + this._z * ratioB;this.onChangeCallback();return this;},equals:function equals(quaternion){return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;},fromArray:function fromArray(array,offset){if(offset === undefined)offset = 0;this._x = array[offset];this._y = array[offset + 1];this._z = array[offset + 2];this._w = array[offset + 3];this.onChangeCallback();return this;},toArray:function toArray(array,offset){if(array === undefined)array = [];if(offset === undefined)offset = 0;array[offset] = this._x;array[offset + 1] = this._y;array[offset + 2] = this._z;array[offset + 3] = this._w;return array;},onChange:function onChange(callback){this.onChangeCallback = callback;return this;},onChangeCallback:function onChangeCallback(){}},{x:{get:function get(){return this._x;},set:function set(value){this._x = value;this.onChangeCallback();},configurable:true,enumerable:true},y:{get:function get(){return this._y;},set:function set(value){this._y = value;this.onChangeCallback();},configurable:true,enumerable:true},z:{get:function get(){return this._z;},set:function set(value){this._z = value;this.onChangeCallback();},configurable:true,enumerable:true},w:{get:function get(){return this._w;},set:function set(value){this._w = value;this.onChangeCallback();},configurable:true,enumerable:true}});THREE.Quaternion.slerp = function(qa,qb,qm,t){return qm.copy(qa).slerp(qb,t);}; // File:src/math/Vector2.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author philogb / http://blog.thejit.org/
	 * @author egraether / http://egraether.com/
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 */THREE.Vector2 = function(x,y){this.x = x || 0;this.y = y || 0;};THREE.Vector2.prototype = {constructor:THREE.Vector2,set:function set(x,y){this.x = x;this.y = y;return this;},setX:function setX(x){this.x = x;return this;},setY:function setY(y){this.y = y;return this;},setComponent:function setComponent(index,value){switch(index){case 0:this.x = value;break;case 1:this.y = value;break;default:throw new Error('index is out of range: ' + index);}},getComponent:function getComponent(index){switch(index){case 0:return this.x;case 1:return this.y;default:throw new Error('index is out of range: ' + index);}},clone:function clone(){return new this.constructor(this.x,this.y);},copy:function copy(v){this.x = v.x;this.y = v.y;return this;},add:function add(v,w){if(w !== undefined){console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');return this.addVectors(v,w);}this.x += v.x;this.y += v.y;return this;},addScalar:function addScalar(s){this.x += s;this.y += s;return this;},addVectors:function addVectors(a,b){this.x = a.x + b.x;this.y = a.y + b.y;return this;},addScaledVector:function addScaledVector(v,s){this.x += v.x * s;this.y += v.y * s;return this;},sub:function sub(v,w){if(w !== undefined){console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');return this.subVectors(v,w);}this.x -= v.x;this.y -= v.y;return this;},subScalar:function subScalar(s){this.x -= s;this.y -= s;return this;},subVectors:function subVectors(a,b){this.x = a.x - b.x;this.y = a.y - b.y;return this;},multiply:function multiply(v){this.x *= v.x;this.y *= v.y;return this;},multiplyScalar:function multiplyScalar(s){this.x *= s;this.y *= s;return this;},divide:function divide(v){this.x /= v.x;this.y /= v.y;return this;},divideScalar:function divideScalar(scalar){if(scalar !== 0){var invScalar=1 / scalar;this.x *= invScalar;this.y *= invScalar;}else {this.x = 0;this.y = 0;}return this;},min:function min(v){if(this.x > v.x){this.x = v.x;}if(this.y > v.y){this.y = v.y;}return this;},max:function max(v){if(this.x < v.x){this.x = v.x;}if(this.y < v.y){this.y = v.y;}return this;},clamp:function clamp(min,max){ // This function assumes min < max, if this assumption isn't true it will not operate correctly
	if(this.x < min.x){this.x = min.x;}else if(this.x > max.x){this.x = max.x;}if(this.y < min.y){this.y = min.y;}else if(this.y > max.y){this.y = max.y;}return this;},clampScalar:(function(){var min,max;return function clampScalar(minVal,maxVal){if(min === undefined){min = new THREE.Vector2();max = new THREE.Vector2();}min.set(minVal,minVal);max.set(maxVal,maxVal);return this.clamp(min,max);};})(),floor:function floor(){this.x = Math.floor(this.x);this.y = Math.floor(this.y);return this;},ceil:function ceil(){this.x = Math.ceil(this.x);this.y = Math.ceil(this.y);return this;},round:function round(){this.x = Math.round(this.x);this.y = Math.round(this.y);return this;},roundToZero:function roundToZero(){this.x = this.x < 0?Math.ceil(this.x):Math.floor(this.x);this.y = this.y < 0?Math.ceil(this.y):Math.floor(this.y);return this;},negate:function negate(){this.x = -this.x;this.y = -this.y;return this;},dot:function dot(v){return this.x * v.x + this.y * v.y;},lengthSq:function lengthSq(){return this.x * this.x + this.y * this.y;},length:function length(){return Math.sqrt(this.x * this.x + this.y * this.y);},lengthManhattan:function lengthManhattan(){return Math.abs(this.x) + Math.abs(this.y);},normalize:function normalize(){return this.divideScalar(this.length());},distanceTo:function distanceTo(v){return Math.sqrt(this.distanceToSquared(v));},distanceToSquared:function distanceToSquared(v){var dx=this.x - v.x,dy=this.y - v.y;return dx * dx + dy * dy;},setLength:function setLength(l){var oldLength=this.length();if(oldLength !== 0 && l !== oldLength){this.multiplyScalar(l / oldLength);}return this;},lerp:function lerp(v,alpha){this.x += (v.x - this.x) * alpha;this.y += (v.y - this.y) * alpha;return this;},lerpVectors:function lerpVectors(v1,v2,alpha){this.subVectors(v2,v1).multiplyScalar(alpha).add(v1);return this;},equals:function equals(v){return v.x === this.x && v.y === this.y;},fromArray:function fromArray(array,offset){if(offset === undefined)offset = 0;this.x = array[offset];this.y = array[offset + 1];return this;},toArray:function toArray(array,offset){if(array === undefined)array = [];if(offset === undefined)offset = 0;array[offset] = this.x;array[offset + 1] = this.y;return array;},fromAttribute:function fromAttribute(attribute,index,offset){if(offset === undefined)offset = 0;index = index * attribute.itemSize + offset;this.x = attribute.array[index];this.y = attribute.array[index + 1];return this;}}; // File:src/math/Vector3.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author *kile / http://kile.stravaganza.org/
	 * @author philogb / http://blog.thejit.org/
	 * @author mikael emtinger / http://gomo.se/
	 * @author egraether / http://egraether.com/
	 * @author WestLangley / http://github.com/WestLangley
	 */THREE.Vector3 = function(x,y,z){this.x = x || 0;this.y = y || 0;this.z = z || 0;};THREE.Vector3.prototype = {constructor:THREE.Vector3,set:function set(x,y,z){this.x = x;this.y = y;this.z = z;return this;},setX:function setX(x){this.x = x;return this;},setY:function setY(y){this.y = y;return this;},setZ:function setZ(z){this.z = z;return this;},setComponent:function setComponent(index,value){switch(index){case 0:this.x = value;break;case 1:this.y = value;break;case 2:this.z = value;break;default:throw new Error('index is out of range: ' + index);}},getComponent:function getComponent(index){switch(index){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error('index is out of range: ' + index);}},clone:function clone(){return new this.constructor(this.x,this.y,this.z);},copy:function copy(v){this.x = v.x;this.y = v.y;this.z = v.z;return this;},add:function add(v,w){if(w !== undefined){console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');return this.addVectors(v,w);}this.x += v.x;this.y += v.y;this.z += v.z;return this;},addScalar:function addScalar(s){this.x += s;this.y += s;this.z += s;return this;},addVectors:function addVectors(a,b){this.x = a.x + b.x;this.y = a.y + b.y;this.z = a.z + b.z;return this;},addScaledVector:function addScaledVector(v,s){this.x += v.x * s;this.y += v.y * s;this.z += v.z * s;return this;},sub:function sub(v,w){if(w !== undefined){console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');return this.subVectors(v,w);}this.x -= v.x;this.y -= v.y;this.z -= v.z;return this;},subScalar:function subScalar(s){this.x -= s;this.y -= s;this.z -= s;return this;},subVectors:function subVectors(a,b){this.x = a.x - b.x;this.y = a.y - b.y;this.z = a.z - b.z;return this;},multiply:function multiply(v,w){if(w !== undefined){console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');return this.multiplyVectors(v,w);}this.x *= v.x;this.y *= v.y;this.z *= v.z;return this;},multiplyScalar:function multiplyScalar(scalar){this.x *= scalar;this.y *= scalar;this.z *= scalar;return this;},multiplyVectors:function multiplyVectors(a,b){this.x = a.x * b.x;this.y = a.y * b.y;this.z = a.z * b.z;return this;},applyEuler:(function(){var quaternion;return function applyEuler(euler){if(euler instanceof THREE.Euler === false){console.error('THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.');}if(quaternion === undefined)quaternion = new THREE.Quaternion();this.applyQuaternion(quaternion.setFromEuler(euler));return this;};})(),applyAxisAngle:(function(){var quaternion;return function applyAxisAngle(axis,angle){if(quaternion === undefined)quaternion = new THREE.Quaternion();this.applyQuaternion(quaternion.setFromAxisAngle(axis,angle));return this;};})(),applyMatrix3:function applyMatrix3(m){var x=this.x;var y=this.y;var z=this.z;var e=m.elements;this.x = e[0] * x + e[3] * y + e[6] * z;this.y = e[1] * x + e[4] * y + e[7] * z;this.z = e[2] * x + e[5] * y + e[8] * z;return this;},applyMatrix4:function applyMatrix4(m){ // input: THREE.Matrix4 affine matrix
	var x=this.x,y=this.y,z=this.z;var e=m.elements;this.x = e[0] * x + e[4] * y + e[8] * z + e[12];this.y = e[1] * x + e[5] * y + e[9] * z + e[13];this.z = e[2] * x + e[6] * y + e[10] * z + e[14];return this;},applyProjection:function applyProjection(m){ // input: THREE.Matrix4 projection matrix
	var x=this.x,y=this.y,z=this.z;var e=m.elements;var d=1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide
	this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;return this;},applyQuaternion:function applyQuaternion(q){var x=this.x;var y=this.y;var z=this.z;var qx=q.x;var qy=q.y;var qz=q.z;var qw=q.w; // calculate quat * vector
	var ix=qw * x + qy * z - qz * y;var iy=qw * y + qz * x - qx * z;var iz=qw * z + qx * y - qy * x;var iw=-qx * x - qy * y - qz * z; // calculate result * inverse quat
	this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;return this;},project:(function(){var matrix;return function project(camera){if(matrix === undefined)matrix = new THREE.Matrix4();matrix.multiplyMatrices(camera.projectionMatrix,matrix.getInverse(camera.matrixWorld));return this.applyProjection(matrix);};})(),unproject:(function(){var matrix;return function unproject(camera){if(matrix === undefined)matrix = new THREE.Matrix4();matrix.multiplyMatrices(camera.matrixWorld,matrix.getInverse(camera.projectionMatrix));return this.applyProjection(matrix);};})(),transformDirection:function transformDirection(m){ // input: THREE.Matrix4 affine matrix
	// vector interpreted as a direction
	var x=this.x,y=this.y,z=this.z;var e=m.elements;this.x = e[0] * x + e[4] * y + e[8] * z;this.y = e[1] * x + e[5] * y + e[9] * z;this.z = e[2] * x + e[6] * y + e[10] * z;this.normalize();return this;},divide:function divide(v){this.x /= v.x;this.y /= v.y;this.z /= v.z;return this;},divideScalar:function divideScalar(scalar){if(scalar !== 0){var invScalar=1 / scalar;this.x *= invScalar;this.y *= invScalar;this.z *= invScalar;}else {this.x = 0;this.y = 0;this.z = 0;}return this;},min:function min(v){if(this.x > v.x){this.x = v.x;}if(this.y > v.y){this.y = v.y;}if(this.z > v.z){this.z = v.z;}return this;},max:function max(v){if(this.x < v.x){this.x = v.x;}if(this.y < v.y){this.y = v.y;}if(this.z < v.z){this.z = v.z;}return this;},clamp:function clamp(min,max){ // This function assumes min < max, if this assumption isn't true it will not operate correctly
	if(this.x < min.x){this.x = min.x;}else if(this.x > max.x){this.x = max.x;}if(this.y < min.y){this.y = min.y;}else if(this.y > max.y){this.y = max.y;}if(this.z < min.z){this.z = min.z;}else if(this.z > max.z){this.z = max.z;}return this;},clampScalar:(function(){var min,max;return function clampScalar(minVal,maxVal){if(min === undefined){min = new THREE.Vector3();max = new THREE.Vector3();}min.set(minVal,minVal,minVal);max.set(maxVal,maxVal,maxVal);return this.clamp(min,max);};})(),floor:function floor(){this.x = Math.floor(this.x);this.y = Math.floor(this.y);this.z = Math.floor(this.z);return this;},ceil:function ceil(){this.x = Math.ceil(this.x);this.y = Math.ceil(this.y);this.z = Math.ceil(this.z);return this;},round:function round(){this.x = Math.round(this.x);this.y = Math.round(this.y);this.z = Math.round(this.z);return this;},roundToZero:function roundToZero(){this.x = this.x < 0?Math.ceil(this.x):Math.floor(this.x);this.y = this.y < 0?Math.ceil(this.y):Math.floor(this.y);this.z = this.z < 0?Math.ceil(this.z):Math.floor(this.z);return this;},negate:function negate(){this.x = -this.x;this.y = -this.y;this.z = -this.z;return this;},dot:function dot(v){return this.x * v.x + this.y * v.y + this.z * v.z;},lengthSq:function lengthSq(){return this.x * this.x + this.y * this.y + this.z * this.z;},length:function length(){return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);},lengthManhattan:function lengthManhattan(){return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);},normalize:function normalize(){return this.divideScalar(this.length());},setLength:function setLength(l){var oldLength=this.length();if(oldLength !== 0 && l !== oldLength){this.multiplyScalar(l / oldLength);}return this;},lerp:function lerp(v,alpha){this.x += (v.x - this.x) * alpha;this.y += (v.y - this.y) * alpha;this.z += (v.z - this.z) * alpha;return this;},lerpVectors:function lerpVectors(v1,v2,alpha){this.subVectors(v2,v1).multiplyScalar(alpha).add(v1);return this;},cross:function cross(v,w){if(w !== undefined){console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');return this.crossVectors(v,w);}var x=this.x,y=this.y,z=this.z;this.x = y * v.z - z * v.y;this.y = z * v.x - x * v.z;this.z = x * v.y - y * v.x;return this;},crossVectors:function crossVectors(a,b){var ax=a.x,ay=a.y,az=a.z;var bx=b.x,by=b.y,bz=b.z;this.x = ay * bz - az * by;this.y = az * bx - ax * bz;this.z = ax * by - ay * bx;return this;},projectOnVector:(function(){var v1,dot;return function projectOnVector(vector){if(v1 === undefined)v1 = new THREE.Vector3();v1.copy(vector).normalize();dot = this.dot(v1);return this.copy(v1).multiplyScalar(dot);};})(),projectOnPlane:(function(){var v1;return function projectOnPlane(planeNormal){if(v1 === undefined)v1 = new THREE.Vector3();v1.copy(this).projectOnVector(planeNormal);return this.sub(v1);};})(),reflect:(function(){ // reflect incident vector off plane orthogonal to normal
	// normal is assumed to have unit length
	var v1;return function reflect(normal){if(v1 === undefined)v1 = new THREE.Vector3();return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));};})(),angleTo:function angleTo(v){var theta=this.dot(v) / (this.length() * v.length()); // clamp, to handle numerical problems
	return Math.acos(THREE.Math.clamp(theta,-1,1));},distanceTo:function distanceTo(v){return Math.sqrt(this.distanceToSquared(v));},distanceToSquared:function distanceToSquared(v){var dx=this.x - v.x;var dy=this.y - v.y;var dz=this.z - v.z;return dx * dx + dy * dy + dz * dz;},setEulerFromRotationMatrix:function setEulerFromRotationMatrix(m,order){console.error('THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.');},setEulerFromQuaternion:function setEulerFromQuaternion(q,order){console.error('THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.');},getPositionFromMatrix:function getPositionFromMatrix(m){console.warn('THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().');return this.setFromMatrixPosition(m);},getScaleFromMatrix:function getScaleFromMatrix(m){console.warn('THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().');return this.setFromMatrixScale(m);},getColumnFromMatrix:function getColumnFromMatrix(index,matrix){console.warn('THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().');return this.setFromMatrixColumn(index,matrix);},setFromMatrixPosition:function setFromMatrixPosition(m){this.x = m.elements[12];this.y = m.elements[13];this.z = m.elements[14];return this;},setFromMatrixScale:function setFromMatrixScale(m){var sx=this.set(m.elements[0],m.elements[1],m.elements[2]).length();var sy=this.set(m.elements[4],m.elements[5],m.elements[6]).length();var sz=this.set(m.elements[8],m.elements[9],m.elements[10]).length();this.x = sx;this.y = sy;this.z = sz;return this;},setFromMatrixColumn:function setFromMatrixColumn(index,matrix){var offset=index * 4;var me=matrix.elements;this.x = me[offset];this.y = me[offset + 1];this.z = me[offset + 2];return this;},equals:function equals(v){return v.x === this.x && v.y === this.y && v.z === this.z;},fromArray:function fromArray(array,offset){if(offset === undefined)offset = 0;this.x = array[offset];this.y = array[offset + 1];this.z = array[offset + 2];return this;},toArray:function toArray(array,offset){if(array === undefined)array = [];if(offset === undefined)offset = 0;array[offset] = this.x;array[offset + 1] = this.y;array[offset + 2] = this.z;return array;},fromAttribute:function fromAttribute(attribute,index,offset){if(offset === undefined)offset = 0;index = index * attribute.itemSize + offset;this.x = attribute.array[index];this.y = attribute.array[index + 1];this.z = attribute.array[index + 2];return this;}}; // File:src/math/Vector4.js
	/**
	 * @author supereggbert / http://www.paulbrunt.co.uk/
	 * @author philogb / http://blog.thejit.org/
	 * @author mikael emtinger / http://gomo.se/
	 * @author egraether / http://egraether.com/
	 * @author WestLangley / http://github.com/WestLangley
	 */THREE.Vector4 = function(x,y,z,w){this.x = x || 0;this.y = y || 0;this.z = z || 0;this.w = w !== undefined?w:1;};THREE.Vector4.prototype = {constructor:THREE.Vector4,set:function set(x,y,z,w){this.x = x;this.y = y;this.z = z;this.w = w;return this;},setX:function setX(x){this.x = x;return this;},setY:function setY(y){this.y = y;return this;},setZ:function setZ(z){this.z = z;return this;},setW:function setW(w){this.w = w;return this;},setComponent:function setComponent(index,value){switch(index){case 0:this.x = value;break;case 1:this.y = value;break;case 2:this.z = value;break;case 3:this.w = value;break;default:throw new Error('index is out of range: ' + index);}},getComponent:function getComponent(index){switch(index){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error('index is out of range: ' + index);}},clone:function clone(){return new this.constructor(this.x,this.y,this.z,this.w);},copy:function copy(v){this.x = v.x;this.y = v.y;this.z = v.z;this.w = v.w !== undefined?v.w:1;return this;},add:function add(v,w){if(w !== undefined){console.warn('THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');return this.addVectors(v,w);}this.x += v.x;this.y += v.y;this.z += v.z;this.w += v.w;return this;},addScalar:function addScalar(s){this.x += s;this.y += s;this.z += s;this.w += s;return this;},addVectors:function addVectors(a,b){this.x = a.x + b.x;this.y = a.y + b.y;this.z = a.z + b.z;this.w = a.w + b.w;return this;},addScaledVector:function addScaledVector(v,s){this.x += v.x * s;this.y += v.y * s;this.z += v.z * s;this.w += v.w * s;return this;},sub:function sub(v,w){if(w !== undefined){console.warn('THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');return this.subVectors(v,w);}this.x -= v.x;this.y -= v.y;this.z -= v.z;this.w -= v.w;return this;},subScalar:function subScalar(s){this.x -= s;this.y -= s;this.z -= s;this.w -= s;return this;},subVectors:function subVectors(a,b){this.x = a.x - b.x;this.y = a.y - b.y;this.z = a.z - b.z;this.w = a.w - b.w;return this;},multiplyScalar:function multiplyScalar(scalar){this.x *= scalar;this.y *= scalar;this.z *= scalar;this.w *= scalar;return this;},applyMatrix4:function applyMatrix4(m){var x=this.x;var y=this.y;var z=this.z;var w=this.w;var e=m.elements;this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;return this;},divideScalar:function divideScalar(scalar){if(scalar !== 0){var invScalar=1 / scalar;this.x *= invScalar;this.y *= invScalar;this.z *= invScalar;this.w *= invScalar;}else {this.x = 0;this.y = 0;this.z = 0;this.w = 1;}return this;},setAxisAngleFromQuaternion:function setAxisAngleFromQuaternion(q){ // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
	// q is assumed to be normalized
	this.w = 2 * Math.acos(q.w);var s=Math.sqrt(1 - q.w * q.w);if(s < 0.0001){this.x = 1;this.y = 0;this.z = 0;}else {this.x = q.x / s;this.y = q.y / s;this.z = q.z / s;}return this;},setAxisAngleFromRotationMatrix:function setAxisAngleFromRotationMatrix(m){ // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
	// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
	var angle,x,y,z, // variables for result
	epsilon=0.01, // margin to allow for rounding errors
	epsilon2=0.1, // margin to distinguish between 0 and 180 degrees
	te=m.elements,m11=te[0],m12=te[4],m13=te[8],m21=te[1],m22=te[5],m23=te[9],m31=te[2],m32=te[6],m33=te[10];if(Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon){ // singularity found
	// first check for identity matrix which must have +1 for all terms
	// in leading diagonal and zero in other terms
	if(Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2){ // this singularity is identity matrix so angle = 0
	this.set(1,0,0,0);return this; // zero angle, arbitrary axis
	} // otherwise this singularity is angle = 180
	angle = Math.PI;var xx=(m11 + 1) / 2;var yy=(m22 + 1) / 2;var zz=(m33 + 1) / 2;var xy=(m12 + m21) / 4;var xz=(m13 + m31) / 4;var yz=(m23 + m32) / 4;if(xx > yy && xx > zz){ // m11 is the largest diagonal term
	if(xx < epsilon){x = 0;y = 0.707106781;z = 0.707106781;}else {x = Math.sqrt(xx);y = xy / x;z = xz / x;}}else if(yy > zz){ // m22 is the largest diagonal term
	if(yy < epsilon){x = 0.707106781;y = 0;z = 0.707106781;}else {y = Math.sqrt(yy);x = xy / y;z = yz / y;}}else { // m33 is the largest diagonal term so base result on this
	if(zz < epsilon){x = 0.707106781;y = 0.707106781;z = 0;}else {z = Math.sqrt(zz);x = xz / z;y = yz / z;}}this.set(x,y,z,angle);return this; // return 180 deg rotation
	} // as we have reached here there are no singularities so we can handle normally
	var s=Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12)); // used to normalize
	if(Math.abs(s) < 0.001)s = 1; // prevent divide by zero, should not happen if matrix is orthogonal and should be
	// caught by singularity test above, but I've left it in just in case
	this.x = (m32 - m23) / s;this.y = (m13 - m31) / s;this.z = (m21 - m12) / s;this.w = Math.acos((m11 + m22 + m33 - 1) / 2);return this;},min:function min(v){if(this.x > v.x){this.x = v.x;}if(this.y > v.y){this.y = v.y;}if(this.z > v.z){this.z = v.z;}if(this.w > v.w){this.w = v.w;}return this;},max:function max(v){if(this.x < v.x){this.x = v.x;}if(this.y < v.y){this.y = v.y;}if(this.z < v.z){this.z = v.z;}if(this.w < v.w){this.w = v.w;}return this;},clamp:function clamp(min,max){ // This function assumes min < max, if this assumption isn't true it will not operate correctly
	if(this.x < min.x){this.x = min.x;}else if(this.x > max.x){this.x = max.x;}if(this.y < min.y){this.y = min.y;}else if(this.y > max.y){this.y = max.y;}if(this.z < min.z){this.z = min.z;}else if(this.z > max.z){this.z = max.z;}if(this.w < min.w){this.w = min.w;}else if(this.w > max.w){this.w = max.w;}return this;},clampScalar:(function(){var min,max;return function clampScalar(minVal,maxVal){if(min === undefined){min = new THREE.Vector4();max = new THREE.Vector4();}min.set(minVal,minVal,minVal,minVal);max.set(maxVal,maxVal,maxVal,maxVal);return this.clamp(min,max);};})(),floor:function floor(){this.x = Math.floor(this.x);this.y = Math.floor(this.y);this.z = Math.floor(this.z);this.w = Math.floor(this.w);return this;},ceil:function ceil(){this.x = Math.ceil(this.x);this.y = Math.ceil(this.y);this.z = Math.ceil(this.z);this.w = Math.ceil(this.w);return this;},round:function round(){this.x = Math.round(this.x);this.y = Math.round(this.y);this.z = Math.round(this.z);this.w = Math.round(this.w);return this;},roundToZero:function roundToZero(){this.x = this.x < 0?Math.ceil(this.x):Math.floor(this.x);this.y = this.y < 0?Math.ceil(this.y):Math.floor(this.y);this.z = this.z < 0?Math.ceil(this.z):Math.floor(this.z);this.w = this.w < 0?Math.ceil(this.w):Math.floor(this.w);return this;},negate:function negate(){this.x = -this.x;this.y = -this.y;this.z = -this.z;this.w = -this.w;return this;},dot:function dot(v){return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;},lengthSq:function lengthSq(){return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;},length:function length(){return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);},lengthManhattan:function lengthManhattan(){return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);},normalize:function normalize(){return this.divideScalar(this.length());},setLength:function setLength(l){var oldLength=this.length();if(oldLength !== 0 && l !== oldLength){this.multiplyScalar(l / oldLength);}return this;},lerp:function lerp(v,alpha){this.x += (v.x - this.x) * alpha;this.y += (v.y - this.y) * alpha;this.z += (v.z - this.z) * alpha;this.w += (v.w - this.w) * alpha;return this;},lerpVectors:function lerpVectors(v1,v2,alpha){this.subVectors(v2,v1).multiplyScalar(alpha).add(v1);return this;},equals:function equals(v){return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;},fromArray:function fromArray(array,offset){if(offset === undefined)offset = 0;this.x = array[offset];this.y = array[offset + 1];this.z = array[offset + 2];this.w = array[offset + 3];return this;},toArray:function toArray(array,offset){if(array === undefined)array = [];if(offset === undefined)offset = 0;array[offset] = this.x;array[offset + 1] = this.y;array[offset + 2] = this.z;array[offset + 3] = this.w;return array;},fromAttribute:function fromAttribute(attribute,index,offset){if(offset === undefined)offset = 0;index = index * attribute.itemSize + offset;this.x = attribute.array[index];this.y = attribute.array[index + 1];this.z = attribute.array[index + 2];this.w = attribute.array[index + 3];return this;}}; // File:src/math/Euler.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author bhouston / http://exocortex.com
	 */THREE.Euler = function(x,y,z,order){this._x = x || 0;this._y = y || 0;this._z = z || 0;this._order = order || THREE.Euler.DefaultOrder;};THREE.Euler.RotationOrders = ['XYZ','YZX','ZXY','XZY','YXZ','ZYX'];THREE.Euler.DefaultOrder = 'XYZ';THREE.Euler.prototype = Object.defineProperties({constructor:THREE.Euler,set:function set(x,y,z,order){this._x = x;this._y = y;this._z = z;this._order = order || this._order;this.onChangeCallback();return this;},clone:function clone(){return new this.constructor(this._x,this._y,this._z,this._order);},copy:function copy(euler){this._x = euler._x;this._y = euler._y;this._z = euler._z;this._order = euler._order;this.onChangeCallback();return this;},setFromRotationMatrix:function setFromRotationMatrix(m,order,update){var clamp=THREE.Math.clamp; // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
	var te=m.elements;var m11=te[0],m12=te[4],m13=te[8];var m21=te[1],m22=te[5],m23=te[9];var m31=te[2],m32=te[6],m33=te[10];order = order || this._order;if(order === 'XYZ'){this._y = Math.asin(clamp(m13,-1,1));if(Math.abs(m13) < 0.99999){this._x = Math.atan2(-m23,m33);this._z = Math.atan2(-m12,m11);}else {this._x = Math.atan2(m32,m22);this._z = 0;}}else if(order === 'YXZ'){this._x = Math.asin(-clamp(m23,-1,1));if(Math.abs(m23) < 0.99999){this._y = Math.atan2(m13,m33);this._z = Math.atan2(m21,m22);}else {this._y = Math.atan2(-m31,m11);this._z = 0;}}else if(order === 'ZXY'){this._x = Math.asin(clamp(m32,-1,1));if(Math.abs(m32) < 0.99999){this._y = Math.atan2(-m31,m33);this._z = Math.atan2(-m12,m22);}else {this._y = 0;this._z = Math.atan2(m21,m11);}}else if(order === 'ZYX'){this._y = Math.asin(-clamp(m31,-1,1));if(Math.abs(m31) < 0.99999){this._x = Math.atan2(m32,m33);this._z = Math.atan2(m21,m11);}else {this._x = 0;this._z = Math.atan2(-m12,m22);}}else if(order === 'YZX'){this._z = Math.asin(clamp(m21,-1,1));if(Math.abs(m21) < 0.99999){this._x = Math.atan2(-m23,m22);this._y = Math.atan2(-m31,m11);}else {this._x = 0;this._y = Math.atan2(m13,m33);}}else if(order === 'XZY'){this._z = Math.asin(-clamp(m12,-1,1));if(Math.abs(m12) < 0.99999){this._x = Math.atan2(m32,m22);this._y = Math.atan2(m13,m11);}else {this._x = Math.atan2(-m23,m33);this._y = 0;}}else {console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);}this._order = order;if(update !== false)this.onChangeCallback();return this;},setFromQuaternion:(function(){var matrix;return function(q,order,update){if(matrix === undefined)matrix = new THREE.Matrix4();matrix.makeRotationFromQuaternion(q);this.setFromRotationMatrix(matrix,order,update);return this;};})(),setFromVector3:function setFromVector3(v,order){return this.set(v.x,v.y,v.z,order || this._order);},reorder:(function(){ // WARNING: this discards revolution information -bhouston
	var q=new THREE.Quaternion();return function(newOrder){q.setFromEuler(this);this.setFromQuaternion(q,newOrder);};})(),equals:function equals(euler){return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;},fromArray:function fromArray(array){this._x = array[0];this._y = array[1];this._z = array[2];if(array[3] !== undefined)this._order = array[3];this.onChangeCallback();return this;},toArray:function toArray(array,offset){if(array === undefined)array = [];if(offset === undefined)offset = 0;array[offset] = this._x;array[offset + 1] = this._y;array[offset + 2] = this._z;array[offset + 3] = this._order;return array;},toVector3:function toVector3(optionalResult){if(optionalResult){return optionalResult.set(this._x,this._y,this._z);}else {return new THREE.Vector3(this._x,this._y,this._z);}},onChange:function onChange(callback){this.onChangeCallback = callback;return this;},onChangeCallback:function onChangeCallback(){}},{x:{get:function get(){return this._x;},set:function set(value){this._x = value;this.onChangeCallback();},configurable:true,enumerable:true},y:{get:function get(){return this._y;},set:function set(value){this._y = value;this.onChangeCallback();},configurable:true,enumerable:true},z:{get:function get(){return this._z;},set:function set(value){this._z = value;this.onChangeCallback();},configurable:true,enumerable:true},order:{get:function get(){return this._order;},set:function set(value){this._order = value;this.onChangeCallback();},configurable:true,enumerable:true}}); // File:src/math/Line3.js
	/**
	 * @author bhouston / http://exocortex.com
	 */THREE.Line3 = function(start,end){this.start = start !== undefined?start:new THREE.Vector3();this.end = end !== undefined?end:new THREE.Vector3();};THREE.Line3.prototype = {constructor:THREE.Line3,set:function set(start,end){this.start.copy(start);this.end.copy(end);return this;},clone:function clone(){return new this.constructor().copy(this);},copy:function copy(line){this.start.copy(line.start);this.end.copy(line.end);return this;},center:function center(optionalTarget){var result=optionalTarget || new THREE.Vector3();return result.addVectors(this.start,this.end).multiplyScalar(0.5);},delta:function delta(optionalTarget){var result=optionalTarget || new THREE.Vector3();return result.subVectors(this.end,this.start);},distanceSq:function distanceSq(){return this.start.distanceToSquared(this.end);},distance:function distance(){return this.start.distanceTo(this.end);},at:function at(t,optionalTarget){var result=optionalTarget || new THREE.Vector3();return this.delta(result).multiplyScalar(t).add(this.start);},closestPointToPointParameter:(function(){var startP=new THREE.Vector3();var startEnd=new THREE.Vector3();return function(point,clampToLine){startP.subVectors(point,this.start);startEnd.subVectors(this.end,this.start);var startEnd2=startEnd.dot(startEnd);var startEnd_startP=startEnd.dot(startP);var t=startEnd_startP / startEnd2;if(clampToLine){t = THREE.Math.clamp(t,0,1);}return t;};})(),closestPointToPoint:function closestPointToPoint(point,clampToLine,optionalTarget){var t=this.closestPointToPointParameter(point,clampToLine);var result=optionalTarget || new THREE.Vector3();return this.delta(result).multiplyScalar(t).add(this.start);},applyMatrix4:function applyMatrix4(matrix){this.start.applyMatrix4(matrix);this.end.applyMatrix4(matrix);return this;},equals:function equals(line){return line.start.equals(this.start) && line.end.equals(this.end);}}; // File:src/math/Box2.js
	/**
	 * @author bhouston / http://exocortex.com
	 */THREE.Box2 = function(min,max){this.min = min !== undefined?min:new THREE.Vector2(Infinity,Infinity);this.max = max !== undefined?max:new THREE.Vector2(-Infinity,-Infinity);};THREE.Box2.prototype = {constructor:THREE.Box2,set:function set(min,max){this.min.copy(min);this.max.copy(max);return this;},setFromPoints:function setFromPoints(points){this.makeEmpty();for(var i=0,il=points.length;i < il;i++) {this.expandByPoint(points[i]);}return this;},setFromCenterAndSize:(function(){var v1=new THREE.Vector2();return function(center,size){var halfSize=v1.copy(size).multiplyScalar(0.5);this.min.copy(center).sub(halfSize);this.max.copy(center).add(halfSize);return this;};})(),clone:function clone(){return new this.constructor().copy(this);},copy:function copy(box){this.min.copy(box.min);this.max.copy(box.max);return this;},makeEmpty:function makeEmpty(){this.min.x = this.min.y = Infinity;this.max.x = this.max.y = -Infinity;return this;},empty:function empty(){ // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
	return this.max.x < this.min.x || this.max.y < this.min.y;},center:function center(optionalTarget){var result=optionalTarget || new THREE.Vector2();return result.addVectors(this.min,this.max).multiplyScalar(0.5);},size:function size(optionalTarget){var result=optionalTarget || new THREE.Vector2();return result.subVectors(this.max,this.min);},expandByPoint:function expandByPoint(point){this.min.min(point);this.max.max(point);return this;},expandByVector:function expandByVector(vector){this.min.sub(vector);this.max.add(vector);return this;},expandByScalar:function expandByScalar(scalar){this.min.addScalar(-scalar);this.max.addScalar(scalar);return this;},containsPoint:function containsPoint(point){if(point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y){return false;}return true;},containsBox:function containsBox(box){if(this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y){return true;}return false;},getParameter:function getParameter(point,optionalTarget){ // This can potentially have a divide by zero if the box
	// has a size dimension of 0.
	var result=optionalTarget || new THREE.Vector2();return result.set((point.x - this.min.x) / (this.max.x - this.min.x),(point.y - this.min.y) / (this.max.y - this.min.y));},isIntersectionBox:function isIntersectionBox(box){ // using 6 splitting planes to rule out intersections.
	if(box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y){return false;}return true;},clampPoint:function clampPoint(point,optionalTarget){var result=optionalTarget || new THREE.Vector2();return result.copy(point).clamp(this.min,this.max);},distanceToPoint:(function(){var v1=new THREE.Vector2();return function(point){var clampedPoint=v1.copy(point).clamp(this.min,this.max);return clampedPoint.sub(point).length();};})(),intersect:function intersect(box){this.min.max(box.min);this.max.min(box.max);return this;},union:function union(box){this.min.min(box.min);this.max.max(box.max);return this;},translate:function translate(offset){this.min.add(offset);this.max.add(offset);return this;},equals:function equals(box){return box.min.equals(this.min) && box.max.equals(this.max);}}; // File:src/math/Box3.js
	/**
	 * @author bhouston / http://exocortex.com
	 * @author WestLangley / http://github.com/WestLangley
	 */THREE.Box3 = function(min,max){this.min = min !== undefined?min:new THREE.Vector3(Infinity,Infinity,Infinity);this.max = max !== undefined?max:new THREE.Vector3(-Infinity,-Infinity,-Infinity);};THREE.Box3.prototype = {constructor:THREE.Box3,set:function set(min,max){this.min.copy(min);this.max.copy(max);return this;},setFromPoints:function setFromPoints(points){this.makeEmpty();for(var i=0,il=points.length;i < il;i++) {this.expandByPoint(points[i]);}return this;},setFromCenterAndSize:(function(){var v1=new THREE.Vector3();return function(center,size){var halfSize=v1.copy(size).multiplyScalar(0.5);this.min.copy(center).sub(halfSize);this.max.copy(center).add(halfSize);return this;};})(),setFromObject:(function(){ // Computes the world-axis-aligned bounding box of an object (including its children),
	// accounting for both the object's, and children's, world transforms
	var v1=new THREE.Vector3();return function(object){var scope=this;object.updateMatrixWorld(true);this.makeEmpty();object.traverse(function(node){var geometry=node.geometry;if(geometry !== undefined){if(geometry instanceof THREE.Geometry){var vertices=geometry.vertices;for(var i=0,il=vertices.length;i < il;i++) {v1.copy(vertices[i]);v1.applyMatrix4(node.matrixWorld);scope.expandByPoint(v1);}}else if(geometry instanceof THREE.BufferGeometry && geometry.attributes['position'] !== undefined){var positions=geometry.attributes['position'].array;for(var i=0,il=positions.length;i < il;i += 3) {v1.set(positions[i],positions[i + 1],positions[i + 2]);v1.applyMatrix4(node.matrixWorld);scope.expandByPoint(v1);}}}});return this;};})(),clone:function clone(){return new this.constructor().copy(this);},copy:function copy(box){this.min.copy(box.min);this.max.copy(box.max);return this;},makeEmpty:function makeEmpty(){this.min.x = this.min.y = this.min.z = Infinity;this.max.x = this.max.y = this.max.z = -Infinity;return this;},empty:function empty(){ // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
	return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;},center:function center(optionalTarget){var result=optionalTarget || new THREE.Vector3();return result.addVectors(this.min,this.max).multiplyScalar(0.5);},size:function size(optionalTarget){var result=optionalTarget || new THREE.Vector3();return result.subVectors(this.max,this.min);},expandByPoint:function expandByPoint(point){this.min.min(point);this.max.max(point);return this;},expandByVector:function expandByVector(vector){this.min.sub(vector);this.max.add(vector);return this;},expandByScalar:function expandByScalar(scalar){this.min.addScalar(-scalar);this.max.addScalar(scalar);return this;},containsPoint:function containsPoint(point){if(point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z){return false;}return true;},containsBox:function containsBox(box){if(this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z){return true;}return false;},getParameter:function getParameter(point,optionalTarget){ // This can potentially have a divide by zero if the box
	// has a size dimension of 0.
	var result=optionalTarget || new THREE.Vector3();return result.set((point.x - this.min.x) / (this.max.x - this.min.x),(point.y - this.min.y) / (this.max.y - this.min.y),(point.z - this.min.z) / (this.max.z - this.min.z));},isIntersectionBox:function isIntersectionBox(box){ // using 6 splitting planes to rule out intersections.
	if(box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z){return false;}return true;},clampPoint:function clampPoint(point,optionalTarget){var result=optionalTarget || new THREE.Vector3();return result.copy(point).clamp(this.min,this.max);},distanceToPoint:(function(){var v1=new THREE.Vector3();return function(point){var clampedPoint=v1.copy(point).clamp(this.min,this.max);return clampedPoint.sub(point).length();};})(),getBoundingSphere:(function(){var v1=new THREE.Vector3();return function(optionalTarget){var result=optionalTarget || new THREE.Sphere();result.center = this.center();result.radius = this.size(v1).length() * 0.5;return result;};})(),intersect:function intersect(box){this.min.max(box.min);this.max.min(box.max);return this;},union:function union(box){this.min.min(box.min);this.max.max(box.max);return this;},applyMatrix4:(function(){var points=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()];return function(matrix){ // NOTE: I am using a binary pattern to specify all 2^3 combinations below
	points[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(matrix); // 000
	points[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(matrix); // 001
	points[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(matrix); // 010
	points[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(matrix); // 011
	points[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(matrix); // 100
	points[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(matrix); // 101
	points[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(matrix); // 110
	points[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(matrix); // 111
	this.makeEmpty();this.setFromPoints(points);return this;};})(),translate:function translate(offset){this.min.add(offset);this.max.add(offset);return this;},equals:function equals(box){return box.min.equals(this.min) && box.max.equals(this.max);}}; // File:src/math/Matrix3.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author bhouston / http://exocortex.com
	 */THREE.Matrix3 = function(){this.elements = new Float32Array([1,0,0,0,1,0,0,0,1]);if(arguments.length > 0){console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');}};THREE.Matrix3.prototype = {constructor:THREE.Matrix3,set:function set(n11,n12,n13,n21,n22,n23,n31,n32,n33){var te=this.elements;te[0] = n11;te[3] = n12;te[6] = n13;te[1] = n21;te[4] = n22;te[7] = n23;te[2] = n31;te[5] = n32;te[8] = n33;return this;},identity:function identity(){this.set(1,0,0,0,1,0,0,0,1);return this;},clone:function clone(){return new this.constructor().fromArray(this.elements);},copy:function copy(m){var me=m.elements;this.set(me[0],me[3],me[6],me[1],me[4],me[7],me[2],me[5],me[8]);return this;},multiplyVector3:function multiplyVector3(vector){console.warn('THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.');return vector.applyMatrix3(this);},multiplyVector3Array:function multiplyVector3Array(a){console.warn('THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.');return this.applyToVector3Array(a);},applyToVector3Array:(function(){var v1;return function(array,offset,length){if(v1 === undefined)v1 = new THREE.Vector3();if(offset === undefined)offset = 0;if(length === undefined)length = array.length;for(var i=0,j=offset;i < length;i += 3,j += 3) {v1.fromArray(array,j);v1.applyMatrix3(this);v1.toArray(array,j);}return array;};})(),applyToBuffer:(function(){var v1;return function applyToBuffer(buffer,offset,length){if(v1 === undefined)v1 = new THREE.Vector3();if(offset === undefined)offset = 0;if(length === undefined)length = buffer.length / buffer.itemSize;for(var i=0,j=offset;i < length;i++,j++) {v1.x = buffer.getX(j);v1.y = buffer.getY(j);v1.z = buffer.getZ(j);v1.applyMatrix3(this);buffer.setXYZ(v1.x,v1.y,v1.z);}return buffer;};})(),multiplyScalar:function multiplyScalar(s){var te=this.elements;te[0] *= s;te[3] *= s;te[6] *= s;te[1] *= s;te[4] *= s;te[7] *= s;te[2] *= s;te[5] *= s;te[8] *= s;return this;},determinant:function determinant(){var te=this.elements;var a=te[0],b=te[1],c=te[2],d=te[3],e=te[4],f=te[5],g=te[6],h=te[7],i=te[8];return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;},getInverse:function getInverse(matrix,throwOnInvertible){ // input: THREE.Matrix4
	// ( based on http://code.google.com/p/webgl-mjs/ )
	var me=matrix.elements;var te=this.elements;te[0] = me[10] * me[5] - me[6] * me[9];te[1] = -me[10] * me[1] + me[2] * me[9];te[2] = me[6] * me[1] - me[2] * me[5];te[3] = -me[10] * me[4] + me[6] * me[8];te[4] = me[10] * me[0] - me[2] * me[8];te[5] = -me[6] * me[0] + me[2] * me[4];te[6] = me[9] * me[4] - me[5] * me[8];te[7] = -me[9] * me[0] + me[1] * me[8];te[8] = me[5] * me[0] - me[1] * me[4];var det=me[0] * te[0] + me[1] * te[3] + me[2] * te[6]; // no inverse
	if(det === 0){var msg="Matrix3.getInverse(): can't invert matrix, determinant is 0";if(throwOnInvertible || false){throw new Error(msg);}else {console.warn(msg);}this.identity();return this;}this.multiplyScalar(1.0 / det);return this;},transpose:function transpose(){var tmp,m=this.elements;tmp = m[1];m[1] = m[3];m[3] = tmp;tmp = m[2];m[2] = m[6];m[6] = tmp;tmp = m[5];m[5] = m[7];m[7] = tmp;return this;},flattenToArrayOffset:function flattenToArrayOffset(array,offset){var te=this.elements;array[offset] = te[0];array[offset + 1] = te[1];array[offset + 2] = te[2];array[offset + 3] = te[3];array[offset + 4] = te[4];array[offset + 5] = te[5];array[offset + 6] = te[6];array[offset + 7] = te[7];array[offset + 8] = te[8];return array;},getNormalMatrix:function getNormalMatrix(m){ // input: THREE.Matrix4
	this.getInverse(m).transpose();return this;},transposeIntoArray:function transposeIntoArray(r){var m=this.elements;r[0] = m[0];r[1] = m[3];r[2] = m[6];r[3] = m[1];r[4] = m[4];r[5] = m[7];r[6] = m[2];r[7] = m[5];r[8] = m[8];return this;},fromArray:function fromArray(array){this.elements.set(array);return this;},toArray:function toArray(){var te=this.elements;return [te[0],te[1],te[2],te[3],te[4],te[5],te[6],te[7],te[8]];}}; // File:src/math/Matrix4.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author supereggbert / http://www.paulbrunt.co.uk/
	 * @author philogb / http://blog.thejit.org/
	 * @author jordi_ros / http://plattsoft.com
	 * @author D1plo1d / http://github.com/D1plo1d
	 * @author alteredq / http://alteredqualia.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author timknip / http://www.floorplanner.com/
	 * @author bhouston / http://exocortex.com
	 * @author WestLangley / http://github.com/WestLangley
	 */THREE.Matrix4 = function(){this.elements = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);if(arguments.length > 0){console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.');}};THREE.Matrix4.prototype = {constructor:THREE.Matrix4,set:function set(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44){var te=this.elements;te[0] = n11;te[4] = n12;te[8] = n13;te[12] = n14;te[1] = n21;te[5] = n22;te[9] = n23;te[13] = n24;te[2] = n31;te[6] = n32;te[10] = n33;te[14] = n34;te[3] = n41;te[7] = n42;te[11] = n43;te[15] = n44;return this;},identity:function identity(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this;},clone:function clone(){return new THREE.Matrix4().fromArray(this.elements);},copy:function copy(m){this.elements.set(m.elements);return this;},extractPosition:function extractPosition(m){console.warn('THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().');return this.copyPosition(m);},copyPosition:function copyPosition(m){var te=this.elements;var me=m.elements;te[12] = me[12];te[13] = me[13];te[14] = me[14];return this;},extractBasis:function extractBasis(xAxis,yAxis,zAxis){var te=this.elements;xAxis.set(te[0],te[1],te[2]);yAxis.set(te[4],te[5],te[6]);zAxis.set(te[8],te[9],te[10]);return this;},makeBasis:function makeBasis(xAxis,yAxis,zAxis){this.set(xAxis.x,yAxis.x,zAxis.x,0,xAxis.y,yAxis.y,zAxis.y,0,xAxis.z,yAxis.z,zAxis.z,0,0,0,0,1);return this;},extractRotation:(function(){var v1;return function(m){if(v1 === undefined)v1 = new THREE.Vector3();var te=this.elements;var me=m.elements;var scaleX=1 / v1.set(me[0],me[1],me[2]).length();var scaleY=1 / v1.set(me[4],me[5],me[6]).length();var scaleZ=1 / v1.set(me[8],me[9],me[10]).length();te[0] = me[0] * scaleX;te[1] = me[1] * scaleX;te[2] = me[2] * scaleX;te[4] = me[4] * scaleY;te[5] = me[5] * scaleY;te[6] = me[6] * scaleY;te[8] = me[8] * scaleZ;te[9] = me[9] * scaleZ;te[10] = me[10] * scaleZ;return this;};})(),makeRotationFromEuler:function makeRotationFromEuler(euler){if(euler instanceof THREE.Euler === false){console.error('THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');}var te=this.elements;var x=euler.x,y=euler.y,z=euler.z;var a=Math.cos(x),b=Math.sin(x);var c=Math.cos(y),d=Math.sin(y);var e=Math.cos(z),f=Math.sin(z);if(euler.order === 'XYZ'){var ae=a * e,af=a * f,be=b * e,bf=b * f;te[0] = c * e;te[4] = -c * f;te[8] = d;te[1] = af + be * d;te[5] = ae - bf * d;te[9] = -b * c;te[2] = bf - ae * d;te[6] = be + af * d;te[10] = a * c;}else if(euler.order === 'YXZ'){var ce=c * e,cf=c * f,de=d * e,df=d * f;te[0] = ce + df * b;te[4] = de * b - cf;te[8] = a * d;te[1] = a * f;te[5] = a * e;te[9] = -b;te[2] = cf * b - de;te[6] = df + ce * b;te[10] = a * c;}else if(euler.order === 'ZXY'){var ce=c * e,cf=c * f,de=d * e,df=d * f;te[0] = ce - df * b;te[4] = -a * f;te[8] = de + cf * b;te[1] = cf + de * b;te[5] = a * e;te[9] = df - ce * b;te[2] = -a * d;te[6] = b;te[10] = a * c;}else if(euler.order === 'ZYX'){var ae=a * e,af=a * f,be=b * e,bf=b * f;te[0] = c * e;te[4] = be * d - af;te[8] = ae * d + bf;te[1] = c * f;te[5] = bf * d + ae;te[9] = af * d - be;te[2] = -d;te[6] = b * c;te[10] = a * c;}else if(euler.order === 'YZX'){var ac=a * c,ad=a * d,bc=b * c,bd=b * d;te[0] = c * e;te[4] = bd - ac * f;te[8] = bc * f + ad;te[1] = f;te[5] = a * e;te[9] = -b * e;te[2] = -d * e;te[6] = ad * f + bc;te[10] = ac - bd * f;}else if(euler.order === 'XZY'){var ac=a * c,ad=a * d,bc=b * c,bd=b * d;te[0] = c * e;te[4] = -f;te[8] = d * e;te[1] = ac * f + bd;te[5] = a * e;te[9] = ad * f - bc;te[2] = bc * f - ad;te[6] = b * e;te[10] = bd * f + ac;} // last column
	te[3] = 0;te[7] = 0;te[11] = 0; // bottom row
	te[12] = 0;te[13] = 0;te[14] = 0;te[15] = 1;return this;},setRotationFromQuaternion:function setRotationFromQuaternion(q){console.warn('THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().');return this.makeRotationFromQuaternion(q);},makeRotationFromQuaternion:function makeRotationFromQuaternion(q){var te=this.elements;var x=q.x,y=q.y,z=q.z,w=q.w;var x2=x + x,y2=y + y,z2=z + z;var xx=x * x2,xy=x * y2,xz=x * z2;var yy=y * y2,yz=y * z2,zz=z * z2;var wx=w * x2,wy=w * y2,wz=w * z2;te[0] = 1 - (yy + zz);te[4] = xy - wz;te[8] = xz + wy;te[1] = xy + wz;te[5] = 1 - (xx + zz);te[9] = yz - wx;te[2] = xz - wy;te[6] = yz + wx;te[10] = 1 - (xx + yy); // last column
	te[3] = 0;te[7] = 0;te[11] = 0; // bottom row
	te[12] = 0;te[13] = 0;te[14] = 0;te[15] = 1;return this;},lookAt:(function(){var x,y,z;return function(eye,target,up){if(x === undefined)x = new THREE.Vector3();if(y === undefined)y = new THREE.Vector3();if(z === undefined)z = new THREE.Vector3();var te=this.elements;z.subVectors(eye,target).normalize();if(z.length() === 0){z.z = 1;}x.crossVectors(up,z).normalize();if(x.length() === 0){z.x += 0.0001;x.crossVectors(up,z).normalize();}y.crossVectors(z,x);te[0] = x.x;te[4] = y.x;te[8] = z.x;te[1] = x.y;te[5] = y.y;te[9] = z.y;te[2] = x.z;te[6] = y.z;te[10] = z.z;return this;};})(),multiply:function multiply(m,n){if(n !== undefined){console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');return this.multiplyMatrices(m,n);}return this.multiplyMatrices(this,m);},multiplyMatrices:function multiplyMatrices(a,b){var ae=a.elements;var be=b.elements;var te=this.elements;var a11=ae[0],a12=ae[4],a13=ae[8],a14=ae[12];var a21=ae[1],a22=ae[5],a23=ae[9],a24=ae[13];var a31=ae[2],a32=ae[6],a33=ae[10],a34=ae[14];var a41=ae[3],a42=ae[7],a43=ae[11],a44=ae[15];var b11=be[0],b12=be[4],b13=be[8],b14=be[12];var b21=be[1],b22=be[5],b23=be[9],b24=be[13];var b31=be[2],b32=be[6],b33=be[10],b34=be[14];var b41=be[3],b42=be[7],b43=be[11],b44=be[15];te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;return this;},multiplyToArray:function multiplyToArray(a,b,r){var te=this.elements;this.multiplyMatrices(a,b);r[0] = te[0];r[1] = te[1];r[2] = te[2];r[3] = te[3];r[4] = te[4];r[5] = te[5];r[6] = te[6];r[7] = te[7];r[8] = te[8];r[9] = te[9];r[10] = te[10];r[11] = te[11];r[12] = te[12];r[13] = te[13];r[14] = te[14];r[15] = te[15];return this;},multiplyScalar:function multiplyScalar(s){var te=this.elements;te[0] *= s;te[4] *= s;te[8] *= s;te[12] *= s;te[1] *= s;te[5] *= s;te[9] *= s;te[13] *= s;te[2] *= s;te[6] *= s;te[10] *= s;te[14] *= s;te[3] *= s;te[7] *= s;te[11] *= s;te[15] *= s;return this;},multiplyVector3:function multiplyVector3(vector){console.warn('THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.');return vector.applyProjection(this);},multiplyVector4:function multiplyVector4(vector){console.warn('THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.');return vector.applyMatrix4(this);},multiplyVector3Array:function multiplyVector3Array(a){console.warn('THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.');return this.applyToVector3Array(a);},applyToVector3Array:(function(){var v1;return function(array,offset,length){if(v1 === undefined)v1 = new THREE.Vector3();if(offset === undefined)offset = 0;if(length === undefined)length = array.length;for(var i=0,j=offset;i < length;i += 3,j += 3) {v1.fromArray(array,j);v1.applyMatrix4(this);v1.toArray(array,j);}return array;};})(),applyToBuffer:(function(){var v1;return function applyToBuffer(buffer,offset,length){if(v1 === undefined)v1 = new THREE.Vector3();if(offset === undefined)offset = 0;if(length === undefined)length = buffer.length / buffer.itemSize;for(var i=0,j=offset;i < length;i++,j++) {v1.x = buffer.getX(j);v1.y = buffer.getY(j);v1.z = buffer.getZ(j);v1.applyMatrix4(this);buffer.setXYZ(v1.x,v1.y,v1.z);}return buffer;};})(),rotateAxis:function rotateAxis(v){console.warn('THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.');v.transformDirection(this);},crossVector:function crossVector(vector){console.warn('THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.');return vector.applyMatrix4(this);},determinant:function determinant(){var te=this.elements;var n11=te[0],n12=te[4],n13=te[8],n14=te[12];var n21=te[1],n22=te[5],n23=te[9],n24=te[13];var n31=te[2],n32=te[6],n33=te[10],n34=te[14];var n41=te[3],n42=te[7],n43=te[11],n44=te[15]; //TODO: make this more efficient
	//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
	return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);},transpose:function transpose(){var te=this.elements;var tmp;tmp = te[1];te[1] = te[4];te[4] = tmp;tmp = te[2];te[2] = te[8];te[8] = tmp;tmp = te[6];te[6] = te[9];te[9] = tmp;tmp = te[3];te[3] = te[12];te[12] = tmp;tmp = te[7];te[7] = te[13];te[13] = tmp;tmp = te[11];te[11] = te[14];te[14] = tmp;return this;},flattenToArrayOffset:function flattenToArrayOffset(array,offset){var te=this.elements;array[offset] = te[0];array[offset + 1] = te[1];array[offset + 2] = te[2];array[offset + 3] = te[3];array[offset + 4] = te[4];array[offset + 5] = te[5];array[offset + 6] = te[6];array[offset + 7] = te[7];array[offset + 8] = te[8];array[offset + 9] = te[9];array[offset + 10] = te[10];array[offset + 11] = te[11];array[offset + 12] = te[12];array[offset + 13] = te[13];array[offset + 14] = te[14];array[offset + 15] = te[15];return array;},getPosition:(function(){var v1;return function(){if(v1 === undefined)v1 = new THREE.Vector3();console.warn('THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.');var te=this.elements;return v1.set(te[12],te[13],te[14]);};})(),setPosition:function setPosition(v){var te=this.elements;te[12] = v.x;te[13] = v.y;te[14] = v.z;return this;},getInverse:function getInverse(m,throwOnInvertible){ // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
	var te=this.elements;var me=m.elements;var n11=me[0],n12=me[4],n13=me[8],n14=me[12];var n21=me[1],n22=me[5],n23=me[9],n24=me[13];var n31=me[2],n32=me[6],n33=me[10],n34=me[14];var n41=me[3],n42=me[7],n43=me[11],n44=me[15];te[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;te[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;te[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;te[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;var det=n11 * te[0] + n21 * te[4] + n31 * te[8] + n41 * te[12];if(det === 0){var msg="THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";if(throwOnInvertible || false){throw new Error(msg);}else {console.warn(msg);}this.identity();return this;}this.multiplyScalar(1 / det);return this;},translate:function translate(v){console.error('THREE.Matrix4: .translate() has been removed.');},rotateX:function rotateX(angle){console.error('THREE.Matrix4: .rotateX() has been removed.');},rotateY:function rotateY(angle){console.error('THREE.Matrix4: .rotateY() has been removed.');},rotateZ:function rotateZ(angle){console.error('THREE.Matrix4: .rotateZ() has been removed.');},rotateByAxis:function rotateByAxis(axis,angle){console.error('THREE.Matrix4: .rotateByAxis() has been removed.');},scale:function scale(v){var te=this.elements;var x=v.x,y=v.y,z=v.z;te[0] *= x;te[4] *= y;te[8] *= z;te[1] *= x;te[5] *= y;te[9] *= z;te[2] *= x;te[6] *= y;te[10] *= z;te[3] *= x;te[7] *= y;te[11] *= z;return this;},getMaxScaleOnAxis:function getMaxScaleOnAxis(){var te=this.elements;var scaleXSq=te[0] * te[0] + te[1] * te[1] + te[2] * te[2];var scaleYSq=te[4] * te[4] + te[5] * te[5] + te[6] * te[6];var scaleZSq=te[8] * te[8] + te[9] * te[9] + te[10] * te[10];return Math.sqrt(Math.max(scaleXSq,Math.max(scaleYSq,scaleZSq)));},makeTranslation:function makeTranslation(x,y,z){this.set(1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);return this;},makeRotationX:function makeRotationX(theta){var c=Math.cos(theta),s=Math.sin(theta);this.set(1,0,0,0,0,c,-s,0,0,s,c,0,0,0,0,1);return this;},makeRotationY:function makeRotationY(theta){var c=Math.cos(theta),s=Math.sin(theta);this.set(c,0,s,0,0,1,0,0,-s,0,c,0,0,0,0,1);return this;},makeRotationZ:function makeRotationZ(theta){var c=Math.cos(theta),s=Math.sin(theta);this.set(c,-s,0,0,s,c,0,0,0,0,1,0,0,0,0,1);return this;},makeRotationAxis:function makeRotationAxis(axis,angle){ // Based on http://www.gamedev.net/reference/articles/article1199.asp
	var c=Math.cos(angle);var s=Math.sin(angle);var t=1 - c;var x=axis.x,y=axis.y,z=axis.z;var tx=t * x,ty=t * y;this.set(tx * x + c,tx * y - s * z,tx * z + s * y,0,tx * y + s * z,ty * y + c,ty * z - s * x,0,tx * z - s * y,ty * z + s * x,t * z * z + c,0,0,0,0,1);return this;},makeScale:function makeScale(x,y,z){this.set(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);return this;},compose:function compose(position,quaternion,scale){this.makeRotationFromQuaternion(quaternion);this.scale(scale);this.setPosition(position);return this;},decompose:(function(){var vector,matrix;return function(position,quaternion,scale){if(vector === undefined)vector = new THREE.Vector3();if(matrix === undefined)matrix = new THREE.Matrix4();var te=this.elements;var sx=vector.set(te[0],te[1],te[2]).length();var sy=vector.set(te[4],te[5],te[6]).length();var sz=vector.set(te[8],te[9],te[10]).length(); // if determine is negative, we need to invert one scale
	var det=this.determinant();if(det < 0){sx = -sx;}position.x = te[12];position.y = te[13];position.z = te[14]; // scale the rotation part
	matrix.elements.set(this.elements); // at this point matrix is incomplete so we can't use .copy()
	var invSX=1 / sx;var invSY=1 / sy;var invSZ=1 / sz;matrix.elements[0] *= invSX;matrix.elements[1] *= invSX;matrix.elements[2] *= invSX;matrix.elements[4] *= invSY;matrix.elements[5] *= invSY;matrix.elements[6] *= invSY;matrix.elements[8] *= invSZ;matrix.elements[9] *= invSZ;matrix.elements[10] *= invSZ;quaternion.setFromRotationMatrix(matrix);scale.x = sx;scale.y = sy;scale.z = sz;return this;};})(),makeFrustum:function makeFrustum(left,right,bottom,top,near,far){var te=this.elements;var x=2 * near / (right - left);var y=2 * near / (top - bottom);var a=(right + left) / (right - left);var b=(top + bottom) / (top - bottom);var c=-(far + near) / (far - near);var d=-2 * far * near / (far - near);te[0] = x;te[4] = 0;te[8] = a;te[12] = 0;te[1] = 0;te[5] = y;te[9] = b;te[13] = 0;te[2] = 0;te[6] = 0;te[10] = c;te[14] = d;te[3] = 0;te[7] = 0;te[11] = -1;te[15] = 0;return this;},makePerspective:function makePerspective(fov,aspect,near,far){var ymax=near * Math.tan(THREE.Math.degToRad(fov * 0.5));var ymin=-ymax;var xmin=ymin * aspect;var xmax=ymax * aspect;return this.makeFrustum(xmin,xmax,ymin,ymax,near,far);},makeOrthographic:function makeOrthographic(left,right,top,bottom,near,far){var te=this.elements;var w=right - left;var h=top - bottom;var p=far - near;var x=(right + left) / w;var y=(top + bottom) / h;var z=(far + near) / p;te[0] = 2 / w;te[4] = 0;te[8] = 0;te[12] = -x;te[1] = 0;te[5] = 2 / h;te[9] = 0;te[13] = -y;te[2] = 0;te[6] = 0;te[10] = -2 / p;te[14] = -z;te[3] = 0;te[7] = 0;te[11] = 0;te[15] = 1;return this;},equals:function equals(matrix){var te=this.elements;var me=matrix.elements;for(var i=0;i < 16;i++) {if(te[i] !== me[i])return false;}return true;},fromArray:function fromArray(array){this.elements.set(array);return this;},toArray:function toArray(){var te=this.elements;return [te[0],te[1],te[2],te[3],te[4],te[5],te[6],te[7],te[8],te[9],te[10],te[11],te[12],te[13],te[14],te[15]];}}; // File:src/math/Ray.js
	/**
	 * @author bhouston / http://exocortex.com
	 */THREE.Ray = function(origin,direction){this.origin = origin !== undefined?origin:new THREE.Vector3();this.direction = direction !== undefined?direction:new THREE.Vector3();};THREE.Ray.prototype = {constructor:THREE.Ray,set:function set(origin,direction){this.origin.copy(origin);this.direction.copy(direction);return this;},clone:function clone(){return new this.constructor().copy(this);},copy:function copy(ray){this.origin.copy(ray.origin);this.direction.copy(ray.direction);return this;},at:function at(t,optionalTarget){var result=optionalTarget || new THREE.Vector3();return result.copy(this.direction).multiplyScalar(t).add(this.origin);},recast:(function(){var v1=new THREE.Vector3();return function(t){this.origin.copy(this.at(t,v1));return this;};})(),closestPointToPoint:function closestPointToPoint(point,optionalTarget){var result=optionalTarget || new THREE.Vector3();result.subVectors(point,this.origin);var directionDistance=result.dot(this.direction);if(directionDistance < 0){return result.copy(this.origin);}return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);},distanceToPoint:function distanceToPoint(point){return Math.sqrt(this.distanceSqToPoint(point));},distanceSqToPoint:(function(){var v1=new THREE.Vector3();return function(point){var directionDistance=v1.subVectors(point,this.origin).dot(this.direction); // point behind the ray
	if(directionDistance < 0){return this.origin.distanceToSquared(point);}v1.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);return v1.distanceToSquared(point);};})(),distanceSqToSegment:(function(){var segCenter=new THREE.Vector3();var segDir=new THREE.Vector3();var diff=new THREE.Vector3();return function(v0,v1,optionalPointOnRay,optionalPointOnSegment){ // from http://www.geometrictools.com/LibMathematics/Distance/Wm5DistRay3Segment3.cpp
	// It returns the min distance between the ray and the segment
	// defined by v0 and v1
	// It can also set two optional targets :
	// - The closest point on the ray
	// - The closest point on the segment
	segCenter.copy(v0).add(v1).multiplyScalar(0.5);segDir.copy(v1).sub(v0).normalize();diff.copy(this.origin).sub(segCenter);var segExtent=v0.distanceTo(v1) * 0.5;var a01=-this.direction.dot(segDir);var b0=diff.dot(this.direction);var b1=-diff.dot(segDir);var c=diff.lengthSq();var det=Math.abs(1 - a01 * a01);var s0,s1,sqrDist,extDet;if(det > 0){ // The ray and segment are not parallel.
	s0 = a01 * b1 - b0;s1 = a01 * b0 - b1;extDet = segExtent * det;if(s0 >= 0){if(s1 >= -extDet){if(s1 <= extDet){ // region 0
	// Minimum at interior points of ray and segment.
	var invDet=1 / det;s0 *= invDet;s1 *= invDet;sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;}else { // region 1
	s1 = segExtent;s0 = Math.max(0,-(a01 * s1 + b0));sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;}}else { // region 5
	s1 = -segExtent;s0 = Math.max(0,-(a01 * s1 + b0));sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;}}else {if(s1 <= -extDet){ // region 4
	s0 = Math.max(0,-(-a01 * segExtent + b0));s1 = s0 > 0?-segExtent:Math.min(Math.max(-segExtent,-b1),segExtent);sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;}else if(s1 <= extDet){ // region 3
	s0 = 0;s1 = Math.min(Math.max(-segExtent,-b1),segExtent);sqrDist = s1 * (s1 + 2 * b1) + c;}else { // region 2
	s0 = Math.max(0,-(a01 * segExtent + b0));s1 = s0 > 0?segExtent:Math.min(Math.max(-segExtent,-b1),segExtent);sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;}}}else { // Ray and segment are parallel.
	s1 = a01 > 0?-segExtent:segExtent;s0 = Math.max(0,-(a01 * s1 + b0));sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;}if(optionalPointOnRay){optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);}if(optionalPointOnSegment){optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter);}return sqrDist;};})(),isIntersectionSphere:function isIntersectionSphere(sphere){return this.distanceToPoint(sphere.center) <= sphere.radius;},intersectSphere:(function(){ // from http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-sphere-intersection/
	var v1=new THREE.Vector3();return function(sphere,optionalTarget){v1.subVectors(sphere.center,this.origin);var tca=v1.dot(this.direction);var d2=v1.dot(v1) - tca * tca;var radius2=sphere.radius * sphere.radius;if(d2 > radius2)return null;var thc=Math.sqrt(radius2 - d2); // t0 = first intersect point - entrance on front of sphere
	var t0=tca - thc; // t1 = second intersect point - exit point on back of sphere
	var t1=tca + thc; // test to see if both t0 and t1 are behind the ray - if so, return null
	if(t0 < 0 && t1 < 0)return null; // test to see if t0 is behind the ray:
	// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
	// in order to always return an intersect point that is in front of the ray.
	if(t0 < 0)return this.at(t1,optionalTarget); // else t0 is in front of the ray, so return the first collision point scaled by t0
	return this.at(t0,optionalTarget);};})(),isIntersectionPlane:function isIntersectionPlane(plane){ // check if the ray lies on the plane first
	var distToPoint=plane.distanceToPoint(this.origin);if(distToPoint === 0){return true;}var denominator=plane.normal.dot(this.direction);if(denominator * distToPoint < 0){return true;} // ray origin is behind the plane (and is pointing behind it)
	return false;},distanceToPlane:function distanceToPlane(plane){var denominator=plane.normal.dot(this.direction);if(denominator === 0){ // line is coplanar, return origin
	if(plane.distanceToPoint(this.origin) === 0){return 0;} // Null is preferable to undefined since undefined means.... it is undefined
	return null;}var t=-(this.origin.dot(plane.normal) + plane.constant) / denominator; // Return if the ray never intersects the plane
	return t >= 0?t:null;},intersectPlane:function intersectPlane(plane,optionalTarget){var t=this.distanceToPlane(plane);if(t === null){return null;}return this.at(t,optionalTarget);},isIntersectionBox:(function(){var v=new THREE.Vector3();return function(box){return this.intersectBox(box,v) !== null;};})(),intersectBox:function intersectBox(box,optionalTarget){ // http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-box-intersection/
	var tmin,tmax,tymin,tymax,tzmin,tzmax;var invdirx=1 / this.direction.x,invdiry=1 / this.direction.y,invdirz=1 / this.direction.z;var origin=this.origin;if(invdirx >= 0){tmin = (box.min.x - origin.x) * invdirx;tmax = (box.max.x - origin.x) * invdirx;}else {tmin = (box.max.x - origin.x) * invdirx;tmax = (box.min.x - origin.x) * invdirx;}if(invdiry >= 0){tymin = (box.min.y - origin.y) * invdiry;tymax = (box.max.y - origin.y) * invdiry;}else {tymin = (box.max.y - origin.y) * invdiry;tymax = (box.min.y - origin.y) * invdiry;}if(tmin > tymax || tymin > tmax)return null; // These lines also handle the case where tmin or tmax is NaN
	// (result of 0 * Infinity). x !== x returns true if x is NaN
	if(tymin > tmin || tmin !== tmin)tmin = tymin;if(tymax < tmax || tmax !== tmax)tmax = tymax;if(invdirz >= 0){tzmin = (box.min.z - origin.z) * invdirz;tzmax = (box.max.z - origin.z) * invdirz;}else {tzmin = (box.max.z - origin.z) * invdirz;tzmax = (box.min.z - origin.z) * invdirz;}if(tmin > tzmax || tzmin > tmax)return null;if(tzmin > tmin || tmin !== tmin)tmin = tzmin;if(tzmax < tmax || tmax !== tmax)tmax = tzmax; //return point closest to the ray (positive side)
	if(tmax < 0)return null;return this.at(tmin >= 0?tmin:tmax,optionalTarget);},intersectTriangle:(function(){ // Compute the offset origin, edges, and normal.
	var diff=new THREE.Vector3();var edge1=new THREE.Vector3();var edge2=new THREE.Vector3();var normal=new THREE.Vector3();return function(a,b,c,backfaceCulling,optionalTarget){ // from http://www.geometrictools.com/LibMathematics/Intersection/Wm5IntrRay3Triangle3.cpp
	edge1.subVectors(b,a);edge2.subVectors(c,a);normal.crossVectors(edge1,edge2); // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
	// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
	//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
	//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
	//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
	var DdN=this.direction.dot(normal);var sign;if(DdN > 0){if(backfaceCulling)return null;sign = 1;}else if(DdN < 0){sign = -1;DdN = -DdN;}else {return null;}diff.subVectors(this.origin,a);var DdQxE2=sign * this.direction.dot(edge2.crossVectors(diff,edge2)); // b1 < 0, no intersection
	if(DdQxE2 < 0){return null;}var DdE1xQ=sign * this.direction.dot(edge1.cross(diff)); // b2 < 0, no intersection
	if(DdE1xQ < 0){return null;} // b1+b2 > 1, no intersection
	if(DdQxE2 + DdE1xQ > DdN){return null;} // Line intersects triangle, check if ray does.
	var QdN=-sign * diff.dot(normal); // t < 0, no intersection
	if(QdN < 0){return null;} // Ray intersects triangle.
	return this.at(QdN / DdN,optionalTarget);};})(),applyMatrix4:function applyMatrix4(matrix4){this.direction.add(this.origin).applyMatrix4(matrix4);this.origin.applyMatrix4(matrix4);this.direction.sub(this.origin);this.direction.normalize();return this;},equals:function equals(ray){return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);}}; // File:src/math/Sphere.js
	/**
	 * @author bhouston / http://exocortex.com
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Sphere = function(center,radius){this.center = center !== undefined?center:new THREE.Vector3();this.radius = radius !== undefined?radius:0;};THREE.Sphere.prototype = {constructor:THREE.Sphere,set:function set(center,radius){this.center.copy(center);this.radius = radius;return this;},setFromPoints:(function(){var box=new THREE.Box3();return function(points,optionalCenter){var center=this.center;if(optionalCenter !== undefined){center.copy(optionalCenter);}else {box.setFromPoints(points).center(center);}var maxRadiusSq=0;for(var i=0,il=points.length;i < il;i++) {maxRadiusSq = Math.max(maxRadiusSq,center.distanceToSquared(points[i]));}this.radius = Math.sqrt(maxRadiusSq);return this;};})(),clone:function clone(){return new this.constructor().copy(this);},copy:function copy(sphere){this.center.copy(sphere.center);this.radius = sphere.radius;return this;},empty:function empty(){return this.radius <= 0;},containsPoint:function containsPoint(point){return point.distanceToSquared(this.center) <= this.radius * this.radius;},distanceToPoint:function distanceToPoint(point){return point.distanceTo(this.center) - this.radius;},intersectsSphere:function intersectsSphere(sphere){var radiusSum=this.radius + sphere.radius;return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;},clampPoint:function clampPoint(point,optionalTarget){var deltaLengthSq=this.center.distanceToSquared(point);var result=optionalTarget || new THREE.Vector3();result.copy(point);if(deltaLengthSq > this.radius * this.radius){result.sub(this.center).normalize();result.multiplyScalar(this.radius).add(this.center);}return result;},getBoundingBox:function getBoundingBox(optionalTarget){var box=optionalTarget || new THREE.Box3();box.set(this.center,this.center);box.expandByScalar(this.radius);return box;},applyMatrix4:function applyMatrix4(matrix){this.center.applyMatrix4(matrix);this.radius = this.radius * matrix.getMaxScaleOnAxis();return this;},translate:function translate(offset){this.center.add(offset);return this;},equals:function equals(sphere){return sphere.center.equals(this.center) && sphere.radius === this.radius;}}; // File:src/math/Frustum.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author bhouston / http://exocortex.com
	 */THREE.Frustum = function(p0,p1,p2,p3,p4,p5){this.planes = [p0 !== undefined?p0:new THREE.Plane(),p1 !== undefined?p1:new THREE.Plane(),p2 !== undefined?p2:new THREE.Plane(),p3 !== undefined?p3:new THREE.Plane(),p4 !== undefined?p4:new THREE.Plane(),p5 !== undefined?p5:new THREE.Plane()];};THREE.Frustum.prototype = {constructor:THREE.Frustum,set:function set(p0,p1,p2,p3,p4,p5){var planes=this.planes;planes[0].copy(p0);planes[1].copy(p1);planes[2].copy(p2);planes[3].copy(p3);planes[4].copy(p4);planes[5].copy(p5);return this;},clone:function clone(){return new this.constructor().copy(this);},copy:function copy(frustum){var planes=this.planes;for(var i=0;i < 6;i++) {planes[i].copy(frustum.planes[i]);}return this;},setFromMatrix:function setFromMatrix(m){var planes=this.planes;var me=m.elements;var me0=me[0],me1=me[1],me2=me[2],me3=me[3];var me4=me[4],me5=me[5],me6=me[6],me7=me[7];var me8=me[8],me9=me[9],me10=me[10],me11=me[11];var me12=me[12],me13=me[13],me14=me[14],me15=me[15];planes[0].setComponents(me3 - me0,me7 - me4,me11 - me8,me15 - me12).normalize();planes[1].setComponents(me3 + me0,me7 + me4,me11 + me8,me15 + me12).normalize();planes[2].setComponents(me3 + me1,me7 + me5,me11 + me9,me15 + me13).normalize();planes[3].setComponents(me3 - me1,me7 - me5,me11 - me9,me15 - me13).normalize();planes[4].setComponents(me3 - me2,me7 - me6,me11 - me10,me15 - me14).normalize();planes[5].setComponents(me3 + me2,me7 + me6,me11 + me10,me15 + me14).normalize();return this;},intersectsObject:(function(){var sphere=new THREE.Sphere();return function(object){var geometry=object.geometry;if(geometry.boundingSphere === null)geometry.computeBoundingSphere();sphere.copy(geometry.boundingSphere);sphere.applyMatrix4(object.matrixWorld);return this.intersectsSphere(sphere);};})(),intersectsSphere:function intersectsSphere(sphere){var planes=this.planes;var center=sphere.center;var negRadius=-sphere.radius;for(var i=0;i < 6;i++) {var distance=planes[i].distanceToPoint(center);if(distance < negRadius){return false;}}return true;},intersectsBox:(function(){var p1=new THREE.Vector3(),p2=new THREE.Vector3();return function(box){var planes=this.planes;for(var i=0;i < 6;i++) {var plane=planes[i];p1.x = plane.normal.x > 0?box.min.x:box.max.x;p2.x = plane.normal.x > 0?box.max.x:box.min.x;p1.y = plane.normal.y > 0?box.min.y:box.max.y;p2.y = plane.normal.y > 0?box.max.y:box.min.y;p1.z = plane.normal.z > 0?box.min.z:box.max.z;p2.z = plane.normal.z > 0?box.max.z:box.min.z;var d1=plane.distanceToPoint(p1);var d2=plane.distanceToPoint(p2); // if both outside plane, no intersection
	if(d1 < 0 && d2 < 0){return false;}}return true;};})(),containsPoint:function containsPoint(point){var planes=this.planes;for(var i=0;i < 6;i++) {if(planes[i].distanceToPoint(point) < 0){return false;}}return true;}}; // File:src/math/Plane.js
	/**
	 * @author bhouston / http://exocortex.com
	 */THREE.Plane = function(normal,constant){this.normal = normal !== undefined?normal:new THREE.Vector3(1,0,0);this.constant = constant !== undefined?constant:0;};THREE.Plane.prototype = {constructor:THREE.Plane,set:function set(normal,constant){this.normal.copy(normal);this.constant = constant;return this;},setComponents:function setComponents(x,y,z,w){this.normal.set(x,y,z);this.constant = w;return this;},setFromNormalAndCoplanarPoint:function setFromNormalAndCoplanarPoint(normal,point){this.normal.copy(normal);this.constant = -point.dot(this.normal); // must be this.normal, not normal, as this.normal is normalized
	return this;},setFromCoplanarPoints:(function(){var v1=new THREE.Vector3();var v2=new THREE.Vector3();return function(a,b,c){var normal=v1.subVectors(c,b).cross(v2.subVectors(a,b)).normalize(); // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
	this.setFromNormalAndCoplanarPoint(normal,a);return this;};})(),clone:function clone(){return new this.constructor().copy(this);},copy:function copy(plane){this.normal.copy(plane.normal);this.constant = plane.constant;return this;},normalize:function normalize(){ // Note: will lead to a divide by zero if the plane is invalid.
	var inverseNormalLength=1.0 / this.normal.length();this.normal.multiplyScalar(inverseNormalLength);this.constant *= inverseNormalLength;return this;},negate:function negate(){this.constant *= -1;this.normal.negate();return this;},distanceToPoint:function distanceToPoint(point){return this.normal.dot(point) + this.constant;},distanceToSphere:function distanceToSphere(sphere){return this.distanceToPoint(sphere.center) - sphere.radius;},projectPoint:function projectPoint(point,optionalTarget){return this.orthoPoint(point,optionalTarget).sub(point).negate();},orthoPoint:function orthoPoint(point,optionalTarget){var perpendicularMagnitude=this.distanceToPoint(point);var result=optionalTarget || new THREE.Vector3();return result.copy(this.normal).multiplyScalar(perpendicularMagnitude);},isIntersectionLine:function isIntersectionLine(line){ // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
	var startSign=this.distanceToPoint(line.start);var endSign=this.distanceToPoint(line.end);return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;},intersectLine:(function(){var v1=new THREE.Vector3();return function(line,optionalTarget){var result=optionalTarget || new THREE.Vector3();var direction=line.delta(v1);var denominator=this.normal.dot(direction);if(denominator === 0){ // line is coplanar, return origin
	if(this.distanceToPoint(line.start) === 0){return result.copy(line.start);} // Unsure if this is the correct method to handle this case.
	return undefined;}var t=-(line.start.dot(this.normal) + this.constant) / denominator;if(t < 0 || t > 1){return undefined;}return result.copy(direction).multiplyScalar(t).add(line.start);};})(),coplanarPoint:function coplanarPoint(optionalTarget){var result=optionalTarget || new THREE.Vector3();return result.copy(this.normal).multiplyScalar(-this.constant);},applyMatrix4:(function(){var v1=new THREE.Vector3();var v2=new THREE.Vector3();var m1=new THREE.Matrix3();return function(matrix,optionalNormalMatrix){ // compute new normal based on theory here:
	// http://www.songho.ca/opengl/gl_normaltransform.html
	var normalMatrix=optionalNormalMatrix || m1.getNormalMatrix(matrix);var newNormal=v1.copy(this.normal).applyMatrix3(normalMatrix);var newCoplanarPoint=this.coplanarPoint(v2);newCoplanarPoint.applyMatrix4(matrix);this.setFromNormalAndCoplanarPoint(newNormal,newCoplanarPoint);return this;};})(),translate:function translate(offset){this.constant = this.constant - offset.dot(this.normal);return this;},equals:function equals(plane){return plane.normal.equals(this.normal) && plane.constant === this.constant;}}; // File:src/math/Math.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Math = {generateUUID:(function(){ // http://www.broofa.com/Tools/Math.uuid.htm
	var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=new Array(36);var rnd=0,r;return function(){for(var i=0;i < 36;i++) {if(i === 8 || i === 13 || i === 18 || i === 23){uuid[i] = '-';}else if(i === 14){uuid[i] = '4';}else {if(rnd <= 0x02)rnd = 0x2000000 + Math.random() * 0x1000000 | 0;r = rnd & 0xf;rnd = rnd >> 4;uuid[i] = chars[i === 19?r & 0x3 | 0x8:r];}}return uuid.join('');};})(), // Clamp value to range <a, b>
	clamp:function clamp(x,a,b){return x < a?a:x > b?b:x;}, // Clamp value to range <a, inf)
	clampBottom:function clampBottom(x,a){return x < a?a:x;}, // compute euclidian modulo of m % n
	// https://en.wikipedia.org/wiki/Modulo_operation
	euclideanModulo:function euclideanModulo(n,m){return (n % m + m) % m;}, // Linear mapping from range <a1, a2> to range <b1, b2>
	mapLinear:function mapLinear(x,a1,a2,b1,b2){return b1 + (x - a1) * (b2 - b1) / (a2 - a1);}, // http://en.wikipedia.org/wiki/Smoothstep
	smoothstep:function smoothstep(x,min,max){if(x <= min)return 0;if(x >= max)return 1;x = (x - min) / (max - min);return x * x * (3 - 2 * x);},smootherstep:function smootherstep(x,min,max){if(x <= min)return 0;if(x >= max)return 1;x = (x - min) / (max - min);return x * x * x * (x * (x * 6 - 15) + 10);}, // Random float from <0, 1> with 16 bits of randomness
	// (standard Math.random() creates repetitive patterns when applied over larger space)
	random16:function random16(){return (65280 * Math.random() + 255 * Math.random()) / 65535;}, // Random integer from <low, high> interval
	randInt:function randInt(low,high){return low + Math.floor(Math.random() * (high - low + 1));}, // Random float from <low, high> interval
	randFloat:function randFloat(low,high){return low + Math.random() * (high - low);}, // Random float from <-range/2, range/2> interval
	randFloatSpread:function randFloatSpread(range){return range * (0.5 - Math.random());},degToRad:(function(){var degreeToRadiansFactor=Math.PI / 180;return function(degrees){return degrees * degreeToRadiansFactor;};})(),radToDeg:(function(){var radianToDegreesFactor=180 / Math.PI;return function(radians){return radians * radianToDegreesFactor;};})(),isPowerOfTwo:function isPowerOfTwo(value){return (value & value - 1) === 0 && value !== 0;},nextPowerOfTwo:function nextPowerOfTwo(value){value--;value |= value >> 1;value |= value >> 2;value |= value >> 4;value |= value >> 8;value |= value >> 16;value++;return value;}}; // File:src/math/Spline.js
	/**
	 * Spline from Tween.js, slightly optimized (and trashed)
	 * http://sole.github.com/tween.js/examples/05_spline.html
	 *
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Spline = function(points){this.points = points;var c=[],v3={x:0,y:0,z:0},point,intPoint,weight,w2,w3,pa,pb,pc,pd;this.initFromArray = function(a){this.points = [];for(var i=0;i < a.length;i++) {this.points[i] = {x:a[i][0],y:a[i][1],z:a[i][2]};}};this.getPoint = function(k){point = (this.points.length - 1) * k;intPoint = Math.floor(point);weight = point - intPoint;c[0] = intPoint === 0?intPoint:intPoint - 1;c[1] = intPoint;c[2] = intPoint > this.points.length - 2?this.points.length - 1:intPoint + 1;c[3] = intPoint > this.points.length - 3?this.points.length - 1:intPoint + 2;pa = this.points[c[0]];pb = this.points[c[1]];pc = this.points[c[2]];pd = this.points[c[3]];w2 = weight * weight;w3 = weight * w2;v3.x = interpolate(pa.x,pb.x,pc.x,pd.x,weight,w2,w3);v3.y = interpolate(pa.y,pb.y,pc.y,pd.y,weight,w2,w3);v3.z = interpolate(pa.z,pb.z,pc.z,pd.z,weight,w2,w3);return v3;};this.getControlPointsArray = function(){var i,p,l=this.points.length,coords=[];for(i = 0;i < l;i++) {p = this.points[i];coords[i] = [p.x,p.y,p.z];}return coords;}; // approximate length by summing linear segments
	this.getLength = function(nSubDivisions){var i,index,nSamples,position,point=0,intPoint=0,oldIntPoint=0,oldPosition=new THREE.Vector3(),tmpVec=new THREE.Vector3(),chunkLengths=[],totalLength=0; // first point has 0 length
	chunkLengths[0] = 0;if(!nSubDivisions)nSubDivisions = 100;nSamples = this.points.length * nSubDivisions;oldPosition.copy(this.points[0]);for(i = 1;i < nSamples;i++) {index = i / nSamples;position = this.getPoint(index);tmpVec.copy(position);totalLength += tmpVec.distanceTo(oldPosition);oldPosition.copy(position);point = (this.points.length - 1) * index;intPoint = Math.floor(point);if(intPoint !== oldIntPoint){chunkLengths[intPoint] = totalLength;oldIntPoint = intPoint;}} // last point ends with total length
	chunkLengths[chunkLengths.length] = totalLength;return {chunks:chunkLengths,total:totalLength};};this.reparametrizeByArcLength = function(samplingCoef){var i,j,index,indexCurrent,indexNext,realDistance,sampling,position,newpoints=[],tmpVec=new THREE.Vector3(),sl=this.getLength();newpoints.push(tmpVec.copy(this.points[0]).clone());for(i = 1;i < this.points.length;i++) { //tmpVec.copy( this.points[ i - 1 ] );
	//linearDistance = tmpVec.distanceTo( this.points[ i ] );
	realDistance = sl.chunks[i] - sl.chunks[i - 1];sampling = Math.ceil(samplingCoef * realDistance / sl.total);indexCurrent = (i - 1) / (this.points.length - 1);indexNext = i / (this.points.length - 1);for(j = 1;j < sampling - 1;j++) {index = indexCurrent + j * (1 / sampling) * (indexNext - indexCurrent);position = this.getPoint(index);newpoints.push(tmpVec.copy(position).clone());}newpoints.push(tmpVec.copy(this.points[i]).clone());}this.points = newpoints;}; // Catmull-Rom
	function interpolate(p0,p1,p2,p3,t,t2,t3){var v0=(p2 - p0) * 0.5,v1=(p3 - p1) * 0.5;return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;}}; // File:src/math/Triangle.js
	/**
	 * @author bhouston / http://exocortex.com
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Triangle = function(a,b,c){this.a = a !== undefined?a:new THREE.Vector3();this.b = b !== undefined?b:new THREE.Vector3();this.c = c !== undefined?c:new THREE.Vector3();};THREE.Triangle.normal = (function(){var v0=new THREE.Vector3();return function(a,b,c,optionalTarget){var result=optionalTarget || new THREE.Vector3();result.subVectors(c,b);v0.subVectors(a,b);result.cross(v0);var resultLengthSq=result.lengthSq();if(resultLengthSq > 0){return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));}return result.set(0,0,0);};})(); // static/instance method to calculate barycentric coordinates
	// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
	THREE.Triangle.barycoordFromPoint = (function(){var v0=new THREE.Vector3();var v1=new THREE.Vector3();var v2=new THREE.Vector3();return function(point,a,b,c,optionalTarget){v0.subVectors(c,a);v1.subVectors(b,a);v2.subVectors(point,a);var dot00=v0.dot(v0);var dot01=v0.dot(v1);var dot02=v0.dot(v2);var dot11=v1.dot(v1);var dot12=v1.dot(v2);var denom=dot00 * dot11 - dot01 * dot01;var result=optionalTarget || new THREE.Vector3(); // collinear or singular triangle
	if(denom === 0){ // arbitrary location outside of triangle?
	// not sure if this is the best idea, maybe should be returning undefined
	return result.set(-2,-1,-1);}var invDenom=1 / denom;var u=(dot11 * dot02 - dot01 * dot12) * invDenom;var v=(dot00 * dot12 - dot01 * dot02) * invDenom; // barycentric coordinates must always sum to 1
	return result.set(1 - u - v,v,u);};})();THREE.Triangle.containsPoint = (function(){var v1=new THREE.Vector3();return function(point,a,b,c){var result=THREE.Triangle.barycoordFromPoint(point,a,b,c,v1);return result.x >= 0 && result.y >= 0 && result.x + result.y <= 1;};})();THREE.Triangle.prototype = {constructor:THREE.Triangle,set:function set(a,b,c){this.a.copy(a);this.b.copy(b);this.c.copy(c);return this;},setFromPointsAndIndices:function setFromPointsAndIndices(points,i0,i1,i2){this.a.copy(points[i0]);this.b.copy(points[i1]);this.c.copy(points[i2]);return this;},clone:function clone(){return new this.constructor().copy(this);},copy:function copy(triangle){this.a.copy(triangle.a);this.b.copy(triangle.b);this.c.copy(triangle.c);return this;},area:(function(){var v0=new THREE.Vector3();var v1=new THREE.Vector3();return function(){v0.subVectors(this.c,this.b);v1.subVectors(this.a,this.b);return v0.cross(v1).length() * 0.5;};})(),midpoint:function midpoint(optionalTarget){var result=optionalTarget || new THREE.Vector3();return result.addVectors(this.a,this.b).add(this.c).multiplyScalar(1 / 3);},normal:function normal(optionalTarget){return THREE.Triangle.normal(this.a,this.b,this.c,optionalTarget);},plane:function plane(optionalTarget){var result=optionalTarget || new THREE.Plane();return result.setFromCoplanarPoints(this.a,this.b,this.c);},barycoordFromPoint:function barycoordFromPoint(point,optionalTarget){return THREE.Triangle.barycoordFromPoint(point,this.a,this.b,this.c,optionalTarget);},containsPoint:function containsPoint(point){return THREE.Triangle.containsPoint(point,this.a,this.b,this.c);},equals:function equals(triangle){return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);}}; // File:src/core/Clock.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Clock = function(autoStart){this.autoStart = autoStart !== undefined?autoStart:true;this.startTime = 0;this.oldTime = 0;this.elapsedTime = 0;this.running = false;};THREE.Clock.prototype = {constructor:THREE.Clock,start:function start(){this.startTime = self.performance !== undefined && self.performance.now !== undefined?self.performance.now():Date.now();this.oldTime = this.startTime;this.running = true;},stop:function stop(){this.getElapsedTime();this.running = false;},getElapsedTime:function getElapsedTime(){this.getDelta();return this.elapsedTime;},getDelta:function getDelta(){var diff=0;if(this.autoStart && !this.running){this.start();}if(this.running){var newTime=self.performance !== undefined && self.performance.now !== undefined?self.performance.now():Date.now();diff = 0.001 * (newTime - this.oldTime);this.oldTime = newTime;this.elapsedTime += diff;}return diff;}}; // File:src/core/EventDispatcher.js
	/**
	 * https://github.com/mrdoob/eventdispatcher.js/
	 */THREE.EventDispatcher = function(){};THREE.EventDispatcher.prototype = {constructor:THREE.EventDispatcher,apply:function apply(object){object.addEventListener = THREE.EventDispatcher.prototype.addEventListener;object.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;object.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;object.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent;},addEventListener:function addEventListener(type,listener){if(this._listeners === undefined)this._listeners = {};var listeners=this._listeners;if(listeners[type] === undefined){listeners[type] = [];}if(listeners[type].indexOf(listener) === -1){listeners[type].push(listener);}},hasEventListener:function hasEventListener(type,listener){if(this._listeners === undefined)return false;var listeners=this._listeners;if(listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1){return true;}return false;},removeEventListener:function removeEventListener(type,listener){if(this._listeners === undefined)return;var listeners=this._listeners;var listenerArray=listeners[type];if(listenerArray !== undefined){var index=listenerArray.indexOf(listener);if(index !== -1){listenerArray.splice(index,1);}}},dispatchEvent:function dispatchEvent(event){if(this._listeners === undefined)return;var listeners=this._listeners;var listenerArray=listeners[event.type];if(listenerArray !== undefined){event.target = this;var array=[];var length=listenerArray.length;for(var i=0;i < length;i++) {array[i] = listenerArray[i];}for(var i=0;i < length;i++) {array[i].call(this,event);}}}}; // File:src/core/Raycaster.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author bhouston / http://exocortex.com/
	 * @author stephomi / http://stephaneginier.com/
	 */(function(THREE){THREE.Raycaster = function(origin,direction,near,far){this.ray = new THREE.Ray(origin,direction); // direction is assumed to be normalized (for accurate distance calculations)
	this.near = near || 0;this.far = far || Infinity;this.params = {Mesh:{},Line:{},LOD:{},Points:{threshold:1},Sprite:{}};Object.defineProperties(this.params,{PointCloud:{get:function get(){console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.');return this.Points;}}});};function descSort(a,b){return a.distance - b.distance;}var _intersectObject=function _intersectObject(object,raycaster,intersects,recursive){if(object.visible === false)return;object.raycast(raycaster,intersects);if(recursive === true){var children=object.children;for(var i=0,l=children.length;i < l;i++) {_intersectObject(children[i],raycaster,intersects,true);}}}; //
	THREE.Raycaster.prototype = {constructor:THREE.Raycaster,linePrecision:1,set:function set(origin,direction){ // direction is assumed to be normalized (for accurate distance calculations)
	this.ray.set(origin,direction);},setFromCamera:function setFromCamera(coords,camera){if(camera instanceof THREE.PerspectiveCamera){this.ray.origin.setFromMatrixPosition(camera.matrixWorld);this.ray.direction.set(coords.x,coords.y,0.5).unproject(camera).sub(this.ray.origin).normalize();}else if(camera instanceof THREE.OrthographicCamera){this.ray.origin.set(coords.x,coords.y,-1).unproject(camera);this.ray.direction.set(0,0,-1).transformDirection(camera.matrixWorld);}else {console.error('THREE.Raycaster: Unsupported camera type.');}},intersectObject:function intersectObject(object,recursive){var intersects=[];_intersectObject(object,this,intersects,recursive);intersects.sort(descSort);return intersects;},intersectObjects:function intersectObjects(objects,recursive){var intersects=[];if(Array.isArray(objects) === false){console.warn('THREE.Raycaster.intersectObjects: objects is not an Array.');return intersects;}for(var i=0,l=objects.length;i < l;i++) {_intersectObject(objects[i],this,intersects,recursive);}intersects.sort(descSort);return intersects;}};})(THREE); // File:src/core/Object3D.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author elephantatwork / www.elephantatwork.ch
	 */THREE.Object3D = function(){Object.defineProperty(this,'id',{value:THREE.Object3DIdCount++});this.uuid = THREE.Math.generateUUID();this.name = '';this.type = 'Object3D';this.parent = null;this.children = [];this.up = THREE.Object3D.DefaultUp.clone();var position=new THREE.Vector3();var rotation=new THREE.Euler();var quaternion=new THREE.Quaternion();var scale=new THREE.Vector3(1,1,1);var onRotationChange=function onRotationChange(){quaternion.setFromEuler(rotation,false);};var onQuaternionChange=function onQuaternionChange(){rotation.setFromQuaternion(quaternion,undefined,false);};rotation.onChange(onRotationChange);quaternion.onChange(onQuaternionChange);Object.defineProperties(this,{position:{enumerable:true,value:position},rotation:{enumerable:true,value:rotation},quaternion:{enumerable:true,value:quaternion},scale:{enumerable:true,value:scale},modelViewMatrix:{value:new THREE.Matrix4()},normalMatrix:{value:new THREE.Matrix3()}});this.rotationAutoUpdate = true;this.matrix = new THREE.Matrix4();this.matrixWorld = new THREE.Matrix4();this.matrixAutoUpdate = THREE.Object3D.DefaultMatrixAutoUpdate;this.matrixWorldNeedsUpdate = false;this.visible = true;this.castShadow = false;this.receiveShadow = false;this.frustumCulled = true;this.renderOrder = 0;this.userData = {};};THREE.Object3D.DefaultUp = new THREE.Vector3(0,1,0);THREE.Object3D.DefaultMatrixAutoUpdate = true;THREE.Object3D.prototype = Object.defineProperties({constructor:THREE.Object3D,applyMatrix:function applyMatrix(matrix){this.matrix.multiplyMatrices(matrix,this.matrix);this.matrix.decompose(this.position,this.quaternion,this.scale);},setRotationFromAxisAngle:function setRotationFromAxisAngle(axis,angle){ // assumes axis is normalized
	this.quaternion.setFromAxisAngle(axis,angle);},setRotationFromEuler:function setRotationFromEuler(euler){this.quaternion.setFromEuler(euler,true);},setRotationFromMatrix:function setRotationFromMatrix(m){ // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
	this.quaternion.setFromRotationMatrix(m);},setRotationFromQuaternion:function setRotationFromQuaternion(q){ // assumes q is normalized
	this.quaternion.copy(q);},rotateOnAxis:(function(){ // rotate object on axis in object space
	// axis is assumed to be normalized
	var q1=new THREE.Quaternion();return function(axis,angle){q1.setFromAxisAngle(axis,angle);this.quaternion.multiply(q1);return this;};})(),rotateX:(function(){var v1=new THREE.Vector3(1,0,0);return function(angle){return this.rotateOnAxis(v1,angle);};})(),rotateY:(function(){var v1=new THREE.Vector3(0,1,0);return function(angle){return this.rotateOnAxis(v1,angle);};})(),rotateZ:(function(){var v1=new THREE.Vector3(0,0,1);return function(angle){return this.rotateOnAxis(v1,angle);};})(),translateOnAxis:(function(){ // translate object by distance along axis in object space
	// axis is assumed to be normalized
	var v1=new THREE.Vector3();return function(axis,distance){v1.copy(axis).applyQuaternion(this.quaternion);this.position.add(v1.multiplyScalar(distance));return this;};})(),translate:function translate(distance,axis){console.warn('THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.');return this.translateOnAxis(axis,distance);},translateX:(function(){var v1=new THREE.Vector3(1,0,0);return function(distance){return this.translateOnAxis(v1,distance);};})(),translateY:(function(){var v1=new THREE.Vector3(0,1,0);return function(distance){return this.translateOnAxis(v1,distance);};})(),translateZ:(function(){var v1=new THREE.Vector3(0,0,1);return function(distance){return this.translateOnAxis(v1,distance);};})(),localToWorld:function localToWorld(vector){return vector.applyMatrix4(this.matrixWorld);},worldToLocal:(function(){var m1=new THREE.Matrix4();return function(vector){return vector.applyMatrix4(m1.getInverse(this.matrixWorld));};})(),lookAt:(function(){ // This routine does not support objects with rotated and/or translated parent(s)
	var m1=new THREE.Matrix4();return function(vector){m1.lookAt(vector,this.position,this.up);this.quaternion.setFromRotationMatrix(m1);};})(),add:function add(object){if(arguments.length > 1){for(var i=0;i < arguments.length;i++) {this.add(arguments[i]);}return this;}if(object === this){console.error("THREE.Object3D.add: object can't be added as a child of itself.",object);return this;}if(object instanceof THREE.Object3D){if(object.parent !== null){object.parent.remove(object);}object.parent = this;object.dispatchEvent({type:'added'});this.children.push(object);}else {console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",object);}return this;},remove:function remove(object){if(arguments.length > 1){for(var i=0;i < arguments.length;i++) {this.remove(arguments[i]);}}var index=this.children.indexOf(object);if(index !== -1){object.parent = null;object.dispatchEvent({type:'removed'});this.children.splice(index,1);}},getChildByName:function getChildByName(name){console.warn('THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().');return this.getObjectByName(name);},getObjectById:function getObjectById(id){return this.getObjectByProperty('id',id);},getObjectByName:function getObjectByName(name){return this.getObjectByProperty('name',name);},getObjectByProperty:function getObjectByProperty(name,value){if(this[name] === value)return this;for(var i=0,l=this.children.length;i < l;i++) {var child=this.children[i];var object=child.getObjectByProperty(name,value);if(object !== undefined){return object;}}return undefined;},getWorldPosition:function getWorldPosition(optionalTarget){var result=optionalTarget || new THREE.Vector3();this.updateMatrixWorld(true);return result.setFromMatrixPosition(this.matrixWorld);},getWorldQuaternion:(function(){var position=new THREE.Vector3();var scale=new THREE.Vector3();return function(optionalTarget){var result=optionalTarget || new THREE.Quaternion();this.updateMatrixWorld(true);this.matrixWorld.decompose(position,result,scale);return result;};})(),getWorldRotation:(function(){var quaternion=new THREE.Quaternion();return function(optionalTarget){var result=optionalTarget || new THREE.Euler();this.getWorldQuaternion(quaternion);return result.setFromQuaternion(quaternion,this.rotation.order,false);};})(),getWorldScale:(function(){var position=new THREE.Vector3();var quaternion=new THREE.Quaternion();return function(optionalTarget){var result=optionalTarget || new THREE.Vector3();this.updateMatrixWorld(true);this.matrixWorld.decompose(position,quaternion,result);return result;};})(),getWorldDirection:(function(){var quaternion=new THREE.Quaternion();return function(optionalTarget){var result=optionalTarget || new THREE.Vector3();this.getWorldQuaternion(quaternion);return result.set(0,0,1).applyQuaternion(quaternion);};})(),raycast:function raycast(){},traverse:function traverse(callback){callback(this);var children=this.children;for(var i=0,l=children.length;i < l;i++) {children[i].traverse(callback);}},traverseVisible:function traverseVisible(callback){if(this.visible === false)return;callback(this);var children=this.children;for(var i=0,l=children.length;i < l;i++) {children[i].traverseVisible(callback);}},traverseAncestors:function traverseAncestors(callback){var parent=this.parent;if(parent !== null){callback(parent);parent.traverseAncestors(callback);}},updateMatrix:function updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);this.matrixWorldNeedsUpdate = true;},updateMatrixWorld:function updateMatrixWorld(force){if(this.matrixAutoUpdate === true)this.updateMatrix();if(this.matrixWorldNeedsUpdate === true || force === true){if(this.parent === null){this.matrixWorld.copy(this.matrix);}else {this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);}this.matrixWorldNeedsUpdate = false;force = true;} // update children
	for(var i=0,l=this.children.length;i < l;i++) {this.children[i].updateMatrixWorld(force);}},toJSON:function toJSON(meta){var isRootObject=meta === undefined;var data={}; // meta is a hash used to collect geometries, materials.
	// not providing it implies that this is the root object
	// being serialized.
	if(isRootObject){ // initialize meta obj
	meta = {geometries:{},materials:{},textures:{},images:{}};data.metadata = {version:4.4,type:'Object',generator:'Object3D.toJSON'};} // standard Object3D serialization
	data.uuid = this.uuid;data.type = this.type;if(this.name !== '')data.name = this.name;if(JSON.stringify(this.userData) !== '{}')data.userData = this.userData;if(this.visible !== true)data.visible = this.visible;data.matrix = this.matrix.toArray();if(this.children.length > 0){data.children = [];for(var i=0;i < this.children.length;i++) {data.children.push(this.children[i].toJSON(meta).object);}}var output={};if(isRootObject){var geometries=extractFromCache(meta.geometries);var materials=extractFromCache(meta.materials);var textures=extractFromCache(meta.textures);var images=extractFromCache(meta.images);if(geometries.length > 0)output.geometries = geometries;if(materials.length > 0)output.materials = materials;if(textures.length > 0)output.textures = textures;if(images.length > 0)output.images = images;}output.object = data;return output; // extract data from the cache hash
	// remove metadata on each item
	// and return as array
	function extractFromCache(cache){var values=[];for(var key in cache) {var data=cache[key];delete data.metadata;values.push(data);}return values;}},clone:function clone(recursive){return new this.constructor().copy(this,recursive);},copy:function copy(source,recursive){if(recursive === undefined)recursive = true;this.name = source.name;this.up.copy(source.up);this.position.copy(source.position);this.quaternion.copy(source.quaternion);this.scale.copy(source.scale);this.rotationAutoUpdate = source.rotationAutoUpdate;this.matrix.copy(source.matrix);this.matrixWorld.copy(source.matrixWorld);this.matrixAutoUpdate = source.matrixAutoUpdate;this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;this.visible = source.visible;this.castShadow = source.castShadow;this.receiveShadow = source.receiveShadow;this.frustumCulled = source.frustumCulled;this.renderOrder = source.renderOrder;this.userData = JSON.parse(JSON.stringify(source.userData));if(recursive === true){for(var i=0;i < source.children.length;i++) {var child=source.children[i];this.add(child.clone());}}return this;}},{eulerOrder:{get:function get(){console.warn('THREE.Object3D: .eulerOrder has been moved to .rotation.order.');return this.rotation.order;},set:function set(value){console.warn('THREE.Object3D: .eulerOrder has been moved to .rotation.order.');this.rotation.order = value;},configurable:true,enumerable:true},useQuaternion:{get:function get(){console.warn('THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.');},set:function set(value){console.warn('THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.');},configurable:true,enumerable:true},renderDepth:{set:function set(value){console.warn('THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.');},configurable:true,enumerable:true}});THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype);THREE.Object3DIdCount = 0; // File:src/core/Face3.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Face3 = function(a,b,c,normal,color,materialIndex){this.a = a;this.b = b;this.c = c;this.normal = normal instanceof THREE.Vector3?normal:new THREE.Vector3();this.vertexNormals = Array.isArray(normal)?normal:[];this.color = color instanceof THREE.Color?color:new THREE.Color();this.vertexColors = Array.isArray(color)?color:[];this.materialIndex = materialIndex !== undefined?materialIndex:0;};THREE.Face3.prototype = {constructor:THREE.Face3,clone:function clone(){return new this.constructor().copy(this);},copy:function copy(source){this.a = source.a;this.b = source.b;this.c = source.c;this.normal.copy(source.normal);this.color.copy(source.color);this.materialIndex = source.materialIndex;for(var i=0,il=source.vertexNormals.length;i < il;i++) {this.vertexNormals[i] = source.vertexNormals[i].clone();}for(var i=0,il=source.vertexColors.length;i < il;i++) {this.vertexColors[i] = source.vertexColors[i].clone();}return this;}}; // File:src/core/Face4.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Face4 = function(a,b,c,d,normal,color,materialIndex){console.warn('THREE.Face4 has been removed. A THREE.Face3 will be created instead.');return new THREE.Face3(a,b,c,normal,color,materialIndex);}; // File:src/core/BufferAttribute.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.BufferAttribute = function(array,itemSize){this.uuid = THREE.Math.generateUUID();this.array = array;this.itemSize = itemSize;this.dynamic = false;this.updateRange = {offset:0,count:-1};this.version = 0;};THREE.BufferAttribute.prototype = Object.defineProperties({constructor:THREE.BufferAttribute,setDynamic:function setDynamic(value){this.dynamic = value;return this;},copy:function copy(source){this.array = new source.array.constructor(source.array);this.itemSize = source.itemSize;this.dynamic = source.dynamic;return this;},copyAt:function copyAt(index1,attribute,index2){index1 *= this.itemSize;index2 *= attribute.itemSize;for(var i=0,l=this.itemSize;i < l;i++) {this.array[index1 + i] = attribute.array[index2 + i];}return this;},copyArray:function copyArray(array){this.array.set(array);return this;},copyColorsArray:function copyColorsArray(colors){var array=this.array,offset=0;for(var i=0,l=colors.length;i < l;i++) {var color=colors[i];if(color === undefined){console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined',i);color = new THREE.Color();}array[offset++] = color.r;array[offset++] = color.g;array[offset++] = color.b;}return this;},copyIndicesArray:function copyIndicesArray(indices){var array=this.array,offset=0;for(var i=0,l=indices.length;i < l;i++) {var index=indices[i];array[offset++] = index.a;array[offset++] = index.b;array[offset++] = index.c;}return this;},copyVector2sArray:function copyVector2sArray(vectors){var array=this.array,offset=0;for(var i=0,l=vectors.length;i < l;i++) {var vector=vectors[i];if(vector === undefined){console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined',i);vector = new THREE.Vector2();}array[offset++] = vector.x;array[offset++] = vector.y;}return this;},copyVector3sArray:function copyVector3sArray(vectors){var array=this.array,offset=0;for(var i=0,l=vectors.length;i < l;i++) {var vector=vectors[i];if(vector === undefined){console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined',i);vector = new THREE.Vector3();}array[offset++] = vector.x;array[offset++] = vector.y;array[offset++] = vector.z;}return this;},copyVector4sArray:function copyVector4sArray(vectors){var array=this.array,offset=0;for(var i=0,l=vectors.length;i < l;i++) {var vector=vectors[i];if(vector === undefined){console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined',i);vector = new THREE.Vector4();}array[offset++] = vector.x;array[offset++] = vector.y;array[offset++] = vector.z;array[offset++] = vector.w;}return this;},set:function set(value,offset){if(offset === undefined)offset = 0;this.array.set(value,offset);return this;},getX:function getX(index){return this.array[index * this.itemSize];},setX:function setX(index,x){this.array[index * this.itemSize] = x;return this;},getY:function getY(index){return this.array[index * this.itemSize + 1];},setY:function setY(index,y){this.array[index * this.itemSize + 1] = y;return this;},getZ:function getZ(index){return this.array[index * this.itemSize + 2];},setZ:function setZ(index,z){this.array[index * this.itemSize + 2] = z;return this;},getW:function getW(index){return this.array[index * this.itemSize + 3];},setW:function setW(index,w){this.array[index * this.itemSize + 3] = w;return this;},setXY:function setXY(index,x,y){index *= this.itemSize;this.array[index + 0] = x;this.array[index + 1] = y;return this;},setXYZ:function setXYZ(index,x,y,z){index *= this.itemSize;this.array[index + 0] = x;this.array[index + 1] = y;this.array[index + 2] = z;return this;},setXYZW:function setXYZW(index,x,y,z,w){index *= this.itemSize;this.array[index + 0] = x;this.array[index + 1] = y;this.array[index + 2] = z;this.array[index + 3] = w;return this;},clone:function clone(){return new this.constructor().copy(this);}},{length:{get:function get(){console.warn('THREE.BufferAttribute: .length has been deprecated. Please use .count.');return this.array.length;},configurable:true,enumerable:true},count:{get:function get(){return this.array.length / this.itemSize;},configurable:true,enumerable:true},needsUpdate:{set:function set(value){if(value === true)this.version++;},configurable:true,enumerable:true}}); //
	THREE.Int8Attribute = function(array,itemSize){return new THREE.BufferAttribute(new Int8Array(array),itemSize);};THREE.Uint8Attribute = function(array,itemSize){return new THREE.BufferAttribute(new Uint8Array(array),itemSize);};THREE.Uint8ClampedAttribute = function(array,itemSize){return new THREE.BufferAttribute(new Uint8ClampedArray(array),itemSize);};THREE.Int16Attribute = function(array,itemSize){return new THREE.BufferAttribute(new Int16Array(array),itemSize);};THREE.Uint16Attribute = function(array,itemSize){return new THREE.BufferAttribute(new Uint16Array(array),itemSize);};THREE.Int32Attribute = function(array,itemSize){return new THREE.BufferAttribute(new Int32Array(array),itemSize);};THREE.Uint32Attribute = function(array,itemSize){return new THREE.BufferAttribute(new Uint32Array(array),itemSize);};THREE.Float32Attribute = function(array,itemSize){return new THREE.BufferAttribute(new Float32Array(array),itemSize);};THREE.Float64Attribute = function(array,itemSize){return new THREE.BufferAttribute(new Float64Array(array),itemSize);}; // Deprecated
	THREE.DynamicBufferAttribute = function(array,itemSize){console.warn('THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.');return new THREE.BufferAttribute(array,itemSize).setDynamic(true);}; // File:src/core/InstancedBufferAttribute.js
	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 */THREE.InstancedBufferAttribute = function(array,itemSize,meshPerAttribute){THREE.BufferAttribute.call(this,array,itemSize);this.meshPerAttribute = meshPerAttribute || 1;};THREE.InstancedBufferAttribute.prototype = Object.create(THREE.BufferAttribute.prototype);THREE.InstancedBufferAttribute.prototype.constructor = THREE.InstancedBufferAttribute;THREE.InstancedBufferAttribute.prototype.copy = function(source){THREE.BufferAttribute.prototype.copy.call(this,source);this.meshPerAttribute = source.meshPerAttribute;return this;}; // File:src/core/InterleavedBuffer.js
	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 */THREE.InterleavedBuffer = function(array,stride){this.uuid = THREE.Math.generateUUID();this.array = array;this.stride = stride;this.dynamic = false;this.updateRange = {offset:0,count:-1};this.version = 0;};THREE.InterleavedBuffer.prototype = Object.defineProperties({constructor:THREE.InterleavedBuffer,setDynamic:function setDynamic(value){this.dynamic = value;return this;},copy:function copy(source){this.array = new source.array.constructor(source.array);this.stride = source.stride;this.dynamic = source.dynamic;},copyAt:function copyAt(index1,attribute,index2){index1 *= this.stride;index2 *= attribute.stride;for(var i=0,l=this.stride;i < l;i++) {this.array[index1 + i] = attribute.array[index2 + i];}return this;},set:function set(value,offset){if(offset === undefined)offset = 0;this.array.set(value,offset);return this;},clone:function clone(){return new this.constructor().copy(this);}},{length:{get:function get(){return this.array.length;},configurable:true,enumerable:true},count:{get:function get(){return this.array.length / this.stride;},configurable:true,enumerable:true},needsUpdate:{set:function set(value){if(value === true)this.version++;},configurable:true,enumerable:true}}); // File:src/core/InstancedInterleavedBuffer.js
	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 */THREE.InstancedInterleavedBuffer = function(array,stride,meshPerAttribute){THREE.InterleavedBuffer.call(this,array,stride);this.meshPerAttribute = meshPerAttribute || 1;};THREE.InstancedInterleavedBuffer.prototype = Object.create(THREE.InterleavedBuffer.prototype);THREE.InstancedInterleavedBuffer.prototype.constructor = THREE.InstancedInterleavedBuffer;THREE.InstancedInterleavedBuffer.prototype.copy = function(source){THREE.InterleavedBuffer.prototype.copy.call(this,source);this.meshPerAttribute = source.meshPerAttribute;return this;}; // File:src/core/InterleavedBufferAttribute.js
	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 */THREE.InterleavedBufferAttribute = function(interleavedBuffer,itemSize,offset){this.uuid = THREE.Math.generateUUID();this.data = interleavedBuffer;this.itemSize = itemSize;this.offset = offset;};THREE.InterleavedBufferAttribute.prototype = Object.defineProperties({constructor:THREE.InterleavedBufferAttribute,setX:function setX(index,x){this.data.array[index * this.data.stride + this.offset] = x;return this;},setY:function setY(index,y){this.data.array[index * this.data.stride + this.offset + 1] = y;return this;},setZ:function setZ(index,z){this.data.array[index * this.data.stride + this.offset + 2] = z;return this;},setW:function setW(index,w){this.data.array[index * this.data.stride + this.offset + 3] = w;return this;},getX:function getX(index){return this.data.array[index * this.data.stride + this.offset];},getY:function getY(index){return this.data.array[index * this.data.stride + this.offset + 1];},getZ:function getZ(index){return this.data.array[index * this.data.stride + this.offset + 2];},getW:function getW(index){return this.data.array[index * this.data.stride + this.offset + 3];},setXY:function setXY(index,x,y){index = index * this.data.stride + this.offset;this.data.array[index + 0] = x;this.data.array[index + 1] = y;return this;},setXYZ:function setXYZ(index,x,y,z){index = index * this.data.stride + this.offset;this.data.array[index + 0] = x;this.data.array[index + 1] = y;this.data.array[index + 2] = z;return this;},setXYZW:function setXYZW(index,x,y,z,w){index = index * this.data.stride + this.offset;this.data.array[index + 0] = x;this.data.array[index + 1] = y;this.data.array[index + 2] = z;this.data.array[index + 3] = w;return this;}},{length:{get:function get(){console.warn('THREE.BufferAttribute: .length has been deprecated. Please use .count.');return this.array.length;},configurable:true,enumerable:true},count:{get:function get(){return this.data.array.length / this.data.stride;},configurable:true,enumerable:true}}); // File:src/core/Geometry.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author kile / http://kile.stravaganza.org/
	 * @author alteredq / http://alteredqualia.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * @author bhouston / http://exocortex.com
	 */THREE.Geometry = function(){Object.defineProperty(this,'id',{value:THREE.GeometryIdCount++});this.uuid = THREE.Math.generateUUID();this.name = '';this.type = 'Geometry';this.vertices = [];this.colors = [];this.faces = [];this.faceVertexUvs = [[]];this.morphTargets = [];this.morphColors = [];this.morphNormals = [];this.skinWeights = [];this.skinIndices = [];this.lineDistances = [];this.boundingBox = null;this.boundingSphere = null; // update flags
	this.verticesNeedUpdate = false;this.elementsNeedUpdate = false;this.uvsNeedUpdate = false;this.normalsNeedUpdate = false;this.colorsNeedUpdate = false;this.lineDistancesNeedUpdate = false;this.groupsNeedUpdate = false;};THREE.Geometry.prototype = {constructor:THREE.Geometry,applyMatrix:function applyMatrix(matrix){var normalMatrix=new THREE.Matrix3().getNormalMatrix(matrix);for(var i=0,il=this.vertices.length;i < il;i++) {var vertex=this.vertices[i];vertex.applyMatrix4(matrix);}for(var i=0,il=this.faces.length;i < il;i++) {var face=this.faces[i];face.normal.applyMatrix3(normalMatrix).normalize();for(var j=0,jl=face.vertexNormals.length;j < jl;j++) {face.vertexNormals[j].applyMatrix3(normalMatrix).normalize();}}if(this.boundingBox !== null){this.computeBoundingBox();}if(this.boundingSphere !== null){this.computeBoundingSphere();}this.verticesNeedUpdate = true;this.normalsNeedUpdate = true;},rotateX:(function(){ // rotate geometry around world x-axis
	var m1;return function rotateX(angle){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeRotationX(angle);this.applyMatrix(m1);return this;};})(),rotateY:(function(){ // rotate geometry around world y-axis
	var m1;return function rotateY(angle){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeRotationY(angle);this.applyMatrix(m1);return this;};})(),rotateZ:(function(){ // rotate geometry around world z-axis
	var m1;return function rotateZ(angle){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeRotationZ(angle);this.applyMatrix(m1);return this;};})(),translate:(function(){ // translate geometry
	var m1;return function translate(x,y,z){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeTranslation(x,y,z);this.applyMatrix(m1);return this;};})(),scale:(function(){ // scale geometry
	var m1;return function scale(x,y,z){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeScale(x,y,z);this.applyMatrix(m1);return this;};})(),lookAt:(function(){var obj;return function lookAt(vector){if(obj === undefined)obj = new THREE.Object3D();obj.lookAt(vector);obj.updateMatrix();this.applyMatrix(obj.matrix);};})(),fromBufferGeometry:function fromBufferGeometry(geometry){var scope=this;var indices=geometry.index !== null?geometry.index.array:undefined;var attributes=geometry.attributes;var vertices=attributes.position.array;var normals=attributes.normal !== undefined?attributes.normal.array:undefined;var colors=attributes.color !== undefined?attributes.color.array:undefined;var uvs=attributes.uv !== undefined?attributes.uv.array:undefined;var uvs2=attributes.uv2 !== undefined?attributes.uv2.array:undefined;if(uvs2 !== undefined)this.faceVertexUvs[1] = [];var tempNormals=[];var tempUVs=[];var tempUVs2=[];for(var i=0,j=0,k=0;i < vertices.length;i += 3,j += 2,k += 4) {scope.vertices.push(new THREE.Vector3(vertices[i],vertices[i + 1],vertices[i + 2]));if(normals !== undefined){tempNormals.push(new THREE.Vector3(normals[i],normals[i + 1],normals[i + 2]));}if(colors !== undefined){scope.colors.push(new THREE.Color(colors[i],colors[i + 1],colors[i + 2]));}if(uvs !== undefined){tempUVs.push(new THREE.Vector2(uvs[j],uvs[j + 1]));}if(uvs2 !== undefined){tempUVs2.push(new THREE.Vector2(uvs2[j],uvs2[j + 1]));}}var addFace=function addFace(a,b,c){var vertexNormals=normals !== undefined?[tempNormals[a].clone(),tempNormals[b].clone(),tempNormals[c].clone()]:[];var vertexColors=colors !== undefined?[scope.colors[a].clone(),scope.colors[b].clone(),scope.colors[c].clone()]:[];var face=new THREE.Face3(a,b,c,vertexNormals,vertexColors);scope.faces.push(face);if(uvs !== undefined){scope.faceVertexUvs[0].push([tempUVs[a].clone(),tempUVs[b].clone(),tempUVs[c].clone()]);}if(uvs2 !== undefined){scope.faceVertexUvs[1].push([tempUVs2[a].clone(),tempUVs2[b].clone(),tempUVs2[c].clone()]);}};if(indices !== undefined){var groups=geometry.groups;if(groups.length > 0){for(var i=0;i < groups.length;i++) {var group=groups[i];var start=group.start;var count=group.count;for(var j=start,jl=start + count;j < jl;j += 3) {addFace(indices[j],indices[j + 1],indices[j + 2]);}}}else {for(var i=0;i < indices.length;i += 3) {addFace(indices[i],indices[i + 1],indices[i + 2]);}}}else {for(var i=0;i < vertices.length / 3;i += 3) {addFace(i,i + 1,i + 2);}}this.computeFaceNormals();if(geometry.boundingBox !== null){this.boundingBox = geometry.boundingBox.clone();}if(geometry.boundingSphere !== null){this.boundingSphere = geometry.boundingSphere.clone();}return this;},center:function center(){this.computeBoundingBox();var offset=this.boundingBox.center().negate();this.translate(offset.x,offset.y,offset.z);return offset;},normalize:function normalize(){this.computeBoundingSphere();var center=this.boundingSphere.center;var radius=this.boundingSphere.radius;var s=radius === 0?1:1.0 / radius;var matrix=new THREE.Matrix4();matrix.set(s,0,0,-s * center.x,0,s,0,-s * center.y,0,0,s,-s * center.z,0,0,0,1);this.applyMatrix(matrix);return this;},computeFaceNormals:function computeFaceNormals(){var cb=new THREE.Vector3(),ab=new THREE.Vector3();for(var f=0,fl=this.faces.length;f < fl;f++) {var face=this.faces[f];var vA=this.vertices[face.a];var vB=this.vertices[face.b];var vC=this.vertices[face.c];cb.subVectors(vC,vB);ab.subVectors(vA,vB);cb.cross(ab);cb.normalize();face.normal.copy(cb);}},computeVertexNormals:function computeVertexNormals(areaWeighted){var v,vl,f,fl,face,vertices;vertices = new Array(this.vertices.length);for(v = 0,vl = this.vertices.length;v < vl;v++) {vertices[v] = new THREE.Vector3();}if(areaWeighted){ // vertex normals weighted by triangle areas
	// http://www.iquilezles.org/www/articles/normals/normals.htm
	var vA,vB,vC;var cb=new THREE.Vector3(),ab=new THREE.Vector3();for(f = 0,fl = this.faces.length;f < fl;f++) {face = this.faces[f];vA = this.vertices[face.a];vB = this.vertices[face.b];vC = this.vertices[face.c];cb.subVectors(vC,vB);ab.subVectors(vA,vB);cb.cross(ab);vertices[face.a].add(cb);vertices[face.b].add(cb);vertices[face.c].add(cb);}}else {for(f = 0,fl = this.faces.length;f < fl;f++) {face = this.faces[f];vertices[face.a].add(face.normal);vertices[face.b].add(face.normal);vertices[face.c].add(face.normal);}}for(v = 0,vl = this.vertices.length;v < vl;v++) {vertices[v].normalize();}for(f = 0,fl = this.faces.length;f < fl;f++) {face = this.faces[f];var vertexNormals=face.vertexNormals;if(vertexNormals.length === 3){vertexNormals[0].copy(vertices[face.a]);vertexNormals[1].copy(vertices[face.b]);vertexNormals[2].copy(vertices[face.c]);}else {vertexNormals[0] = vertices[face.a].clone();vertexNormals[1] = vertices[face.b].clone();vertexNormals[2] = vertices[face.c].clone();}}},computeMorphNormals:function computeMorphNormals(){var i,il,f,fl,face; // save original normals
	// - create temp variables on first access
	//   otherwise just copy (for faster repeated calls)
	for(f = 0,fl = this.faces.length;f < fl;f++) {face = this.faces[f];if(!face.__originalFaceNormal){face.__originalFaceNormal = face.normal.clone();}else {face.__originalFaceNormal.copy(face.normal);}if(!face.__originalVertexNormals)face.__originalVertexNormals = [];for(i = 0,il = face.vertexNormals.length;i < il;i++) {if(!face.__originalVertexNormals[i]){face.__originalVertexNormals[i] = face.vertexNormals[i].clone();}else {face.__originalVertexNormals[i].copy(face.vertexNormals[i]);}}} // use temp geometry to compute face and vertex normals for each morph
	var tmpGeo=new THREE.Geometry();tmpGeo.faces = this.faces;for(i = 0,il = this.morphTargets.length;i < il;i++) { // create on first access
	if(!this.morphNormals[i]){this.morphNormals[i] = {};this.morphNormals[i].faceNormals = [];this.morphNormals[i].vertexNormals = [];var dstNormalsFace=this.morphNormals[i].faceNormals;var dstNormalsVertex=this.morphNormals[i].vertexNormals;var faceNormal,vertexNormals;for(f = 0,fl = this.faces.length;f < fl;f++) {faceNormal = new THREE.Vector3();vertexNormals = {a:new THREE.Vector3(),b:new THREE.Vector3(),c:new THREE.Vector3()};dstNormalsFace.push(faceNormal);dstNormalsVertex.push(vertexNormals);}}var morphNormals=this.morphNormals[i]; // set vertices to morph target
	tmpGeo.vertices = this.morphTargets[i].vertices; // compute morph normals
	tmpGeo.computeFaceNormals();tmpGeo.computeVertexNormals(); // store morph normals
	var faceNormal,vertexNormals;for(f = 0,fl = this.faces.length;f < fl;f++) {face = this.faces[f];faceNormal = morphNormals.faceNormals[f];vertexNormals = morphNormals.vertexNormals[f];faceNormal.copy(face.normal);vertexNormals.a.copy(face.vertexNormals[0]);vertexNormals.b.copy(face.vertexNormals[1]);vertexNormals.c.copy(face.vertexNormals[2]);}} // restore original normals
	for(f = 0,fl = this.faces.length;f < fl;f++) {face = this.faces[f];face.normal = face.__originalFaceNormal;face.vertexNormals = face.__originalVertexNormals;}},computeTangents:function computeTangents(){console.warn('THREE.Geometry: .computeTangents() has been removed.');},computeLineDistances:function computeLineDistances(){var d=0;var vertices=this.vertices;for(var i=0,il=vertices.length;i < il;i++) {if(i > 0){d += vertices[i].distanceTo(vertices[i - 1]);}this.lineDistances[i] = d;}},computeBoundingBox:function computeBoundingBox(){if(this.boundingBox === null){this.boundingBox = new THREE.Box3();}this.boundingBox.setFromPoints(this.vertices);},computeBoundingSphere:function computeBoundingSphere(){if(this.boundingSphere === null){this.boundingSphere = new THREE.Sphere();}this.boundingSphere.setFromPoints(this.vertices);},merge:function merge(geometry,matrix,materialIndexOffset){if(geometry instanceof THREE.Geometry === false){console.error('THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.',geometry);return;}var normalMatrix,vertexOffset=this.vertices.length,vertices1=this.vertices,vertices2=geometry.vertices,faces1=this.faces,faces2=geometry.faces,uvs1=this.faceVertexUvs[0],uvs2=geometry.faceVertexUvs[0];if(materialIndexOffset === undefined)materialIndexOffset = 0;if(matrix !== undefined){normalMatrix = new THREE.Matrix3().getNormalMatrix(matrix);} // vertices
	for(var i=0,il=vertices2.length;i < il;i++) {var vertex=vertices2[i];var vertexCopy=vertex.clone();if(matrix !== undefined)vertexCopy.applyMatrix4(matrix);vertices1.push(vertexCopy);} // faces
	for(i = 0,il = faces2.length;i < il;i++) {var face=faces2[i],faceCopy,normal,color,faceVertexNormals=face.vertexNormals,faceVertexColors=face.vertexColors;faceCopy = new THREE.Face3(face.a + vertexOffset,face.b + vertexOffset,face.c + vertexOffset);faceCopy.normal.copy(face.normal);if(normalMatrix !== undefined){faceCopy.normal.applyMatrix3(normalMatrix).normalize();}for(var j=0,jl=faceVertexNormals.length;j < jl;j++) {normal = faceVertexNormals[j].clone();if(normalMatrix !== undefined){normal.applyMatrix3(normalMatrix).normalize();}faceCopy.vertexNormals.push(normal);}faceCopy.color.copy(face.color);for(var j=0,jl=faceVertexColors.length;j < jl;j++) {color = faceVertexColors[j];faceCopy.vertexColors.push(color.clone());}faceCopy.materialIndex = face.materialIndex + materialIndexOffset;faces1.push(faceCopy);} // uvs
	for(i = 0,il = uvs2.length;i < il;i++) {var uv=uvs2[i],uvCopy=[];if(uv === undefined){continue;}for(var j=0,jl=uv.length;j < jl;j++) {uvCopy.push(uv[j].clone());}uvs1.push(uvCopy);}},mergeMesh:function mergeMesh(mesh){if(mesh instanceof THREE.Mesh === false){console.error('THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.',mesh);return;}mesh.matrixAutoUpdate && mesh.updateMatrix();this.merge(mesh.geometry,mesh.matrix);}, /*
		 * Checks for duplicate vertices with hashmap.
		 * Duplicated vertices are removed
		 * and faces' vertices are updated.
		 */mergeVertices:function mergeVertices(){var verticesMap={}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
	var unique=[],changes=[];var v,key;var precisionPoints=4; // number of decimal points, e.g. 4 for epsilon of 0.0001
	var precision=Math.pow(10,precisionPoints);var i,il,face;var indices,j,jl;for(i = 0,il = this.vertices.length;i < il;i++) {v = this.vertices[i];key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);if(verticesMap[key] === undefined){verticesMap[key] = i;unique.push(this.vertices[i]);changes[i] = unique.length - 1;}else { //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
	changes[i] = changes[verticesMap[key]];}} // if faces are completely degenerate after merging vertices, we
	// have to remove them from the geometry.
	var faceIndicesToRemove=[];for(i = 0,il = this.faces.length;i < il;i++) {face = this.faces[i];face.a = changes[face.a];face.b = changes[face.b];face.c = changes[face.c];indices = [face.a,face.b,face.c];var dupIndex=-1; // if any duplicate vertices are found in a Face3
	// we have to remove the face as nothing can be saved
	for(var n=0;n < 3;n++) {if(indices[n] === indices[(n + 1) % 3]){dupIndex = n;faceIndicesToRemove.push(i);break;}}}for(i = faceIndicesToRemove.length - 1;i >= 0;i--) {var idx=faceIndicesToRemove[i];this.faces.splice(idx,1);for(j = 0,jl = this.faceVertexUvs.length;j < jl;j++) {this.faceVertexUvs[j].splice(idx,1);}} // Use unique set of vertices
	var diff=this.vertices.length - unique.length;this.vertices = unique;return diff;},toJSON:function toJSON(){var data={metadata:{version:4.4,type:'Geometry',generator:'Geometry.toJSON'}}; // standard Geometry serialization
	data.uuid = this.uuid;data.type = this.type;if(this.name !== '')data.name = this.name;if(this.parameters !== undefined){var parameters=this.parameters;for(var key in parameters) {if(parameters[key] !== undefined)data[key] = parameters[key];}return data;}var vertices=[];for(var i=0;i < this.vertices.length;i++) {var vertex=this.vertices[i];vertices.push(vertex.x,vertex.y,vertex.z);}var faces=[];var normals=[];var normalsHash={};var colors=[];var colorsHash={};var uvs=[];var uvsHash={};for(var i=0;i < this.faces.length;i++) {var face=this.faces[i];var hasMaterial=false; // face.materialIndex !== undefined;
	var hasFaceUv=false; // deprecated
	var hasFaceVertexUv=this.faceVertexUvs[0][i] !== undefined;var hasFaceNormal=face.normal.length() > 0;var hasFaceVertexNormal=face.vertexNormals.length > 0;var hasFaceColor=face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;var hasFaceVertexColor=face.vertexColors.length > 0;var faceType=0;faceType = setBit(faceType,0,0);faceType = setBit(faceType,1,hasMaterial);faceType = setBit(faceType,2,hasFaceUv);faceType = setBit(faceType,3,hasFaceVertexUv);faceType = setBit(faceType,4,hasFaceNormal);faceType = setBit(faceType,5,hasFaceVertexNormal);faceType = setBit(faceType,6,hasFaceColor);faceType = setBit(faceType,7,hasFaceVertexColor);faces.push(faceType);faces.push(face.a,face.b,face.c);if(hasFaceVertexUv){var faceVertexUvs=this.faceVertexUvs[0][i];faces.push(getUvIndex(faceVertexUvs[0]),getUvIndex(faceVertexUvs[1]),getUvIndex(faceVertexUvs[2]));}if(hasFaceNormal){faces.push(getNormalIndex(face.normal));}if(hasFaceVertexNormal){var vertexNormals=face.vertexNormals;faces.push(getNormalIndex(vertexNormals[0]),getNormalIndex(vertexNormals[1]),getNormalIndex(vertexNormals[2]));}if(hasFaceColor){faces.push(getColorIndex(face.color));}if(hasFaceVertexColor){var vertexColors=face.vertexColors;faces.push(getColorIndex(vertexColors[0]),getColorIndex(vertexColors[1]),getColorIndex(vertexColors[2]));}}function setBit(value,position,enabled){return enabled?value | 1 << position:value & ~(1 << position);}function getNormalIndex(normal){var hash=normal.x.toString() + normal.y.toString() + normal.z.toString();if(normalsHash[hash] !== undefined){return normalsHash[hash];}normalsHash[hash] = normals.length / 3;normals.push(normal.x,normal.y,normal.z);return normalsHash[hash];}function getColorIndex(color){var hash=color.r.toString() + color.g.toString() + color.b.toString();if(colorsHash[hash] !== undefined){return colorsHash[hash];}colorsHash[hash] = colors.length;colors.push(color.getHex());return colorsHash[hash];}function getUvIndex(uv){var hash=uv.x.toString() + uv.y.toString();if(uvsHash[hash] !== undefined){return uvsHash[hash];}uvsHash[hash] = uvs.length / 2;uvs.push(uv.x,uv.y);return uvsHash[hash];}data.data = {};data.data.vertices = vertices;data.data.normals = normals;if(colors.length > 0)data.data.colors = colors;if(uvs.length > 0)data.data.uvs = [uvs]; // temporal backward compatibility
	data.data.faces = faces;return data;},clone:function clone(){return new this.constructor().copy(this);},copy:function copy(source){this.vertices = [];this.faces = [];this.faceVertexUvs = [[]];var vertices=source.vertices;for(var i=0,il=vertices.length;i < il;i++) {this.vertices.push(vertices[i].clone());}var faces=source.faces;for(var i=0,il=faces.length;i < il;i++) {this.faces.push(faces[i].clone());}for(var i=0,il=source.faceVertexUvs.length;i < il;i++) {var faceVertexUvs=source.faceVertexUvs[i];if(this.faceVertexUvs[i] === undefined){this.faceVertexUvs[i] = [];}for(var j=0,jl=faceVertexUvs.length;j < jl;j++) {var uvs=faceVertexUvs[j],uvsCopy=[];for(var k=0,kl=uvs.length;k < kl;k++) {var uv=uvs[k];uvsCopy.push(uv.clone());}this.faceVertexUvs[i].push(uvsCopy);}}return this;},dispose:function dispose(){this.dispatchEvent({type:'dispose'});}};THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype);THREE.GeometryIdCount = 0; // File:src/core/DirectGeometry.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.DirectGeometry = function(){Object.defineProperty(this,'id',{value:THREE.GeometryIdCount++});this.uuid = THREE.Math.generateUUID();this.name = '';this.type = 'DirectGeometry';this.indices = [];this.vertices = [];this.normals = [];this.colors = [];this.uvs = [];this.uvs2 = [];this.groups = [];this.morphTargets = {};this.skinWeights = [];this.skinIndices = []; // this.lineDistances = [];
	this.boundingBox = null;this.boundingSphere = null; // update flags
	this.verticesNeedUpdate = false;this.normalsNeedUpdate = false;this.colorsNeedUpdate = false;this.uvsNeedUpdate = false;this.groupsNeedUpdate = false;};THREE.DirectGeometry.prototype = {constructor:THREE.DirectGeometry,computeBoundingBox:THREE.Geometry.prototype.computeBoundingBox,computeBoundingSphere:THREE.Geometry.prototype.computeBoundingSphere,computeFaceNormals:function computeFaceNormals(){console.warn('THREE.DirectGeometry: computeFaceNormals() is not a method of this type of geometry.');},computeVertexNormals:function computeVertexNormals(){console.warn('THREE.DirectGeometry: computeVertexNormals() is not a method of this type of geometry.');},computeGroups:function computeGroups(geometry){var group;var groups=[];var materialIndex;var faces=geometry.faces;for(var i=0;i < faces.length;i++) {var face=faces[i]; // materials
	if(face.materialIndex !== materialIndex){materialIndex = face.materialIndex;if(group !== undefined){group.count = i * 3 - group.start;groups.push(group);}group = {start:i * 3,materialIndex:materialIndex};}}if(group !== undefined){group.count = i * 3 - group.start;groups.push(group);}this.groups = groups;},fromGeometry:function fromGeometry(geometry){var faces=geometry.faces;var vertices=geometry.vertices;var faceVertexUvs=geometry.faceVertexUvs;var hasFaceVertexUv=faceVertexUvs[0] && faceVertexUvs[0].length > 0;var hasFaceVertexUv2=faceVertexUvs[1] && faceVertexUvs[1].length > 0; // morphs
	var morphTargets=geometry.morphTargets;var morphTargetsLength=morphTargets.length;if(morphTargetsLength > 0){var morphTargetsPosition=[];for(var i=0;i < morphTargetsLength;i++) {morphTargetsPosition[i] = [];}this.morphTargets.position = morphTargetsPosition;}var morphNormals=geometry.morphNormals;var morphNormalsLength=morphNormals.length;if(morphNormalsLength > 0){var morphTargetsNormal=[];for(var i=0;i < morphNormalsLength;i++) {morphTargetsNormal[i] = [];}this.morphTargets.normal = morphTargetsNormal;} // skins
	var skinIndices=geometry.skinIndices;var skinWeights=geometry.skinWeights;var hasSkinIndices=skinIndices.length === vertices.length;var hasSkinWeights=skinWeights.length === vertices.length; //
	for(var i=0;i < faces.length;i++) {var face=faces[i];this.vertices.push(vertices[face.a],vertices[face.b],vertices[face.c]);var vertexNormals=face.vertexNormals;if(vertexNormals.length === 3){this.normals.push(vertexNormals[0],vertexNormals[1],vertexNormals[2]);}else {var normal=face.normal;this.normals.push(normal,normal,normal);}var vertexColors=face.vertexColors;if(vertexColors.length === 3){this.colors.push(vertexColors[0],vertexColors[1],vertexColors[2]);}else {var color=face.color;this.colors.push(color,color,color);}if(hasFaceVertexUv === true){var vertexUvs=faceVertexUvs[0][i];if(vertexUvs !== undefined){this.uvs.push(vertexUvs[0],vertexUvs[1],vertexUvs[2]);}else {console.warn('THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ',i);this.uvs.push(new THREE.Vector2(),new THREE.Vector2(),new THREE.Vector2());}}if(hasFaceVertexUv2 === true){var vertexUvs=faceVertexUvs[1][i];if(vertexUvs !== undefined){this.uvs2.push(vertexUvs[0],vertexUvs[1],vertexUvs[2]);}else {console.warn('THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ',i);this.uvs2.push(new THREE.Vector2(),new THREE.Vector2(),new THREE.Vector2());}} // morphs
	for(var j=0;j < morphTargetsLength;j++) {var morphTarget=morphTargets[j].vertices;morphTargetsPosition[j].push(morphTarget[face.a],morphTarget[face.b],morphTarget[face.c]);}for(var j=0;j < morphNormalsLength;j++) {var morphNormal=morphNormals[j].vertexNormals[i];morphTargetsNormal[j].push(morphNormal.a,morphNormal.b,morphNormal.c);} // skins
	if(hasSkinIndices){this.skinIndices.push(skinIndices[face.a],skinIndices[face.b],skinIndices[face.c]);}if(hasSkinWeights){this.skinWeights.push(skinWeights[face.a],skinWeights[face.b],skinWeights[face.c]);}}this.computeGroups(geometry);this.verticesNeedUpdate = geometry.verticesNeedUpdate;this.normalsNeedUpdate = geometry.normalsNeedUpdate;this.colorsNeedUpdate = geometry.colorsNeedUpdate;this.uvsNeedUpdate = geometry.uvsNeedUpdate;this.groupsNeedUpdate = geometry.groupsNeedUpdate;return this;},dispose:function dispose(){this.dispatchEvent({type:'dispose'});}};THREE.EventDispatcher.prototype.apply(THREE.DirectGeometry.prototype); // File:src/core/BufferGeometry.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.BufferGeometry = function(){Object.defineProperty(this,'id',{value:THREE.GeometryIdCount++});this.uuid = THREE.Math.generateUUID();this.name = '';this.type = 'BufferGeometry';this.index = null;this.attributes = {};this.morphAttributes = {};this.groups = [];this.boundingBox = null;this.boundingSphere = null;this.drawRange = {start:0,count:Infinity};};THREE.BufferGeometry.prototype = Object.defineProperties({constructor:THREE.BufferGeometry,addIndex:function addIndex(index){console.warn('THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().');this.setIndex(index);},getIndex:function getIndex(){return this.index;},setIndex:function setIndex(index){this.index = index;},addAttribute:function addAttribute(name,attribute){if(attribute instanceof THREE.BufferAttribute === false && attribute instanceof THREE.InterleavedBufferAttribute === false){console.warn('THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).');this.addAttribute(name,new THREE.BufferAttribute(arguments[1],arguments[2]));return;}if(name === 'index'){console.warn('THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.');this.setIndex(attribute);}this.attributes[name] = attribute;},getAttribute:function getAttribute(name){return this.attributes[name];},removeAttribute:function removeAttribute(name){delete this.attributes[name];},addDrawCall:function addDrawCall(start,count,indexOffset){if(indexOffset !== undefined){console.warn('THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.');}console.warn('THREE.BufferGeometry: .addDrawCall() is now .addGroup().');this.addGroup(start,count);},clearDrawCalls:function clearDrawCalls(){console.warn('THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().');this.clearGroups();},addGroup:function addGroup(start,count,materialIndex){this.groups.push({start:start,count:count,materialIndex:materialIndex !== undefined?materialIndex:0});},clearGroups:function clearGroups(){this.groups = [];},setDrawRange:function setDrawRange(start,count){this.drawRange.start = start;this.drawRange.count = count;},applyMatrix:function applyMatrix(matrix){var position=this.attributes.position;if(position !== undefined){matrix.applyToVector3Array(position.array);position.needsUpdate = true;}var normal=this.attributes.normal;if(normal !== undefined){var normalMatrix=new THREE.Matrix3().getNormalMatrix(matrix);normalMatrix.applyToVector3Array(normal.array);normal.needsUpdate = true;}if(this.boundingBox !== null){this.computeBoundingBox();}if(this.boundingSphere !== null){this.computeBoundingSphere();}},rotateX:(function(){ // rotate geometry around world x-axis
	var m1;return function rotateX(angle){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeRotationX(angle);this.applyMatrix(m1);return this;};})(),rotateY:(function(){ // rotate geometry around world y-axis
	var m1;return function rotateY(angle){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeRotationY(angle);this.applyMatrix(m1);return this;};})(),rotateZ:(function(){ // rotate geometry around world z-axis
	var m1;return function rotateZ(angle){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeRotationZ(angle);this.applyMatrix(m1);return this;};})(),translate:(function(){ // translate geometry
	var m1;return function translate(x,y,z){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeTranslation(x,y,z);this.applyMatrix(m1);return this;};})(),scale:(function(){ // scale geometry
	var m1;return function scale(x,y,z){if(m1 === undefined)m1 = new THREE.Matrix4();m1.makeScale(x,y,z);this.applyMatrix(m1);return this;};})(),lookAt:(function(){var obj;return function lookAt(vector){if(obj === undefined)obj = new THREE.Object3D();obj.lookAt(vector);obj.updateMatrix();this.applyMatrix(obj.matrix);};})(),center:function center(){this.computeBoundingBox();var offset=this.boundingBox.center().negate();this.translate(offset.x,offset.y,offset.z);return offset;},setFromObject:function setFromObject(object){ // console.log( 'THREE.BufferGeometry.setFromObject(). Converting', object, this );
	var geometry=object.geometry;if(object instanceof THREE.Points || object instanceof THREE.Line){var positions=new THREE.Float32Attribute(geometry.vertices.length * 3,3);var colors=new THREE.Float32Attribute(geometry.colors.length * 3,3);this.addAttribute('position',positions.copyVector3sArray(geometry.vertices));this.addAttribute('color',colors.copyColorsArray(geometry.colors));if(geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length){var lineDistances=new THREE.Float32Attribute(geometry.lineDistances.length,1);this.addAttribute('lineDistance',lineDistances.copyArray(geometry.lineDistances));}if(geometry.boundingSphere !== null){this.boundingSphere = geometry.boundingSphere.clone();}if(geometry.boundingBox !== null){this.boundingBox = geometry.boundingBox.clone();}}else if(object instanceof THREE.Mesh){if(geometry instanceof THREE.Geometry){this.fromGeometry(geometry);}}return this;},updateFromObject:function updateFromObject(object){var geometry=object.geometry;if(object instanceof THREE.Mesh){var direct=geometry.__directGeometry;if(direct === undefined){return this.fromGeometry(geometry);}direct.verticesNeedUpdate = geometry.verticesNeedUpdate;direct.normalsNeedUpdate = geometry.normalsNeedUpdate;direct.colorsNeedUpdate = geometry.colorsNeedUpdate;direct.uvsNeedUpdate = geometry.uvsNeedUpdate;direct.groupsNeedUpdate = geometry.groupsNeedUpdate;geometry.verticesNeedUpdate = false;geometry.normalsNeedUpdate = false;geometry.colorsNeedUpdate = false;geometry.uvsNeedUpdate = false;geometry.groupsNeedUpdate = false;geometry = direct;}if(geometry.verticesNeedUpdate === true){var attribute=this.attributes.position;if(attribute !== undefined){attribute.copyVector3sArray(geometry.vertices);attribute.needsUpdate = true;}geometry.verticesNeedUpdate = false;}if(geometry.normalsNeedUpdate === true){var attribute=this.attributes.normal;if(attribute !== undefined){attribute.copyVector3sArray(geometry.normals);attribute.needsUpdate = true;}geometry.normalsNeedUpdate = false;}if(geometry.colorsNeedUpdate === true){var attribute=this.attributes.color;if(attribute !== undefined){attribute.copyColorsArray(geometry.colors);attribute.needsUpdate = true;}geometry.colorsNeedUpdate = false;}if(geometry.lineDistancesNeedUpdate){var attribute=this.attributes.lineDistance;if(attribute !== undefined){attribute.copyArray(geometry.lineDistances);attribute.needsUpdate = true;}geometry.lineDistancesNeedUpdate = false;}if(geometry.groupsNeedUpdate){geometry.computeGroups(object.geometry);this.groups = geometry.groups;geometry.groupsNeedUpdate = false;}return this;},fromGeometry:function fromGeometry(geometry){geometry.__directGeometry = new THREE.DirectGeometry().fromGeometry(geometry);return this.fromDirectGeometry(geometry.__directGeometry);},fromDirectGeometry:function fromDirectGeometry(geometry){var positions=new Float32Array(geometry.vertices.length * 3);this.addAttribute('position',new THREE.BufferAttribute(positions,3).copyVector3sArray(geometry.vertices));if(geometry.normals.length > 0){var normals=new Float32Array(geometry.normals.length * 3);this.addAttribute('normal',new THREE.BufferAttribute(normals,3).copyVector3sArray(geometry.normals));}if(geometry.colors.length > 0){var colors=new Float32Array(geometry.colors.length * 3);this.addAttribute('color',new THREE.BufferAttribute(colors,3).copyColorsArray(geometry.colors));}if(geometry.uvs.length > 0){var uvs=new Float32Array(geometry.uvs.length * 2);this.addAttribute('uv',new THREE.BufferAttribute(uvs,2).copyVector2sArray(geometry.uvs));}if(geometry.uvs2.length > 0){var uvs2=new Float32Array(geometry.uvs2.length * 2);this.addAttribute('uv2',new THREE.BufferAttribute(uvs2,2).copyVector2sArray(geometry.uvs2));}if(geometry.indices.length > 0){var TypeArray=geometry.vertices.length > 65535?Uint32Array:Uint16Array;var indices=new TypeArray(geometry.indices.length * 3);this.setIndex(new THREE.BufferAttribute(indices,1).copyIndicesArray(geometry.indices));} // groups
	this.groups = geometry.groups; // morphs
	for(var name in geometry.morphTargets) {var array=[];var morphTargets=geometry.morphTargets[name];for(var i=0,l=morphTargets.length;i < l;i++) {var morphTarget=morphTargets[i];var attribute=new THREE.Float32Attribute(morphTarget.length * 3,3);array.push(attribute.copyVector3sArray(morphTarget));}this.morphAttributes[name] = array;} // skinning
	if(geometry.skinIndices.length > 0){var skinIndices=new THREE.Float32Attribute(geometry.skinIndices.length * 4,4);this.addAttribute('skinIndex',skinIndices.copyVector4sArray(geometry.skinIndices));}if(geometry.skinWeights.length > 0){var skinWeights=new THREE.Float32Attribute(geometry.skinWeights.length * 4,4);this.addAttribute('skinWeight',skinWeights.copyVector4sArray(geometry.skinWeights));} //
	if(geometry.boundingSphere !== null){this.boundingSphere = geometry.boundingSphere.clone();}if(geometry.boundingBox !== null){this.boundingBox = geometry.boundingBox.clone();}return this;},computeBoundingBox:(function(){var vector=new THREE.Vector3();return function(){if(this.boundingBox === null){this.boundingBox = new THREE.Box3();}var positions=this.attributes.position.array;if(positions){var bb=this.boundingBox;bb.makeEmpty();for(var i=0,il=positions.length;i < il;i += 3) {vector.fromArray(positions,i);bb.expandByPoint(vector);}}if(positions === undefined || positions.length === 0){this.boundingBox.min.set(0,0,0);this.boundingBox.max.set(0,0,0);}if(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)){console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this);}};})(),computeBoundingSphere:(function(){var box=new THREE.Box3();var vector=new THREE.Vector3();return function(){if(this.boundingSphere === null){this.boundingSphere = new THREE.Sphere();}var positions=this.attributes.position.array;if(positions){box.makeEmpty();var center=this.boundingSphere.center;for(var i=0,il=positions.length;i < il;i += 3) {vector.fromArray(positions,i);box.expandByPoint(vector);}box.center(center); // hoping to find a boundingSphere with a radius smaller than the
	// boundingSphere of the boundingBox: sqrt(3) smaller in the best case
	var maxRadiusSq=0;for(var i=0,il=positions.length;i < il;i += 3) {vector.fromArray(positions,i);maxRadiusSq = Math.max(maxRadiusSq,center.distanceToSquared(vector));}this.boundingSphere.radius = Math.sqrt(maxRadiusSq);if(isNaN(this.boundingSphere.radius)){console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this);}}};})(),computeFaceNormals:function computeFaceNormals(){ // backwards compatibility
	},computeVertexNormals:function computeVertexNormals(){var index=this.index;var attributes=this.attributes;var groups=this.groups;if(attributes.position){var positions=attributes.position.array;if(attributes.normal === undefined){this.addAttribute('normal',new THREE.BufferAttribute(new Float32Array(positions.length),3));}else { // reset existing normals to zero
	var normals=attributes.normal.array;for(var i=0,il=normals.length;i < il;i++) {normals[i] = 0;}}var normals=attributes.normal.array;var vA,vB,vC,pA=new THREE.Vector3(),pB=new THREE.Vector3(),pC=new THREE.Vector3(),cb=new THREE.Vector3(),ab=new THREE.Vector3(); // indexed elements
	if(index){var indices=index.array;if(groups.length === 0){this.addGroup(0,indices.length);}for(var j=0,jl=groups.length;j < jl;++j) {var group=groups[j];var start=group.start;var count=group.count;for(var i=start,il=start + count;i < il;i += 3) {vA = indices[i + 0] * 3;vB = indices[i + 1] * 3;vC = indices[i + 2] * 3;pA.fromArray(positions,vA);pB.fromArray(positions,vB);pC.fromArray(positions,vC);cb.subVectors(pC,pB);ab.subVectors(pA,pB);cb.cross(ab);normals[vA] += cb.x;normals[vA + 1] += cb.y;normals[vA + 2] += cb.z;normals[vB] += cb.x;normals[vB + 1] += cb.y;normals[vB + 2] += cb.z;normals[vC] += cb.x;normals[vC + 1] += cb.y;normals[vC + 2] += cb.z;}}}else { // non-indexed elements (unconnected triangle soup)
	for(var i=0,il=positions.length;i < il;i += 9) {pA.fromArray(positions,i);pB.fromArray(positions,i + 3);pC.fromArray(positions,i + 6);cb.subVectors(pC,pB);ab.subVectors(pA,pB);cb.cross(ab);normals[i] = cb.x;normals[i + 1] = cb.y;normals[i + 2] = cb.z;normals[i + 3] = cb.x;normals[i + 4] = cb.y;normals[i + 5] = cb.z;normals[i + 6] = cb.x;normals[i + 7] = cb.y;normals[i + 8] = cb.z;}}this.normalizeNormals();attributes.normal.needsUpdate = true;}},computeTangents:function computeTangents(){console.warn('THREE.BufferGeometry: .computeTangents() has been removed.');},computeOffsets:function computeOffsets(size){console.warn('THREE.BufferGeometry: .computeOffsets() has been removed.');},merge:function merge(geometry,offset){if(geometry instanceof THREE.BufferGeometry === false){console.error('THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.',geometry);return;}if(offset === undefined)offset = 0;var attributes=this.attributes;for(var key in attributes) {if(geometry.attributes[key] === undefined)continue;var attribute1=attributes[key];var attributeArray1=attribute1.array;var attribute2=geometry.attributes[key];var attributeArray2=attribute2.array;var attributeSize=attribute2.itemSize;for(var i=0,j=attributeSize * offset;i < attributeArray2.length;i++,j++) {attributeArray1[j] = attributeArray2[i];}}return this;},normalizeNormals:function normalizeNormals(){var normals=this.attributes.normal.array;var x,y,z,n;for(var i=0,il=normals.length;i < il;i += 3) {x = normals[i];y = normals[i + 1];z = normals[i + 2];n = 1.0 / Math.sqrt(x * x + y * y + z * z);normals[i] *= n;normals[i + 1] *= n;normals[i + 2] *= n;}},toJSON:function toJSON(){var data={metadata:{version:4.4,type:'BufferGeometry',generator:'BufferGeometry.toJSON'}}; // standard BufferGeometry serialization
	data.uuid = this.uuid;data.type = this.type;if(this.name !== '')data.name = this.name;if(this.parameters !== undefined){var parameters=this.parameters;for(var key in parameters) {if(parameters[key] !== undefined)data[key] = parameters[key];}return data;}data.data = {attributes:{}};var index=this.index;if(index !== null){var array=Array.prototype.slice.call(index.array);data.data.index = {type:index.array.constructor.name,array:array};}var attributes=this.attributes;for(var key in attributes) {var attribute=attributes[key];var array=Array.prototype.slice.call(attribute.array);data.data.attributes[key] = {itemSize:attribute.itemSize,type:attribute.array.constructor.name,array:array};}var groups=this.groups;if(groups.length > 0){data.data.groups = JSON.parse(JSON.stringify(groups));}var boundingSphere=this.boundingSphere;if(boundingSphere !== null){data.data.boundingSphere = {center:boundingSphere.center.toArray(),radius:boundingSphere.radius};}return data;},clone:function clone(){return new this.constructor().copy(this);},copy:function copy(source){var index=source.index;if(index !== null){this.setIndex(index.clone());}var attributes=source.attributes;for(var name in attributes) {var attribute=attributes[name];this.addAttribute(name,attribute.clone());}var groups=source.groups;for(var i=0,l=groups.length;i < l;i++) {var group=groups[i];this.addGroup(group.start,group.count);}return this;},dispose:function dispose(){this.dispatchEvent({type:'dispose'});}},{drawcalls:{get:function get(){console.error('THREE.BufferGeometry: .drawcalls has been renamed to .groups.');return this.groups;},configurable:true,enumerable:true},offsets:{get:function get(){console.warn('THREE.BufferGeometry: .offsets has been renamed to .groups.');return this.groups;},configurable:true,enumerable:true}});THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype);THREE.BufferGeometry.MaxIndex = 65535; // File:src/core/InstancedBufferGeometry.js
	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 */THREE.InstancedBufferGeometry = function(){THREE.BufferGeometry.call(this);this.type = 'InstancedBufferGeometry';this.maxInstancedCount = undefined;};THREE.InstancedBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);THREE.InstancedBufferGeometry.prototype.constructor = THREE.InstancedBufferGeometry;THREE.InstancedBufferGeometry.prototype.addGroup = function(start,count,instances){this.groups.push({start:start,count:count,instances:instances});};THREE.InstancedBufferGeometry.prototype.copy = function(source){var index=source.index;if(index !== null){this.setIndex(index.clone());}var attributes=source.attributes;for(var name in attributes) {var attribute=attributes[name];this.addAttribute(name,attribute.clone());}var groups=source.groups;for(var i=0,l=groups.length;i < l;i++) {var group=groups[i];this.addGroup(group.start,group.count,group.instances);}return this;};THREE.EventDispatcher.prototype.apply(THREE.InstancedBufferGeometry.prototype); // File:src/cameras/Camera.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author WestLangley / http://github.com/WestLangley
	*/THREE.Camera = function(){THREE.Object3D.call(this);this.type = 'Camera';this.matrixWorldInverse = new THREE.Matrix4();this.projectionMatrix = new THREE.Matrix4();};THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);THREE.Camera.prototype.constructor = THREE.Camera;THREE.Camera.prototype.getWorldDirection = (function(){var quaternion=new THREE.Quaternion();return function(optionalTarget){var result=optionalTarget || new THREE.Vector3();this.getWorldQuaternion(quaternion);return result.set(0,0,-1).applyQuaternion(quaternion);};})();THREE.Camera.prototype.lookAt = (function(){ // This routine does not support cameras with rotated and/or translated parent(s)
	var m1=new THREE.Matrix4();return function(vector){m1.lookAt(this.position,vector,this.up);this.quaternion.setFromRotationMatrix(m1);};})();THREE.Camera.prototype.clone = function(){return new this.constructor().copy(this);};THREE.Camera.prototype.copy = function(source){THREE.Object3D.prototype.copy.call(this,source);this.matrixWorldInverse.copy(source.matrixWorldInverse);this.projectionMatrix.copy(source.projectionMatrix);return this;}; // File:src/cameras/CubeCamera.js
	/**
	 * Camera for rendering cube maps
	 *	- renders scene into axis-aligned cube
	 *
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.CubeCamera = function(near,far,cubeResolution){THREE.Object3D.call(this);this.type = 'CubeCamera';var fov=90,aspect=1;var cameraPX=new THREE.PerspectiveCamera(fov,aspect,near,far);cameraPX.up.set(0,-1,0);cameraPX.lookAt(new THREE.Vector3(1,0,0));this.add(cameraPX);var cameraNX=new THREE.PerspectiveCamera(fov,aspect,near,far);cameraNX.up.set(0,-1,0);cameraNX.lookAt(new THREE.Vector3(-1,0,0));this.add(cameraNX);var cameraPY=new THREE.PerspectiveCamera(fov,aspect,near,far);cameraPY.up.set(0,0,1);cameraPY.lookAt(new THREE.Vector3(0,1,0));this.add(cameraPY);var cameraNY=new THREE.PerspectiveCamera(fov,aspect,near,far);cameraNY.up.set(0,0,-1);cameraNY.lookAt(new THREE.Vector3(0,-1,0));this.add(cameraNY);var cameraPZ=new THREE.PerspectiveCamera(fov,aspect,near,far);cameraPZ.up.set(0,-1,0);cameraPZ.lookAt(new THREE.Vector3(0,0,1));this.add(cameraPZ);var cameraNZ=new THREE.PerspectiveCamera(fov,aspect,near,far);cameraNZ.up.set(0,-1,0);cameraNZ.lookAt(new THREE.Vector3(0,0,-1));this.add(cameraNZ);this.renderTarget = new THREE.WebGLRenderTargetCube(cubeResolution,cubeResolution,{format:THREE.RGBFormat,magFilter:THREE.LinearFilter,minFilter:THREE.LinearFilter});this.updateCubeMap = function(renderer,scene){if(this.parent === null)this.updateMatrixWorld();var renderTarget=this.renderTarget;var generateMipmaps=renderTarget.generateMipmaps;renderTarget.generateMipmaps = false;renderTarget.activeCubeFace = 0;renderer.render(scene,cameraPX,renderTarget);renderTarget.activeCubeFace = 1;renderer.render(scene,cameraNX,renderTarget);renderTarget.activeCubeFace = 2;renderer.render(scene,cameraPY,renderTarget);renderTarget.activeCubeFace = 3;renderer.render(scene,cameraNY,renderTarget);renderTarget.activeCubeFace = 4;renderer.render(scene,cameraPZ,renderTarget);renderTarget.generateMipmaps = generateMipmaps;renderTarget.activeCubeFace = 5;renderer.render(scene,cameraNZ,renderTarget);renderer.setRenderTarget(null);};};THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);THREE.CubeCamera.prototype.constructor = THREE.CubeCamera; // File:src/cameras/OrthographicCamera.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.OrthographicCamera = function(left,right,top,bottom,near,far){THREE.Camera.call(this);this.type = 'OrthographicCamera';this.zoom = 1;this.left = left;this.right = right;this.top = top;this.bottom = bottom;this.near = near !== undefined?near:0.1;this.far = far !== undefined?far:2000;this.updateProjectionMatrix();};THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;THREE.OrthographicCamera.prototype.updateProjectionMatrix = function(){var dx=(this.right - this.left) / (2 * this.zoom);var dy=(this.top - this.bottom) / (2 * this.zoom);var cx=(this.right + this.left) / 2;var cy=(this.top + this.bottom) / 2;this.projectionMatrix.makeOrthographic(cx - dx,cx + dx,cy + dy,cy - dy,this.near,this.far);};THREE.OrthographicCamera.prototype.copy = function(source){THREE.Camera.prototype.copy.call(this,source);this.left = source.left;this.right = source.right;this.top = source.top;this.bottom = source.bottom;this.near = source.near;this.far = source.far;this.zoom = source.zoom;return this;};THREE.OrthographicCamera.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta);data.object.zoom = this.zoom;data.object.left = this.left;data.object.right = this.right;data.object.top = this.top;data.object.bottom = this.bottom;data.object.near = this.near;data.object.far = this.far;return data;}; // File:src/cameras/PerspectiveCamera.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author greggman / http://games.greggman.com/
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 */THREE.PerspectiveCamera = function(fov,aspect,near,far){THREE.Camera.call(this);this.type = 'PerspectiveCamera';this.zoom = 1;this.fov = fov !== undefined?fov:50;this.aspect = aspect !== undefined?aspect:1;this.near = near !== undefined?near:0.1;this.far = far !== undefined?far:2000;this.updateProjectionMatrix();};THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera; /**
	 * Uses Focal Length (in mm) to estimate and set FOV
	 * 35mm (full-frame) camera is used if frame size is not specified;
	 * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
	 */THREE.PerspectiveCamera.prototype.setLens = function(focalLength,frameHeight){if(frameHeight === undefined)frameHeight = 24;this.fov = 2 * THREE.Math.radToDeg(Math.atan(frameHeight / (focalLength * 2)));this.updateProjectionMatrix();}; /**
	 * Sets an offset in a larger frustum. This is useful for multi-window or
	 * multi-monitor/multi-machine setups.
	 *
	 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
	 * the monitors are in grid like this
	 *
	 *   +---+---+---+
	 *   | A | B | C |
	 *   +---+---+---+
	 *   | D | E | F |
	 *   +---+---+---+
	 *
	 * then for each monitor you would call it like this
	 *
	 *   var w = 1920;
	 *   var h = 1080;
	 *   var fullWidth = w * 3;
	 *   var fullHeight = h * 2;
	 *
	 *   --A--
	 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
	 *   --B--
	 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
	 *   --C--
	 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
	 *   --D--
	 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
	 *   --E--
	 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
	 *   --F--
	 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
	 *
	 *   Note there is no reason monitors have to be the same size or in a grid.
	 */THREE.PerspectiveCamera.prototype.setViewOffset = function(fullWidth,fullHeight,x,y,width,height){this.fullWidth = fullWidth;this.fullHeight = fullHeight;this.x = x;this.y = y;this.width = width;this.height = height;this.updateProjectionMatrix();};THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function(){var fov=THREE.Math.radToDeg(2 * Math.atan(Math.tan(THREE.Math.degToRad(this.fov) * 0.5) / this.zoom));if(this.fullWidth){var aspect=this.fullWidth / this.fullHeight;var top=Math.tan(THREE.Math.degToRad(fov * 0.5)) * this.near;var bottom=-top;var left=aspect * bottom;var right=aspect * top;var width=Math.abs(right - left);var height=Math.abs(top - bottom);this.projectionMatrix.makeFrustum(left + this.x * width / this.fullWidth,left + (this.x + this.width) * width / this.fullWidth,top - (this.y + this.height) * height / this.fullHeight,top - this.y * height / this.fullHeight,this.near,this.far);}else {this.projectionMatrix.makePerspective(fov,this.aspect,this.near,this.far);}};THREE.PerspectiveCamera.prototype.copy = function(source){THREE.Camera.prototype.copy.call(this,source);this.fov = source.fov;this.aspect = source.aspect;this.near = source.near;this.far = source.far;this.zoom = source.zoom;return this;};THREE.PerspectiveCamera.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta);data.object.zoom = this.zoom;data.object.fov = this.fov;data.object.aspect = this.aspect;data.object.near = this.near;data.object.far = this.far;return data;}; // File:src/lights/Light.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Light = function(color){THREE.Object3D.call(this);this.type = 'Light';this.color = new THREE.Color(color);};THREE.Light.prototype = Object.create(THREE.Object3D.prototype);THREE.Light.prototype.constructor = THREE.Light;THREE.Light.prototype.copy = function(source){THREE.Object3D.prototype.copy.call(this,source);this.color.copy(source.color);return this;}; // File:src/lights/AmbientLight.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.AmbientLight = function(color){THREE.Light.call(this,color);this.type = 'AmbientLight';};THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;THREE.AmbientLight.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta);data.object.color = this.color.getHex();return data;}; // File:src/lights/DirectionalLight.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.DirectionalLight = function(color,intensity){THREE.Light.call(this,color);this.type = 'DirectionalLight';this.position.set(0,1,0);this.updateMatrix();this.target = new THREE.Object3D();this.intensity = intensity !== undefined?intensity:1;this.castShadow = false;this.onlyShadow = false;this.shadowCameraNear = 50;this.shadowCameraFar = 5000;this.shadowCameraLeft = -500;this.shadowCameraRight = 500;this.shadowCameraTop = 500;this.shadowCameraBottom = -500;this.shadowCameraVisible = false;this.shadowBias = 0;this.shadowDarkness = 0.5;this.shadowMapWidth = 512;this.shadowMapHeight = 512;this.shadowMap = null;this.shadowMapSize = null;this.shadowCamera = null;this.shadowMatrix = null;};THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;THREE.DirectionalLight.prototype.copy = function(source){THREE.Light.prototype.copy.call(this,source);this.intensity = source.intensity;this.target = source.target.clone();this.castShadow = source.castShadow;this.onlyShadow = source.onlyShadow;this.shadowCameraNear = source.shadowCameraNear;this.shadowCameraFar = source.shadowCameraFar;this.shadowCameraLeft = source.shadowCameraLeft;this.shadowCameraRight = source.shadowCameraRight;this.shadowCameraTop = source.shadowCameraTop;this.shadowCameraBottom = source.shadowCameraBottom;this.shadowCameraVisible = source.shadowCameraVisible;this.shadowBias = source.shadowBias;this.shadowDarkness = source.shadowDarkness;this.shadowMapWidth = source.shadowMapWidth;this.shadowMapHeight = source.shadowMapHeight;return this;};THREE.DirectionalLight.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta);data.object.color = this.color.getHex();data.object.intensity = this.intensity;return data;}; // File:src/lights/HemisphereLight.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.HemisphereLight = function(skyColor,groundColor,intensity){THREE.Light.call(this,skyColor);this.type = 'HemisphereLight';this.position.set(0,1,0);this.updateMatrix();this.groundColor = new THREE.Color(groundColor);this.intensity = intensity !== undefined?intensity:1;};THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);THREE.HemisphereLight.prototype.constructor = THREE.HemisphereLight;THREE.HemisphereLight.prototype.copy = function(source){THREE.Light.prototype.copy.call(this,source);this.groundColor.copy(source.groundColor);this.intensity = source.intensity;return this;};THREE.HemisphereLight.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta);data.object.color = this.color.getHex();data.object.groundColor = this.groundColor.getHex();data.object.intensity = this.intensity;return data;}; // File:src/lights/PointLight.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.PointLight = function(color,intensity,distance,decay){THREE.Light.call(this,color);this.type = 'PointLight';this.intensity = intensity !== undefined?intensity:1;this.distance = distance !== undefined?distance:0;this.decay = decay !== undefined?decay:1; // for physically correct lights, should be 2.
	};THREE.PointLight.prototype = Object.create(THREE.Light.prototype);THREE.PointLight.prototype.constructor = THREE.PointLight;THREE.PointLight.prototype.copy = function(source){THREE.Light.prototype.copy.call(this,source);this.intensity = source.intensity;this.distance = source.distance;this.decay = source.decay;return this;};THREE.PointLight.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta);data.object.color = this.color.getHex();data.object.intensity = this.intensity;data.object.distance = this.distance;data.object.decay = this.decay;return data;}; // File:src/lights/SpotLight.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.SpotLight = function(color,intensity,distance,angle,exponent,decay){THREE.Light.call(this,color);this.type = 'SpotLight';this.position.set(0,1,0);this.updateMatrix();this.target = new THREE.Object3D();this.intensity = intensity !== undefined?intensity:1;this.distance = distance !== undefined?distance:0;this.angle = angle !== undefined?angle:Math.PI / 3;this.exponent = exponent !== undefined?exponent:10;this.decay = decay !== undefined?decay:1; // for physically correct lights, should be 2.
	this.castShadow = false;this.onlyShadow = false;this.shadowCameraNear = 50;this.shadowCameraFar = 5000;this.shadowCameraFov = 50;this.shadowCameraVisible = false;this.shadowBias = 0;this.shadowDarkness = 0.5;this.shadowMapWidth = 512;this.shadowMapHeight = 512;this.shadowMap = null;this.shadowMapSize = null;this.shadowCamera = null;this.shadowMatrix = null;};THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);THREE.SpotLight.prototype.constructor = THREE.SpotLight;THREE.SpotLight.prototype.copy = function(source){THREE.Light.prototype.copy.call(this,source);this.intensity = source.intensity;this.distance = source.distance;this.angle = source.angle;this.exponent = source.exponent;this.decay = source.decay;this.target = source.target.clone();this.castShadow = source.castShadow;this.onlyShadow = source.onlyShadow;this.shadowCameraNear = source.shadowCameraNear;this.shadowCameraFar = source.shadowCameraFar;this.shadowCameraFov = source.shadowCameraFov;this.shadowCameraVisible = source.shadowCameraVisible;this.shadowBias = source.shadowBias;this.shadowDarkness = source.shadowDarkness;this.shadowMapWidth = source.shadowMapWidth;this.shadowMapHeight = source.shadowMapHeight;return this;};THREE.SpotLight.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta);data.object.color = this.color.getHex();data.object.intensity = this.intensity;data.object.distance = this.distance;data.object.angle = this.angle;data.object.exponent = this.exponent;data.object.decay = this.decay;return data;}; // File:src/loaders/Cache.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Cache = {enabled:false,files:{},add:function add(key,file){if(this.enabled === false)return; // console.log( 'THREE.Cache', 'Adding key:', key );
	this.files[key] = file;},get:function get(key){if(this.enabled === false)return; // console.log( 'THREE.Cache', 'Checking key:', key );
	return this.files[key];},remove:function remove(key){delete this.files[key];},clear:function clear(){this.files = {};}}; // File:src/loaders/Loader.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Loader = function(){this.onLoadStart = function(){};this.onLoadProgress = function(){};this.onLoadComplete = function(){};};THREE.Loader.prototype = {constructor:THREE.Loader,crossOrigin:undefined,extractUrlBase:function extractUrlBase(url){var parts=url.split('/');if(parts.length === 1)return './';parts.pop();return parts.join('/') + '/';},initMaterials:function initMaterials(materials,texturePath,crossOrigin){var array=[];for(var i=0;i < materials.length;++i) {array[i] = this.createMaterial(materials[i],texturePath,crossOrigin);}return array;},createMaterial:(function(){var imageLoader;return function createMaterial(m,texturePath,crossOrigin){var scope=this;if(crossOrigin === undefined && scope.crossOrigin !== undefined)crossOrigin = scope.crossOrigin;if(imageLoader === undefined)imageLoader = new THREE.ImageLoader();function nearest_pow2(n){var l=Math.log(n) / Math.LN2;return Math.pow(2,Math.round(l));}function create_texture(where,name,sourceFile,repeat,offset,wrap,anisotropy){var fullPath=texturePath + sourceFile;var texture;var loader=THREE.Loader.Handlers.get(fullPath);if(loader !== null){texture = loader.load(fullPath);}else {texture = new THREE.Texture();loader = imageLoader;loader.setCrossOrigin(crossOrigin);loader.load(fullPath,function(image){if(THREE.Math.isPowerOfTwo(image.width) === false || THREE.Math.isPowerOfTwo(image.height) === false){var width=nearest_pow2(image.width);var height=nearest_pow2(image.height);var canvas=document.createElement('canvas');canvas.width = width;canvas.height = height;var context=canvas.getContext('2d');context.drawImage(image,0,0,width,height);texture.image = canvas;}else {texture.image = image;}texture.needsUpdate = true;});}texture.sourceFile = sourceFile;if(repeat){texture.repeat.set(repeat[0],repeat[1]);if(repeat[0] !== 1)texture.wrapS = THREE.RepeatWrapping;if(repeat[1] !== 1)texture.wrapT = THREE.RepeatWrapping;}if(offset){texture.offset.set(offset[0],offset[1]);}if(wrap){var wrapMap={'repeat':THREE.RepeatWrapping,'mirror':THREE.MirroredRepeatWrapping};if(wrapMap[wrap[0]] !== undefined)texture.wrapS = wrapMap[wrap[0]];if(wrapMap[wrap[1]] !== undefined)texture.wrapT = wrapMap[wrap[1]];}if(anisotropy){texture.anisotropy = anisotropy;}where[name] = texture;}function rgb2hex(rgb){return (rgb[0] * 255 << 16) + (rgb[1] * 255 << 8) + rgb[2] * 255;} // defaults
	var mtype='MeshLambertMaterial';var mpars={}; // parameters from model file
	if(m.shading){var shading=m.shading.toLowerCase();if(shading === 'phong')mtype = 'MeshPhongMaterial';else if(shading === 'basic')mtype = 'MeshBasicMaterial';}if(m.blending !== undefined && THREE[m.blending] !== undefined){mpars.blending = THREE[m.blending];}if(m.transparent !== undefined){mpars.transparent = m.transparent;}if(m.opacity !== undefined && m.opacity < 1.0){mpars.transparent = true;}if(m.depthTest !== undefined){mpars.depthTest = m.depthTest;}if(m.depthWrite !== undefined){mpars.depthWrite = m.depthWrite;}if(m.visible !== undefined){mpars.visible = m.visible;}if(m.flipSided !== undefined){mpars.side = THREE.BackSide;}if(m.doubleSided !== undefined){mpars.side = THREE.DoubleSide;}if(m.wireframe !== undefined){mpars.wireframe = m.wireframe;}if(m.vertexColors !== undefined){if(m.vertexColors === 'face'){mpars.vertexColors = THREE.FaceColors;}else if(m.vertexColors){mpars.vertexColors = THREE.VertexColors;}} // colors
	if(m.colorDiffuse){mpars.color = rgb2hex(m.colorDiffuse);}else if(m.DbgColor){mpars.color = m.DbgColor;}if(m.colorEmissive){mpars.emissive = rgb2hex(m.colorEmissive);}if(mtype === 'MeshPhongMaterial'){if(m.colorSpecular){mpars.specular = rgb2hex(m.colorSpecular);}if(m.specularCoef){mpars.shininess = m.specularCoef;}} // modifiers
	if(m.transparency !== undefined){console.warn('THREE.Loader: transparency has been renamed to opacity');m.opacity = m.transparency;}if(m.opacity !== undefined){mpars.opacity = m.opacity;} // textures
	if(texturePath){if(m.mapDiffuse){create_texture(mpars,'map',m.mapDiffuse,m.mapDiffuseRepeat,m.mapDiffuseOffset,m.mapDiffuseWrap,m.mapDiffuseAnisotropy);}if(m.mapLight){create_texture(mpars,'lightMap',m.mapLight,m.mapLightRepeat,m.mapLightOffset,m.mapLightWrap,m.mapLightAnisotropy);}if(m.mapAO){create_texture(mpars,'aoMap',m.mapAO,m.mapAORepeat,m.mapAOOffset,m.mapAOWrap,m.mapAOAnisotropy);}if(m.mapBump){create_texture(mpars,'bumpMap',m.mapBump,m.mapBumpRepeat,m.mapBumpOffset,m.mapBumpWrap,m.mapBumpAnisotropy);}if(m.mapNormal){create_texture(mpars,'normalMap',m.mapNormal,m.mapNormalRepeat,m.mapNormalOffset,m.mapNormalWrap,m.mapNormalAnisotropy);}if(m.mapSpecular){create_texture(mpars,'specularMap',m.mapSpecular,m.mapSpecularRepeat,m.mapSpecularOffset,m.mapSpecularWrap,m.mapSpecularAnisotropy);}if(m.mapAlpha){create_texture(mpars,'alphaMap',m.mapAlpha,m.mapAlphaRepeat,m.mapAlphaOffset,m.mapAlphaWrap,m.mapAlphaAnisotropy);}} //
	if(m.mapBumpScale){mpars.bumpScale = m.mapBumpScale;}if(m.mapNormalFactor){mpars.normalScale = new THREE.Vector2(m.mapNormalFactor,m.mapNormalFactor);}var material=new THREE[mtype](mpars);if(m.DbgName !== undefined)material.name = m.DbgName;return material;};})()};THREE.Loader.Handlers = {handlers:[],add:function add(regex,loader){this.handlers.push(regex,loader);},get:function get(file){for(var i=0,l=this.handlers.length;i < l;i += 2) {var regex=this.handlers[i];var loader=this.handlers[i + 1];if(regex.test(file)){return loader;}}return null;}}; // File:src/loaders/XHRLoader.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.XHRLoader = function(manager){this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager;};THREE.XHRLoader.prototype = {constructor:THREE.XHRLoader,load:function load(url,onLoad,onProgress,onError){var scope=this;var cached=THREE.Cache.get(url);if(cached !== undefined){if(onLoad){setTimeout(function(){onLoad(cached);},0);}return cached;}var request=new XMLHttpRequest();request.open('GET',url,true);request.addEventListener('load',function(event){THREE.Cache.add(url,this.response);if(onLoad)onLoad(this.response);scope.manager.itemEnd(url);},false);if(onProgress !== undefined){request.addEventListener('progress',function(event){onProgress(event);},false);}request.addEventListener('error',function(event){if(onError)onError(event);scope.manager.itemError(url);},false);if(this.crossOrigin !== undefined)request.crossOrigin = this.crossOrigin;if(this.responseType !== undefined)request.responseType = this.responseType;if(this.withCredentials !== undefined)request.withCredentials = this.withCredentials;request.send(null);scope.manager.itemStart(url);return request;},setResponseType:function setResponseType(value){this.responseType = value;},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;},setWithCredentials:function setWithCredentials(value){this.withCredentials = value;}}; // File:src/loaders/ImageLoader.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.ImageLoader = function(manager){this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager;};THREE.ImageLoader.prototype = {constructor:THREE.ImageLoader,load:function load(url,onLoad,onProgress,onError){var scope=this;var cached=THREE.Cache.get(url);if(cached !== undefined){if(onLoad){setTimeout(function(){onLoad(cached);},0);}return cached;}var image=document.createElement('img');image.addEventListener('load',function(event){THREE.Cache.add(url,this);if(onLoad)onLoad(this);scope.manager.itemEnd(url);},false);if(onProgress !== undefined){image.addEventListener('progress',function(event){onProgress(event);},false);}image.addEventListener('error',function(event){if(onError)onError(event);scope.manager.itemError(url);},false);if(this.crossOrigin !== undefined)image.crossOrigin = this.crossOrigin;scope.manager.itemStart(url);image.src = url;return image;},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;}}; // File:src/loaders/JSONLoader.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.JSONLoader = function(manager){if(typeof manager === 'boolean'){console.warn('THREE.JSONLoader: showStatus parameter has been removed from constructor.');manager = undefined;}this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager;this.withCredentials = false;};THREE.JSONLoader.prototype = Object.defineProperties({constructor:THREE.JSONLoader,load:function load(url,onLoad,onProgress,onError){var scope=this;var texturePath=this.texturePath && typeof this.texturePath === "string"?this.texturePath:THREE.Loader.prototype.extractUrlBase(url);var loader=new THREE.XHRLoader(this.manager);loader.setCrossOrigin(this.crossOrigin);loader.setWithCredentials(this.withCredentials);loader.load(url,function(text){var json=JSON.parse(text);var metadata=json.metadata;if(metadata !== undefined){if(metadata.type === 'object'){console.error('THREE.JSONLoader: ' + url + ' should be loaded with THREE.ObjectLoader instead.');return;}if(metadata.type === 'scene'){console.error('THREE.JSONLoader: ' + url + ' should be loaded with THREE.SceneLoader instead.');return;}}var object=scope.parse(json,texturePath);onLoad(object.geometry,object.materials);});},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;},setTexturePath:function setTexturePath(value){this.texturePath = value;},parse:function parse(json,texturePath){var geometry=new THREE.Geometry(),scale=json.scale !== undefined?1.0 / json.scale:1.0;parseModel(scale);parseSkin();parseMorphing(scale);geometry.computeFaceNormals();geometry.computeBoundingSphere();function parseModel(scale){function isBitSet(value,position){return value & 1 << position;}var i,j,fi,offset,zLength,colorIndex,normalIndex,uvIndex,materialIndex,type,isQuad,hasMaterial,hasFaceVertexUv,hasFaceNormal,hasFaceVertexNormal,hasFaceColor,hasFaceVertexColor,vertex,face,faceA,faceB,hex,normal,uvLayer,uv,u,v,faces=json.faces,vertices=json.vertices,normals=json.normals,colors=json.colors,nUvLayers=0;if(json.uvs !== undefined){ // disregard empty arrays
	for(i = 0;i < json.uvs.length;i++) {if(json.uvs[i].length)nUvLayers++;}for(i = 0;i < nUvLayers;i++) {geometry.faceVertexUvs[i] = [];}}offset = 0;zLength = vertices.length;while(offset < zLength) {vertex = new THREE.Vector3();vertex.x = vertices[offset++] * scale;vertex.y = vertices[offset++] * scale;vertex.z = vertices[offset++] * scale;geometry.vertices.push(vertex);}offset = 0;zLength = faces.length;while(offset < zLength) {type = faces[offset++];isQuad = isBitSet(type,0);hasMaterial = isBitSet(type,1);hasFaceVertexUv = isBitSet(type,3);hasFaceNormal = isBitSet(type,4);hasFaceVertexNormal = isBitSet(type,5);hasFaceColor = isBitSet(type,6);hasFaceVertexColor = isBitSet(type,7); // console.log("type", type, "bits", isQuad, hasMaterial, hasFaceVertexUv, hasFaceNormal, hasFaceVertexNormal, hasFaceColor, hasFaceVertexColor);
	if(isQuad){faceA = new THREE.Face3();faceA.a = faces[offset];faceA.b = faces[offset + 1];faceA.c = faces[offset + 3];faceB = new THREE.Face3();faceB.a = faces[offset + 1];faceB.b = faces[offset + 2];faceB.c = faces[offset + 3];offset += 4;if(hasMaterial){materialIndex = faces[offset++];faceA.materialIndex = materialIndex;faceB.materialIndex = materialIndex;} // to get face <=> uv index correspondence
	fi = geometry.faces.length;if(hasFaceVertexUv){for(i = 0;i < nUvLayers;i++) {uvLayer = json.uvs[i];geometry.faceVertexUvs[i][fi] = [];geometry.faceVertexUvs[i][fi + 1] = [];for(j = 0;j < 4;j++) {uvIndex = faces[offset++];u = uvLayer[uvIndex * 2];v = uvLayer[uvIndex * 2 + 1];uv = new THREE.Vector2(u,v);if(j !== 2)geometry.faceVertexUvs[i][fi].push(uv);if(j !== 0)geometry.faceVertexUvs[i][fi + 1].push(uv);}}}if(hasFaceNormal){normalIndex = faces[offset++] * 3;faceA.normal.set(normals[normalIndex++],normals[normalIndex++],normals[normalIndex]);faceB.normal.copy(faceA.normal);}if(hasFaceVertexNormal){for(i = 0;i < 4;i++) {normalIndex = faces[offset++] * 3;normal = new THREE.Vector3(normals[normalIndex++],normals[normalIndex++],normals[normalIndex]);if(i !== 2)faceA.vertexNormals.push(normal);if(i !== 0)faceB.vertexNormals.push(normal);}}if(hasFaceColor){colorIndex = faces[offset++];hex = colors[colorIndex];faceA.color.setHex(hex);faceB.color.setHex(hex);}if(hasFaceVertexColor){for(i = 0;i < 4;i++) {colorIndex = faces[offset++];hex = colors[colorIndex];if(i !== 2)faceA.vertexColors.push(new THREE.Color(hex));if(i !== 0)faceB.vertexColors.push(new THREE.Color(hex));}}geometry.faces.push(faceA);geometry.faces.push(faceB);}else {face = new THREE.Face3();face.a = faces[offset++];face.b = faces[offset++];face.c = faces[offset++];if(hasMaterial){materialIndex = faces[offset++];face.materialIndex = materialIndex;} // to get face <=> uv index correspondence
	fi = geometry.faces.length;if(hasFaceVertexUv){for(i = 0;i < nUvLayers;i++) {uvLayer = json.uvs[i];geometry.faceVertexUvs[i][fi] = [];for(j = 0;j < 3;j++) {uvIndex = faces[offset++];u = uvLayer[uvIndex * 2];v = uvLayer[uvIndex * 2 + 1];uv = new THREE.Vector2(u,v);geometry.faceVertexUvs[i][fi].push(uv);}}}if(hasFaceNormal){normalIndex = faces[offset++] * 3;face.normal.set(normals[normalIndex++],normals[normalIndex++],normals[normalIndex]);}if(hasFaceVertexNormal){for(i = 0;i < 3;i++) {normalIndex = faces[offset++] * 3;normal = new THREE.Vector3(normals[normalIndex++],normals[normalIndex++],normals[normalIndex]);face.vertexNormals.push(normal);}}if(hasFaceColor){colorIndex = faces[offset++];face.color.setHex(colors[colorIndex]);}if(hasFaceVertexColor){for(i = 0;i < 3;i++) {colorIndex = faces[offset++];face.vertexColors.push(new THREE.Color(colors[colorIndex]));}}geometry.faces.push(face);}}};function parseSkin(){var influencesPerVertex=json.influencesPerVertex !== undefined?json.influencesPerVertex:2;if(json.skinWeights){for(var i=0,l=json.skinWeights.length;i < l;i += influencesPerVertex) {var x=json.skinWeights[i];var y=influencesPerVertex > 1?json.skinWeights[i + 1]:0;var z=influencesPerVertex > 2?json.skinWeights[i + 2]:0;var w=influencesPerVertex > 3?json.skinWeights[i + 3]:0;geometry.skinWeights.push(new THREE.Vector4(x,y,z,w));}}if(json.skinIndices){for(var i=0,l=json.skinIndices.length;i < l;i += influencesPerVertex) {var a=json.skinIndices[i];var b=influencesPerVertex > 1?json.skinIndices[i + 1]:0;var c=influencesPerVertex > 2?json.skinIndices[i + 2]:0;var d=influencesPerVertex > 3?json.skinIndices[i + 3]:0;geometry.skinIndices.push(new THREE.Vector4(a,b,c,d));}}geometry.bones = json.bones;if(geometry.bones && geometry.bones.length > 0 && (geometry.skinWeights.length !== geometry.skinIndices.length || geometry.skinIndices.length !== geometry.vertices.length)){console.warn('When skinning, number of vertices (' + geometry.vertices.length + '), skinIndices (' + geometry.skinIndices.length + '), and skinWeights (' + geometry.skinWeights.length + ') should match.');} // could change this to json.animations[0] or remove completely
	geometry.animation = json.animation;geometry.animations = json.animations;};function parseMorphing(scale){if(json.morphTargets !== undefined){var i,l,v,vl,dstVertices,srcVertices;for(i = 0,l = json.morphTargets.length;i < l;i++) {geometry.morphTargets[i] = {};geometry.morphTargets[i].name = json.morphTargets[i].name;geometry.morphTargets[i].vertices = [];dstVertices = geometry.morphTargets[i].vertices;srcVertices = json.morphTargets[i].vertices;for(v = 0,vl = srcVertices.length;v < vl;v += 3) {var vertex=new THREE.Vector3();vertex.x = srcVertices[v] * scale;vertex.y = srcVertices[v + 1] * scale;vertex.z = srcVertices[v + 2] * scale;dstVertices.push(vertex);}}}if(json.morphColors !== undefined){var i,l,c,cl,dstColors,srcColors,color;for(i = 0,l = json.morphColors.length;i < l;i++) {geometry.morphColors[i] = {};geometry.morphColors[i].name = json.morphColors[i].name;geometry.morphColors[i].colors = [];dstColors = geometry.morphColors[i].colors;srcColors = json.morphColors[i].colors;for(c = 0,cl = srcColors.length;c < cl;c += 3) {color = new THREE.Color(0xffaa00);color.setRGB(srcColors[c],srcColors[c + 1],srcColors[c + 2]);dstColors.push(color);}}}};if(json.materials === undefined || json.materials.length === 0){return {geometry:geometry};}else {var materials=THREE.Loader.prototype.initMaterials(json.materials,texturePath,this.crossOrigin);return {geometry:geometry,materials:materials};}}},{statusDomElement:{ // Deprecated
	get:function get(){if(this._statusDomElement === undefined){this._statusDomElement = document.createElement('div');}console.warn('THREE.JSONLoader: .statusDomElement has been removed.');return this._statusDomElement;},configurable:true,enumerable:true}}); // File:src/loaders/LoadingManager.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.LoadingManager = function(onLoad,onProgress,onError){var scope=this;var isLoading=false,itemsLoaded=0,itemsTotal=0;this.onStart = undefined;this.onLoad = onLoad;this.onProgress = onProgress;this.onError = onError;this.itemStart = function(url){itemsTotal++;if(isLoading === false){if(scope.onStart !== undefined){scope.onStart(url,itemsLoaded,itemsTotal);}}isLoading = true;};this.itemEnd = function(url){itemsLoaded++;if(scope.onProgress !== undefined){scope.onProgress(url,itemsLoaded,itemsTotal);}if(itemsLoaded === itemsTotal){isLoading = false;if(scope.onLoad !== undefined){scope.onLoad();}}};this.itemError = function(url){if(scope.onError !== undefined){scope.onError(url);}};};THREE.DefaultLoadingManager = new THREE.LoadingManager(); // File:src/loaders/BufferGeometryLoader.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.BufferGeometryLoader = function(manager){this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager;};THREE.BufferGeometryLoader.prototype = {constructor:THREE.BufferGeometryLoader,load:function load(url,onLoad,onProgress,onError){var scope=this;var loader=new THREE.XHRLoader(scope.manager);loader.setCrossOrigin(this.crossOrigin);loader.load(url,function(text){onLoad(scope.parse(JSON.parse(text)));},onProgress,onError);},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;},parse:function parse(json){var geometry=new THREE.BufferGeometry();var index=json.data.index;if(index !== undefined){var typedArray=new self[index.type](index.array);geometry.setIndex(new THREE.BufferAttribute(typedArray,1));}var attributes=json.data.attributes;for(var key in attributes) {var attribute=attributes[key];var typedArray=new self[attribute.type](attribute.array);geometry.addAttribute(key,new THREE.BufferAttribute(typedArray,attribute.itemSize));}var groups=json.data.groups || json.data.drawcalls || json.data.offsets;if(groups !== undefined){for(var i=0,n=groups.length;i !== n;++i) {var group=groups[i];geometry.addGroup(group.start,group.count);}}var boundingSphere=json.data.boundingSphere;if(boundingSphere !== undefined){var center=new THREE.Vector3();if(boundingSphere.center !== undefined){center.fromArray(boundingSphere.center);}geometry.boundingSphere = new THREE.Sphere(center,boundingSphere.radius);}return geometry;}}; // File:src/loaders/MaterialLoader.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.MaterialLoader = function(manager){this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager;this.textures = {};};THREE.MaterialLoader.prototype = {constructor:THREE.MaterialLoader,load:function load(url,onLoad,onProgress,onError){var scope=this;var loader=new THREE.XHRLoader(scope.manager);loader.setCrossOrigin(this.crossOrigin);loader.load(url,function(text){onLoad(scope.parse(JSON.parse(text)));},onProgress,onError);},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;},setTextures:function setTextures(value){this.textures = value;},getTexture:function getTexture(name){var textures=this.textures;if(textures[name] === undefined){console.warn('THREE.MaterialLoader: Undefined texture',name);}return textures[name];},parse:function parse(json){var material=new THREE[json.type]();material.uuid = json.uuid;if(json.name !== undefined)material.name = json.name;if(json.color !== undefined)material.color.setHex(json.color);if(json.emissive !== undefined)material.emissive.setHex(json.emissive);if(json.specular !== undefined)material.specular.setHex(json.specular);if(json.shininess !== undefined)material.shininess = json.shininess;if(json.uniforms !== undefined)material.uniforms = json.uniforms;if(json.vertexShader !== undefined)material.vertexShader = json.vertexShader;if(json.fragmentShader !== undefined)material.fragmentShader = json.fragmentShader;if(json.vertexColors !== undefined)material.vertexColors = json.vertexColors;if(json.shading !== undefined)material.shading = json.shading;if(json.blending !== undefined)material.blending = json.blending;if(json.side !== undefined)material.side = json.side;if(json.opacity !== undefined)material.opacity = json.opacity;if(json.transparent !== undefined)material.transparent = json.transparent;if(json.alphaTest !== undefined)material.alphaTest = json.alphaTest;if(json.depthTest !== undefined)material.depthTest = json.depthTest;if(json.depthWrite !== undefined)material.depthWrite = json.depthWrite;if(json.wireframe !== undefined)material.wireframe = json.wireframe;if(json.wireframeLinewidth !== undefined)material.wireframeLinewidth = json.wireframeLinewidth; // for PointsMaterial
	if(json.size !== undefined)material.size = json.size;if(json.sizeAttenuation !== undefined)material.sizeAttenuation = json.sizeAttenuation; // maps
	if(json.map !== undefined)material.map = this.getTexture(json.map);if(json.alphaMap !== undefined){material.alphaMap = this.getTexture(json.alphaMap);material.transparent = true;}if(json.bumpMap !== undefined)material.bumpMap = this.getTexture(json.bumpMap);if(json.bumpScale !== undefined)material.bumpScale = json.bumpScale;if(json.normalMap !== undefined)material.normalMap = this.getTexture(json.normalMap);if(json.normalScale)material.normalScale = new THREE.Vector2(json.normalScale,json.normalScale);if(json.displacementMap !== undefined)material.displacementMap = this.getTexture(json.displacementMap);if(json.displacementScale !== undefined)material.displacementScale = json.displacementScale;if(json.displacementBias !== undefined)material.displacementBias = json.displacementBias;if(json.specularMap !== undefined)material.specularMap = this.getTexture(json.specularMap);if(json.envMap !== undefined){material.envMap = this.getTexture(json.envMap);material.combine = THREE.MultiplyOperation;}if(json.reflectivity)material.reflectivity = json.reflectivity;if(json.lightMap !== undefined)material.lightMap = this.getTexture(json.lightMap);if(json.lightMapIntensity !== undefined)material.lightMapIntensity = json.lightMapIntensity;if(json.aoMap !== undefined)material.aoMap = this.getTexture(json.aoMap);if(json.aoMapIntensity !== undefined)material.aoMapIntensity = json.aoMapIntensity; // MeshFaceMaterial
	if(json.materials !== undefined){for(var i=0,l=json.materials.length;i < l;i++) {material.materials.push(this.parse(json.materials[i]));}}return material;}}; // File:src/loaders/ObjectLoader.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.ObjectLoader = function(manager){this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager;this.texturePath = '';};THREE.ObjectLoader.prototype = {constructor:THREE.ObjectLoader,load:function load(url,onLoad,onProgress,onError){if(this.texturePath === ''){this.texturePath = url.substring(0,url.lastIndexOf('/') + 1);}var scope=this;var loader=new THREE.XHRLoader(scope.manager);loader.setCrossOrigin(this.crossOrigin);loader.load(url,function(text){scope.parse(JSON.parse(text),onLoad);},onProgress,onError);},setTexturePath:function setTexturePath(value){this.texturePath = value;},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;},parse:function parse(json,onLoad){var geometries=this.parseGeometries(json.geometries);var images=this.parseImages(json.images,function(){if(onLoad !== undefined)onLoad(object);});var textures=this.parseTextures(json.textures,images);var materials=this.parseMaterials(json.materials,textures);var object=this.parseObject(json.object,geometries,materials);if(json.images === undefined || json.images.length === 0){if(onLoad !== undefined)onLoad(object);}return object;},parseGeometries:function parseGeometries(json){var geometries={};if(json !== undefined){var geometryLoader=new THREE.JSONLoader();var bufferGeometryLoader=new THREE.BufferGeometryLoader();for(var i=0,l=json.length;i < l;i++) {var geometry;var data=json[i];switch(data.type){case 'PlaneGeometry':case 'PlaneBufferGeometry':geometry = new THREE[data.type](data.width,data.height,data.widthSegments,data.heightSegments);break;case 'BoxGeometry':case 'CubeGeometry': // backwards compatible
	geometry = new THREE.BoxGeometry(data.width,data.height,data.depth,data.widthSegments,data.heightSegments,data.depthSegments);break;case 'CircleBufferGeometry':geometry = new THREE.CircleBufferGeometry(data.radius,data.segments,data.thetaStart,data.thetaLength);break;case 'CircleGeometry':geometry = new THREE.CircleGeometry(data.radius,data.segments,data.thetaStart,data.thetaLength);break;case 'CylinderGeometry':geometry = new THREE.CylinderGeometry(data.radiusTop,data.radiusBottom,data.height,data.radialSegments,data.heightSegments,data.openEnded,data.thetaStart,data.thetaLength);break;case 'SphereGeometry':geometry = new THREE.SphereGeometry(data.radius,data.widthSegments,data.heightSegments,data.phiStart,data.phiLength,data.thetaStart,data.thetaLength);break;case 'SphereBufferGeometry':geometry = new THREE.SphereBufferGeometry(data.radius,data.widthSegments,data.heightSegments,data.phiStart,data.phiLength,data.thetaStart,data.thetaLength);break;case 'DodecahedronGeometry':geometry = new THREE.DodecahedronGeometry(data.radius,data.detail);break;case 'IcosahedronGeometry':geometry = new THREE.IcosahedronGeometry(data.radius,data.detail);break;case 'OctahedronGeometry':geometry = new THREE.OctahedronGeometry(data.radius,data.detail);break;case 'TetrahedronGeometry':geometry = new THREE.TetrahedronGeometry(data.radius,data.detail);break;case 'RingGeometry':geometry = new THREE.RingGeometry(data.innerRadius,data.outerRadius,data.thetaSegments,data.phiSegments,data.thetaStart,data.thetaLength);break;case 'TorusGeometry':geometry = new THREE.TorusGeometry(data.radius,data.tube,data.radialSegments,data.tubularSegments,data.arc);break;case 'TorusKnotGeometry':geometry = new THREE.TorusKnotGeometry(data.radius,data.tube,data.radialSegments,data.tubularSegments,data.p,data.q,data.heightScale);break;case 'TextGeometry':geometry = new THREE.TextGeometry(data.text,data.data);break;case 'BufferGeometry':geometry = bufferGeometryLoader.parse(data);break;case 'Geometry':geometry = geometryLoader.parse(data.data,this.texturePath).geometry;break;default:console.warn('THREE.ObjectLoader: Unsupported geometry type "' + data.type + '"');continue;}geometry.uuid = data.uuid;if(data.name !== undefined)geometry.name = data.name;geometries[data.uuid] = geometry;}}return geometries;},parseMaterials:function parseMaterials(json,textures){var materials={};if(json !== undefined){var loader=new THREE.MaterialLoader();loader.setTextures(textures);for(var i=0,l=json.length;i < l;i++) {var material=loader.parse(json[i]);materials[material.uuid] = material;}}return materials;},parseImages:function parseImages(json,onLoad){var scope=this;var images={};function loadImage(url){scope.manager.itemStart(url);return loader.load(url,function(){scope.manager.itemEnd(url);});}if(json !== undefined && json.length > 0){var manager=new THREE.LoadingManager(onLoad);var loader=new THREE.ImageLoader(manager);loader.setCrossOrigin(this.crossOrigin);for(var i=0,l=json.length;i < l;i++) {var image=json[i];var path=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(image.url)?image.url:scope.texturePath + image.url;images[image.uuid] = loadImage(path);}}return images;},parseTextures:function parseTextures(json,images){function parseConstant(value){if(typeof value === 'number')return value;console.warn('THREE.ObjectLoader.parseTexture: Constant should be in numeric form.',value);return THREE[value];}var textures={};if(json !== undefined){for(var i=0,l=json.length;i < l;i++) {var data=json[i];if(data.image === undefined){console.warn('THREE.ObjectLoader: No "image" specified for',data.uuid);}if(images[data.image] === undefined){console.warn('THREE.ObjectLoader: Undefined image',data.image);}var texture=new THREE.Texture(images[data.image]);texture.needsUpdate = true;texture.uuid = data.uuid;if(data.name !== undefined)texture.name = data.name;if(data.mapping !== undefined)texture.mapping = parseConstant(data.mapping);if(data.offset !== undefined)texture.offset = new THREE.Vector2(data.offset[0],data.offset[1]);if(data.repeat !== undefined)texture.repeat = new THREE.Vector2(data.repeat[0],data.repeat[1]);if(data.minFilter !== undefined)texture.minFilter = parseConstant(data.minFilter);if(data.magFilter !== undefined)texture.magFilter = parseConstant(data.magFilter);if(data.anisotropy !== undefined)texture.anisotropy = data.anisotropy;if(Array.isArray(data.wrap)){texture.wrapS = parseConstant(data.wrap[0]);texture.wrapT = parseConstant(data.wrap[1]);}textures[data.uuid] = texture;}}return textures;},parseObject:(function(){var matrix=new THREE.Matrix4();return function(data,geometries,materials){var object;var getGeometry=function getGeometry(name){if(geometries[name] === undefined){console.warn('THREE.ObjectLoader: Undefined geometry',name);}return geometries[name];};var getMaterial=function getMaterial(name){if(materials[name] === undefined){console.warn('THREE.ObjectLoader: Undefined material',name);}return materials[name];};switch(data.type){case 'Scene':object = new THREE.Scene();break;case 'PerspectiveCamera':object = new THREE.PerspectiveCamera(data.fov,data.aspect,data.near,data.far);break;case 'OrthographicCamera':object = new THREE.OrthographicCamera(data.left,data.right,data.top,data.bottom,data.near,data.far);break;case 'AmbientLight':object = new THREE.AmbientLight(data.color);break;case 'DirectionalLight':object = new THREE.DirectionalLight(data.color,data.intensity);break;case 'PointLight':object = new THREE.PointLight(data.color,data.intensity,data.distance,data.decay);break;case 'SpotLight':object = new THREE.SpotLight(data.color,data.intensity,data.distance,data.angle,data.exponent,data.decay);break;case 'HemisphereLight':object = new THREE.HemisphereLight(data.color,data.groundColor,data.intensity);break;case 'Mesh':object = new THREE.Mesh(getGeometry(data.geometry),getMaterial(data.material));break;case 'LOD':object = new THREE.LOD();break;case 'Line':object = new THREE.Line(getGeometry(data.geometry),getMaterial(data.material),data.mode);break;case 'PointCloud':case 'Points':object = new THREE.Points(getGeometry(data.geometry),getMaterial(data.material));break;case 'Sprite':object = new THREE.Sprite(getMaterial(data.material));break;case 'Group':object = new THREE.Group();break;default:object = new THREE.Object3D();}object.uuid = data.uuid;if(data.name !== undefined)object.name = data.name;if(data.matrix !== undefined){matrix.fromArray(data.matrix);matrix.decompose(object.position,object.quaternion,object.scale);}else {if(data.position !== undefined)object.position.fromArray(data.position);if(data.rotation !== undefined)object.rotation.fromArray(data.rotation);if(data.scale !== undefined)object.scale.fromArray(data.scale);}if(data.castShadow !== undefined)object.castShadow = data.castShadow;if(data.receiveShadow !== undefined)object.receiveShadow = data.receiveShadow;if(data.visible !== undefined)object.visible = data.visible;if(data.userData !== undefined)object.userData = data.userData;if(data.children !== undefined){for(var child in data.children) {object.add(this.parseObject(data.children[child],geometries,materials));}}if(data.type === 'LOD'){var levels=data.levels;for(var l=0;l < levels.length;l++) {var level=levels[l];var child=object.getObjectByProperty('uuid',level.object);if(child !== undefined){object.addLevel(child,level.distance);}}}return object;};})()}; // File:src/loaders/TextureLoader.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.TextureLoader = function(manager){this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager;};THREE.TextureLoader.prototype = {constructor:THREE.TextureLoader,load:function load(url,onLoad,onProgress,onError){var scope=this;var loader=new THREE.ImageLoader(scope.manager);loader.setCrossOrigin(this.crossOrigin);loader.load(url,function(image){var texture=new THREE.Texture(image);texture.needsUpdate = true;if(onLoad !== undefined){onLoad(texture);}},onProgress,onError);},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;}}; // File:src/loaders/BinaryTextureLoader.js
	/**
	 * @author Nikos M. / https://github.com/foo123/
	 *
	 * Abstract Base class to load generic binary textures formats (rgbe, hdr, ...)
	 */THREE.DataTextureLoader = THREE.BinaryTextureLoader = function(manager){this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager; // override in sub classes
	this._parser = null;};THREE.BinaryTextureLoader.prototype = {constructor:THREE.BinaryTextureLoader,load:function load(url,onLoad,onProgress,onError){var scope=this;var texture=new THREE.DataTexture();var loader=new THREE.XHRLoader(this.manager);loader.setCrossOrigin(this.crossOrigin);loader.setResponseType('arraybuffer');loader.load(url,function(buffer){var texData=scope._parser(buffer);if(!texData)return;if(undefined !== texData.image){texture.image = texData.image;}else if(undefined !== texData.data){texture.image.width = texData.width;texture.image.height = texData.height;texture.image.data = texData.data;}texture.wrapS = undefined !== texData.wrapS?texData.wrapS:THREE.ClampToEdgeWrapping;texture.wrapT = undefined !== texData.wrapT?texData.wrapT:THREE.ClampToEdgeWrapping;texture.magFilter = undefined !== texData.magFilter?texData.magFilter:THREE.LinearFilter;texture.minFilter = undefined !== texData.minFilter?texData.minFilter:THREE.LinearMipMapLinearFilter;texture.anisotropy = undefined !== texData.anisotropy?texData.anisotropy:1;if(undefined !== texData.format){texture.format = texData.format;}if(undefined !== texData.type){texture.type = texData.type;}if(undefined !== texData.mipmaps){texture.mipmaps = texData.mipmaps;}if(1 === texData.mipmapCount){texture.minFilter = THREE.LinearFilter;}texture.needsUpdate = true;if(onLoad)onLoad(texture,texData);},onProgress,onError);return texture;},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;}}; // File:src/loaders/CompressedTextureLoader.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 *
	 * Abstract Base class to block based textures loader (dds, pvr, ...)
	 */THREE.CompressedTextureLoader = function(manager){this.manager = manager !== undefined?manager:THREE.DefaultLoadingManager; // override in sub classes
	this._parser = null;};THREE.CompressedTextureLoader.prototype = {constructor:THREE.CompressedTextureLoader,load:function load(url,onLoad,onProgress,onError){var scope=this;var images=[];var texture=new THREE.CompressedTexture();texture.image = images;var loader=new THREE.XHRLoader(this.manager);loader.setCrossOrigin(this.crossOrigin);loader.setResponseType('arraybuffer');if(Array.isArray(url)){var loaded=0;var loadTexture=function loadTexture(i){loader.load(url[i],function(buffer){var texDatas=scope._parser(buffer,true);images[i] = {width:texDatas.width,height:texDatas.height,format:texDatas.format,mipmaps:texDatas.mipmaps};loaded += 1;if(loaded === 6){if(texDatas.mipmapCount === 1)texture.minFilter = THREE.LinearFilter;texture.format = texDatas.format;texture.needsUpdate = true;if(onLoad)onLoad(texture);}},onProgress,onError);};for(var i=0,il=url.length;i < il;++i) {loadTexture(i);}}else { // compressed cubemap texture stored in a single DDS file
	loader.load(url,function(buffer){var texDatas=scope._parser(buffer,true);if(texDatas.isCubemap){var faces=texDatas.mipmaps.length / texDatas.mipmapCount;for(var f=0;f < faces;f++) {images[f] = {mipmaps:[]};for(var i=0;i < texDatas.mipmapCount;i++) {images[f].mipmaps.push(texDatas.mipmaps[f * texDatas.mipmapCount + i]);images[f].format = texDatas.format;images[f].width = texDatas.width;images[f].height = texDatas.height;}}}else {texture.image.width = texDatas.width;texture.image.height = texDatas.height;texture.mipmaps = texDatas.mipmaps;}if(texDatas.mipmapCount === 1){texture.minFilter = THREE.LinearFilter;}texture.format = texDatas.format;texture.needsUpdate = true;if(onLoad)onLoad(texture);},onProgress,onError);}return texture;},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;}}; // File:src/materials/Material.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Material = function(){Object.defineProperty(this,'id',{value:THREE.MaterialIdCount++});this.uuid = THREE.Math.generateUUID();this.name = '';this.type = 'Material';this.side = THREE.FrontSide;this.opacity = 1;this.transparent = false;this.blending = THREE.NormalBlending;this.blendSrc = THREE.SrcAlphaFactor;this.blendDst = THREE.OneMinusSrcAlphaFactor;this.blendEquation = THREE.AddEquation;this.blendSrcAlpha = null;this.blendDstAlpha = null;this.blendEquationAlpha = null;this.depthFunc = THREE.LessEqualDepth;this.depthTest = true;this.depthWrite = true;this.colorWrite = true;this.precision = null; // override the renderer's default precision for this material
	this.polygonOffset = false;this.polygonOffsetFactor = 0;this.polygonOffsetUnits = 0;this.alphaTest = 0;this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer
	this.visible = true;this._needsUpdate = true;};THREE.Material.prototype = Object.defineProperties({constructor:THREE.Material,setValues:function setValues(values){if(values === undefined)return;for(var key in values) {var newValue=values[key];if(newValue === undefined){console.warn("THREE.Material: '" + key + "' parameter is undefined.");continue;}var currentValue=this[key];if(currentValue === undefined){console.warn("THREE." + this.type + ": '" + key + "' is not a property of this material.");continue;}if(currentValue instanceof THREE.Color){currentValue.set(newValue);}else if(currentValue instanceof THREE.Vector3 && newValue instanceof THREE.Vector3){currentValue.copy(newValue);}else if(key === 'overdraw'){ // ensure overdraw is backwards-compatible with legacy boolean type
	this[key] = Number(newValue);}else {this[key] = newValue;}}},toJSON:function toJSON(meta){var data={metadata:{version:4.4,type:'Material',generator:'Material.toJSON'}}; // standard Material serialization
	data.uuid = this.uuid;data.type = this.type;if(this.name !== '')data.name = this.name;if(this.color instanceof THREE.Color)data.color = this.color.getHex();if(this.emissive instanceof THREE.Color)data.emissive = this.emissive.getHex();if(this.specular instanceof THREE.Color)data.specular = this.specular.getHex();if(this.shininess !== undefined)data.shininess = this.shininess;if(this.map instanceof THREE.Texture)data.map = this.map.toJSON(meta).uuid;if(this.alphaMap instanceof THREE.Texture)data.alphaMap = this.alphaMap.toJSON(meta).uuid;if(this.lightMap instanceof THREE.Texture)data.lightMap = this.lightMap.toJSON(meta).uuid;if(this.bumpMap instanceof THREE.Texture){data.bumpMap = this.bumpMap.toJSON(meta).uuid;data.bumpScale = this.bumpScale;}if(this.normalMap instanceof THREE.Texture){data.normalMap = this.normalMap.toJSON(meta).uuid;data.normalScale = this.normalScale; // Removed for now, causes issue in editor ui.js
	}if(this.displacementMap instanceof THREE.Texture){data.displacementMap = this.displacementMap.toJSON(meta).uuid;data.displacementScale = this.displacementScale;data.displacementBias = this.displacementBias;}if(this.specularMap instanceof THREE.Texture)data.specularMap = this.specularMap.toJSON(meta).uuid;if(this.envMap instanceof THREE.Texture){data.envMap = this.envMap.toJSON(meta).uuid;data.reflectivity = this.reflectivity; // Scale behind envMap
	}if(this.size !== undefined)data.size = this.size;if(this.sizeAttenuation !== undefined)data.sizeAttenuation = this.sizeAttenuation;if(this.vertexColors !== undefined && this.vertexColors !== THREE.NoColors)data.vertexColors = this.vertexColors;if(this.shading !== undefined && this.shading !== THREE.SmoothShading)data.shading = this.shading;if(this.blending !== undefined && this.blending !== THREE.NormalBlending)data.blending = this.blending;if(this.side !== undefined && this.side !== THREE.FrontSide)data.side = this.side;if(this.opacity < 1)data.opacity = this.opacity;if(this.transparent === true)data.transparent = this.transparent;if(this.alphaTest > 0)data.alphaTest = this.alphaTest;if(this.wireframe === true)data.wireframe = this.wireframe;if(this.wireframeLinewidth > 1)data.wireframeLinewidth = this.wireframeLinewidth;return data;},clone:function clone(){return new this.constructor().copy(this);},copy:function copy(source){this.name = source.name;this.side = source.side;this.opacity = source.opacity;this.transparent = source.transparent;this.blending = source.blending;this.blendSrc = source.blendSrc;this.blendDst = source.blendDst;this.blendEquation = source.blendEquation;this.blendSrcAlpha = source.blendSrcAlpha;this.blendDstAlpha = source.blendDstAlpha;this.blendEquationAlpha = source.blendEquationAlpha;this.depthFunc = source.depthFunc;this.depthTest = source.depthTest;this.depthWrite = source.depthWrite;this.precision = source.precision;this.polygonOffset = source.polygonOffset;this.polygonOffsetFactor = source.polygonOffsetFactor;this.polygonOffsetUnits = source.polygonOffsetUnits;this.alphaTest = source.alphaTest;this.overdraw = source.overdraw;this.visible = source.visible;return this;},update:function update(){this.dispatchEvent({type:'update'});},dispose:function dispose(){this.dispatchEvent({type:'dispose'});}},{needsUpdate:{get:function get(){return this._needsUpdate;},set:function set(value){if(value === true)this.update();this._needsUpdate = value;},configurable:true,enumerable:true},wrapAround:{ // Deprecated
	get:function get(){console.warn('THREE.' + this.type + ': .wrapAround has been removed.');},set:function set(boolean){console.warn('THREE.' + this.type + ': .wrapAround has been removed.');},configurable:true,enumerable:true},wrapRGB:{get:function get(){console.warn('THREE.' + this.type + ': .wrapRGB has been removed.');return new THREE.Color();},configurable:true,enumerable:true}});THREE.EventDispatcher.prototype.apply(THREE.Material.prototype);THREE.MaterialIdCount = 0; // File:src/materials/LineBasicMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  linewidth: <float>,
	 *  linecap: "round",
	 *  linejoin: "round",
	 *
	 *  vertexColors: <bool>
	 *
	 *  fog: <bool>
	 * }
	 */THREE.LineBasicMaterial = function(parameters){THREE.Material.call(this);this.type = 'LineBasicMaterial';this.color = new THREE.Color(0xffffff);this.linewidth = 1;this.linecap = 'round';this.linejoin = 'round';this.vertexColors = THREE.NoColors;this.fog = true;this.setValues(parameters);};THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;THREE.LineBasicMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.color.copy(source.color);this.linewidth = source.linewidth;this.linecap = source.linecap;this.linejoin = source.linejoin;this.vertexColors = source.vertexColors;this.fog = source.fog;return this;}; // File:src/materials/LineDashedMaterial.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  linewidth: <float>,
	 *
	 *  scale: <float>,
	 *  dashSize: <float>,
	 *  gapSize: <float>,
	 *
	 *  vertexColors: <bool>
	 *
	 *  fog: <bool>
	 * }
	 */THREE.LineDashedMaterial = function(parameters){THREE.Material.call(this);this.type = 'LineDashedMaterial';this.color = new THREE.Color(0xffffff);this.linewidth = 1;this.scale = 1;this.dashSize = 3;this.gapSize = 1;this.vertexColors = false;this.fog = true;this.setValues(parameters);};THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);THREE.LineDashedMaterial.prototype.constructor = THREE.LineDashedMaterial;THREE.LineDashedMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.color.copy(source.color);this.linewidth = source.linewidth;this.scale = source.scale;this.dashSize = source.dashSize;this.gapSize = source.gapSize;this.vertexColors = source.vertexColors;this.fog = source.fog;return this;}; // File:src/materials/MeshBasicMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  aoMap: new THREE.Texture( <Image> ),
	 *  aoMapIntensity: <float>
	 *
	 *  specularMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
	 *  combine: THREE.Multiply,
	 *  reflectivity: <float>,
	 *  refractionRatio: <float>,
	 *
	 *  shading: THREE.SmoothShading,
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *
	 *  fog: <bool>
	 * }
	 */THREE.MeshBasicMaterial = function(parameters){THREE.Material.call(this);this.type = 'MeshBasicMaterial';this.color = new THREE.Color(0xffffff); // emissive
	this.map = null;this.aoMap = null;this.aoMapIntensity = 1.0;this.specularMap = null;this.alphaMap = null;this.envMap = null;this.combine = THREE.MultiplyOperation;this.reflectivity = 1;this.refractionRatio = 0.98;this.fog = true;this.shading = THREE.SmoothShading;this.wireframe = false;this.wireframeLinewidth = 1;this.wireframeLinecap = 'round';this.wireframeLinejoin = 'round';this.vertexColors = THREE.NoColors;this.skinning = false;this.morphTargets = false;this.setValues(parameters);};THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;THREE.MeshBasicMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.color.copy(source.color);this.map = source.map;this.aoMap = source.aoMap;this.aoMapIntensity = source.aoMapIntensity;this.specularMap = source.specularMap;this.alphaMap = source.alphaMap;this.envMap = source.envMap;this.combine = source.combine;this.reflectivity = source.reflectivity;this.refractionRatio = source.refractionRatio;this.fog = source.fog;this.shading = source.shading;this.wireframe = source.wireframe;this.wireframeLinewidth = source.wireframeLinewidth;this.wireframeLinecap = source.wireframeLinecap;this.wireframeLinejoin = source.wireframeLinejoin;this.vertexColors = source.vertexColors;this.skinning = source.skinning;this.morphTargets = source.morphTargets;return this;}; // File:src/materials/MeshLambertMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  emissive: <hex>,
	 *  opacity: <float>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  specularMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
	 *  combine: THREE.Multiply,
	 *  reflectivity: <float>,
	 *  refractionRatio: <float>,
	 *
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>,
	 *
	 *	fog: <bool>
	 * }
	 */THREE.MeshLambertMaterial = function(parameters){THREE.Material.call(this);this.type = 'MeshLambertMaterial';this.color = new THREE.Color(0xffffff); // diffuse
	this.emissive = new THREE.Color(0x000000);this.map = null;this.specularMap = null;this.alphaMap = null;this.envMap = null;this.combine = THREE.MultiplyOperation;this.reflectivity = 1;this.refractionRatio = 0.98;this.fog = true;this.wireframe = false;this.wireframeLinewidth = 1;this.wireframeLinecap = 'round';this.wireframeLinejoin = 'round';this.vertexColors = THREE.NoColors;this.skinning = false;this.morphTargets = false;this.morphNormals = false;this.setValues(parameters);};THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;THREE.MeshLambertMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.color.copy(source.color);this.emissive.copy(source.emissive);this.map = source.map;this.specularMap = source.specularMap;this.alphaMap = source.alphaMap;this.envMap = source.envMap;this.combine = source.combine;this.reflectivity = source.reflectivity;this.refractionRatio = source.refractionRatio;this.fog = source.fog;this.wireframe = source.wireframe;this.wireframeLinewidth = source.wireframeLinewidth;this.wireframeLinecap = source.wireframeLinecap;this.wireframeLinejoin = source.wireframeLinejoin;this.vertexColors = source.vertexColors;this.skinning = source.skinning;this.morphTargets = source.morphTargets;this.morphNormals = source.morphNormals;return this;}; // File:src/materials/MeshPhongMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  emissive: <hex>,
	 *  specular: <hex>,
	 *  shininess: <float>,
	 *  opacity: <float>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  lightMap: new THREE.Texture( <Image> ),
	 *  lightMapIntensity: <float>
	 *
	 *  aoMap: new THREE.Texture( <Image> ),
	 *  aoMapIntensity: <float>
	 *
	 *  emissiveMap: new THREE.Texture( <Image> ),
	 *
	 *  bumpMap: new THREE.Texture( <Image> ),
	 *  bumpScale: <float>,
	 *
	 *  normalMap: new THREE.Texture( <Image> ),
	 *  normalScale: <Vector2>,
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>,
	 *
	 *  specularMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
	 *  combine: THREE.Multiply,
	 *  reflectivity: <float>,
	 *  refractionRatio: <float>,
	 *
	 *  shading: THREE.SmoothShading,
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>,
	 *
	 *	fog: <bool>
	 * }
	 */THREE.MeshPhongMaterial = function(parameters){THREE.Material.call(this);this.type = 'MeshPhongMaterial';this.color = new THREE.Color(0xffffff); // diffuse
	this.emissive = new THREE.Color(0x000000);this.specular = new THREE.Color(0x111111);this.shininess = 30;this.metal = false;this.map = null;this.lightMap = null;this.lightMapIntensity = 1.0;this.aoMap = null;this.aoMapIntensity = 1.0;this.emissiveMap = null;this.bumpMap = null;this.bumpScale = 1;this.normalMap = null;this.normalScale = new THREE.Vector2(1,1);this.displacementMap = null;this.displacementScale = 1;this.displacementBias = 0;this.specularMap = null;this.alphaMap = null;this.envMap = null;this.combine = THREE.MultiplyOperation;this.reflectivity = 1;this.refractionRatio = 0.98;this.fog = true;this.shading = THREE.SmoothShading;this.wireframe = false;this.wireframeLinewidth = 1;this.wireframeLinecap = 'round';this.wireframeLinejoin = 'round';this.vertexColors = THREE.NoColors;this.skinning = false;this.morphTargets = false;this.morphNormals = false;this.setValues(parameters);};THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;THREE.MeshPhongMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.color.copy(source.color);this.emissive.copy(source.emissive);this.specular.copy(source.specular);this.shininess = source.shininess;this.metal = source.metal;this.map = source.map;this.lightMap = source.lightMap;this.lightMapIntensity = source.lightMapIntensity;this.aoMap = source.aoMap;this.aoMapIntensity = source.aoMapIntensity;this.emissiveMap = source.emissiveMap;this.bumpMap = source.bumpMap;this.bumpScale = source.bumpScale;this.normalMap = source.normalMap;this.normalScale.copy(source.normalScale);this.displacementMap = source.displacementMap;this.displacementScale = source.displacementScale;this.displacementBias = source.displacementBias;this.specularMap = source.specularMap;this.alphaMap = source.alphaMap;this.envMap = source.envMap;this.combine = source.combine;this.reflectivity = source.reflectivity;this.refractionRatio = source.refractionRatio;this.fog = source.fog;this.shading = source.shading;this.wireframe = source.wireframe;this.wireframeLinewidth = source.wireframeLinewidth;this.wireframeLinecap = source.wireframeLinecap;this.wireframeLinejoin = source.wireframeLinejoin;this.vertexColors = source.vertexColors;this.skinning = source.skinning;this.morphTargets = source.morphTargets;this.morphNormals = source.morphNormals;return this;}; // File:src/materials/MeshDepthMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  opacity: <float>,
	 *
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>
	 * }
	 */THREE.MeshDepthMaterial = function(parameters){THREE.Material.call(this);this.type = 'MeshDepthMaterial';this.morphTargets = false;this.wireframe = false;this.wireframeLinewidth = 1;this.setValues(parameters);};THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;THREE.MeshDepthMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.wireframe = source.wireframe;this.wireframeLinewidth = source.wireframeLinewidth;return this;}; // File:src/materials/MeshNormalMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 *
	 * parameters = {
	 *  opacity: <float>,
	 *
	 *  shading: THREE.FlatShading,
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>
	 * }
	 */THREE.MeshNormalMaterial = function(parameters){THREE.Material.call(this,parameters);this.type = 'MeshNormalMaterial';this.wireframe = false;this.wireframeLinewidth = 1;this.morphTargets = false;this.setValues(parameters);};THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;THREE.MeshNormalMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.wireframe = source.wireframe;this.wireframeLinewidth = source.wireframeLinewidth;return this;}; // File:src/materials/MultiMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.MultiMaterial = function(materials){this.uuid = THREE.Math.generateUUID();this.type = 'MultiMaterial';this.materials = materials instanceof Array?materials:[];this.visible = true;};THREE.MultiMaterial.prototype = {constructor:THREE.MultiMaterial,toJSON:function toJSON(){var output={metadata:{version:4.2,type:'material',generator:'MaterialExporter'},uuid:this.uuid,type:this.type,materials:[]};for(var i=0,l=this.materials.length;i < l;i++) {output.materials.push(this.materials[i].toJSON());}output.visible = this.visible;return output;},clone:function clone(){var material=new this.constructor();for(var i=0;i < this.materials.length;i++) {material.materials.push(this.materials[i].clone());}material.visible = this.visible;return material;}}; // backwards compatibility
	THREE.MeshFaceMaterial = THREE.MultiMaterial; // File:src/materials/PointsMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  size: <float>,
	 *  sizeAttenuation: <bool>,
	 *
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  vertexColors: <bool>,
	 *
	 *  fog: <bool>
	 * }
	 */THREE.PointsMaterial = function(parameters){THREE.Material.call(this);this.type = 'PointsMaterial';this.color = new THREE.Color(0xffffff);this.map = null;this.size = 1;this.sizeAttenuation = true;this.vertexColors = THREE.NoColors;this.fog = true;this.setValues(parameters);};THREE.PointsMaterial.prototype = Object.create(THREE.Material.prototype);THREE.PointsMaterial.prototype.constructor = THREE.PointsMaterial;THREE.PointsMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.color.copy(source.color);this.map = source.map;this.size = source.size;this.sizeAttenuation = source.sizeAttenuation;this.vertexColors = source.vertexColors;this.fog = source.fog;return this;}; // backwards compatibility
	THREE.PointCloudMaterial = function(parameters){console.warn('THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.');return new THREE.PointsMaterial(parameters);};THREE.ParticleBasicMaterial = function(parameters){console.warn('THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.');return new THREE.PointsMaterial(parameters);};THREE.ParticleSystemMaterial = function(parameters){console.warn('THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.');return new THREE.PointsMaterial(parameters);}; // File:src/materials/ShaderMaterial.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  defines: { "label" : "value" },
	 *  uniforms: { "parameter1": { type: "f", value: 1.0 }, "parameter2": { type: "i" value2: 2 } },
	 *
	 *  fragmentShader: <string>,
	 *  vertexShader: <string>,
	 *
	 *  shading: THREE.SmoothShading,
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  lights: <bool>,
	 *
	 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>,
	 *
	 *	fog: <bool>
	 * }
	 */THREE.ShaderMaterial = function(parameters){THREE.Material.call(this);this.type = 'ShaderMaterial';this.defines = {};this.uniforms = {};this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';this.shading = THREE.SmoothShading;this.linewidth = 1;this.wireframe = false;this.wireframeLinewidth = 1;this.fog = false; // set to use scene fog
	this.lights = false; // set to use scene lights
	this.vertexColors = THREE.NoColors; // set to use "color" attribute stream
	this.skinning = false; // set to use skinning attribute streams
	this.morphTargets = false; // set to use morph targets
	this.morphNormals = false; // set to use morph normals
	this.derivatives = false; // set to use derivatives
	// When rendered geometry doesn't include these attributes but the material does,
	// use these default values in WebGL. This avoids errors when buffer data is missing.
	this.defaultAttributeValues = {'color':[1,1,1],'uv':[0,0],'uv2':[0,0]};this.index0AttributeName = undefined;if(parameters !== undefined){if(parameters.attributes !== undefined){console.error('THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.');}this.setValues(parameters);}};THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial;THREE.ShaderMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.fragmentShader = source.fragmentShader;this.vertexShader = source.vertexShader;this.uniforms = THREE.UniformsUtils.clone(source.uniforms);this.attributes = source.attributes;this.defines = source.defines;this.shading = source.shading;this.wireframe = source.wireframe;this.wireframeLinewidth = source.wireframeLinewidth;this.fog = source.fog;this.lights = source.lights;this.vertexColors = source.vertexColors;this.skinning = source.skinning;this.morphTargets = source.morphTargets;this.morphNormals = source.morphNormals;this.derivatives = source.derivatives;return this;};THREE.ShaderMaterial.prototype.toJSON = function(meta){var data=THREE.Material.prototype.toJSON.call(this,meta);data.uniforms = this.uniforms;data.attributes = this.attributes;data.vertexShader = this.vertexShader;data.fragmentShader = this.fragmentShader;return data;}; // File:src/materials/RawShaderMaterial.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.RawShaderMaterial = function(parameters){THREE.ShaderMaterial.call(this,parameters);this.type = 'RawShaderMaterial';};THREE.RawShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);THREE.RawShaderMaterial.prototype.constructor = THREE.RawShaderMaterial; // File:src/materials/SpriteMaterial.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *	uvOffset: new THREE.Vector2(),
	 *	uvScale: new THREE.Vector2(),
	 *
	 *  fog: <bool>
	 * }
	 */THREE.SpriteMaterial = function(parameters){THREE.Material.call(this);this.type = 'SpriteMaterial';this.color = new THREE.Color(0xffffff);this.map = null;this.rotation = 0;this.fog = false; // set parameters
	this.setValues(parameters);};THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);THREE.SpriteMaterial.prototype.constructor = THREE.SpriteMaterial;THREE.SpriteMaterial.prototype.copy = function(source){THREE.Material.prototype.copy.call(this,source);this.color.copy(source.color);this.map = source.map;this.rotation = source.rotation;this.fog = source.fog;return this;}; // File:src/textures/Texture.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author szimek / https://github.com/szimek/
	 */THREE.Texture = function(image,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy){Object.defineProperty(this,'id',{value:THREE.TextureIdCount++});this.uuid = THREE.Math.generateUUID();this.name = '';this.sourceFile = '';this.image = image !== undefined?image:THREE.Texture.DEFAULT_IMAGE;this.mipmaps = [];this.mapping = mapping !== undefined?mapping:THREE.Texture.DEFAULT_MAPPING;this.wrapS = wrapS !== undefined?wrapS:THREE.ClampToEdgeWrapping;this.wrapT = wrapT !== undefined?wrapT:THREE.ClampToEdgeWrapping;this.magFilter = magFilter !== undefined?magFilter:THREE.LinearFilter;this.minFilter = minFilter !== undefined?minFilter:THREE.LinearMipMapLinearFilter;this.anisotropy = anisotropy !== undefined?anisotropy:1;this.format = format !== undefined?format:THREE.RGBAFormat;this.type = type !== undefined?type:THREE.UnsignedByteType;this.offset = new THREE.Vector2(0,0);this.repeat = new THREE.Vector2(1,1);this.generateMipmaps = true;this.premultiplyAlpha = false;this.flipY = true;this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
	this.version = 0;this.onUpdate = null;};THREE.Texture.DEFAULT_IMAGE = undefined;THREE.Texture.DEFAULT_MAPPING = THREE.UVMapping;THREE.Texture.prototype = Object.defineProperties({constructor:THREE.Texture,clone:function clone(){return new this.constructor().copy(this);},copy:function copy(source){this.image = source.image;this.mipmaps = source.mipmaps.slice(0);this.mapping = source.mapping;this.wrapS = source.wrapS;this.wrapT = source.wrapT;this.magFilter = source.magFilter;this.minFilter = source.minFilter;this.anisotropy = source.anisotropy;this.format = source.format;this.type = source.type;this.offset.copy(source.offset);this.repeat.copy(source.repeat);this.generateMipmaps = source.generateMipmaps;this.premultiplyAlpha = source.premultiplyAlpha;this.flipY = source.flipY;this.unpackAlignment = source.unpackAlignment;return this;},toJSON:function toJSON(meta){if(meta.textures[this.uuid] !== undefined){return meta.textures[this.uuid];}function getDataURL(image){var canvas;if(image.toDataURL !== undefined){canvas = image;}else {canvas = document.createElement('canvas');canvas.width = image.width;canvas.height = image.height;canvas.getContext('2d').drawImage(image,0,0,image.width,image.height);}if(canvas.width > 2048 || canvas.height > 2048){return canvas.toDataURL('image/jpeg',0.6);}else {return canvas.toDataURL('image/png');}}var output={metadata:{version:4.4,type:'Texture',generator:'Texture.toJSON'},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],wrap:[this.wrapS,this.wrapT],minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy};if(this.image !== undefined){ // TODO: Move to THREE.Image
	var image=this.image;if(image.uuid === undefined){image.uuid = THREE.Math.generateUUID(); // UGH
	}if(meta.images[image.uuid] === undefined){meta.images[image.uuid] = {uuid:image.uuid,url:getDataURL(image)};}output.image = image.uuid;}meta.textures[this.uuid] = output;return output;},dispose:function dispose(){this.dispatchEvent({type:'dispose'});},transformUv:function transformUv(uv){if(this.mapping !== THREE.UVMapping)return;uv.multiply(this.repeat);uv.add(this.offset);if(uv.x < 0 || uv.x > 1){switch(this.wrapS){case THREE.RepeatWrapping:uv.x = uv.x - Math.floor(uv.x);break;case THREE.ClampToEdgeWrapping:uv.x = uv.x < 0?0:1;break;case THREE.MirroredRepeatWrapping:if(Math.abs(Math.floor(uv.x) % 2) === 1){uv.x = Math.ceil(uv.x) - uv.x;}else {uv.x = uv.x - Math.floor(uv.x);}break;}}if(uv.y < 0 || uv.y > 1){switch(this.wrapT){case THREE.RepeatWrapping:uv.y = uv.y - Math.floor(uv.y);break;case THREE.ClampToEdgeWrapping:uv.y = uv.y < 0?0:1;break;case THREE.MirroredRepeatWrapping:if(Math.abs(Math.floor(uv.y) % 2) === 1){uv.y = Math.ceil(uv.y) - uv.y;}else {uv.y = uv.y - Math.floor(uv.y);}break;}}if(this.flipY){uv.y = 1 - uv.y;}}},{needsUpdate:{set:function set(value){if(value === true)this.version++;},configurable:true,enumerable:true}});THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype);THREE.TextureIdCount = 0; // File:src/textures/CanvasTexture.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.CanvasTexture = function(canvas,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy){THREE.Texture.call(this,canvas,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy);this.needsUpdate = true;};THREE.CanvasTexture.prototype = Object.create(THREE.Texture.prototype);THREE.CanvasTexture.prototype.constructor = THREE.CanvasTexture; // File:src/textures/CubeTexture.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.CubeTexture = function(images,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy){mapping = mapping !== undefined?mapping:THREE.CubeReflectionMapping;THREE.Texture.call(this,images,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy);this.images = images;this.flipY = false;};THREE.CubeTexture.prototype = Object.create(THREE.Texture.prototype);THREE.CubeTexture.prototype.constructor = THREE.CubeTexture;THREE.CubeTexture.prototype.copy = function(source){THREE.Texture.prototype.copy.call(this,source);this.images = source.images;return this;}; // File:src/textures/CompressedTexture.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.CompressedTexture = function(mipmaps,width,height,format,type,mapping,wrapS,wrapT,magFilter,minFilter,anisotropy){THREE.Texture.call(this,null,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy);this.image = {width:width,height:height};this.mipmaps = mipmaps; // no flipping for cube textures
	// (also flipping doesn't work for compressed textures )
	this.flipY = false; // can't generate mipmaps for compressed textures
	// mips must be embedded in DDS files
	this.generateMipmaps = false;};THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);THREE.CompressedTexture.prototype.constructor = THREE.CompressedTexture; // File:src/textures/DataTexture.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.DataTexture = function(data,width,height,format,type,mapping,wrapS,wrapT,magFilter,minFilter,anisotropy){THREE.Texture.call(this,null,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy);this.image = {data:data,width:width,height:height};this.magFilter = magFilter !== undefined?magFilter:THREE.NearestFilter;this.minFilter = minFilter !== undefined?minFilter:THREE.NearestFilter;this.flipY = false;this.generateMipmaps = false;};THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);THREE.DataTexture.prototype.constructor = THREE.DataTexture; // File:src/textures/VideoTexture.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.VideoTexture = function(video,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy){THREE.Texture.call(this,video,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy);this.generateMipmaps = false;var scope=this;var update=function update(){requestAnimationFrame(update);if(video.readyState === video.HAVE_ENOUGH_DATA){scope.needsUpdate = true;}};update();};THREE.VideoTexture.prototype = Object.create(THREE.Texture.prototype);THREE.VideoTexture.prototype.constructor = THREE.VideoTexture; // File:src/objects/Group.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Group = function(){THREE.Object3D.call(this);this.type = 'Group';};THREE.Group.prototype = Object.create(THREE.Object3D.prototype);THREE.Group.prototype.constructor = THREE.Group; // File:src/objects/Points.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Points = function(geometry,material){THREE.Object3D.call(this);this.type = 'Points';this.geometry = geometry !== undefined?geometry:new THREE.Geometry();this.material = material !== undefined?material:new THREE.PointsMaterial({color:Math.random() * 0xffffff});};THREE.Points.prototype = Object.create(THREE.Object3D.prototype);THREE.Points.prototype.constructor = THREE.Points;THREE.Points.prototype.raycast = (function(){var inverseMatrix=new THREE.Matrix4();var ray=new THREE.Ray();return function raycast(raycaster,intersects){var object=this;var geometry=object.geometry;var threshold=raycaster.params.Points.threshold;inverseMatrix.getInverse(this.matrixWorld);ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);if(geometry.boundingBox !== null){if(ray.isIntersectionBox(geometry.boundingBox) === false){return;}}var localThreshold=threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);var localThresholdSq=localThreshold * localThreshold;var position=new THREE.Vector3();function testPoint(point,index){var rayPointDistanceSq=ray.distanceSqToPoint(point);if(rayPointDistanceSq < localThresholdSq){var intersectPoint=ray.closestPointToPoint(point);intersectPoint.applyMatrix4(object.matrixWorld);var distance=raycaster.ray.origin.distanceTo(intersectPoint);if(distance < raycaster.near || distance > raycaster.far)return;intersects.push({distance:distance,distanceToRay:Math.sqrt(rayPointDistanceSq),point:intersectPoint.clone(),index:index,face:null,object:object});}}if(geometry instanceof THREE.BufferGeometry){var index=geometry.index;var attributes=geometry.attributes;var positions=attributes.position.array;if(index !== null){var indices=index.array;for(var i=0,il=indices.length;i < il;i++) {var a=indices[i];position.fromArray(positions,a * 3);testPoint(position,a);}}else {for(var i=0,l=positions.length / 3;i < l;i++) {position.fromArray(positions,i * 3);testPoint(position,i);}}}else {var vertices=geometry.vertices;for(var i=0,l=vertices.length;i < l;i++) {testPoint(vertices[i],i);}}};})();THREE.Points.prototype.clone = function(){return new this.constructor(this.geometry,this.material).copy(this);};THREE.Points.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta); // only serialize if not in meta geometries cache
	if(meta.geometries[this.geometry.uuid] === undefined){meta.geometries[this.geometry.uuid] = this.geometry.toJSON();} // only serialize if not in meta materials cache
	if(meta.materials[this.material.uuid] === undefined){meta.materials[this.material.uuid] = this.material.toJSON();}data.object.geometry = this.geometry.uuid;data.object.material = this.material.uuid;return data;}; // Backwards compatibility
	THREE.PointCloud = function(geometry,material){console.warn('THREE.PointCloud has been renamed to THREE.Points.');return new THREE.Points(geometry,material);};THREE.ParticleSystem = function(geometry,material){console.warn('THREE.ParticleSystem has been renamed to THREE.Points.');return new THREE.Points(geometry,material);}; // File:src/objects/Line.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Line = function(geometry,material,mode){if(mode === 1){console.warn('THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead.');return new THREE.LineSegments(geometry,material);}THREE.Object3D.call(this);this.type = 'Line';this.geometry = geometry !== undefined?geometry:new THREE.Geometry();this.material = material !== undefined?material:new THREE.LineBasicMaterial({color:Math.random() * 0xffffff});};THREE.Line.prototype = Object.create(THREE.Object3D.prototype);THREE.Line.prototype.constructor = THREE.Line;THREE.Line.prototype.raycast = (function(){var inverseMatrix=new THREE.Matrix4();var ray=new THREE.Ray();var sphere=new THREE.Sphere();return function raycast(raycaster,intersects){var precision=raycaster.linePrecision;var precisionSq=precision * precision;var geometry=this.geometry;if(geometry.boundingSphere === null)geometry.computeBoundingSphere(); // Checking boundingSphere distance to ray
	sphere.copy(geometry.boundingSphere);sphere.applyMatrix4(this.matrixWorld);if(raycaster.ray.isIntersectionSphere(sphere) === false){return;}inverseMatrix.getInverse(this.matrixWorld);ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);var vStart=new THREE.Vector3();var vEnd=new THREE.Vector3();var interSegment=new THREE.Vector3();var interRay=new THREE.Vector3();var step=this instanceof THREE.LineSegments?2:1;if(geometry instanceof THREE.BufferGeometry){var index=geometry.index;var attributes=geometry.attributes;if(index !== null){var indices=index.array;var positions=attributes.position.array;for(var i=0,l=indices.length - 1;i < l;i += step) {var a=indices[i];var b=indices[i + 1];vStart.fromArray(positions,a * 3);vEnd.fromArray(positions,b * 3);var distSq=ray.distanceSqToSegment(vStart,vEnd,interRay,interSegment);if(distSq > precisionSq)continue;interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation
	var distance=raycaster.ray.origin.distanceTo(interRay);if(distance < raycaster.near || distance > raycaster.far)continue;intersects.push({distance:distance, // What do we want? intersection point on the ray or on the segment??
	// point: raycaster.ray.at( distance ),
	point:interSegment.clone().applyMatrix4(this.matrixWorld),index:i,face:null,faceIndex:null,object:this});}}else {var positions=attributes.position.array;for(var i=0,l=positions.length / 3 - 1;i < l;i += step) {vStart.fromArray(positions,3 * i);vEnd.fromArray(positions,3 * i + 3);var distSq=ray.distanceSqToSegment(vStart,vEnd,interRay,interSegment);if(distSq > precisionSq)continue;interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation
	var distance=raycaster.ray.origin.distanceTo(interRay);if(distance < raycaster.near || distance > raycaster.far)continue;intersects.push({distance:distance, // What do we want? intersection point on the ray or on the segment??
	// point: raycaster.ray.at( distance ),
	point:interSegment.clone().applyMatrix4(this.matrixWorld),index:i,face:null,faceIndex:null,object:this});}}}else if(geometry instanceof THREE.Geometry){var vertices=geometry.vertices;var nbVertices=vertices.length;for(var i=0;i < nbVertices - 1;i += step) {var distSq=ray.distanceSqToSegment(vertices[i],vertices[i + 1],interRay,interSegment);if(distSq > precisionSq)continue;interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation
	var distance=raycaster.ray.origin.distanceTo(interRay);if(distance < raycaster.near || distance > raycaster.far)continue;intersects.push({distance:distance, // What do we want? intersection point on the ray or on the segment??
	// point: raycaster.ray.at( distance ),
	point:interSegment.clone().applyMatrix4(this.matrixWorld),index:i,face:null,faceIndex:null,object:this});}}};})();THREE.Line.prototype.clone = function(){return new this.constructor(this.geometry,this.material).copy(this);};THREE.Line.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta); // only serialize if not in meta geometries cache
	if(meta.geometries[this.geometry.uuid] === undefined){meta.geometries[this.geometry.uuid] = this.geometry.toJSON();} // only serialize if not in meta materials cache
	if(meta.materials[this.material.uuid] === undefined){meta.materials[this.material.uuid] = this.material.toJSON();}data.object.geometry = this.geometry.uuid;data.object.material = this.material.uuid;return data;}; // DEPRECATED
	THREE.LineStrip = 0;THREE.LinePieces = 1; // File:src/objects/LineSegments.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.LineSegments = function(geometry,material){THREE.Line.call(this,geometry,material);this.type = 'LineSegments';};THREE.LineSegments.prototype = Object.create(THREE.Line.prototype);THREE.LineSegments.prototype.constructor = THREE.LineSegments; // File:src/objects/Mesh.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author jonobr1 / http://jonobr1.com/
	 */THREE.Mesh = function(geometry,material){THREE.Object3D.call(this);this.type = 'Mesh';this.geometry = geometry !== undefined?geometry:new THREE.Geometry();this.material = material !== undefined?material:new THREE.MeshBasicMaterial({color:Math.random() * 0xffffff});this.updateMorphTargets();};THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);THREE.Mesh.prototype.constructor = THREE.Mesh;THREE.Mesh.prototype.updateMorphTargets = function(){if(this.geometry.morphTargets !== undefined && this.geometry.morphTargets.length > 0){this.morphTargetBase = -1;this.morphTargetInfluences = [];this.morphTargetDictionary = {};for(var m=0,ml=this.geometry.morphTargets.length;m < ml;m++) {this.morphTargetInfluences.push(0);this.morphTargetDictionary[this.geometry.morphTargets[m].name] = m;}}};THREE.Mesh.prototype.getMorphTargetIndexByName = function(name){if(this.morphTargetDictionary[name] !== undefined){return this.morphTargetDictionary[name];}console.warn('THREE.Mesh.getMorphTargetIndexByName: morph target ' + name + ' does not exist. Returning 0.');return 0;};THREE.Mesh.prototype.raycast = (function(){var inverseMatrix=new THREE.Matrix4();var ray=new THREE.Ray();var sphere=new THREE.Sphere();var vA=new THREE.Vector3();var vB=new THREE.Vector3();var vC=new THREE.Vector3();var tempA=new THREE.Vector3();var tempB=new THREE.Vector3();var tempC=new THREE.Vector3();var uvA=new THREE.Vector2();var uvB=new THREE.Vector2();var uvC=new THREE.Vector2();var barycoord=new THREE.Vector3();var intersectionPoint=new THREE.Vector3();var intersectionPointWorld=new THREE.Vector3();function uvIntersection(point,p1,p2,p3,uv1,uv2,uv3){THREE.Triangle.barycoordFromPoint(point,p1,p2,p3,barycoord);uv1.multiplyScalar(barycoord.x);uv2.multiplyScalar(barycoord.y);uv3.multiplyScalar(barycoord.z);uv1.add(uv2).add(uv3);return uv1.clone();}return function raycast(raycaster,intersects){var geometry=this.geometry;var material=this.material;if(material === undefined)return; // Checking boundingSphere distance to ray
	if(geometry.boundingSphere === null)geometry.computeBoundingSphere();sphere.copy(geometry.boundingSphere);sphere.applyMatrix4(this.matrixWorld);if(raycaster.ray.isIntersectionSphere(sphere) === false){return;} // Check boundingBox before continuing
	inverseMatrix.getInverse(this.matrixWorld);ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);if(geometry.boundingBox !== null){if(ray.isIntersectionBox(geometry.boundingBox) === false){return;}}var a,b,c;if(geometry instanceof THREE.BufferGeometry){var index=geometry.index;var attributes=geometry.attributes;if(index !== null){var indices=index.array;var positions=attributes.position.array;for(var i=0,l=indices.length;i < l;i += 3) {a = indices[i];b = indices[i + 1];c = indices[i + 2];vA.fromArray(positions,a * 3);vB.fromArray(positions,b * 3);vC.fromArray(positions,c * 3);if(material.side === THREE.BackSide){if(ray.intersectTriangle(vC,vB,vA,true,intersectionPoint) === null)continue;}else {if(ray.intersectTriangle(vA,vB,vC,material.side !== THREE.DoubleSide,intersectionPoint) === null)continue;}intersectionPointWorld.copy(intersectionPoint);intersectionPointWorld.applyMatrix4(this.matrixWorld);var distance=raycaster.ray.origin.distanceTo(intersectionPointWorld);if(distance < raycaster.near || distance > raycaster.far)continue;var uv;if(attributes.uv !== undefined){var uvs=attributes.uv.array;uvA.fromArray(uvs,a * 2);uvB.fromArray(uvs,b * 2);uvC.fromArray(uvs,c * 2);uv = uvIntersection(intersectionPoint,vA,vB,vC,uvA,uvB,uvC);}intersects.push({distance:distance,point:intersectionPointWorld.clone(),uv:uv,face:new THREE.Face3(a,b,c,THREE.Triangle.normal(vA,vB,vC)),faceIndex:Math.floor(i / 3), // triangle number in indices buffer semantics
	object:this});}}else {var positions=attributes.position.array;for(var i=0,l=positions.length;i < l;i += 9) {vA.fromArray(positions,i);vB.fromArray(positions,i + 3);vC.fromArray(positions,i + 6);if(material.side === THREE.BackSide){if(ray.intersectTriangle(vC,vB,vA,true,intersectionPoint) === null)continue;}else {if(ray.intersectTriangle(vA,vB,vC,material.side !== THREE.DoubleSide,intersectionPoint) === null)continue;}intersectionPointWorld.copy(intersectionPoint);intersectionPointWorld.applyMatrix4(this.matrixWorld);var distance=raycaster.ray.origin.distanceTo(intersectionPointWorld);if(distance < raycaster.near || distance > raycaster.far)continue;var uv;if(attributes.uv !== undefined){var uvs=attributes.uv.array;uvA.fromArray(uvs,i);uvB.fromArray(uvs,i + 2);uvC.fromArray(uvs,i + 4);uv = uvIntersection(intersectionPoint,vA,vB,vC,uvA,uvB,uvC);}a = i / 3;b = a + 1;c = a + 2;intersects.push({distance:distance,point:intersectionPointWorld.clone(),uv:uv,face:new THREE.Face3(a,b,c,THREE.Triangle.normal(vA,vB,vC)),index:a, // triangle number in positions buffer semantics
	object:this});}}}else if(geometry instanceof THREE.Geometry){var isFaceMaterial=material instanceof THREE.MeshFaceMaterial;var materials=isFaceMaterial === true?material.materials:null;var vertices=geometry.vertices;var faces=geometry.faces;for(var f=0,fl=faces.length;f < fl;f++) {var face=faces[f];var faceMaterial=isFaceMaterial === true?materials[face.materialIndex]:material;if(faceMaterial === undefined)continue;a = vertices[face.a];b = vertices[face.b];c = vertices[face.c];if(faceMaterial.morphTargets === true){var morphTargets=geometry.morphTargets;var morphInfluences=this.morphTargetInfluences;vA.set(0,0,0);vB.set(0,0,0);vC.set(0,0,0);for(var t=0,tl=morphTargets.length;t < tl;t++) {var influence=morphInfluences[t];if(influence === 0)continue;var targets=morphTargets[t].vertices;vA.addScaledVector(tempA.subVectors(targets[face.a],a),influence);vB.addScaledVector(tempB.subVectors(targets[face.b],b),influence);vC.addScaledVector(tempC.subVectors(targets[face.c],c),influence);}vA.add(a);vB.add(b);vC.add(c);a = vA;b = vB;c = vC;}if(faceMaterial.side === THREE.BackSide){if(ray.intersectTriangle(c,b,a,true,intersectionPoint) === null)continue;}else {if(ray.intersectTriangle(a,b,c,faceMaterial.side !== THREE.DoubleSide,intersectionPoint) === null)continue;}intersectionPointWorld.copy(intersectionPoint);intersectionPointWorld.applyMatrix4(this.matrixWorld);var distance=raycaster.ray.origin.distanceTo(intersectionPointWorld);if(distance < raycaster.near || distance > raycaster.far)continue;var uv;if(geometry.faceVertexUvs[0].length > 0){var uvs=geometry.faceVertexUvs[0][f];uvA.copy(uvs[0]);uvB.copy(uvs[1]);uvC.copy(uvs[2]);uv = uvIntersection(intersectionPoint,a,b,c,uvA,uvB,uvC);}intersects.push({distance:distance,point:intersectionPointWorld.clone(),uv:uv,face:face,faceIndex:f,object:this});}}};})();THREE.Mesh.prototype.clone = function(){return new this.constructor(this.geometry,this.material).copy(this);};THREE.Mesh.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta); // only serialize if not in meta geometries cache
	if(meta.geometries[this.geometry.uuid] === undefined){meta.geometries[this.geometry.uuid] = this.geometry.toJSON(meta);} // only serialize if not in meta materials cache
	if(meta.materials[this.material.uuid] === undefined){meta.materials[this.material.uuid] = this.material.toJSON(meta);}data.object.geometry = this.geometry.uuid;data.object.material = this.material.uuid;return data;}; // File:src/objects/Bone.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author ikerr / http://verold.com
	 */THREE.Bone = function(skin){THREE.Object3D.call(this);this.type = 'Bone';this.skin = skin;};THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);THREE.Bone.prototype.constructor = THREE.Bone;THREE.Bone.prototype.copy = function(source){THREE.Object3D.prototype.copy.call(this,source);this.skin = source.skin;return this;}; // File:src/objects/Skeleton.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author michael guerrero / http://realitymeltdown.com
	 * @author ikerr / http://verold.com
	 */THREE.Skeleton = function(bones,boneInverses,useVertexTexture){this.useVertexTexture = useVertexTexture !== undefined?useVertexTexture:true;this.identityMatrix = new THREE.Matrix4(); // copy the bone array
	bones = bones || [];this.bones = bones.slice(0); // create a bone texture or an array of floats
	if(this.useVertexTexture){ // layout (1 matrix = 4 pixels)
	//      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
	//  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
	//       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
	//       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
	//       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)
	var size=Math.sqrt(this.bones.length * 4); // 4 pixels needed for 1 matrix
	size = THREE.Math.nextPowerOfTwo(Math.ceil(size));size = Math.max(size,4);this.boneTextureWidth = size;this.boneTextureHeight = size;this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4); // 4 floats per RGBA pixel
	this.boneTexture = new THREE.DataTexture(this.boneMatrices,this.boneTextureWidth,this.boneTextureHeight,THREE.RGBAFormat,THREE.FloatType);}else {this.boneMatrices = new Float32Array(16 * this.bones.length);} // use the supplied bone inverses or calculate the inverses
	if(boneInverses === undefined){this.calculateInverses();}else {if(this.bones.length === boneInverses.length){this.boneInverses = boneInverses.slice(0);}else {console.warn('THREE.Skeleton bonInverses is the wrong length.');this.boneInverses = [];for(var b=0,bl=this.bones.length;b < bl;b++) {this.boneInverses.push(new THREE.Matrix4());}}}};THREE.Skeleton.prototype.calculateInverses = function(){this.boneInverses = [];for(var b=0,bl=this.bones.length;b < bl;b++) {var inverse=new THREE.Matrix4();if(this.bones[b]){inverse.getInverse(this.bones[b].matrixWorld);}this.boneInverses.push(inverse);}};THREE.Skeleton.prototype.pose = function(){var bone; // recover the bind-time world matrices
	for(var b=0,bl=this.bones.length;b < bl;b++) {bone = this.bones[b];if(bone){bone.matrixWorld.getInverse(this.boneInverses[b]);}} // compute the local matrices, positions, rotations and scales
	for(var b=0,bl=this.bones.length;b < bl;b++) {bone = this.bones[b];if(bone){if(bone.parent){bone.matrix.getInverse(bone.parent.matrixWorld);bone.matrix.multiply(bone.matrixWorld);}else {bone.matrix.copy(bone.matrixWorld);}bone.matrix.decompose(bone.position,bone.quaternion,bone.scale);}}};THREE.Skeleton.prototype.update = (function(){var offsetMatrix=new THREE.Matrix4();return function update(){ // flatten bone matrices to array
	for(var b=0,bl=this.bones.length;b < bl;b++) { // compute the offset between the current and the original transform
	var matrix=this.bones[b]?this.bones[b].matrixWorld:this.identityMatrix;offsetMatrix.multiplyMatrices(matrix,this.boneInverses[b]);offsetMatrix.flattenToArrayOffset(this.boneMatrices,b * 16);}if(this.useVertexTexture){this.boneTexture.needsUpdate = true;}};})();THREE.Skeleton.prototype.clone = function(){return new THREE.Skeleton(this.bones,this.boneInverses,this.useVertexTexture);}; // File:src/objects/SkinnedMesh.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author ikerr / http://verold.com
	 */THREE.SkinnedMesh = function(geometry,material,useVertexTexture){THREE.Mesh.call(this,geometry,material);this.type = 'SkinnedMesh';this.bindMode = "attached";this.bindMatrix = new THREE.Matrix4();this.bindMatrixInverse = new THREE.Matrix4(); // init bones
	// TODO: remove bone creation as there is no reason (other than
	// convenience) for THREE.SkinnedMesh to do this.
	var bones=[];if(this.geometry && this.geometry.bones !== undefined){var bone,gbone;for(var b=0,bl=this.geometry.bones.length;b < bl;++b) {gbone = this.geometry.bones[b];bone = new THREE.Bone(this);bones.push(bone);bone.name = gbone.name;bone.position.fromArray(gbone.pos);bone.quaternion.fromArray(gbone.rotq);if(gbone.scl !== undefined)bone.scale.fromArray(gbone.scl);}for(var b=0,bl=this.geometry.bones.length;b < bl;++b) {gbone = this.geometry.bones[b];if(gbone.parent !== -1){bones[gbone.parent].add(bones[b]);}else {this.add(bones[b]);}}}this.normalizeSkinWeights();this.updateMatrixWorld(true);this.bind(new THREE.Skeleton(bones,undefined,useVertexTexture),this.matrixWorld);};THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;THREE.SkinnedMesh.prototype.bind = function(skeleton,bindMatrix){this.skeleton = skeleton;if(bindMatrix === undefined){this.updateMatrixWorld(true);this.skeleton.calculateInverses();bindMatrix = this.matrixWorld;}this.bindMatrix.copy(bindMatrix);this.bindMatrixInverse.getInverse(bindMatrix);};THREE.SkinnedMesh.prototype.pose = function(){this.skeleton.pose();};THREE.SkinnedMesh.prototype.normalizeSkinWeights = function(){if(this.geometry instanceof THREE.Geometry){for(var i=0;i < this.geometry.skinIndices.length;i++) {var sw=this.geometry.skinWeights[i];var scale=1.0 / sw.lengthManhattan();if(scale !== Infinity){sw.multiplyScalar(scale);}else {sw.set(1); // this will be normalized by the shader anyway
	}}}else { // skinning weights assumed to be normalized for THREE.BufferGeometry
	}};THREE.SkinnedMesh.prototype.updateMatrixWorld = function(force){THREE.Mesh.prototype.updateMatrixWorld.call(this,true);if(this.bindMode === "attached"){this.bindMatrixInverse.getInverse(this.matrixWorld);}else if(this.bindMode === "detached"){this.bindMatrixInverse.getInverse(this.bindMatrix);}else {console.warn('THREE.SkinnedMesh unrecognized bindMode: ' + this.bindMode);}};THREE.SkinnedMesh.prototype.clone = function(){return new this.constructor(this.geometry,this.material,this.useVertexTexture).copy(this);}; // File:src/objects/MorphAnimMesh.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.MorphAnimMesh = function(geometry,material){THREE.Mesh.call(this,geometry,material);this.type = 'MorphAnimMesh'; // API
	this.duration = 1000; // milliseconds
	this.mirroredLoop = false;this.time = 0; // internals
	this.lastKeyframe = 0;this.currentKeyframe = 0;this.direction = 1;this.directionBackwards = false;this.setFrameRange(0,geometry.morphTargets.length - 1);};THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);THREE.MorphAnimMesh.prototype.constructor = THREE.MorphAnimMesh;THREE.MorphAnimMesh.prototype.setFrameRange = function(start,end){this.startKeyframe = start;this.endKeyframe = end;this.length = this.endKeyframe - this.startKeyframe + 1;};THREE.MorphAnimMesh.prototype.setDirectionForward = function(){this.direction = 1;this.directionBackwards = false;};THREE.MorphAnimMesh.prototype.setDirectionBackward = function(){this.direction = -1;this.directionBackwards = true;};THREE.MorphAnimMesh.prototype.parseAnimations = function(){var geometry=this.geometry;if(!geometry.animations)geometry.animations = {};var firstAnimation,animations=geometry.animations;var pattern=/([a-z]+)_?(\d+)/;for(var i=0,il=geometry.morphTargets.length;i < il;i++) {var morph=geometry.morphTargets[i];var parts=morph.name.match(pattern);if(parts && parts.length > 1){var label=parts[1];if(!animations[label])animations[label] = {start:Infinity,end:-Infinity};var animation=animations[label];if(i < animation.start)animation.start = i;if(i > animation.end)animation.end = i;if(!firstAnimation)firstAnimation = label;}}geometry.firstAnimation = firstAnimation;};THREE.MorphAnimMesh.prototype.setAnimationLabel = function(label,start,end){if(!this.geometry.animations)this.geometry.animations = {};this.geometry.animations[label] = {start:start,end:end};};THREE.MorphAnimMesh.prototype.playAnimation = function(label,fps){var animation=this.geometry.animations[label];if(animation){this.setFrameRange(animation.start,animation.end);this.duration = 1000 * ((animation.end - animation.start) / fps);this.time = 0;}else {console.warn('THREE.MorphAnimMesh: animation[' + label + '] undefined in .playAnimation()');}};THREE.MorphAnimMesh.prototype.updateAnimation = function(delta){var frameTime=this.duration / this.length;this.time += this.direction * delta;if(this.mirroredLoop){if(this.time > this.duration || this.time < 0){this.direction *= -1;if(this.time > this.duration){this.time = this.duration;this.directionBackwards = true;}if(this.time < 0){this.time = 0;this.directionBackwards = false;}}}else {this.time = this.time % this.duration;if(this.time < 0)this.time += this.duration;}var keyframe=this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / frameTime),0,this.length - 1);var influences=this.morphTargetInfluences;if(keyframe !== this.currentKeyframe){influences[this.lastKeyframe] = 0;influences[this.currentKeyframe] = 1;influences[keyframe] = 0;this.lastKeyframe = this.currentKeyframe;this.currentKeyframe = keyframe;}var mix=this.time % frameTime / frameTime;if(this.directionBackwards){mix = 1 - mix;}influences[this.currentKeyframe] = mix;influences[this.lastKeyframe] = 1 - mix;};THREE.MorphAnimMesh.prototype.interpolateTargets = function(a,b,t){var influences=this.morphTargetInfluences;for(var i=0,l=influences.length;i < l;i++) {influences[i] = 0;}if(a > -1)influences[a] = 1 - t;if(b > -1)influences[b] = t;};THREE.MorphAnimMesh.prototype.copy = function(source){THREE.Mesh.prototype.copy.call(this,source);this.duration = source.duration;this.mirroredLoop = source.mirroredLoop;this.time = source.time;this.lastKeyframe = source.lastKeyframe;this.currentKeyframe = source.currentKeyframe;this.direction = source.direction;this.directionBackwards = source.directionBackwards;return this;}; // File:src/objects/LOD.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.LOD = function(){THREE.Object3D.call(this);this.type = 'LOD';Object.defineProperties(this,{levels:{enumerable:true,value:[]},objects:{get:function get(){console.warn('THREE.LOD: .objects has been renamed to .levels.');return this.levels;}}});};THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);THREE.LOD.prototype.constructor = THREE.LOD;THREE.LOD.prototype.addLevel = function(object,distance){if(distance === undefined)distance = 0;distance = Math.abs(distance);var levels=this.levels;for(var l=0;l < levels.length;l++) {if(distance < levels[l].distance){break;}}levels.splice(l,0,{distance:distance,object:object});this.add(object);};THREE.LOD.prototype.getObjectForDistance = function(distance){var levels=this.levels;for(var i=1,l=levels.length;i < l;i++) {if(distance < levels[i].distance){break;}}return levels[i - 1].object;};THREE.LOD.prototype.raycast = (function(){var matrixPosition=new THREE.Vector3();return function raycast(raycaster,intersects){matrixPosition.setFromMatrixPosition(this.matrixWorld);var distance=raycaster.ray.origin.distanceTo(matrixPosition);this.getObjectForDistance(distance).raycast(raycaster,intersects);};})();THREE.LOD.prototype.update = (function(){var v1=new THREE.Vector3();var v2=new THREE.Vector3();return function update(camera){var levels=this.levels;if(levels.length > 1){v1.setFromMatrixPosition(camera.matrixWorld);v2.setFromMatrixPosition(this.matrixWorld);var distance=v1.distanceTo(v2);levels[0].object.visible = true;for(var i=1,l=levels.length;i < l;i++) {if(distance >= levels[i].distance){levels[i - 1].object.visible = false;levels[i].object.visible = true;}else {break;}}for(;i < l;i++) {levels[i].object.visible = false;}}};})();THREE.LOD.prototype.copy = function(source){THREE.Object3D.prototype.copy.call(this,source,false);var levels=source.levels;for(var i=0,l=levels.length;i < l;i++) {var level=levels[i];this.addLevel(level.object.clone(),level.distance);}return this;};THREE.LOD.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta);data.object.levels = [];var levels=this.levels;for(var i=0,l=levels.length;i < l;i++) {var level=levels[i];data.object.levels.push({object:level.object.uuid,distance:level.distance});}return data;}; // File:src/objects/Sprite.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Sprite = (function(){var indices=new Uint16Array([0,1,2,0,2,3]);var vertices=new Float32Array([-0.5,-0.5,0,0.5,-0.5,0,0.5,0.5,0,-0.5,0.5,0]);var uvs=new Float32Array([0,0,1,0,1,1,0,1]);var geometry=new THREE.BufferGeometry();geometry.setIndex(new THREE.BufferAttribute(indices,1));geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));geometry.addAttribute('uv',new THREE.BufferAttribute(uvs,2));return function Sprite(material){THREE.Object3D.call(this);this.type = 'Sprite';this.geometry = geometry;this.material = material !== undefined?material:new THREE.SpriteMaterial();};})();THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);THREE.Sprite.prototype.constructor = THREE.Sprite;THREE.Sprite.prototype.raycast = (function(){var matrixPosition=new THREE.Vector3();return function raycast(raycaster,intersects){matrixPosition.setFromMatrixPosition(this.matrixWorld);var distanceSq=raycaster.ray.distanceSqToPoint(matrixPosition);var guessSizeSq=this.scale.x * this.scale.y;if(distanceSq > guessSizeSq){return;}intersects.push({distance:Math.sqrt(distanceSq),point:this.position,face:null,object:this});};})();THREE.Sprite.prototype.clone = function(){return new this.constructor(this.material).copy(this);};THREE.Sprite.prototype.toJSON = function(meta){var data=THREE.Object3D.prototype.toJSON.call(this,meta); // only serialize if not in meta materials cache
	if(meta.materials[this.material.uuid] === undefined){meta.materials[this.material.uuid] = this.material.toJSON();}data.object.material = this.material.uuid;return data;}; // Backwards compatibility
	THREE.Particle = THREE.Sprite; // File:src/objects/LensFlare.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.LensFlare = function(texture,size,distance,blending,color){THREE.Object3D.call(this);this.lensFlares = [];this.positionScreen = new THREE.Vector3();this.customUpdateCallback = undefined;if(texture !== undefined){this.add(texture,size,distance,blending,color);}};THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);THREE.LensFlare.prototype.constructor = THREE.LensFlare; /*
	 * Add: adds another flare
	 */THREE.LensFlare.prototype.add = function(texture,size,distance,blending,color,opacity){if(size === undefined)size = -1;if(distance === undefined)distance = 0;if(opacity === undefined)opacity = 1;if(color === undefined)color = new THREE.Color(0xffffff);if(blending === undefined)blending = THREE.NormalBlending;distance = Math.min(distance,Math.max(0,distance));this.lensFlares.push({texture:texture, // THREE.Texture
	size:size, // size in pixels (-1 = use texture.width)
	distance:distance, // distance (0-1) from light source (0=at light source)
	x:0,y:0,z:0, // screen position (-1 => 1) z = 0 is in front z = 1 is back
	scale:1, // scale
	rotation:0, // rotation
	opacity:opacity, // opacity
	color:color, // color
	blending:blending // blending
	});}; /*
	 * Update lens flares update positions on all flares based on the screen position
	 * Set myLensFlare.customUpdateCallback to alter the flares in your project specific way.
	 */THREE.LensFlare.prototype.updateLensFlares = function(){var f,fl=this.lensFlares.length;var flare;var vecX=-this.positionScreen.x * 2;var vecY=-this.positionScreen.y * 2;for(f = 0;f < fl;f++) {flare = this.lensFlares[f];flare.x = this.positionScreen.x + vecX * flare.distance;flare.y = this.positionScreen.y + vecY * flare.distance;flare.wantedRotation = flare.x * Math.PI * 0.25;flare.rotation += (flare.wantedRotation - flare.rotation) * 0.25;}};THREE.LensFlare.prototype.copy = function(source){THREE.Object3D.prototype.copy.call(this,source);this.positionScreen.copy(source.positionScreen);this.customUpdateCallback = source.customUpdateCallback;for(var i=0,l=source.lensFlares.length;i < l;i++) {this.lensFlares.push(source.lensFlares[i]);}return this;}; // File:src/scenes/Scene.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Scene = function(){THREE.Object3D.call(this);this.type = 'Scene';this.fog = null;this.overrideMaterial = null;this.autoUpdate = true; // checked by the renderer
	};THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);THREE.Scene.prototype.constructor = THREE.Scene;THREE.Scene.prototype.copy = function(source){THREE.Object3D.prototype.copy.call(this,source);if(source.fog !== null)this.fog = source.fog.clone();if(source.overrideMaterial !== null)this.overrideMaterial = source.overrideMaterial.clone();this.autoUpdate = source.autoUpdate;this.matrixAutoUpdate = source.matrixAutoUpdate;return this;}; // File:src/scenes/Fog.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Fog = function(color,near,far){this.name = '';this.color = new THREE.Color(color);this.near = near !== undefined?near:1;this.far = far !== undefined?far:1000;};THREE.Fog.prototype.clone = function(){return new THREE.Fog(this.color.getHex(),this.near,this.far);}; // File:src/scenes/FogExp2.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.FogExp2 = function(color,density){this.name = '';this.color = new THREE.Color(color);this.density = density !== undefined?density:0.00025;};THREE.FogExp2.prototype.clone = function(){return new THREE.FogExp2(this.color.getHex(),this.density);}; // File:src/renderers/shaders/ShaderChunk.js
	THREE.ShaderChunk = {}; // File:src/renderers/shaders/ShaderChunk/alphamap_fragment.glsl
	THREE.ShaderChunk['alphamap_fragment'] = "#ifdef USE_ALPHAMAP\n\n	diffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/alphamap_pars_fragment.glsl
	THREE.ShaderChunk['alphamap_pars_fragment'] = "#ifdef USE_ALPHAMAP\n\n	uniform sampler2D alphaMap;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/alphatest_fragment.glsl
	THREE.ShaderChunk['alphatest_fragment'] = "#ifdef ALPHATEST\n\n	if ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/aomap_fragment.glsl
	THREE.ShaderChunk['aomap_fragment'] = "#ifdef USE_AOMAP\n\n	totalAmbientLight *= ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/aomap_pars_fragment.glsl
	THREE.ShaderChunk['aomap_pars_fragment'] = "#ifdef USE_AOMAP\n\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/begin_vertex.glsl
	THREE.ShaderChunk['begin_vertex'] = "\nvec3 transformed = vec3( position );\n"; // File:src/renderers/shaders/ShaderChunk/beginnormal_vertex.glsl
	THREE.ShaderChunk['beginnormal_vertex'] = "\nvec3 objectNormal = vec3( normal );\n"; // File:src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl
	THREE.ShaderChunk['bumpmap_pars_fragment'] = "#ifdef USE_BUMPMAP\n\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n\n	// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n	// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n	vec2 dHdxy_fwd() {\n\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n		return vec2( dBx, dBy );\n\n	}\n\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;		// normalized\n\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n\n		float fDet = dot( vSigmaX, R1 );\n\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n\n	}\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/color_fragment.glsl
	THREE.ShaderChunk['color_fragment'] = "#ifdef USE_COLOR\n\n	diffuseColor.rgb *= vColor;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/color_pars_fragment.glsl
	THREE.ShaderChunk['color_pars_fragment'] = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/color_pars_vertex.glsl
	THREE.ShaderChunk['color_pars_vertex'] = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/color_vertex.glsl
	THREE.ShaderChunk['color_vertex'] = "#ifdef USE_COLOR\n\n	vColor.xyz = color.xyz;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/common.glsl
	THREE.ShaderChunk['common'] = "#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\n\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n\n	return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n\n}\n\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n\n	return normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n\n}\n\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n	float distance = dot( planeNormal, point - pointOnPlane );\n\n	return - distance * planeNormal + point;\n\n}\n\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n	return sign( dot( point - pointOnPlane, planeNormal ) );\n\n}\n\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n\n}\n\nfloat calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {\n\n	if ( decayExponent > 0.0 ) {\n\n	  return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\n	}\n\n	return 1.0;\n\n}\n\nvec3 F_Schlick( in vec3 specularColor, in float dotLH ) {\n\n	// Original approximation by Christophe Schlick '94\n	//;float fresnel = pow( 1.0 - dotLH, 5.0 );\n\n	// Optimized variant (presented by Epic at SIGGRAPH '13)\n	float fresnel = exp2( ( -5.55437 * dotLH - 6.98316 ) * dotLH );\n\n	return ( 1.0 - specularColor ) * fresnel + specularColor;\n\n}\n\nfloat G_BlinnPhong_Implicit( /* in float dotNL, in float dotNV */ ) {\n\n	// geometry term is (n⋅l)(n⋅v) / 4(n⋅l)(n⋅v)\n\n	return 0.25;\n\n}\n\nfloat D_BlinnPhong( in float shininess, in float dotNH ) {\n\n	// factor of 1/PI in distribution term omitted\n\n	return ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n\n}\n\nvec3 BRDF_BlinnPhong( in vec3 specularColor, in float shininess, in vec3 normal, in vec3 lightDir, in vec3 viewDir ) {\n\n	vec3 halfDir = normalize( lightDir + viewDir );\n\n	//float dotNL = saturate( dot( normal, lightDir ) );\n	//float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotLH = saturate( dot( lightDir, halfDir ) );\n\n	vec3 F = F_Schlick( specularColor, dotLH );\n\n	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );\n\n	float D = D_BlinnPhong( shininess, dotNH );\n\n	return F * G * D;\n\n}\n\nvec3 inputToLinear( in vec3 a ) {\n\n	#ifdef GAMMA_INPUT\n\n		return pow( a, vec3( float( GAMMA_FACTOR ) ) );\n\n	#else\n\n		return a;\n\n	#endif\n\n}\n\nvec3 linearToOutput( in vec3 a ) {\n\n	#ifdef GAMMA_OUTPUT\n\n		return pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n\n	#else\n\n		return a;\n\n	#endif\n\n}\n"; // File:src/renderers/shaders/ShaderChunk/defaultnormal_vertex.glsl
	THREE.ShaderChunk['defaultnormal_vertex'] = "#ifdef FLIP_SIDED\n\n	objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;\n"; // File:src/renderers/shaders/ShaderChunk/displacementmap_vertex.glsl
	THREE.ShaderChunk['displacementmap_vertex'] = "#ifdef USE_DISPLACEMENTMAP\n\n	transformed += normal * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/displacementmap_pars_vertex.glsl
	THREE.ShaderChunk['displacementmap_pars_vertex'] = "#ifdef USE_DISPLACEMENTMAP\n\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/emissivemap_fragment.glsl
	THREE.ShaderChunk['emissivemap_fragment'] = "#ifdef USE_EMISSIVEMAP\n\n	vec4 emissiveColor = texture2D( emissiveMap, vUv );\n\n	emissiveColor.rgb = inputToLinear( emissiveColor.rgb );\n\n	totalEmissiveLight *= emissiveColor.rgb;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/emissivemap_pars_fragment.glsl
	THREE.ShaderChunk['emissivemap_pars_fragment'] = "#ifdef USE_EMISSIVEMAP\n\n	uniform sampler2D emissiveMap;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/envmap_fragment.glsl
	THREE.ShaderChunk['envmap_fragment'] = "#ifdef USE_ENVMAP\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n		// Transforming Normal Vectors with the Inverse Transformation\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n		#ifdef ENVMAP_MODE_REFLECTION\n\n			vec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n		#else\n\n			vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n		#endif\n\n	#else\n\n		vec3 reflectVec = vReflect;\n\n	#endif\n\n	#ifdef DOUBLE_SIDED\n		float flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n	#else\n		float flipNormal = 1.0;\n	#endif\n\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#elif defined( ENVMAP_TYPE_EQUIREC )\n		vec2 sampleUV;\n		sampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n		sampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n		vec4 envColor = texture2D( envMap, sampleUV );\n\n	#elif defined( ENVMAP_TYPE_SPHERE )\n		vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n		vec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n	#endif\n\n	envColor.xyz = inputToLinear( envColor.xyz );\n\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_MIX )\n\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_ADD )\n\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n	#endif\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/envmap_pars_fragment.glsl
	THREE.ShaderChunk['envmap_pars_fragment'] = "#ifdef USE_ENVMAP\n\n	uniform float reflectivity;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	uniform float flipEnvMap;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		uniform float refractionRatio;\n\n	#else\n\n		varying vec3 vReflect;\n\n	#endif\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/envmap_pars_vertex.glsl
	THREE.ShaderChunk['envmap_pars_vertex'] = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	varying vec3 vReflect;\n\n	uniform float refractionRatio;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/envmap_vertex.glsl
	THREE.ShaderChunk['envmap_vertex'] = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	vec3 worldNormal = transformDirection( objectNormal, modelMatrix );\n\n	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n	#ifdef ENVMAP_MODE_REFLECTION\n\n		vReflect = reflect( cameraToVertex, worldNormal );\n\n	#else\n\n		vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n	#endif\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/fog_fragment.glsl
	THREE.ShaderChunk['fog_fragment'] = "#ifdef USE_FOG\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n	#else\n\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n	#endif\n\n	#ifdef FOG_EXP2\n\n		float fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n\n	#else\n\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n	#endif\n	\n	outgoingLight = mix( outgoingLight, fogColor, fogFactor );\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/fog_pars_fragment.glsl
	THREE.ShaderChunk['fog_pars_fragment'] = "#ifdef USE_FOG\n\n	uniform vec3 fogColor;\n\n	#ifdef FOG_EXP2\n\n		uniform float fogDensity;\n\n	#else\n\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/lightmap_fragment.glsl
	THREE.ShaderChunk['lightmap_fragment'] = "#ifdef USE_LIGHTMAP\n\n	totalAmbientLight += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/lightmap_pars_fragment.glsl
	THREE.ShaderChunk['lightmap_pars_fragment'] = "#ifdef USE_LIGHTMAP\n\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/lights_lambert_pars_vertex.glsl
	THREE.ShaderChunk['lights_lambert_pars_vertex'] = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/lights_lambert_vertex.glsl
	THREE.ShaderChunk['lights_lambert_vertex'] = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vec3( 0.0 );\n\n#endif\n\nvec3 normal = normalize( transformedNormal );\n\n#if MAX_POINT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec3 lightColor = pointLightColor[ i ];\n\n		vec3 lVector = pointLightPosition[ i ] - mvPosition.xyz;\n		vec3 lightDir = normalize( lVector );\n\n		// attenuation\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lightDir );\n\n		vLightFront += lightColor * attenuation * saturate( dotProduct );\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += lightColor * attenuation * saturate( - dotProduct );\n\n		#endif\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec3 lightColor = spotLightColor[ i ];\n\n		vec3 lightPosition = spotLightPosition[ i ];\n		vec3 lVector = lightPosition - mvPosition.xyz;\n		vec3 lightDir = normalize( lVector );\n\n		float spotEffect = dot( spotLightDirection[ i ], lightDir );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = saturate( pow( saturate( spotEffect ), spotLightExponent[ i ] ) );\n\n			// attenuation\n\n			float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n			attenuation *= spotEffect;\n\n			// diffuse\n\n			float dotProduct = dot( normal, lightDir );\n\n			vLightFront += lightColor * attenuation * saturate( dotProduct );\n\n			#ifdef DOUBLE_SIDED\n\n				vLightBack += lightColor * attenuation * saturate( - dotProduct );\n\n			#endif\n\n		}\n\n	}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n		vec3 lightColor = directionalLightColor[ i ];\n\n		vec3 lightDir = directionalLightDirection[ i ];\n\n		// diffuse\n\n		float dotProduct = dot( normal, lightDir );\n\n		vLightFront += lightColor * saturate( dotProduct );\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += lightColor * saturate( - dotProduct );\n\n		#endif\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lightDir = hemisphereLightDirection[ i ];\n\n		// diffuse\n\n		float dotProduct = dot( normal, lightDir );\n\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n		vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		#ifdef DOUBLE_SIDED\n\n			float hemiDiffuseWeightBack = - 0.5 * dotProduct + 0.5;\n\n			vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n		#endif\n\n	}\n\n#endif\n\nvLightFront += ambientLightColor;\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack += ambientLightColor;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/lights_phong_fragment.glsl
	THREE.ShaderChunk['lights_phong_fragment'] = "#ifndef FLAT_SHADED\n\n	vec3 normal = normalize( vNormal );\n\n	#ifdef DOUBLE_SIDED\n\n		normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n	#endif\n\n#else\n\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n\n#endif\n\n#ifdef USE_NORMALMAP\n\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\nvec3 viewDir = normalize( vViewPosition );\n\nvec3 totalDiffuseLight = vec3( 0.0 );\nvec3 totalSpecularLight = vec3( 0.0 );\n\n#if MAX_POINT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec3 lightColor = pointLightColor[ i ];\n\n		vec3 lightPosition = pointLightPosition[ i ];\n		vec3 lVector = lightPosition + vViewPosition.xyz;\n		vec3 lightDir = normalize( lVector );\n\n		// attenuation\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		// diffuse\n\n		float cosineTerm = saturate( dot( normal, lightDir ) );\n\n		totalDiffuseLight += lightColor * attenuation * cosineTerm;\n\n		// specular\n\n		vec3 brdf = BRDF_BlinnPhong( specular, shininess, normal, lightDir, viewDir );\n\n		totalSpecularLight += brdf * specularStrength * lightColor * attenuation * cosineTerm;\n\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec3 lightColor = spotLightColor[ i ];\n\n		vec3 lightPosition = spotLightPosition[ i ];\n		vec3 lVector = lightPosition + vViewPosition.xyz;\n		vec3 lightDir = normalize( lVector );\n\n		float spotEffect = dot( spotLightDirection[ i ], lightDir );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = saturate( pow( saturate( spotEffect ), spotLightExponent[ i ] ) );\n\n			// attenuation\n\n			float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n			attenuation *= spotEffect;\n\n			// diffuse\n\n			float cosineTerm = saturate( dot( normal, lightDir ) );\n\n			totalDiffuseLight += lightColor * attenuation * cosineTerm;\n\n			// specular\n\n			vec3 brdf = BRDF_BlinnPhong( specular, shininess, normal, lightDir, viewDir );\n\n			totalSpecularLight += brdf * specularStrength * lightColor * attenuation * cosineTerm;\n\n		}\n\n	}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n	for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n		vec3 lightColor = directionalLightColor[ i ];\n\n		vec3 lightDir = directionalLightDirection[ i ];\n\n		// diffuse\n\n		float cosineTerm = saturate( dot( normal, lightDir ) );\n\n		totalDiffuseLight += lightColor * cosineTerm;\n\n		// specular\n\n		vec3 brdf = BRDF_BlinnPhong( specular, shininess, normal, lightDir, viewDir );\n\n		totalSpecularLight += brdf * specularStrength * lightColor * cosineTerm;\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lightDir = hemisphereLightDirection[ i ];\n\n		// diffuse\n\n		float dotProduct = dot( normal, lightDir );\n\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n		vec3 lightColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		totalDiffuseLight += lightColor;\n\n		// specular (sky term only)\n\n		vec3 brdf = BRDF_BlinnPhong( specular, shininess, normal, lightDir, viewDir );\n\n		totalSpecularLight += brdf * specularStrength * lightColor * max( dotProduct, 0.0 );\n\n	}\n\n#endif\n\n#ifdef METAL\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) * specular + totalSpecularLight + totalEmissiveLight;\n\n#else\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) + totalSpecularLight + totalEmissiveLight;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/lights_phong_pars_fragment.glsl
	THREE.ShaderChunk['lights_phong_pars_fragment'] = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n	varying vec3 vNormal;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/lights_phong_pars_vertex.glsl
	THREE.ShaderChunk['lights_phong_pars_vertex'] = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/lights_phong_vertex.glsl
	THREE.ShaderChunk['lights_phong_vertex'] = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_ENVMAP )\n\n	vWorldPosition = worldPosition.xyz;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/linear_to_gamma_fragment.glsl
	THREE.ShaderChunk['linear_to_gamma_fragment'] = "\n	outgoingLight = linearToOutput( outgoingLight );\n"; // File:src/renderers/shaders/ShaderChunk/logdepthbuf_fragment.glsl
	THREE.ShaderChunk['logdepthbuf_fragment'] = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/logdepthbuf_pars_fragment.glsl
	THREE.ShaderChunk['logdepthbuf_pars_fragment'] = "#ifdef USE_LOGDEPTHBUF\n\n	uniform float logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		varying float vFragDepth;\n\n	#endif\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/logdepthbuf_pars_vertex.glsl
	THREE.ShaderChunk['logdepthbuf_pars_vertex'] = "#ifdef USE_LOGDEPTHBUF\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		varying float vFragDepth;\n\n	#endif\n\n	uniform float logDepthBufFC;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/logdepthbuf_vertex.glsl
	THREE.ShaderChunk['logdepthbuf_vertex'] = "#ifdef USE_LOGDEPTHBUF\n\n	gl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n	#endif\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/map_fragment.glsl
	THREE.ShaderChunk['map_fragment'] = "#ifdef USE_MAP\n\n	vec4 texelColor = texture2D( map, vUv );\n\n	texelColor.xyz = inputToLinear( texelColor.xyz );\n\n	diffuseColor *= texelColor;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/map_pars_fragment.glsl
	THREE.ShaderChunk['map_pars_fragment'] = "#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/map_particle_fragment.glsl
	THREE.ShaderChunk['map_particle_fragment'] = "#ifdef USE_MAP\n\n	diffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/map_particle_pars_fragment.glsl
	THREE.ShaderChunk['map_particle_pars_fragment'] = "#ifdef USE_MAP\n\n	uniform vec4 offsetRepeat;\n	uniform sampler2D map;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/morphnormal_vertex.glsl
	THREE.ShaderChunk['morphnormal_vertex'] = "#ifdef USE_MORPHNORMALS\n\n	objectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	objectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	objectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	objectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/morphtarget_pars_vertex.glsl
	THREE.ShaderChunk['morphtarget_pars_vertex'] = "#ifdef USE_MORPHTARGETS\n\n	#ifndef USE_MORPHNORMALS\n\n	uniform float morphTargetInfluences[ 8 ];\n\n	#else\n\n	uniform float morphTargetInfluences[ 4 ];\n\n	#endif\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/morphtarget_vertex.glsl
	THREE.ShaderChunk['morphtarget_vertex'] = "#ifdef USE_MORPHTARGETS\n\n	transformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	transformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	transformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	transformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n	#ifndef USE_MORPHNORMALS\n\n	transformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	transformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	transformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	transformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n	#endif\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/normalmap_pars_fragment.glsl
	THREE.ShaderChunk['normalmap_pars_fragment'] = "#ifdef USE_NORMALMAP\n\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n\n	// Per-Pixel Tangent Space Normal Mapping\n	// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n\n		vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n\n	}\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/project_vertex.glsl
	THREE.ShaderChunk['project_vertex'] = "#ifdef USE_SKINNING\n\n	vec4 mvPosition = modelViewMatrix * skinned;\n\n#else\n\n	vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;\n"; // File:src/renderers/shaders/ShaderChunk/shadowmap_fragment.glsl
	THREE.ShaderChunk['shadowmap_fragment'] = "#ifdef USE_SHADOWMAP\n\n	#ifdef SHADOWMAP_DEBUG\n\n		vec3 frustumColors[3];\n		frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n		frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n		frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n	#endif\n\n	float fDepth;\n	vec3 shadowColor = vec3( 1.0 );\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n				// if ( something && something ) breaks ATI OpenGL shader compiler\n				// if ( all( something, something ) ) using this instead\n\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n\n		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n		bool frustumTest = all( frustumTestVec );\n\n		if ( frustumTest ) {\n\n			shadowCoord.z += shadowBias[ i ];\n\n			#if defined( SHADOWMAP_TYPE_PCF )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n		/*\n						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n						// must enroll loop manually\n\n				for ( float y = -1.25; y <= 1.25; y += 1.25 )\n					for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n						vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n								// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n								//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n						float fDepth = unpackDepth( rgbaDepth );\n\n						if ( fDepth < shadowCoord.z )\n							shadow += 1.0;\n\n				}\n\n				shadow /= 9.0;\n\n		*/\n\n				const float shadowDelta = 1.0 / 9.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.25 * xPixelOffset;\n				float dy0 = -1.25 * yPixelOffset;\n				float dx1 = 1.25 * xPixelOffset;\n				float dy1 = 1.25 * yPixelOffset;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.0 * xPixelOffset;\n				float dy0 = -1.0 * yPixelOffset;\n				float dx1 = 1.0 * xPixelOffset;\n				float dy1 = 1.0 * yPixelOffset;\n\n				mat3 shadowKernel;\n				mat3 depthKernel;\n\n				depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n				vec3 shadowZ = vec3( shadowCoord.z );\n				shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n				shadowKernel[0] *= vec3(0.25);\n\n				shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n				shadowKernel[1] *= vec3(0.25);\n\n				shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n				shadowKernel[2] *= vec3(0.25);\n\n				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n				shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n				shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n				vec4 shadowValues;\n				shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n				shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n				shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n				shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n				shadow = dot( shadowValues, vec4( 1.0 ) );\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#else\n\n				vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n				float fDepth = unpackDepth( rgbaDepth );\n\n				if ( fDepth < shadowCoord.z )\n\n		// spot with multiple shadows is darker\n\n					shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n		// spot with multiple shadows has the same color as single shadow spot\n\n		// 					shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n			#endif\n\n		}\n\n\n		#ifdef SHADOWMAP_DEBUG\n\n			if ( inFrustum ) outgoingLight *= frustumColors[ i ];\n\n		#endif\n\n	}\n\n	outgoingLight = outgoingLight * shadowColor;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/shadowmap_pars_fragment.glsl
	THREE.ShaderChunk['shadowmap_pars_fragment'] = "#ifdef USE_SHADOWMAP\n\n	uniform sampler2D shadowMap[ MAX_SHADOWS ];\n	uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n	uniform float shadowDarkness[ MAX_SHADOWS ];\n	uniform float shadowBias[ MAX_SHADOWS ];\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n	float unpackDepth( const in vec4 rgba_depth ) {\n\n		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n		float depth = dot( rgba_depth, bit_shift );\n		return depth;\n\n	}\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/shadowmap_pars_vertex.glsl
	THREE.ShaderChunk['shadowmap_pars_vertex'] = "#ifdef USE_SHADOWMAP\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/shadowmap_vertex.glsl
	THREE.ShaderChunk['shadowmap_vertex'] = "#ifdef USE_SHADOWMAP\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n	}\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/skinbase_vertex.glsl
	THREE.ShaderChunk['skinbase_vertex'] = "#ifdef USE_SKINNING\n\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/skinning_pars_vertex.glsl
	THREE.ShaderChunk['skinning_pars_vertex'] = "#ifdef USE_SKINNING\n\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n\n	#ifdef BONE_TEXTURE\n\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n\n			y = dy * ( y + 0.5 );\n\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n			mat4 bone = mat4( v1, v2, v3, v4 );\n\n			return bone;\n\n		}\n\n	#else\n\n		uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			mat4 bone = boneGlobalMatrices[ int(i) ];\n			return bone;\n\n		}\n\n	#endif\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/skinning_vertex.glsl
	THREE.ShaderChunk['skinning_vertex'] = "#ifdef USE_SKINNING\n\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	skinned  = bindMatrixInverse * skinned;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/skinnormal_vertex.glsl
	THREE.ShaderChunk['skinnormal_vertex'] = "#ifdef USE_SKINNING\n\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/specularmap_fragment.glsl
	THREE.ShaderChunk['specularmap_fragment'] = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n\n#else\n\n	specularStrength = 1.0;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/specularmap_pars_fragment.glsl
	THREE.ShaderChunk['specularmap_pars_fragment'] = "#ifdef USE_SPECULARMAP\n\n	uniform sampler2D specularMap;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/uv2_pars_fragment.glsl
	THREE.ShaderChunk['uv2_pars_fragment'] = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n	varying vec2 vUv2;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/uv2_pars_vertex.glsl
	THREE.ShaderChunk['uv2_pars_vertex'] = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n	attribute vec2 uv2;\n	varying vec2 vUv2;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/uv2_vertex.glsl
	THREE.ShaderChunk['uv2_vertex'] = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n	vUv2 = uv2;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/uv_pars_fragment.glsl
	THREE.ShaderChunk['uv_pars_fragment'] = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP )\n\n	varying vec2 vUv;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/uv_pars_vertex.glsl
	THREE.ShaderChunk['uv_pars_vertex'] = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP )\n\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n\n#endif\n"; // File:src/renderers/shaders/ShaderChunk/uv_vertex.glsl
	THREE.ShaderChunk['uv_vertex'] = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP )\n\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif"; // File:src/renderers/shaders/ShaderChunk/worldpos_vertex.glsl
	THREE.ShaderChunk['worldpos_vertex'] = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n	#ifdef USE_SKINNING\n\n		vec4 worldPosition = modelMatrix * skinned;\n\n	#else\n\n		vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\n	#endif\n\n#endif\n"; // File:src/renderers/shaders/UniformsUtils.js
	/**
	 * Uniform Utilities
	 */THREE.UniformsUtils = {merge:function merge(uniforms){var merged={};for(var u=0;u < uniforms.length;u++) {var tmp=this.clone(uniforms[u]);for(var p in tmp) {merged[p] = tmp[p];}}return merged;},clone:function clone(uniforms_src){var uniforms_dst={};for(var u in uniforms_src) {uniforms_dst[u] = {};for(var p in uniforms_src[u]) {var parameter_src=uniforms_src[u][p];if(parameter_src instanceof THREE.Color || parameter_src instanceof THREE.Vector2 || parameter_src instanceof THREE.Vector3 || parameter_src instanceof THREE.Vector4 || parameter_src instanceof THREE.Matrix3 || parameter_src instanceof THREE.Matrix4 || parameter_src instanceof THREE.Texture){uniforms_dst[u][p] = parameter_src.clone();}else if(Array.isArray(parameter_src)){uniforms_dst[u][p] = parameter_src.slice();}else {uniforms_dst[u][p] = parameter_src;}}}return uniforms_dst;}}; // File:src/renderers/shaders/UniformsLib.js
	/**
	 * Uniforms library for shared webgl shaders
	 */THREE.UniformsLib = {common:{"diffuse":{type:"c",value:new THREE.Color(0xeeeeee)},"opacity":{type:"f",value:1.0},"map":{type:"t",value:null},"offsetRepeat":{type:"v4",value:new THREE.Vector4(0,0,1,1)},"specularMap":{type:"t",value:null},"alphaMap":{type:"t",value:null},"envMap":{type:"t",value:null},"flipEnvMap":{type:"f",value:-1},"reflectivity":{type:"f",value:1.0},"refractionRatio":{type:"f",value:0.98}},aomap:{"aoMap":{type:"t",value:null},"aoMapIntensity":{type:"f",value:1}},lightmap:{"lightMap":{type:"t",value:null},"lightMapIntensity":{type:"f",value:1}},emissivemap:{"emissiveMap":{type:"t",value:null}},bumpmap:{"bumpMap":{type:"t",value:null},"bumpScale":{type:"f",value:1}},normalmap:{"normalMap":{type:"t",value:null},"normalScale":{type:"v2",value:new THREE.Vector2(1,1)}},displacementmap:{"displacementMap":{type:"t",value:null},"displacementScale":{type:"f",value:1},"displacementBias":{type:"f",value:0}},fog:{"fogDensity":{type:"f",value:0.00025},"fogNear":{type:"f",value:1},"fogFar":{type:"f",value:2000},"fogColor":{type:"c",value:new THREE.Color(0xffffff)}},lights:{"ambientLightColor":{type:"fv",value:[]},"directionalLightDirection":{type:"fv",value:[]},"directionalLightColor":{type:"fv",value:[]},"hemisphereLightDirection":{type:"fv",value:[]},"hemisphereLightSkyColor":{type:"fv",value:[]},"hemisphereLightGroundColor":{type:"fv",value:[]},"pointLightColor":{type:"fv",value:[]},"pointLightPosition":{type:"fv",value:[]},"pointLightDistance":{type:"fv1",value:[]},"pointLightDecay":{type:"fv1",value:[]},"spotLightColor":{type:"fv",value:[]},"spotLightPosition":{type:"fv",value:[]},"spotLightDirection":{type:"fv",value:[]},"spotLightDistance":{type:"fv1",value:[]},"spotLightAngleCos":{type:"fv1",value:[]},"spotLightExponent":{type:"fv1",value:[]},"spotLightDecay":{type:"fv1",value:[]}},points:{"psColor":{type:"c",value:new THREE.Color(0xeeeeee)},"opacity":{type:"f",value:1.0},"size":{type:"f",value:1.0},"scale":{type:"f",value:1.0},"map":{type:"t",value:null},"offsetRepeat":{type:"v4",value:new THREE.Vector4(0,0,1,1)},"fogDensity":{type:"f",value:0.00025},"fogNear":{type:"f",value:1},"fogFar":{type:"f",value:2000},"fogColor":{type:"c",value:new THREE.Color(0xffffff)}},shadowmap:{"shadowMap":{type:"tv",value:[]},"shadowMapSize":{type:"v2v",value:[]},"shadowBias":{type:"fv1",value:[]},"shadowDarkness":{type:"fv1",value:[]},"shadowMatrix":{type:"m4v",value:[]}}}; // File:src/renderers/shaders/ShaderLib.js
	/**
	 * Webgl Shader Library for three.js
	 *
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 * @author mikael emtinger / http://gomo.se/
	 */THREE.ShaderLib = {'basic':{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib["common"],THREE.UniformsLib["aomap"],THREE.UniformsLib["fog"],THREE.UniformsLib["shadowmap"]]),vertexShader:[THREE.ShaderChunk["common"],THREE.ShaderChunk["uv_pars_vertex"],THREE.ShaderChunk["uv2_pars_vertex"],THREE.ShaderChunk["envmap_pars_vertex"],THREE.ShaderChunk["color_pars_vertex"],THREE.ShaderChunk["morphtarget_pars_vertex"],THREE.ShaderChunk["skinning_pars_vertex"],THREE.ShaderChunk["shadowmap_pars_vertex"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {",THREE.ShaderChunk["uv_vertex"],THREE.ShaderChunk["uv2_vertex"],THREE.ShaderChunk["color_vertex"],THREE.ShaderChunk["skinbase_vertex"],"	#ifdef USE_ENVMAP",THREE.ShaderChunk["beginnormal_vertex"],THREE.ShaderChunk["morphnormal_vertex"],THREE.ShaderChunk["skinnormal_vertex"],THREE.ShaderChunk["defaultnormal_vertex"],"	#endif",THREE.ShaderChunk["begin_vertex"],THREE.ShaderChunk["morphtarget_vertex"],THREE.ShaderChunk["skinning_vertex"],THREE.ShaderChunk["project_vertex"],THREE.ShaderChunk["logdepthbuf_vertex"],THREE.ShaderChunk["worldpos_vertex"],THREE.ShaderChunk["envmap_vertex"],THREE.ShaderChunk["shadowmap_vertex"],"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform float opacity;",THREE.ShaderChunk["common"],THREE.ShaderChunk["color_pars_fragment"],THREE.ShaderChunk["uv_pars_fragment"],THREE.ShaderChunk["uv2_pars_fragment"],THREE.ShaderChunk["map_pars_fragment"],THREE.ShaderChunk["alphamap_pars_fragment"],THREE.ShaderChunk["aomap_pars_fragment"],THREE.ShaderChunk["envmap_pars_fragment"],THREE.ShaderChunk["fog_pars_fragment"],THREE.ShaderChunk["shadowmap_pars_fragment"],THREE.ShaderChunk["specularmap_pars_fragment"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( diffuse, opacity );","	vec3 totalAmbientLight = vec3( 1.0 );", // hardwired
	THREE.ShaderChunk["logdepthbuf_fragment"],THREE.ShaderChunk["map_fragment"],THREE.ShaderChunk["color_fragment"],THREE.ShaderChunk["alphamap_fragment"],THREE.ShaderChunk["alphatest_fragment"],THREE.ShaderChunk["specularmap_fragment"],THREE.ShaderChunk["aomap_fragment"],"	outgoingLight = diffuseColor.rgb * totalAmbientLight;", // simple shader
	THREE.ShaderChunk["envmap_fragment"],THREE.ShaderChunk["shadowmap_fragment"], // TODO: Shadows on an otherwise unlit surface doesn't make sense.
	THREE.ShaderChunk["linear_to_gamma_fragment"],THREE.ShaderChunk["fog_fragment"],"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},'lambert':{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib["common"],THREE.UniformsLib["fog"],THREE.UniformsLib["lights"],THREE.UniformsLib["shadowmap"],{"emissive":{type:"c",value:new THREE.Color(0x000000)}}]),vertexShader:["#define LAMBERT","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","	varying vec3 vLightBack;","#endif",THREE.ShaderChunk["common"],THREE.ShaderChunk["uv_pars_vertex"],THREE.ShaderChunk["uv2_pars_vertex"],THREE.ShaderChunk["envmap_pars_vertex"],THREE.ShaderChunk["lights_lambert_pars_vertex"],THREE.ShaderChunk["color_pars_vertex"],THREE.ShaderChunk["morphtarget_pars_vertex"],THREE.ShaderChunk["skinning_pars_vertex"],THREE.ShaderChunk["shadowmap_pars_vertex"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {",THREE.ShaderChunk["uv_vertex"],THREE.ShaderChunk["uv2_vertex"],THREE.ShaderChunk["color_vertex"],THREE.ShaderChunk["beginnormal_vertex"],THREE.ShaderChunk["morphnormal_vertex"],THREE.ShaderChunk["skinbase_vertex"],THREE.ShaderChunk["skinnormal_vertex"],THREE.ShaderChunk["defaultnormal_vertex"],THREE.ShaderChunk["begin_vertex"],THREE.ShaderChunk["morphtarget_vertex"],THREE.ShaderChunk["skinning_vertex"],THREE.ShaderChunk["project_vertex"],THREE.ShaderChunk["logdepthbuf_vertex"],THREE.ShaderChunk["worldpos_vertex"],THREE.ShaderChunk["envmap_vertex"],THREE.ShaderChunk["lights_lambert_vertex"],THREE.ShaderChunk["shadowmap_vertex"],"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform vec3 emissive;","uniform float opacity;","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","	varying vec3 vLightBack;","#endif",THREE.ShaderChunk["common"],THREE.ShaderChunk["color_pars_fragment"],THREE.ShaderChunk["uv_pars_fragment"],THREE.ShaderChunk["uv2_pars_fragment"],THREE.ShaderChunk["map_pars_fragment"],THREE.ShaderChunk["alphamap_pars_fragment"],THREE.ShaderChunk["envmap_pars_fragment"],THREE.ShaderChunk["fog_pars_fragment"],THREE.ShaderChunk["shadowmap_pars_fragment"],THREE.ShaderChunk["specularmap_pars_fragment"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {","	vec3 outgoingLight = vec3( 0.0 );", // outgoing light does not have an alpha, the surface does
	"	vec4 diffuseColor = vec4( diffuse, opacity );",THREE.ShaderChunk["logdepthbuf_fragment"],THREE.ShaderChunk["map_fragment"],THREE.ShaderChunk["color_fragment"],THREE.ShaderChunk["alphamap_fragment"],THREE.ShaderChunk["alphatest_fragment"],THREE.ShaderChunk["specularmap_fragment"],"	#ifdef DOUBLE_SIDED","		if ( gl_FrontFacing )","			outgoingLight += diffuseColor.rgb * vLightFront + emissive;","		else","			outgoingLight += diffuseColor.rgb * vLightBack + emissive;","	#else","		outgoingLight += diffuseColor.rgb * vLightFront + emissive;","	#endif",THREE.ShaderChunk["envmap_fragment"],THREE.ShaderChunk["shadowmap_fragment"],THREE.ShaderChunk["linear_to_gamma_fragment"],THREE.ShaderChunk["fog_fragment"],"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},'phong':{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib["common"],THREE.UniformsLib["aomap"],THREE.UniformsLib["lightmap"],THREE.UniformsLib["emissivemap"],THREE.UniformsLib["bumpmap"],THREE.UniformsLib["normalmap"],THREE.UniformsLib["displacementmap"],THREE.UniformsLib["fog"],THREE.UniformsLib["lights"],THREE.UniformsLib["shadowmap"],{"emissive":{type:"c",value:new THREE.Color(0x000000)},"specular":{type:"c",value:new THREE.Color(0x111111)},"shininess":{type:"f",value:30}}]),vertexShader:["#define PHONG","varying vec3 vViewPosition;","#ifndef FLAT_SHADED","	varying vec3 vNormal;","#endif",THREE.ShaderChunk["common"],THREE.ShaderChunk["uv_pars_vertex"],THREE.ShaderChunk["uv2_pars_vertex"],THREE.ShaderChunk["displacementmap_pars_vertex"],THREE.ShaderChunk["envmap_pars_vertex"],THREE.ShaderChunk["lights_phong_pars_vertex"],THREE.ShaderChunk["color_pars_vertex"],THREE.ShaderChunk["morphtarget_pars_vertex"],THREE.ShaderChunk["skinning_pars_vertex"],THREE.ShaderChunk["shadowmap_pars_vertex"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {",THREE.ShaderChunk["uv_vertex"],THREE.ShaderChunk["uv2_vertex"],THREE.ShaderChunk["color_vertex"],THREE.ShaderChunk["beginnormal_vertex"],THREE.ShaderChunk["morphnormal_vertex"],THREE.ShaderChunk["skinbase_vertex"],THREE.ShaderChunk["skinnormal_vertex"],THREE.ShaderChunk["defaultnormal_vertex"],"#ifndef FLAT_SHADED", // Normal computed with derivatives when FLAT_SHADED
	"	vNormal = normalize( transformedNormal );","#endif",THREE.ShaderChunk["begin_vertex"],THREE.ShaderChunk["displacementmap_vertex"],THREE.ShaderChunk["morphtarget_vertex"],THREE.ShaderChunk["skinning_vertex"],THREE.ShaderChunk["project_vertex"],THREE.ShaderChunk["logdepthbuf_vertex"],"	vViewPosition = - mvPosition.xyz;",THREE.ShaderChunk["worldpos_vertex"],THREE.ShaderChunk["envmap_vertex"],THREE.ShaderChunk["lights_phong_vertex"],THREE.ShaderChunk["shadowmap_vertex"],"}"].join("\n"),fragmentShader:["#define PHONG","uniform vec3 diffuse;","uniform vec3 emissive;","uniform vec3 specular;","uniform float shininess;","uniform float opacity;",THREE.ShaderChunk["common"],THREE.ShaderChunk["color_pars_fragment"],THREE.ShaderChunk["uv_pars_fragment"],THREE.ShaderChunk["uv2_pars_fragment"],THREE.ShaderChunk["map_pars_fragment"],THREE.ShaderChunk["alphamap_pars_fragment"],THREE.ShaderChunk["aomap_pars_fragment"],THREE.ShaderChunk["lightmap_pars_fragment"],THREE.ShaderChunk["emissivemap_pars_fragment"],THREE.ShaderChunk["envmap_pars_fragment"],THREE.ShaderChunk["fog_pars_fragment"],THREE.ShaderChunk["lights_phong_pars_fragment"],THREE.ShaderChunk["shadowmap_pars_fragment"],THREE.ShaderChunk["bumpmap_pars_fragment"],THREE.ShaderChunk["normalmap_pars_fragment"],THREE.ShaderChunk["specularmap_pars_fragment"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( diffuse, opacity );","	vec3 totalAmbientLight = ambientLightColor;","	vec3 totalEmissiveLight = emissive;",THREE.ShaderChunk["logdepthbuf_fragment"],THREE.ShaderChunk["map_fragment"],THREE.ShaderChunk["color_fragment"],THREE.ShaderChunk["alphamap_fragment"],THREE.ShaderChunk["alphatest_fragment"],THREE.ShaderChunk["specularmap_fragment"],THREE.ShaderChunk["lightmap_fragment"],THREE.ShaderChunk["aomap_fragment"],THREE.ShaderChunk["emissivemap_fragment"],THREE.ShaderChunk["lights_phong_fragment"],THREE.ShaderChunk["envmap_fragment"],THREE.ShaderChunk["shadowmap_fragment"],THREE.ShaderChunk["linear_to_gamma_fragment"],THREE.ShaderChunk["fog_fragment"],"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},'points':{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib["points"],THREE.UniformsLib["shadowmap"]]),vertexShader:["uniform float size;","uniform float scale;",THREE.ShaderChunk["common"],THREE.ShaderChunk["color_pars_vertex"],THREE.ShaderChunk["shadowmap_pars_vertex"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {",THREE.ShaderChunk["color_vertex"],"	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","	#ifdef USE_SIZEATTENUATION","		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );","	#else","		gl_PointSize = size;","	#endif","	gl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk["logdepthbuf_vertex"],THREE.ShaderChunk["worldpos_vertex"],THREE.ShaderChunk["shadowmap_vertex"],"}"].join("\n"),fragmentShader:["uniform vec3 psColor;","uniform float opacity;",THREE.ShaderChunk["common"],THREE.ShaderChunk["color_pars_fragment"],THREE.ShaderChunk["map_particle_pars_fragment"],THREE.ShaderChunk["fog_pars_fragment"],THREE.ShaderChunk["shadowmap_pars_fragment"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( psColor, opacity );",THREE.ShaderChunk["logdepthbuf_fragment"],THREE.ShaderChunk["map_particle_fragment"],THREE.ShaderChunk["color_fragment"],THREE.ShaderChunk["alphatest_fragment"],"	outgoingLight = diffuseColor.rgb;", // simple shader
	THREE.ShaderChunk["shadowmap_fragment"],THREE.ShaderChunk["fog_fragment"],"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},'dashed':{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib["common"],THREE.UniformsLib["fog"],{"scale":{type:"f",value:1},"dashSize":{type:"f",value:1},"totalSize":{type:"f",value:2}}]),vertexShader:["uniform float scale;","attribute float lineDistance;","varying float vLineDistance;",THREE.ShaderChunk["common"],THREE.ShaderChunk["color_pars_vertex"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {",THREE.ShaderChunk["color_vertex"],"	vLineDistance = scale * lineDistance;","	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","	gl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk["logdepthbuf_vertex"],"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform float opacity;","uniform float dashSize;","uniform float totalSize;","varying float vLineDistance;",THREE.ShaderChunk["common"],THREE.ShaderChunk["color_pars_fragment"],THREE.ShaderChunk["fog_pars_fragment"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {","	if ( mod( vLineDistance, totalSize ) > dashSize ) {","		discard;","	}","	vec3 outgoingLight = vec3( 0.0 );","	vec4 diffuseColor = vec4( diffuse, opacity );",THREE.ShaderChunk["logdepthbuf_fragment"],THREE.ShaderChunk["color_fragment"],"	outgoingLight = diffuseColor.rgb;", // simple shader
	THREE.ShaderChunk["fog_fragment"],"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );","}"].join("\n")},'depth':{uniforms:{"mNear":{type:"f",value:1.0},"mFar":{type:"f",value:2000.0},"opacity":{type:"f",value:1.0}},vertexShader:[THREE.ShaderChunk["common"],THREE.ShaderChunk["morphtarget_pars_vertex"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {",THREE.ShaderChunk["begin_vertex"],THREE.ShaderChunk["morphtarget_vertex"],THREE.ShaderChunk["project_vertex"],THREE.ShaderChunk["logdepthbuf_vertex"],"}"].join("\n"),fragmentShader:["uniform float mNear;","uniform float mFar;","uniform float opacity;",THREE.ShaderChunk["common"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {",THREE.ShaderChunk["logdepthbuf_fragment"],"	#ifdef USE_LOGDEPTHBUF_EXT","		float depth = gl_FragDepthEXT / gl_FragCoord.w;","	#else","		float depth = gl_FragCoord.z / gl_FragCoord.w;","	#endif","	float color = 1.0 - smoothstep( mNear, mFar, depth );","	gl_FragColor = vec4( vec3( color ), opacity );","}"].join("\n")},'normal':{uniforms:{"opacity":{type:"f",value:1.0}},vertexShader:["varying vec3 vNormal;",THREE.ShaderChunk["common"],THREE.ShaderChunk["morphtarget_pars_vertex"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {","	vNormal = normalize( normalMatrix * normal );",THREE.ShaderChunk["begin_vertex"],THREE.ShaderChunk["morphtarget_vertex"],THREE.ShaderChunk["project_vertex"],THREE.ShaderChunk["logdepthbuf_vertex"],"}"].join("\n"),fragmentShader:["uniform float opacity;","varying vec3 vNormal;",THREE.ShaderChunk["common"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {","	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",THREE.ShaderChunk["logdepthbuf_fragment"],"}"].join("\n")}, /* -------------------------------------------------------------------------
		//	Cube map shader
		 ------------------------------------------------------------------------- */'cube':{uniforms:{"tCube":{type:"t",value:null},"tFlip":{type:"f",value:-1}},vertexShader:["varying vec3 vWorldPosition;",THREE.ShaderChunk["common"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {","	vWorldPosition = transformDirection( position, modelMatrix );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk["logdepthbuf_vertex"],"}"].join("\n"),fragmentShader:["uniform samplerCube tCube;","uniform float tFlip;","varying vec3 vWorldPosition;",THREE.ShaderChunk["common"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {","	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",THREE.ShaderChunk["logdepthbuf_fragment"],"}"].join("\n")}, /* -------------------------------------------------------------------------
		//	Cube map shader
		 ------------------------------------------------------------------------- */'equirect':{uniforms:{"tEquirect":{type:"t",value:null},"tFlip":{type:"f",value:-1}},vertexShader:["varying vec3 vWorldPosition;",THREE.ShaderChunk["common"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {","	vWorldPosition = transformDirection( position, modelMatrix );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk["logdepthbuf_vertex"],"}"].join("\n"),fragmentShader:["uniform sampler2D tEquirect;","uniform float tFlip;","varying vec3 vWorldPosition;",THREE.ShaderChunk["common"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"void main() {", // "	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",
	"vec3 direction = normalize( vWorldPosition );","vec2 sampleUV;","sampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );","sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;","gl_FragColor = texture2D( tEquirect, sampleUV );",THREE.ShaderChunk["logdepthbuf_fragment"],"}"].join("\n")}, /* Depth encoding into RGBA texture
		 *
		 * based on SpiderGL shadow map example
		 * http://spidergl.org/example.php?id=6
		 *
		 * originally from
		 * http://www.gamedev.net/topic/442138-packing-a-float-into-a-a8r8g8b8-texture-shader/page__whichpage__1%25EF%25BF%25BD
		 *
		 * see also
		 * http://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/
		 */'depthRGBA':{uniforms:{},vertexShader:[THREE.ShaderChunk["common"],THREE.ShaderChunk["morphtarget_pars_vertex"],THREE.ShaderChunk["skinning_pars_vertex"],THREE.ShaderChunk["logdepthbuf_pars_vertex"],"void main() {",THREE.ShaderChunk["skinbase_vertex"],THREE.ShaderChunk["begin_vertex"],THREE.ShaderChunk["morphtarget_vertex"],THREE.ShaderChunk["skinning_vertex"],THREE.ShaderChunk["project_vertex"],THREE.ShaderChunk["logdepthbuf_vertex"],"}"].join("\n"),fragmentShader:[THREE.ShaderChunk["common"],THREE.ShaderChunk["logdepthbuf_pars_fragment"],"vec4 pack_depth( const in float depth ) {","	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );","	const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );","	vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", // "	vec4 res = fract( depth * bit_shift );",
	"	res -= res.xxyz * bit_mask;","	return res;","}","void main() {",THREE.ShaderChunk["logdepthbuf_fragment"],"	#ifdef USE_LOGDEPTHBUF_EXT","		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );","	#else","		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );","	#endif", //"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );",
	//"float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );",
	//"gl_FragData[ 0 ] = pack_depth( z );",
	//"gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );",
	"}"].join("\n")}}; // File:src/renderers/WebGLRenderer.js
	/**
	 * @author supereggbert / http://www.paulbrunt.co.uk/
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author szimek / https://github.com/szimek/
	 */THREE.WebGLRenderer = function(parameters){console.log('THREE.WebGLRenderer',THREE.REVISION);parameters = parameters || {};var _canvas=parameters.canvas !== undefined?parameters.canvas:document.createElement('canvas'),_context=parameters.context !== undefined?parameters.context:null,_width=_canvas.width,_height=_canvas.height,pixelRatio=1,_alpha=parameters.alpha !== undefined?parameters.alpha:false,_depth=parameters.depth !== undefined?parameters.depth:true,_stencil=parameters.stencil !== undefined?parameters.stencil:true,_antialias=parameters.antialias !== undefined?parameters.antialias:false,_premultipliedAlpha=parameters.premultipliedAlpha !== undefined?parameters.premultipliedAlpha:true,_preserveDrawingBuffer=parameters.preserveDrawingBuffer !== undefined?parameters.preserveDrawingBuffer:false,_clearColor=new THREE.Color(0x000000),_clearAlpha=0;var lights=[];var opaqueObjects=[];var opaqueObjectsLastIndex=-1;var transparentObjects=[];var transparentObjectsLastIndex=-1;var opaqueImmediateObjects=[];var opaqueImmediateObjectsLastIndex=-1;var transparentImmediateObjects=[];var transparentImmediateObjectsLastIndex=-1;var morphInfluences=new Float32Array(8);var sprites=[];var lensFlares=[]; // public properties
	this.domElement = _canvas;this.context = null; // clearing
	this.autoClear = true;this.autoClearColor = true;this.autoClearDepth = true;this.autoClearStencil = true; // scene graph
	this.sortObjects = true; // physically based shading
	this.gammaFactor = 2.0; // for backwards compatibility
	this.gammaInput = false;this.gammaOutput = false; // morphs
	this.maxMorphTargets = 8;this.maxMorphNormals = 4; // flags
	this.autoScaleCubemaps = true; // internal properties
	var _this=this, // internal state cache
	_currentProgram=null,_currentFramebuffer=null,_currentMaterialId=-1,_currentGeometryProgram='',_currentCamera=null,_usedTextureUnits=0,_viewportX=0,_viewportY=0,_viewportWidth=_canvas.width,_viewportHeight=_canvas.height,_currentWidth=0,_currentHeight=0, // frustum
	_frustum=new THREE.Frustum(), // camera matrices cache
	_projScreenMatrix=new THREE.Matrix4(),_vector3=new THREE.Vector3(), // light arrays cache
	_direction=new THREE.Vector3(),_lightsNeedUpdate=true,_lights={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[],decays:[]},spot:{length:0,colors:[],positions:[],distances:[],directions:[],anglesCos:[],exponents:[],decays:[]},hemi:{length:0,skyColors:[],groundColors:[],positions:[]}}, // info
	_infoMemory={geometries:0,textures:0},_infoRender={calls:0,vertices:0,faces:0,points:0};this.info = {render:_infoRender,memory:_infoMemory,programs:null}; // initialize
	var _gl;try{var attributes={alpha:_alpha,depth:_depth,stencil:_stencil,antialias:_antialias,premultipliedAlpha:_premultipliedAlpha,preserveDrawingBuffer:_preserveDrawingBuffer};_gl = _context || _canvas.getContext('webgl',attributes) || _canvas.getContext('experimental-webgl',attributes);if(_gl === null){if(_canvas.getContext('webgl') !== null){throw 'Error creating WebGL context with your selected attributes.';}else {throw 'Error creating WebGL context.';}}_canvas.addEventListener('webglcontextlost',onContextLost,false);}catch(error) {console.error('THREE.WebGLRenderer: ' + error);}var extensions=new THREE.WebGLExtensions(_gl);extensions.get('OES_texture_float');extensions.get('OES_texture_float_linear');extensions.get('OES_texture_half_float');extensions.get('OES_texture_half_float_linear');extensions.get('OES_standard_derivatives');extensions.get('ANGLE_instanced_arrays');if(extensions.get('OES_element_index_uint')){THREE.BufferGeometry.MaxIndex = 4294967296;}var capabilities=new THREE.WebGLCapabilities(_gl,extensions,parameters);var state=new THREE.WebGLState(_gl,extensions,paramThreeToGL);var properties=new THREE.WebGLProperties();var objects=new THREE.WebGLObjects(_gl,properties,this.info);var programCache=new THREE.WebGLPrograms(this,capabilities);this.info.programs = programCache.programs;var bufferRenderer=new THREE.WebGLBufferRenderer(_gl,extensions,_infoRender);var indexedBufferRenderer=new THREE.WebGLIndexedBufferRenderer(_gl,extensions,_infoRender); //
	function glClearColor(r,g,b,a){if(_premultipliedAlpha === true){r *= a;g *= a;b *= a;}_gl.clearColor(r,g,b,a);}function setDefaultGLState(){state.init();_gl.viewport(_viewportX,_viewportY,_viewportWidth,_viewportHeight);glClearColor(_clearColor.r,_clearColor.g,_clearColor.b,_clearAlpha);}function resetGLState(){_currentProgram = null;_currentCamera = null;_currentGeometryProgram = '';_currentMaterialId = -1;_lightsNeedUpdate = true;state.reset();}setDefaultGLState();this.context = _gl;this.capabilities = capabilities;this.extensions = extensions;this.state = state; // shadow map
	var shadowMap=new THREE.WebGLShadowMap(this,lights,objects);this.shadowMap = shadowMap; // Plugins
	var spritePlugin=new THREE.SpritePlugin(this,sprites);var lensFlarePlugin=new THREE.LensFlarePlugin(this,lensFlares); // API
	this.getContext = function(){return _gl;};this.getContextAttributes = function(){return _gl.getContextAttributes();};this.forceContextLoss = function(){extensions.get('WEBGL_lose_context').loseContext();};this.getMaxAnisotropy = (function(){var value;return function getMaxAnisotropy(){if(value !== undefined)return value;var extension=extensions.get('EXT_texture_filter_anisotropic');if(extension !== null){value = _gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);}else {value = 0;}return value;};})();this.getPrecision = function(){return capabilities.precision;};this.getPixelRatio = function(){return pixelRatio;};this.setPixelRatio = function(value){if(value !== undefined)pixelRatio = value;};this.getSize = function(){return {width:_width,height:_height};};this.setSize = function(width,height,updateStyle){_width = width;_height = height;_canvas.width = width * pixelRatio;_canvas.height = height * pixelRatio;if(updateStyle !== false){_canvas.style.width = width + 'px';_canvas.style.height = height + 'px';}this.setViewport(0,0,width,height);};this.setViewport = function(x,y,width,height){_viewportX = x * pixelRatio;_viewportY = y * pixelRatio;_viewportWidth = width * pixelRatio;_viewportHeight = height * pixelRatio;_gl.viewport(_viewportX,_viewportY,_viewportWidth,_viewportHeight);};this.setScissor = function(x,y,width,height){_gl.scissor(x * pixelRatio,y * pixelRatio,width * pixelRatio,height * pixelRatio);};this.enableScissorTest = function(boolean){state.setScissorTest(boolean);}; // Clearing
	this.getClearColor = function(){return _clearColor;};this.setClearColor = function(color,alpha){_clearColor.set(color);_clearAlpha = alpha !== undefined?alpha:1;glClearColor(_clearColor.r,_clearColor.g,_clearColor.b,_clearAlpha);};this.getClearAlpha = function(){return _clearAlpha;};this.setClearAlpha = function(alpha){_clearAlpha = alpha;glClearColor(_clearColor.r,_clearColor.g,_clearColor.b,_clearAlpha);};this.clear = function(color,depth,stencil){var bits=0;if(color === undefined || color)bits |= _gl.COLOR_BUFFER_BIT;if(depth === undefined || depth)bits |= _gl.DEPTH_BUFFER_BIT;if(stencil === undefined || stencil)bits |= _gl.STENCIL_BUFFER_BIT;_gl.clear(bits);};this.clearColor = function(){_gl.clear(_gl.COLOR_BUFFER_BIT);};this.clearDepth = function(){_gl.clear(_gl.DEPTH_BUFFER_BIT);};this.clearStencil = function(){_gl.clear(_gl.STENCIL_BUFFER_BIT);};this.clearTarget = function(renderTarget,color,depth,stencil){this.setRenderTarget(renderTarget);this.clear(color,depth,stencil);}; // Reset
	this.resetGLState = resetGLState;this.dispose = function(){_canvas.removeEventListener('webglcontextlost',onContextLost,false);}; // Events
	function onContextLost(event){event.preventDefault();resetGLState();setDefaultGLState();properties.clear();};function onTextureDispose(event){var texture=event.target;texture.removeEventListener('dispose',onTextureDispose);deallocateTexture(texture);_infoMemory.textures--;}function onRenderTargetDispose(event){var renderTarget=event.target;renderTarget.removeEventListener('dispose',onRenderTargetDispose);deallocateRenderTarget(renderTarget);_infoMemory.textures--;}function onMaterialDispose(event){var material=event.target;material.removeEventListener('dispose',onMaterialDispose);deallocateMaterial(material);} // Buffer deallocation
	function deallocateTexture(texture){var textureProperties=properties.get(texture);if(texture.image && textureProperties.__image__webglTextureCube){ // cube texture
	_gl.deleteTexture(textureProperties.__image__webglTextureCube);}else { // 2D texture
	if(textureProperties.__webglInit === undefined)return;_gl.deleteTexture(textureProperties.__webglTexture);} // remove all webgl properties
	properties['delete'](texture);}function deallocateRenderTarget(renderTarget){var renderTargetProperties=properties.get(renderTarget);if(!renderTarget || renderTargetProperties.__webglTexture === undefined)return;_gl.deleteTexture(renderTargetProperties.__webglTexture);if(renderTarget instanceof THREE.WebGLRenderTargetCube){for(var i=0;i < 6;i++) {_gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[i]);_gl.deleteRenderbuffer(renderTargetProperties.__webglRenderbuffer[i]);}}else {_gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer);_gl.deleteRenderbuffer(renderTargetProperties.__webglRenderbuffer);}properties['delete'](renderTarget);}function deallocateMaterial(material){releaseMaterialProgramReference(material);properties['delete'](material);}function releaseMaterialProgramReference(material){var programInfo=properties.get(material).program;material.program = undefined;if(programInfo !== undefined){programCache.releaseProgram(programInfo);}} // Buffer rendering
	this.renderBufferImmediate = function(object,program,material){state.initAttributes();var buffers=properties.get(object);if(object.hasPositions && !buffers.position)buffers.position = _gl.createBuffer();if(object.hasNormals && !buffers.normal)buffers.normal = _gl.createBuffer();if(object.hasUvs && !buffers.uv)buffers.uv = _gl.createBuffer();if(object.hasColors && !buffers.color)buffers.color = _gl.createBuffer();var attributes=program.getAttributes();if(object.hasPositions){_gl.bindBuffer(_gl.ARRAY_BUFFER,buffers.position);_gl.bufferData(_gl.ARRAY_BUFFER,object.positionArray,_gl.DYNAMIC_DRAW);state.enableAttribute(attributes.position);_gl.vertexAttribPointer(attributes.position,3,_gl.FLOAT,false,0,0);}if(object.hasNormals){_gl.bindBuffer(_gl.ARRAY_BUFFER,buffers.normal);if(material.type !== 'MeshPhongMaterial' && material.shading === THREE.FlatShading){for(var i=0,l=object.count * 3;i < l;i += 9) {var array=object.normalArray;var nx=(array[i + 0] + array[i + 3] + array[i + 6]) / 3;var ny=(array[i + 1] + array[i + 4] + array[i + 7]) / 3;var nz=(array[i + 2] + array[i + 5] + array[i + 8]) / 3;array[i + 0] = nx;array[i + 1] = ny;array[i + 2] = nz;array[i + 3] = nx;array[i + 4] = ny;array[i + 5] = nz;array[i + 6] = nx;array[i + 7] = ny;array[i + 8] = nz;}}_gl.bufferData(_gl.ARRAY_BUFFER,object.normalArray,_gl.DYNAMIC_DRAW);state.enableAttribute(attributes.normal);_gl.vertexAttribPointer(attributes.normal,3,_gl.FLOAT,false,0,0);}if(object.hasUvs && material.map){_gl.bindBuffer(_gl.ARRAY_BUFFER,buffers.uv);_gl.bufferData(_gl.ARRAY_BUFFER,object.uvArray,_gl.DYNAMIC_DRAW);state.enableAttribute(attributes.uv);_gl.vertexAttribPointer(attributes.uv,2,_gl.FLOAT,false,0,0);}if(object.hasColors && material.vertexColors !== THREE.NoColors){_gl.bindBuffer(_gl.ARRAY_BUFFER,buffers.color);_gl.bufferData(_gl.ARRAY_BUFFER,object.colorArray,_gl.DYNAMIC_DRAW);state.enableAttribute(attributes.color);_gl.vertexAttribPointer(attributes.color,3,_gl.FLOAT,false,0,0);}state.disableUnusedAttributes();_gl.drawArrays(_gl.TRIANGLES,0,object.count);object.count = 0;};this.renderBufferDirect = function(camera,lights,fog,geometry,material,object,group){setMaterial(material);var program=setProgram(camera,lights,fog,material,object);var updateBuffers=false;var geometryProgram=geometry.id + '_' + program.id + '_' + material.wireframe;if(geometryProgram !== _currentGeometryProgram){_currentGeometryProgram = geometryProgram;updateBuffers = true;} // morph targets
	var morphTargetInfluences=object.morphTargetInfluences;if(morphTargetInfluences !== undefined){var activeInfluences=[];for(var i=0,l=morphTargetInfluences.length;i < l;i++) {var influence=morphTargetInfluences[i];activeInfluences.push([influence,i]);}activeInfluences.sort(numericalSort);if(activeInfluences.length > 8){activeInfluences.length = 8;}var morphAttributes=geometry.morphAttributes;for(var i=0,l=activeInfluences.length;i < l;i++) {var influence=activeInfluences[i];morphInfluences[i] = influence[0];if(influence[0] !== 0){var index=influence[1];if(material.morphTargets === true && morphAttributes.position)geometry.addAttribute('morphTarget' + i,morphAttributes.position[index]);if(material.morphNormals === true && morphAttributes.normal)geometry.addAttribute('morphNormal' + i,morphAttributes.normal[index]);}else {if(material.morphTargets === true)geometry.removeAttribute('morphTarget' + i);if(material.morphNormals === true)geometry.removeAttribute('morphNormal' + i);}}var uniforms=program.getUniforms();if(uniforms.morphTargetInfluences !== null){_gl.uniform1fv(uniforms.morphTargetInfluences,morphInfluences);}updateBuffers = true;} //
	var index=geometry.index;var position=geometry.attributes.position;if(material.wireframe === true){index = objects.getWireframeAttribute(geometry);}var renderer;if(index !== null){renderer = indexedBufferRenderer;renderer.setIndex(index);}else {renderer = bufferRenderer;}if(updateBuffers){setupVertexAttributes(material,program,geometry);if(index !== null){_gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER,objects.getAttributeBuffer(index));}}if(group === undefined){var count;if(index !== null){count = index.count;}else if(position instanceof THREE.InterleavedBufferAttribute){count = position.data.array.length / 3;}else {count = position.count;}var drawRange=geometry.drawRange;group = {start:drawRange.start,count:Math.min(drawRange.count,count)};}if(object instanceof THREE.Mesh){if(material.wireframe === true){state.setLineWidth(material.wireframeLinewidth * pixelRatio);renderer.setMode(_gl.LINES);}else {renderer.setMode(_gl.TRIANGLES);}if(geometry instanceof THREE.InstancedBufferGeometry && geometry.maxInstancedCount > 0){renderer.renderInstances(geometry);}else {renderer.render(group.start,group.count);}}else if(object instanceof THREE.Line){var lineWidth=material.linewidth;if(lineWidth === undefined)lineWidth = 1; // Not using Line*Material
	state.setLineWidth(lineWidth * pixelRatio);if(object instanceof THREE.LineSegments){renderer.setMode(_gl.LINES);}else {renderer.setMode(_gl.LINE_STRIP);}renderer.render(group.start,group.count);}else if(object instanceof THREE.Points){renderer.setMode(_gl.POINTS);renderer.render(group.start,group.count);}};function setupVertexAttributes(material,program,geometry,startIndex){var extension;if(geometry instanceof THREE.InstancedBufferGeometry){extension = extensions.get('ANGLE_instanced_arrays');if(extension === null){console.error('THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');return;}}if(startIndex === undefined)startIndex = 0;state.initAttributes();var geometryAttributes=geometry.attributes;var programAttributes=program.getAttributes();var materialDefaultAttributeValues=material.defaultAttributeValues;for(var name in programAttributes) {var programAttribute=programAttributes[name];if(programAttribute >= 0){var geometryAttribute=geometryAttributes[name];if(geometryAttribute !== undefined){state.enableAttribute(programAttribute);var size=geometryAttribute.itemSize;var buffer=objects.getAttributeBuffer(geometryAttribute);if(geometryAttribute instanceof THREE.InterleavedBufferAttribute){var data=geometryAttribute.data;var stride=data.stride;var offset=geometryAttribute.offset;_gl.bindBuffer(_gl.ARRAY_BUFFER,buffer);_gl.vertexAttribPointer(programAttribute,size,_gl.FLOAT,false,stride * data.array.BYTES_PER_ELEMENT,(startIndex * stride + offset) * data.array.BYTES_PER_ELEMENT);if(data instanceof THREE.InstancedInterleavedBuffer){if(extension === null){console.error('THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferAttribute but hardware does not support extension ANGLE_instanced_arrays.');return;}extension.vertexAttribDivisorANGLE(programAttribute,data.meshPerAttribute);if(geometry.maxInstancedCount === undefined){geometry.maxInstancedCount = data.meshPerAttribute * data.count;}}}else {_gl.bindBuffer(_gl.ARRAY_BUFFER,buffer);_gl.vertexAttribPointer(programAttribute,size,_gl.FLOAT,false,0,startIndex * size * 4); // 4 bytes per Float32
	if(geometryAttribute instanceof THREE.InstancedBufferAttribute){if(extension === null){console.error('THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferAttribute but hardware does not support extension ANGLE_instanced_arrays.');return;}extension.vertexAttribDivisorANGLE(programAttribute,geometryAttribute.meshPerAttribute);if(geometry.maxInstancedCount === undefined){geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;}}}}else if(materialDefaultAttributeValues !== undefined){var value=materialDefaultAttributeValues[name];if(value !== undefined){switch(value.length){case 2:_gl.vertexAttrib2fv(programAttribute,value);break;case 3:_gl.vertexAttrib3fv(programAttribute,value);break;case 4:_gl.vertexAttrib4fv(programAttribute,value);break;default:_gl.vertexAttrib1fv(programAttribute,value);}}}}}state.disableUnusedAttributes();} // Sorting
	function numericalSort(a,b){return b[0] - a[0];}function painterSortStable(a,b){if(a.object.renderOrder !== b.object.renderOrder){return a.object.renderOrder - b.object.renderOrder;}else if(a.material.id !== b.material.id){return a.material.id - b.material.id;}else if(a.z !== b.z){return a.z - b.z;}else {return a.id - b.id;}}function reversePainterSortStable(a,b){if(a.object.renderOrder !== b.object.renderOrder){return a.object.renderOrder - b.object.renderOrder;}if(a.z !== b.z){return b.z - a.z;}else {return a.id - b.id;}} // Rendering
	this.render = function(scene,camera,renderTarget,forceClear){if(camera instanceof THREE.Camera === false){console.error('THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.');return;}var fog=scene.fog; // reset caching for this frame
	_currentGeometryProgram = '';_currentMaterialId = -1;_currentCamera = null;_lightsNeedUpdate = true; // update scene graph
	if(scene.autoUpdate === true)scene.updateMatrixWorld(); // update camera matrices and frustum
	if(camera.parent === null)camera.updateMatrixWorld();camera.matrixWorldInverse.getInverse(camera.matrixWorld);_projScreenMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);_frustum.setFromMatrix(_projScreenMatrix);lights.length = 0;opaqueObjectsLastIndex = -1;transparentObjectsLastIndex = -1;opaqueImmediateObjectsLastIndex = -1;transparentImmediateObjectsLastIndex = -1;sprites.length = 0;lensFlares.length = 0;projectObject(scene);opaqueObjects.length = opaqueObjectsLastIndex + 1;transparentObjects.length = transparentObjectsLastIndex + 1;opaqueImmediateObjects.length = opaqueImmediateObjectsLastIndex + 1;transparentImmediateObjects.length = transparentImmediateObjectsLastIndex + 1;if(_this.sortObjects === true){opaqueObjects.sort(painterSortStable);transparentObjects.sort(reversePainterSortStable);} //
	shadowMap.render(scene,camera); //
	_infoRender.calls = 0;_infoRender.vertices = 0;_infoRender.faces = 0;_infoRender.points = 0;this.setRenderTarget(renderTarget);if(this.autoClear || forceClear){this.clear(this.autoClearColor,this.autoClearDepth,this.autoClearStencil);} //
	if(scene.overrideMaterial){var overrideMaterial=scene.overrideMaterial;renderObjects(opaqueObjects,camera,lights,fog,overrideMaterial);renderObjects(transparentObjects,camera,lights,fog,overrideMaterial);renderObjectsImmediate(opaqueImmediateObjects,camera,lights,fog,overrideMaterial);renderObjectsImmediate(transparentImmediateObjects,camera,lights,fog,overrideMaterial);}else { // opaque pass (front-to-back order)
	state.setBlending(THREE.NoBlending);renderObjects(opaqueObjects,camera,lights,fog);renderObjectsImmediate(opaqueImmediateObjects,camera,lights,fog); // transparent pass (back-to-front order)
	renderObjects(transparentObjects,camera,lights,fog);renderObjectsImmediate(transparentImmediateObjects,camera,lights,fog);} // custom render plugins (post pass)
	spritePlugin.render(scene,camera);lensFlarePlugin.render(scene,camera,_currentWidth,_currentHeight); // Generate mipmap if we're using any kind of mipmap filtering
	if(renderTarget && renderTarget.generateMipmaps && renderTarget.minFilter !== THREE.NearestFilter && renderTarget.minFilter !== THREE.LinearFilter){updateRenderTargetMipmap(renderTarget);} // Ensure depth buffer writing is enabled so it can be cleared on next render
	state.setDepthTest(true);state.setDepthWrite(true);state.setColorWrite(true); // _gl.finish();
	};function pushImmediateRenderItem(object){var array,index; // allocate the next position in the appropriate array
	if(object.material.transparent){array = transparentImmediateObjects;index = ++transparentImmediateObjectsLastIndex;}else {array = opaqueImmediateObjects;index = ++opaqueImmediateObjectsLastIndex;} // recycle existing position or grow the array
	if(index < array.length){array[index] = object;}else { // assert( index === array.length );
	array.push(object);}}function pushRenderItem(object,geometry,material,z,group){var array,index; // allocate the next position in the appropriate array
	if(material.transparent){array = transparentObjects;index = ++transparentObjectsLastIndex;}else {array = opaqueObjects;index = ++opaqueObjectsLastIndex;} // recycle existing render item or grow the array
	var renderItem=array[index];if(renderItem !== undefined){renderItem.id = object.id;renderItem.object = object;renderItem.geometry = geometry;renderItem.material = material;renderItem.z = _vector3.z;renderItem.group = group;}else {renderItem = {id:object.id,object:object,geometry:geometry,material:material,z:_vector3.z,group:group}; // assert( index === array.length );
	array.push(renderItem);}}function projectObject(object){if(object.visible === false)return;if(object instanceof THREE.Light){lights.push(object);}else if(object instanceof THREE.Sprite){sprites.push(object);}else if(object instanceof THREE.LensFlare){lensFlares.push(object);}else if(object instanceof THREE.ImmediateRenderObject){pushImmediateRenderItem(object);}else if(object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points){if(object instanceof THREE.SkinnedMesh){object.skeleton.update();}if(object.frustumCulled === false || _frustum.intersectsObject(object) === true){var material=object.material;if(material.visible === true){if(_this.sortObjects === true){_vector3.setFromMatrixPosition(object.matrixWorld);_vector3.applyProjection(_projScreenMatrix);}var geometry=objects.update(object);if(material instanceof THREE.MeshFaceMaterial){var groups=geometry.groups;var materials=material.materials;for(var i=0,l=groups.length;i < l;i++) {var group=groups[i];var groupMaterial=materials[group.materialIndex];if(groupMaterial.visible === true){pushRenderItem(object,geometry,groupMaterial,_vector3.z,group);}}}else {pushRenderItem(object,geometry,material,_vector3.z);}}}}var children=object.children;for(var i=0,l=children.length;i < l;i++) {projectObject(children[i]);}}function renderObjects(renderList,camera,lights,fog,overrideMaterial){for(var i=0,l=renderList.length;i < l;i++) {var renderItem=renderList[i];var object=renderItem.object;var geometry=renderItem.geometry;var material=overrideMaterial === undefined?renderItem.material:overrideMaterial;var group=renderItem.group;object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse,object.matrixWorld);object.normalMatrix.getNormalMatrix(object.modelViewMatrix);_this.renderBufferDirect(camera,lights,fog,geometry,material,object,group);}}function renderObjectsImmediate(renderList,camera,lights,fog,overrideMaterial){var material=overrideMaterial;for(var i=0,l=renderList.length;i < l;i++) {var object=renderList[i];object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse,object.matrixWorld);object.normalMatrix.getNormalMatrix(object.modelViewMatrix);if(overrideMaterial === undefined)material = object.material;setMaterial(material);var program=setProgram(camera,lights,fog,material,object);_currentGeometryProgram = '';object.render(function(object){_this.renderBufferImmediate(object,program,material);});}}function initMaterial(material,lights,fog,object){var materialProperties=properties.get(material);var parameters=programCache.getParameters(material,lights,fog,object);var code=programCache.getProgramCode(material,parameters);var program=materialProperties.program;var programChange=true;if(program === undefined){ // new material
	material.addEventListener('dispose',onMaterialDispose);}else if(program.code !== code){ // changed glsl or parameters
	releaseMaterialProgramReference(material);}else if(parameters.shaderID !== undefined){ // same glsl and uniform list
	return;}else { // only rebuild uniform list
	programChange = false;}if(programChange){if(parameters.shaderID){var shader=THREE.ShaderLib[parameters.shaderID];materialProperties.__webglShader = {name:material.type,uniforms:THREE.UniformsUtils.clone(shader.uniforms),vertexShader:shader.vertexShader,fragmentShader:shader.fragmentShader};}else {materialProperties.__webglShader = {name:material.type,uniforms:material.uniforms,vertexShader:material.vertexShader,fragmentShader:material.fragmentShader};}material.__webglShader = materialProperties.__webglShader;program = programCache.acquireProgram(material,parameters,code);materialProperties.program = program;material.program = program;}var attributes=program.getAttributes();if(material.morphTargets){material.numSupportedMorphTargets = 0;for(var i=0;i < _this.maxMorphTargets;i++) {if(attributes['morphTarget' + i] >= 0){material.numSupportedMorphTargets++;}}}if(material.morphNormals){material.numSupportedMorphNormals = 0;for(i = 0;i < _this.maxMorphNormals;i++) {if(attributes['morphNormal' + i] >= 0){material.numSupportedMorphNormals++;}}}materialProperties.uniformsList = [];var uniformLocations=materialProperties.program.getUniforms();for(var u in materialProperties.__webglShader.uniforms) {var location=uniformLocations[u];if(location){materialProperties.uniformsList.push([materialProperties.__webglShader.uniforms[u],location]);}}}function setMaterial(material){setMaterialFaces(material);if(material.transparent === true){state.setBlending(material.blending,material.blendEquation,material.blendSrc,material.blendDst,material.blendEquationAlpha,material.blendSrcAlpha,material.blendDstAlpha);}else {state.setBlending(THREE.NoBlending);}state.setDepthFunc(material.depthFunc);state.setDepthTest(material.depthTest);state.setDepthWrite(material.depthWrite);state.setColorWrite(material.colorWrite);state.setPolygonOffset(material.polygonOffset,material.polygonOffsetFactor,material.polygonOffsetUnits);}function setMaterialFaces(material){material.side !== THREE.DoubleSide?state.enable(_gl.CULL_FACE):state.disable(_gl.CULL_FACE);state.setFlipSided(material.side === THREE.BackSide);}function setProgram(camera,lights,fog,material,object){_usedTextureUnits = 0;var materialProperties=properties.get(material);if(material.needsUpdate || !materialProperties.program){initMaterial(material,lights,fog,object);material.needsUpdate = false;}var refreshProgram=false;var refreshMaterial=false;var refreshLights=false;var program=materialProperties.program,p_uniforms=program.getUniforms(),m_uniforms=materialProperties.__webglShader.uniforms;if(program.id !== _currentProgram){_gl.useProgram(program.program);_currentProgram = program.id;refreshProgram = true;refreshMaterial = true;refreshLights = true;}if(material.id !== _currentMaterialId){if(_currentMaterialId === -1)refreshLights = true;_currentMaterialId = material.id;refreshMaterial = true;}if(refreshProgram || camera !== _currentCamera){_gl.uniformMatrix4fv(p_uniforms.projectionMatrix,false,camera.projectionMatrix.elements);if(capabilities.logarithmicDepthBuffer){_gl.uniform1f(p_uniforms.logDepthBufFC,2.0 / (Math.log(camera.far + 1.0) / Math.LN2));}if(camera !== _currentCamera)_currentCamera = camera; // load material specific uniforms
	// (shader material also gets them for the sake of genericity)
	if(material instanceof THREE.ShaderMaterial || material instanceof THREE.MeshPhongMaterial || material.envMap){if(p_uniforms.cameraPosition !== undefined){_vector3.setFromMatrixPosition(camera.matrixWorld);_gl.uniform3f(p_uniforms.cameraPosition,_vector3.x,_vector3.y,_vector3.z);}}if(material instanceof THREE.MeshPhongMaterial || material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshBasicMaterial || material instanceof THREE.ShaderMaterial || material.skinning){if(p_uniforms.viewMatrix !== undefined){_gl.uniformMatrix4fv(p_uniforms.viewMatrix,false,camera.matrixWorldInverse.elements);}}} // skinning uniforms must be set even if material didn't change
	// auto-setting of texture unit for bone texture must go before other textures
	// not sure why, but otherwise weird things happen
	if(material.skinning){if(object.bindMatrix && p_uniforms.bindMatrix !== undefined){_gl.uniformMatrix4fv(p_uniforms.bindMatrix,false,object.bindMatrix.elements);}if(object.bindMatrixInverse && p_uniforms.bindMatrixInverse !== undefined){_gl.uniformMatrix4fv(p_uniforms.bindMatrixInverse,false,object.bindMatrixInverse.elements);}if(capabilities.floatVertexTextures && object.skeleton && object.skeleton.useVertexTexture){if(p_uniforms.boneTexture !== undefined){var textureUnit=getTextureUnit();_gl.uniform1i(p_uniforms.boneTexture,textureUnit);_this.setTexture(object.skeleton.boneTexture,textureUnit);}if(p_uniforms.boneTextureWidth !== undefined){_gl.uniform1i(p_uniforms.boneTextureWidth,object.skeleton.boneTextureWidth);}if(p_uniforms.boneTextureHeight !== undefined){_gl.uniform1i(p_uniforms.boneTextureHeight,object.skeleton.boneTextureHeight);}}else if(object.skeleton && object.skeleton.boneMatrices){if(p_uniforms.boneGlobalMatrices !== undefined){_gl.uniformMatrix4fv(p_uniforms.boneGlobalMatrices,false,object.skeleton.boneMatrices);}}}if(refreshMaterial){ // refresh uniforms common to several materials
	if(fog && material.fog){refreshUniformsFog(m_uniforms,fog);}if(material instanceof THREE.MeshPhongMaterial || material instanceof THREE.MeshLambertMaterial || material.lights){if(_lightsNeedUpdate){refreshLights = true;setupLights(lights,camera);_lightsNeedUpdate = false;}if(refreshLights){refreshUniformsLights(m_uniforms,_lights);markUniformsLightsNeedsUpdate(m_uniforms,true);}else {markUniformsLightsNeedsUpdate(m_uniforms,false);}}if(material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial){refreshUniformsCommon(m_uniforms,material);} // refresh single material specific uniforms
	if(material instanceof THREE.LineBasicMaterial){refreshUniformsLine(m_uniforms,material);}else if(material instanceof THREE.LineDashedMaterial){refreshUniformsLine(m_uniforms,material);refreshUniformsDash(m_uniforms,material);}else if(material instanceof THREE.PointsMaterial){refreshUniformsParticle(m_uniforms,material);}else if(material instanceof THREE.MeshPhongMaterial){refreshUniformsPhong(m_uniforms,material);}else if(material instanceof THREE.MeshDepthMaterial){m_uniforms.mNear.value = camera.near;m_uniforms.mFar.value = camera.far;m_uniforms.opacity.value = material.opacity;}else if(material instanceof THREE.MeshNormalMaterial){m_uniforms.opacity.value = material.opacity;}if(object.receiveShadow && !material._shadowPass){refreshUniformsShadow(m_uniforms,lights);} // load common uniforms
	loadUniformsGeneric(materialProperties.uniformsList);}loadUniformsMatrices(p_uniforms,object);if(p_uniforms.modelMatrix !== undefined){_gl.uniformMatrix4fv(p_uniforms.modelMatrix,false,object.matrixWorld.elements);}return program;} // Uniforms (refresh uniforms objects)
	function refreshUniformsCommon(uniforms,material){uniforms.opacity.value = material.opacity;uniforms.diffuse.value = material.color;if(material.emissive){uniforms.emissive.value = material.emissive;}uniforms.map.value = material.map;uniforms.specularMap.value = material.specularMap;uniforms.alphaMap.value = material.alphaMap;if(material.aoMap){uniforms.aoMap.value = material.aoMap;uniforms.aoMapIntensity.value = material.aoMapIntensity;} // uv repeat and offset setting priorities
	// 1. color map
	// 2. specular map
	// 3. normal map
	// 4. bump map
	// 5. alpha map
	// 6. emissive map
	var uvScaleMap;if(material.map){uvScaleMap = material.map;}else if(material.specularMap){uvScaleMap = material.specularMap;}else if(material.displacementMap){uvScaleMap = material.displacementMap;}else if(material.normalMap){uvScaleMap = material.normalMap;}else if(material.bumpMap){uvScaleMap = material.bumpMap;}else if(material.alphaMap){uvScaleMap = material.alphaMap;}else if(material.emissiveMap){uvScaleMap = material.emissiveMap;}if(uvScaleMap !== undefined){var offset=uvScaleMap.offset;var repeat=uvScaleMap.repeat;uniforms.offsetRepeat.value.set(offset.x,offset.y,repeat.x,repeat.y);}uniforms.envMap.value = material.envMap;uniforms.flipEnvMap.value = material.envMap instanceof THREE.WebGLRenderTargetCube?1:-1;uniforms.reflectivity.value = material.reflectivity;uniforms.refractionRatio.value = material.refractionRatio;}function refreshUniformsLine(uniforms,material){uniforms.diffuse.value = material.color;uniforms.opacity.value = material.opacity;}function refreshUniformsDash(uniforms,material){uniforms.dashSize.value = material.dashSize;uniforms.totalSize.value = material.dashSize + material.gapSize;uniforms.scale.value = material.scale;}function refreshUniformsParticle(uniforms,material){uniforms.psColor.value = material.color;uniforms.opacity.value = material.opacity;uniforms.size.value = material.size;uniforms.scale.value = _canvas.height / 2.0; // TODO: Cache this.
	uniforms.map.value = material.map;if(material.map !== null){var offset=material.map.offset;var repeat=material.map.repeat;uniforms.offsetRepeat.value.set(offset.x,offset.y,repeat.x,repeat.y);}}function refreshUniformsFog(uniforms,fog){uniforms.fogColor.value = fog.color;if(fog instanceof THREE.Fog){uniforms.fogNear.value = fog.near;uniforms.fogFar.value = fog.far;}else if(fog instanceof THREE.FogExp2){uniforms.fogDensity.value = fog.density;}}function refreshUniformsPhong(uniforms,material){uniforms.specular.value = material.specular;uniforms.shininess.value = material.shininess;if(material.lightMap){uniforms.lightMap.value = material.lightMap;uniforms.lightMapIntensity.value = material.lightMapIntensity;}if(material.emissiveMap){uniforms.emissiveMap.value = material.emissiveMap;}if(material.bumpMap){uniforms.bumpMap.value = material.bumpMap;uniforms.bumpScale.value = material.bumpScale;}if(material.normalMap){uniforms.normalMap.value = material.normalMap;uniforms.normalScale.value.copy(material.normalScale);}if(material.displacementMap){uniforms.displacementMap.value = material.displacementMap;uniforms.displacementScale.value = material.displacementScale;uniforms.displacementBias.value = material.displacementBias;}}function refreshUniformsLights(uniforms,lights){uniforms.ambientLightColor.value = lights.ambient;uniforms.directionalLightColor.value = lights.directional.colors;uniforms.directionalLightDirection.value = lights.directional.positions;uniforms.pointLightColor.value = lights.point.colors;uniforms.pointLightPosition.value = lights.point.positions;uniforms.pointLightDistance.value = lights.point.distances;uniforms.pointLightDecay.value = lights.point.decays;uniforms.spotLightColor.value = lights.spot.colors;uniforms.spotLightPosition.value = lights.spot.positions;uniforms.spotLightDistance.value = lights.spot.distances;uniforms.spotLightDirection.value = lights.spot.directions;uniforms.spotLightAngleCos.value = lights.spot.anglesCos;uniforms.spotLightExponent.value = lights.spot.exponents;uniforms.spotLightDecay.value = lights.spot.decays;uniforms.hemisphereLightSkyColor.value = lights.hemi.skyColors;uniforms.hemisphereLightGroundColor.value = lights.hemi.groundColors;uniforms.hemisphereLightDirection.value = lights.hemi.positions;} // If uniforms are marked as clean, they don't need to be loaded to the GPU.
	function markUniformsLightsNeedsUpdate(uniforms,value){uniforms.ambientLightColor.needsUpdate = value;uniforms.directionalLightColor.needsUpdate = value;uniforms.directionalLightDirection.needsUpdate = value;uniforms.pointLightColor.needsUpdate = value;uniforms.pointLightPosition.needsUpdate = value;uniforms.pointLightDistance.needsUpdate = value;uniforms.pointLightDecay.needsUpdate = value;uniforms.spotLightColor.needsUpdate = value;uniforms.spotLightPosition.needsUpdate = value;uniforms.spotLightDistance.needsUpdate = value;uniforms.spotLightDirection.needsUpdate = value;uniforms.spotLightAngleCos.needsUpdate = value;uniforms.spotLightExponent.needsUpdate = value;uniforms.spotLightDecay.needsUpdate = value;uniforms.hemisphereLightSkyColor.needsUpdate = value;uniforms.hemisphereLightGroundColor.needsUpdate = value;uniforms.hemisphereLightDirection.needsUpdate = value;}function refreshUniformsShadow(uniforms,lights){if(uniforms.shadowMatrix){var j=0;for(var i=0,il=lights.length;i < il;i++) {var light=lights[i];if(!light.castShadow)continue;if(light instanceof THREE.SpotLight || light instanceof THREE.DirectionalLight){uniforms.shadowMap.value[j] = light.shadowMap;uniforms.shadowMapSize.value[j] = light.shadowMapSize;uniforms.shadowMatrix.value[j] = light.shadowMatrix;uniforms.shadowDarkness.value[j] = light.shadowDarkness;uniforms.shadowBias.value[j] = light.shadowBias;j++;}}}} // Uniforms (load to GPU)
	function loadUniformsMatrices(uniforms,object){_gl.uniformMatrix4fv(uniforms.modelViewMatrix,false,object.modelViewMatrix.elements);if(uniforms.normalMatrix){_gl.uniformMatrix3fv(uniforms.normalMatrix,false,object.normalMatrix.elements);}}function getTextureUnit(){var textureUnit=_usedTextureUnits;if(textureUnit >= capabilities.maxTextures){console.warn('WebGLRenderer: trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures);}_usedTextureUnits += 1;return textureUnit;}function loadUniformsGeneric(uniforms){var texture,textureUnit;for(var j=0,jl=uniforms.length;j < jl;j++) {var uniform=uniforms[j][0]; // needsUpdate property is not added to all uniforms.
	if(uniform.needsUpdate === false)continue;var type=uniform.type;var value=uniform.value;var location=uniforms[j][1];switch(type){case '1i':_gl.uniform1i(location,value);break;case '1f':_gl.uniform1f(location,value);break;case '2f':_gl.uniform2f(location,value[0],value[1]);break;case '3f':_gl.uniform3f(location,value[0],value[1],value[2]);break;case '4f':_gl.uniform4f(location,value[0],value[1],value[2],value[3]);break;case '1iv':_gl.uniform1iv(location,value);break;case '3iv':_gl.uniform3iv(location,value);break;case '1fv':_gl.uniform1fv(location,value);break;case '2fv':_gl.uniform2fv(location,value);break;case '3fv':_gl.uniform3fv(location,value);break;case '4fv':_gl.uniform4fv(location,value);break;case 'Matrix3fv':_gl.uniformMatrix3fv(location,false,value);break;case 'Matrix4fv':_gl.uniformMatrix4fv(location,false,value);break; //
	case 'i': // single integer
	_gl.uniform1i(location,value);break;case 'f': // single float
	_gl.uniform1f(location,value);break;case 'v2': // single THREE.Vector2
	_gl.uniform2f(location,value.x,value.y);break;case 'v3': // single THREE.Vector3
	_gl.uniform3f(location,value.x,value.y,value.z);break;case 'v4': // single THREE.Vector4
	_gl.uniform4f(location,value.x,value.y,value.z,value.w);break;case 'c': // single THREE.Color
	_gl.uniform3f(location,value.r,value.g,value.b);break;case 'iv1': // flat array of integers (JS or typed array)
	_gl.uniform1iv(location,value);break;case 'iv': // flat array of integers with 3 x N size (JS or typed array)
	_gl.uniform3iv(location,value);break;case 'fv1': // flat array of floats (JS or typed array)
	_gl.uniform1fv(location,value);break;case 'fv': // flat array of floats with 3 x N size (JS or typed array)
	_gl.uniform3fv(location,value);break;case 'v2v': // array of THREE.Vector2
	if(uniform._array === undefined){uniform._array = new Float32Array(2 * value.length);}for(var i=0,i2=0,il=value.length;i < il;i++,i2 += 2) {uniform._array[i2 + 0] = value[i].x;uniform._array[i2 + 1] = value[i].y;}_gl.uniform2fv(location,uniform._array);break;case 'v3v': // array of THREE.Vector3
	if(uniform._array === undefined){uniform._array = new Float32Array(3 * value.length);}for(var i=0,i3=0,il=value.length;i < il;i++,i3 += 3) {uniform._array[i3 + 0] = value[i].x;uniform._array[i3 + 1] = value[i].y;uniform._array[i3 + 2] = value[i].z;}_gl.uniform3fv(location,uniform._array);break;case 'v4v': // array of THREE.Vector4
	if(uniform._array === undefined){uniform._array = new Float32Array(4 * value.length);}for(var i=0,i4=0,il=value.length;i < il;i++,i4 += 4) {uniform._array[i4 + 0] = value[i].x;uniform._array[i4 + 1] = value[i].y;uniform._array[i4 + 2] = value[i].z;uniform._array[i4 + 3] = value[i].w;}_gl.uniform4fv(location,uniform._array);break;case 'm3': // single THREE.Matrix3
	_gl.uniformMatrix3fv(location,false,value.elements);break;case 'm3v': // array of THREE.Matrix3
	if(uniform._array === undefined){uniform._array = new Float32Array(9 * value.length);}for(var i=0,il=value.length;i < il;i++) {value[i].flattenToArrayOffset(uniform._array,i * 9);}_gl.uniformMatrix3fv(location,false,uniform._array);break;case 'm4': // single THREE.Matrix4
	_gl.uniformMatrix4fv(location,false,value.elements);break;case 'm4v': // array of THREE.Matrix4
	if(uniform._array === undefined){uniform._array = new Float32Array(16 * value.length);}for(var i=0,il=value.length;i < il;i++) {value[i].flattenToArrayOffset(uniform._array,i * 16);}_gl.uniformMatrix4fv(location,false,uniform._array);break;case 't': // single THREE.Texture (2d or cube)
	texture = value;textureUnit = getTextureUnit();_gl.uniform1i(location,textureUnit);if(!texture)continue;if(texture instanceof THREE.CubeTexture || Array.isArray(texture.image) && texture.image.length === 6){ // CompressedTexture can have Array in image :/
	setCubeTexture(texture,textureUnit);}else if(texture instanceof THREE.WebGLRenderTargetCube){setCubeTextureDynamic(texture,textureUnit);}else {_this.setTexture(texture,textureUnit);}break;case 'tv': // array of THREE.Texture (2d)
	if(uniform._array === undefined){uniform._array = [];}for(var i=0,il=uniform.value.length;i < il;i++) {uniform._array[i] = getTextureUnit();}_gl.uniform1iv(location,uniform._array);for(var i=0,il=uniform.value.length;i < il;i++) {texture = uniform.value[i];textureUnit = uniform._array[i];if(!texture)continue;_this.setTexture(texture,textureUnit);}break;default:console.warn('THREE.WebGLRenderer: Unknown uniform type: ' + type);}}}function setColorLinear(array,offset,color,intensity){array[offset + 0] = color.r * intensity;array[offset + 1] = color.g * intensity;array[offset + 2] = color.b * intensity;}function setupLights(lights,camera){var l,ll,light,r=0,g=0,b=0,color,skyColor,groundColor,intensity,distance,zlights=_lights,viewMatrix=camera.matrixWorldInverse,dirColors=zlights.directional.colors,dirPositions=zlights.directional.positions,pointColors=zlights.point.colors,pointPositions=zlights.point.positions,pointDistances=zlights.point.distances,pointDecays=zlights.point.decays,spotColors=zlights.spot.colors,spotPositions=zlights.spot.positions,spotDistances=zlights.spot.distances,spotDirections=zlights.spot.directions,spotAnglesCos=zlights.spot.anglesCos,spotExponents=zlights.spot.exponents,spotDecays=zlights.spot.decays,hemiSkyColors=zlights.hemi.skyColors,hemiGroundColors=zlights.hemi.groundColors,hemiPositions=zlights.hemi.positions,dirLength=0,pointLength=0,spotLength=0,hemiLength=0,dirCount=0,pointCount=0,spotCount=0,hemiCount=0,dirOffset=0,pointOffset=0,spotOffset=0,hemiOffset=0;for(l = 0,ll = lights.length;l < ll;l++) {light = lights[l];if(light.onlyShadow)continue;color = light.color;intensity = light.intensity;distance = light.distance;if(light instanceof THREE.AmbientLight){if(!light.visible)continue;r += color.r;g += color.g;b += color.b;}else if(light instanceof THREE.DirectionalLight){dirCount += 1;if(!light.visible)continue;_direction.setFromMatrixPosition(light.matrixWorld);_vector3.setFromMatrixPosition(light.target.matrixWorld);_direction.sub(_vector3);_direction.transformDirection(viewMatrix);dirOffset = dirLength * 3;dirPositions[dirOffset + 0] = _direction.x;dirPositions[dirOffset + 1] = _direction.y;dirPositions[dirOffset + 2] = _direction.z;setColorLinear(dirColors,dirOffset,color,intensity);dirLength += 1;}else if(light instanceof THREE.PointLight){pointCount += 1;if(!light.visible)continue;pointOffset = pointLength * 3;setColorLinear(pointColors,pointOffset,color,intensity);_vector3.setFromMatrixPosition(light.matrixWorld);_vector3.applyMatrix4(viewMatrix);pointPositions[pointOffset + 0] = _vector3.x;pointPositions[pointOffset + 1] = _vector3.y;pointPositions[pointOffset + 2] = _vector3.z; // distance is 0 if decay is 0, because there is no attenuation at all.
	pointDistances[pointLength] = distance;pointDecays[pointLength] = light.distance === 0?0.0:light.decay;pointLength += 1;}else if(light instanceof THREE.SpotLight){spotCount += 1;if(!light.visible)continue;spotOffset = spotLength * 3;setColorLinear(spotColors,spotOffset,color,intensity);_direction.setFromMatrixPosition(light.matrixWorld);_vector3.copy(_direction).applyMatrix4(viewMatrix);spotPositions[spotOffset + 0] = _vector3.x;spotPositions[spotOffset + 1] = _vector3.y;spotPositions[spotOffset + 2] = _vector3.z;spotDistances[spotLength] = distance;_vector3.setFromMatrixPosition(light.target.matrixWorld);_direction.sub(_vector3);_direction.transformDirection(viewMatrix);spotDirections[spotOffset + 0] = _direction.x;spotDirections[spotOffset + 1] = _direction.y;spotDirections[spotOffset + 2] = _direction.z;spotAnglesCos[spotLength] = Math.cos(light.angle);spotExponents[spotLength] = light.exponent;spotDecays[spotLength] = light.distance === 0?0.0:light.decay;spotLength += 1;}else if(light instanceof THREE.HemisphereLight){hemiCount += 1;if(!light.visible)continue;_direction.setFromMatrixPosition(light.matrixWorld);_direction.transformDirection(viewMatrix);hemiOffset = hemiLength * 3;hemiPositions[hemiOffset + 0] = _direction.x;hemiPositions[hemiOffset + 1] = _direction.y;hemiPositions[hemiOffset + 2] = _direction.z;skyColor = light.color;groundColor = light.groundColor;setColorLinear(hemiSkyColors,hemiOffset,skyColor,intensity);setColorLinear(hemiGroundColors,hemiOffset,groundColor,intensity);hemiLength += 1;}} // null eventual remains from removed lights
	// (this is to avoid if in shader)
	for(l = dirLength * 3,ll = Math.max(dirColors.length,dirCount * 3);l < ll;l++) dirColors[l] = 0.0;for(l = pointLength * 3,ll = Math.max(pointColors.length,pointCount * 3);l < ll;l++) pointColors[l] = 0.0;for(l = spotLength * 3,ll = Math.max(spotColors.length,spotCount * 3);l < ll;l++) spotColors[l] = 0.0;for(l = hemiLength * 3,ll = Math.max(hemiSkyColors.length,hemiCount * 3);l < ll;l++) hemiSkyColors[l] = 0.0;for(l = hemiLength * 3,ll = Math.max(hemiGroundColors.length,hemiCount * 3);l < ll;l++) hemiGroundColors[l] = 0.0;zlights.directional.length = dirLength;zlights.point.length = pointLength;zlights.spot.length = spotLength;zlights.hemi.length = hemiLength;zlights.ambient[0] = r;zlights.ambient[1] = g;zlights.ambient[2] = b;} // GL state setting
	this.setFaceCulling = function(cullFace,frontFaceDirection){if(cullFace === THREE.CullFaceNone){state.disable(_gl.CULL_FACE);}else {if(frontFaceDirection === THREE.FrontFaceDirectionCW){_gl.frontFace(_gl.CW);}else {_gl.frontFace(_gl.CCW);}if(cullFace === THREE.CullFaceBack){_gl.cullFace(_gl.BACK);}else if(cullFace === THREE.CullFaceFront){_gl.cullFace(_gl.FRONT);}else {_gl.cullFace(_gl.FRONT_AND_BACK);}state.enable(_gl.CULL_FACE);}}; // Textures
	function setTextureParameters(textureType,texture,isImagePowerOfTwo){var extension;if(isImagePowerOfTwo){_gl.texParameteri(textureType,_gl.TEXTURE_WRAP_S,paramThreeToGL(texture.wrapS));_gl.texParameteri(textureType,_gl.TEXTURE_WRAP_T,paramThreeToGL(texture.wrapT));_gl.texParameteri(textureType,_gl.TEXTURE_MAG_FILTER,paramThreeToGL(texture.magFilter));_gl.texParameteri(textureType,_gl.TEXTURE_MIN_FILTER,paramThreeToGL(texture.minFilter));}else {_gl.texParameteri(textureType,_gl.TEXTURE_WRAP_S,_gl.CLAMP_TO_EDGE);_gl.texParameteri(textureType,_gl.TEXTURE_WRAP_T,_gl.CLAMP_TO_EDGE);if(texture.wrapS !== THREE.ClampToEdgeWrapping || texture.wrapT !== THREE.ClampToEdgeWrapping){console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping. ( ' + texture.sourceFile + ' )');}_gl.texParameteri(textureType,_gl.TEXTURE_MAG_FILTER,filterFallback(texture.magFilter));_gl.texParameteri(textureType,_gl.TEXTURE_MIN_FILTER,filterFallback(texture.minFilter));if(texture.minFilter !== THREE.NearestFilter && texture.minFilter !== THREE.LinearFilter){console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter. ( ' + texture.sourceFile + ' )');}}extension = extensions.get('EXT_texture_filter_anisotropic');if(extension){if(texture.type === THREE.FloatType && extensions.get('OES_texture_float_linear') === null)return;if(texture.type === THREE.HalfFloatType && extensions.get('OES_texture_half_float_linear') === null)return;if(texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy){_gl.texParameterf(textureType,extension.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(texture.anisotropy,_this.getMaxAnisotropy()));properties.get(texture).__currentAnisotropy = texture.anisotropy;}}}function uploadTexture(textureProperties,texture,slot){if(textureProperties.__webglInit === undefined){textureProperties.__webglInit = true;texture.__webglInit = true;texture.addEventListener('dispose',onTextureDispose);textureProperties.__webglTexture = _gl.createTexture();_infoMemory.textures++;}state.activeTexture(_gl.TEXTURE0 + slot);state.bindTexture(_gl.TEXTURE_2D,textureProperties.__webglTexture);_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL,texture.flipY);_gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,texture.premultiplyAlpha);_gl.pixelStorei(_gl.UNPACK_ALIGNMENT,texture.unpackAlignment);texture.image = clampToMaxSize(texture.image,capabilities.maxTextureSize);var image=texture.image,isImagePowerOfTwo=THREE.Math.isPowerOfTwo(image.width) && THREE.Math.isPowerOfTwo(image.height),glFormat=paramThreeToGL(texture.format),glType=paramThreeToGL(texture.type);setTextureParameters(_gl.TEXTURE_2D,texture,isImagePowerOfTwo);var mipmap,mipmaps=texture.mipmaps;if(texture instanceof THREE.DataTexture){ // use manually created mipmaps if available
	// if there are no manual mipmaps
	// set 0 level mipmap and then use GL to generate other mipmap levels
	if(mipmaps.length > 0 && isImagePowerOfTwo){for(var i=0,il=mipmaps.length;i < il;i++) {mipmap = mipmaps[i];state.texImage2D(_gl.TEXTURE_2D,i,glFormat,mipmap.width,mipmap.height,0,glFormat,glType,mipmap.data);}texture.generateMipmaps = false;}else {state.texImage2D(_gl.TEXTURE_2D,0,glFormat,image.width,image.height,0,glFormat,glType,image.data);}}else if(texture instanceof THREE.CompressedTexture){for(var i=0,il=mipmaps.length;i < il;i++) {mipmap = mipmaps[i];if(texture.format !== THREE.RGBAFormat && texture.format !== THREE.RGBFormat){if(state.getCompressedTextureFormats().indexOf(glFormat) > -1){state.compressedTexImage2D(_gl.TEXTURE_2D,i,glFormat,mipmap.width,mipmap.height,0,mipmap.data);}else {console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");}}else {state.texImage2D(_gl.TEXTURE_2D,i,glFormat,mipmap.width,mipmap.height,0,glFormat,glType,mipmap.data);}}}else { // regular Texture (image, video, canvas)
	// use manually created mipmaps if available
	// if there are no manual mipmaps
	// set 0 level mipmap and then use GL to generate other mipmap levels
	if(mipmaps.length > 0 && isImagePowerOfTwo){for(var i=0,il=mipmaps.length;i < il;i++) {mipmap = mipmaps[i];state.texImage2D(_gl.TEXTURE_2D,i,glFormat,glFormat,glType,mipmap);}texture.generateMipmaps = false;}else {state.texImage2D(_gl.TEXTURE_2D,0,glFormat,glFormat,glType,texture.image);}}if(texture.generateMipmaps && isImagePowerOfTwo)_gl.generateMipmap(_gl.TEXTURE_2D);textureProperties.__version = texture.version;if(texture.onUpdate)texture.onUpdate(texture);}this.setTexture = function(texture,slot){var textureProperties=properties.get(texture);if(texture.version > 0 && textureProperties.__version !== texture.version){var image=texture.image;if(image === undefined){console.warn('THREE.WebGLRenderer: Texture marked for update but image is undefined',texture);return;}if(image.complete === false){console.warn('THREE.WebGLRenderer: Texture marked for update but image is incomplete',texture);return;}uploadTexture(textureProperties,texture,slot);return;}state.activeTexture(_gl.TEXTURE0 + slot);state.bindTexture(_gl.TEXTURE_2D,textureProperties.__webglTexture);};function clampToMaxSize(image,maxSize){if(image.width > maxSize || image.height > maxSize){ // Warning: Scaling through the canvas will only work with images that use
	// premultiplied alpha.
	var scale=maxSize / Math.max(image.width,image.height);var canvas=document.createElement('canvas');canvas.width = Math.floor(image.width * scale);canvas.height = Math.floor(image.height * scale);var context=canvas.getContext('2d');context.drawImage(image,0,0,image.width,image.height,0,0,canvas.width,canvas.height);console.warn('THREE.WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height,image);return canvas;}return image;}function setCubeTexture(texture,slot){var textureProperties=properties.get(texture);if(texture.image.length === 6){if(texture.version > 0 && textureProperties.__version !== texture.version){if(!textureProperties.__image__webglTextureCube){texture.addEventListener('dispose',onTextureDispose);textureProperties.__image__webglTextureCube = _gl.createTexture();_infoMemory.textures++;}state.activeTexture(_gl.TEXTURE0 + slot);state.bindTexture(_gl.TEXTURE_CUBE_MAP,textureProperties.__image__webglTextureCube);_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL,texture.flipY);var isCompressed=texture instanceof THREE.CompressedTexture;var isDataTexture=texture.image[0] instanceof THREE.DataTexture;var cubeImage=[];for(var i=0;i < 6;i++) {if(_this.autoScaleCubemaps && !isCompressed && !isDataTexture){cubeImage[i] = clampToMaxSize(texture.image[i],capabilities.maxCubemapSize);}else {cubeImage[i] = isDataTexture?texture.image[i].image:texture.image[i];}}var image=cubeImage[0],isImagePowerOfTwo=THREE.Math.isPowerOfTwo(image.width) && THREE.Math.isPowerOfTwo(image.height),glFormat=paramThreeToGL(texture.format),glType=paramThreeToGL(texture.type);setTextureParameters(_gl.TEXTURE_CUBE_MAP,texture,isImagePowerOfTwo);for(var i=0;i < 6;i++) {if(!isCompressed){if(isDataTexture){state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,0,glFormat,cubeImage[i].width,cubeImage[i].height,0,glFormat,glType,cubeImage[i].data);}else {state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,0,glFormat,glFormat,glType,cubeImage[i]);}}else {var mipmap,mipmaps=cubeImage[i].mipmaps;for(var j=0,jl=mipmaps.length;j < jl;j++) {mipmap = mipmaps[j];if(texture.format !== THREE.RGBAFormat && texture.format !== THREE.RGBFormat){if(state.getCompressedTextureFormats().indexOf(glFormat) > -1){state.compressedTexImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,j,glFormat,mipmap.width,mipmap.height,0,mipmap.data);}else {console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()");}}else {state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,j,glFormat,mipmap.width,mipmap.height,0,glFormat,glType,mipmap.data);}}}}if(texture.generateMipmaps && isImagePowerOfTwo){_gl.generateMipmap(_gl.TEXTURE_CUBE_MAP);}textureProperties.__version = texture.version;if(texture.onUpdate)texture.onUpdate(texture);}else {state.activeTexture(_gl.TEXTURE0 + slot);state.bindTexture(_gl.TEXTURE_CUBE_MAP,textureProperties.__image__webglTextureCube);}}}function setCubeTextureDynamic(texture,slot){state.activeTexture(_gl.TEXTURE0 + slot);state.bindTexture(_gl.TEXTURE_CUBE_MAP,properties.get(texture).__webglTexture);} // Render targets
	function setupFrameBuffer(framebuffer,renderTarget,textureTarget){_gl.bindFramebuffer(_gl.FRAMEBUFFER,framebuffer);_gl.framebufferTexture2D(_gl.FRAMEBUFFER,_gl.COLOR_ATTACHMENT0,textureTarget,properties.get(renderTarget).__webglTexture,0);}function setupRenderBuffer(renderbuffer,renderTarget){_gl.bindRenderbuffer(_gl.RENDERBUFFER,renderbuffer);if(renderTarget.depthBuffer && !renderTarget.stencilBuffer){_gl.renderbufferStorage(_gl.RENDERBUFFER,_gl.DEPTH_COMPONENT16,renderTarget.width,renderTarget.height);_gl.framebufferRenderbuffer(_gl.FRAMEBUFFER,_gl.DEPTH_ATTACHMENT,_gl.RENDERBUFFER,renderbuffer); /* For some reason this is not working. Defaulting to RGBA4.
			} else if ( ! renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

				_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.STENCIL_INDEX8, renderTarget.width, renderTarget.height );
				_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );
			*/}else if(renderTarget.depthBuffer && renderTarget.stencilBuffer){_gl.renderbufferStorage(_gl.RENDERBUFFER,_gl.DEPTH_STENCIL,renderTarget.width,renderTarget.height);_gl.framebufferRenderbuffer(_gl.FRAMEBUFFER,_gl.DEPTH_STENCIL_ATTACHMENT,_gl.RENDERBUFFER,renderbuffer);}else {_gl.renderbufferStorage(_gl.RENDERBUFFER,_gl.RGBA4,renderTarget.width,renderTarget.height);}}this.setRenderTarget = function(renderTarget){var isCube=renderTarget instanceof THREE.WebGLRenderTargetCube;if(renderTarget && properties.get(renderTarget).__webglFramebuffer === undefined){var renderTargetProperties=properties.get(renderTarget);if(renderTarget.depthBuffer === undefined)renderTarget.depthBuffer = true;if(renderTarget.stencilBuffer === undefined)renderTarget.stencilBuffer = true;renderTarget.addEventListener('dispose',onRenderTargetDispose);renderTargetProperties.__webglTexture = _gl.createTexture();_infoMemory.textures++; // Setup texture, create render and frame buffers
	var isTargetPowerOfTwo=THREE.Math.isPowerOfTwo(renderTarget.width) && THREE.Math.isPowerOfTwo(renderTarget.height),glFormat=paramThreeToGL(renderTarget.format),glType=paramThreeToGL(renderTarget.type);if(isCube){renderTargetProperties.__webglFramebuffer = [];renderTargetProperties.__webglRenderbuffer = [];state.bindTexture(_gl.TEXTURE_CUBE_MAP,renderTargetProperties.__webglTexture);setTextureParameters(_gl.TEXTURE_CUBE_MAP,renderTarget,isTargetPowerOfTwo);for(var i=0;i < 6;i++) {renderTargetProperties.__webglFramebuffer[i] = _gl.createFramebuffer();renderTargetProperties.__webglRenderbuffer[i] = _gl.createRenderbuffer();state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,0,glFormat,renderTarget.width,renderTarget.height,0,glFormat,glType,null);setupFrameBuffer(renderTargetProperties.__webglFramebuffer[i],renderTarget,_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i);setupRenderBuffer(renderTargetProperties.__webglRenderbuffer[i],renderTarget);}if(renderTarget.generateMipmaps && isTargetPowerOfTwo)_gl.generateMipmap(_gl.TEXTURE_CUBE_MAP);}else {renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();if(renderTarget.shareDepthFrom){renderTargetProperties.__webglRenderbuffer = renderTarget.shareDepthFrom.__webglRenderbuffer;}else {renderTargetProperties.__webglRenderbuffer = _gl.createRenderbuffer();}state.bindTexture(_gl.TEXTURE_2D,renderTargetProperties.__webglTexture);setTextureParameters(_gl.TEXTURE_2D,renderTarget,isTargetPowerOfTwo);state.texImage2D(_gl.TEXTURE_2D,0,glFormat,renderTarget.width,renderTarget.height,0,glFormat,glType,null);setupFrameBuffer(renderTargetProperties.__webglFramebuffer,renderTarget,_gl.TEXTURE_2D);if(renderTarget.shareDepthFrom){if(renderTarget.depthBuffer && !renderTarget.stencilBuffer){_gl.framebufferRenderbuffer(_gl.FRAMEBUFFER,_gl.DEPTH_ATTACHMENT,_gl.RENDERBUFFER,renderTargetProperties.__webglRenderbuffer);}else if(renderTarget.depthBuffer && renderTarget.stencilBuffer){_gl.framebufferRenderbuffer(_gl.FRAMEBUFFER,_gl.DEPTH_STENCIL_ATTACHMENT,_gl.RENDERBUFFER,renderTargetProperties.__webglRenderbuffer);}}else {setupRenderBuffer(renderTargetProperties.__webglRenderbuffer,renderTarget);}if(renderTarget.generateMipmaps && isTargetPowerOfTwo)_gl.generateMipmap(_gl.TEXTURE_2D);} // Release everything
	if(isCube){state.bindTexture(_gl.TEXTURE_CUBE_MAP,null);}else {state.bindTexture(_gl.TEXTURE_2D,null);}_gl.bindRenderbuffer(_gl.RENDERBUFFER,null);_gl.bindFramebuffer(_gl.FRAMEBUFFER,null);}var framebuffer,width,height,vx,vy;if(renderTarget){var renderTargetProperties=properties.get(renderTarget);if(isCube){framebuffer = renderTargetProperties.__webglFramebuffer[renderTarget.activeCubeFace];}else {framebuffer = renderTargetProperties.__webglFramebuffer;}width = renderTarget.width;height = renderTarget.height;vx = 0;vy = 0;}else {framebuffer = null;width = _viewportWidth;height = _viewportHeight;vx = _viewportX;vy = _viewportY;}if(framebuffer !== _currentFramebuffer){_gl.bindFramebuffer(_gl.FRAMEBUFFER,framebuffer);_gl.viewport(vx,vy,width,height);_currentFramebuffer = framebuffer;}_currentWidth = width;_currentHeight = height;};this.readRenderTargetPixels = function(renderTarget,x,y,width,height,buffer){if(!(renderTarget instanceof THREE.WebGLRenderTarget)){console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.');return;}if(properties.get(renderTarget).__webglFramebuffer){if(renderTarget.format !== THREE.RGBAFormat){console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA format. readPixels can read only RGBA format.');return;}var restore=false;if(properties.get(renderTarget).__webglFramebuffer !== _currentFramebuffer){_gl.bindFramebuffer(_gl.FRAMEBUFFER,properties.get(renderTarget).__webglFramebuffer);restore = true;}if(_gl.checkFramebufferStatus(_gl.FRAMEBUFFER) === _gl.FRAMEBUFFER_COMPLETE){_gl.readPixels(x,y,width,height,_gl.RGBA,_gl.UNSIGNED_BYTE,buffer);}else {console.error('THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.');}if(restore){_gl.bindFramebuffer(_gl.FRAMEBUFFER,_currentFramebuffer);}}};function updateRenderTargetMipmap(renderTarget){if(renderTarget instanceof THREE.WebGLRenderTargetCube){state.bindTexture(_gl.TEXTURE_CUBE_MAP,properties.get(renderTarget).__webglTexture);_gl.generateMipmap(_gl.TEXTURE_CUBE_MAP);state.bindTexture(_gl.TEXTURE_CUBE_MAP,null);}else {state.bindTexture(_gl.TEXTURE_2D,properties.get(renderTarget).__webglTexture);_gl.generateMipmap(_gl.TEXTURE_2D);state.bindTexture(_gl.TEXTURE_2D,null);}} // Fallback filters for non-power-of-2 textures
	function filterFallback(f){if(f === THREE.NearestFilter || f === THREE.NearestMipMapNearestFilter || f === THREE.NearestMipMapLinearFilter){return _gl.NEAREST;}return _gl.LINEAR;} // Map three.js constants to WebGL constants
	function paramThreeToGL(p){var extension;if(p === THREE.RepeatWrapping)return _gl.REPEAT;if(p === THREE.ClampToEdgeWrapping)return _gl.CLAMP_TO_EDGE;if(p === THREE.MirroredRepeatWrapping)return _gl.MIRRORED_REPEAT;if(p === THREE.NearestFilter)return _gl.NEAREST;if(p === THREE.NearestMipMapNearestFilter)return _gl.NEAREST_MIPMAP_NEAREST;if(p === THREE.NearestMipMapLinearFilter)return _gl.NEAREST_MIPMAP_LINEAR;if(p === THREE.LinearFilter)return _gl.LINEAR;if(p === THREE.LinearMipMapNearestFilter)return _gl.LINEAR_MIPMAP_NEAREST;if(p === THREE.LinearMipMapLinearFilter)return _gl.LINEAR_MIPMAP_LINEAR;if(p === THREE.UnsignedByteType)return _gl.UNSIGNED_BYTE;if(p === THREE.UnsignedShort4444Type)return _gl.UNSIGNED_SHORT_4_4_4_4;if(p === THREE.UnsignedShort5551Type)return _gl.UNSIGNED_SHORT_5_5_5_1;if(p === THREE.UnsignedShort565Type)return _gl.UNSIGNED_SHORT_5_6_5;if(p === THREE.ByteType)return _gl.BYTE;if(p === THREE.ShortType)return _gl.SHORT;if(p === THREE.UnsignedShortType)return _gl.UNSIGNED_SHORT;if(p === THREE.IntType)return _gl.INT;if(p === THREE.UnsignedIntType)return _gl.UNSIGNED_INT;if(p === THREE.FloatType)return _gl.FLOAT;extension = extensions.get('OES_texture_half_float');if(extension !== null){if(p === THREE.HalfFloatType)return extension.HALF_FLOAT_OES;}if(p === THREE.AlphaFormat)return _gl.ALPHA;if(p === THREE.RGBFormat)return _gl.RGB;if(p === THREE.RGBAFormat)return _gl.RGBA;if(p === THREE.LuminanceFormat)return _gl.LUMINANCE;if(p === THREE.LuminanceAlphaFormat)return _gl.LUMINANCE_ALPHA;if(p === THREE.AddEquation)return _gl.FUNC_ADD;if(p === THREE.SubtractEquation)return _gl.FUNC_SUBTRACT;if(p === THREE.ReverseSubtractEquation)return _gl.FUNC_REVERSE_SUBTRACT;if(p === THREE.ZeroFactor)return _gl.ZERO;if(p === THREE.OneFactor)return _gl.ONE;if(p === THREE.SrcColorFactor)return _gl.SRC_COLOR;if(p === THREE.OneMinusSrcColorFactor)return _gl.ONE_MINUS_SRC_COLOR;if(p === THREE.SrcAlphaFactor)return _gl.SRC_ALPHA;if(p === THREE.OneMinusSrcAlphaFactor)return _gl.ONE_MINUS_SRC_ALPHA;if(p === THREE.DstAlphaFactor)return _gl.DST_ALPHA;if(p === THREE.OneMinusDstAlphaFactor)return _gl.ONE_MINUS_DST_ALPHA;if(p === THREE.DstColorFactor)return _gl.DST_COLOR;if(p === THREE.OneMinusDstColorFactor)return _gl.ONE_MINUS_DST_COLOR;if(p === THREE.SrcAlphaSaturateFactor)return _gl.SRC_ALPHA_SATURATE;extension = extensions.get('WEBGL_compressed_texture_s3tc');if(extension !== null){if(p === THREE.RGB_S3TC_DXT1_Format)return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;if(p === THREE.RGBA_S3TC_DXT1_Format)return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(p === THREE.RGBA_S3TC_DXT3_Format)return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(p === THREE.RGBA_S3TC_DXT5_Format)return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;}extension = extensions.get('WEBGL_compressed_texture_pvrtc');if(extension !== null){if(p === THREE.RGB_PVRTC_4BPPV1_Format)return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(p === THREE.RGB_PVRTC_2BPPV1_Format)return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(p === THREE.RGBA_PVRTC_4BPPV1_Format)return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(p === THREE.RGBA_PVRTC_2BPPV1_Format)return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;}extension = extensions.get('EXT_blend_minmax');if(extension !== null){if(p === THREE.MinEquation)return extension.MIN_EXT;if(p === THREE.MaxEquation)return extension.MAX_EXT;}return 0;} // DEPRECATED
	this.supportsFloatTextures = function(){console.warn('THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( \'OES_texture_float\' ).');return extensions.get('OES_texture_float');};this.supportsHalfFloatTextures = function(){console.warn('THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( \'OES_texture_half_float\' ).');return extensions.get('OES_texture_half_float');};this.supportsStandardDerivatives = function(){console.warn('THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( \'OES_standard_derivatives\' ).');return extensions.get('OES_standard_derivatives');};this.supportsCompressedTextureS3TC = function(){console.warn('THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( \'WEBGL_compressed_texture_s3tc\' ).');return extensions.get('WEBGL_compressed_texture_s3tc');};this.supportsCompressedTexturePVRTC = function(){console.warn('THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( \'WEBGL_compressed_texture_pvrtc\' ).');return extensions.get('WEBGL_compressed_texture_pvrtc');};this.supportsBlendMinMax = function(){console.warn('THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( \'EXT_blend_minmax\' ).');return extensions.get('EXT_blend_minmax');};this.supportsVertexTextures = function(){return capabilities.vertexTextures;};this.supportsInstancedArrays = function(){console.warn('THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( \'ANGLE_instanced_arrays\' ).');return extensions.get('ANGLE_instanced_arrays');}; //
	this.initMaterial = function(){console.warn('THREE.WebGLRenderer: .initMaterial() has been removed.');};this.addPrePlugin = function(){console.warn('THREE.WebGLRenderer: .addPrePlugin() has been removed.');};this.addPostPlugin = function(){console.warn('THREE.WebGLRenderer: .addPostPlugin() has been removed.');};this.updateShadowMap = function(){console.warn('THREE.WebGLRenderer: .updateShadowMap() has been removed.');};Object.defineProperties(this,{shadowMapEnabled:{get:function get(){return shadowMap.enabled;},set:function set(value){console.warn('THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.');shadowMap.enabled = value;}},shadowMapType:{get:function get(){return shadowMap.type;},set:function set(value){console.warn('THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.');shadowMap.type = value;}},shadowMapCullFace:{get:function get(){return shadowMap.cullFace;},set:function set(value){console.warn('THREE.WebGLRenderer: .shadowMapCullFace is now .shadowMap.cullFace.');shadowMap.cullFace = value;}},shadowMapDebug:{get:function get(){return shadowMap.debug;},set:function set(value){console.warn('THREE.WebGLRenderer: .shadowMapDebug is now .shadowMap.debug.');shadowMap.debug = value;}}});}; // File:src/renderers/WebGLRenderTarget.js
	/**
	 * @author szimek / https://github.com/szimek/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.WebGLRenderTarget = function(width,height,options){this.uuid = THREE.Math.generateUUID();this.width = width;this.height = height;options = options || {};this.wrapS = options.wrapS !== undefined?options.wrapS:THREE.ClampToEdgeWrapping;this.wrapT = options.wrapT !== undefined?options.wrapT:THREE.ClampToEdgeWrapping;this.magFilter = options.magFilter !== undefined?options.magFilter:THREE.LinearFilter;this.minFilter = options.minFilter !== undefined?options.minFilter:THREE.LinearMipMapLinearFilter;this.anisotropy = options.anisotropy !== undefined?options.anisotropy:1;this.offset = new THREE.Vector2(0,0);this.repeat = new THREE.Vector2(1,1);this.format = options.format !== undefined?options.format:THREE.RGBAFormat;this.type = options.type !== undefined?options.type:THREE.UnsignedByteType;this.depthBuffer = options.depthBuffer !== undefined?options.depthBuffer:true;this.stencilBuffer = options.stencilBuffer !== undefined?options.stencilBuffer:true;this.generateMipmaps = true;this.shareDepthFrom = options.shareDepthFrom !== undefined?options.shareDepthFrom:null;};THREE.WebGLRenderTarget.prototype = {constructor:THREE.WebGLRenderTarget,setSize:function setSize(width,height){if(this.width !== width || this.height !== height){this.width = width;this.height = height;this.dispose();}},clone:function clone(){return new this.constructor().copy(this);},copy:function copy(source){this.width = source.width;this.height = source.height;this.wrapS = source.wrapS;this.wrapT = source.wrapT;this.magFilter = source.magFilter;this.minFilter = source.minFilter;this.anisotropy = source.anisotropy;this.offset.copy(source.offset);this.repeat.copy(source.repeat);this.format = source.format;this.type = source.type;this.depthBuffer = source.depthBuffer;this.stencilBuffer = source.stencilBuffer;this.generateMipmaps = source.generateMipmaps;this.shareDepthFrom = source.shareDepthFrom;return this;},dispose:function dispose(){this.dispatchEvent({type:'dispose'});}};THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype); // File:src/renderers/WebGLRenderTargetCube.js
	/**
	 * @author alteredq / http://alteredqualia.com
	 */THREE.WebGLRenderTargetCube = function(width,height,options){THREE.WebGLRenderTarget.call(this,width,height,options);this.activeCubeFace = 0; // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5
	};THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube; // File:src/renderers/webgl/WebGLBufferRenderer.js
	/**
	* @author mrdoob / http://mrdoob.com/
	*/THREE.WebGLBufferRenderer = function(_gl,extensions,_infoRender){var mode;function setMode(value){mode = value;}function render(start,count){_gl.drawArrays(mode,start,count);_infoRender.calls++;_infoRender.vertices += count;if(mode === _gl.TRIANGLES)_infoRender.faces += count / 3;}function renderInstances(geometry){var extension=extensions.get('ANGLE_instanced_arrays');if(extension === null){console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');return;}var position=geometry.attributes.position;if(position instanceof THREE.InterleavedBufferAttribute){extension.drawArraysInstancedANGLE(mode,0,position.data.count,geometry.maxInstancedCount);}else {extension.drawArraysInstancedANGLE(mode,0,position.count,geometry.maxInstancedCount);}}this.setMode = setMode;this.render = render;this.renderInstances = renderInstances;}; // File:src/renderers/webgl/WebGLIndexedBufferRenderer.js
	/**
	* @author mrdoob / http://mrdoob.com/
	*/THREE.WebGLIndexedBufferRenderer = function(_gl,extensions,_infoRender){var mode;function setMode(value){mode = value;}var type,size;function setIndex(index){if(index.array instanceof Uint32Array && extensions.get('OES_element_index_uint')){type = _gl.UNSIGNED_INT;size = 4;}else {type = _gl.UNSIGNED_SHORT;size = 2;}}function render(start,count){_gl.drawElements(mode,count,type,start * size);_infoRender.calls++;_infoRender.vertices += count;if(mode === _gl.TRIANGLES)_infoRender.faces += count / 3;}function renderInstances(geometry){var extension=extensions.get('ANGLE_instanced_arrays');if(extension === null){console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');return;}var index=geometry.index;extension.drawElementsInstancedANGLE(mode,index.array.length,type,0,geometry.maxInstancedCount);}this.setMode = setMode;this.setIndex = setIndex;this.render = render;this.renderInstances = renderInstances;}; // File:src/renderers/webgl/WebGLExtensions.js
	/**
	* @author mrdoob / http://mrdoob.com/
	*/THREE.WebGLExtensions = function(gl){var extensions={};this.get = function(name){if(extensions[name] !== undefined){return extensions[name];}var extension;switch(name){case 'EXT_texture_filter_anisotropic':extension = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');break;case 'WEBGL_compressed_texture_s3tc':extension = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');break;case 'WEBGL_compressed_texture_pvrtc':extension = gl.getExtension('WEBGL_compressed_texture_pvrtc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');break;default:extension = gl.getExtension(name);}if(extension === null){console.warn('THREE.WebGLRenderer: ' + name + ' extension not supported.');}extensions[name] = extension;return extension;};}; // File:src/renderers/webgl/WebGLCapabilities.js
	THREE.WebGLCapabilities = function(gl,extensions,parameters){function getMaxPrecision(precision){if(precision === 'highp'){if(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.HIGH_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT).precision > 0){return 'highp';}precision = 'mediump';}if(precision === 'mediump'){if(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.MEDIUM_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.MEDIUM_FLOAT).precision > 0){return 'mediump';}}return 'lowp';}this.getMaxPrecision = getMaxPrecision;this.precision = parameters.precision !== undefined?parameters.precision:'highp',this.logarithmicDepthBuffer = parameters.logarithmicDepthBuffer !== undefined?parameters.logarithmicDepthBuffer:false;this.maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);this.maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);this.maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);this.maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);this.maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);this.maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);this.maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);this.vertexTextures = this.maxVertexTextures > 0;this.floatFragmentTextures = !!extensions.get('OES_texture_float');this.floatVertexTextures = this.vertexTextures && this.floatFragmentTextures;var _maxPrecision=getMaxPrecision(this.precision);if(_maxPrecision !== this.precision){console.warn('THREE.WebGLRenderer:',this.precision,'not supported, using',_maxPrecision,'instead.');this.precision = _maxPrecision;}if(this.logarithmicDepthBuffer){this.logarithmicDepthBuffer = !!extensions.get('EXT_frag_depth');}}; // File:src/renderers/webgl/WebGLGeometries.js
	/**
	* @author mrdoob / http://mrdoob.com/
	*/THREE.WebGLGeometries = function(gl,properties,info){var geometries={};function get(object){var geometry=object.geometry;if(geometries[geometry.id] !== undefined){return geometries[geometry.id];}geometry.addEventListener('dispose',onGeometryDispose);var buffergeometry;if(geometry instanceof THREE.BufferGeometry){buffergeometry = geometry;}else if(geometry instanceof THREE.Geometry){if(geometry._bufferGeometry === undefined){geometry._bufferGeometry = new THREE.BufferGeometry().setFromObject(object);}buffergeometry = geometry._bufferGeometry;}geometries[geometry.id] = buffergeometry;info.memory.geometries++;return buffergeometry;}function onGeometryDispose(event){var geometry=event.target;var buffergeometry=geometries[geometry.id];deleteAttributes(buffergeometry.attributes);geometry.removeEventListener('dispose',onGeometryDispose);delete geometries[geometry.id];var property=properties.get(geometry);if(property.wireframe)deleteAttribute(property.wireframe);info.memory.geometries--;}function getAttributeBuffer(attribute){if(attribute instanceof THREE.InterleavedBufferAttribute){return properties.get(attribute.data).__webglBuffer;}return properties.get(attribute).__webglBuffer;}function deleteAttribute(attribute){var buffer=getAttributeBuffer(attribute);if(buffer !== undefined){gl.deleteBuffer(buffer);removeAttributeBuffer(attribute);}}function deleteAttributes(attributes){for(var name in attributes) {deleteAttribute(attributes[name]);}}function removeAttributeBuffer(attribute){if(attribute instanceof THREE.InterleavedBufferAttribute){properties['delete'](attribute.data);}else {properties['delete'](attribute);}}this.get = get;}; // File:src/renderers/webgl/WebGLObjects.js
	/**
	* @author mrdoob / http://mrdoob.com/
	*/THREE.WebGLObjects = function(gl,properties,info){var geometries=new THREE.WebGLGeometries(gl,properties,info); //
	function update(object){ // TODO: Avoid updating twice (when using shadowMap). Maybe add frame counter.
	var geometry=geometries.get(object);if(object.geometry instanceof THREE.Geometry){geometry.updateFromObject(object);}var index=geometry.index;var attributes=geometry.attributes;if(index !== null){updateAttribute(index,gl.ELEMENT_ARRAY_BUFFER);}for(var name in attributes) {updateAttribute(attributes[name],gl.ARRAY_BUFFER);} // morph targets
	var morphAttributes=geometry.morphAttributes;for(var name in morphAttributes) {var array=morphAttributes[name];for(var i=0,l=array.length;i < l;i++) {updateAttribute(array[i],gl.ARRAY_BUFFER);}}return geometry;}function updateAttribute(attribute,bufferType){var data=attribute instanceof THREE.InterleavedBufferAttribute?attribute.data:attribute;var attributeProperties=properties.get(data);if(attributeProperties.__webglBuffer === undefined){createBuffer(attributeProperties,data,bufferType);}else if(attributeProperties.version !== data.version){updateBuffer(attributeProperties,data,bufferType);}}function createBuffer(attributeProperties,data,bufferType){attributeProperties.__webglBuffer = gl.createBuffer();gl.bindBuffer(bufferType,attributeProperties.__webglBuffer);var usage=data.dynamic?gl.DYNAMIC_DRAW:gl.STATIC_DRAW;gl.bufferData(bufferType,data.array,usage);attributeProperties.version = data.version;}function updateBuffer(attributeProperties,data,bufferType){gl.bindBuffer(bufferType,attributeProperties.__webglBuffer);if(data.dynamic === false || data.updateRange.count === -1){ // Not using update ranges
	gl.bufferSubData(bufferType,0,data.array);}else if(data.updateRange.count === 0){console.error('THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.');}else {gl.bufferSubData(bufferType,data.updateRange.offset * data.array.BYTES_PER_ELEMENT,data.array.subarray(data.updateRange.offset,data.updateRange.offset + data.updateRange.count));data.updateRange.count = 0; // reset range
	}attributeProperties.version = data.version;}function getAttributeBuffer(attribute){if(attribute instanceof THREE.InterleavedBufferAttribute){return properties.get(attribute.data).__webglBuffer;}return properties.get(attribute).__webglBuffer;}function getWireframeAttribute(geometry){var property=properties.get(geometry);if(property.wireframe !== undefined){return property.wireframe;}var indices=[];var index=geometry.index;var attributes=geometry.attributes;var position=attributes.position; // console.time( 'wireframe' );
	if(index !== null){var edges={};var array=index.array;for(var i=0,l=array.length;i < l;i += 3) {var a=array[i + 0];var b=array[i + 1];var c=array[i + 2];if(checkEdge(edges,a,b))indices.push(a,b);if(checkEdge(edges,b,c))indices.push(b,c);if(checkEdge(edges,c,a))indices.push(c,a);}}else {var array=attributes.position.array;for(var i=0,l=array.length / 3 - 1;i < l;i += 3) {var a=i + 0;var b=i + 1;var c=i + 2;indices.push(a,b,b,c,c,a);}} // console.timeEnd( 'wireframe' );
	var TypeArray=position.count > 65535?Uint32Array:Uint16Array;var attribute=new THREE.BufferAttribute(new TypeArray(indices),1);updateAttribute(attribute,gl.ELEMENT_ARRAY_BUFFER);property.wireframe = attribute;return attribute;}function checkEdge(edges,a,b){if(a > b){var tmp=a;a = b;b = tmp;}var list=edges[a];if(list === undefined){edges[a] = [b];return true;}else if(list.indexOf(b) === -1){list.push(b);return true;}return false;}this.getAttributeBuffer = getAttributeBuffer;this.getWireframeAttribute = getWireframeAttribute;this.update = update;}; // File:src/renderers/webgl/WebGLProgram.js
	THREE.WebGLProgram = (function(){var programIdCount=0;function generateDefines(defines){var chunks=[];for(var name in defines) {var value=defines[name];if(value === false)continue;chunks.push('#define ' + name + ' ' + value);}return chunks.join('\n');}function fetchUniformLocations(gl,program,identifiers){var uniforms={};var n=gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);for(var i=0;i < n;i++) {var info=gl.getActiveUniform(program,i);var name=info.name;var location=gl.getUniformLocation(program,name); // console.log("THREE.WebGLProgram: ACTIVE UNIFORM:", name);
	var suffixPos=name.lastIndexOf('[0]');if(suffixPos !== -1 && suffixPos === name.length - 3){uniforms[name.substr(0,suffixPos)] = location;}uniforms[name] = location;}return uniforms;}function fetchAttributeLocations(gl,program,identifiers){var attributes={};var n=gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);for(var i=0;i < n;i++) {var info=gl.getActiveAttrib(program,i);var name=info.name; // console.log("THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:", name, i );
	attributes[name] = gl.getAttribLocation(program,name);}return attributes;}function filterEmptyLine(string){return string !== '';}return function WebGLProgram(renderer,code,material,parameters){var gl=renderer.context;var defines=material.defines;var vertexShader=material.__webglShader.vertexShader;var fragmentShader=material.__webglShader.fragmentShader;var shadowMapTypeDefine='SHADOWMAP_TYPE_BASIC';if(parameters.shadowMapType === THREE.PCFShadowMap){shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';}else if(parameters.shadowMapType === THREE.PCFSoftShadowMap){shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';}var envMapTypeDefine='ENVMAP_TYPE_CUBE';var envMapModeDefine='ENVMAP_MODE_REFLECTION';var envMapBlendingDefine='ENVMAP_BLENDING_MULTIPLY';if(parameters.envMap){switch(material.envMap.mapping){case THREE.CubeReflectionMapping:case THREE.CubeRefractionMapping:envMapTypeDefine = 'ENVMAP_TYPE_CUBE';break;case THREE.EquirectangularReflectionMapping:case THREE.EquirectangularRefractionMapping:envMapTypeDefine = 'ENVMAP_TYPE_EQUIREC';break;case THREE.SphericalReflectionMapping:envMapTypeDefine = 'ENVMAP_TYPE_SPHERE';break;}switch(material.envMap.mapping){case THREE.CubeRefractionMapping:case THREE.EquirectangularRefractionMapping:envMapModeDefine = 'ENVMAP_MODE_REFRACTION';break;}switch(material.combine){case THREE.MultiplyOperation:envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';break;case THREE.MixOperation:envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';break;case THREE.AddOperation:envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';break;}}var gammaFactorDefine=renderer.gammaFactor > 0?renderer.gammaFactor:1.0; // console.log( 'building new program ' );
	//
	var customDefines=generateDefines(defines); //
	var program=gl.createProgram();var prefixVertex,prefixFragment;if(material instanceof THREE.RawShaderMaterial){prefixVertex = '';prefixFragment = '';}else {prefixVertex = ['precision ' + parameters.precision + ' float;','precision ' + parameters.precision + ' int;','#define SHADER_NAME ' + material.__webglShader.name,customDefines,parameters.supportsVertexTextures?'#define VERTEX_TEXTURES':'',renderer.gammaInput?'#define GAMMA_INPUT':'',renderer.gammaOutput?'#define GAMMA_OUTPUT':'','#define GAMMA_FACTOR ' + gammaFactorDefine,'#define MAX_DIR_LIGHTS ' + parameters.maxDirLights,'#define MAX_POINT_LIGHTS ' + parameters.maxPointLights,'#define MAX_SPOT_LIGHTS ' + parameters.maxSpotLights,'#define MAX_HEMI_LIGHTS ' + parameters.maxHemiLights,'#define MAX_SHADOWS ' + parameters.maxShadows,'#define MAX_BONES ' + parameters.maxBones,parameters.map?'#define USE_MAP':'',parameters.envMap?'#define USE_ENVMAP':'',parameters.envMap?'#define ' + envMapModeDefine:'',parameters.lightMap?'#define USE_LIGHTMAP':'',parameters.aoMap?'#define USE_AOMAP':'',parameters.emissiveMap?'#define USE_EMISSIVEMAP':'',parameters.bumpMap?'#define USE_BUMPMAP':'',parameters.normalMap?'#define USE_NORMALMAP':'',parameters.displacementMap && parameters.supportsVertexTextures?'#define USE_DISPLACEMENTMAP':'',parameters.specularMap?'#define USE_SPECULARMAP':'',parameters.alphaMap?'#define USE_ALPHAMAP':'',parameters.vertexColors?'#define USE_COLOR':'',parameters.flatShading?'#define FLAT_SHADED':'',parameters.skinning?'#define USE_SKINNING':'',parameters.useVertexTexture?'#define BONE_TEXTURE':'',parameters.morphTargets?'#define USE_MORPHTARGETS':'',parameters.morphNormals && parameters.flatShading === false?'#define USE_MORPHNORMALS':'',parameters.doubleSided?'#define DOUBLE_SIDED':'',parameters.flipSided?'#define FLIP_SIDED':'',parameters.shadowMapEnabled?'#define USE_SHADOWMAP':'',parameters.shadowMapEnabled?'#define ' + shadowMapTypeDefine:'',parameters.shadowMapDebug?'#define SHADOWMAP_DEBUG':'',parameters.sizeAttenuation?'#define USE_SIZEATTENUATION':'',parameters.logarithmicDepthBuffer?'#define USE_LOGDEPTHBUF':'',parameters.logarithmicDepthBuffer && renderer.extensions.get('EXT_frag_depth')?'#define USE_LOGDEPTHBUF_EXT':'','uniform mat4 modelMatrix;','uniform mat4 modelViewMatrix;','uniform mat4 projectionMatrix;','uniform mat4 viewMatrix;','uniform mat3 normalMatrix;','uniform vec3 cameraPosition;','attribute vec3 position;','attribute vec3 normal;','attribute vec2 uv;','#ifdef USE_COLOR','	attribute vec3 color;','#endif','#ifdef USE_MORPHTARGETS','	attribute vec3 morphTarget0;','	attribute vec3 morphTarget1;','	attribute vec3 morphTarget2;','	attribute vec3 morphTarget3;','	#ifdef USE_MORPHNORMALS','		attribute vec3 morphNormal0;','		attribute vec3 morphNormal1;','		attribute vec3 morphNormal2;','		attribute vec3 morphNormal3;','	#else','		attribute vec3 morphTarget4;','		attribute vec3 morphTarget5;','		attribute vec3 morphTarget6;','		attribute vec3 morphTarget7;','	#endif','#endif','#ifdef USE_SKINNING','	attribute vec4 skinIndex;','	attribute vec4 skinWeight;','#endif','\n'].filter(filterEmptyLine).join('\n');prefixFragment = [parameters.bumpMap || parameters.normalMap || parameters.flatShading || material.derivatives?'#extension GL_OES_standard_derivatives : enable':'',parameters.logarithmicDepthBuffer && renderer.extensions.get('EXT_frag_depth')?'#extension GL_EXT_frag_depth : enable':'','precision ' + parameters.precision + ' float;','precision ' + parameters.precision + ' int;','#define SHADER_NAME ' + material.__webglShader.name,customDefines,'#define MAX_DIR_LIGHTS ' + parameters.maxDirLights,'#define MAX_POINT_LIGHTS ' + parameters.maxPointLights,'#define MAX_SPOT_LIGHTS ' + parameters.maxSpotLights,'#define MAX_HEMI_LIGHTS ' + parameters.maxHemiLights,'#define MAX_SHADOWS ' + parameters.maxShadows,parameters.alphaTest?'#define ALPHATEST ' + parameters.alphaTest:'',renderer.gammaInput?'#define GAMMA_INPUT':'',renderer.gammaOutput?'#define GAMMA_OUTPUT':'','#define GAMMA_FACTOR ' + gammaFactorDefine,parameters.useFog && parameters.fog?'#define USE_FOG':'',parameters.useFog && parameters.fogExp?'#define FOG_EXP2':'',parameters.map?'#define USE_MAP':'',parameters.envMap?'#define USE_ENVMAP':'',parameters.envMap?'#define ' + envMapTypeDefine:'',parameters.envMap?'#define ' + envMapModeDefine:'',parameters.envMap?'#define ' + envMapBlendingDefine:'',parameters.lightMap?'#define USE_LIGHTMAP':'',parameters.aoMap?'#define USE_AOMAP':'',parameters.emissiveMap?'#define USE_EMISSIVEMAP':'',parameters.bumpMap?'#define USE_BUMPMAP':'',parameters.normalMap?'#define USE_NORMALMAP':'',parameters.specularMap?'#define USE_SPECULARMAP':'',parameters.alphaMap?'#define USE_ALPHAMAP':'',parameters.vertexColors?'#define USE_COLOR':'',parameters.flatShading?'#define FLAT_SHADED':'',parameters.metal?'#define METAL':'',parameters.doubleSided?'#define DOUBLE_SIDED':'',parameters.flipSided?'#define FLIP_SIDED':'',parameters.shadowMapEnabled?'#define USE_SHADOWMAP':'',parameters.shadowMapEnabled?'#define ' + shadowMapTypeDefine:'',parameters.shadowMapDebug?'#define SHADOWMAP_DEBUG':'',parameters.logarithmicDepthBuffer?'#define USE_LOGDEPTHBUF':'',parameters.logarithmicDepthBuffer && renderer.extensions.get('EXT_frag_depth')?'#define USE_LOGDEPTHBUF_EXT':'','uniform mat4 viewMatrix;','uniform vec3 cameraPosition;','\n'].filter(filterEmptyLine).join('\n');}var vertexGlsl=prefixVertex + vertexShader;var fragmentGlsl=prefixFragment + fragmentShader;var glVertexShader=THREE.WebGLShader(gl,gl.VERTEX_SHADER,vertexGlsl);var glFragmentShader=THREE.WebGLShader(gl,gl.FRAGMENT_SHADER,fragmentGlsl);gl.attachShader(program,glVertexShader);gl.attachShader(program,glFragmentShader); // Force a particular attribute to index 0.
	if(material.index0AttributeName !== undefined){gl.bindAttribLocation(program,0,material.index0AttributeName);}else if(parameters.morphTargets === true){ // programs with morphTargets displace position out of attribute 0
	gl.bindAttribLocation(program,0,'position');}gl.linkProgram(program);var programLog=gl.getProgramInfoLog(program);var vertexLog=gl.getShaderInfoLog(glVertexShader);var fragmentLog=gl.getShaderInfoLog(glFragmentShader);var runnable=true;var haveDiagnostics=true;if(gl.getProgramParameter(program,gl.LINK_STATUS) === false){runnable = false;console.error('THREE.WebGLProgram: shader error: ',gl.getError(),'gl.VALIDATE_STATUS',gl.getProgramParameter(program,gl.VALIDATE_STATUS),'gl.getProgramInfoLog',programLog,vertexLog,fragmentLog);}else if(programLog !== ''){console.warn('THREE.WebGLProgram: gl.getProgramInfoLog()',programLog);}else if(vertexLog === '' || fragmentLog === ''){haveDiagnostics = false;}if(haveDiagnostics){this.diagnostics = {runnable:runnable,material:material,programLog:programLog,vertexShader:{log:vertexLog,prefix:prefixVertex},fragmentShader:{log:fragmentLog,prefix:prefixFragment}};} // clean up
	gl.deleteShader(glVertexShader);gl.deleteShader(glFragmentShader); // set up caching for uniform locations
	var cachedUniforms;this.getUniforms = function(){if(cachedUniforms === undefined){cachedUniforms = fetchUniformLocations(gl,program);}return cachedUniforms;}; // set up caching for attribute locations
	var cachedAttributes;this.getAttributes = function(){if(cachedAttributes === undefined){cachedAttributes = fetchAttributeLocations(gl,program);}return cachedAttributes;}; // free resource
	this.destroy = function(){gl.deleteProgram(program);this.program = undefined;}; // DEPRECATED
	Object.defineProperties(this,{uniforms:{get:function get(){console.warn('THREE.WebGLProgram: .uniforms is now .getUniforms().');return this.getUniforms();}},attributes:{get:function get(){console.warn('THREE.WebGLProgram: .attributes is now .getAttributes().');return this.getAttributes();}}}); //
	this.id = programIdCount++;this.code = code;this.usedTimes = 1;this.program = program;this.vertexShader = glVertexShader;this.fragmentShader = glFragmentShader;return this;};})(); // File:src/renderers/webgl/WebGLPrograms.js
	THREE.WebGLPrograms = function(renderer,capabilities){var programs=[];var shaderIDs={MeshDepthMaterial:'depth',MeshNormalMaterial:'normal',MeshBasicMaterial:'basic',MeshLambertMaterial:'lambert',MeshPhongMaterial:'phong',LineBasicMaterial:'basic',LineDashedMaterial:'dashed',PointsMaterial:'points'};var parameterNames=["precision","supportsVertexTextures","map","envMap","envMapMode","lightMap","aoMap","emissiveMap","bumpMap","normalMap","specularMap","alphaMap","combine","vertexColors","fog","useFog","fogExp","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","maxMorphTargets","maxMorphNormals","maxDirLights","maxPointLights","maxSpotLights","maxHemiLights","maxShadows","shadowMapEnabled","shadowMapType","shadowMapDebug","alphaTest","metal","doubleSided","flipSided"];function allocateBones(object){if(capabilities.floatVertexTextures && object && object.skeleton && object.skeleton.useVertexTexture){return 1024;}else { // default for when object is not specified
	// ( for example when prebuilding shader to be used with multiple objects )
	//
	//  - leave some extra space for other uniforms
	//  - limit here is ANGLE's 254 max uniform vectors
	//    (up to 54 should be safe)
	var nVertexUniforms=capabilities.maxVertexUniforms;var nVertexMatrices=Math.floor((nVertexUniforms - 20) / 4);var maxBones=nVertexMatrices;if(object !== undefined && object instanceof THREE.SkinnedMesh){maxBones = Math.min(object.skeleton.bones.length,maxBones);if(maxBones < object.skeleton.bones.length){console.warn('WebGLRenderer: too many bones - ' + object.skeleton.bones.length + ', this GPU supports just ' + maxBones + ' (try OpenGL instead of ANGLE)');}}return maxBones;}}function allocateLights(lights){var dirLights=0;var pointLights=0;var spotLights=0;var hemiLights=0;for(var l=0,ll=lights.length;l < ll;l++) {var light=lights[l];if(light.onlyShadow || light.visible === false)continue;if(light instanceof THREE.DirectionalLight)dirLights++;if(light instanceof THREE.PointLight)pointLights++;if(light instanceof THREE.SpotLight)spotLights++;if(light instanceof THREE.HemisphereLight)hemiLights++;}return {'directional':dirLights,'point':pointLights,'spot':spotLights,'hemi':hemiLights};}function allocateShadows(lights){var maxShadows=0;for(var l=0,ll=lights.length;l < ll;l++) {var light=lights[l];if(!light.castShadow)continue;if(light instanceof THREE.SpotLight)maxShadows++;if(light instanceof THREE.DirectionalLight)maxShadows++;}return maxShadows;}this.getParameters = function(material,lights,fog,object){var shaderID=shaderIDs[material.type]; // heuristics to create shader parameters according to lights in the scene
	// (not to blow over maxLights budget)
	var maxLightCount=allocateLights(lights);var maxShadows=allocateShadows(lights);var maxBones=allocateBones(object);var precision=renderer.getPrecision();if(material.precision !== null){precision = capabilities.getMaxPrecision(material.precision);if(precision !== material.precision){console.warn('THREE.WebGLRenderer.initMaterial:',material.precision,'not supported, using',precision,'instead.');}}var parameters={shaderID:shaderID,precision:precision,supportsVertexTextures:capabilities.vertexTextures,map:!!material.map,envMap:!!material.envMap,envMapMode:material.envMap && material.envMap.mapping,lightMap:!!material.lightMap,aoMap:!!material.aoMap,emissiveMap:!!material.emissiveMap,bumpMap:!!material.bumpMap,normalMap:!!material.normalMap,displacementMap:!!material.displacementMap,specularMap:!!material.specularMap,alphaMap:!!material.alphaMap,combine:material.combine,vertexColors:material.vertexColors,fog:fog,useFog:material.fog,fogExp:fog instanceof THREE.FogExp2,flatShading:material.shading === THREE.FlatShading,sizeAttenuation:material.sizeAttenuation,logarithmicDepthBuffer:capabilities.logarithmicDepthBuffer,skinning:material.skinning,maxBones:maxBones,useVertexTexture:capabilities.floatVertexTextures && object && object.skeleton && object.skeleton.useVertexTexture,morphTargets:material.morphTargets,morphNormals:material.morphNormals,maxMorphTargets:renderer.maxMorphTargets,maxMorphNormals:renderer.maxMorphNormals,maxDirLights:maxLightCount.directional,maxPointLights:maxLightCount.point,maxSpotLights:maxLightCount.spot,maxHemiLights:maxLightCount.hemi,maxShadows:maxShadows,shadowMapEnabled:renderer.shadowMap.enabled && object.receiveShadow && maxShadows > 0,shadowMapType:renderer.shadowMap.type,shadowMapDebug:renderer.shadowMap.debug,alphaTest:material.alphaTest,metal:material.metal,doubleSided:material.side === THREE.DoubleSide,flipSided:material.side === THREE.BackSide};return parameters;};this.getProgramCode = function(material,parameters){var chunks=[];if(parameters.shaderID){chunks.push(parameters.shaderID);}else {chunks.push(material.fragmentShader);chunks.push(material.vertexShader);}if(material.defines !== undefined){for(var name in material.defines) {chunks.push(name);chunks.push(material.defines[name]);}}for(var i=0;i < parameterNames.length;i++) {var parameterName=parameterNames[i];chunks.push(parameterName);chunks.push(parameters[parameterName]);}return chunks.join();};this.acquireProgram = function(material,parameters,code){var program; // Check if code has been already compiled
	for(var p=0,pl=programs.length;p < pl;p++) {var programInfo=programs[p];if(programInfo.code === code){program = programInfo;++program.usedTimes;break;}}if(program === undefined){program = new THREE.WebGLProgram(renderer,code,material,parameters);programs.push(program);}return program;};this.releaseProgram = function(program){if(--program.usedTimes === 0){ // Remove from unordered set
	var i=programs.indexOf(program);programs[i] = programs[programs.length - 1];programs.pop(); // Free WebGL resources
	program.destroy();}}; // Exposed for resource monitoring & error feedback via renderer.info:
	this.programs = programs;}; // File:src/renderers/webgl/WebGLProperties.js
	/**
	* @author fordacious / fordacious.github.io
	*/THREE.WebGLProperties = function(){var properties={};this.get = function(object){var uuid=object.uuid;var map=properties[uuid];if(map === undefined){map = {};properties[uuid] = map;}return map;};this['delete'] = function(object){delete properties[object.uuid];};this.clear = function(){properties = {};};}; // File:src/renderers/webgl/WebGLShader.js
	THREE.WebGLShader = (function(){var addLineNumbers=function addLineNumbers(string){var lines=string.split('\n');for(var i=0;i < lines.length;i++) {lines[i] = i + 1 + ': ' + lines[i];}return lines.join('\n');};return function WebGLShader(gl,type,string){var shader=gl.createShader(type);gl.shaderSource(shader,string);gl.compileShader(shader);if(gl.getShaderParameter(shader,gl.COMPILE_STATUS) === false){console.error('THREE.WebGLShader: Shader couldn\'t compile.');}if(gl.getShaderInfoLog(shader) !== ''){console.warn('THREE.WebGLShader: gl.getShaderInfoLog()',type === gl.VERTEX_SHADER?'vertex':'fragment',gl.getShaderInfoLog(shader),addLineNumbers(string));} // --enable-privileged-webgl-extension
	// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );
	return shader;};})(); // File:src/renderers/webgl/WebGLShadowMap.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.WebGLShadowMap = function(_renderer,_lights,_objects){var _gl=_renderer.context,_state=_renderer.state,_frustum=new THREE.Frustum(),_projScreenMatrix=new THREE.Matrix4(),_min=new THREE.Vector3(),_max=new THREE.Vector3(),_matrixPosition=new THREE.Vector3(),_renderList=[]; // init
	var depthShader=THREE.ShaderLib["depthRGBA"];var depthUniforms=THREE.UniformsUtils.clone(depthShader.uniforms);var _depthMaterial=new THREE.ShaderMaterial({uniforms:depthUniforms,vertexShader:depthShader.vertexShader,fragmentShader:depthShader.fragmentShader});var _depthMaterialMorph=new THREE.ShaderMaterial({uniforms:depthUniforms,vertexShader:depthShader.vertexShader,fragmentShader:depthShader.fragmentShader,morphTargets:true});var _depthMaterialSkin=new THREE.ShaderMaterial({uniforms:depthUniforms,vertexShader:depthShader.vertexShader,fragmentShader:depthShader.fragmentShader,skinning:true});var _depthMaterialMorphSkin=new THREE.ShaderMaterial({uniforms:depthUniforms,vertexShader:depthShader.vertexShader,fragmentShader:depthShader.fragmentShader,morphTargets:true,skinning:true});_depthMaterial._shadowPass = true;_depthMaterialMorph._shadowPass = true;_depthMaterialSkin._shadowPass = true;_depthMaterialMorphSkin._shadowPass = true; //
	var scope=this;this.enabled = false;this.autoUpdate = true;this.needsUpdate = false;this.type = THREE.PCFShadowMap;this.cullFace = THREE.CullFaceFront;this.render = function(scene,camera){if(scope.enabled === false)return;if(scope.autoUpdate === false && scope.needsUpdate === false)return; // set GL state for depth map
	_gl.clearColor(1,1,1,1);_state.disable(_gl.BLEND);_state.enable(_gl.CULL_FACE);_gl.frontFace(_gl.CCW);if(scope.cullFace === THREE.CullFaceFront){_gl.cullFace(_gl.FRONT);}else {_gl.cullFace(_gl.BACK);}_state.setDepthTest(true); // render depth map
	for(var i=0,il=_lights.length;i < il;i++) {var light=_lights[i];if(!light.castShadow)continue;if(!light.shadowMap){var shadowFilter=THREE.LinearFilter;if(scope.type === THREE.PCFSoftShadowMap){shadowFilter = THREE.NearestFilter;}var pars={minFilter:shadowFilter,magFilter:shadowFilter,format:THREE.RGBAFormat};light.shadowMap = new THREE.WebGLRenderTarget(light.shadowMapWidth,light.shadowMapHeight,pars);light.shadowMapSize = new THREE.Vector2(light.shadowMapWidth,light.shadowMapHeight);light.shadowMatrix = new THREE.Matrix4();}if(!light.shadowCamera){if(light instanceof THREE.SpotLight){light.shadowCamera = new THREE.PerspectiveCamera(light.shadowCameraFov,light.shadowMapWidth / light.shadowMapHeight,light.shadowCameraNear,light.shadowCameraFar);}else if(light instanceof THREE.DirectionalLight){light.shadowCamera = new THREE.OrthographicCamera(light.shadowCameraLeft,light.shadowCameraRight,light.shadowCameraTop,light.shadowCameraBottom,light.shadowCameraNear,light.shadowCameraFar);}else {console.error("THREE.ShadowMapPlugin: Unsupported light type for shadow",light);continue;}scene.add(light.shadowCamera);if(scene.autoUpdate === true)scene.updateMatrixWorld();}if(light.shadowCameraVisible && !light.cameraHelper){light.cameraHelper = new THREE.CameraHelper(light.shadowCamera);scene.add(light.cameraHelper);}var shadowMap=light.shadowMap;var shadowMatrix=light.shadowMatrix;var shadowCamera=light.shadowCamera; //
	shadowCamera.position.setFromMatrixPosition(light.matrixWorld);_matrixPosition.setFromMatrixPosition(light.target.matrixWorld);shadowCamera.lookAt(_matrixPosition);shadowCamera.updateMatrixWorld();shadowCamera.matrixWorldInverse.getInverse(shadowCamera.matrixWorld); //
	if(light.cameraHelper)light.cameraHelper.visible = light.shadowCameraVisible;if(light.shadowCameraVisible)light.cameraHelper.update(); // compute shadow matrix
	shadowMatrix.set(0.5,0.0,0.0,0.5,0.0,0.5,0.0,0.5,0.0,0.0,0.5,0.5,0.0,0.0,0.0,1.0);shadowMatrix.multiply(shadowCamera.projectionMatrix);shadowMatrix.multiply(shadowCamera.matrixWorldInverse); // update camera matrices and frustum
	_projScreenMatrix.multiplyMatrices(shadowCamera.projectionMatrix,shadowCamera.matrixWorldInverse);_frustum.setFromMatrix(_projScreenMatrix); // render shadow map
	_renderer.setRenderTarget(shadowMap);_renderer.clear(); // set object matrices & frustum culling
	_renderList.length = 0;projectObject(scene,shadowCamera); // render regular objects
	for(var j=0,jl=_renderList.length;j < jl;j++) {var object=_renderList[j];var geometry=_objects.update(object);var material=object.material;if(material instanceof THREE.MeshFaceMaterial){var groups=geometry.groups;var materials=material.materials;for(var k=0,kl=groups.length;k < kl;k++) {var group=groups[k];var groupMaterial=materials[group.materialIndex];if(groupMaterial.visible === true){_renderer.renderBufferDirect(shadowCamera,_lights,null,geometry,getDepthMaterial(object,groupMaterial),object,group);}}}else {_renderer.renderBufferDirect(shadowCamera,_lights,null,geometry,getDepthMaterial(object,material),object);}}} // restore GL state
	var clearColor=_renderer.getClearColor(),clearAlpha=_renderer.getClearAlpha();_renderer.setClearColor(clearColor,clearAlpha);_state.enable(_gl.BLEND);if(scope.cullFace === THREE.CullFaceFront){_gl.cullFace(_gl.BACK);}_renderer.resetGLState();scope.needsUpdate = false;};function getDepthMaterial(object,material){var geometry=object.geometry;var useMorphing=geometry.morphTargets !== undefined && geometry.morphTargets.length > 0 && material.morphTargets;var useSkinning=object instanceof THREE.SkinnedMesh && material.skinning;var depthMaterial;if(object.customDepthMaterial){depthMaterial = object.customDepthMaterial;}else if(useSkinning){depthMaterial = useMorphing?_depthMaterialMorphSkin:_depthMaterialSkin;}else if(useMorphing){depthMaterial = _depthMaterialMorph;}else {depthMaterial = _depthMaterial;}depthMaterial.visible = material.visible;depthMaterial.wireframe = material.wireframe;depthMaterial.wireframeLinewidth = material.wireframeLinewidth;return depthMaterial;}function projectObject(object,camera){if(object.visible === false)return;if(object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points){if(object.castShadow && (object.frustumCulled === false || _frustum.intersectsObject(object) === true)){var material=object.material;if(material.visible === true){object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse,object.matrixWorld);_renderList.push(object);}}}var children=object.children;for(var i=0,l=children.length;i < l;i++) {projectObject(children[i],camera);}}}; // File:src/renderers/webgl/WebGLState.js
	/**
	* @author mrdoob / http://mrdoob.com/
	*/THREE.WebGLState = function(gl,extensions,paramThreeToGL){var _this=this;var newAttributes=new Uint8Array(16);var enabledAttributes=new Uint8Array(16);var capabilities={};var compressedTextureFormats=null;var currentBlending=null;var currentBlendEquation=null;var currentBlendSrc=null;var currentBlendDst=null;var currentBlendEquationAlpha=null;var currentBlendSrcAlpha=null;var currentBlendDstAlpha=null;var currentDepthFunc=null;var currentDepthWrite=null;var currentColorWrite=null;var currentFlipSided=null;var currentLineWidth=null;var currentPolygonOffsetFactor=null;var currentPolygonOffsetUnits=null;var maxTextures=gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);var currentTextureSlot=undefined;var currentBoundTextures={};this.init = function(){gl.clearColor(0,0,0,1);gl.clearDepth(1);gl.clearStencil(0);this.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.frontFace(gl.CCW);gl.cullFace(gl.BACK);this.enable(gl.CULL_FACE);this.enable(gl.BLEND);gl.blendEquation(gl.FUNC_ADD);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);};this.initAttributes = function(){for(var i=0,l=newAttributes.length;i < l;i++) {newAttributes[i] = 0;}};this.enableAttribute = function(attribute){newAttributes[attribute] = 1;if(enabledAttributes[attribute] === 0){gl.enableVertexAttribArray(attribute);enabledAttributes[attribute] = 1;}};this.disableUnusedAttributes = function(){for(var i=0,l=enabledAttributes.length;i < l;i++) {if(enabledAttributes[i] !== newAttributes[i]){gl.disableVertexAttribArray(i);enabledAttributes[i] = 0;}}};this.enable = function(id){if(capabilities[id] !== true){gl.enable(id);capabilities[id] = true;}};this.disable = function(id){if(capabilities[id] !== false){gl.disable(id);capabilities[id] = false;}};this.getCompressedTextureFormats = function(){if(compressedTextureFormats === null){compressedTextureFormats = [];if(extensions.get('WEBGL_compressed_texture_pvrtc') || extensions.get('WEBGL_compressed_texture_s3tc')){var formats=gl.getParameter(gl.COMPRESSED_TEXTURE_FORMATS);for(var i=0;i < formats.length;i++) {compressedTextureFormats.push(formats[i]);}}}return compressedTextureFormats;};this.setBlending = function(blending,blendEquation,blendSrc,blendDst,blendEquationAlpha,blendSrcAlpha,blendDstAlpha){if(blending !== currentBlending){if(blending === THREE.NoBlending){this.disable(gl.BLEND);}else if(blending === THREE.AdditiveBlending){this.enable(gl.BLEND);gl.blendEquation(gl.FUNC_ADD);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);}else if(blending === THREE.SubtractiveBlending){ // TODO: Find blendFuncSeparate() combination
	this.enable(gl.BLEND);gl.blendEquation(gl.FUNC_ADD);gl.blendFunc(gl.ZERO,gl.ONE_MINUS_SRC_COLOR);}else if(blending === THREE.MultiplyBlending){ // TODO: Find blendFuncSeparate() combination
	this.enable(gl.BLEND);gl.blendEquation(gl.FUNC_ADD);gl.blendFunc(gl.ZERO,gl.SRC_COLOR);}else if(blending === THREE.CustomBlending){this.enable(gl.BLEND);}else {this.enable(gl.BLEND);gl.blendEquationSeparate(gl.FUNC_ADD,gl.FUNC_ADD);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);}currentBlending = blending;}if(blending === THREE.CustomBlending){blendEquationAlpha = blendEquationAlpha || blendEquation;blendSrcAlpha = blendSrcAlpha || blendSrc;blendDstAlpha = blendDstAlpha || blendDst;if(blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha){gl.blendEquationSeparate(paramThreeToGL(blendEquation),paramThreeToGL(blendEquationAlpha));currentBlendEquation = blendEquation;currentBlendEquationAlpha = blendEquationAlpha;}if(blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha){gl.blendFuncSeparate(paramThreeToGL(blendSrc),paramThreeToGL(blendDst),paramThreeToGL(blendSrcAlpha),paramThreeToGL(blendDstAlpha));currentBlendSrc = blendSrc;currentBlendDst = blendDst;currentBlendSrcAlpha = blendSrcAlpha;currentBlendDstAlpha = blendDstAlpha;}}else {currentBlendEquation = null;currentBlendSrc = null;currentBlendDst = null;currentBlendEquationAlpha = null;currentBlendSrcAlpha = null;currentBlendDstAlpha = null;}};this.setDepthFunc = function(depthFunc){if(currentDepthFunc !== depthFunc){if(depthFunc){switch(depthFunc){case THREE.NeverDepth:gl.depthFunc(gl.NEVER);break;case THREE.AlwaysDepth:gl.depthFunc(gl.ALWAYS);break;case THREE.LessDepth:gl.depthFunc(gl.LESS);break;case THREE.LessEqualDepth:gl.depthFunc(gl.LEQUAL);break;case THREE.EqualDepth:gl.depthFunc(gl.EQUAL);break;case THREE.GreaterEqualDepth:gl.depthFunc(gl.GEQUAL);break;case THREE.GreaterDepth:gl.depthFunc(gl.GREATER);break;case THREE.NotEqualDepth:gl.depthFunc(gl.NOTEQUAL);break;default:gl.depthFunc(gl.LEQUAL);}}else {gl.depthFunc(gl.LEQUAL);}currentDepthFunc = depthFunc;}};this.setDepthTest = function(depthTest){if(depthTest){this.enable(gl.DEPTH_TEST);}else {this.disable(gl.DEPTH_TEST);}};this.setDepthWrite = function(depthWrite){if(currentDepthWrite !== depthWrite){gl.depthMask(depthWrite);currentDepthWrite = depthWrite;}};this.setColorWrite = function(colorWrite){if(currentColorWrite !== colorWrite){gl.colorMask(colorWrite,colorWrite,colorWrite,colorWrite);currentColorWrite = colorWrite;}};this.setFlipSided = function(flipSided){if(currentFlipSided !== flipSided){if(flipSided){gl.frontFace(gl.CW);}else {gl.frontFace(gl.CCW);}currentFlipSided = flipSided;}};this.setLineWidth = function(width){if(width !== currentLineWidth){gl.lineWidth(width);currentLineWidth = width;}};this.setPolygonOffset = function(polygonOffset,factor,units){if(polygonOffset){this.enable(gl.POLYGON_OFFSET_FILL);}else {this.disable(gl.POLYGON_OFFSET_FILL);}if(polygonOffset && (currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units)){gl.polygonOffset(factor,units);currentPolygonOffsetFactor = factor;currentPolygonOffsetUnits = units;}};this.setScissorTest = function(scissorTest){if(scissorTest){this.enable(gl.SCISSOR_TEST);}else {this.disable(gl.SCISSOR_TEST);}}; // texture
	this.activeTexture = function(webglSlot){if(webglSlot === undefined)webglSlot = gl.TEXTURE0 + maxTextures - 1;if(currentTextureSlot !== webglSlot){gl.activeTexture(webglSlot);currentTextureSlot = webglSlot;}};this.bindTexture = function(webglType,webglTexture){if(currentTextureSlot === undefined){_this.activeTexture();}var boundTexture=currentBoundTextures[currentTextureSlot];if(boundTexture === undefined){boundTexture = {type:undefined,texture:undefined};currentBoundTextures[currentTextureSlot] = boundTexture;}if(boundTexture.type !== webglType || boundTexture.texture !== webglTexture){gl.bindTexture(webglType,webglTexture);boundTexture.type = webglType;boundTexture.texture = webglTexture;}};this.compressedTexImage2D = function(){try{gl.compressedTexImage2D.apply(gl,arguments);}catch(error) {console.error(error);}};this.texImage2D = function(){try{gl.texImage2D.apply(gl,arguments);}catch(error) {console.error(error);}}; //
	this.reset = function(){for(var i=0;i < enabledAttributes.length;i++) {if(enabledAttributes[i] === 1){gl.disableVertexAttribArray(i);enabledAttributes[i] = 0;}}capabilities = {};compressedTextureFormats = null;currentBlending = null;currentDepthWrite = null;currentColorWrite = null;currentFlipSided = null;};}; // File:src/renderers/webgl/plugins/LensFlarePlugin.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.LensFlarePlugin = function(renderer,flares){var gl=renderer.context;var state=renderer.state;var vertexBuffer,elementBuffer;var program,attributes,uniforms;var hasVertexTexture;var tempTexture,occlusionTexture;var init=function init(){var vertices=new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,1,0,1]);var faces=new Uint16Array([0,1,2,0,2,3]); // buffers
	vertexBuffer = gl.createBuffer();elementBuffer = gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,elementBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,faces,gl.STATIC_DRAW); // textures
	tempTexture = gl.createTexture();occlusionTexture = gl.createTexture();state.bindTexture(gl.TEXTURE_2D,tempTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,16,16,0,gl.RGB,gl.UNSIGNED_BYTE,null);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);state.bindTexture(gl.TEXTURE_2D,occlusionTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,null);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);hasVertexTexture = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;var shader;if(hasVertexTexture){shader = {vertexShader:["uniform lowp int renderType;","uniform vec3 screenPosition;","uniform vec2 scale;","uniform float rotation;","uniform sampler2D occlusionMap;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","varying float vVisibility;","void main() {","vUV = uv;","vec2 pos = position;","if( renderType == 2 ) {","vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );","vVisibility =        visibility.r / 9.0;","vVisibility *= 1.0 - visibility.g / 9.0;","vVisibility *=       visibility.b / 9.0;","vVisibility *= 1.0 - visibility.a / 9.0;","pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;","pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;","}","gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );","}"].join("\n"),fragmentShader:["uniform lowp int renderType;","uniform sampler2D map;","uniform float opacity;","uniform vec3 color;","varying vec2 vUV;","varying float vVisibility;","void main() {", // pink square
	"if( renderType == 0 ) {","gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", // restore
	"} else if( renderType == 1 ) {","gl_FragColor = texture2D( map, vUV );", // flare
	"} else {","vec4 texture = texture2D( map, vUV );","texture.a *= opacity * vVisibility;","gl_FragColor = texture;","gl_FragColor.rgb *= color;","}","}"].join("\n")};}else {shader = {vertexShader:["uniform lowp int renderType;","uniform vec3 screenPosition;","uniform vec2 scale;","uniform float rotation;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","void main() {","vUV = uv;","vec2 pos = position;","if( renderType == 2 ) {","pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;","pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;","}","gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );","}"].join("\n"),fragmentShader:["precision mediump float;","uniform lowp int renderType;","uniform sampler2D map;","uniform sampler2D occlusionMap;","uniform float opacity;","uniform vec3 color;","varying vec2 vUV;","void main() {", // pink square
	"if( renderType == 0 ) {","gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );", // restore
	"} else if( renderType == 1 ) {","gl_FragColor = texture2D( map, vUV );", // flare
	"} else {","float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;","visibility = ( 1.0 - visibility / 4.0 );","vec4 texture = texture2D( map, vUV );","texture.a *= opacity * visibility;","gl_FragColor = texture;","gl_FragColor.rgb *= color;","}","}"].join("\n")};}program = createProgram(shader);attributes = {vertex:gl.getAttribLocation(program,"position"),uv:gl.getAttribLocation(program,"uv")};uniforms = {renderType:gl.getUniformLocation(program,"renderType"),map:gl.getUniformLocation(program,"map"),occlusionMap:gl.getUniformLocation(program,"occlusionMap"),opacity:gl.getUniformLocation(program,"opacity"),color:gl.getUniformLocation(program,"color"),scale:gl.getUniformLocation(program,"scale"),rotation:gl.getUniformLocation(program,"rotation"),screenPosition:gl.getUniformLocation(program,"screenPosition")};}; /*
		 * Render lens flares
		 * Method: renders 16x16 0xff00ff-colored points scattered over the light source area,
		 *         reads these back and calculates occlusion.
		 */this.render = function(scene,camera,viewportWidth,viewportHeight){if(flares.length === 0)return;var tempPosition=new THREE.Vector3();var invAspect=viewportHeight / viewportWidth,halfViewportWidth=viewportWidth * 0.5,halfViewportHeight=viewportHeight * 0.5;var size=16 / viewportHeight,scale=new THREE.Vector2(size * invAspect,size);var screenPosition=new THREE.Vector3(1,1,0),screenPositionPixels=new THREE.Vector2(1,1);if(program === undefined){init();}gl.useProgram(program);state.initAttributes();state.enableAttribute(attributes.vertex);state.enableAttribute(attributes.uv);state.disableUnusedAttributes(); // loop through all lens flares to update their occlusion and positions
	// setup gl and common used attribs/uniforms
	gl.uniform1i(uniforms.occlusionMap,0);gl.uniform1i(uniforms.map,1);gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);gl.vertexAttribPointer(attributes.vertex,2,gl.FLOAT,false,2 * 8,0);gl.vertexAttribPointer(attributes.uv,2,gl.FLOAT,false,2 * 8,8);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,elementBuffer);state.disable(gl.CULL_FACE);gl.depthMask(false);for(var i=0,l=flares.length;i < l;i++) {size = 16 / viewportHeight;scale.set(size * invAspect,size); // calc object screen position
	var flare=flares[i];tempPosition.set(flare.matrixWorld.elements[12],flare.matrixWorld.elements[13],flare.matrixWorld.elements[14]);tempPosition.applyMatrix4(camera.matrixWorldInverse);tempPosition.applyProjection(camera.projectionMatrix); // setup arrays for gl programs
	screenPosition.copy(tempPosition);screenPositionPixels.x = screenPosition.x * halfViewportWidth + halfViewportWidth;screenPositionPixels.y = screenPosition.y * halfViewportHeight + halfViewportHeight; // screen cull
	if(hasVertexTexture || screenPositionPixels.x > 0 && screenPositionPixels.x < viewportWidth && screenPositionPixels.y > 0 && screenPositionPixels.y < viewportHeight){ // save current RGB to temp texture
	state.activeTexture(gl.TEXTURE0);state.bindTexture(gl.TEXTURE_2D,null);state.activeTexture(gl.TEXTURE1);state.bindTexture(gl.TEXTURE_2D,tempTexture);gl.copyTexImage2D(gl.TEXTURE_2D,0,gl.RGB,screenPositionPixels.x - 8,screenPositionPixels.y - 8,16,16,0); // render pink quad
	gl.uniform1i(uniforms.renderType,0);gl.uniform2f(uniforms.scale,scale.x,scale.y);gl.uniform3f(uniforms.screenPosition,screenPosition.x,screenPosition.y,screenPosition.z);state.disable(gl.BLEND);state.enable(gl.DEPTH_TEST);gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0); // copy result to occlusionMap
	state.activeTexture(gl.TEXTURE0);state.bindTexture(gl.TEXTURE_2D,occlusionTexture);gl.copyTexImage2D(gl.TEXTURE_2D,0,gl.RGBA,screenPositionPixels.x - 8,screenPositionPixels.y - 8,16,16,0); // restore graphics
	gl.uniform1i(uniforms.renderType,1);state.disable(gl.DEPTH_TEST);state.activeTexture(gl.TEXTURE1);state.bindTexture(gl.TEXTURE_2D,tempTexture);gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0); // update object positions
	flare.positionScreen.copy(screenPosition);if(flare.customUpdateCallback){flare.customUpdateCallback(flare);}else {flare.updateLensFlares();} // render flares
	gl.uniform1i(uniforms.renderType,2);state.enable(gl.BLEND);for(var j=0,jl=flare.lensFlares.length;j < jl;j++) {var sprite=flare.lensFlares[j];if(sprite.opacity > 0.001 && sprite.scale > 0.001){screenPosition.x = sprite.x;screenPosition.y = sprite.y;screenPosition.z = sprite.z;size = sprite.size * sprite.scale / viewportHeight;scale.x = size * invAspect;scale.y = size;gl.uniform3f(uniforms.screenPosition,screenPosition.x,screenPosition.y,screenPosition.z);gl.uniform2f(uniforms.scale,scale.x,scale.y);gl.uniform1f(uniforms.rotation,sprite.rotation);gl.uniform1f(uniforms.opacity,sprite.opacity);gl.uniform3f(uniforms.color,sprite.color.r,sprite.color.g,sprite.color.b);state.setBlending(sprite.blending,sprite.blendEquation,sprite.blendSrc,sprite.blendDst);renderer.setTexture(sprite.texture,1);gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);}}}} // restore gl
	state.enable(gl.CULL_FACE);state.enable(gl.DEPTH_TEST);gl.depthMask(true);renderer.resetGLState();};function createProgram(shader){var program=gl.createProgram();var fragmentShader=gl.createShader(gl.FRAGMENT_SHADER);var vertexShader=gl.createShader(gl.VERTEX_SHADER);var prefix="precision " + renderer.getPrecision() + " float;\n";gl.shaderSource(fragmentShader,prefix + shader.fragmentShader);gl.shaderSource(vertexShader,prefix + shader.vertexShader);gl.compileShader(fragmentShader);gl.compileShader(vertexShader);gl.attachShader(program,fragmentShader);gl.attachShader(program,vertexShader);gl.linkProgram(program);return program;}}; // File:src/renderers/webgl/plugins/SpritePlugin.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.SpritePlugin = function(renderer,sprites){var gl=renderer.context;var state=renderer.state;var vertexBuffer,elementBuffer;var program,attributes,uniforms;var texture; // decompose matrixWorld
	var spritePosition=new THREE.Vector3();var spriteRotation=new THREE.Quaternion();var spriteScale=new THREE.Vector3();var init=function init(){var vertices=new Float32Array([-0.5,-0.5,0,0,0.5,-0.5,1,0,0.5,0.5,1,1,-0.5,0.5,0,1]);var faces=new Uint16Array([0,1,2,0,2,3]);vertexBuffer = gl.createBuffer();elementBuffer = gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,elementBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,faces,gl.STATIC_DRAW);program = createProgram();attributes = {position:gl.getAttribLocation(program,'position'),uv:gl.getAttribLocation(program,'uv')};uniforms = {uvOffset:gl.getUniformLocation(program,'uvOffset'),uvScale:gl.getUniformLocation(program,'uvScale'),rotation:gl.getUniformLocation(program,'rotation'),scale:gl.getUniformLocation(program,'scale'),color:gl.getUniformLocation(program,'color'),map:gl.getUniformLocation(program,'map'),opacity:gl.getUniformLocation(program,'opacity'),modelViewMatrix:gl.getUniformLocation(program,'modelViewMatrix'),projectionMatrix:gl.getUniformLocation(program,'projectionMatrix'),fogType:gl.getUniformLocation(program,'fogType'),fogDensity:gl.getUniformLocation(program,'fogDensity'),fogNear:gl.getUniformLocation(program,'fogNear'),fogFar:gl.getUniformLocation(program,'fogFar'),fogColor:gl.getUniformLocation(program,'fogColor'),alphaTest:gl.getUniformLocation(program,'alphaTest')};var canvas=document.createElement('canvas');canvas.width = 8;canvas.height = 8;var context=canvas.getContext('2d');context.fillStyle = 'white';context.fillRect(0,0,8,8);texture = new THREE.Texture(canvas);texture.needsUpdate = true;};this.render = function(scene,camera){if(sprites.length === 0)return; // setup gl
	if(program === undefined){init();}gl.useProgram(program);state.initAttributes();state.enableAttribute(attributes.position);state.enableAttribute(attributes.uv);state.disableUnusedAttributes();state.disable(gl.CULL_FACE);state.enable(gl.BLEND);gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);gl.vertexAttribPointer(attributes.position,2,gl.FLOAT,false,2 * 8,0);gl.vertexAttribPointer(attributes.uv,2,gl.FLOAT,false,2 * 8,8);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,elementBuffer);gl.uniformMatrix4fv(uniforms.projectionMatrix,false,camera.projectionMatrix.elements);state.activeTexture(gl.TEXTURE0);gl.uniform1i(uniforms.map,0);var oldFogType=0;var sceneFogType=0;var fog=scene.fog;if(fog){gl.uniform3f(uniforms.fogColor,fog.color.r,fog.color.g,fog.color.b);if(fog instanceof THREE.Fog){gl.uniform1f(uniforms.fogNear,fog.near);gl.uniform1f(uniforms.fogFar,fog.far);gl.uniform1i(uniforms.fogType,1);oldFogType = 1;sceneFogType = 1;}else if(fog instanceof THREE.FogExp2){gl.uniform1f(uniforms.fogDensity,fog.density);gl.uniform1i(uniforms.fogType,2);oldFogType = 2;sceneFogType = 2;}}else {gl.uniform1i(uniforms.fogType,0);oldFogType = 0;sceneFogType = 0;} // update positions and sort
	for(var i=0,l=sprites.length;i < l;i++) {var sprite=sprites[i];sprite.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse,sprite.matrixWorld);sprite.z = -sprite.modelViewMatrix.elements[14];}sprites.sort(painterSortStable); // render all sprites
	var scale=[];for(var i=0,l=sprites.length;i < l;i++) {var sprite=sprites[i];var material=sprite.material;gl.uniform1f(uniforms.alphaTest,material.alphaTest);gl.uniformMatrix4fv(uniforms.modelViewMatrix,false,sprite.modelViewMatrix.elements);sprite.matrixWorld.decompose(spritePosition,spriteRotation,spriteScale);scale[0] = spriteScale.x;scale[1] = spriteScale.y;var fogType=0;if(scene.fog && material.fog){fogType = sceneFogType;}if(oldFogType !== fogType){gl.uniform1i(uniforms.fogType,fogType);oldFogType = fogType;}if(material.map !== null){gl.uniform2f(uniforms.uvOffset,material.map.offset.x,material.map.offset.y);gl.uniform2f(uniforms.uvScale,material.map.repeat.x,material.map.repeat.y);}else {gl.uniform2f(uniforms.uvOffset,0,0);gl.uniform2f(uniforms.uvScale,1,1);}gl.uniform1f(uniforms.opacity,material.opacity);gl.uniform3f(uniforms.color,material.color.r,material.color.g,material.color.b);gl.uniform1f(uniforms.rotation,material.rotation);gl.uniform2fv(uniforms.scale,scale);state.setBlending(material.blending,material.blendEquation,material.blendSrc,material.blendDst);state.setDepthTest(material.depthTest);state.setDepthWrite(material.depthWrite);if(material.map && material.map.image && material.map.image.width){renderer.setTexture(material.map,0);}else {renderer.setTexture(texture,0);}gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);} // restore gl
	state.enable(gl.CULL_FACE);renderer.resetGLState();};function createProgram(){var program=gl.createProgram();var vertexShader=gl.createShader(gl.VERTEX_SHADER);var fragmentShader=gl.createShader(gl.FRAGMENT_SHADER);gl.shaderSource(vertexShader,['precision ' + renderer.getPrecision() + ' float;','uniform mat4 modelViewMatrix;','uniform mat4 projectionMatrix;','uniform float rotation;','uniform vec2 scale;','uniform vec2 uvOffset;','uniform vec2 uvScale;','attribute vec2 position;','attribute vec2 uv;','varying vec2 vUV;','void main() {','vUV = uvOffset + uv * uvScale;','vec2 alignedPosition = position * scale;','vec2 rotatedPosition;','rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;','rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;','vec4 finalPosition;','finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );','finalPosition.xy += rotatedPosition;','finalPosition = projectionMatrix * finalPosition;','gl_Position = finalPosition;','}'].join('\n'));gl.shaderSource(fragmentShader,['precision ' + renderer.getPrecision() + ' float;','uniform vec3 color;','uniform sampler2D map;','uniform float opacity;','uniform int fogType;','uniform vec3 fogColor;','uniform float fogDensity;','uniform float fogNear;','uniform float fogFar;','uniform float alphaTest;','varying vec2 vUV;','void main() {','vec4 texture = texture2D( map, vUV );','if ( texture.a < alphaTest ) discard;','gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );','if ( fogType > 0 ) {','float depth = gl_FragCoord.z / gl_FragCoord.w;','float fogFactor = 0.0;','if ( fogType == 1 ) {','fogFactor = smoothstep( fogNear, fogFar, depth );','} else {','const float LOG2 = 1.442695;','fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );','fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );','}','gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );','}','}'].join('\n'));gl.compileShader(vertexShader);gl.compileShader(fragmentShader);gl.attachShader(program,vertexShader);gl.attachShader(program,fragmentShader);gl.linkProgram(program);return program;}function painterSortStable(a,b){if(a.z !== b.z){return b.z - a.z;}else {return b.id - a.id;}}}; // File:src/extras/GeometryUtils.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.GeometryUtils = {merge:function merge(geometry1,geometry2,materialIndexOffset){console.warn('THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.');var matrix;if(geometry2 instanceof THREE.Mesh){geometry2.matrixAutoUpdate && geometry2.updateMatrix();matrix = geometry2.matrix;geometry2 = geometry2.geometry;}geometry1.merge(geometry2,matrix,materialIndexOffset);},center:function center(geometry){console.warn('THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.');return geometry.center();}}; // File:src/extras/ImageUtils.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 * @author Daosheng Mu / https://github.com/DaoshengMu/
	 */THREE.ImageUtils = {crossOrigin:undefined,loadTexture:function loadTexture(url,mapping,onLoad,onError){var loader=new THREE.ImageLoader();loader.crossOrigin = this.crossOrigin;var texture=new THREE.Texture(undefined,mapping);loader.load(url,function(image){texture.image = image;texture.needsUpdate = true;if(onLoad)onLoad(texture);},undefined,function(event){if(onError)onError(event);});texture.sourceFile = url;return texture;},loadTextureCube:function loadTextureCube(array,mapping,onLoad,onError){var images=[];var loader=new THREE.ImageLoader();loader.crossOrigin = this.crossOrigin;var texture=new THREE.CubeTexture(images,mapping);var loaded=0;var loadTexture=function loadTexture(i){loader.load(array[i],function(image){texture.images[i] = image;loaded += 1;if(loaded === 6){texture.needsUpdate = true;if(onLoad)onLoad(texture);}},undefined,onError);};for(var i=0,il=array.length;i < il;++i) {loadTexture(i);}return texture;},loadCompressedTexture:function loadCompressedTexture(){console.error('THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.');},loadCompressedTextureCube:function loadCompressedTextureCube(){console.error('THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.');},getNormalMap:function getNormalMap(image,depth){ // Adapted from http://www.paulbrunt.co.uk/lab/heightnormal/
	var cross=function cross(a,b){return [a[1] * b[2] - a[2] * b[1],a[2] * b[0] - a[0] * b[2],a[0] * b[1] - a[1] * b[0]];};var subtract=function subtract(a,b){return [a[0] - b[0],a[1] - b[1],a[2] - b[2]];};var normalize=function normalize(a){var l=Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);return [a[0] / l,a[1] / l,a[2] / l];};depth = depth | 1;var width=image.width;var height=image.height;var canvas=document.createElement('canvas');canvas.width = width;canvas.height = height;var context=canvas.getContext('2d');context.drawImage(image,0,0);var data=context.getImageData(0,0,width,height).data;var imageData=context.createImageData(width,height);var output=imageData.data;for(var x=0;x < width;x++) {for(var y=0;y < height;y++) {var ly=y - 1 < 0?0:y - 1;var uy=y + 1 > height - 1?height - 1:y + 1;var lx=x - 1 < 0?0:x - 1;var ux=x + 1 > width - 1?width - 1:x + 1;var points=[];var origin=[0,0,data[(y * width + x) * 4] / 255 * depth];points.push([-1,0,data[(y * width + lx) * 4] / 255 * depth]);points.push([-1,-1,data[(ly * width + lx) * 4] / 255 * depth]);points.push([0,-1,data[(ly * width + x) * 4] / 255 * depth]);points.push([1,-1,data[(ly * width + ux) * 4] / 255 * depth]);points.push([1,0,data[(y * width + ux) * 4] / 255 * depth]);points.push([1,1,data[(uy * width + ux) * 4] / 255 * depth]);points.push([0,1,data[(uy * width + x) * 4] / 255 * depth]);points.push([-1,1,data[(uy * width + lx) * 4] / 255 * depth]);var normals=[];var num_points=points.length;for(var i=0;i < num_points;i++) {var v1=points[i];var v2=points[(i + 1) % num_points];v1 = subtract(v1,origin);v2 = subtract(v2,origin);normals.push(normalize(cross(v1,v2)));}var normal=[0,0,0];for(var i=0;i < normals.length;i++) {normal[0] += normals[i][0];normal[1] += normals[i][1];normal[2] += normals[i][2];}normal[0] /= normals.length;normal[1] /= normals.length;normal[2] /= normals.length;var idx=(y * width + x) * 4;output[idx] = (normal[0] + 1.0) / 2.0 * 255 | 0;output[idx + 1] = (normal[1] + 1.0) / 2.0 * 255 | 0;output[idx + 2] = normal[2] * 255 | 0;output[idx + 3] = 255;}}context.putImageData(imageData,0,0);return canvas;},generateDataTexture:function generateDataTexture(width,height,color){var size=width * height;var data=new Uint8Array(3 * size);var r=Math.floor(color.r * 255);var g=Math.floor(color.g * 255);var b=Math.floor(color.b * 255);for(var i=0;i < size;i++) {data[i * 3] = r;data[i * 3 + 1] = g;data[i * 3 + 2] = b;}var texture=new THREE.DataTexture(data,width,height,THREE.RGBFormat);texture.needsUpdate = true;return texture;}}; // File:src/extras/SceneUtils.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.SceneUtils = {createMultiMaterialObject:function createMultiMaterialObject(geometry,materials){var group=new THREE.Group();for(var i=0,l=materials.length;i < l;i++) {group.add(new THREE.Mesh(geometry,materials[i]));}return group;},detach:function detach(child,parent,scene){child.applyMatrix(parent.matrixWorld);parent.remove(child);scene.add(child);},attach:function attach(child,scene,parent){var matrixWorldInverse=new THREE.Matrix4();matrixWorldInverse.getInverse(parent.matrixWorld);child.applyMatrix(matrixWorldInverse);scene.remove(child);parent.add(child);}}; // File:src/extras/FontUtils.js
	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * For Text operations in three.js (See TextGeometry)
	 *
	 * It uses techniques used in:
	 *
	 *	Triangulation ported from AS3
	 *		Simple Polygon Triangulation
	 *		http://actionsnippet.com/?p=1462
	 *
	 * 	A Method to triangulate shapes with holes
	 *		http://www.sakri.net/blog/2009/06/12/an-approach-to-triangulating-polygons-with-holes/
	 *
	 */THREE.FontUtils = {faces:{}, // Just for now. face[weight][style]
	face:'helvetiker',weight:'normal',style:'normal',size:150,divisions:10,getFace:function getFace(){try{return this.faces[this.face.toLowerCase()][this.weight][this.style];}catch(e) {throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing.";}},loadFace:function loadFace(data){var family=data.familyName.toLowerCase();var ThreeFont=this;ThreeFont.faces[family] = ThreeFont.faces[family] || {};ThreeFont.faces[family][data.cssFontWeight] = ThreeFont.faces[family][data.cssFontWeight] || {};ThreeFont.faces[family][data.cssFontWeight][data.cssFontStyle] = data;ThreeFont.faces[family][data.cssFontWeight][data.cssFontStyle] = data;return data;},drawText:function drawText(text){ // RenderText
	var i,face=this.getFace(),scale=this.size / face.resolution,offset=0,chars=String(text).split(''),length=chars.length;var fontPaths=[];for(i = 0;i < length;i++) {var path=new THREE.Path();var ret=this.extractGlyphPoints(chars[i],face,scale,offset,path);offset += ret.offset;fontPaths.push(ret.path);} // get the width
	var width=offset / 2; //
	// for ( p = 0; p < allPts.length; p++ ) {
	//
	// 	allPts[ p ].x -= width;
	//
	// }
	//var extract = this.extractPoints( allPts, characterPts );
	//extract.contour = allPts;
	//extract.paths = fontPaths;
	//extract.offset = width;
	return {paths:fontPaths,offset:width};},extractGlyphPoints:function extractGlyphPoints(c,face,scale,offset,path){var pts=[];var i,i2,divisions,outline,action,length,scaleX,scaleY,x,y,cpx,cpy,cpx0,cpy0,cpx1,cpy1,cpx2,cpy2,laste,glyph=face.glyphs[c] || face.glyphs['?'];if(!glyph)return;if(glyph.o){outline = glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(' '));length = outline.length;scaleX = scale;scaleY = scale;for(i = 0;i < length;) {action = outline[i++]; //console.log( action );
	switch(action){case 'm': // Move To
	x = outline[i++] * scaleX + offset;y = outline[i++] * scaleY;path.moveTo(x,y);break;case 'l': // Line To
	x = outline[i++] * scaleX + offset;y = outline[i++] * scaleY;path.lineTo(x,y);break;case 'q': // QuadraticCurveTo
	cpx = outline[i++] * scaleX + offset;cpy = outline[i++] * scaleY;cpx1 = outline[i++] * scaleX + offset;cpy1 = outline[i++] * scaleY;path.quadraticCurveTo(cpx1,cpy1,cpx,cpy);laste = pts[pts.length - 1];if(laste){cpx0 = laste.x;cpy0 = laste.y;for(i2 = 1,divisions = this.divisions;i2 <= divisions;i2++) {var t=i2 / divisions;THREE.Shape.Utils.b2(t,cpx0,cpx1,cpx);THREE.Shape.Utils.b2(t,cpy0,cpy1,cpy);}}break;case 'b': // Cubic Bezier Curve
	cpx = outline[i++] * scaleX + offset;cpy = outline[i++] * scaleY;cpx1 = outline[i++] * scaleX + offset;cpy1 = outline[i++] * scaleY;cpx2 = outline[i++] * scaleX + offset;cpy2 = outline[i++] * scaleY;path.bezierCurveTo(cpx1,cpy1,cpx2,cpy2,cpx,cpy);laste = pts[pts.length - 1];if(laste){cpx0 = laste.x;cpy0 = laste.y;for(i2 = 1,divisions = this.divisions;i2 <= divisions;i2++) {var t=i2 / divisions;THREE.Shape.Utils.b3(t,cpx0,cpx1,cpx2,cpx);THREE.Shape.Utils.b3(t,cpy0,cpy1,cpy2,cpy);}}break;}}}return {offset:glyph.ha * scale,path:path};}};THREE.FontUtils.generateShapes = function(text,parameters){ // Parameters
	parameters = parameters || {};var size=parameters.size !== undefined?parameters.size:100;var curveSegments=parameters.curveSegments !== undefined?parameters.curveSegments:4;var font=parameters.font !== undefined?parameters.font:'helvetiker';var weight=parameters.weight !== undefined?parameters.weight:'normal';var style=parameters.style !== undefined?parameters.style:'normal';THREE.FontUtils.size = size;THREE.FontUtils.divisions = curveSegments;THREE.FontUtils.face = font;THREE.FontUtils.weight = weight;THREE.FontUtils.style = style; // Get a Font data json object
	var data=THREE.FontUtils.drawText(text);var paths=data.paths;var shapes=[];for(var p=0,pl=paths.length;p < pl;p++) {Array.prototype.push.apply(shapes,paths[p].toShapes());}return shapes;}; /**
	 * This code is a quick port of code written in C++ which was submitted to
	 * flipcode.com by John W. Ratcliff  // July 22, 2000
	 * See original code and more information here:
	 * http://www.flipcode.com/archives/Efficient_Polygon_Triangulation.shtml
	 *
	 * ported to actionscript by Zevan Rosser
	 * www.actionsnippet.com
	 *
	 * ported to javascript by Joshua Koo
	 * http://www.lab4games.net/zz85/blog
	 *
	 */(function(namespace){var EPSILON=0.0000000001; // takes in an contour array and returns
	var process=function process(contour,indices){var n=contour.length;if(n < 3)return null;var result=[],verts=[],vertIndices=[]; /* we want a counter-clockwise polygon in verts */var u,v,w;if(area(contour) > 0.0){for(v = 0;v < n;v++) verts[v] = v;}else {for(v = 0;v < n;v++) verts[v] = n - 1 - v;}var nv=n; /*  remove nv - 2 vertices, creating 1 triangle every time */var count=2 * nv; /* error detection */for(v = nv - 1;nv > 2;) { /* if we loop, it is probably a non-simple polygon */if(count-- <= 0){ //** Triangulate: ERROR - probable bad polygon!
	//throw ( "Warning, unable to triangulate polygon!" );
	//return null;
	// Sometimes warning is fine, especially polygons are triangulated in reverse.
	console.warn('THREE.FontUtils: Warning, unable to triangulate polygon! in Triangulate.process()');if(indices)return vertIndices;return result;} /* three consecutive vertices in current polygon, <u,v,w> */u = v;if(nv <= u)u = 0; /* previous */v = u + 1;if(nv <= v)v = 0; /* new v    */w = v + 1;if(nv <= w)w = 0; /* next     */if(snip(contour,u,v,w,nv,verts)){var a,b,c,s,t; /* true names of the vertices */a = verts[u];b = verts[v];c = verts[w]; /* output Triangle */result.push([contour[a],contour[b],contour[c]]);vertIndices.push([verts[u],verts[v],verts[w]]); /* remove v from the remaining polygon */for(s = v,t = v + 1;t < nv;s++,t++) {verts[s] = verts[t];}nv--; /* reset error detection counter */count = 2 * nv;}}if(indices)return vertIndices;return result;}; // calculate area of the contour polygon
	var area=function area(contour){var n=contour.length;var a=0.0;for(var p=n - 1,q=0;q < n;p = q++) {a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;}return a * 0.5;};var snip=function snip(contour,u,v,w,n,verts){var p;var ax,ay,bx,by;var cx,cy,px,py;ax = contour[verts[u]].x;ay = contour[verts[u]].y;bx = contour[verts[v]].x;by = contour[verts[v]].y;cx = contour[verts[w]].x;cy = contour[verts[w]].y;if(EPSILON > (bx - ax) * (cy - ay) - (by - ay) * (cx - ax))return false;var aX,aY,bX,bY,cX,cY;var apx,apy,bpx,bpy,cpx,cpy;var cCROSSap,bCROSScp,aCROSSbp;aX = cx - bx;aY = cy - by;bX = ax - cx;bY = ay - cy;cX = bx - ax;cY = by - ay;for(p = 0;p < n;p++) {px = contour[verts[p]].x;py = contour[verts[p]].y;if(px === ax && py === ay || px === bx && py === by || px === cx && py === cy)continue;apx = px - ax;apy = py - ay;bpx = px - bx;bpy = py - by;cpx = px - cx;cpy = py - cy; // see if p is inside triangle abc
	aCROSSbp = aX * bpy - aY * bpx;cCROSSap = cX * apy - cY * apx;bCROSScp = bX * cpy - bY * cpx;if(aCROSSbp >= -EPSILON && bCROSScp >= -EPSILON && cCROSSap >= -EPSILON)return false;}return true;};namespace.Triangulate = process;namespace.Triangulate.area = area;return namespace;})(THREE.FontUtils); // To use the typeface.js face files, hook up the API
	THREE.typeface_js = {faces:THREE.FontUtils.faces,loadFace:THREE.FontUtils.loadFace};if(typeof self !== 'undefined')self._typeface_js = THREE.typeface_js; // File:src/extras/audio/Audio.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.Audio = function(listener){THREE.Object3D.call(this);this.type = 'Audio';this.context = listener.context;this.source = this.context.createBufferSource();this.source.onended = this.onEnded.bind(this);this.gain = this.context.createGain();this.gain.connect(this.context.destination);this.panner = this.context.createPanner();this.panner.connect(this.gain);this.autoplay = false;this.startTime = 0;this.playbackRate = 1;this.isPlaying = false;};THREE.Audio.prototype = Object.create(THREE.Object3D.prototype);THREE.Audio.prototype.constructor = THREE.Audio;THREE.Audio.prototype.load = function(file){var scope=this;var request=new XMLHttpRequest();request.open('GET',file,true);request.responseType = 'arraybuffer';request.onload = function(e){scope.context.decodeAudioData(this.response,function(buffer){scope.source.buffer = buffer;if(scope.autoplay)scope.play();});};request.send();return this;};THREE.Audio.prototype.play = function(){if(this.isPlaying === true){console.warn('THREE.Audio: Audio is already playing.');return;}var source=this.context.createBufferSource();source.buffer = this.source.buffer;source.loop = this.source.loop;source.onended = this.source.onended;source.start(0,this.startTime);source.playbackRate.value = this.playbackRate;this.isPlaying = true;this.source = source;this.connect();};THREE.Audio.prototype.pause = function(){this.source.stop();this.startTime = this.context.currentTime;};THREE.Audio.prototype.stop = function(){this.source.stop();this.startTime = 0;};THREE.Audio.prototype.connect = function(){if(this.filter !== undefined){this.source.connect(this.filter);this.filter.connect(this.panner);}else {this.source.connect(this.panner);}};THREE.Audio.prototype.disconnect = function(){if(this.filter !== undefined){this.source.disconnect(this.filter);this.filter.disconnect(this.panner);}else {this.source.disconnect(this.panner);}};THREE.Audio.prototype.setFilter = function(value){if(this.isPlaying === true){this.disconnect();this.filter = value;this.connect();}else {this.filter = value;}};THREE.Audio.prototype.getFilter = function(){return this.filter;};THREE.Audio.prototype.setPlaybackRate = function(value){this.playbackRate = value;if(this.isPlaying === true){this.source.playbackRate.value = this.playbackRate;}};THREE.Audio.prototype.getPlaybackRate = function(){return this.playbackRate;};THREE.Audio.prototype.onEnded = function(){this.isPlaying = false;};THREE.Audio.prototype.setLoop = function(value){this.source.loop = value;};THREE.Audio.prototype.getLoop = function(){return this.source.loop;};THREE.Audio.prototype.setRefDistance = function(value){this.panner.refDistance = value;};THREE.Audio.prototype.getRefDistance = function(){return this.panner.refDistance;};THREE.Audio.prototype.setRolloffFactor = function(value){this.panner.rolloffFactor = value;};THREE.Audio.prototype.getRolloffFactor = function(){return this.panner.rolloffFactor;};THREE.Audio.prototype.setVolume = function(value){this.gain.gain.value = value;};THREE.Audio.prototype.getVolume = function(){return this.gain.gain.value;};THREE.Audio.prototype.updateMatrixWorld = (function(){var position=new THREE.Vector3();return function updateMatrixWorld(force){THREE.Object3D.prototype.updateMatrixWorld.call(this,force);position.setFromMatrixPosition(this.matrixWorld);this.panner.setPosition(position.x,position.y,position.z);};})(); // File:src/extras/audio/AudioListener.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.AudioListener = function(){THREE.Object3D.call(this);this.type = 'AudioListener';this.context = new (window.AudioContext || window.webkitAudioContext)();};THREE.AudioListener.prototype = Object.create(THREE.Object3D.prototype);THREE.AudioListener.prototype.constructor = THREE.AudioListener;THREE.AudioListener.prototype.updateMatrixWorld = (function(){var position=new THREE.Vector3();var quaternion=new THREE.Quaternion();var scale=new THREE.Vector3();var orientation=new THREE.Vector3();return function updateMatrixWorld(force){THREE.Object3D.prototype.updateMatrixWorld.call(this,force);var listener=this.context.listener;var up=this.up;this.matrixWorld.decompose(position,quaternion,scale);orientation.set(0,0,-1).applyQuaternion(quaternion);listener.setPosition(position.x,position.y,position.z);listener.setOrientation(orientation.x,orientation.y,orientation.z,up.x,up.y,up.z);};})(); // File:src/extras/core/Curve.js
	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * Extensible curve object
	 *
	 * Some common of Curve methods
	 * .getPoint(t), getTangent(t)
	 * .getPointAt(u), getTagentAt(u)
	 * .getPoints(), .getSpacedPoints()
	 * .getLength()
	 * .updateArcLengths()
	 *
	 * This following classes subclasses THREE.Curve:
	 *
	 * -- 2d classes --
	 * THREE.LineCurve
	 * THREE.QuadraticBezierCurve
	 * THREE.CubicBezierCurve
	 * THREE.SplineCurve
	 * THREE.ArcCurve
	 * THREE.EllipseCurve
	 *
	 * -- 3d classes --
	 * THREE.LineCurve3
	 * THREE.QuadraticBezierCurve3
	 * THREE.CubicBezierCurve3
	 * THREE.SplineCurve3
	 * THREE.ClosedSplineCurve3
	 *
	 * A series of curves can be represented as a THREE.CurvePath
	 *
	 **/ /**************************************************************
	 *	Abstract Curve base class
	 **************************************************************/THREE.Curve = function(){}; // Virtual base class method to overwrite and implement in subclasses
	//	- t [0 .. 1]
	THREE.Curve.prototype.getPoint = function(t){console.warn("THREE.Curve: Warning, getPoint() not implemented!");return null;}; // Get point at relative position in curve according to arc length
	// - u [0 .. 1]
	THREE.Curve.prototype.getPointAt = function(u){var t=this.getUtoTmapping(u);return this.getPoint(t);}; // Get sequence of points using getPoint( t )
	THREE.Curve.prototype.getPoints = function(divisions){if(!divisions)divisions = 5;var d,pts=[];for(d = 0;d <= divisions;d++) {pts.push(this.getPoint(d / divisions));}return pts;}; // Get sequence of points using getPointAt( u )
	THREE.Curve.prototype.getSpacedPoints = function(divisions){if(!divisions)divisions = 5;var d,pts=[];for(d = 0;d <= divisions;d++) {pts.push(this.getPointAt(d / divisions));}return pts;}; // Get total curve arc length
	THREE.Curve.prototype.getLength = function(){var lengths=this.getLengths();return lengths[lengths.length - 1];}; // Get list of cumulative segment lengths
	THREE.Curve.prototype.getLengths = function(divisions){if(!divisions)divisions = this.__arcLengthDivisions?this.__arcLengthDivisions:200;if(this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1 && !this.needsUpdate){ //console.log( "cached", this.cacheArcLengths );
	return this.cacheArcLengths;}this.needsUpdate = false;var cache=[];var current,last=this.getPoint(0);var p,sum=0;cache.push(0);for(p = 1;p <= divisions;p++) {current = this.getPoint(p / divisions);sum += current.distanceTo(last);cache.push(sum);last = current;}this.cacheArcLengths = cache;return cache; // { sums: cache, sum:sum }; Sum is in the last element.
	};THREE.Curve.prototype.updateArcLengths = function(){this.needsUpdate = true;this.getLengths();}; // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
	THREE.Curve.prototype.getUtoTmapping = function(u,distance){var arcLengths=this.getLengths();var i=0,il=arcLengths.length;var targetArcLength; // The targeted u distance value to get
	if(distance){targetArcLength = distance;}else {targetArcLength = u * arcLengths[il - 1];} //var time = Date.now();
	// binary search for the index with largest value smaller than target u distance
	var low=0,high=il - 1,comparison;while(low <= high) {i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats
	comparison = arcLengths[i] - targetArcLength;if(comparison < 0){low = i + 1;}else if(comparison > 0){high = i - 1;}else {high = i;break; // DONE
	}}i = high; //console.log('b' , i, low, high, Date.now()- time);
	if(arcLengths[i] === targetArcLength){var t=i / (il - 1);return t;} // we could get finer grain at lengths, or use simple interpolation between two points
	var lengthBefore=arcLengths[i];var lengthAfter=arcLengths[i + 1];var segmentLength=lengthAfter - lengthBefore; // determine where we are between the 'before' and 'after' points
	var segmentFraction=(targetArcLength - lengthBefore) / segmentLength; // add that fractional amount to t
	var t=(i + segmentFraction) / (il - 1);return t;}; // Returns a unit vector tangent at t
	// In case any sub curve does not implement its tangent derivation,
	// 2 points a small delta apart will be used to find its gradient
	// which seems to give a reasonable approximation
	THREE.Curve.prototype.getTangent = function(t){var delta=0.0001;var t1=t - delta;var t2=t + delta; // Capping in case of danger
	if(t1 < 0)t1 = 0;if(t2 > 1)t2 = 1;var pt1=this.getPoint(t1);var pt2=this.getPoint(t2);var vec=pt2.clone().sub(pt1);return vec.normalize();};THREE.Curve.prototype.getTangentAt = function(u){var t=this.getUtoTmapping(u);return this.getTangent(t);}; /**************************************************************
	 *	Utils
	 **************************************************************/THREE.Curve.Utils = {tangentQuadraticBezier:function tangentQuadraticBezier(t,p0,p1,p2){return 2 * (1 - t) * (p1 - p0) + 2 * t * (p2 - p1);}, // Puay Bing, thanks for helping with this derivative!
	tangentCubicBezier:function tangentCubicBezier(t,p0,p1,p2,p3){return -3 * p0 * (1 - t) * (1 - t) + 3 * p1 * (1 - t) * (1 - t) - 6 * t * p1 * (1 - t) + 6 * t * p2 * (1 - t) - 3 * t * t * p2 + 3 * t * t * p3;},tangentSpline:function tangentSpline(t,p0,p1,p2,p3){ // To check if my formulas are correct
	var h00=6 * t * t - 6 * t; // derived from 2t^3 − 3t^2 + 1
	var h10=3 * t * t - 4 * t + 1; // t^3 − 2t^2 + t
	var h01=-6 * t * t + 6 * t; // − 2t3 + 3t2
	var h11=3 * t * t - 2 * t; // t3 − t2
	return h00 + h10 + h01 + h11;}, // Catmull-Rom
	interpolate:function interpolate(p0,p1,p2,p3,t){var v0=(p2 - p0) * 0.5;var v1=(p3 - p1) * 0.5;var t2=t * t;var t3=t * t2;return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;}}; // TODO: Transformation for Curves?
	/**************************************************************
	 *	3D Curves
	 **************************************************************/ // A Factory method for creating new curve subclasses
	THREE.Curve.create = function(constructor,getPointFunc){constructor.prototype = Object.create(THREE.Curve.prototype);constructor.prototype.constructor = constructor;constructor.prototype.getPoint = getPointFunc;return constructor;}; // File:src/extras/core/CurvePath.js
	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 *
	 **/ /**************************************************************
	 *	Curved Path - a curve path is simply a array of connected
	 *  curves, but retains the api of a curve
	 **************************************************************/THREE.CurvePath = function(){this.curves = [];this.bends = [];this.autoClose = false; // Automatically closes the path
	};THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);THREE.CurvePath.prototype.constructor = THREE.CurvePath;THREE.CurvePath.prototype.add = function(curve){this.curves.push(curve);};THREE.CurvePath.prototype.checkConnection = function(){ // TODO
	// If the ending of curve is not connected to the starting
	// or the next curve, then, this is not a real path
	};THREE.CurvePath.prototype.closePath = function(){ // TODO Test
	// and verify for vector3 (needs to implement equals)
	// Add a line curve if start and end of lines are not connected
	var startPoint=this.curves[0].getPoint(0);var endPoint=this.curves[this.curves.length - 1].getPoint(1);if(!startPoint.equals(endPoint)){this.curves.push(new THREE.LineCurve(endPoint,startPoint));}}; // To get accurate point with reference to
	// entire path distance at time t,
	// following has to be done:
	// 1. Length of each sub path have to be known
	// 2. Locate and identify type of curve
	// 3. Get t for the curve
	// 4. Return curve.getPointAt(t')
	THREE.CurvePath.prototype.getPoint = function(t){var d=t * this.getLength();var curveLengths=this.getCurveLengths();var i=0,diff,curve; // To think about boundaries points.
	while(i < curveLengths.length) {if(curveLengths[i] >= d){diff = curveLengths[i] - d;curve = this.curves[i];var u=1 - diff / curve.getLength();return curve.getPointAt(u);}i++;}return null; // loop where sum != 0, sum > d , sum+1 <d
	}; /*
	THREE.CurvePath.prototype.getTangent = function( t ) {
	};*/ // We cannot use the default THREE.Curve getPoint() with getLength() because in
	// THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
	// getPoint() depends on getLength
	THREE.CurvePath.prototype.getLength = function(){var lens=this.getCurveLengths();return lens[lens.length - 1];}; // Compute lengths and cache them
	// We cannot overwrite getLengths() because UtoT mapping uses it.
	THREE.CurvePath.prototype.getCurveLengths = function(){ // We use cache values if curves and cache array are same length
	if(this.cacheLengths && this.cacheLengths.length === this.curves.length){return this.cacheLengths;} // Get length of sub-curve
	// Push sums into cached array
	var lengths=[],sums=0;var i,il=this.curves.length;for(i = 0;i < il;i++) {sums += this.curves[i].getLength();lengths.push(sums);}this.cacheLengths = lengths;return lengths;}; // Returns min and max coordinates
	THREE.CurvePath.prototype.getBoundingBox = function(){var points=this.getPoints();var maxX,maxY,maxZ;var minX,minY,minZ;maxX = maxY = Number.NEGATIVE_INFINITY;minX = minY = Number.POSITIVE_INFINITY;var p,i,il,sum;var v3=points[0] instanceof THREE.Vector3;sum = v3?new THREE.Vector3():new THREE.Vector2();for(i = 0,il = points.length;i < il;i++) {p = points[i];if(p.x > maxX)maxX = p.x;else if(p.x < minX)minX = p.x;if(p.y > maxY)maxY = p.y;else if(p.y < minY)minY = p.y;if(v3){if(p.z > maxZ)maxZ = p.z;else if(p.z < minZ)minZ = p.z;}sum.add(p);}var ret={minX:minX,minY:minY,maxX:maxX,maxY:maxY};if(v3){ret.maxZ = maxZ;ret.minZ = minZ;}return ret;}; /**************************************************************
	 *	Create Geometries Helpers
	 **************************************************************/ /// Generate geometry from path points (for Line or Points objects)
	THREE.CurvePath.prototype.createPointsGeometry = function(divisions){var pts=this.getPoints(divisions,true);return this.createGeometry(pts);}; // Generate geometry from equidistant sampling along the path
	THREE.CurvePath.prototype.createSpacedPointsGeometry = function(divisions){var pts=this.getSpacedPoints(divisions,true);return this.createGeometry(pts);};THREE.CurvePath.prototype.createGeometry = function(points){var geometry=new THREE.Geometry();for(var i=0;i < points.length;i++) {geometry.vertices.push(new THREE.Vector3(points[i].x,points[i].y,points[i].z || 0));}return geometry;}; /**************************************************************
	 *	Bend / Wrap Helper Methods
	 **************************************************************/ // Wrap path / Bend modifiers?
	THREE.CurvePath.prototype.addWrapPath = function(bendpath){this.bends.push(bendpath);};THREE.CurvePath.prototype.getTransformedPoints = function(segments,bends){var oldPts=this.getPoints(segments); // getPoints getSpacedPoints
	var i,il;if(!bends){bends = this.bends;}for(i = 0,il = bends.length;i < il;i++) {oldPts = this.getWrapPoints(oldPts,bends[i]);}return oldPts;};THREE.CurvePath.prototype.getTransformedSpacedPoints = function(segments,bends){var oldPts=this.getSpacedPoints(segments);var i,il;if(!bends){bends = this.bends;}for(i = 0,il = bends.length;i < il;i++) {oldPts = this.getWrapPoints(oldPts,bends[i]);}return oldPts;}; // This returns getPoints() bend/wrapped around the contour of a path.
	// Read http://www.planetclegg.com/projects/WarpingTextToSplines.html
	THREE.CurvePath.prototype.getWrapPoints = function(oldPts,path){var bounds=this.getBoundingBox();var i,il,p,oldX,oldY,xNorm;for(i = 0,il = oldPts.length;i < il;i++) {p = oldPts[i];oldX = p.x;oldY = p.y;xNorm = oldX / bounds.maxX; // If using actual distance, for length > path, requires line extrusions
	//xNorm = path.getUtoTmapping(xNorm, oldX); // 3 styles. 1) wrap stretched. 2) wrap stretch by arc length 3) warp by actual distance
	xNorm = path.getUtoTmapping(xNorm,oldX); // check for out of bounds?
	var pathPt=path.getPoint(xNorm);var normal=path.getTangent(xNorm);normal.set(-normal.y,normal.x).multiplyScalar(oldY);p.x = pathPt.x + normal.x;p.y = pathPt.y + normal.y;}return oldPts;}; // File:src/extras/core/Path.js
	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * Creates free form 2d path using series of points, lines or curves.
	 *
	 **/THREE.Path = function(points){THREE.CurvePath.call(this);this.actions = [];if(points){this.fromPoints(points);}};THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);THREE.Path.prototype.constructor = THREE.Path;THREE.PathActions = {MOVE_TO:'moveTo',LINE_TO:'lineTo',QUADRATIC_CURVE_TO:'quadraticCurveTo', // Bezier quadratic curve
	BEZIER_CURVE_TO:'bezierCurveTo', // Bezier cubic curve
	CSPLINE_THRU:'splineThru', // Catmull-Rom spline
	ARC:'arc', // Circle
	ELLIPSE:'ellipse'}; // TODO Clean up PATH API
	// Create path using straight lines to connect all points
	// - vectors: array of Vector2
	THREE.Path.prototype.fromPoints = function(vectors){this.moveTo(vectors[0].x,vectors[0].y);for(var v=1,vlen=vectors.length;v < vlen;v++) {this.lineTo(vectors[v].x,vectors[v].y);}}; // startPath() endPath()?
	THREE.Path.prototype.moveTo = function(x,y){var args=Array.prototype.slice.call(arguments);this.actions.push({action:THREE.PathActions.MOVE_TO,args:args});};THREE.Path.prototype.lineTo = function(x,y){var args=Array.prototype.slice.call(arguments);var lastargs=this.actions[this.actions.length - 1].args;var x0=lastargs[lastargs.length - 2];var y0=lastargs[lastargs.length - 1];var curve=new THREE.LineCurve(new THREE.Vector2(x0,y0),new THREE.Vector2(x,y));this.curves.push(curve);this.actions.push({action:THREE.PathActions.LINE_TO,args:args});};THREE.Path.prototype.quadraticCurveTo = function(aCPx,aCPy,aX,aY){var args=Array.prototype.slice.call(arguments);var lastargs=this.actions[this.actions.length - 1].args;var x0=lastargs[lastargs.length - 2];var y0=lastargs[lastargs.length - 1];var curve=new THREE.QuadraticBezierCurve(new THREE.Vector2(x0,y0),new THREE.Vector2(aCPx,aCPy),new THREE.Vector2(aX,aY));this.curves.push(curve);this.actions.push({action:THREE.PathActions.QUADRATIC_CURVE_TO,args:args});};THREE.Path.prototype.bezierCurveTo = function(aCP1x,aCP1y,aCP2x,aCP2y,aX,aY){var args=Array.prototype.slice.call(arguments);var lastargs=this.actions[this.actions.length - 1].args;var x0=lastargs[lastargs.length - 2];var y0=lastargs[lastargs.length - 1];var curve=new THREE.CubicBezierCurve(new THREE.Vector2(x0,y0),new THREE.Vector2(aCP1x,aCP1y),new THREE.Vector2(aCP2x,aCP2y),new THREE.Vector2(aX,aY));this.curves.push(curve);this.actions.push({action:THREE.PathActions.BEZIER_CURVE_TO,args:args});};THREE.Path.prototype.splineThru = function(pts /*Array of Vector*/){var args=Array.prototype.slice.call(arguments);var lastargs=this.actions[this.actions.length - 1].args;var x0=lastargs[lastargs.length - 2];var y0=lastargs[lastargs.length - 1]; //---
	var npts=[new THREE.Vector2(x0,y0)];Array.prototype.push.apply(npts,pts);var curve=new THREE.SplineCurve(npts);this.curves.push(curve);this.actions.push({action:THREE.PathActions.CSPLINE_THRU,args:args});}; // FUTURE: Change the API or follow canvas API?
	THREE.Path.prototype.arc = function(aX,aY,aRadius,aStartAngle,aEndAngle,aClockwise){var lastargs=this.actions[this.actions.length - 1].args;var x0=lastargs[lastargs.length - 2];var y0=lastargs[lastargs.length - 1];this.absarc(aX + x0,aY + y0,aRadius,aStartAngle,aEndAngle,aClockwise);};THREE.Path.prototype.absarc = function(aX,aY,aRadius,aStartAngle,aEndAngle,aClockwise){this.absellipse(aX,aY,aRadius,aRadius,aStartAngle,aEndAngle,aClockwise);};THREE.Path.prototype.ellipse = function(aX,aY,xRadius,yRadius,aStartAngle,aEndAngle,aClockwise,aRotation){var lastargs=this.actions[this.actions.length - 1].args;var x0=lastargs[lastargs.length - 2];var y0=lastargs[lastargs.length - 1];this.absellipse(aX + x0,aY + y0,xRadius,yRadius,aStartAngle,aEndAngle,aClockwise,aRotation);};THREE.Path.prototype.absellipse = function(aX,aY,xRadius,yRadius,aStartAngle,aEndAngle,aClockwise,aRotation){var args=[aX,aY,xRadius,yRadius,aStartAngle,aEndAngle,aClockwise,aRotation || 0 // aRotation is optional.
	];var curve=new THREE.EllipseCurve(aX,aY,xRadius,yRadius,aStartAngle,aEndAngle,aClockwise,aRotation);this.curves.push(curve);var lastPoint=curve.getPoint(1);args.push(lastPoint.x);args.push(lastPoint.y);this.actions.push({action:THREE.PathActions.ELLIPSE,args:args});};THREE.Path.prototype.getSpacedPoints = function(divisions,closedPath){if(!divisions)divisions = 40;var points=[];for(var i=0;i < divisions;i++) {points.push(this.getPoint(i / divisions)); //if( !this.getPoint( i / divisions ) ) throw "DIE";
	} // if ( closedPath ) {
	//
	// 	points.push( points[ 0 ] );
	//
	// }
	return points;}; /* Return an array of vectors based on contour of the path */THREE.Path.prototype.getPoints = function(divisions,closedPath){if(this.useSpacedPoints){return this.getSpacedPoints(divisions,closedPath);}divisions = divisions || 12;var points=[];var i,il,item,action,args;var cpx,cpy,cpx2,cpy2,cpx1,cpy1,cpx0,cpy0,laste,j,t,tx,ty;for(i = 0,il = this.actions.length;i < il;i++) {item = this.actions[i];action = item.action;args = item.args;switch(action){case THREE.PathActions.MOVE_TO:points.push(new THREE.Vector2(args[0],args[1]));break;case THREE.PathActions.LINE_TO:points.push(new THREE.Vector2(args[0],args[1]));break;case THREE.PathActions.QUADRATIC_CURVE_TO:cpx = args[2];cpy = args[3];cpx1 = args[0];cpy1 = args[1];if(points.length > 0){laste = points[points.length - 1];cpx0 = laste.x;cpy0 = laste.y;}else {laste = this.actions[i - 1].args;cpx0 = laste[laste.length - 2];cpy0 = laste[laste.length - 1];}for(j = 1;j <= divisions;j++) {t = j / divisions;tx = THREE.Shape.Utils.b2(t,cpx0,cpx1,cpx);ty = THREE.Shape.Utils.b2(t,cpy0,cpy1,cpy);points.push(new THREE.Vector2(tx,ty));}break;case THREE.PathActions.BEZIER_CURVE_TO:cpx = args[4];cpy = args[5];cpx1 = args[0];cpy1 = args[1];cpx2 = args[2];cpy2 = args[3];if(points.length > 0){laste = points[points.length - 1];cpx0 = laste.x;cpy0 = laste.y;}else {laste = this.actions[i - 1].args;cpx0 = laste[laste.length - 2];cpy0 = laste[laste.length - 1];}for(j = 1;j <= divisions;j++) {t = j / divisions;tx = THREE.Shape.Utils.b3(t,cpx0,cpx1,cpx2,cpx);ty = THREE.Shape.Utils.b3(t,cpy0,cpy1,cpy2,cpy);points.push(new THREE.Vector2(tx,ty));}break;case THREE.PathActions.CSPLINE_THRU:laste = this.actions[i - 1].args;var last=new THREE.Vector2(laste[laste.length - 2],laste[laste.length - 1]);var spts=[last];var n=divisions * args[0].length;spts = spts.concat(args[0]);var spline=new THREE.SplineCurve(spts);for(j = 1;j <= n;j++) {points.push(spline.getPointAt(j / n));}break;case THREE.PathActions.ARC:var aX=args[0],aY=args[1],aRadius=args[2],aStartAngle=args[3],aEndAngle=args[4],aClockwise=!!args[5];var deltaAngle=aEndAngle - aStartAngle;var angle;var tdivisions=divisions * 2;for(j = 1;j <= tdivisions;j++) {t = j / tdivisions;if(!aClockwise){t = 1 - t;}angle = aStartAngle + t * deltaAngle;tx = aX + aRadius * Math.cos(angle);ty = aY + aRadius * Math.sin(angle); //console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);
	points.push(new THREE.Vector2(tx,ty));} //console.log(points);
	break;case THREE.PathActions.ELLIPSE:var aX=args[0],aY=args[1],xRadius=args[2],yRadius=args[3],aStartAngle=args[4],aEndAngle=args[5],aClockwise=!!args[6],aRotation=args[7];var deltaAngle=aEndAngle - aStartAngle;var angle;var tdivisions=divisions * 2;var cos,sin;if(aRotation !== 0){cos = Math.cos(aRotation);sin = Math.sin(aRotation);}for(j = 1;j <= tdivisions;j++) {t = j / tdivisions;if(!aClockwise){t = 1 - t;}angle = aStartAngle + t * deltaAngle;tx = aX + xRadius * Math.cos(angle);ty = aY + yRadius * Math.sin(angle);if(aRotation !== 0){var x=tx,y=ty; // Rotate the point about the center of the ellipse.
	tx = (x - aX) * cos - (y - aY) * sin + aX;ty = (x - aX) * sin + (y - aY) * cos + aY;} //console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);
	points.push(new THREE.Vector2(tx,ty));} //console.log(points);
	break;} // end switch
	} // Normalize to remove the closing point by default.
	var lastPoint=points[points.length - 1];var EPSILON=0.0000000001;if(Math.abs(lastPoint.x - points[0].x) < EPSILON && Math.abs(lastPoint.y - points[0].y) < EPSILON)points.splice(points.length - 1,1);if(closedPath){points.push(points[0]);}return points;}; //
	// Breaks path into shapes
	//
	//	Assumptions (if parameter isCCW==true the opposite holds):
	//	- solid shapes are defined clockwise (CW)
	//	- holes are defined counterclockwise (CCW)
	//
	//	If parameter noHoles==true:
	//  - all subPaths are regarded as solid shapes
	//  - definition order CW/CCW has no relevance
	//
	THREE.Path.prototype.toShapes = function(isCCW,noHoles){function extractSubpaths(inActions){var i,il,item,action,args;var subPaths=[],lastPath=new THREE.Path();for(i = 0,il = inActions.length;i < il;i++) {item = inActions[i];args = item.args;action = item.action;if(action === THREE.PathActions.MOVE_TO){if(lastPath.actions.length !== 0){subPaths.push(lastPath);lastPath = new THREE.Path();}}lastPath[action].apply(lastPath,args);}if(lastPath.actions.length !== 0){subPaths.push(lastPath);} // console.log(subPaths);
	return subPaths;}function toShapesNoHoles(inSubpaths){var shapes=[];for(var i=0,il=inSubpaths.length;i < il;i++) {var tmpPath=inSubpaths[i];var tmpShape=new THREE.Shape();tmpShape.actions = tmpPath.actions;tmpShape.curves = tmpPath.curves;shapes.push(tmpShape);} //console.log("shape", shapes);
	return shapes;}function isPointInsidePolygon(inPt,inPolygon){var EPSILON=0.0000000001;var polyLen=inPolygon.length; // inPt on polygon contour => immediate success    or
	// toggling of inside/outside at every single! intersection point of an edge
	//  with the horizontal line through inPt, left of inPt
	//  not counting lowerY endpoints of edges and whole edges on that line
	var inside=false;for(var p=polyLen - 1,q=0;q < polyLen;p = q++) {var edgeLowPt=inPolygon[p];var edgeHighPt=inPolygon[q];var edgeDx=edgeHighPt.x - edgeLowPt.x;var edgeDy=edgeHighPt.y - edgeLowPt.y;if(Math.abs(edgeDy) > EPSILON){ // not parallel
	if(edgeDy < 0){edgeLowPt = inPolygon[q];edgeDx = -edgeDx;edgeHighPt = inPolygon[p];edgeDy = -edgeDy;}if(inPt.y < edgeLowPt.y || inPt.y > edgeHighPt.y)continue;if(inPt.y === edgeLowPt.y){if(inPt.x === edgeLowPt.x)return true; // inPt is on contour ?
	// continue;				// no intersection or edgeLowPt => doesn't count !!!
	}else {var perpEdge=edgeDy * (inPt.x - edgeLowPt.x) - edgeDx * (inPt.y - edgeLowPt.y);if(perpEdge === 0)return true; // inPt is on contour ?
	if(perpEdge < 0)continue;inside = !inside; // true intersection left of inPt
	}}else { // parallel or collinear
	if(inPt.y !== edgeLowPt.y)continue; // parallel
	// edge lies on the same horizontal line as inPt
	if(edgeHighPt.x <= inPt.x && inPt.x <= edgeLowPt.x || edgeLowPt.x <= inPt.x && inPt.x <= edgeHighPt.x)return true; // inPt: Point on contour !
	// continue;
	}}return inside;}var subPaths=extractSubpaths(this.actions);if(subPaths.length === 0)return [];if(noHoles === true)return toShapesNoHoles(subPaths);var solid,tmpPath,tmpShape,shapes=[];if(subPaths.length === 1){tmpPath = subPaths[0];tmpShape = new THREE.Shape();tmpShape.actions = tmpPath.actions;tmpShape.curves = tmpPath.curves;shapes.push(tmpShape);return shapes;}var holesFirst=!THREE.Shape.Utils.isClockWise(subPaths[0].getPoints());holesFirst = isCCW?!holesFirst:holesFirst; // console.log("Holes first", holesFirst);
	var betterShapeHoles=[];var newShapes=[];var newShapeHoles=[];var mainIdx=0;var tmpPoints;newShapes[mainIdx] = undefined;newShapeHoles[mainIdx] = [];var i,il;for(i = 0,il = subPaths.length;i < il;i++) {tmpPath = subPaths[i];tmpPoints = tmpPath.getPoints();solid = THREE.Shape.Utils.isClockWise(tmpPoints);solid = isCCW?!solid:solid;if(solid){if(!holesFirst && newShapes[mainIdx])mainIdx++;newShapes[mainIdx] = {s:new THREE.Shape(),p:tmpPoints};newShapes[mainIdx].s.actions = tmpPath.actions;newShapes[mainIdx].s.curves = tmpPath.curves;if(holesFirst)mainIdx++;newShapeHoles[mainIdx] = []; //console.log('cw', i);
	}else {newShapeHoles[mainIdx].push({h:tmpPath,p:tmpPoints[0]}); //console.log('ccw', i);
	}} // only Holes? -> probably all Shapes with wrong orientation
	if(!newShapes[0])return toShapesNoHoles(subPaths);if(newShapes.length > 1){var ambiguous=false;var toChange=[];for(var sIdx=0,sLen=newShapes.length;sIdx < sLen;sIdx++) {betterShapeHoles[sIdx] = [];}for(var sIdx=0,sLen=newShapes.length;sIdx < sLen;sIdx++) {var sho=newShapeHoles[sIdx];for(var hIdx=0;hIdx < sho.length;hIdx++) {var ho=sho[hIdx];var hole_unassigned=true;for(var s2Idx=0;s2Idx < newShapes.length;s2Idx++) {if(isPointInsidePolygon(ho.p,newShapes[s2Idx].p)){if(sIdx !== s2Idx)toChange.push({froms:sIdx,tos:s2Idx,hole:hIdx});if(hole_unassigned){hole_unassigned = false;betterShapeHoles[s2Idx].push(ho);}else {ambiguous = true;}}}if(hole_unassigned){betterShapeHoles[sIdx].push(ho);}}} // console.log("ambiguous: ", ambiguous);
	if(toChange.length > 0){ // console.log("to change: ", toChange);
	if(!ambiguous)newShapeHoles = betterShapeHoles;}}var tmpHoles,j,jl;for(i = 0,il = newShapes.length;i < il;i++) {tmpShape = newShapes[i].s;shapes.push(tmpShape);tmpHoles = newShapeHoles[i];for(j = 0,jl = tmpHoles.length;j < jl;j++) {tmpShape.holes.push(tmpHoles[j].h);}} //console.log("shape", shapes);
	return shapes;}; // File:src/extras/core/Shape.js
	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * Defines a 2d shape plane using paths.
	 **/ // STEP 1 Create a path.
	// STEP 2 Turn path into shape.
	// STEP 3 ExtrudeGeometry takes in Shape/Shapes
	// STEP 3a - Extract points from each shape, turn to vertices
	// STEP 3b - Triangulate each shape, add faces.
	THREE.Shape = function(){THREE.Path.apply(this,arguments);this.holes = [];};THREE.Shape.prototype = Object.create(THREE.Path.prototype);THREE.Shape.prototype.constructor = THREE.Shape; // Convenience method to return ExtrudeGeometry
	THREE.Shape.prototype.extrude = function(options){var extruded=new THREE.ExtrudeGeometry(this,options);return extruded;}; // Convenience method to return ShapeGeometry
	THREE.Shape.prototype.makeGeometry = function(options){var geometry=new THREE.ShapeGeometry(this,options);return geometry;}; // Get points of holes
	THREE.Shape.prototype.getPointsHoles = function(divisions){var i,il=this.holes.length,holesPts=[];for(i = 0;i < il;i++) {holesPts[i] = this.holes[i].getTransformedPoints(divisions,this.bends);}return holesPts;}; // Get points of holes (spaced by regular distance)
	THREE.Shape.prototype.getSpacedPointsHoles = function(divisions){var i,il=this.holes.length,holesPts=[];for(i = 0;i < il;i++) {holesPts[i] = this.holes[i].getTransformedSpacedPoints(divisions,this.bends);}return holesPts;}; // Get points of shape and holes (keypoints based on segments parameter)
	THREE.Shape.prototype.extractAllPoints = function(divisions){return {shape:this.getTransformedPoints(divisions),holes:this.getPointsHoles(divisions)};};THREE.Shape.prototype.extractPoints = function(divisions){if(this.useSpacedPoints){return this.extractAllSpacedPoints(divisions);}return this.extractAllPoints(divisions);}; //
	// THREE.Shape.prototype.extractAllPointsWithBend = function ( divisions, bend ) {
	//
	// 	return {
	//
	// 		shape: this.transform( bend, divisions ),
	// 		holes: this.getPointsHoles( divisions, bend )
	//
	// 	};
	//
	// };
	// Get points of shape and holes (spaced by regular distance)
	THREE.Shape.prototype.extractAllSpacedPoints = function(divisions){return {shape:this.getTransformedSpacedPoints(divisions),holes:this.getSpacedPointsHoles(divisions)};}; /**************************************************************
	 *	Utils
	 **************************************************************/THREE.Shape.Utils = {triangulateShape:function triangulateShape(contour,holes){function point_in_segment_2D_colin(inSegPt1,inSegPt2,inOtherPt){ // inOtherPt needs to be collinear to the inSegment
	if(inSegPt1.x !== inSegPt2.x){if(inSegPt1.x < inSegPt2.x){return inSegPt1.x <= inOtherPt.x && inOtherPt.x <= inSegPt2.x;}else {return inSegPt2.x <= inOtherPt.x && inOtherPt.x <= inSegPt1.x;}}else {if(inSegPt1.y < inSegPt2.y){return inSegPt1.y <= inOtherPt.y && inOtherPt.y <= inSegPt2.y;}else {return inSegPt2.y <= inOtherPt.y && inOtherPt.y <= inSegPt1.y;}}}function intersect_segments_2D(inSeg1Pt1,inSeg1Pt2,inSeg2Pt1,inSeg2Pt2,inExcludeAdjacentSegs){var EPSILON=0.0000000001;var seg1dx=inSeg1Pt2.x - inSeg1Pt1.x,seg1dy=inSeg1Pt2.y - inSeg1Pt1.y;var seg2dx=inSeg2Pt2.x - inSeg2Pt1.x,seg2dy=inSeg2Pt2.y - inSeg2Pt1.y;var seg1seg2dx=inSeg1Pt1.x - inSeg2Pt1.x;var seg1seg2dy=inSeg1Pt1.y - inSeg2Pt1.y;var limit=seg1dy * seg2dx - seg1dx * seg2dy;var perpSeg1=seg1dy * seg1seg2dx - seg1dx * seg1seg2dy;if(Math.abs(limit) > EPSILON){ // not parallel
	var perpSeg2;if(limit > 0){if(perpSeg1 < 0 || perpSeg1 > limit)return [];perpSeg2 = seg2dy * seg1seg2dx - seg2dx * seg1seg2dy;if(perpSeg2 < 0 || perpSeg2 > limit)return [];}else {if(perpSeg1 > 0 || perpSeg1 < limit)return [];perpSeg2 = seg2dy * seg1seg2dx - seg2dx * seg1seg2dy;if(perpSeg2 > 0 || perpSeg2 < limit)return [];} // i.e. to reduce rounding errors
	// intersection at endpoint of segment#1?
	if(perpSeg2 === 0){if(inExcludeAdjacentSegs && (perpSeg1 === 0 || perpSeg1 === limit))return [];return [inSeg1Pt1];}if(perpSeg2 === limit){if(inExcludeAdjacentSegs && (perpSeg1 === 0 || perpSeg1 === limit))return [];return [inSeg1Pt2];} // intersection at endpoint of segment#2?
	if(perpSeg1 === 0)return [inSeg2Pt1];if(perpSeg1 === limit)return [inSeg2Pt2]; // return real intersection point
	var factorSeg1=perpSeg2 / limit;return [{x:inSeg1Pt1.x + factorSeg1 * seg1dx,y:inSeg1Pt1.y + factorSeg1 * seg1dy}];}else { // parallel or collinear
	if(perpSeg1 !== 0 || seg2dy * seg1seg2dx !== seg2dx * seg1seg2dy)return []; // they are collinear or degenerate
	var seg1Pt=seg1dx === 0 && seg1dy === 0; // segment1 is just a point?
	var seg2Pt=seg2dx === 0 && seg2dy === 0; // segment2 is just a point?
	// both segments are points
	if(seg1Pt && seg2Pt){if(inSeg1Pt1.x !== inSeg2Pt1.x || inSeg1Pt1.y !== inSeg2Pt1.y)return []; // they are distinct  points
	return [inSeg1Pt1]; // they are the same point
	} // segment#1  is a single point
	if(seg1Pt){if(!point_in_segment_2D_colin(inSeg2Pt1,inSeg2Pt2,inSeg1Pt1))return []; // but not in segment#2
	return [inSeg1Pt1];} // segment#2  is a single point
	if(seg2Pt){if(!point_in_segment_2D_colin(inSeg1Pt1,inSeg1Pt2,inSeg2Pt1))return []; // but not in segment#1
	return [inSeg2Pt1];} // they are collinear segments, which might overlap
	var seg1min,seg1max,seg1minVal,seg1maxVal;var seg2min,seg2max,seg2minVal,seg2maxVal;if(seg1dx !== 0){ // the segments are NOT on a vertical line
	if(inSeg1Pt1.x < inSeg1Pt2.x){seg1min = inSeg1Pt1;seg1minVal = inSeg1Pt1.x;seg1max = inSeg1Pt2;seg1maxVal = inSeg1Pt2.x;}else {seg1min = inSeg1Pt2;seg1minVal = inSeg1Pt2.x;seg1max = inSeg1Pt1;seg1maxVal = inSeg1Pt1.x;}if(inSeg2Pt1.x < inSeg2Pt2.x){seg2min = inSeg2Pt1;seg2minVal = inSeg2Pt1.x;seg2max = inSeg2Pt2;seg2maxVal = inSeg2Pt2.x;}else {seg2min = inSeg2Pt2;seg2minVal = inSeg2Pt2.x;seg2max = inSeg2Pt1;seg2maxVal = inSeg2Pt1.x;}}else { // the segments are on a vertical line
	if(inSeg1Pt1.y < inSeg1Pt2.y){seg1min = inSeg1Pt1;seg1minVal = inSeg1Pt1.y;seg1max = inSeg1Pt2;seg1maxVal = inSeg1Pt2.y;}else {seg1min = inSeg1Pt2;seg1minVal = inSeg1Pt2.y;seg1max = inSeg1Pt1;seg1maxVal = inSeg1Pt1.y;}if(inSeg2Pt1.y < inSeg2Pt2.y){seg2min = inSeg2Pt1;seg2minVal = inSeg2Pt1.y;seg2max = inSeg2Pt2;seg2maxVal = inSeg2Pt2.y;}else {seg2min = inSeg2Pt2;seg2minVal = inSeg2Pt2.y;seg2max = inSeg2Pt1;seg2maxVal = inSeg2Pt1.y;}}if(seg1minVal <= seg2minVal){if(seg1maxVal < seg2minVal)return [];if(seg1maxVal === seg2minVal){if(inExcludeAdjacentSegs)return [];return [seg2min];}if(seg1maxVal <= seg2maxVal)return [seg2min,seg1max];return [seg2min,seg2max];}else {if(seg1minVal > seg2maxVal)return [];if(seg1minVal === seg2maxVal){if(inExcludeAdjacentSegs)return [];return [seg1min];}if(seg1maxVal <= seg2maxVal)return [seg1min,seg1max];return [seg1min,seg2max];}}}function isPointInsideAngle(inVertex,inLegFromPt,inLegToPt,inOtherPt){ // The order of legs is important
	var EPSILON=0.0000000001; // translation of all points, so that Vertex is at (0,0)
	var legFromPtX=inLegFromPt.x - inVertex.x,legFromPtY=inLegFromPt.y - inVertex.y;var legToPtX=inLegToPt.x - inVertex.x,legToPtY=inLegToPt.y - inVertex.y;var otherPtX=inOtherPt.x - inVertex.x,otherPtY=inOtherPt.y - inVertex.y; // main angle >0: < 180 deg.; 0: 180 deg.; <0: > 180 deg.
	var from2toAngle=legFromPtX * legToPtY - legFromPtY * legToPtX;var from2otherAngle=legFromPtX * otherPtY - legFromPtY * otherPtX;if(Math.abs(from2toAngle) > EPSILON){ // angle != 180 deg.
	var other2toAngle=otherPtX * legToPtY - otherPtY * legToPtX; // console.log( "from2to: " + from2toAngle + ", from2other: " + from2otherAngle + ", other2to: " + other2toAngle );
	if(from2toAngle > 0){ // main angle < 180 deg.
	return from2otherAngle >= 0 && other2toAngle >= 0;}else { // main angle > 180 deg.
	return from2otherAngle >= 0 || other2toAngle >= 0;}}else { // angle == 180 deg.
	// console.log( "from2to: 180 deg., from2other: " + from2otherAngle  );
	return from2otherAngle > 0;}}function removeHoles(contour,holes){var shape=contour.concat(); // work on this shape
	var hole;function isCutLineInsideAngles(inShapeIdx,inHoleIdx){ // Check if hole point lies within angle around shape point
	var lastShapeIdx=shape.length - 1;var prevShapeIdx=inShapeIdx - 1;if(prevShapeIdx < 0)prevShapeIdx = lastShapeIdx;var nextShapeIdx=inShapeIdx + 1;if(nextShapeIdx > lastShapeIdx)nextShapeIdx = 0;var insideAngle=isPointInsideAngle(shape[inShapeIdx],shape[prevShapeIdx],shape[nextShapeIdx],hole[inHoleIdx]);if(!insideAngle){ // console.log( "Vertex (Shape): " + inShapeIdx + ", Point: " + hole[inHoleIdx].x + "/" + hole[inHoleIdx].y );
	return false;} // Check if shape point lies within angle around hole point
	var lastHoleIdx=hole.length - 1;var prevHoleIdx=inHoleIdx - 1;if(prevHoleIdx < 0)prevHoleIdx = lastHoleIdx;var nextHoleIdx=inHoleIdx + 1;if(nextHoleIdx > lastHoleIdx)nextHoleIdx = 0;insideAngle = isPointInsideAngle(hole[inHoleIdx],hole[prevHoleIdx],hole[nextHoleIdx],shape[inShapeIdx]);if(!insideAngle){ // console.log( "Vertex (Hole): " + inHoleIdx + ", Point: " + shape[inShapeIdx].x + "/" + shape[inShapeIdx].y );
	return false;}return true;}function intersectsShapeEdge(inShapePt,inHolePt){ // checks for intersections with shape edges
	var sIdx,nextIdx,intersection;for(sIdx = 0;sIdx < shape.length;sIdx++) {nextIdx = sIdx + 1;nextIdx %= shape.length;intersection = intersect_segments_2D(inShapePt,inHolePt,shape[sIdx],shape[nextIdx],true);if(intersection.length > 0)return true;}return false;}var indepHoles=[];function intersectsHoleEdge(inShapePt,inHolePt){ // checks for intersections with hole edges
	var ihIdx,chkHole,hIdx,nextIdx,intersection;for(ihIdx = 0;ihIdx < indepHoles.length;ihIdx++) {chkHole = holes[indepHoles[ihIdx]];for(hIdx = 0;hIdx < chkHole.length;hIdx++) {nextIdx = hIdx + 1;nextIdx %= chkHole.length;intersection = intersect_segments_2D(inShapePt,inHolePt,chkHole[hIdx],chkHole[nextIdx],true);if(intersection.length > 0)return true;}}return false;}var holeIndex,shapeIndex,shapePt,holePt,holeIdx,cutKey,failedCuts=[],tmpShape1,tmpShape2,tmpHole1,tmpHole2;for(var h=0,hl=holes.length;h < hl;h++) {indepHoles.push(h);}var minShapeIndex=0;var counter=indepHoles.length * 2;while(indepHoles.length > 0) {counter--;if(counter < 0){console.log("Infinite Loop! Holes left:" + indepHoles.length + ", Probably Hole outside Shape!");break;} // search for shape-vertex and hole-vertex,
	// which can be connected without intersections
	for(shapeIndex = minShapeIndex;shapeIndex < shape.length;shapeIndex++) {shapePt = shape[shapeIndex];holeIndex = -1; // search for hole which can be reached without intersections
	for(var h=0;h < indepHoles.length;h++) {holeIdx = indepHoles[h]; // prevent multiple checks
	cutKey = shapePt.x + ":" + shapePt.y + ":" + holeIdx;if(failedCuts[cutKey] !== undefined)continue;hole = holes[holeIdx];for(var h2=0;h2 < hole.length;h2++) {holePt = hole[h2];if(!isCutLineInsideAngles(shapeIndex,h2))continue;if(intersectsShapeEdge(shapePt,holePt))continue;if(intersectsHoleEdge(shapePt,holePt))continue;holeIndex = h2;indepHoles.splice(h,1);tmpShape1 = shape.slice(0,shapeIndex + 1);tmpShape2 = shape.slice(shapeIndex);tmpHole1 = hole.slice(holeIndex);tmpHole2 = hole.slice(0,holeIndex + 1);shape = tmpShape1.concat(tmpHole1).concat(tmpHole2).concat(tmpShape2);minShapeIndex = shapeIndex; // Debug only, to show the selected cuts
	// glob_CutLines.push( [ shapePt, holePt ] );
	break;}if(holeIndex >= 0)break; // hole-vertex found
	failedCuts[cutKey] = true; // remember failure
	}if(holeIndex >= 0)break; // hole-vertex found
	}}return shape; /* shape with no holes */}var i,il,f,face,key,index,allPointsMap={}; // To maintain reference to old shape, one must match coordinates, or offset the indices from original arrays. It's probably easier to do the first.
	var allpoints=contour.concat();for(var h=0,hl=holes.length;h < hl;h++) {Array.prototype.push.apply(allpoints,holes[h]);} //console.log( "allpoints",allpoints, allpoints.length );
	// prepare all points map
	for(i = 0,il = allpoints.length;i < il;i++) {key = allpoints[i].x + ":" + allpoints[i].y;if(allPointsMap[key] !== undefined){console.warn("THREE.Shape: Duplicate point",key);}allPointsMap[key] = i;} // remove holes by cutting paths to holes and adding them to the shape
	var shapeWithoutHoles=removeHoles(contour,holes);var triangles=THREE.FontUtils.Triangulate(shapeWithoutHoles,false); // True returns indices for points of spooled shape
	//console.log( "triangles",triangles, triangles.length );
	// check all face vertices against all points map
	for(i = 0,il = triangles.length;i < il;i++) {face = triangles[i];for(f = 0;f < 3;f++) {key = face[f].x + ":" + face[f].y;index = allPointsMap[key];if(index !== undefined){face[f] = index;}}}return triangles.concat();},isClockWise:function isClockWise(pts){return THREE.FontUtils.Triangulate.area(pts) < 0;}, // Bezier Curves formulas obtained from
	// http://en.wikipedia.org/wiki/B%C3%A9zier_curve
	// Quad Bezier Functions
	b2p0:function b2p0(t,p){var k=1 - t;return k * k * p;},b2p1:function b2p1(t,p){return 2 * (1 - t) * t * p;},b2p2:function b2p2(t,p){return t * t * p;},b2:function b2(t,p0,p1,p2){return this.b2p0(t,p0) + this.b2p1(t,p1) + this.b2p2(t,p2);}, // Cubic Bezier Functions
	b3p0:function b3p0(t,p){var k=1 - t;return k * k * k * p;},b3p1:function b3p1(t,p){var k=1 - t;return 3 * k * k * t * p;},b3p2:function b3p2(t,p){var k=1 - t;return 3 * k * t * t * p;},b3p3:function b3p3(t,p){return t * t * t * p;},b3:function b3(t,p0,p1,p2,p3){return this.b3p0(t,p0) + this.b3p1(t,p1) + this.b3p2(t,p2) + this.b3p3(t,p3);}}; // File:src/extras/curves/LineCurve.js
	/**************************************************************
	 *	Line
	 **************************************************************/THREE.LineCurve = function(v1,v2){this.v1 = v1;this.v2 = v2;};THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);THREE.LineCurve.prototype.constructor = THREE.LineCurve;THREE.LineCurve.prototype.getPoint = function(t){var point=this.v2.clone().sub(this.v1);point.multiplyScalar(t).add(this.v1);return point;}; // Line curve is linear, so we can overwrite default getPointAt
	THREE.LineCurve.prototype.getPointAt = function(u){return this.getPoint(u);};THREE.LineCurve.prototype.getTangent = function(t){var tangent=this.v2.clone().sub(this.v1);return tangent.normalize();}; // File:src/extras/curves/QuadraticBezierCurve.js
	/**************************************************************
	 *	Quadratic Bezier curve
	 **************************************************************/THREE.QuadraticBezierCurve = function(v0,v1,v2){this.v0 = v0;this.v1 = v1;this.v2 = v2;};THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve;THREE.QuadraticBezierCurve.prototype.getPoint = function(t){var vector=new THREE.Vector2();vector.x = THREE.Shape.Utils.b2(t,this.v0.x,this.v1.x,this.v2.x);vector.y = THREE.Shape.Utils.b2(t,this.v0.y,this.v1.y,this.v2.y);return vector;};THREE.QuadraticBezierCurve.prototype.getTangent = function(t){var vector=new THREE.Vector2();vector.x = THREE.Curve.Utils.tangentQuadraticBezier(t,this.v0.x,this.v1.x,this.v2.x);vector.y = THREE.Curve.Utils.tangentQuadraticBezier(t,this.v0.y,this.v1.y,this.v2.y); // returns unit vector
	return vector.normalize();}; // File:src/extras/curves/CubicBezierCurve.js
	/**************************************************************
	 *	Cubic Bezier curve
	 **************************************************************/THREE.CubicBezierCurve = function(v0,v1,v2,v3){this.v0 = v0;this.v1 = v1;this.v2 = v2;this.v3 = v3;};THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve;THREE.CubicBezierCurve.prototype.getPoint = function(t){var tx,ty;tx = THREE.Shape.Utils.b3(t,this.v0.x,this.v1.x,this.v2.x,this.v3.x);ty = THREE.Shape.Utils.b3(t,this.v0.y,this.v1.y,this.v2.y,this.v3.y);return new THREE.Vector2(tx,ty);};THREE.CubicBezierCurve.prototype.getTangent = function(t){var tx,ty;tx = THREE.Curve.Utils.tangentCubicBezier(t,this.v0.x,this.v1.x,this.v2.x,this.v3.x);ty = THREE.Curve.Utils.tangentCubicBezier(t,this.v0.y,this.v1.y,this.v2.y,this.v3.y);var tangent=new THREE.Vector2(tx,ty);tangent.normalize();return tangent;}; // File:src/extras/curves/SplineCurve.js
	/**************************************************************
	 *	Spline curve
	 **************************************************************/THREE.SplineCurve = function(points /* array of Vector2 */){this.points = points == undefined?[]:points;};THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);THREE.SplineCurve.prototype.constructor = THREE.SplineCurve;THREE.SplineCurve.prototype.getPoint = function(t){var points=this.points;var point=(points.length - 1) * t;var intPoint=Math.floor(point);var weight=point - intPoint;var point0=points[intPoint === 0?intPoint:intPoint - 1];var point1=points[intPoint];var point2=points[intPoint > points.length - 2?points.length - 1:intPoint + 1];var point3=points[intPoint > points.length - 3?points.length - 1:intPoint + 2];var vector=new THREE.Vector2();vector.x = THREE.Curve.Utils.interpolate(point0.x,point1.x,point2.x,point3.x,weight);vector.y = THREE.Curve.Utils.interpolate(point0.y,point1.y,point2.y,point3.y,weight);return vector;}; // File:src/extras/curves/EllipseCurve.js
	/**************************************************************
	 *	Ellipse curve
	 **************************************************************/THREE.EllipseCurve = function(aX,aY,xRadius,yRadius,aStartAngle,aEndAngle,aClockwise,aRotation){this.aX = aX;this.aY = aY;this.xRadius = xRadius;this.yRadius = yRadius;this.aStartAngle = aStartAngle;this.aEndAngle = aEndAngle;this.aClockwise = aClockwise;this.aRotation = aRotation || 0;};THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);THREE.EllipseCurve.prototype.constructor = THREE.EllipseCurve;THREE.EllipseCurve.prototype.getPoint = function(t){var deltaAngle=this.aEndAngle - this.aStartAngle;if(deltaAngle < 0)deltaAngle += Math.PI * 2;if(deltaAngle > Math.PI * 2)deltaAngle -= Math.PI * 2;var angle;if(this.aClockwise === true){angle = this.aEndAngle + (1 - t) * (Math.PI * 2 - deltaAngle);}else {angle = this.aStartAngle + t * deltaAngle;}var x=this.aX + this.xRadius * Math.cos(angle);var y=this.aY + this.yRadius * Math.sin(angle);if(this.aRotation !== 0){var cos=Math.cos(this.aRotation);var sin=Math.sin(this.aRotation);var tx=x,ty=y; // Rotate the point about the center of the ellipse.
	x = (tx - this.aX) * cos - (ty - this.aY) * sin + this.aX;y = (tx - this.aX) * sin + (ty - this.aY) * cos + this.aY;}return new THREE.Vector2(x,y);}; // File:src/extras/curves/ArcCurve.js
	/**************************************************************
	 *	Arc curve
	 **************************************************************/THREE.ArcCurve = function(aX,aY,aRadius,aStartAngle,aEndAngle,aClockwise){THREE.EllipseCurve.call(this,aX,aY,aRadius,aRadius,aStartAngle,aEndAngle,aClockwise);};THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);THREE.ArcCurve.prototype.constructor = THREE.ArcCurve; // File:src/extras/curves/LineCurve3.js
	/**************************************************************
	 *	Line3D
	 **************************************************************/THREE.LineCurve3 = THREE.Curve.create(function(v1,v2){this.v1 = v1;this.v2 = v2;},function(t){var vector=new THREE.Vector3();vector.subVectors(this.v2,this.v1); // diff
	vector.multiplyScalar(t);vector.add(this.v1);return vector;}); // File:src/extras/curves/QuadraticBezierCurve3.js
	/**************************************************************
	 *	Quadratic Bezier 3D curve
	 **************************************************************/THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(v0,v1,v2){this.v0 = v0;this.v1 = v1;this.v2 = v2;},function(t){var vector=new THREE.Vector3();vector.x = THREE.Shape.Utils.b2(t,this.v0.x,this.v1.x,this.v2.x);vector.y = THREE.Shape.Utils.b2(t,this.v0.y,this.v1.y,this.v2.y);vector.z = THREE.Shape.Utils.b2(t,this.v0.z,this.v1.z,this.v2.z);return vector;}); // File:src/extras/curves/CubicBezierCurve3.js
	/**************************************************************
	 *	Cubic Bezier 3D curve
	 **************************************************************/THREE.CubicBezierCurve3 = THREE.Curve.create(function(v0,v1,v2,v3){this.v0 = v0;this.v1 = v1;this.v2 = v2;this.v3 = v3;},function(t){var vector=new THREE.Vector3();vector.x = THREE.Shape.Utils.b3(t,this.v0.x,this.v1.x,this.v2.x,this.v3.x);vector.y = THREE.Shape.Utils.b3(t,this.v0.y,this.v1.y,this.v2.y,this.v3.y);vector.z = THREE.Shape.Utils.b3(t,this.v0.z,this.v1.z,this.v2.z,this.v3.z);return vector;}); // File:src/extras/curves/SplineCurve3.js
	/**************************************************************
	 *	Spline 3D curve
	 **************************************************************/THREE.SplineCurve3 = THREE.Curve.create(function(points /* array of Vector3 */){console.warn('THREE.SplineCurve3 will be deprecated. Please use THREE.CatmullRomCurve3');this.points = points == undefined?[]:points;},function(t){var points=this.points;var point=(points.length - 1) * t;var intPoint=Math.floor(point);var weight=point - intPoint;var point0=points[intPoint == 0?intPoint:intPoint - 1];var point1=points[intPoint];var point2=points[intPoint > points.length - 2?points.length - 1:intPoint + 1];var point3=points[intPoint > points.length - 3?points.length - 1:intPoint + 2];var vector=new THREE.Vector3();vector.x = THREE.Curve.Utils.interpolate(point0.x,point1.x,point2.x,point3.x,weight);vector.y = THREE.Curve.Utils.interpolate(point0.y,point1.y,point2.y,point3.y,weight);vector.z = THREE.Curve.Utils.interpolate(point0.z,point1.z,point2.z,point3.z,weight);return vector;}); // File:src/extras/curves/CatmullRomCurve3.js
	/**
	 * @author zz85 https://github.com/zz85
	 *
	 * Centripetal CatmullRom Curve - which is useful for avoiding
	 * cusps and self-intersections in non-uniform catmull rom curves.
	 * http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf
	 *
	 * curve.type accepts centripetal(default), chordal and catmullrom
	 * curve.tension is used for catmullrom which defaults to 0.5
	 */THREE.CatmullRomCurve3 = (function(){var tmp=new THREE.Vector3(),px=new CubicPoly(),py=new CubicPoly(),pz=new CubicPoly(); /*
		Based on an optimized c++ solution in
		 - http://stackoverflow.com/questions/9489736/catmull-rom-curve-with-no-cusps-and-no-self-intersections/
		 - http://ideone.com/NoEbVM

		This CubicPoly class could be used for reusing some variables and calculations,
		but for three.js curve use, it could be possible inlined and flatten into a single function call
		which can be placed in CurveUtils.
		*/function CubicPoly(){} /*
		 * Compute coefficients for a cubic polynomial
		 *   p(s) = c0 + c1*s + c2*s^2 + c3*s^3
		 * such that
		 *   p(0) = x0, p(1) = x1
		 *  and
		 *   p'(0) = t0, p'(1) = t1.
		 */CubicPoly.prototype.init = function(x0,x1,t0,t1){this.c0 = x0;this.c1 = t0;this.c2 = -3 * x0 + 3 * x1 - 2 * t0 - t1;this.c3 = 2 * x0 - 2 * x1 + t0 + t1;};CubicPoly.prototype.initNonuniformCatmullRom = function(x0,x1,x2,x3,dt0,dt1,dt2){ // compute tangents when parameterized in [t1,t2]
	var t1=(x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;var t2=(x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2; // rescale tangents for parametrization in [0,1]
	t1 *= dt1;t2 *= dt1; // initCubicPoly
	this.init(x1,x2,t1,t2);}; // standard Catmull-Rom spline: interpolate between x1 and x2 with previous/following points x1/x4
	CubicPoly.prototype.initCatmullRom = function(x0,x1,x2,x3,tension){this.init(x1,x2,tension * (x2 - x0),tension * (x3 - x1));};CubicPoly.prototype.calc = function(t){var t2=t * t;var t3=t2 * t;return this.c0 + this.c1 * t + this.c2 * t2 + this.c3 * t3;}; // Subclass Three.js curve
	return THREE.Curve.create(function(p /* array of Vector3 */){this.points = p || [];},function(t){var points=this.points,point,intPoint,weight,l;l = points.length;if(l < 2)console.log('duh, you need at least 2 points');point = (l - 1) * t;intPoint = Math.floor(point);weight = point - intPoint;if(weight === 0 && intPoint === l - 1){intPoint = l - 2;weight = 1;}var p0,p1,p2,p3;if(intPoint === 0){ // extrapolate first point
	tmp.subVectors(points[0],points[1]).add(points[0]);p0 = tmp;}else {p0 = points[intPoint - 1];}p1 = points[intPoint];p2 = points[intPoint + 1];if(intPoint + 2 < l){p3 = points[intPoint + 2];}else { // extrapolate last point
	tmp.subVectors(points[l - 1],points[l - 2]).add(points[l - 2]);p3 = tmp;}if(this.type === undefined || this.type === 'centripetal' || this.type === 'chordal'){ // init Centripetal / Chordal Catmull-Rom
	var pow=this.type === 'chordal'?0.5:0.25;var dt0=Math.pow(p0.distanceToSquared(p1),pow);var dt1=Math.pow(p1.distanceToSquared(p2),pow);var dt2=Math.pow(p2.distanceToSquared(p3),pow); // safety check for repeated points
	if(dt1 < 1e-4)dt1 = 1.0;if(dt0 < 1e-4)dt0 = dt1;if(dt2 < 1e-4)dt2 = dt1;px.initNonuniformCatmullRom(p0.x,p1.x,p2.x,p3.x,dt0,dt1,dt2);py.initNonuniformCatmullRom(p0.y,p1.y,p2.y,p3.y,dt0,dt1,dt2);pz.initNonuniformCatmullRom(p0.z,p1.z,p2.z,p3.z,dt0,dt1,dt2);}else if(this.type === 'catmullrom'){var tension=this.tension !== undefined?this.tension:0.5;px.initCatmullRom(p0.x,p1.x,p2.x,p3.x,tension);py.initCatmullRom(p0.y,p1.y,p2.y,p3.y,tension);pz.initCatmullRom(p0.z,p1.z,p2.z,p3.z,tension);}var v=new THREE.Vector3(px.calc(weight),py.calc(weight),pz.calc(weight));return v;});})(); // File:src/extras/curves/ClosedSplineCurve3.js
	/**************************************************************
	 *	Closed Spline 3D curve
	 **************************************************************/THREE.ClosedSplineCurve3 = THREE.Curve.create(function(points /* array of Vector3 */){this.points = points == undefined?[]:points;},function(t){var points=this.points;var point=(points.length - 0) * t; // This needs to be from 0-length +1
	var intPoint=Math.floor(point);var weight=point - intPoint;intPoint += intPoint > 0?0:(Math.floor(Math.abs(intPoint) / points.length) + 1) * points.length;var point0=points[(intPoint - 1) % points.length];var point1=points[intPoint % points.length];var point2=points[(intPoint + 1) % points.length];var point3=points[(intPoint + 2) % points.length];var vector=new THREE.Vector3();vector.x = THREE.Curve.Utils.interpolate(point0.x,point1.x,point2.x,point3.x,weight);vector.y = THREE.Curve.Utils.interpolate(point0.y,point1.y,point2.y,point3.y,weight);vector.z = THREE.Curve.Utils.interpolate(point0.z,point1.z,point2.z,point3.z,weight);return vector;}); // File:src/extras/animation/AnimationHandler.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 */THREE.AnimationHandler = {LINEAR:0,CATMULLROM:1,CATMULLROM_FORWARD:2, //
	add:function add(){console.warn('THREE.AnimationHandler.add() has been deprecated.');},get:function get(){console.warn('THREE.AnimationHandler.get() has been deprecated.');},remove:function remove(){console.warn('THREE.AnimationHandler.remove() has been deprecated.');}, //
	animations:[],init:function init(data){if(data.initialized === true)return data; // loop through all keys
	for(var h=0;h < data.hierarchy.length;h++) {for(var k=0;k < data.hierarchy[h].keys.length;k++) { // remove minus times
	if(data.hierarchy[h].keys[k].time < 0){data.hierarchy[h].keys[k].time = 0;} // create quaternions
	if(data.hierarchy[h].keys[k].rot !== undefined && !(data.hierarchy[h].keys[k].rot instanceof THREE.Quaternion)){var quat=data.hierarchy[h].keys[k].rot;data.hierarchy[h].keys[k].rot = new THREE.Quaternion().fromArray(quat);}} // prepare morph target keys
	if(data.hierarchy[h].keys.length && data.hierarchy[h].keys[0].morphTargets !== undefined){ // get all used
	var usedMorphTargets={};for(var k=0;k < data.hierarchy[h].keys.length;k++) {for(var m=0;m < data.hierarchy[h].keys[k].morphTargets.length;m++) {var morphTargetName=data.hierarchy[h].keys[k].morphTargets[m];usedMorphTargets[morphTargetName] = -1;}}data.hierarchy[h].usedMorphTargets = usedMorphTargets; // set all used on all frames
	for(var k=0;k < data.hierarchy[h].keys.length;k++) {var influences={};for(var morphTargetName in usedMorphTargets) {for(var m=0;m < data.hierarchy[h].keys[k].morphTargets.length;m++) {if(data.hierarchy[h].keys[k].morphTargets[m] === morphTargetName){influences[morphTargetName] = data.hierarchy[h].keys[k].morphTargetsInfluences[m];break;}}if(m === data.hierarchy[h].keys[k].morphTargets.length){influences[morphTargetName] = 0;}}data.hierarchy[h].keys[k].morphTargetsInfluences = influences;}} // remove all keys that are on the same time
	for(var k=1;k < data.hierarchy[h].keys.length;k++) {if(data.hierarchy[h].keys[k].time === data.hierarchy[h].keys[k - 1].time){data.hierarchy[h].keys.splice(k,1);k--;}} // set index
	for(var k=0;k < data.hierarchy[h].keys.length;k++) {data.hierarchy[h].keys[k].index = k;}}data.initialized = true;return data;},parse:function parse(root){var parseRecurseHierarchy=function parseRecurseHierarchy(root,hierarchy){hierarchy.push(root);for(var c=0;c < root.children.length;c++) parseRecurseHierarchy(root.children[c],hierarchy);}; // setup hierarchy
	var hierarchy=[];if(root instanceof THREE.SkinnedMesh){for(var b=0;b < root.skeleton.bones.length;b++) {hierarchy.push(root.skeleton.bones[b]);}}else {parseRecurseHierarchy(root,hierarchy);}return hierarchy;},play:function play(animation){if(this.animations.indexOf(animation) === -1){this.animations.push(animation);}},stop:function stop(animation){var index=this.animations.indexOf(animation);if(index !== -1){this.animations.splice(index,1);}},update:function update(deltaTimeMS){for(var i=0;i < this.animations.length;i++) {this.animations[i].resetBlendWeights();}for(var i=0;i < this.animations.length;i++) {this.animations[i].update(deltaTimeMS);}}}; // File:src/extras/animation/Animation.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.Animation = function(root,data){this.root = root;this.data = THREE.AnimationHandler.init(data);this.hierarchy = THREE.AnimationHandler.parse(root);this.currentTime = 0;this.timeScale = 1;this.isPlaying = false;this.loop = true;this.weight = 0;this.interpolationType = THREE.AnimationHandler.LINEAR;};THREE.Animation.prototype = {constructor:THREE.Animation,keyTypes:["pos","rot","scl"],play:function play(startTime,weight){this.currentTime = startTime !== undefined?startTime:0;this.weight = weight !== undefined?weight:1;this.isPlaying = true;this.reset();THREE.AnimationHandler.play(this);},stop:function stop(){this.isPlaying = false;THREE.AnimationHandler.stop(this);},reset:function reset(){for(var h=0,hl=this.hierarchy.length;h < hl;h++) {var object=this.hierarchy[h];if(object.animationCache === undefined){object.animationCache = {animations:{},blending:{positionWeight:0.0,quaternionWeight:0.0,scaleWeight:0.0}};}var name=this.data.name;var animations=object.animationCache.animations;var animationCache=animations[name];if(animationCache === undefined){animationCache = {prevKey:{pos:0,rot:0,scl:0},nextKey:{pos:0,rot:0,scl:0},originalMatrix:object.matrix};animations[name] = animationCache;} // Get keys to match our current time
	for(var t=0;t < 3;t++) {var type=this.keyTypes[t];var prevKey=this.data.hierarchy[h].keys[0];var nextKey=this.getNextKeyWith(type,h,1);while(nextKey.time < this.currentTime && nextKey.index > prevKey.index) {prevKey = nextKey;nextKey = this.getNextKeyWith(type,h,nextKey.index + 1);}animationCache.prevKey[type] = prevKey;animationCache.nextKey[type] = nextKey;}}},resetBlendWeights:function resetBlendWeights(){for(var h=0,hl=this.hierarchy.length;h < hl;h++) {var object=this.hierarchy[h];var animationCache=object.animationCache;if(animationCache !== undefined){var blending=animationCache.blending;blending.positionWeight = 0.0;blending.quaternionWeight = 0.0;blending.scaleWeight = 0.0;}}},update:(function(){var points=[];var target=new THREE.Vector3();var newVector=new THREE.Vector3();var newQuat=new THREE.Quaternion(); // Catmull-Rom spline
	var interpolateCatmullRom=function interpolateCatmullRom(points,scale){var c=[],v3=[],point,intPoint,weight,w2,w3,pa,pb,pc,pd;point = (points.length - 1) * scale;intPoint = Math.floor(point);weight = point - intPoint;c[0] = intPoint === 0?intPoint:intPoint - 1;c[1] = intPoint;c[2] = intPoint > points.length - 2?intPoint:intPoint + 1;c[3] = intPoint > points.length - 3?intPoint:intPoint + 2;pa = points[c[0]];pb = points[c[1]];pc = points[c[2]];pd = points[c[3]];w2 = weight * weight;w3 = weight * w2;v3[0] = interpolate(pa[0],pb[0],pc[0],pd[0],weight,w2,w3);v3[1] = interpolate(pa[1],pb[1],pc[1],pd[1],weight,w2,w3);v3[2] = interpolate(pa[2],pb[2],pc[2],pd[2],weight,w2,w3);return v3;};var interpolate=function interpolate(p0,p1,p2,p3,t,t2,t3){var v0=(p2 - p0) * 0.5,v1=(p3 - p1) * 0.5;return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;};return function(delta){if(this.isPlaying === false)return;this.currentTime += delta * this.timeScale;if(this.weight === 0)return; //
	var duration=this.data.length;if(this.currentTime > duration || this.currentTime < 0){if(this.loop){this.currentTime %= duration;if(this.currentTime < 0)this.currentTime += duration;this.reset();}else {this.stop();}}for(var h=0,hl=this.hierarchy.length;h < hl;h++) {var object=this.hierarchy[h];var animationCache=object.animationCache.animations[this.data.name];var blending=object.animationCache.blending; // loop through pos/rot/scl
	for(var t=0;t < 3;t++) { // get keys
	var type=this.keyTypes[t];var prevKey=animationCache.prevKey[type];var nextKey=animationCache.nextKey[type];if(this.timeScale > 0 && nextKey.time <= this.currentTime || this.timeScale < 0 && prevKey.time >= this.currentTime){prevKey = this.data.hierarchy[h].keys[0];nextKey = this.getNextKeyWith(type,h,1);while(nextKey.time < this.currentTime && nextKey.index > prevKey.index) {prevKey = nextKey;nextKey = this.getNextKeyWith(type,h,nextKey.index + 1);}animationCache.prevKey[type] = prevKey;animationCache.nextKey[type] = nextKey;}var scale=(this.currentTime - prevKey.time) / (nextKey.time - prevKey.time);var prevXYZ=prevKey[type];var nextXYZ=nextKey[type];if(scale < 0)scale = 0;if(scale > 1)scale = 1; // interpolate
	if(type === "pos"){if(this.interpolationType === THREE.AnimationHandler.LINEAR){newVector.x = prevXYZ[0] + (nextXYZ[0] - prevXYZ[0]) * scale;newVector.y = prevXYZ[1] + (nextXYZ[1] - prevXYZ[1]) * scale;newVector.z = prevXYZ[2] + (nextXYZ[2] - prevXYZ[2]) * scale; // blend
	var proportionalWeight=this.weight / (this.weight + blending.positionWeight);object.position.lerp(newVector,proportionalWeight);blending.positionWeight += this.weight;}else if(this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD){points[0] = this.getPrevKeyWith("pos",h,prevKey.index - 1)["pos"];points[1] = prevXYZ;points[2] = nextXYZ;points[3] = this.getNextKeyWith("pos",h,nextKey.index + 1)["pos"];scale = scale * 0.33 + 0.33;var currentPoint=interpolateCatmullRom(points,scale);var proportionalWeight=this.weight / (this.weight + blending.positionWeight);blending.positionWeight += this.weight; // blend
	var vector=object.position;vector.x = vector.x + (currentPoint[0] - vector.x) * proportionalWeight;vector.y = vector.y + (currentPoint[1] - vector.y) * proportionalWeight;vector.z = vector.z + (currentPoint[2] - vector.z) * proportionalWeight;if(this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD){var forwardPoint=interpolateCatmullRom(points,scale * 1.01);target.set(forwardPoint[0],forwardPoint[1],forwardPoint[2]);target.sub(vector);target.y = 0;target.normalize();var angle=Math.atan2(target.x,target.z);object.rotation.set(0,angle,0);}}}else if(type === "rot"){THREE.Quaternion.slerp(prevXYZ,nextXYZ,newQuat,scale); // Avoid paying the cost of an additional slerp if we don't have to
	if(blending.quaternionWeight === 0){object.quaternion.copy(newQuat);blending.quaternionWeight = this.weight;}else {var proportionalWeight=this.weight / (this.weight + blending.quaternionWeight);THREE.Quaternion.slerp(object.quaternion,newQuat,object.quaternion,proportionalWeight);blending.quaternionWeight += this.weight;}}else if(type === "scl"){newVector.x = prevXYZ[0] + (nextXYZ[0] - prevXYZ[0]) * scale;newVector.y = prevXYZ[1] + (nextXYZ[1] - prevXYZ[1]) * scale;newVector.z = prevXYZ[2] + (nextXYZ[2] - prevXYZ[2]) * scale;var proportionalWeight=this.weight / (this.weight + blending.scaleWeight);object.scale.lerp(newVector,proportionalWeight);blending.scaleWeight += this.weight;}}}return true;};})(),getNextKeyWith:function getNextKeyWith(type,h,key){var keys=this.data.hierarchy[h].keys;if(this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD){key = key < keys.length - 1?key:keys.length - 1;}else {key = key % keys.length;}for(;key < keys.length;key++) {if(keys[key][type] !== undefined){return keys[key];}}return this.data.hierarchy[h].keys[0];},getPrevKeyWith:function getPrevKeyWith(type,h,key){var keys=this.data.hierarchy[h].keys;if(this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD){key = key > 0?key:0;}else {key = key >= 0?key:key + keys.length;}for(;key >= 0;key--) {if(keys[key][type] !== undefined){return keys[key];}}return this.data.hierarchy[h].keys[keys.length - 1];}}; // File:src/extras/animation/KeyFrameAnimation.js
	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author khang duong
	 * @author erik kitson
	 */THREE.KeyFrameAnimation = function(data){this.root = data.node;this.data = THREE.AnimationHandler.init(data);this.hierarchy = THREE.AnimationHandler.parse(this.root);this.currentTime = 0;this.timeScale = 0.001;this.isPlaying = false;this.isPaused = true;this.loop = true; // initialize to first keyframes
	for(var h=0,hl=this.hierarchy.length;h < hl;h++) {var keys=this.data.hierarchy[h].keys,sids=this.data.hierarchy[h].sids,obj=this.hierarchy[h];if(keys.length && sids){for(var s=0;s < sids.length;s++) {var sid=sids[s],next=this.getNextKeyWith(sid,h,0);if(next){next.apply(sid);}}obj.matrixAutoUpdate = false;this.data.hierarchy[h].node.updateMatrix();obj.matrixWorldNeedsUpdate = true;}}};THREE.KeyFrameAnimation.prototype = {constructor:THREE.KeyFrameAnimation,play:function play(startTime){this.currentTime = startTime !== undefined?startTime:0;if(this.isPlaying === false){this.isPlaying = true; // reset key cache
	var h,hl=this.hierarchy.length,object,node;for(h = 0;h < hl;h++) {object = this.hierarchy[h];node = this.data.hierarchy[h];if(node.animationCache === undefined){node.animationCache = {};node.animationCache.prevKey = null;node.animationCache.nextKey = null;node.animationCache.originalMatrix = object.matrix;}var keys=this.data.hierarchy[h].keys;if(keys.length){node.animationCache.prevKey = keys[0];node.animationCache.nextKey = keys[1];this.startTime = Math.min(keys[0].time,this.startTime);this.endTime = Math.max(keys[keys.length - 1].time,this.endTime);}}this.update(0);}this.isPaused = false;THREE.AnimationHandler.play(this);},stop:function stop(){this.isPlaying = false;this.isPaused = false;THREE.AnimationHandler.stop(this); // reset JIT matrix and remove cache
	for(var h=0;h < this.data.hierarchy.length;h++) {var obj=this.hierarchy[h];var node=this.data.hierarchy[h];if(node.animationCache !== undefined){var original=node.animationCache.originalMatrix;original.copy(obj.matrix);obj.matrix = original;delete node.animationCache;}}},update:function update(delta){if(this.isPlaying === false)return;this.currentTime += delta * this.timeScale; //
	var duration=this.data.length;if(this.loop === true && this.currentTime > duration){this.currentTime %= duration;}this.currentTime = Math.min(this.currentTime,duration);for(var h=0,hl=this.hierarchy.length;h < hl;h++) {var object=this.hierarchy[h];var node=this.data.hierarchy[h];var keys=node.keys,animationCache=node.animationCache;if(keys.length){var prevKey=animationCache.prevKey;var nextKey=animationCache.nextKey;if(nextKey.time <= this.currentTime){while(nextKey.time < this.currentTime && nextKey.index > prevKey.index) {prevKey = nextKey;nextKey = keys[prevKey.index + 1];}animationCache.prevKey = prevKey;animationCache.nextKey = nextKey;}if(nextKey.time >= this.currentTime){prevKey.interpolate(nextKey,this.currentTime);}else {prevKey.interpolate(nextKey,nextKey.time);}this.data.hierarchy[h].node.updateMatrix();object.matrixWorldNeedsUpdate = true;}}},getNextKeyWith:function getNextKeyWith(sid,h,key){var keys=this.data.hierarchy[h].keys;key = key % keys.length;for(;key < keys.length;key++) {if(keys[key].hasTarget(sid)){return keys[key];}}return keys[0];},getPrevKeyWith:function getPrevKeyWith(sid,h,key){var keys=this.data.hierarchy[h].keys;key = key >= 0?key:key + keys.length;for(;key >= 0;key--) {if(keys[key].hasTarget(sid)){return keys[key];}}return keys[keys.length - 1];}}; // File:src/extras/animation/MorphAnimation.js
	/**
	 * @author mrdoob / http://mrdoob.com
	 * @author willy-vvu / http://willy-vvu.github.io
	 */THREE.MorphAnimation = function(mesh){this.mesh = mesh;this.frames = mesh.morphTargetInfluences.length;this.currentTime = 0;this.duration = 1000;this.loop = true;this.lastFrame = 0;this.currentFrame = 0;this.isPlaying = false;};THREE.MorphAnimation.prototype = {constructor:THREE.MorphAnimation,play:function play(){this.isPlaying = true;},pause:function pause(){this.isPlaying = false;},update:function update(delta){if(this.isPlaying === false)return;this.currentTime += delta;if(this.loop === true && this.currentTime > this.duration){this.currentTime %= this.duration;}this.currentTime = Math.min(this.currentTime,this.duration);var frameTime=this.duration / this.frames;var frame=Math.floor(this.currentTime / frameTime);var influences=this.mesh.morphTargetInfluences;if(frame !== this.currentFrame){influences[this.lastFrame] = 0;influences[this.currentFrame] = 1;influences[frame] = 0;this.lastFrame = this.currentFrame;this.currentFrame = frame;}var mix=this.currentTime % frameTime / frameTime;influences[frame] = mix;influences[this.lastFrame] = 1 - mix;}}; // File:src/extras/geometries/BoxGeometry.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as
	 */THREE.BoxGeometry = function(width,height,depth,widthSegments,heightSegments,depthSegments){THREE.Geometry.call(this);this.type = 'BoxGeometry';this.parameters = {width:width,height:height,depth:depth,widthSegments:widthSegments,heightSegments:heightSegments,depthSegments:depthSegments};this.widthSegments = widthSegments || 1;this.heightSegments = heightSegments || 1;this.depthSegments = depthSegments || 1;var scope=this;var width_half=width / 2;var height_half=height / 2;var depth_half=depth / 2;buildPlane('z','y',-1,-1,depth,height,width_half,0); // px
	buildPlane('z','y',1,-1,depth,height,-width_half,1); // nx
	buildPlane('x','z',1,1,width,depth,height_half,2); // py
	buildPlane('x','z',1,-1,width,depth,-height_half,3); // ny
	buildPlane('x','y',1,-1,width,height,depth_half,4); // pz
	buildPlane('x','y',-1,-1,width,height,-depth_half,5); // nz
	function buildPlane(u,v,udir,vdir,width,height,depth,materialIndex){var w,ix,iy,gridX=scope.widthSegments,gridY=scope.heightSegments,width_half=width / 2,height_half=height / 2,offset=scope.vertices.length;if(u === 'x' && v === 'y' || u === 'y' && v === 'x'){w = 'z';}else if(u === 'x' && v === 'z' || u === 'z' && v === 'x'){w = 'y';gridY = scope.depthSegments;}else if(u === 'z' && v === 'y' || u === 'y' && v === 'z'){w = 'x';gridX = scope.depthSegments;}var gridX1=gridX + 1,gridY1=gridY + 1,segment_width=width / gridX,segment_height=height / gridY,normal=new THREE.Vector3();normal[w] = depth > 0?1:-1;for(iy = 0;iy < gridY1;iy++) {for(ix = 0;ix < gridX1;ix++) {var vector=new THREE.Vector3();vector[u] = (ix * segment_width - width_half) * udir;vector[v] = (iy * segment_height - height_half) * vdir;vector[w] = depth;scope.vertices.push(vector);}}for(iy = 0;iy < gridY;iy++) {for(ix = 0;ix < gridX;ix++) {var a=ix + gridX1 * iy;var b=ix + gridX1 * (iy + 1);var c=ix + 1 + gridX1 * (iy + 1);var d=ix + 1 + gridX1 * iy;var uva=new THREE.Vector2(ix / gridX,1 - iy / gridY);var uvb=new THREE.Vector2(ix / gridX,1 - (iy + 1) / gridY);var uvc=new THREE.Vector2((ix + 1) / gridX,1 - (iy + 1) / gridY);var uvd=new THREE.Vector2((ix + 1) / gridX,1 - iy / gridY);var face=new THREE.Face3(a + offset,b + offset,d + offset);face.normal.copy(normal);face.vertexNormals.push(normal.clone(),normal.clone(),normal.clone());face.materialIndex = materialIndex;scope.faces.push(face);scope.faceVertexUvs[0].push([uva,uvb,uvd]);face = new THREE.Face3(b + offset,c + offset,d + offset);face.normal.copy(normal);face.vertexNormals.push(normal.clone(),normal.clone(),normal.clone());face.materialIndex = materialIndex;scope.faces.push(face);scope.faceVertexUvs[0].push([uvb.clone(),uvc,uvd.clone()]);}}}this.mergeVertices();};THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.BoxGeometry.prototype.constructor = THREE.BoxGeometry;THREE.BoxGeometry.prototype.clone = function(){var geometry=new THREE.BoxGeometry(this.parameters.width,this.parameters.height,this.parameters.depth,this.parameters.widthSegments,this.parameters.heightSegments,this.parameters.depthSegments);return geometry;};THREE.CubeGeometry = THREE.BoxGeometry; // backwards compatibility
	// File:src/extras/geometries/CircleGeometry.js
	/**
	 * @author hughes
	 */THREE.CircleGeometry = function(radius,segments,thetaStart,thetaLength){THREE.Geometry.call(this);this.type = 'CircleGeometry';this.parameters = {radius:radius,segments:segments,thetaStart:thetaStart,thetaLength:thetaLength};radius = radius || 50;segments = segments !== undefined?Math.max(3,segments):8;thetaStart = thetaStart !== undefined?thetaStart:0;thetaLength = thetaLength !== undefined?thetaLength:Math.PI * 2;var i,uvs=[],center=new THREE.Vector3(),centerUV=new THREE.Vector2(0.5,0.5);this.vertices.push(center);uvs.push(centerUV);for(i = 0;i <= segments;i++) {var vertex=new THREE.Vector3();var segment=thetaStart + i / segments * thetaLength;vertex.x = radius * Math.cos(segment);vertex.y = radius * Math.sin(segment);this.vertices.push(vertex);uvs.push(new THREE.Vector2((vertex.x / radius + 1) / 2,(vertex.y / radius + 1) / 2));}var n=new THREE.Vector3(0,0,1);for(i = 1;i <= segments;i++) {this.faces.push(new THREE.Face3(i,i + 1,0,[n.clone(),n.clone(),n.clone()]));this.faceVertexUvs[0].push([uvs[i].clone(),uvs[i + 1].clone(),centerUV.clone()]);}this.computeFaceNormals();this.boundingSphere = new THREE.Sphere(new THREE.Vector3(),radius);};THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.CircleGeometry.prototype.constructor = THREE.CircleGeometry;THREE.CircleGeometry.prototype.clone = function(){var geometry=new THREE.CircleGeometry(this.parameters.radius,this.parameters.segments,this.parameters.thetaStart,this.parameters.thetaLength);return geometry;}; // File:src/extras/geometries/CircleBufferGeometry.js
	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 */THREE.CircleBufferGeometry = function(radius,segments,thetaStart,thetaLength){THREE.BufferGeometry.call(this);this.type = 'CircleBufferGeometry';this.parameters = {radius:radius,segments:segments,thetaStart:thetaStart,thetaLength:thetaLength};radius = radius || 50;segments = segments !== undefined?Math.max(3,segments):8;thetaStart = thetaStart !== undefined?thetaStart:0;thetaLength = thetaLength !== undefined?thetaLength:Math.PI * 2;var vertices=segments + 2;var positions=new Float32Array(vertices * 3);var normals=new Float32Array(vertices * 3);var uvs=new Float32Array(vertices * 2); // center data is already zero, but need to set a few extras
	normals[3] = 1.0;uvs[0] = 0.5;uvs[1] = 0.5;for(var s=0,i=3,ii=2;s <= segments;s++,i += 3,ii += 2) {var segment=thetaStart + s / segments * thetaLength;positions[i] = radius * Math.cos(segment);positions[i + 1] = radius * Math.sin(segment);normals[i + 2] = 1; // normal z
	uvs[ii] = (positions[i] / radius + 1) / 2;uvs[ii + 1] = (positions[i + 1] / radius + 1) / 2;}var indices=[];for(var i=1;i <= segments;i++) {indices.push(i);indices.push(i + 1);indices.push(0);}this.setIndex(new THREE.BufferAttribute(new Uint16Array(indices),1));this.addAttribute('position',new THREE.BufferAttribute(positions,3));this.addAttribute('normal',new THREE.BufferAttribute(normals,3));this.addAttribute('uv',new THREE.BufferAttribute(uvs,2));this.boundingSphere = new THREE.Sphere(new THREE.Vector3(),radius);};THREE.CircleBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);THREE.CircleBufferGeometry.prototype.constructor = THREE.CircleBufferGeometry;THREE.CircleBufferGeometry.prototype.clone = function(){var geometry=new THREE.CircleBufferGeometry(this.parameters.radius,this.parameters.segments,this.parameters.thetaStart,this.parameters.thetaLength);geometry.copy(this);return geometry;}; // File:src/extras/geometries/CylinderGeometry.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.CylinderGeometry = function(radiusTop,radiusBottom,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength){THREE.Geometry.call(this);this.type = 'CylinderGeometry';this.parameters = {radiusTop:radiusTop,radiusBottom:radiusBottom,height:height,radialSegments:radialSegments,heightSegments:heightSegments,openEnded:openEnded,thetaStart:thetaStart,thetaLength:thetaLength};radiusTop = radiusTop !== undefined?radiusTop:20;radiusBottom = radiusBottom !== undefined?radiusBottom:20;height = height !== undefined?height:100;radialSegments = radialSegments || 8;heightSegments = heightSegments || 1;openEnded = openEnded !== undefined?openEnded:false;thetaStart = thetaStart !== undefined?thetaStart:0;thetaLength = thetaLength !== undefined?thetaLength:2 * Math.PI;var heightHalf=height / 2;var x,y,vertices=[],uvs=[];for(y = 0;y <= heightSegments;y++) {var verticesRow=[];var uvsRow=[];var v=y / heightSegments;var radius=v * (radiusBottom - radiusTop) + radiusTop;for(x = 0;x <= radialSegments;x++) {var u=x / radialSegments;var vertex=new THREE.Vector3();vertex.x = radius * Math.sin(u * thetaLength + thetaStart);vertex.y = -v * height + heightHalf;vertex.z = radius * Math.cos(u * thetaLength + thetaStart);this.vertices.push(vertex);verticesRow.push(this.vertices.length - 1);uvsRow.push(new THREE.Vector2(u,1 - v));}vertices.push(verticesRow);uvs.push(uvsRow);}var tanTheta=(radiusBottom - radiusTop) / height;var na,nb;for(x = 0;x < radialSegments;x++) {if(radiusTop !== 0){na = this.vertices[vertices[0][x]].clone();nb = this.vertices[vertices[0][x + 1]].clone();}else {na = this.vertices[vertices[1][x]].clone();nb = this.vertices[vertices[1][x + 1]].clone();}na.setY(Math.sqrt(na.x * na.x + na.z * na.z) * tanTheta).normalize();nb.setY(Math.sqrt(nb.x * nb.x + nb.z * nb.z) * tanTheta).normalize();for(y = 0;y < heightSegments;y++) {var v1=vertices[y][x];var v2=vertices[y + 1][x];var v3=vertices[y + 1][x + 1];var v4=vertices[y][x + 1];var n1=na.clone();var n2=na.clone();var n3=nb.clone();var n4=nb.clone();var uv1=uvs[y][x].clone();var uv2=uvs[y + 1][x].clone();var uv3=uvs[y + 1][x + 1].clone();var uv4=uvs[y][x + 1].clone();this.faces.push(new THREE.Face3(v1,v2,v4,[n1,n2,n4]));this.faceVertexUvs[0].push([uv1,uv2,uv4]);this.faces.push(new THREE.Face3(v2,v3,v4,[n2.clone(),n3,n4.clone()]));this.faceVertexUvs[0].push([uv2.clone(),uv3,uv4.clone()]);}} // top cap
	if(openEnded === false && radiusTop > 0){this.vertices.push(new THREE.Vector3(0,heightHalf,0));for(x = 0;x < radialSegments;x++) {var v1=vertices[0][x];var v2=vertices[0][x + 1];var v3=this.vertices.length - 1;var n1=new THREE.Vector3(0,1,0);var n2=new THREE.Vector3(0,1,0);var n3=new THREE.Vector3(0,1,0);var uv1=uvs[0][x].clone();var uv2=uvs[0][x + 1].clone();var uv3=new THREE.Vector2(uv2.x,0);this.faces.push(new THREE.Face3(v1,v2,v3,[n1,n2,n3],undefined,1));this.faceVertexUvs[0].push([uv1,uv2,uv3]);}} // bottom cap
	if(openEnded === false && radiusBottom > 0){this.vertices.push(new THREE.Vector3(0,-heightHalf,0));for(x = 0;x < radialSegments;x++) {var v1=vertices[heightSegments][x + 1];var v2=vertices[heightSegments][x];var v3=this.vertices.length - 1;var n1=new THREE.Vector3(0,-1,0);var n2=new THREE.Vector3(0,-1,0);var n3=new THREE.Vector3(0,-1,0);var uv1=uvs[heightSegments][x + 1].clone();var uv2=uvs[heightSegments][x].clone();var uv3=new THREE.Vector2(uv2.x,1);this.faces.push(new THREE.Face3(v1,v2,v3,[n1,n2,n3],undefined,2));this.faceVertexUvs[0].push([uv1,uv2,uv3]);}}this.computeFaceNormals();};THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry;THREE.CylinderGeometry.prototype.clone = function(){var geometry=new THREE.CylinderGeometry(this.parameters.radiusTop,this.parameters.radiusBottom,this.parameters.height,this.parameters.radialSegments,this.parameters.heightSegments,this.parameters.openEnded,this.parameters.thetaStart,this.parameters.thetaLength);return geometry;}; // File:src/extras/geometries/EdgesGeometry.js
	/**
	 * @author WestLangley / http://github.com/WestLangley
	 */THREE.EdgesGeometry = function(geometry,thresholdAngle){THREE.BufferGeometry.call(this);thresholdAngle = thresholdAngle !== undefined?thresholdAngle:1;var thresholdDot=Math.cos(THREE.Math.degToRad(thresholdAngle));var edge=[0,0],hash={};var sortFunction=function sortFunction(a,b){return a - b;};var keys=['a','b','c'];var geometry2;if(geometry instanceof THREE.BufferGeometry){geometry2 = new THREE.Geometry();geometry2.fromBufferGeometry(geometry);}else {geometry2 = geometry.clone();}geometry2.mergeVertices();geometry2.computeFaceNormals();var vertices=geometry2.vertices;var faces=geometry2.faces;for(var i=0,l=faces.length;i < l;i++) {var face=faces[i];for(var j=0;j < 3;j++) {edge[0] = face[keys[j]];edge[1] = face[keys[(j + 1) % 3]];edge.sort(sortFunction);var key=edge.toString();if(hash[key] === undefined){hash[key] = {vert1:edge[0],vert2:edge[1],face1:i,face2:undefined};}else {hash[key].face2 = i;}}}var coords=[];for(var key in hash) {var h=hash[key];if(h.face2 === undefined || faces[h.face1].normal.dot(faces[h.face2].normal) <= thresholdDot){var vertex=vertices[h.vert1];coords.push(vertex.x);coords.push(vertex.y);coords.push(vertex.z);vertex = vertices[h.vert2];coords.push(vertex.x);coords.push(vertex.y);coords.push(vertex.z);}}this.addAttribute('position',new THREE.BufferAttribute(new Float32Array(coords),3));};THREE.EdgesGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);THREE.EdgesGeometry.prototype.constructor = THREE.EdgesGeometry; // File:src/extras/geometries/ExtrudeGeometry.js
	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 *
	 * Creates extruded geometry from a path shape.
	 *
	 * parameters = {
	 *
	 *  curveSegments: <int>, // number of points on the curves
	 *  steps: <int>, // number of points for z-side extrusions / used for subdividing segments of extrude spline too
	 *  amount: <int>, // Depth to extrude the shape
	 *
	 *  bevelEnabled: <bool>, // turn on bevel
	 *  bevelThickness: <float>, // how deep into the original shape bevel goes
	 *  bevelSize: <float>, // how far from shape outline is bevel
	 *  bevelSegments: <int>, // number of bevel layers
	 *
	 *  extrudePath: <THREE.CurvePath> // 3d spline path to extrude shape along. (creates Frames if .frames aren't defined)
	 *  frames: <THREE.TubeGeometry.FrenetFrames> // containing arrays of tangents, normals, binormals
	 *
	 *  uvGenerator: <Object> // object that provides UV generator functions
	 *
	 * }
	 **/THREE.ExtrudeGeometry = function(shapes,options){if(typeof shapes === "undefined"){shapes = [];return;}THREE.Geometry.call(this);this.type = 'ExtrudeGeometry';shapes = Array.isArray(shapes)?shapes:[shapes];this.addShapeList(shapes,options);this.computeFaceNormals(); // can't really use automatic vertex normals
	// as then front and back sides get smoothed too
	// should do separate smoothing just for sides
	//this.computeVertexNormals();
	//console.log( "took", ( Date.now() - startTime ) );
	};THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry;THREE.ExtrudeGeometry.prototype.addShapeList = function(shapes,options){var sl=shapes.length;for(var s=0;s < sl;s++) {var shape=shapes[s];this.addShape(shape,options);}};THREE.ExtrudeGeometry.prototype.addShape = function(shape,options){var amount=options.amount !== undefined?options.amount:100;var bevelThickness=options.bevelThickness !== undefined?options.bevelThickness:6; // 10
	var bevelSize=options.bevelSize !== undefined?options.bevelSize:bevelThickness - 2; // 8
	var bevelSegments=options.bevelSegments !== undefined?options.bevelSegments:3;var bevelEnabled=options.bevelEnabled !== undefined?options.bevelEnabled:true; // false
	var curveSegments=options.curveSegments !== undefined?options.curveSegments:12;var steps=options.steps !== undefined?options.steps:1;var extrudePath=options.extrudePath;var extrudePts,extrudeByPath=false; // Use default WorldUVGenerator if no UV generators are specified.
	var uvgen=options.UVGenerator !== undefined?options.UVGenerator:THREE.ExtrudeGeometry.WorldUVGenerator;var splineTube,binormal,normal,position2;if(extrudePath){extrudePts = extrudePath.getSpacedPoints(steps);extrudeByPath = true;bevelEnabled = false; // bevels not supported for path extrusion
	// SETUP TNB variables
	// Reuse TNB from TubeGeomtry for now.
	// TODO1 - have a .isClosed in spline?
	splineTube = options.frames !== undefined?options.frames:new THREE.TubeGeometry.FrenetFrames(extrudePath,steps,false); // console.log(splineTube, 'splineTube', splineTube.normals.length, 'steps', steps, 'extrudePts', extrudePts.length);
	binormal = new THREE.Vector3();normal = new THREE.Vector3();position2 = new THREE.Vector3();} // Safeguards if bevels are not enabled
	if(!bevelEnabled){bevelSegments = 0;bevelThickness = 0;bevelSize = 0;} // Variables initialization
	var ahole,h,hl; // looping of holes
	var scope=this;var shapesOffset=this.vertices.length;var shapePoints=shape.extractPoints(curveSegments);var vertices=shapePoints.shape;var holes=shapePoints.holes;var reverse=!THREE.Shape.Utils.isClockWise(vertices);if(reverse){vertices = vertices.reverse(); // Maybe we should also check if holes are in the opposite direction, just to be safe ...
	for(h = 0,hl = holes.length;h < hl;h++) {ahole = holes[h];if(THREE.Shape.Utils.isClockWise(ahole)){holes[h] = ahole.reverse();}}reverse = false; // If vertices are in order now, we shouldn't need to worry about them again (hopefully)!
	}var faces=THREE.Shape.Utils.triangulateShape(vertices,holes); /* Vertices */var contour=vertices; // vertices has all points but contour has only points of circumference
	for(h = 0,hl = holes.length;h < hl;h++) {ahole = holes[h];vertices = vertices.concat(ahole);}function scalePt2(pt,vec,size){if(!vec)console.error("THREE.ExtrudeGeometry: vec does not exist");return vec.clone().multiplyScalar(size).add(pt);}var b,bs,t,z,vert,vlen=vertices.length,face,flen=faces.length; // Find directions for point movement
	function getBevelVec(inPt,inPrev,inNext){var EPSILON=0.0000000001; // computes for inPt the corresponding point inPt' on a new contour
	//   shifted by 1 unit (length of normalized vector) to the left
	// if we walk along contour clockwise, this new contour is outside the old one
	//
	// inPt' is the intersection of the two lines parallel to the two
	//  adjacent edges of inPt at a distance of 1 unit on the left side.
	var v_trans_x,v_trans_y,shrink_by=1; // resulting translation vector for inPt
	// good reading for geometry algorithms (here: line-line intersection)
	// http://geomalgorithms.com/a05-_intersect-1.html
	var v_prev_x=inPt.x - inPrev.x,v_prev_y=inPt.y - inPrev.y;var v_next_x=inNext.x - inPt.x,v_next_y=inNext.y - inPt.y;var v_prev_lensq=v_prev_x * v_prev_x + v_prev_y * v_prev_y; // check for collinear edges
	var collinear0=v_prev_x * v_next_y - v_prev_y * v_next_x;if(Math.abs(collinear0) > EPSILON){ // not collinear
	// length of vectors for normalizing
	var v_prev_len=Math.sqrt(v_prev_lensq);var v_next_len=Math.sqrt(v_next_x * v_next_x + v_next_y * v_next_y); // shift adjacent points by unit vectors to the left
	var ptPrevShift_x=inPrev.x - v_prev_y / v_prev_len;var ptPrevShift_y=inPrev.y + v_prev_x / v_prev_len;var ptNextShift_x=inNext.x - v_next_y / v_next_len;var ptNextShift_y=inNext.y + v_next_x / v_next_len; // scaling factor for v_prev to intersection point
	var sf=((ptNextShift_x - ptPrevShift_x) * v_next_y - (ptNextShift_y - ptPrevShift_y) * v_next_x) / (v_prev_x * v_next_y - v_prev_y * v_next_x); // vector from inPt to intersection point
	v_trans_x = ptPrevShift_x + v_prev_x * sf - inPt.x;v_trans_y = ptPrevShift_y + v_prev_y * sf - inPt.y; // Don't normalize!, otherwise sharp corners become ugly
	//  but prevent crazy spikes
	var v_trans_lensq=v_trans_x * v_trans_x + v_trans_y * v_trans_y;if(v_trans_lensq <= 2){return new THREE.Vector2(v_trans_x,v_trans_y);}else {shrink_by = Math.sqrt(v_trans_lensq / 2);}}else { // handle special case of collinear edges
	var direction_eq=false; // assumes: opposite
	if(v_prev_x > EPSILON){if(v_next_x > EPSILON){direction_eq = true;}}else {if(v_prev_x < -EPSILON){if(v_next_x < -EPSILON){direction_eq = true;}}else {if(Math.sign(v_prev_y) === Math.sign(v_next_y)){direction_eq = true;}}}if(direction_eq){ // console.log("Warning: lines are a straight sequence");
	v_trans_x = -v_prev_y;v_trans_y = v_prev_x;shrink_by = Math.sqrt(v_prev_lensq);}else { // console.log("Warning: lines are a straight spike");
	v_trans_x = v_prev_x;v_trans_y = v_prev_y;shrink_by = Math.sqrt(v_prev_lensq / 2);}}return new THREE.Vector2(v_trans_x / shrink_by,v_trans_y / shrink_by);}var contourMovements=[];for(var i=0,il=contour.length,j=il - 1,k=i + 1;i < il;i++,j++,k++) {if(j === il)j = 0;if(k === il)k = 0; //  (j)---(i)---(k)
	// console.log('i,j,k', i, j , k)
	contourMovements[i] = getBevelVec(contour[i],contour[j],contour[k]);}var holesMovements=[],oneHoleMovements,verticesMovements=contourMovements.concat();for(h = 0,hl = holes.length;h < hl;h++) {ahole = holes[h];oneHoleMovements = [];for(i = 0,il = ahole.length,j = il - 1,k = i + 1;i < il;i++,j++,k++) {if(j === il)j = 0;if(k === il)k = 0; //  (j)---(i)---(k)
	oneHoleMovements[i] = getBevelVec(ahole[i],ahole[j],ahole[k]);}holesMovements.push(oneHoleMovements);verticesMovements = verticesMovements.concat(oneHoleMovements);} // Loop bevelSegments, 1 for the front, 1 for the back
	for(b = 0;b < bevelSegments;b++) { //for ( b = bevelSegments; b > 0; b -- ) {
	t = b / bevelSegments;z = bevelThickness * (1 - t); //z = bevelThickness * t;
	bs = bevelSize * Math.sin(t * Math.PI / 2); // curved
	//bs = bevelSize * t; // linear
	// contract shape
	for(i = 0,il = contour.length;i < il;i++) {vert = scalePt2(contour[i],contourMovements[i],bs);v(vert.x,vert.y,-z);} // expand holes
	for(h = 0,hl = holes.length;h < hl;h++) {ahole = holes[h];oneHoleMovements = holesMovements[h];for(i = 0,il = ahole.length;i < il;i++) {vert = scalePt2(ahole[i],oneHoleMovements[i],bs);v(vert.x,vert.y,-z);}}}bs = bevelSize; // Back facing vertices
	for(i = 0;i < vlen;i++) {vert = bevelEnabled?scalePt2(vertices[i],verticesMovements[i],bs):vertices[i];if(!extrudeByPath){v(vert.x,vert.y,0);}else { // v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );
	normal.copy(splineTube.normals[0]).multiplyScalar(vert.x);binormal.copy(splineTube.binormals[0]).multiplyScalar(vert.y);position2.copy(extrudePts[0]).add(normal).add(binormal);v(position2.x,position2.y,position2.z);}} // Add stepped vertices...
	// Including front facing vertices
	var s;for(s = 1;s <= steps;s++) {for(i = 0;i < vlen;i++) {vert = bevelEnabled?scalePt2(vertices[i],verticesMovements[i],bs):vertices[i];if(!extrudeByPath){v(vert.x,vert.y,amount / steps * s);}else { // v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );
	normal.copy(splineTube.normals[s]).multiplyScalar(vert.x);binormal.copy(splineTube.binormals[s]).multiplyScalar(vert.y);position2.copy(extrudePts[s]).add(normal).add(binormal);v(position2.x,position2.y,position2.z);}}} // Add bevel segments planes
	//for ( b = 1; b <= bevelSegments; b ++ ) {
	for(b = bevelSegments - 1;b >= 0;b--) {t = b / bevelSegments;z = bevelThickness * (1 - t); //bs = bevelSize * ( 1-Math.sin ( ( 1 - t ) * Math.PI/2 ) );
	bs = bevelSize * Math.sin(t * Math.PI / 2); // contract shape
	for(i = 0,il = contour.length;i < il;i++) {vert = scalePt2(contour[i],contourMovements[i],bs);v(vert.x,vert.y,amount + z);} // expand holes
	for(h = 0,hl = holes.length;h < hl;h++) {ahole = holes[h];oneHoleMovements = holesMovements[h];for(i = 0,il = ahole.length;i < il;i++) {vert = scalePt2(ahole[i],oneHoleMovements[i],bs);if(!extrudeByPath){v(vert.x,vert.y,amount + z);}else {v(vert.x,vert.y + extrudePts[steps - 1].y,extrudePts[steps - 1].x + z);}}}} /* Faces */ // Top and bottom faces
	buildLidFaces(); // Sides faces
	buildSideFaces(); /////  Internal functions
	function buildLidFaces(){if(bevelEnabled){var layer=0; // steps + 1
	var offset=vlen * layer; // Bottom faces
	for(i = 0;i < flen;i++) {face = faces[i];f3(face[2] + offset,face[1] + offset,face[0] + offset);}layer = steps + bevelSegments * 2;offset = vlen * layer; // Top faces
	for(i = 0;i < flen;i++) {face = faces[i];f3(face[0] + offset,face[1] + offset,face[2] + offset);}}else { // Bottom faces
	for(i = 0;i < flen;i++) {face = faces[i];f3(face[2],face[1],face[0]);} // Top faces
	for(i = 0;i < flen;i++) {face = faces[i];f3(face[0] + vlen * steps,face[1] + vlen * steps,face[2] + vlen * steps);}}} // Create faces for the z-sides of the shape
	function buildSideFaces(){var layeroffset=0;sidewalls(contour,layeroffset);layeroffset += contour.length;for(h = 0,hl = holes.length;h < hl;h++) {ahole = holes[h];sidewalls(ahole,layeroffset); //, true
	layeroffset += ahole.length;}}function sidewalls(contour,layeroffset){var j,k;i = contour.length;while(--i >= 0) {j = i;k = i - 1;if(k < 0)k = contour.length - 1; //console.log('b', i,j, i-1, k,vertices.length);
	var s=0,sl=steps + bevelSegments * 2;for(s = 0;s < sl;s++) {var slen1=vlen * s;var slen2=vlen * (s + 1);var a=layeroffset + j + slen1,b=layeroffset + k + slen1,c=layeroffset + k + slen2,d=layeroffset + j + slen2;f4(a,b,c,d,contour,s,sl,j,k);}}}function v(x,y,z){scope.vertices.push(new THREE.Vector3(x,y,z));}function f3(a,b,c){a += shapesOffset;b += shapesOffset;c += shapesOffset;scope.faces.push(new THREE.Face3(a,b,c));var uvs=uvgen.generateTopUV(scope,a,b,c);scope.faceVertexUvs[0].push(uvs);}function f4(a,b,c,d,wallContour,stepIndex,stepsLength,contourIndex1,contourIndex2){a += shapesOffset;b += shapesOffset;c += shapesOffset;d += shapesOffset;scope.faces.push(new THREE.Face3(a,b,d));scope.faces.push(new THREE.Face3(b,c,d));var uvs=uvgen.generateSideWallUV(scope,a,b,c,d);scope.faceVertexUvs[0].push([uvs[0],uvs[1],uvs[3]]);scope.faceVertexUvs[0].push([uvs[1],uvs[2],uvs[3]]);}};THREE.ExtrudeGeometry.WorldUVGenerator = {generateTopUV:function generateTopUV(geometry,indexA,indexB,indexC){var vertices=geometry.vertices;var a=vertices[indexA];var b=vertices[indexB];var c=vertices[indexC];return [new THREE.Vector2(a.x,a.y),new THREE.Vector2(b.x,b.y),new THREE.Vector2(c.x,c.y)];},generateSideWallUV:function generateSideWallUV(geometry,indexA,indexB,indexC,indexD){var vertices=geometry.vertices;var a=vertices[indexA];var b=vertices[indexB];var c=vertices[indexC];var d=vertices[indexD];if(Math.abs(a.y - b.y) < 0.01){return [new THREE.Vector2(a.x,1 - a.z),new THREE.Vector2(b.x,1 - b.z),new THREE.Vector2(c.x,1 - c.z),new THREE.Vector2(d.x,1 - d.z)];}else {return [new THREE.Vector2(a.y,1 - a.z),new THREE.Vector2(b.y,1 - b.z),new THREE.Vector2(c.y,1 - c.z),new THREE.Vector2(d.y,1 - d.z)];}}}; // File:src/extras/geometries/ShapeGeometry.js
	/**
	 * @author jonobr1 / http://jonobr1.com
	 *
	 * Creates a one-sided polygonal geometry from a path shape. Similar to
	 * ExtrudeGeometry.
	 *
	 * parameters = {
	 *
	 *	curveSegments: <int>, // number of points on the curves. NOT USED AT THE MOMENT.
	 *
	 *	material: <int> // material index for front and back faces
	 *	uvGenerator: <Object> // object that provides UV generator functions
	 *
	 * }
	 **/THREE.ShapeGeometry = function(shapes,options){THREE.Geometry.call(this);this.type = 'ShapeGeometry';if(Array.isArray(shapes) === false)shapes = [shapes];this.addShapeList(shapes,options);this.computeFaceNormals();};THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.ShapeGeometry.prototype.constructor = THREE.ShapeGeometry; /**
	 * Add an array of shapes to THREE.ShapeGeometry.
	 */THREE.ShapeGeometry.prototype.addShapeList = function(shapes,options){for(var i=0,l=shapes.length;i < l;i++) {this.addShape(shapes[i],options);}return this;}; /**
	 * Adds a shape to THREE.ShapeGeometry, based on THREE.ExtrudeGeometry.
	 */THREE.ShapeGeometry.prototype.addShape = function(shape,options){if(options === undefined)options = {};var curveSegments=options.curveSegments !== undefined?options.curveSegments:12;var material=options.material;var uvgen=options.UVGenerator === undefined?THREE.ExtrudeGeometry.WorldUVGenerator:options.UVGenerator; //
	var i,l,hole;var shapesOffset=this.vertices.length;var shapePoints=shape.extractPoints(curveSegments);var vertices=shapePoints.shape;var holes=shapePoints.holes;var reverse=!THREE.Shape.Utils.isClockWise(vertices);if(reverse){vertices = vertices.reverse(); // Maybe we should also check if holes are in the opposite direction, just to be safe...
	for(i = 0,l = holes.length;i < l;i++) {hole = holes[i];if(THREE.Shape.Utils.isClockWise(hole)){holes[i] = hole.reverse();}}reverse = false;}var faces=THREE.Shape.Utils.triangulateShape(vertices,holes); // Vertices
	for(i = 0,l = holes.length;i < l;i++) {hole = holes[i];vertices = vertices.concat(hole);} //
	var vert,vlen=vertices.length;var face,flen=faces.length;for(i = 0;i < vlen;i++) {vert = vertices[i];this.vertices.push(new THREE.Vector3(vert.x,vert.y,0));}for(i = 0;i < flen;i++) {face = faces[i];var a=face[0] + shapesOffset;var b=face[1] + shapesOffset;var c=face[2] + shapesOffset;this.faces.push(new THREE.Face3(a,b,c,null,null,material));this.faceVertexUvs[0].push(uvgen.generateTopUV(this,a,b,c));}}; // File:src/extras/geometries/LatheGeometry.js
	/**
	 * @author astrodud / http://astrodud.isgreat.org/
	 * @author zz85 / https://github.com/zz85
	 * @author bhouston / http://exocortex.com
	 */ // points - to create a closed torus, one must use a set of points 
	//    like so: [ a, b, c, d, a ], see first is the same as last.
	// segments - the number of circumference segments to create
	// phiStart - the starting radian
	// phiLength - the radian (0 to 2*PI) range of the lathed section
	//    2*pi is a closed lathe, less than 2PI is a portion.
	THREE.LatheGeometry = function(points,segments,phiStart,phiLength){THREE.Geometry.call(this);this.type = 'LatheGeometry';this.parameters = {points:points,segments:segments,phiStart:phiStart,phiLength:phiLength};segments = segments || 12;phiStart = phiStart || 0;phiLength = phiLength || 2 * Math.PI;var inversePointLength=1.0 / (points.length - 1);var inverseSegments=1.0 / segments;for(var i=0,il=segments;i <= il;i++) {var phi=phiStart + i * inverseSegments * phiLength;var c=Math.cos(phi),s=Math.sin(phi);for(var j=0,jl=points.length;j < jl;j++) {var pt=points[j];var vertex=new THREE.Vector3();vertex.x = c * pt.x - s * pt.y;vertex.y = s * pt.x + c * pt.y;vertex.z = pt.z;this.vertices.push(vertex);}}var np=points.length;for(var i=0,il=segments;i < il;i++) {for(var j=0,jl=points.length - 1;j < jl;j++) {var base=j + np * i;var a=base;var b=base + np;var c=base + 1 + np;var d=base + 1;var u0=i * inverseSegments;var v0=j * inversePointLength;var u1=u0 + inverseSegments;var v1=v0 + inversePointLength;this.faces.push(new THREE.Face3(a,b,d));this.faceVertexUvs[0].push([new THREE.Vector2(u0,v0),new THREE.Vector2(u1,v0),new THREE.Vector2(u0,v1)]);this.faces.push(new THREE.Face3(b,c,d));this.faceVertexUvs[0].push([new THREE.Vector2(u1,v0),new THREE.Vector2(u1,v1),new THREE.Vector2(u0,v1)]);}}this.mergeVertices();this.computeFaceNormals();this.computeVertexNormals();};THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry; // File:src/extras/geometries/PlaneGeometry.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
	 */THREE.PlaneGeometry = function(width,height,widthSegments,heightSegments){THREE.Geometry.call(this);this.type = 'PlaneGeometry';this.parameters = {width:width,height:height,widthSegments:widthSegments,heightSegments:heightSegments};this.fromBufferGeometry(new THREE.PlaneBufferGeometry(width,height,widthSegments,heightSegments));};THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry;THREE.PlaneGeometry.prototype.clone = function(){var geometry=new THREE.PlaneGeometry(this.parameters.width,this.parameters.height,this.parameters.widthSegments,this.parameters.heightSegments);return geometry;}; // File:src/extras/geometries/PlaneBufferGeometry.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
	 */THREE.PlaneBufferGeometry = function(width,height,widthSegments,heightSegments){THREE.BufferGeometry.call(this);this.type = 'PlaneBufferGeometry';this.parameters = {width:width,height:height,widthSegments:widthSegments,heightSegments:heightSegments};var width_half=width / 2;var height_half=height / 2;var gridX=Math.floor(widthSegments) || 1;var gridY=Math.floor(heightSegments) || 1;var gridX1=gridX + 1;var gridY1=gridY + 1;var segment_width=width / gridX;var segment_height=height / gridY;var vertices=new Float32Array(gridX1 * gridY1 * 3);var normals=new Float32Array(gridX1 * gridY1 * 3);var uvs=new Float32Array(gridX1 * gridY1 * 2);var offset=0;var offset2=0;for(var iy=0;iy < gridY1;iy++) {var y=iy * segment_height - height_half;for(var ix=0;ix < gridX1;ix++) {var x=ix * segment_width - width_half;vertices[offset] = x;vertices[offset + 1] = -y;normals[offset + 2] = 1;uvs[offset2] = ix / gridX;uvs[offset2 + 1] = 1 - iy / gridY;offset += 3;offset2 += 2;}}offset = 0;var indices=new (vertices.length / 3 > 65535?Uint32Array:Uint16Array)(gridX * gridY * 6);for(var iy=0;iy < gridY;iy++) {for(var ix=0;ix < gridX;ix++) {var a=ix + gridX1 * iy;var b=ix + gridX1 * (iy + 1);var c=ix + 1 + gridX1 * (iy + 1);var d=ix + 1 + gridX1 * iy;indices[offset] = a;indices[offset + 1] = b;indices[offset + 2] = d;indices[offset + 3] = b;indices[offset + 4] = c;indices[offset + 5] = d;offset += 6;}}this.setIndex(new THREE.BufferAttribute(indices,1));this.addAttribute('position',new THREE.BufferAttribute(vertices,3));this.addAttribute('normal',new THREE.BufferAttribute(normals,3));this.addAttribute('uv',new THREE.BufferAttribute(uvs,2));};THREE.PlaneBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);THREE.PlaneBufferGeometry.prototype.constructor = THREE.PlaneBufferGeometry;THREE.PlaneBufferGeometry.prototype.clone = function(){var geometry=new THREE.PlaneBufferGeometry(this.parameters.width,this.parameters.height,this.parameters.widthSegments,this.parameters.heightSegments);geometry.copy(this);return geometry;}; // File:src/extras/geometries/RingGeometry.js
	/**
	 * @author Kaleb Murphy
	 */THREE.RingGeometry = function(innerRadius,outerRadius,thetaSegments,phiSegments,thetaStart,thetaLength){THREE.Geometry.call(this);this.type = 'RingGeometry';this.parameters = {innerRadius:innerRadius,outerRadius:outerRadius,thetaSegments:thetaSegments,phiSegments:phiSegments,thetaStart:thetaStart,thetaLength:thetaLength};innerRadius = innerRadius || 0;outerRadius = outerRadius || 50;thetaStart = thetaStart !== undefined?thetaStart:0;thetaLength = thetaLength !== undefined?thetaLength:Math.PI * 2;thetaSegments = thetaSegments !== undefined?Math.max(3,thetaSegments):8;phiSegments = phiSegments !== undefined?Math.max(1,phiSegments):8;var i,o,uvs=[],radius=innerRadius,radiusStep=(outerRadius - innerRadius) / phiSegments;for(i = 0;i < phiSegments + 1;i++) { // concentric circles inside ring
	for(o = 0;o < thetaSegments + 1;o++) { // number of segments per circle
	var vertex=new THREE.Vector3();var segment=thetaStart + o / thetaSegments * thetaLength;vertex.x = radius * Math.cos(segment);vertex.y = radius * Math.sin(segment);this.vertices.push(vertex);uvs.push(new THREE.Vector2((vertex.x / outerRadius + 1) / 2,(vertex.y / outerRadius + 1) / 2));}radius += radiusStep;}var n=new THREE.Vector3(0,0,1);for(i = 0;i < phiSegments;i++) { // concentric circles inside ring
	var thetaSegment=i * (thetaSegments + 1);for(o = 0;o < thetaSegments;o++) { // number of segments per circle
	var segment=o + thetaSegment;var v1=segment;var v2=segment + thetaSegments + 1;var v3=segment + thetaSegments + 2;this.faces.push(new THREE.Face3(v1,v2,v3,[n.clone(),n.clone(),n.clone()]));this.faceVertexUvs[0].push([uvs[v1].clone(),uvs[v2].clone(),uvs[v3].clone()]);v1 = segment;v2 = segment + thetaSegments + 2;v3 = segment + 1;this.faces.push(new THREE.Face3(v1,v2,v3,[n.clone(),n.clone(),n.clone()]));this.faceVertexUvs[0].push([uvs[v1].clone(),uvs[v2].clone(),uvs[v3].clone()]);}}this.computeFaceNormals();this.boundingSphere = new THREE.Sphere(new THREE.Vector3(),radius);};THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.RingGeometry.prototype.constructor = THREE.RingGeometry;THREE.RingGeometry.prototype.clone = function(){var geometry=new THREE.RingGeometry(this.parameters.innerRadius,this.parameters.outerRadius,this.parameters.thetaSegments,this.parameters.phiSegments,this.parameters.thetaStart,this.parameters.thetaLength);return geometry;}; // File:src/extras/geometries/SphereGeometry.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.SphereGeometry = function(radius,widthSegments,heightSegments,phiStart,phiLength,thetaStart,thetaLength){THREE.Geometry.call(this);this.type = 'SphereGeometry';this.parameters = {radius:radius,widthSegments:widthSegments,heightSegments:heightSegments,phiStart:phiStart,phiLength:phiLength,thetaStart:thetaStart,thetaLength:thetaLength};this.fromBufferGeometry(new THREE.SphereBufferGeometry(radius,widthSegments,heightSegments,phiStart,phiLength,thetaStart,thetaLength));};THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry;THREE.SphereGeometry.prototype.clone = function(){var geometry=new THREE.SphereGeometry(this.parameters.radius,this.parameters.widthSegments,this.parameters.heightSegments,this.parameters.phiStart,this.parameters.phiLength,this.parameters.thetaStart,this.parameters.thetaLength);return geometry;}; // File:src/extras/geometries/SphereBufferGeometry.js
	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 * based on THREE.SphereGeometry
	 */THREE.SphereBufferGeometry = function(radius,widthSegments,heightSegments,phiStart,phiLength,thetaStart,thetaLength){THREE.BufferGeometry.call(this);this.type = 'SphereBufferGeometry';this.parameters = {radius:radius,widthSegments:widthSegments,heightSegments:heightSegments,phiStart:phiStart,phiLength:phiLength,thetaStart:thetaStart,thetaLength:thetaLength};radius = radius || 50;widthSegments = Math.max(3,Math.floor(widthSegments) || 8);heightSegments = Math.max(2,Math.floor(heightSegments) || 6);phiStart = phiStart !== undefined?phiStart:0;phiLength = phiLength !== undefined?phiLength:Math.PI * 2;thetaStart = thetaStart !== undefined?thetaStart:0;thetaLength = thetaLength !== undefined?thetaLength:Math.PI;var thetaEnd=thetaStart + thetaLength;var vertexCount=(widthSegments + 1) * (heightSegments + 1);var positions=new THREE.BufferAttribute(new Float32Array(vertexCount * 3),3);var normals=new THREE.BufferAttribute(new Float32Array(vertexCount * 3),3);var uvs=new THREE.BufferAttribute(new Float32Array(vertexCount * 2),2);var index=0,vertices=[],normal=new THREE.Vector3();for(var y=0;y <= heightSegments;y++) {var verticesRow=[];var v=y / heightSegments;for(var x=0;x <= widthSegments;x++) {var u=x / widthSegments;var px=-radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);var py=radius * Math.cos(thetaStart + v * thetaLength);var pz=radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);normal.set(px,py,pz).normalize();positions.setXYZ(index,px,py,pz);normals.setXYZ(index,normal.x,normal.y,normal.z);uvs.setXY(index,u,1 - v);verticesRow.push(index);index++;}vertices.push(verticesRow);}var indices=[];for(var y=0;y < heightSegments;y++) {for(var x=0;x < widthSegments;x++) {var v1=vertices[y][x + 1];var v2=vertices[y][x];var v3=vertices[y + 1][x];var v4=vertices[y + 1][x + 1];if(y !== 0 || thetaStart > 0)indices.push(v1,v2,v4);if(y !== heightSegments - 1 || thetaEnd < Math.PI)indices.push(v2,v3,v4);}}this.setIndex(new THREE.BufferAttribute(new Uint16Array(indices),1));this.addAttribute('position',positions);this.addAttribute('normal',normals);this.addAttribute('uv',uvs);this.boundingSphere = new THREE.Sphere(new THREE.Vector3(),radius);};THREE.SphereBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);THREE.SphereBufferGeometry.prototype.constructor = THREE.SphereBufferGeometry;THREE.SphereBufferGeometry.prototype.clone = function(){var geometry=new THREE.SphereBufferGeometry(this.parameters.radius,this.parameters.widthSegments,this.parameters.heightSegments,this.parameters.phiStart,this.parameters.phiLength,this.parameters.thetaStart,this.parameters.thetaLength);geometry.copy(this);return geometry;}; // File:src/extras/geometries/TextGeometry.js
	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * For creating 3D text geometry in three.js
	 *
	 * Text = 3D Text
	 *
	 * parameters = {
	 *  size: 			<float>, 	// size of the text
	 *  height: 		<float>, 	// thickness to extrude text
	 *  curveSegments: 	<int>,		// number of points on the curves
	 *
	 *  font: 			<string>,		// font name
	 *  weight: 		<string>,		// font weight (normal, bold)
	 *  style: 			<string>,		// font style  (normal, italics)
	 *
	 *  bevelEnabled:	<bool>,			// turn on bevel
	 *  bevelThickness: <float>, 		// how deep into text bevel goes
	 *  bevelSize:		<float>, 		// how far from text outline is bevel
	 *  }
	 *
	 */ /*	Usage Examples

		// TextGeometry wrapper

		var text3d = new TextGeometry( text, options );

		// Complete manner

		var textShapes = THREE.FontUtils.generateShapes( text, options );
		var text3d = new ExtrudeGeometry( textShapes, options );

	*/THREE.TextGeometry = function(text,parameters){parameters = parameters || {};var textShapes=THREE.FontUtils.generateShapes(text,parameters); // translate parameters to ExtrudeGeometry API
	parameters.amount = parameters.height !== undefined?parameters.height:50; // defaults
	if(parameters.bevelThickness === undefined)parameters.bevelThickness = 10;if(parameters.bevelSize === undefined)parameters.bevelSize = 8;if(parameters.bevelEnabled === undefined)parameters.bevelEnabled = false;THREE.ExtrudeGeometry.call(this,textShapes,parameters);this.type = 'TextGeometry';};THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);THREE.TextGeometry.prototype.constructor = THREE.TextGeometry; // File:src/extras/geometries/TorusGeometry.js
	/**
	 * @author oosmoxiecode
	 * @author mrdoob / http://mrdoob.com/
	 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3DLite/src/away3dlite/primitives/Torus.as?r=2888
	 */THREE.TorusGeometry = function(radius,tube,radialSegments,tubularSegments,arc){THREE.Geometry.call(this);this.type = 'TorusGeometry';this.parameters = {radius:radius,tube:tube,radialSegments:radialSegments,tubularSegments:tubularSegments,arc:arc};radius = radius || 100;tube = tube || 40;radialSegments = radialSegments || 8;tubularSegments = tubularSegments || 6;arc = arc || Math.PI * 2;var center=new THREE.Vector3(),uvs=[],normals=[];for(var j=0;j <= radialSegments;j++) {for(var i=0;i <= tubularSegments;i++) {var u=i / tubularSegments * arc;var v=j / radialSegments * Math.PI * 2;center.x = radius * Math.cos(u);center.y = radius * Math.sin(u);var vertex=new THREE.Vector3();vertex.x = (radius + tube * Math.cos(v)) * Math.cos(u);vertex.y = (radius + tube * Math.cos(v)) * Math.sin(u);vertex.z = tube * Math.sin(v);this.vertices.push(vertex);uvs.push(new THREE.Vector2(i / tubularSegments,j / radialSegments));normals.push(vertex.clone().sub(center).normalize());}}for(var j=1;j <= radialSegments;j++) {for(var i=1;i <= tubularSegments;i++) {var a=(tubularSegments + 1) * j + i - 1;var b=(tubularSegments + 1) * (j - 1) + i - 1;var c=(tubularSegments + 1) * (j - 1) + i;var d=(tubularSegments + 1) * j + i;var face=new THREE.Face3(a,b,d,[normals[a].clone(),normals[b].clone(),normals[d].clone()]);this.faces.push(face);this.faceVertexUvs[0].push([uvs[a].clone(),uvs[b].clone(),uvs[d].clone()]);face = new THREE.Face3(b,c,d,[normals[b].clone(),normals[c].clone(),normals[d].clone()]);this.faces.push(face);this.faceVertexUvs[0].push([uvs[b].clone(),uvs[c].clone(),uvs[d].clone()]);}}this.computeFaceNormals();};THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry;THREE.TorusGeometry.prototype.clone = function(){var geometry=new THREE.TorusGeometry(this.parameters.radius,this.parameters.tube,this.parameters.radialSegments,this.parameters.tubularSegments,this.parameters.arc);return geometry;}; // File:src/extras/geometries/TorusKnotGeometry.js
	/**
	 * @author oosmoxiecode
	 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3D/src/away3d/primitives/TorusKnot.as?spec=svn2473&r=2473
	 */THREE.TorusKnotGeometry = function(radius,tube,radialSegments,tubularSegments,p,q,heightScale){THREE.Geometry.call(this);this.type = 'TorusKnotGeometry';this.parameters = {radius:radius,tube:tube,radialSegments:radialSegments,tubularSegments:tubularSegments,p:p,q:q,heightScale:heightScale};radius = radius || 100;tube = tube || 40;radialSegments = radialSegments || 64;tubularSegments = tubularSegments || 8;p = p || 2;q = q || 3;heightScale = heightScale || 1;var grid=new Array(radialSegments);var tang=new THREE.Vector3();var n=new THREE.Vector3();var bitan=new THREE.Vector3();for(var i=0;i < radialSegments;++i) {grid[i] = new Array(tubularSegments);var u=i / radialSegments * 2 * p * Math.PI;var p1=getPos(u,q,p,radius,heightScale);var p2=getPos(u + 0.01,q,p,radius,heightScale);tang.subVectors(p2,p1);n.addVectors(p2,p1);bitan.crossVectors(tang,n);n.crossVectors(bitan,tang);bitan.normalize();n.normalize();for(var j=0;j < tubularSegments;++j) {var v=j / tubularSegments * 2 * Math.PI;var cx=-tube * Math.cos(v); // TODO: Hack: Negating it so it faces outside.
	var cy=tube * Math.sin(v);var pos=new THREE.Vector3();pos.x = p1.x + cx * n.x + cy * bitan.x;pos.y = p1.y + cx * n.y + cy * bitan.y;pos.z = p1.z + cx * n.z + cy * bitan.z;grid[i][j] = this.vertices.push(pos) - 1;}}for(var i=0;i < radialSegments;++i) {for(var j=0;j < tubularSegments;++j) {var ip=(i + 1) % radialSegments;var jp=(j + 1) % tubularSegments;var a=grid[i][j];var b=grid[ip][j];var c=grid[ip][jp];var d=grid[i][jp];var uva=new THREE.Vector2(i / radialSegments,j / tubularSegments);var uvb=new THREE.Vector2((i + 1) / radialSegments,j / tubularSegments);var uvc=new THREE.Vector2((i + 1) / radialSegments,(j + 1) / tubularSegments);var uvd=new THREE.Vector2(i / radialSegments,(j + 1) / tubularSegments);this.faces.push(new THREE.Face3(a,b,d));this.faceVertexUvs[0].push([uva,uvb,uvd]);this.faces.push(new THREE.Face3(b,c,d));this.faceVertexUvs[0].push([uvb.clone(),uvc,uvd.clone()]);}}this.computeFaceNormals();this.computeVertexNormals();function getPos(u,in_q,in_p,radius,heightScale){var cu=Math.cos(u);var su=Math.sin(u);var quOverP=in_q / in_p * u;var cs=Math.cos(quOverP);var tx=radius * (2 + cs) * 0.5 * cu;var ty=radius * (2 + cs) * su * 0.5;var tz=heightScale * radius * Math.sin(quOverP) * 0.5;return new THREE.Vector3(tx,ty,tz);}};THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry;THREE.TorusKnotGeometry.prototype.clone = function(){var geometry=new THREE.TorusKnotGeometry(this.parameters.radius,this.parameters.tube,this.parameters.radialSegments,this.parameters.tubularSegments,this.parameters.p,this.parameters.q,this.parameters.heightScale);return geometry;}; // File:src/extras/geometries/TubeGeometry.js
	/**
	 * @author WestLangley / https://github.com/WestLangley
	 * @author zz85 / https://github.com/zz85
	 * @author miningold / https://github.com/miningold
	 * @author jonobr1 / https://github.com/jonobr1
	 *
	 * Modified from the TorusKnotGeometry by @oosmoxiecode
	 *
	 * Creates a tube which extrudes along a 3d spline
	 *
	 * Uses parallel transport frames as described in
	 * http://www.cs.indiana.edu/pub/techreports/TR425.pdf
	 */THREE.TubeGeometry = function(path,segments,radius,radialSegments,closed,taper){THREE.Geometry.call(this);this.type = 'TubeGeometry';this.parameters = {path:path,segments:segments,radius:radius,radialSegments:radialSegments,closed:closed};segments = segments || 64;radius = radius || 1;radialSegments = radialSegments || 8;closed = closed || false;taper = taper || THREE.TubeGeometry.NoTaper;var grid=[];var scope=this,tangent,normal,binormal,numpoints=segments + 1,u,v,r,cx,cy,pos,pos2=new THREE.Vector3(),i,j,ip,jp,a,b,c,d,uva,uvb,uvc,uvd;var frames=new THREE.TubeGeometry.FrenetFrames(path,segments,closed),tangents=frames.tangents,normals=frames.normals,binormals=frames.binormals; // proxy internals
	this.tangents = tangents;this.normals = normals;this.binormals = binormals;function vert(x,y,z){return scope.vertices.push(new THREE.Vector3(x,y,z)) - 1;} // construct the grid
	for(i = 0;i < numpoints;i++) {grid[i] = [];u = i / (numpoints - 1);pos = path.getPointAt(u);tangent = tangents[i];normal = normals[i];binormal = binormals[i];r = radius * taper(u);for(j = 0;j < radialSegments;j++) {v = j / radialSegments * 2 * Math.PI;cx = -r * Math.cos(v); // TODO: Hack: Negating it so it faces outside.
	cy = r * Math.sin(v);pos2.copy(pos);pos2.x += cx * normal.x + cy * binormal.x;pos2.y += cx * normal.y + cy * binormal.y;pos2.z += cx * normal.z + cy * binormal.z;grid[i][j] = vert(pos2.x,pos2.y,pos2.z);}} // construct the mesh
	for(i = 0;i < segments;i++) {for(j = 0;j < radialSegments;j++) {ip = closed?(i + 1) % segments:i + 1;jp = (j + 1) % radialSegments;a = grid[i][j]; // *** NOT NECESSARILY PLANAR ! ***
	b = grid[ip][j];c = grid[ip][jp];d = grid[i][jp];uva = new THREE.Vector2(i / segments,j / radialSegments);uvb = new THREE.Vector2((i + 1) / segments,j / radialSegments);uvc = new THREE.Vector2((i + 1) / segments,(j + 1) / radialSegments);uvd = new THREE.Vector2(i / segments,(j + 1) / radialSegments);this.faces.push(new THREE.Face3(a,b,d));this.faceVertexUvs[0].push([uva,uvb,uvd]);this.faces.push(new THREE.Face3(b,c,d));this.faceVertexUvs[0].push([uvb.clone(),uvc,uvd.clone()]);}}this.computeFaceNormals();this.computeVertexNormals();};THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry;THREE.TubeGeometry.NoTaper = function(u){return 1;};THREE.TubeGeometry.SinusoidalTaper = function(u){return Math.sin(Math.PI * u);}; // For computing of Frenet frames, exposing the tangents, normals and binormals the spline
	THREE.TubeGeometry.FrenetFrames = function(path,segments,closed){var normal=new THREE.Vector3(),tangents=[],normals=[],binormals=[],vec=new THREE.Vector3(),mat=new THREE.Matrix4(),numpoints=segments + 1,theta,epsilon=0.0001,smallest,tx,ty,tz,i,u; // expose internals
	this.tangents = tangents;this.normals = normals;this.binormals = binormals; // compute the tangent vectors for each segment on the path
	for(i = 0;i < numpoints;i++) {u = i / (numpoints - 1);tangents[i] = path.getTangentAt(u);tangents[i].normalize();}initialNormal3(); /*
		function initialNormal1(lastBinormal) {
			// fixed start binormal. Has dangers of 0 vectors
			normals[ 0 ] = new THREE.Vector3();
			binormals[ 0 ] = new THREE.Vector3();
			if (lastBinormal===undefined) lastBinormal = new THREE.Vector3( 0, 0, 1 );
			normals[ 0 ].crossVectors( lastBinormal, tangents[ 0 ] ).normalize();
			binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] ).normalize();
		}

		function initialNormal2() {

			// This uses the Frenet-Serret formula for deriving binormal
			var t2 = path.getTangentAt( epsilon );

			normals[ 0 ] = new THREE.Vector3().subVectors( t2, tangents[ 0 ] ).normalize();
			binormals[ 0 ] = new THREE.Vector3().crossVectors( tangents[ 0 ], normals[ 0 ] );

			normals[ 0 ].crossVectors( binormals[ 0 ], tangents[ 0 ] ).normalize(); // last binormal x tangent
			binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] ).normalize();

		}
		*/function initialNormal3(){ // select an initial normal vector perpendicular to the first tangent vector,
	// and in the direction of the smallest tangent xyz component
	normals[0] = new THREE.Vector3();binormals[0] = new THREE.Vector3();smallest = Number.MAX_VALUE;tx = Math.abs(tangents[0].x);ty = Math.abs(tangents[0].y);tz = Math.abs(tangents[0].z);if(tx <= smallest){smallest = tx;normal.set(1,0,0);}if(ty <= smallest){smallest = ty;normal.set(0,1,0);}if(tz <= smallest){normal.set(0,0,1);}vec.crossVectors(tangents[0],normal).normalize();normals[0].crossVectors(tangents[0],vec);binormals[0].crossVectors(tangents[0],normals[0]);} // compute the slowly-varying normal and binormal vectors for each segment on the path
	for(i = 1;i < numpoints;i++) {normals[i] = normals[i - 1].clone();binormals[i] = binormals[i - 1].clone();vec.crossVectors(tangents[i - 1],tangents[i]);if(vec.length() > epsilon){vec.normalize();theta = Math.acos(THREE.Math.clamp(tangents[i - 1].dot(tangents[i]),-1,1)); // clamp for floating pt errors
	normals[i].applyMatrix4(mat.makeRotationAxis(vec,theta));}binormals[i].crossVectors(tangents[i],normals[i]);} // if the curve is closed, postprocess the vectors so the first and last normal vectors are the same
	if(closed){theta = Math.acos(THREE.Math.clamp(normals[0].dot(normals[numpoints - 1]),-1,1));theta /= numpoints - 1;if(tangents[0].dot(vec.crossVectors(normals[0],normals[numpoints - 1])) > 0){theta = -theta;}for(i = 1;i < numpoints;i++) { // twist a little...
	normals[i].applyMatrix4(mat.makeRotationAxis(tangents[i],theta * i));binormals[i].crossVectors(tangents[i],normals[i]);}}}; // File:src/extras/geometries/PolyhedronGeometry.js
	/**
	 * @author clockworkgeek / https://github.com/clockworkgeek
	 * @author timothypratley / https://github.com/timothypratley
	 * @author WestLangley / http://github.com/WestLangley
	*/THREE.PolyhedronGeometry = function(vertices,indices,radius,detail){THREE.Geometry.call(this);this.type = 'PolyhedronGeometry';this.parameters = {vertices:vertices,indices:indices,radius:radius,detail:detail};radius = radius || 1;detail = detail || 0;var that=this;for(var i=0,l=vertices.length;i < l;i += 3) {prepare(new THREE.Vector3(vertices[i],vertices[i + 1],vertices[i + 2]));}var p=this.vertices;var faces=[];for(var i=0,j=0,l=indices.length;i < l;i += 3,j++) {var v1=p[indices[i]];var v2=p[indices[i + 1]];var v3=p[indices[i + 2]];faces[j] = new THREE.Face3(v1.index,v2.index,v3.index,[v1.clone(),v2.clone(),v3.clone()],undefined,j);}var centroid=new THREE.Vector3();for(var i=0,l=faces.length;i < l;i++) {subdivide(faces[i],detail);} // Handle case when face straddles the seam
	for(var i=0,l=this.faceVertexUvs[0].length;i < l;i++) {var uvs=this.faceVertexUvs[0][i];var x0=uvs[0].x;var x1=uvs[1].x;var x2=uvs[2].x;var max=Math.max(x0,Math.max(x1,x2));var min=Math.min(x0,Math.min(x1,x2));if(max > 0.9 && min < 0.1){ // 0.9 is somewhat arbitrary
	if(x0 < 0.2)uvs[0].x += 1;if(x1 < 0.2)uvs[1].x += 1;if(x2 < 0.2)uvs[2].x += 1;}} // Apply radius
	for(var i=0,l=this.vertices.length;i < l;i++) {this.vertices[i].multiplyScalar(radius);} // Merge vertices
	this.mergeVertices();this.computeFaceNormals();this.boundingSphere = new THREE.Sphere(new THREE.Vector3(),radius); // Project vector onto sphere's surface
	function prepare(vector){var vertex=vector.normalize().clone();vertex.index = that.vertices.push(vertex) - 1; // Texture coords are equivalent to map coords, calculate angle and convert to fraction of a circle.
	var u=azimuth(vector) / 2 / Math.PI + 0.5;var v=inclination(vector) / Math.PI + 0.5;vertex.uv = new THREE.Vector2(u,1 - v);return vertex;} // Approximate a curved face with recursively sub-divided triangles.
	function make(v1,v2,v3,materialIndex){var face=new THREE.Face3(v1.index,v2.index,v3.index,[v1.clone(),v2.clone(),v3.clone()],undefined,materialIndex);that.faces.push(face);centroid.copy(v1).add(v2).add(v3).divideScalar(3);var azi=azimuth(centroid);that.faceVertexUvs[0].push([correctUV(v1.uv,v1,azi),correctUV(v2.uv,v2,azi),correctUV(v3.uv,v3,azi)]);} // Analytically subdivide a face to the required detail level.
	function subdivide(face,detail){var cols=Math.pow(2,detail);var a=prepare(that.vertices[face.a]);var b=prepare(that.vertices[face.b]);var c=prepare(that.vertices[face.c]);var v=[];var materialIndex=face.materialIndex; // Construct all of the vertices for this subdivision.
	for(var i=0;i <= cols;i++) {v[i] = [];var aj=prepare(a.clone().lerp(c,i / cols));var bj=prepare(b.clone().lerp(c,i / cols));var rows=cols - i;for(var j=0;j <= rows;j++) {if(j === 0 && i === cols){v[i][j] = aj;}else {v[i][j] = prepare(aj.clone().lerp(bj,j / rows));}}} // Construct all of the faces.
	for(var i=0;i < cols;i++) {for(var j=0;j < 2 * (cols - i) - 1;j++) {var k=Math.floor(j / 2);if(j % 2 === 0){make(v[i][k + 1],v[i + 1][k],v[i][k],materialIndex);}else {make(v[i][k + 1],v[i + 1][k + 1],v[i + 1][k],materialIndex);}}}} // Angle around the Y axis, counter-clockwise when looking from above.
	function azimuth(vector){return Math.atan2(vector.z,-vector.x);} // Angle above the XZ plane.
	function inclination(vector){return Math.atan2(-vector.y,Math.sqrt(vector.x * vector.x + vector.z * vector.z));} // Texture fixing helper. Spheres have some odd behaviours.
	function correctUV(uv,vector,azimuth){if(azimuth < 0 && uv.x === 1)uv = new THREE.Vector2(uv.x - 1,uv.y);if(vector.x === 0 && vector.z === 0)uv = new THREE.Vector2(azimuth / 2 / Math.PI + 0.5,uv.y);return uv.clone();}};THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry;THREE.PolyhedronGeometry.prototype.clone = function(){var geometry=new THREE.PolyhedronGeometry(this.parameters.vertices,this.parameters.indices,this.parameters.radius,this.parameters.detail);return geometry.copy(this);};THREE.PolyhedronGeometry.prototype.copy = function(source){THREE.Geometry.prototype.copy.call(this,source);return this;}; // File:src/extras/geometries/DodecahedronGeometry.js
	/**
	 * @author Abe Pazos / https://hamoid.com
	 */THREE.DodecahedronGeometry = function(radius,detail){var t=(1 + Math.sqrt(5)) / 2;var r=1 / t;var vertices=[ // (±1, ±1, ±1)
	-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1, // (0, ±1/φ, ±φ)
	0,-r,-t,0,-r,t,0,r,-t,0,r,t, // (±1/φ, ±φ, 0)
	-r,-t,0,-r,t,0,r,-t,0,r,t,0, // (±φ, 0, ±1/φ)
	-t,0,-r,t,0,-r,-t,0,r,t,0,r];var indices=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];THREE.PolyhedronGeometry.call(this,vertices,indices,radius,detail);this.type = 'DodecahedronGeometry';this.parameters = {radius:radius,detail:detail};};THREE.DodecahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype);THREE.DodecahedronGeometry.prototype.constructor = THREE.DodecahedronGeometry;THREE.DodecahedronGeometry.prototype.clone = function(){var geometry=new THREE.DodecahedronGeometry(this.parameters.radius,this.parameters.detail);geometry.copy(this);return geometry;}; // File:src/extras/geometries/IcosahedronGeometry.js
	/**
	 * @author timothypratley / https://github.com/timothypratley
	 */THREE.IcosahedronGeometry = function(radius,detail){var t=(1 + Math.sqrt(5)) / 2;var vertices=[-1,t,0,1,t,0,-1,-t,0,1,-t,0,0,-1,t,0,1,t,0,-1,-t,0,1,-t,t,0,-1,t,0,1,-t,0,-1,-t,0,1];var indices=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];THREE.PolyhedronGeometry.call(this,vertices,indices,radius,detail);this.type = 'IcosahedronGeometry';this.parameters = {radius:radius,detail:detail};};THREE.IcosahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype);THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;THREE.IcosahedronGeometry.prototype.clone = function(){var geometry=new THREE.IcosahedronGeometry(this.parameters.radius,this.parameters.detail);geometry.copy(this);return geometry;}; // File:src/extras/geometries/OctahedronGeometry.js
	/**
	 * @author timothypratley / https://github.com/timothypratley
	 */THREE.OctahedronGeometry = function(radius,detail){var vertices=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1];var indices=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];THREE.PolyhedronGeometry.call(this,vertices,indices,radius,detail);this.type = 'OctahedronGeometry';this.parameters = {radius:radius,detail:detail};};THREE.OctahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype);THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry;THREE.OctahedronGeometry.prototype.clone = function(){var geometry=new THREE.OctahedronGeometry(this.parameters.radius,this.parameters.detail);geometry.copy(this);return geometry;}; // File:src/extras/geometries/TetrahedronGeometry.js
	/**
	 * @author timothypratley / https://github.com/timothypratley
	 */THREE.TetrahedronGeometry = function(radius,detail){var vertices=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1];var indices=[2,1,0,0,3,2,1,3,0,2,3,1];THREE.PolyhedronGeometry.call(this,vertices,indices,radius,detail);this.type = 'TetrahedronGeometry';this.parameters = {radius:radius,detail:detail};};THREE.TetrahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype);THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry;THREE.TetrahedronGeometry.prototype.clone = function(){var geometry=new THREE.TetrahedronGeometry(this.parameters.radius,this.parameters.detail);geometry.copy(this);return geometry;}; // File:src/extras/geometries/ParametricGeometry.js
	/**
	 * @author zz85 / https://github.com/zz85
	 * Parametric Surfaces Geometry
	 * based on the brilliant article by @prideout http://prideout.net/blog/?p=44
	 *
	 * new THREE.ParametricGeometry( parametricFunction, uSegments, ySegements );
	 *
	 */THREE.ParametricGeometry = function(func,slices,stacks){THREE.Geometry.call(this);this.type = 'ParametricGeometry';this.parameters = {func:func,slices:slices,stacks:stacks};var verts=this.vertices;var faces=this.faces;var uvs=this.faceVertexUvs[0];var i,j,p;var u,v;var sliceCount=slices + 1;for(i = 0;i <= stacks;i++) {v = i / stacks;for(j = 0;j <= slices;j++) {u = j / slices;p = func(u,v);verts.push(p);}}var a,b,c,d;var uva,uvb,uvc,uvd;for(i = 0;i < stacks;i++) {for(j = 0;j < slices;j++) {a = i * sliceCount + j;b = i * sliceCount + j + 1;c = (i + 1) * sliceCount + j + 1;d = (i + 1) * sliceCount + j;uva = new THREE.Vector2(j / slices,i / stacks);uvb = new THREE.Vector2((j + 1) / slices,i / stacks);uvc = new THREE.Vector2((j + 1) / slices,(i + 1) / stacks);uvd = new THREE.Vector2(j / slices,(i + 1) / stacks);faces.push(new THREE.Face3(a,b,d));uvs.push([uva,uvb,uvd]);faces.push(new THREE.Face3(b,c,d));uvs.push([uvb.clone(),uvc,uvd.clone()]);}} // console.log(this);
	// magic bullet
	// var diff = this.mergeVertices();
	// console.log('removed ', diff, ' vertices by merging');
	this.computeFaceNormals();this.computeVertexNormals();};THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry; // File:src/extras/geometries/WireframeGeometry.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.WireframeGeometry = function(geometry){THREE.BufferGeometry.call(this);var edge=[0,0],hash={};var sortFunction=function sortFunction(a,b){return a - b;};var keys=['a','b','c'];if(geometry instanceof THREE.Geometry){var vertices=geometry.vertices;var faces=geometry.faces;var numEdges=0; // allocate maximal size
	var edges=new Uint32Array(6 * faces.length);for(var i=0,l=faces.length;i < l;i++) {var face=faces[i];for(var j=0;j < 3;j++) {edge[0] = face[keys[j]];edge[1] = face[keys[(j + 1) % 3]];edge.sort(sortFunction);var key=edge.toString();if(hash[key] === undefined){edges[2 * numEdges] = edge[0];edges[2 * numEdges + 1] = edge[1];hash[key] = true;numEdges++;}}}var coords=new Float32Array(numEdges * 2 * 3);for(var i=0,l=numEdges;i < l;i++) {for(var j=0;j < 2;j++) {var vertex=vertices[edges[2 * i + j]];var index=6 * i + 3 * j;coords[index + 0] = vertex.x;coords[index + 1] = vertex.y;coords[index + 2] = vertex.z;}}this.addAttribute('position',new THREE.BufferAttribute(coords,3));}else if(geometry instanceof THREE.BufferGeometry){if(geometry.index !== null){ // Indexed BufferGeometry
	var indices=geometry.index.array;var vertices=geometry.attributes.position;var drawcalls=geometry.drawcalls;var numEdges=0;if(drawcalls.length === 0){geometry.addDrawCall(0,indices.length);} // allocate maximal size
	var edges=new Uint32Array(2 * indices.length);for(var o=0,ol=drawcalls.length;o < ol;++o) {var drawcall=drawcalls[o];var start=drawcall.start;var count=drawcall.count;for(var i=start,il=start + count;i < il;i += 3) {for(var j=0;j < 3;j++) {edge[0] = indices[i + j];edge[1] = indices[i + (j + 1) % 3];edge.sort(sortFunction);var key=edge.toString();if(hash[key] === undefined){edges[2 * numEdges] = edge[0];edges[2 * numEdges + 1] = edge[1];hash[key] = true;numEdges++;}}}}var coords=new Float32Array(numEdges * 2 * 3);for(var i=0,l=numEdges;i < l;i++) {for(var j=0;j < 2;j++) {var index=6 * i + 3 * j;var index2=edges[2 * i + j];coords[index + 0] = vertices.getX(index2);coords[index + 1] = vertices.getY(index2);coords[index + 2] = vertices.getZ(index2);}}this.addAttribute('position',new THREE.BufferAttribute(coords,3));}else { // non-indexed BufferGeometry
	var vertices=geometry.attributes.position.array;var numEdges=vertices.length / 3;var numTris=numEdges / 3;var coords=new Float32Array(numEdges * 2 * 3);for(var i=0,l=numTris;i < l;i++) {for(var j=0;j < 3;j++) {var index=18 * i + 6 * j;var index1=9 * i + 3 * j;coords[index + 0] = vertices[index1];coords[index + 1] = vertices[index1 + 1];coords[index + 2] = vertices[index1 + 2];var index2=9 * i + 3 * ((j + 1) % 3);coords[index + 3] = vertices[index2];coords[index + 4] = vertices[index2 + 1];coords[index + 5] = vertices[index2 + 2];}}this.addAttribute('position',new THREE.BufferAttribute(coords,3));}}};THREE.WireframeGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);THREE.WireframeGeometry.prototype.constructor = THREE.WireframeGeometry; // File:src/extras/helpers/AxisHelper.js
	/**
	 * @author sroucheray / http://sroucheray.org/
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.AxisHelper = function(size){size = size || 1;var vertices=new Float32Array([0,0,0,size,0,0,0,0,0,0,size,0,0,0,0,0,0,size]);var colors=new Float32Array([1,0,0,1,0.6,0,0,1,0,0.6,1,0,0,0,1,0,0.6,1]);var geometry=new THREE.BufferGeometry();geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));geometry.addAttribute('color',new THREE.BufferAttribute(colors,3));var material=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});THREE.LineSegments.call(this,geometry,material);};THREE.AxisHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.AxisHelper.prototype.constructor = THREE.AxisHelper; // File:src/extras/helpers/ArrowHelper.js
	/**
	 * @author WestLangley / http://github.com/WestLangley
	 * @author zz85 / http://github.com/zz85
	 * @author bhouston / http://exocortex.com
	 *
	 * Creates an arrow for visualizing directions
	 *
	 * Parameters:
	 *  dir - Vector3
	 *  origin - Vector3
	 *  length - Number
	 *  color - color in hex value
	 *  headLength - Number
	 *  headWidth - Number
	 */THREE.ArrowHelper = (function(){var lineGeometry=new THREE.Geometry();lineGeometry.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,1,0));var coneGeometry=new THREE.CylinderGeometry(0,0.5,1,5,1);coneGeometry.translate(0,-0.5,0);return function ArrowHelper(dir,origin,length,color,headLength,headWidth){ // dir is assumed to be normalized
	THREE.Object3D.call(this);if(color === undefined)color = 0xffff00;if(length === undefined)length = 1;if(headLength === undefined)headLength = 0.2 * length;if(headWidth === undefined)headWidth = 0.2 * headLength;this.position.copy(origin);if(headLength < length){this.line = new THREE.Line(lineGeometry,new THREE.LineBasicMaterial({color:color}));this.line.matrixAutoUpdate = false;this.add(this.line);}this.cone = new THREE.Mesh(coneGeometry,new THREE.MeshBasicMaterial({color:color}));this.cone.matrixAutoUpdate = false;this.add(this.cone);this.setDirection(dir);this.setLength(length,headLength,headWidth);};})();THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper;THREE.ArrowHelper.prototype.setDirection = (function(){var axis=new THREE.Vector3();var radians;return function setDirection(dir){ // dir is assumed to be normalized
	if(dir.y > 0.99999){this.quaternion.set(0,0,0,1);}else if(dir.y < -0.99999){this.quaternion.set(1,0,0,0);}else {axis.set(dir.z,0,-dir.x).normalize();radians = Math.acos(dir.y);this.quaternion.setFromAxisAngle(axis,radians);}};})();THREE.ArrowHelper.prototype.setLength = function(length,headLength,headWidth){if(headLength === undefined)headLength = 0.2 * length;if(headWidth === undefined)headWidth = 0.2 * headLength;if(headLength < length){this.line.scale.set(1,length - headLength,1);this.line.updateMatrix();}this.cone.scale.set(headWidth,headLength,headWidth);this.cone.position.y = length;this.cone.updateMatrix();};THREE.ArrowHelper.prototype.setColor = function(color){if(this.line !== undefined)this.line.material.color.set(color);this.cone.material.color.set(color);}; // File:src/extras/helpers/BoxHelper.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.BoxHelper = function(object){var indices=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]);var positions=new Float32Array(8 * 3);var geometry=new THREE.BufferGeometry();geometry.setIndex(new THREE.BufferAttribute(indices,1));geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));THREE.LineSegments.call(this,geometry,new THREE.LineBasicMaterial({color:0xffff00}));if(object !== undefined){this.update(object);}};THREE.BoxHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.BoxHelper.prototype.constructor = THREE.BoxHelper;THREE.BoxHelper.prototype.update = (function(){var box=new THREE.Box3();return function(object){box.setFromObject(object);if(box.empty())return;var min=box.min;var max=box.max; /*
			  5____4
			1/___0/|
			| 6__|_7
			2/___3/

			0: max.x, max.y, max.z
			1: min.x, max.y, max.z
			2: min.x, min.y, max.z
			3: max.x, min.y, max.z
			4: max.x, max.y, min.z
			5: min.x, max.y, min.z
			6: min.x, min.y, min.z
			7: max.x, min.y, min.z
			*/var position=this.geometry.attributes.position;var array=position.array;array[0] = max.x;array[1] = max.y;array[2] = max.z;array[3] = min.x;array[4] = max.y;array[5] = max.z;array[6] = min.x;array[7] = min.y;array[8] = max.z;array[9] = max.x;array[10] = min.y;array[11] = max.z;array[12] = max.x;array[13] = max.y;array[14] = min.z;array[15] = min.x;array[16] = max.y;array[17] = min.z;array[18] = min.x;array[19] = min.y;array[20] = min.z;array[21] = max.x;array[22] = min.y;array[23] = min.z;position.needsUpdate = true;this.geometry.computeBoundingSphere();};})(); // File:src/extras/helpers/BoundingBoxHelper.js
	/**
	 * @author WestLangley / http://github.com/WestLangley
	 */ // a helper to show the world-axis-aligned bounding box for an object
	THREE.BoundingBoxHelper = function(object,hex){var color=hex !== undefined?hex:0x888888;this.object = object;this.box = new THREE.Box3();THREE.Mesh.call(this,new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:color,wireframe:true}));};THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype);THREE.BoundingBoxHelper.prototype.constructor = THREE.BoundingBoxHelper;THREE.BoundingBoxHelper.prototype.update = function(){this.box.setFromObject(this.object);this.box.size(this.scale);this.box.center(this.position);}; // File:src/extras/helpers/CameraHelper.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 *	- shows frustum, line of sight and up of the camera
	 *	- suitable for fast updates
	 * 	- based on frustum visualization in lightgl.js shadowmap example
	 *		http://evanw.github.com/lightgl.js/tests/shadowmap.html
	 */THREE.CameraHelper = function(camera){var geometry=new THREE.Geometry();var material=new THREE.LineBasicMaterial({color:0xffffff,vertexColors:THREE.FaceColors});var pointMap={}; // colors
	var hexFrustum=0xffaa00;var hexCone=0xff0000;var hexUp=0x00aaff;var hexTarget=0xffffff;var hexCross=0x333333; // near
	addLine("n1","n2",hexFrustum);addLine("n2","n4",hexFrustum);addLine("n4","n3",hexFrustum);addLine("n3","n1",hexFrustum); // far
	addLine("f1","f2",hexFrustum);addLine("f2","f4",hexFrustum);addLine("f4","f3",hexFrustum);addLine("f3","f1",hexFrustum); // sides
	addLine("n1","f1",hexFrustum);addLine("n2","f2",hexFrustum);addLine("n3","f3",hexFrustum);addLine("n4","f4",hexFrustum); // cone
	addLine("p","n1",hexCone);addLine("p","n2",hexCone);addLine("p","n3",hexCone);addLine("p","n4",hexCone); // up
	addLine("u1","u2",hexUp);addLine("u2","u3",hexUp);addLine("u3","u1",hexUp); // target
	addLine("c","t",hexTarget);addLine("p","c",hexCross); // cross
	addLine("cn1","cn2",hexCross);addLine("cn3","cn4",hexCross);addLine("cf1","cf2",hexCross);addLine("cf3","cf4",hexCross);function addLine(a,b,hex){addPoint(a,hex);addPoint(b,hex);}function addPoint(id,hex){geometry.vertices.push(new THREE.Vector3());geometry.colors.push(new THREE.Color(hex));if(pointMap[id] === undefined){pointMap[id] = [];}pointMap[id].push(geometry.vertices.length - 1);}THREE.LineSegments.call(this,geometry,material);this.camera = camera;this.matrix = camera.matrixWorld;this.matrixAutoUpdate = false;this.pointMap = pointMap;this.update();};THREE.CameraHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.CameraHelper.prototype.constructor = THREE.CameraHelper;THREE.CameraHelper.prototype.update = (function(){var geometry,pointMap;var vector=new THREE.Vector3();var camera=new THREE.Camera();var setPoint=function setPoint(point,x,y,z){vector.set(x,y,z).unproject(camera);var points=pointMap[point];if(points !== undefined){for(var i=0,il=points.length;i < il;i++) {geometry.vertices[points[i]].copy(vector);}}};return function(){geometry = this.geometry;pointMap = this.pointMap;var w=1,h=1; // we need just camera projection matrix
	// world matrix must be identity
	camera.projectionMatrix.copy(this.camera.projectionMatrix); // center / target
	setPoint("c",0,0,-1);setPoint("t",0,0,1); // near
	setPoint("n1",-w,-h,-1);setPoint("n2",w,-h,-1);setPoint("n3",-w,h,-1);setPoint("n4",w,h,-1); // far
	setPoint("f1",-w,-h,1);setPoint("f2",w,-h,1);setPoint("f3",-w,h,1);setPoint("f4",w,h,1); // up
	setPoint("u1",w * 0.7,h * 1.1,-1);setPoint("u2",-w * 0.7,h * 1.1,-1);setPoint("u3",0,h * 2,-1); // cross
	setPoint("cf1",-w,0,1);setPoint("cf2",w,0,1);setPoint("cf3",0,-h,1);setPoint("cf4",0,h,1);setPoint("cn1",-w,0,-1);setPoint("cn2",w,0,-1);setPoint("cn3",0,-h,-1);setPoint("cn4",0,h,-1);geometry.verticesNeedUpdate = true;};})(); // File:src/extras/helpers/DirectionalLightHelper.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 * @author WestLangley / http://github.com/WestLangley
	 */THREE.DirectionalLightHelper = function(light,size){THREE.Object3D.call(this);this.light = light;this.light.updateMatrixWorld();this.matrix = light.matrixWorld;this.matrixAutoUpdate = false;size = size || 1;var geometry=new THREE.Geometry();geometry.vertices.push(new THREE.Vector3(-size,size,0),new THREE.Vector3(size,size,0),new THREE.Vector3(size,-size,0),new THREE.Vector3(-size,-size,0),new THREE.Vector3(-size,size,0));var material=new THREE.LineBasicMaterial({fog:false});material.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.lightPlane = new THREE.Line(geometry,material);this.add(this.lightPlane);geometry = new THREE.Geometry();geometry.vertices.push(new THREE.Vector3(),new THREE.Vector3());material = new THREE.LineBasicMaterial({fog:false});material.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine = new THREE.Line(geometry,material);this.add(this.targetLine);this.update();};THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype);THREE.DirectionalLightHelper.prototype.constructor = THREE.DirectionalLightHelper;THREE.DirectionalLightHelper.prototype.dispose = function(){this.lightPlane.geometry.dispose();this.lightPlane.material.dispose();this.targetLine.geometry.dispose();this.targetLine.material.dispose();};THREE.DirectionalLightHelper.prototype.update = (function(){var v1=new THREE.Vector3();var v2=new THREE.Vector3();var v3=new THREE.Vector3();return function(){v1.setFromMatrixPosition(this.light.matrixWorld);v2.setFromMatrixPosition(this.light.target.matrixWorld);v3.subVectors(v2,v1);this.lightPlane.lookAt(v3);this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine.geometry.vertices[1].copy(v3);this.targetLine.geometry.verticesNeedUpdate = true;this.targetLine.material.color.copy(this.lightPlane.material.color);};})(); // File:src/extras/helpers/EdgesHelper.js
	/**
	 * @author WestLangley / http://github.com/WestLangley
	 * @param object THREE.Mesh whose geometry will be used
	 * @param hex line color
	 * @param thresholdAngle the minimum angle (in degrees),
	 * between the face normals of adjacent faces,
	 * that is required to render an edge. A value of 10 means
	 * an edge is only rendered if the angle is at least 10 degrees.
	 */THREE.EdgesHelper = function(object,hex,thresholdAngle){var color=hex !== undefined?hex:0xffffff;THREE.LineSegments.call(this,new THREE.EdgesGeometry(object.geometry,thresholdAngle),new THREE.LineBasicMaterial({color:color}));this.matrix = object.matrixWorld;this.matrixAutoUpdate = false;};THREE.EdgesHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.EdgesHelper.prototype.constructor = THREE.EdgesHelper; // File:src/extras/helpers/FaceNormalsHelper.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author WestLangley / http://github.com/WestLangley
	*/THREE.FaceNormalsHelper = function(object,size,hex,linewidth){ // FaceNormalsHelper only supports THREE.Geometry
	this.object = object;this.size = size !== undefined?size:1;var color=hex !== undefined?hex:0xffff00;var width=linewidth !== undefined?linewidth:1; //
	var nNormals=0;var objGeometry=this.object.geometry;if(objGeometry instanceof THREE.Geometry){nNormals = objGeometry.faces.length;}else {console.warn('THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.');} //
	var geometry=new THREE.BufferGeometry();var positions=new THREE.Float32Attribute(nNormals * 2 * 3,3);geometry.addAttribute('position',positions);THREE.LineSegments.call(this,geometry,new THREE.LineBasicMaterial({color:color,linewidth:width})); //
	this.matrixAutoUpdate = false;this.update();};THREE.FaceNormalsHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.FaceNormalsHelper.prototype.constructor = THREE.FaceNormalsHelper;THREE.FaceNormalsHelper.prototype.update = (function(){var v1=new THREE.Vector3();var v2=new THREE.Vector3();var normalMatrix=new THREE.Matrix3();return function update(){this.object.updateMatrixWorld(true);normalMatrix.getNormalMatrix(this.object.matrixWorld);var matrixWorld=this.object.matrixWorld;var position=this.geometry.attributes.position; //
	var objGeometry=this.object.geometry;var vertices=objGeometry.vertices;var faces=objGeometry.faces;var idx=0;for(var i=0,l=faces.length;i < l;i++) {var face=faces[i];var normal=face.normal;v1.copy(vertices[face.a]).add(vertices[face.b]).add(vertices[face.c]).divideScalar(3).applyMatrix4(matrixWorld);v2.copy(normal).applyMatrix3(normalMatrix).normalize().multiplyScalar(this.size).add(v1);position.setXYZ(idx,v1.x,v1.y,v1.z);idx = idx + 1;position.setXYZ(idx,v2.x,v2.y,v2.z);idx = idx + 1;}position.needsUpdate = true;return this;};})(); // File:src/extras/helpers/GridHelper.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.GridHelper = function(size,step){var geometry=new THREE.Geometry();var material=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});this.color1 = new THREE.Color(0x444444);this.color2 = new THREE.Color(0x888888);for(var i=-size;i <= size;i += step) {geometry.vertices.push(new THREE.Vector3(-size,0,i),new THREE.Vector3(size,0,i),new THREE.Vector3(i,0,-size),new THREE.Vector3(i,0,size));var color=i === 0?this.color1:this.color2;geometry.colors.push(color,color,color,color);}THREE.LineSegments.call(this,geometry,material);};THREE.GridHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.GridHelper.prototype.constructor = THREE.GridHelper;THREE.GridHelper.prototype.setColors = function(colorCenterLine,colorGrid){this.color1.set(colorCenterLine);this.color2.set(colorGrid);this.geometry.colorsNeedUpdate = true;}; // File:src/extras/helpers/HemisphereLightHelper.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.HemisphereLightHelper = function(light,sphereSize){THREE.Object3D.call(this);this.light = light;this.light.updateMatrixWorld();this.matrix = light.matrixWorld;this.matrixAutoUpdate = false;this.colors = [new THREE.Color(),new THREE.Color()];var geometry=new THREE.SphereGeometry(sphereSize,4,2);geometry.rotateX(-Math.PI / 2);for(var i=0,il=8;i < il;i++) {geometry.faces[i].color = this.colors[i < 4?0:1];}var material=new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors,wireframe:true});this.lightSphere = new THREE.Mesh(geometry,material);this.add(this.lightSphere);this.update();};THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);THREE.HemisphereLightHelper.prototype.constructor = THREE.HemisphereLightHelper;THREE.HemisphereLightHelper.prototype.dispose = function(){this.lightSphere.geometry.dispose();this.lightSphere.material.dispose();};THREE.HemisphereLightHelper.prototype.update = (function(){var vector=new THREE.Vector3();return function(){this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);this.lightSphere.lookAt(vector.setFromMatrixPosition(this.light.matrixWorld).negate());this.lightSphere.geometry.colorsNeedUpdate = true;};})(); // File:src/extras/helpers/PointLightHelper.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.PointLightHelper = function(light,sphereSize){this.light = light;this.light.updateMatrixWorld();var geometry=new THREE.SphereGeometry(sphereSize,4,2);var material=new THREE.MeshBasicMaterial({wireframe:true,fog:false});material.color.copy(this.light.color).multiplyScalar(this.light.intensity);THREE.Mesh.call(this,geometry,material);this.matrix = this.light.matrixWorld;this.matrixAutoUpdate = false; /*
		var distanceGeometry = new THREE.IcosahedronGeometry( 1, 2 );
		var distanceMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false, wireframe: true, opacity: 0.1, transparent: true } );

		this.lightSphere = new THREE.Mesh( bulbGeometry, bulbMaterial );
		this.lightDistance = new THREE.Mesh( distanceGeometry, distanceMaterial );

		var d = light.distance;

		if ( d === 0.0 ) {

			this.lightDistance.visible = false;

		} else {

			this.lightDistance.scale.set( d, d, d );

		}

		this.add( this.lightDistance );
		*/};THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype);THREE.PointLightHelper.prototype.constructor = THREE.PointLightHelper;THREE.PointLightHelper.prototype.dispose = function(){this.geometry.dispose();this.material.dispose();};THREE.PointLightHelper.prototype.update = function(){this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity); /*
		var d = this.light.distance;

		if ( d === 0.0 ) {

			this.lightDistance.visible = false;

		} else {

			this.lightDistance.visible = true;
			this.lightDistance.scale.set( d, d, d );

		}
		*/}; // File:src/extras/helpers/SkeletonHelper.js
	/**
	 * @author Sean Griffin / http://twitter.com/sgrif
	 * @author Michael Guerrero / http://realitymeltdown.com
	 * @author mrdoob / http://mrdoob.com/
	 * @author ikerr / http://verold.com
	 */THREE.SkeletonHelper = function(object){this.bones = this.getBoneList(object);var geometry=new THREE.Geometry();for(var i=0;i < this.bones.length;i++) {var bone=this.bones[i];if(bone.parent instanceof THREE.Bone){geometry.vertices.push(new THREE.Vector3());geometry.vertices.push(new THREE.Vector3());geometry.colors.push(new THREE.Color(0,0,1));geometry.colors.push(new THREE.Color(0,1,0));}}geometry.dynamic = true;var material=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors,depthTest:false,depthWrite:false,transparent:true});THREE.LineSegments.call(this,geometry,material);this.root = object;this.matrix = object.matrixWorld;this.matrixAutoUpdate = false;this.update();};THREE.SkeletonHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.SkeletonHelper.prototype.constructor = THREE.SkeletonHelper;THREE.SkeletonHelper.prototype.getBoneList = function(object){var boneList=[];if(object instanceof THREE.Bone){boneList.push(object);}for(var i=0;i < object.children.length;i++) {boneList.push.apply(boneList,this.getBoneList(object.children[i]));}return boneList;};THREE.SkeletonHelper.prototype.update = function(){var geometry=this.geometry;var matrixWorldInv=new THREE.Matrix4().getInverse(this.root.matrixWorld);var boneMatrix=new THREE.Matrix4();var j=0;for(var i=0;i < this.bones.length;i++) {var bone=this.bones[i];if(bone.parent instanceof THREE.Bone){boneMatrix.multiplyMatrices(matrixWorldInv,bone.matrixWorld);geometry.vertices[j].setFromMatrixPosition(boneMatrix);boneMatrix.multiplyMatrices(matrixWorldInv,bone.parent.matrixWorld);geometry.vertices[j + 1].setFromMatrixPosition(boneMatrix);j += 2;}}geometry.verticesNeedUpdate = true;geometry.computeBoundingSphere();}; // File:src/extras/helpers/SpotLightHelper.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 * @author WestLangley / http://github.com/WestLangley
	*/THREE.SpotLightHelper = function(light){THREE.Object3D.call(this);this.light = light;this.light.updateMatrixWorld();this.matrix = light.matrixWorld;this.matrixAutoUpdate = false;var geometry=new THREE.CylinderGeometry(0,1,1,8,1,true);geometry.translate(0,-0.5,0);geometry.rotateX(-Math.PI / 2);var material=new THREE.MeshBasicMaterial({wireframe:true,fog:false});this.cone = new THREE.Mesh(geometry,material);this.add(this.cone);this.update();};THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);THREE.SpotLightHelper.prototype.constructor = THREE.SpotLightHelper;THREE.SpotLightHelper.prototype.dispose = function(){this.cone.geometry.dispose();this.cone.material.dispose();};THREE.SpotLightHelper.prototype.update = (function(){var vector=new THREE.Vector3();var vector2=new THREE.Vector3();return function(){var coneLength=this.light.distance?this.light.distance:10000;var coneWidth=coneLength * Math.tan(this.light.angle);this.cone.scale.set(coneWidth,coneWidth,coneLength);vector.setFromMatrixPosition(this.light.matrixWorld);vector2.setFromMatrixPosition(this.light.target.matrixWorld);this.cone.lookAt(vector2.sub(vector));this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);};})(); // File:src/extras/helpers/VertexNormalsHelper.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author WestLangley / http://github.com/WestLangley
	*/THREE.VertexNormalsHelper = function(object,size,hex,linewidth){this.object = object;this.size = size !== undefined?size:1;var color=hex !== undefined?hex:0xff0000;var width=linewidth !== undefined?linewidth:1; //
	var nNormals=0;var objGeometry=this.object.geometry;if(objGeometry instanceof THREE.Geometry){nNormals = objGeometry.faces.length * 3;}else if(objGeometry instanceof THREE.BufferGeometry){nNormals = objGeometry.attributes.normal.count;} //
	var geometry=new THREE.BufferGeometry();var positions=new THREE.Float32Attribute(nNormals * 2 * 3,3);geometry.addAttribute('position',positions);THREE.LineSegments.call(this,geometry,new THREE.LineBasicMaterial({color:color,linewidth:width})); //
	this.matrixAutoUpdate = false;this.update();};THREE.VertexNormalsHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.VertexNormalsHelper.prototype.constructor = THREE.VertexNormalsHelper;THREE.VertexNormalsHelper.prototype.update = (function(){var v1=new THREE.Vector3();var v2=new THREE.Vector3();var normalMatrix=new THREE.Matrix3();return function update(){var keys=['a','b','c'];this.object.updateMatrixWorld(true);normalMatrix.getNormalMatrix(this.object.matrixWorld);var matrixWorld=this.object.matrixWorld;var position=this.geometry.attributes.position; //
	var objGeometry=this.object.geometry;if(objGeometry instanceof THREE.Geometry){var vertices=objGeometry.vertices;var faces=objGeometry.faces;var idx=0;for(var i=0,l=faces.length;i < l;i++) {var face=faces[i];for(var j=0,jl=face.vertexNormals.length;j < jl;j++) {var vertex=vertices[face[keys[j]]];var normal=face.vertexNormals[j];v1.copy(vertex).applyMatrix4(matrixWorld);v2.copy(normal).applyMatrix3(normalMatrix).normalize().multiplyScalar(this.size).add(v1);position.setXYZ(idx,v1.x,v1.y,v1.z);idx = idx + 1;position.setXYZ(idx,v2.x,v2.y,v2.z);idx = idx + 1;}}}else if(objGeometry instanceof THREE.BufferGeometry){var objPos=objGeometry.attributes.position;var objNorm=objGeometry.attributes.normal;var idx=0; // for simplicity, ignore index and drawcalls, and render every normal
	for(var j=0,jl=objPos.count;j < jl;j++) {v1.set(objPos.getX(j),objPos.getY(j),objPos.getZ(j)).applyMatrix4(matrixWorld);v2.set(objNorm.getX(j),objNorm.getY(j),objNorm.getZ(j));v2.applyMatrix3(normalMatrix).normalize().multiplyScalar(this.size).add(v1);position.setXYZ(idx,v1.x,v1.y,v1.z);idx = idx + 1;position.setXYZ(idx,v2.x,v2.y,v2.z);idx = idx + 1;}}position.needsUpdate = true;return this;};})(); // File:src/extras/helpers/WireframeHelper.js
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */THREE.WireframeHelper = function(object,hex){var color=hex !== undefined?hex:0xffffff;THREE.LineSegments.call(this,new THREE.WireframeGeometry(object.geometry),new THREE.LineBasicMaterial({color:color}));this.matrix = object.matrixWorld;this.matrixAutoUpdate = false;};THREE.WireframeHelper.prototype = Object.create(THREE.LineSegments.prototype);THREE.WireframeHelper.prototype.constructor = THREE.WireframeHelper; // File:src/extras/objects/ImmediateRenderObject.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.ImmediateRenderObject = function(){THREE.Object3D.call(this);this.render = function(renderCallback){};};THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject; // File:src/extras/objects/MorphBlendMesh.js
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */THREE.MorphBlendMesh = function(geometry,material){THREE.Mesh.call(this,geometry,material);this.animationsMap = {};this.animationsList = []; // prepare default animation
	// (all frames played together in 1 second)
	var numFrames=this.geometry.morphTargets.length;var name="__default";var startFrame=0;var endFrame=numFrames - 1;var fps=numFrames / 1;this.createAnimation(name,startFrame,endFrame,fps);this.setAnimationWeight(name,1);};THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh;THREE.MorphBlendMesh.prototype.createAnimation = function(name,start,end,fps){var animation={start:start,end:end,length:end - start + 1,fps:fps,duration:(end - start) / fps,lastFrame:0,currentFrame:0,active:false,time:0,direction:1,weight:1,directionBackwards:false,mirroredLoop:false};this.animationsMap[name] = animation;this.animationsList.push(animation);};THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(fps){var pattern=/([a-z]+)_?(\d+)/;var firstAnimation,frameRanges={};var geometry=this.geometry;for(var i=0,il=geometry.morphTargets.length;i < il;i++) {var morph=geometry.morphTargets[i];var chunks=morph.name.match(pattern);if(chunks && chunks.length > 1){var name=chunks[1];if(!frameRanges[name])frameRanges[name] = {start:Infinity,end:-Infinity};var range=frameRanges[name];if(i < range.start)range.start = i;if(i > range.end)range.end = i;if(!firstAnimation)firstAnimation = name;}}for(var name in frameRanges) {var range=frameRanges[name];this.createAnimation(name,range.start,range.end,fps);}this.firstAnimation = firstAnimation;};THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(name){var animation=this.animationsMap[name];if(animation){animation.direction = 1;animation.directionBackwards = false;}};THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(name){var animation=this.animationsMap[name];if(animation){animation.direction = -1;animation.directionBackwards = true;}};THREE.MorphBlendMesh.prototype.setAnimationFPS = function(name,fps){var animation=this.animationsMap[name];if(animation){animation.fps = fps;animation.duration = (animation.end - animation.start) / animation.fps;}};THREE.MorphBlendMesh.prototype.setAnimationDuration = function(name,duration){var animation=this.animationsMap[name];if(animation){animation.duration = duration;animation.fps = (animation.end - animation.start) / animation.duration;}};THREE.MorphBlendMesh.prototype.setAnimationWeight = function(name,weight){var animation=this.animationsMap[name];if(animation){animation.weight = weight;}};THREE.MorphBlendMesh.prototype.setAnimationTime = function(name,time){var animation=this.animationsMap[name];if(animation){animation.time = time;}};THREE.MorphBlendMesh.prototype.getAnimationTime = function(name){var time=0;var animation=this.animationsMap[name];if(animation){time = animation.time;}return time;};THREE.MorphBlendMesh.prototype.getAnimationDuration = function(name){var duration=-1;var animation=this.animationsMap[name];if(animation){duration = animation.duration;}return duration;};THREE.MorphBlendMesh.prototype.playAnimation = function(name){var animation=this.animationsMap[name];if(animation){animation.time = 0;animation.active = true;}else {console.warn("THREE.MorphBlendMesh: animation[" + name + "] undefined in .playAnimation()");}};THREE.MorphBlendMesh.prototype.stopAnimation = function(name){var animation=this.animationsMap[name];if(animation){animation.active = false;}};THREE.MorphBlendMesh.prototype.update = function(delta){for(var i=0,il=this.animationsList.length;i < il;i++) {var animation=this.animationsList[i];if(!animation.active)continue;var frameTime=animation.duration / animation.length;animation.time += animation.direction * delta;if(animation.mirroredLoop){if(animation.time > animation.duration || animation.time < 0){animation.direction *= -1;if(animation.time > animation.duration){animation.time = animation.duration;animation.directionBackwards = true;}if(animation.time < 0){animation.time = 0;animation.directionBackwards = false;}}}else {animation.time = animation.time % animation.duration;if(animation.time < 0)animation.time += animation.duration;}var keyframe=animation.start + THREE.Math.clamp(Math.floor(animation.time / frameTime),0,animation.length - 1);var weight=animation.weight;if(keyframe !== animation.currentFrame){this.morphTargetInfluences[animation.lastFrame] = 0;this.morphTargetInfluences[animation.currentFrame] = 1 * weight;this.morphTargetInfluences[keyframe] = 0;animation.lastFrame = animation.currentFrame;animation.currentFrame = keyframe;}var mix=animation.time % frameTime / frameTime;if(animation.directionBackwards)mix = 1 - mix;if(animation.currentFrame !== animation.lastFrame){this.morphTargetInfluences[animation.currentFrame] = mix * weight;this.morphTargetInfluences[animation.lastFrame] = (1 - mix) * weight;}else {this.morphTargetInfluences[animation.currentFrame] = weight;}}}; // Export the THREE object for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `_` as a global object via a string identifier,
	// for Closure Compiler "advanced" mode.
	if(true){if(typeof module !== 'undefined' && module.exports){exports = module.exports = THREE;}exports.THREE = THREE;}else {undefined['THREE'] = THREE;}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Three = __webpack_require__(3),
	    BaseApp = __webpack_require__(5);

	var ThreejsApp = (function (_BaseApp) {
	    _inherits(ThreejsApp, _BaseApp);

	    function ThreejsApp(container, width, height) {
	        _classCallCheck(this, ThreejsApp);

	        _get(Object.getPrototypeOf(ThreejsApp.prototype), 'constructor', this).call(this);
	        this.rootScene = new Three.Scene();
	        this.camera = new Three.PerspectiveCamera(90, width / height, 0.1, 1000 * 1000);
	        this.camera.position.z = 100;
	        var renderer = this.renderer = new Three.WebGLRenderer();
	        renderer.setPixelRatio(window.devicePixelRatio);
	        renderer.setSize(width, height);
	        container.appendChild(renderer.domElement);

	        this._onWindowResize = this._onWindowResize.bind(this);
	        this._bindEvents();
	    }

	    _createClass(ThreejsApp, [{
	        key: 'beforeUpdate',
	        value: function beforeUpdate() {}
	    }, {
	        key: 'update',
	        value: function update() {}
	    }, {
	        key: 'afterUpdate',
	        value: function afterUpdate() {
	            this.render();
	        }
	    }, {
	        key: 'onBodyData',
	        value: function onBodyData(bodyFrame) {}
	    }, {
	        key: 'onColorData',
	        value: function onColorData(colorFrame) {}
	    }, {
	        key: 'render',
	        value: function render() {
	            this.camera.lookAt(new Three.Vector3());
	            this.renderer.render(this.rootScene, this.camera);
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            _get(Object.getPrototypeOf(ThreejsApp.prototype), 'stop', this).call(this);
	            this._unbinedEvents();
	        }
	    }, {
	        key: '_bindEvents',
	        value: function _bindEvents() {
	            window.addEventListener('resize', this._onWindowResize, false);
	        }
	    }, {
	        key: '_unbinedEvents',
	        value: function _unbinedEvents() {
	            window.removeEventListener('resize', this._onWindowResize, false);
	        }
	    }, {
	        key: '_onWindowResize',
	        value: function _onWindowResize() {
	            this.camera.aspect = window.innerWidth / window.innerHeight;
	            this.camera.updateProjectionMatrix();
	            this.renderer.setSize(window.innerWidth, window.innerHeight);
	        }
	    }, {
	        key: '_handleMessage',
	        value: function _handleMessage(msg) {
	            _get(Object.getPrototypeOf(ThreejsApp.prototype), '_handleMessage', this).call(this, msg);
	        }
	    }]);

	    return ThreejsApp;
	})(BaseApp);

	module.exports = BaseApp;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var BodyData = __webpack_require__(6),
	    PixelData = __webpack_require__(27);

	var BaseApp = (function () {
	    function BaseApp() {
	        _classCallCheck(this, BaseApp);

	        this._bindSocket();
	    }

	    _createClass(BaseApp, [{
	        key: 'run',
	        value: function run() {
	            this.animationFrameId = requestAnimationFrame(this._update.bind(this));
	        }
	    }, {
	        key: '_update',
	        value: function _update() {
	            this.beforeUpdate();
	            this.update();
	            this.afterUpdate();
	            this.animationFrameId = requestAnimationFrame(this._update.bind(this));
	        }
	    }, {
	        key: 'beforeUpdate',
	        value: function beforeUpdate() {}
	    }, {
	        key: 'update',
	        value: function update() {}
	    }, {
	        key: 'afterUpdate',
	        value: function afterUpdate() {}
	    }, {
	        key: 'onBodyData',
	        value: function onBodyData(bodyFrame) {}
	    }, {
	        key: 'onColorData',
	        value: function onColorData(colorFrame) {}
	    }, {
	        key: 'stop',
	        value: function stop() {
	            cancelAnimationFrame(this.animationFrameId);
	            this._unbindSocket();
	        }
	    }, {
	        key: '_bindSocket',
	        value: function _bindSocket() {
	            this.websocket = new WebSocket('ws://localhost:1234/');
	            this.websocket.onmessage = this._handleMessage.bind(this);
	        }
	    }, {
	        key: '_handleMessage',
	        value: function _handleMessage(msg) {
	            var packet = JSON.parse(msg.data);
	            switch (packet.type) {
	                case 'bodyData':
	                    return this._onBodyData(packet.data);
	                case 'colorData':
	                    return this._onColorData(packet.data);
	            }
	        }
	    }, {
	        key: '_onColorData',
	        value: function _onColorData(data) {
	            return this.onColorData(new PixelData(atob(data), { deflated: true }));
	        }
	    }, {
	        key: '_onBodyData',
	        value: function _onBodyData(data) {
	            return this.onBodyData(new BodyData(data));
	        }
	    }, {
	        key: '_unbindSocket',
	        value: function _unbindSocket() {
	            this.websocket.close();
	        }
	    }]);

	    return BaseApp;
	})();

	module.exports = BaseApp;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var JointType = __webpack_require__(7),
	    HandState = __webpack_require__(8),
	    Body = __webpack_require__(9);

	var BodyData = (function () {
	    function BodyData(data, options) {
	        _classCallCheck(this, BodyData);

	        options = options || {};

	        this.bodies = [];
	        options.deflated ? this.setDeflatedData(data) // did we receive the data deflated?
	        : this.setData(data); // we received raw data
	    }

	    _createClass(BodyData, [{
	        key: 'setData',
	        value: function setData(data) {
	            var _this = this;

	            this.bodies = [];
	            data.bodies.forEach(function (body) {
	                if (body.tracked) _this.bodies.push(new Body(body));
	            });
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            return {
	                bodies: this.bodies.map(function (body) {
	                    return body.getData();
	                })
	            };
	        }
	    }, {
	        key: 'setDeflatedData',
	        value: function setDeflatedData(data) {
	            // todo
	            console.warn('BodyData::setDeflatedData not yet implemented');
	        }
	    }, {
	        key: 'getDeflatedData',
	        value: function getDeflatedData() {
	            // todo
	            console.warn('BodyData::getDeflatedData not yet implemented');
	        }
	    }]);

	    return BodyData;
	})();

	;

	module.exports = BodyData;
	module.exports.jointType = JointType;
	module.exports.handState = HandState;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	// https://msdn.microsoft.com/en-us/library/microsoft.kinect.jointtype.aspx
	module.exports = {
	    SpineBase: 0, // Base of the spine
	    SpineMid: 1, // Middle of the spine
	    Neck: 2, // Neck
	    Head: 3, // Head
	    ShoulderLeft: 4, // Left shoulder
	    ElbowLeft: 5, // Left elbow
	    WristLeft: 6, // Left wrist
	    HandLeft: 7, // Left hand
	    ShoulderRight: 8, // Right shoulder
	    ElbowRight: 9, // Right elbow
	    WristRight: 10, // Right wrist
	    HandRight: 11, // Right hand
	    HipLeft: 12, // Left hip
	    KneeLeft: 13, // Left knee
	    AnkleLeft: 14, // Left ankle
	    FootLeft: 15, // Left foot
	    HipRight: 16, // Right hip
	    KneeRight: 17, // Right knee
	    AnkleRight: 18, // Right ankle
	    FootRight: 19, // Right foot
	    SpineShoulder: 20, // Spine at the shoulder
	    HandTipLeft: 21, // Tip of the left hand
	    ThumbLeft: 22, // Left thumb
	    HandTipRight: 23, // Tip of the right hand
	    ThumbRight: 24 };
	// Right thumb

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    Unknown: 0, // The state of the hand in unknown.
	    NotTracked: 1, // Hand state is not tracked.
	    Open: 2, // The hand is open.
	    Closed: 3, // The hand is closed.
	    Lasso: 4 };
	// The hand is in the lasso state.

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Joint = __webpack_require__(10);

	var Body = (function () {
	    function Body(data, options) {
	        _classCallCheck(this, Body);

	        options = options || {};
	        this.jointCount = 0;
	        this.trackingId = 0;
	        this.leftHandState = 0;
	        this.rightHandState = 0;
	        this.tracked = false;
	        this.joints = [];

	        options.deflated ? this.setDeflatedData(data) : this.setData(data);
	    }

	    _createClass(Body, [{
	        key: 'setData',
	        value: function setData(data) {
	            var _this = this;

	            this.tracked = data.tracked;
	            this.jointCount = this.tracked ? data.joints.length : 0;
	            this.trackingId = this.tracked ? data.trackingId : 0;
	            this.leftHandState = this.tracked ? data.leftHandState : 0;
	            this.rightHandState = this.tracked ? data.rightHandState : 0;
	            this.joints = [];
	            this.tracked ? data.joints.forEach(function (joint) {
	                _this.joints.push(new Joint(joint));
	            }) : 0;
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            return {
	                tracked: this.tracked,
	                jointCount: this.jointCount,
	                trackingId: this.trackingId,
	                leftHandState: this.leftHandState,
	                rightHandState: this.rightHandState,
	                joints: this.joints.map(function (joint) {
	                    return joint.getData();
	                })
	            };
	        }
	    }, {
	        key: 'setDeflatedData',
	        value: function setDeflatedData(data) {
	            // todo
	            console.warn('Body::setDeflatedData not yet implemented');
	        }
	    }, {
	        key: 'getDeflatedData',
	        value: function getDeflatedData() {
	            // todo
	            console.warn('Body::getDeflatedData not yet implemented');
	        }
	    }]);

	    return Body;
	})();

	module.exports = Body;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Pako = __webpack_require__(11),
	    Vector2 = __webpack_require__(3).Vector2,
	    Vector3 = __webpack_require__(3).Vector3,
	    Vector4 = __webpack_require__(3).Vector4;

	var Joint = (function () {
	    function Joint(data, options) {
	        _classCallCheck(this, Joint);

	        options = options || {};
	        this.position = new Vector3(); // position in a 3d scene, relative to the camera
	        this.depth = new Vector2(); // position on a 2d plane, relative to the depth sensor. x * width, y * width
	        this.color = new Vector2(); // position on a 2d plane, relative to the color sensor. x * width, y * width
	        this.orientation = new Vector4(); // orientation relative to the parent Join.

	        options.deflated ? this.setDeflatedData(data) : this.setData(data);
	    }

	    _createClass(Joint, [{
	        key: 'setData',
	        value: function setData(data) {
	            this.position.set(data.cameraX, data.cameraY, data.cameraZ);
	            this.depth.set(data.depthX, data.depthY);
	            this.color.set(data.colorX, data.colorY);
	            this.orientation.set(data.orientationX, data.orientationY, data.orientationZ, data.orientationW);
	        }
	    }, {
	        key: 'setDeflatedData',
	        value: function setDeflatedData(data) {
	            // todo
	            console.warn('Joint::setDeflatedData not yet implemented');
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            return {
	                cameraX: this.position.x,
	                cameraY: this.position.y,
	                cameraZ: this.position.z,
	                depthX: this.depth.x,
	                depthY: this.depth.y,
	                colorX: this.color.x,
	                colorY: this.color.y,
	                orientationX: this.orientation.x,
	                orientationY: this.orientation.y,
	                orientationZ: this.orientation.z,
	                orientationW: this.orientation.w
	            };
	        }
	    }, {
	        key: 'getDeflatedData',
	        value: function getDeflatedData() {
	            console.warn('Joint::getDeflatedData not yet implemented');
	        }
	    }]);

	    return Joint;
	})();

	module.exports = Joint;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Top level file is just a mixin of submodules & constants
	'use strict';

	var assign = __webpack_require__(12).assign;

	var deflate = __webpack_require__(13);
	var inflate = __webpack_require__(21);
	var constants = __webpack_require__(25);

	var pako = {};

	assign(pako, deflate, inflate, constants);

	module.exports = pako;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var TYPED_OK = typeof Uint8Array !== 'undefined' && typeof Uint16Array !== 'undefined' && typeof Int32Array !== 'undefined';

	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) {
	      continue;
	    }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be non-object');
	    }

	    for (var p in source) {
	      if (source.hasOwnProperty(p)) {
	        obj[p] = source[p];
	      }
	    }
	  }

	  return obj;
	};

	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) {
	    return buf;
	  }
	  if (buf.subarray) {
	    return buf.subarray(0, size);
	  }
	  buf.length = size;
	  return buf;
	};

	var fnTyped = {
	  arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function flattenChunks(chunks) {
	    var i, l, len, pos, chunk, result;

	    // calculate data length
	    len = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      len += chunks[i].length;
	    }

	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }

	    return result;
	  }
	};

	var fnUntyped = {
	  arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function flattenChunks(chunks) {
	    return [].concat.apply([], chunks);
	  }
	};

	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8 = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8 = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};

	exports.setTyped(TYPED_OK);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var zlib_deflate = __webpack_require__(14);
	var utils = __webpack_require__(12);
	var strings = __webpack_require__(19);
	var msg = __webpack_require__(18);
	var zstream = __webpack_require__(20);

	var toString = Object.prototype.toString;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/

	var Z_NO_FLUSH = 0;
	var Z_FINISH = 4;

	var Z_OK = 0;
	var Z_STREAM_END = 1;
	var Z_SYNC_FLUSH = 2;

	var Z_DEFAULT_COMPRESSION = -1;

	var Z_DEFAULT_STRATEGY = 0;

	var Z_DEFLATED = 8;

	/* ===========================================================================*/

	/**
	 * class Deflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[deflate]],
	 * [[deflateRaw]] and [[gzip]].
	 **/

	/* internal
	 * Deflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Deflate#onData]] not overriden.
	 **/

	/**
	 * Deflate.result -> Uint8Array|Array
	 *
	 * Compressed result, generated by default [[Deflate#onData]]
	 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
	 * push a chunk with explicit flush (call [[Deflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Deflate.err -> Number
	 *
	 * Error code after deflate finished. 0 (Z_OK) on success.
	 * You will not need it in real life, because deflate errors
	 * are possible only on wrong options or bad `onData` / `onEnd`
	 * custom handlers.
	 **/

	/**
	 * Deflate.msg -> String
	 *
	 * Error message, if [[Deflate.err]] != 0
	 **/

	/**
	 * new Deflate(options)
	 * - options (Object): zlib deflate options.
	 *
	 * Creates new deflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `level`
	 * - `windowBits`
	 * - `memLevel`
	 * - `strategy`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw deflate
	 * - `gzip` (Boolean) - create gzip wrapper
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 * - `header` (Object) - custom header for gzip
	 *   - `text` (Boolean) - true if compressed data believed to be text
	 *   - `time` (Number) - modification time, unix timestamp
	 *   - `os` (Number) - operation system code
	 *   - `extra` (Array) - array of bytes with extra data (max 65536)
	 *   - `name` (String) - file name (binary string)
	 *   - `comment` (String) - comment (binary string)
	 *   - `hcrc` (Boolean) - true if header crc should be added
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var deflate = new pako.Deflate({ level: 3});
	 *
	 * deflate.push(chunk1, false);
	 * deflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (deflate.err) { throw new Error(deflate.err); }
	 *
	 * console.log(deflate.result);
	 * ```
	 **/
	var Deflate = function Deflate(options) {

	  this.options = utils.assign({
	    level: Z_DEFAULT_COMPRESSION,
	    method: Z_DEFLATED,
	    chunkSize: 16384,
	    windowBits: 15,
	    memLevel: 8,
	    strategy: Z_DEFAULT_STRATEGY,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  if (opt.raw && opt.windowBits > 0) {
	    opt.windowBits = -opt.windowBits;
	  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
	    opt.windowBits += 16;
	  }

	  this.err = 0; // error code, if happens (0 = Z_OK)
	  this.msg = ''; // error message
	  this.ended = false; // used to avoid multiple onEnd() calls
	  this.chunks = []; // chunks of compressed data

	  this.strm = new zstream();
	  this.strm.avail_out = 0;

	  var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);

	  if (status !== Z_OK) {
	    throw new Error(msg[status]);
	  }

	  if (opt.header) {
	    zlib_deflate.deflateSetHeader(this.strm, opt.header);
	  }
	};

	/**
	 * Deflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
	 *   converted to utf8 byte sequence.
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
	 * new compressed chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the compression context.
	 *
	 * On fail call [[Deflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * array format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Deflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;

	  if (this.ended) {
	    return false;
	  }

	  _mode = mode === ~ ~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // If we need to compress text, change encoding to utf8.
	    strm.input = strings.string2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }
	    status = zlib_deflate.deflate(strm, _mode); /* no bad return value */

	    if (status !== Z_STREAM_END && status !== Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }
	    if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
	      if (this.options.to === 'string') {
	        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
	      } else {
	        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	      }
	    }
	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

	  // Finalize on the last chunk.
	  if (_mode === Z_FINISH) {
	    status = zlib_deflate.deflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === Z_SYNC_FLUSH) {
	    this.onEnd(Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};

	/**
	 * Deflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Deflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};

	/**
	 * Deflate#onEnd(status) -> Void
	 * - status (Number): deflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called once after you tell deflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Deflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === Z_OK) {
	    if (this.options.to === 'string') {
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};

	/**
	 * deflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * Compress `data` with deflate alrorythm and `options`.
	 *
	 * Supported options are:
	 *
	 * - level
	 * - windowBits
	 * - memLevel
	 * - strategy
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
	 *
	 * console.log(pako.deflate(data));
	 * ```
	 **/
	function deflate(input, options) {
	  var deflator = new Deflate(options);

	  deflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (deflator.err) {
	    throw deflator.msg;
	  }

	  return deflator.result;
	}

	/**
	 * deflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function deflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return deflate(input, options);
	}

	/**
	 * gzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but create gzip wrapper instead of
	 * deflate one.
	 **/
	function gzip(input, options) {
	  options = options || {};
	  options.gzip = true;
	  return deflate(input, options);
	}

	exports.Deflate = Deflate;
	exports.deflate = deflate;
	exports.deflateRaw = deflateRaw;
	exports.gzip = gzip;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);
	var trees = __webpack_require__(15);
	var adler32 = __webpack_require__(16);
	var crc32 = __webpack_require__(17);
	var msg = __webpack_require__(18);

	/* Public constants ==========================================================*/
	/* ===========================================================================*/

	/* Allowed flush values; see deflate() and inflate() below for details */
	var Z_NO_FLUSH = 0;
	var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	var Z_FULL_FLUSH = 3;
	var Z_FINISH = 4;
	var Z_BLOCK = 5;
	//var Z_TREES         = 6;

	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK = 0;
	var Z_STREAM_END = 1;
	//var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR = -2;
	var Z_DATA_ERROR = -3;
	//var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR = -5;
	//var Z_VERSION_ERROR = -6;

	/* compression levels */
	//var Z_NO_COMPRESSION      = 0;
	//var Z_BEST_SPEED          = 1;
	//var Z_BEST_COMPRESSION    = 9;
	var Z_DEFAULT_COMPRESSION = -1;

	var Z_FILTERED = 1;
	var Z_HUFFMAN_ONLY = 2;
	var Z_RLE = 3;
	var Z_FIXED = 4;
	var Z_DEFAULT_STRATEGY = 0;

	/* Possible values of the data_type field (though see inflate()) */
	//var Z_BINARY              = 0;
	//var Z_TEXT                = 1;
	//var Z_ASCII               = 1; // = Z_TEXT
	var Z_UNKNOWN = 2;

	/* The deflate compression method */
	var Z_DEFLATED = 8;

	/*============================================================================*/

	var MAX_MEM_LEVEL = 9;
	/* Maximum value for memLevel in deflateInit2 */
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_MEM_LEVEL = 8;

	var LENGTH_CODES = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	var LITERALS = 256;
	/* number of literal bytes 0..255 */
	var L_CODES = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	var D_CODES = 30;
	/* number of distance codes */
	var BL_CODES = 19;
	/* number of codes used to transfer the bit lengths */
	var HEAP_SIZE = 2 * L_CODES + 1;
	/* maximum heap size */
	var MAX_BITS = 15;
	/* All codes must not exceed MAX_BITS bits */

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;

	var PRESET_DICT = 0x20;

	var INIT_STATE = 42;
	var EXTRA_STATE = 69;
	var NAME_STATE = 73;
	var COMMENT_STATE = 91;
	var HCRC_STATE = 103;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;

	var BS_NEED_MORE = 1; /* block not completed, need more input or more output */
	var BS_BLOCK_DONE = 2; /* block flush performed */
	var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
	var BS_FINISH_DONE = 4; /* finish done, accept no more input or output */

	var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

	function err(strm, errorCode) {
	  strm.msg = msg[errorCode];
	  return errorCode;
	}

	function rank(f) {
	  return (f << 1) - (f > 4 ? 9 : 0);
	}

	function zero(buf) {
	  var len = buf.length;while (--len >= 0) {
	    buf[len] = 0;
	  }
	}

	/* =========================================================================
	 * Flush as much pending output as possible. All deflate() output goes
	 * through this function so some applications may wish to modify it
	 * to avoid allocating a large strm->output buffer and copying into it.
	 * (See also read_buf()).
	 */
	function flush_pending(strm) {
	  var s = strm.state;

	  //_tr_flush_bits(s);
	  var len = s.pending;
	  if (len > strm.avail_out) {
	    len = strm.avail_out;
	  }
	  if (len === 0) {
	    return;
	  }

	  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
	  strm.next_out += len;
	  s.pending_out += len;
	  strm.total_out += len;
	  strm.avail_out -= len;
	  s.pending -= len;
	  if (s.pending === 0) {
	    s.pending_out = 0;
	  }
	}

	function flush_block_only(s, last) {
	  trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
	  s.block_start = s.strstart;
	  flush_pending(s.strm);
	}

	function put_byte(s, b) {
	  s.pending_buf[s.pending++] = b;
	}

	/* =========================================================================
	 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
	 * IN assertion: the stream state is correct and there is enough room in
	 * pending_buf.
	 */
	function putShortMSB(s, b) {
	  //  put_byte(s, (Byte)(b >> 8));
	  //  put_byte(s, (Byte)(b & 0xff));
	  s.pending_buf[s.pending++] = b >>> 8 & 0xff;
	  s.pending_buf[s.pending++] = b & 0xff;
	}

	/* ===========================================================================
	 * Read a new buffer from the current input stream, update the adler32
	 * and total number of bytes read.  All deflate() input goes through
	 * this function so some applications may wish to modify it to avoid
	 * allocating a large strm->input buffer and copying from it.
	 * (See also flush_pending()).
	 */
	function read_buf(strm, buf, start, size) {
	  var len = strm.avail_in;

	  if (len > size) {
	    len = size;
	  }
	  if (len === 0) {
	    return 0;
	  }

	  strm.avail_in -= len;

	  utils.arraySet(buf, strm.input, strm.next_in, len, start);
	  if (strm.state.wrap === 1) {
	    strm.adler = adler32(strm.adler, buf, len, start);
	  } else if (strm.state.wrap === 2) {
	    strm.adler = crc32(strm.adler, buf, len, start);
	  }

	  strm.next_in += len;
	  strm.total_in += len;

	  return len;
	}

	/* ===========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 * OUT assertion: the match length is not greater than s->lookahead.
	 */
	function longest_match(s, cur_match) {
	  var chain_length = s.max_chain_length; /* max hash chain length */
	  var scan = s.strstart; /* current string */
	  var match; /* matched string */
	  var len; /* length of current match */
	  var best_len = s.prev_length; /* best match length so far */
	  var nice_match = s.nice_match; /* stop if match long enough */
	  var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0 /*NIL*/;

	  var _win = s.window; // shortcut

	  var wmask = s.w_mask;
	  var prev = s.prev;

	  /* Stop when cur_match becomes <= limit. To simplify the code,
	   * we prevent matches with the string of window index 0.
	   */

	  var strend = s.strstart + MAX_MATCH;
	  var scan_end1 = _win[scan + best_len - 1];
	  var scan_end = _win[scan + best_len];

	  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
	   * It is easy to get rid of this optimization if necessary.
	   */
	  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

	  /* Do not waste too much time if we already have a good match: */
	  if (s.prev_length >= s.good_match) {
	    chain_length >>= 2;
	  }
	  /* Do not look for matches beyond the end of the input. This is necessary
	   * to make deflate deterministic.
	   */
	  if (nice_match > s.lookahead) {
	    nice_match = s.lookahead;
	  }

	  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

	  do {
	    // Assert(cur_match < s->strstart, "no future");
	    match = cur_match;

	    /* Skip to next match if the match length cannot increase
	     * or if the match length is less than 2.  Note that the checks below
	     * for insufficient lookahead only occur occasionally for performance
	     * reasons.  Therefore uninitialized memory will be accessed, and
	     * conditional jumps will be made that depend on those values.
	     * However the length of the match is limited to the lookahead, so
	     * the output of deflate is not affected by the uninitialized values.
	     */

	    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
	      continue;
	    }

	    /* The check at best_len-1 can be removed because it will be made
	     * again later. (This heuristic is not always a win.)
	     * It is not necessary to compare scan[2] and match[2] since they
	     * are always equal when the other bytes match, given that
	     * the hash keys are equal and that HASH_BITS >= 8.
	     */
	    scan += 2;
	    match++;
	    // Assert(*scan == *match, "match[2]?");

	    /* We check for insufficient lookahead only every 8th comparison;
	     * the 256th check will be made at strstart+258.
	     */
	    do {
	      /*jshint noempty:false*/
	    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);

	    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

	    len = MAX_MATCH - (strend - scan);
	    scan = strend - MAX_MATCH;

	    if (len > best_len) {
	      s.match_start = cur_match;
	      best_len = len;
	      if (len >= nice_match) {
	        break;
	      }
	      scan_end1 = _win[scan + best_len - 1];
	      scan_end = _win[scan + best_len];
	    }
	  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

	  if (best_len <= s.lookahead) {
	    return best_len;
	  }
	  return s.lookahead;
	}

	/* ===========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead.
	 *
	 * IN assertion: lookahead < MIN_LOOKAHEAD
	 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	 *    At least one byte has been read, or avail_in == 0; reads are
	 *    performed for at least two bytes (required for the zip translate_eol
	 *    option -- not supported here).
	 */
	function fill_window(s) {
	  var _w_size = s.w_size;
	  var p, n, m, more, str;

	  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

	  do {
	    more = s.window_size - s.lookahead - s.strstart;

	    // JS ints have 32 bit, block below not needed
	    /* Deal with !@#$% 64K limit: */
	    //if (sizeof(int) <= 2) {
	    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
	    //        more = wsize;
	    //
	    //  } else if (more == (unsigned)(-1)) {
	    //        /* Very unlikely, but possible on 16 bit machine if
	    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
	    //         */
	    //        more--;
	    //    }
	    //}

	    /* If the window is almost full and there is insufficient lookahead,
	     * move the upper half to the lower one to make room in the upper half.
	     */
	    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

	      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
	      s.match_start -= _w_size;
	      s.strstart -= _w_size;
	      /* we now have strstart >= MAX_DIST */
	      s.block_start -= _w_size;

	      /* Slide the hash table (could be avoided with 32 bit values
	       at the expense of memory usage). We slide even when level == 0
	       to keep the hash table consistent if we switch back to level > 0
	       later. (Using level 0 permanently is not an optimal usage of
	       zlib, so we don't care about this pathological case.)
	       */

	      n = s.hash_size;
	      p = n;
	      do {
	        m = s.head[--p];
	        s.head[p] = m >= _w_size ? m - _w_size : 0;
	      } while (--n);

	      n = _w_size;
	      p = n;
	      do {
	        m = s.prev[--p];
	        s.prev[p] = m >= _w_size ? m - _w_size : 0;
	        /* If n is not on any hash chain, prev[n] is garbage but
	         * its value will never be used.
	         */
	      } while (--n);

	      more += _w_size;
	    }
	    if (s.strm.avail_in === 0) {
	      break;
	    }

	    /* If there was no sliding:
	     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
	     *    more == window_size - lookahead - strstart
	     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
	     * => more >= window_size - 2*WSIZE + 2
	     * In the BIG_MEM or MMAP case (not yet supported),
	     *   window_size == input_size + MIN_LOOKAHEAD  &&
	     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
	     * Otherwise, window_size == 2*WSIZE so more >= 2.
	     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
	     */
	    //Assert(more >= 2, "more < 2");
	    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
	    s.lookahead += n;

	    /* Initialize the hash value now that we have some input: */
	    if (s.lookahead + s.insert >= MIN_MATCH) {
	      str = s.strstart - s.insert;
	      s.ins_h = s.window[str];

	      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
	      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
	      //#if MIN_MATCH != 3
	      //        Call update_hash() MIN_MATCH-3 more times
	      //#endif
	      while (s.insert) {
	        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	        s.prev[str & s.w_mask] = s.head[s.ins_h];
	        s.head[s.ins_h] = str;
	        str++;
	        s.insert--;
	        if (s.lookahead + s.insert < MIN_MATCH) {
	          break;
	        }
	      }
	    }
	    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
	     * but this is not important since only literal bytes will be emitted.
	     */
	  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

	  /* If the WIN_INIT bytes after the end of the current data have never been
	   * written, then zero those bytes in order to avoid memory check reports of
	   * the use of uninitialized (or uninitialised as Julian writes) bytes by
	   * the longest match routines.  Update the high water mark for the next
	   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
	   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
	   */
	  //  if (s.high_water < s.window_size) {
	  //    var curr = s.strstart + s.lookahead;
	  //    var init = 0;
	  //
	  //    if (s.high_water < curr) {
	  //      /* Previous high water mark below current data -- zero WIN_INIT
	  //       * bytes or up to end of window, whichever is less.
	  //       */
	  //      init = s.window_size - curr;
	  //      if (init > WIN_INIT)
	  //        init = WIN_INIT;
	  //      zmemzero(s->window + curr, (unsigned)init);
	  //      s->high_water = curr + init;
	  //    }
	  //    else if (s->high_water < (ulg)curr + WIN_INIT) {
	  //      /* High water mark at or above current data, but below current data
	  //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
	  //       * to end of window, whichever is less.
	  //       */
	  //      init = (ulg)curr + WIN_INIT - s->high_water;
	  //      if (init > s->window_size - s->high_water)
	  //        init = s->window_size - s->high_water;
	  //      zmemzero(s->window + s->high_water, (unsigned)init);
	  //      s->high_water += init;
	  //    }
	  //  }
	  //
	  //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
	  //    "not enough room for search");
	}

	/* ===========================================================================
	 * Copy without compression as much as possible from the input stream, return
	 * the current block state.
	 * This function does not insert new strings in the dictionary since
	 * uncompressible data is probably not useful. This function is used
	 * only for the level=0 compression option.
	 * NOTE: this function should be optimized to avoid extra copying from
	 * window to pending_buf.
	 */
	function deflate_stored(s, flush) {
	  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
	   * to pending_buf_size, and each stored block has a 5 byte header:
	   */
	  var max_block_size = 0xffff;

	  if (max_block_size > s.pending_buf_size - 5) {
	    max_block_size = s.pending_buf_size - 5;
	  }

	  /* Copy as much as possible from input to output: */
	  for (;;) {
	    /* Fill the window as much as possible: */
	    if (s.lookahead <= 1) {

	      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
	      //  s->block_start >= (long)s->w_size, "slide too late");
	      //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
	      //        s.block_start >= s.w_size)) {
	      //        throw  new Error("slide too late");
	      //      }

	      fill_window(s);
	      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }

	      if (s.lookahead === 0) {
	        break;
	      }
	      /* flush the current block */
	    }
	    //Assert(s->block_start >= 0L, "block gone");
	    //    if (s.block_start < 0) throw new Error("block gone");

	    s.strstart += s.lookahead;
	    s.lookahead = 0;

	    /* Emit a stored block if pending_buf will be full: */
	    var max_start = s.block_start + max_block_size;

	    if (s.strstart === 0 || s.strstart >= max_start) {
	      /* strstart == 0 is possible when wraparound on 16-bit machine */
	      s.lookahead = s.strstart - max_start;
	      s.strstart = max_start;
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	    /* Flush if we may have to slide, otherwise block_start may become
	     * negative and the data will be gone:
	     */
	    if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }

	  s.insert = 0;

	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }

	  if (s.strstart > s.block_start) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_NEED_MORE;
	}

	/* ===========================================================================
	 * Compress as much as possible from the input stream, return the current
	 * block state.
	 * This function does not perform lazy evaluation of matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast(s, flush) {
	  var hash_head; /* head of the hash chain */
	  var bflush; /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break; /* flush the current block */
	      }
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0;
	    /*NIL*/if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     * At this point we have always match_length < MIN_MATCH
	     */
	    if (hash_head !== 0 /*NIL*/ && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	    }
	    if (s.match_length >= MIN_MATCH) {
	      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

	      /*** _tr_tally_dist(s, s.strstart - s.match_start,
	                     s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;

	      /* Insert new strings in the hash table only if the match length
	       * is not too large. This saves time but degrades compression.
	       */
	      if (s.match_length <= s.max_lazy_match /*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
	        s.match_length--; /* string at strstart already in table */
	        do {
	          s.strstart++;
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
	           * always MIN_MATCH bytes ahead.
	           */
	        } while (--s.match_length !== 0);
	        s.strstart++;
	      } else {
	        s.strstart += s.match_length;
	        s.match_length = 0;
	        s.ins_h = s.window[s.strstart];
	        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
	        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;

	        //#if MIN_MATCH != 3
	        //                Call UPDATE_HASH() MIN_MATCH-3 more times
	        //#endif
	        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
	         * matter since it will be recomputed at next deflate call.
	         */
	      }
	    } else {
	        /* No match, output a literal byte */
	        //Tracevv((stderr,"%c", s.window[s.strstart]));
	        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	        s.lookahead--;
	        s.strstart++;
	      }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_slow(s, flush) {
	  var hash_head; /* head of hash chain */
	  var bflush; /* set if current block must be flushed */

	  var max_insert;

	  /* Process the input block. */
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break;
	      } /* flush the current block */
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0;
	    /*NIL*/if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     */
	    s.prev_length = s.match_length;
	    s.prev_match = s.match_start;
	    s.match_length = MIN_MATCH - 1;

	    if (hash_head !== 0 /*NIL*/ && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD /*MAX_DIST(s)*/) {
	        /* To simplify the code, we prevent matches with the string
	         * of window index 0 (in particular we have to avoid a match
	         * of the string with itself at the start of the input file).
	         */
	        s.match_length = longest_match(s, hash_head);
	        /* longest_match() sets match_start */

	        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096 /*TOO_FAR*/)) {

	            /* If prev_match is also MIN_MATCH, match_start is garbage
	             * but we will ignore the current match anyway.
	             */
	            s.match_length = MIN_MATCH - 1;
	          }
	      }
	    /* If there was a match at the previous step and the current
	     * match is not better, output the previous match:
	     */
	    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
	      max_insert = s.strstart + s.lookahead - MIN_MATCH;
	      /* Do not insert strings in hash table beyond this. */

	      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

	      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
	                     s.prev_length - MIN_MATCH, bflush);***/
	      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
	      /* Insert in hash table all strings up to the end of the match.
	       * strstart-1 and strstart are already inserted. If there is not
	       * enough lookahead, the last two strings are not inserted in
	       * the hash table.
	       */
	      s.lookahead -= s.prev_length - 1;
	      s.prev_length -= 2;
	      do {
	        if (++s.strstart <= max_insert) {
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	        }
	      } while (--s.prev_length !== 0);
	      s.match_available = 0;
	      s.match_length = MIN_MATCH - 1;
	      s.strstart++;

	      if (bflush) {
	        /*** FLUSH_BLOCK(s, 0); ***/
	        flush_block_only(s, false);
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	        /***/
	      }
	    } else if (s.match_available) {
	        /* If there was no match at the previous position, output a
	         * single literal. If there was a match but the current match
	         * is longer, truncate the previous match to a single literal.
	         */
	        //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	        if (bflush) {
	          /*** FLUSH_BLOCK_ONLY(s, 0) ***/
	          flush_block_only(s, false);
	          /***/
	        }
	        s.strstart++;
	        s.lookahead--;
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	      } else {
	        /* There is no previous match to compare with, wait for
	         * the next step to decide.
	         */
	        s.match_available = 1;
	        s.strstart++;
	        s.lookahead--;
	      }
	  }
	  //Assert (flush != Z_NO_FLUSH, "no flush?");
	  if (s.match_available) {
	    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	    s.match_available = 0;
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
	 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
	 * deflate switches away from Z_RLE.)
	 */
	function deflate_rle(s, flush) {
	  var bflush; /* set if current block must be flushed */
	  var prev; /* byte at distance one to match */
	  var scan, strend; /* scan goes up to strend for length of run */

	  var _win = s.window;

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the longest run, plus one for the unrolled loop.
	     */
	    if (s.lookahead <= MAX_MATCH) {
	      fill_window(s);
	      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break;
	      } /* flush the current block */
	    }

	    /* See how many times the previous byte repeats */
	    s.match_length = 0;
	    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
	      scan = s.strstart - 1;
	      prev = _win[scan];
	      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
	        strend = s.strstart + MAX_MATCH;
	        do {
	          /*jshint noempty:false*/
	        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
	        s.match_length = MAX_MATCH - (strend - scan);
	        if (s.match_length > s.lookahead) {
	          s.match_length = s.lookahead;
	        }
	      }
	      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
	    }

	    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
	    if (s.match_length >= MIN_MATCH) {
	      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

	      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;
	      s.strstart += s.match_length;
	      s.match_length = 0;
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s->window[s->strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
	 * (It will be regenerated if this run of deflate switches away from Huffman.)
	 */
	function deflate_huff(s, flush) {
	  var bflush; /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we have a literal to write. */
	    if (s.lookahead === 0) {
	      fill_window(s);
	      if (s.lookahead === 0) {
	        if (flush === Z_NO_FLUSH) {
	          return BS_NEED_MORE;
	        }
	        break; /* flush the current block */
	      }
	    }

	    /* Output a literal byte */
	    s.match_length = 0;
	    //Tracevv((stderr,"%c", s->window[s->strstart]));
	    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	    s.lookahead--;
	    s.strstart++;
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	var Config = function Config(good_length, max_lazy, nice_length, max_chain, func) {
	  this.good_length = good_length;
	  this.max_lazy = max_lazy;
	  this.nice_length = nice_length;
	  this.max_chain = max_chain;
	  this.func = func;
	};

	var configuration_table;

	configuration_table = [
	/*      good lazy nice chain */
	new Config(0, 0, 0, 0, deflate_stored), /* 0 store only */
	new Config(4, 4, 8, 4, deflate_fast), /* 1 max speed, no lazy matches */
	new Config(4, 5, 16, 8, deflate_fast), /* 2 */
	new Config(4, 6, 32, 32, deflate_fast), /* 3 */

	new Config(4, 4, 16, 16, deflate_slow), /* 4 lazy matches */
	new Config(8, 16, 32, 32, deflate_slow), /* 5 */
	new Config(8, 16, 128, 128, deflate_slow), /* 6 */
	new Config(8, 32, 128, 256, deflate_slow), /* 7 */
	new Config(32, 128, 258, 1024, deflate_slow), /* 8 */
	new Config(32, 258, 258, 4096, deflate_slow) /* 9 max compression */
	];

	/* ===========================================================================
	 * Initialize the "longest match" routines for a new zlib stream
	 */
	function lm_init(s) {
	  s.window_size = 2 * s.w_size;

	  /*** CLEAR_HASH(s); ***/
	  zero(s.head); // Fill with NIL (= 0);

	  /* Set the default configuration parameters:
	   */
	  s.max_lazy_match = configuration_table[s.level].max_lazy;
	  s.good_match = configuration_table[s.level].good_length;
	  s.nice_match = configuration_table[s.level].nice_length;
	  s.max_chain_length = configuration_table[s.level].max_chain;

	  s.strstart = 0;
	  s.block_start = 0;
	  s.lookahead = 0;
	  s.insert = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  s.ins_h = 0;
	}

	function DeflateState() {
	  this.strm = null; /* pointer back to this zlib stream */
	  this.status = 0; /* as the name implies */
	  this.pending_buf = null; /* output still pending */
	  this.pending_buf_size = 0; /* size of pending_buf */
	  this.pending_out = 0; /* next pending byte to output to the stream */
	  this.pending = 0; /* nb of bytes in the pending buffer */
	  this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
	  this.gzhead = null; /* gzip header information to write */
	  this.gzindex = 0; /* where in extra, name, or comment */
	  this.method = Z_DEFLATED; /* can only be DEFLATED */
	  this.last_flush = -1; /* value of flush param for previous deflate call */

	  this.w_size = 0; /* LZ77 window size (32K by default) */
	  this.w_bits = 0; /* log2(w_size)  (8..16) */
	  this.w_mask = 0; /* w_size - 1 */

	  this.window = null;
	  /* Sliding window. Input bytes are read into the second half of the window,
	   * and move to the first half later to keep a dictionary of at least wSize
	   * bytes. With this organization, matches are limited to a distance of
	   * wSize-MAX_MATCH bytes, but this ensures that IO is always
	   * performed with a length multiple of the block size.
	   */

	  this.window_size = 0;
	  /* Actual size of window: 2*wSize, except when the user input buffer
	   * is directly used as sliding window.
	   */

	  this.prev = null;
	  /* Link to older string with same hash index. To limit the size of this
	   * array to 64K, this link is maintained only for the last 32K strings.
	   * An index in this array is thus a window index modulo 32K.
	   */

	  this.head = null; /* Heads of the hash chains or NIL. */

	  this.ins_h = 0; /* hash index of string to be inserted */
	  this.hash_size = 0; /* number of elements in hash table */
	  this.hash_bits = 0; /* log2(hash_size) */
	  this.hash_mask = 0; /* hash_size-1 */

	  this.hash_shift = 0;
	  /* Number of bits by which ins_h must be shifted at each input
	   * step. It must be such that after MIN_MATCH steps, the oldest
	   * byte no longer takes part in the hash key, that is:
	   *   hash_shift * MIN_MATCH >= hash_bits
	   */

	  this.block_start = 0;
	  /* Window position at the beginning of the current output block. Gets
	   * negative when the window is moved backwards.
	   */

	  this.match_length = 0; /* length of best match */
	  this.prev_match = 0; /* previous match */
	  this.match_available = 0; /* set if previous match exists */
	  this.strstart = 0; /* start of string to insert */
	  this.match_start = 0; /* start of matching string */
	  this.lookahead = 0; /* number of valid bytes ahead in window */

	  this.prev_length = 0;
	  /* Length of the best match at previous step. Matches not greater than this
	   * are discarded. This is used in the lazy match evaluation.
	   */

	  this.max_chain_length = 0;
	  /* To speed up deflation, hash chains are never searched beyond this
	   * length.  A higher limit improves compression ratio but degrades the
	   * speed.
	   */

	  this.max_lazy_match = 0;
	  /* Attempt to find a better match only when the current match is strictly
	   * smaller than this value. This mechanism is used only for compression
	   * levels >= 4.
	   */
	  // That's alias to max_lazy_match, don't use directly
	  //this.max_insert_length = 0;
	  /* Insert new strings in the hash table only if the match length is not
	   * greater than this length. This saves time but degrades compression.
	   * max_insert_length is used only for compression levels <= 3.
	   */

	  this.level = 0; /* compression level (1..9) */
	  this.strategy = 0; /* favor or force Huffman coding*/

	  this.good_match = 0;
	  /* Use a faster search when the previous match is longer than this */

	  this.nice_match = 0; /* Stop searching when current match exceeds this */

	  /* used by trees.c: */

	  /* Didn't use ct_data typedef below to suppress compiler warning */

	  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
	  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
	  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

	  // Use flat array of DOUBLE size, with interleaved fata,
	  // because JS does not support effective
	  this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
	  this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
	  this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
	  zero(this.dyn_ltree);
	  zero(this.dyn_dtree);
	  zero(this.bl_tree);

	  this.l_desc = null; /* desc. for literal tree */
	  this.d_desc = null; /* desc. for distance tree */
	  this.bl_desc = null; /* desc. for bit length tree */

	  //ush bl_count[MAX_BITS+1];
	  this.bl_count = new utils.Buf16(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
	  this.heap = new utils.Buf16(2 * L_CODES + 1); /* heap used to build the Huffman trees */
	  zero(this.heap);

	  this.heap_len = 0; /* number of elements in the heap */
	  this.heap_max = 0; /* element of largest frequency */
	  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	   * The same heap array is used to build all trees.
	   */

	  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
	  zero(this.depth);
	  /* Depth of each subtree used as tie breaker for trees of equal frequency
	   */

	  this.l_buf = 0; /* buffer index for literals or lengths */

	  this.lit_bufsize = 0;
	  /* Size of match buffer for literals/lengths.  There are 4 reasons for
	   * limiting lit_bufsize to 64K:
	   *   - frequencies can be kept in 16 bit counters
	   *   - if compression is not successful for the first block, all input
	   *     data is still in the window so we can still emit a stored block even
	   *     when input comes from standard input.  (This can also be done for
	   *     all blocks if lit_bufsize is not greater than 32K.)
	   *   - if compression is not successful for a file smaller than 64K, we can
	   *     even emit a stored file instead of a stored block (saving 5 bytes).
	   *     This is applicable only for zip (not gzip or zlib).
	   *   - creating new Huffman trees less frequently may not provide fast
	   *     adaptation to changes in the input data statistics. (Take for
	   *     example a binary file with poorly compressible code followed by
	   *     a highly compressible string table.) Smaller buffer sizes give
	   *     fast adaptation but have of course the overhead of transmitting
	   *     trees more frequently.
	   *   - I can't count above 4
	   */

	  this.last_lit = 0; /* running index in l_buf */

	  this.d_buf = 0;
	  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
	   * the same number of elements. To use different lengths, an extra flag
	   * array would be necessary.
	   */

	  this.opt_len = 0; /* bit length of current block with optimal trees */
	  this.static_len = 0; /* bit length of current block with static trees */
	  this.matches = 0; /* number of string matches in current block */
	  this.insert = 0; /* bytes at end of window left to insert */

	  this.bi_buf = 0;
	  /* Output buffer. bits are inserted starting at the bottom (least
	   * significant bits).
	   */
	  this.bi_valid = 0;
	  /* Number of valid bits in bi_buf.  All bits above the last valid bit
	   * are always zero.
	   */

	  // Used for window memory init. We safely ignore it for JS. That makes
	  // sense only for pointers and memory check tools.
	  //this.high_water = 0;
	  /* High water mark offset in window for initialized bytes -- bytes above
	   * this are set to zero in order to avoid memory check warnings when
	   * longest match routines access bytes past the input.  This is then
	   * updated to the new high water mark.
	   */
	}

	function deflateResetKeep(strm) {
	  var s;

	  if (!strm || !strm.state) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.total_in = strm.total_out = 0;
	  strm.data_type = Z_UNKNOWN;

	  s = strm.state;
	  s.pending = 0;
	  s.pending_out = 0;

	  if (s.wrap < 0) {
	    s.wrap = -s.wrap;
	    /* was made negative by deflate(..., Z_FINISH); */
	  }
	  s.status = s.wrap ? INIT_STATE : BUSY_STATE;
	  strm.adler = s.wrap === 2 ? 0 // crc32(0, Z_NULL, 0)
	  : 1; // adler32(0, Z_NULL, 0)
	  s.last_flush = Z_NO_FLUSH;
	  trees._tr_init(s);
	  return Z_OK;
	}

	function deflateReset(strm) {
	  var ret = deflateResetKeep(strm);
	  if (ret === Z_OK) {
	    lm_init(strm.state);
	  }
	  return ret;
	}

	function deflateSetHeader(strm, head) {
	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  if (strm.state.wrap !== 2) {
	    return Z_STREAM_ERROR;
	  }
	  strm.state.gzhead = head;
	  return Z_OK;
	}

	function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
	  if (!strm) {
	    // === Z_NULL
	    return Z_STREAM_ERROR;
	  }
	  var wrap = 1;

	  if (level === Z_DEFAULT_COMPRESSION) {
	    level = 6;
	  }

	  if (windowBits < 0) {
	    /* suppress zlib wrapper */
	    wrap = 0;
	    windowBits = -windowBits;
	  } else if (windowBits > 15) {
	    wrap = 2; /* write gzip wrapper instead */
	    windowBits -= 16;
	  }

	  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  if (windowBits === 8) {
	    windowBits = 9;
	  }
	  /* until 256-byte window bug fixed */

	  var s = new DeflateState();

	  strm.state = s;
	  s.strm = strm;

	  s.wrap = wrap;
	  s.gzhead = null;
	  s.w_bits = windowBits;
	  s.w_size = 1 << s.w_bits;
	  s.w_mask = s.w_size - 1;

	  s.hash_bits = memLevel + 7;
	  s.hash_size = 1 << s.hash_bits;
	  s.hash_mask = s.hash_size - 1;
	  s.hash_shift = ~ ~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

	  s.window = new utils.Buf8(s.w_size * 2);
	  s.head = new utils.Buf16(s.hash_size);
	  s.prev = new utils.Buf16(s.w_size);

	  // Don't need mem init magic for JS.
	  //s.high_water = 0;  /* nothing written to s->window yet */

	  s.lit_bufsize = 1 << memLevel + 6; /* 16K elements by default */

	  s.pending_buf_size = s.lit_bufsize * 4;
	  s.pending_buf = new utils.Buf8(s.pending_buf_size);

	  s.d_buf = s.lit_bufsize >> 1;
	  s.l_buf = (1 + 2) * s.lit_bufsize;

	  s.level = level;
	  s.strategy = strategy;
	  s.method = method;

	  return deflateReset(strm);
	}

	function deflateInit(strm, level) {
	  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	}

	function deflate(strm, flush) {
	  var old_flush, s;
	  var beg, val; // for gzip header write only

	  if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
	    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
	  }

	  s = strm.state;

	  if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
	    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
	  }

	  s.strm = strm; /* just in case */
	  old_flush = s.last_flush;
	  s.last_flush = flush;

	  /* Write the header */
	  if (s.status === INIT_STATE) {

	    if (s.wrap === 2) {
	      // GZIP header
	      strm.adler = 0; //crc32(0L, Z_NULL, 0);
	      put_byte(s, 31);
	      put_byte(s, 139);
	      put_byte(s, 8);
	      if (!s.gzhead) {
	        // s->gzhead == Z_NULL
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
	        put_byte(s, OS_CODE);
	        s.status = BUSY_STATE;
	      } else {
	        put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
	        put_byte(s, s.gzhead.time & 0xff);
	        put_byte(s, s.gzhead.time >> 8 & 0xff);
	        put_byte(s, s.gzhead.time >> 16 & 0xff);
	        put_byte(s, s.gzhead.time >> 24 & 0xff);
	        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
	        put_byte(s, s.gzhead.os & 0xff);
	        if (s.gzhead.extra && s.gzhead.extra.length) {
	          put_byte(s, s.gzhead.extra.length & 0xff);
	          put_byte(s, s.gzhead.extra.length >> 8 & 0xff);
	        }
	        if (s.gzhead.hcrc) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
	        }
	        s.gzindex = 0;
	        s.status = EXTRA_STATE;
	      }
	    } else // DEFLATE header
	      {
	        var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
	        var level_flags = -1;

	        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
	          level_flags = 0;
	        } else if (s.level < 6) {
	          level_flags = 1;
	        } else if (s.level === 6) {
	          level_flags = 2;
	        } else {
	          level_flags = 3;
	        }
	        header |= level_flags << 6;
	        if (s.strstart !== 0) {
	          header |= PRESET_DICT;
	        }
	        header += 31 - header % 31;

	        s.status = BUSY_STATE;
	        putShortMSB(s, header);

	        /* Save the adler32 of the preset dictionary: */
	        if (s.strstart !== 0) {
	          putShortMSB(s, strm.adler >>> 16);
	          putShortMSB(s, strm.adler & 0xffff);
	        }
	        strm.adler = 1; // adler32(0L, Z_NULL, 0);
	      }
	  }

	  //#ifdef GZIP
	  if (s.status === EXTRA_STATE) {
	    if (s.gzhead.extra /* != Z_NULL*/) {
	        beg = s.pending; /* start of bytes to update crc */

	        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
	          if (s.pending === s.pending_buf_size) {
	            if (s.gzhead.hcrc && s.pending > beg) {
	              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	            }
	            flush_pending(strm);
	            beg = s.pending;
	            if (s.pending === s.pending_buf_size) {
	              break;
	            }
	          }
	          put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
	          s.gzindex++;
	        }
	        if (s.gzhead.hcrc && s.pending > beg) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	        }
	        if (s.gzindex === s.gzhead.extra.length) {
	          s.gzindex = 0;
	          s.status = NAME_STATE;
	        }
	      } else {
	      s.status = NAME_STATE;
	    }
	  }
	  if (s.status === NAME_STATE) {
	    if (s.gzhead.name /* != Z_NULL*/) {
	        beg = s.pending; /* start of bytes to update crc */
	        //int val;

	        do {
	          if (s.pending === s.pending_buf_size) {
	            if (s.gzhead.hcrc && s.pending > beg) {
	              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	            }
	            flush_pending(strm);
	            beg = s.pending;
	            if (s.pending === s.pending_buf_size) {
	              val = 1;
	              break;
	            }
	          }
	          // JS specific: little magic to add zero terminator to end of string
	          if (s.gzindex < s.gzhead.name.length) {
	            val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
	          } else {
	            val = 0;
	          }
	          put_byte(s, val);
	        } while (val !== 0);

	        if (s.gzhead.hcrc && s.pending > beg) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	        }
	        if (val === 0) {
	          s.gzindex = 0;
	          s.status = COMMENT_STATE;
	        }
	      } else {
	      s.status = COMMENT_STATE;
	    }
	  }
	  if (s.status === COMMENT_STATE) {
	    if (s.gzhead.comment /* != Z_NULL*/) {
	        beg = s.pending; /* start of bytes to update crc */
	        //int val;

	        do {
	          if (s.pending === s.pending_buf_size) {
	            if (s.gzhead.hcrc && s.pending > beg) {
	              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	            }
	            flush_pending(strm);
	            beg = s.pending;
	            if (s.pending === s.pending_buf_size) {
	              val = 1;
	              break;
	            }
	          }
	          // JS specific: little magic to add zero terminator to end of string
	          if (s.gzindex < s.gzhead.comment.length) {
	            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
	          } else {
	            val = 0;
	          }
	          put_byte(s, val);
	        } while (val !== 0);

	        if (s.gzhead.hcrc && s.pending > beg) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	        }
	        if (val === 0) {
	          s.status = HCRC_STATE;
	        }
	      } else {
	      s.status = HCRC_STATE;
	    }
	  }
	  if (s.status === HCRC_STATE) {
	    if (s.gzhead.hcrc) {
	      if (s.pending + 2 > s.pending_buf_size) {
	        flush_pending(strm);
	      }
	      if (s.pending + 2 <= s.pending_buf_size) {
	        put_byte(s, strm.adler & 0xff);
	        put_byte(s, strm.adler >> 8 & 0xff);
	        strm.adler = 0; //crc32(0L, Z_NULL, 0);
	        s.status = BUSY_STATE;
	      }
	    } else {
	      s.status = BUSY_STATE;
	    }
	  }
	  //#endif

	  /* Flush as much pending output as possible */
	  if (s.pending !== 0) {
	    flush_pending(strm);
	    if (strm.avail_out === 0) {
	      /* Since avail_out is 0, deflate will be called again with
	       * more output space, but possibly with both pending and
	       * avail_in equal to zero. There won't be anything to do,
	       * but this is not an error situation so make sure we
	       * return OK instead of BUF_ERROR at next call of deflate:
	       */
	      s.last_flush = -1;
	      return Z_OK;
	    }

	    /* Make sure there is something to do and avoid duplicate consecutive
	     * flushes. For repeated and useless calls with Z_FINISH, we keep
	     * returning Z_STREAM_END instead of Z_BUF_ERROR.
	     */
	  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
	      return err(strm, Z_BUF_ERROR);
	    }

	  /* User must not provide more input after the first FINISH: */
	  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* Start a new block or continue the current one.
	   */
	  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
	    var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);

	    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
	      s.status = FINISH_STATE;
	    }
	    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
	      if (strm.avail_out === 0) {
	        s.last_flush = -1;
	        /* avoid BUF_ERROR next call, see above */
	      }
	      return Z_OK;
	      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
	       * of deflate should use the same flush parameter to make sure
	       * that the flush is complete. So we don't have to output an
	       * empty block here, this will be done at next call. This also
	       * ensures that for a very small output buffer, we emit at most
	       * one empty block.
	       */
	    }
	    if (bstate === BS_BLOCK_DONE) {
	      if (flush === Z_PARTIAL_FLUSH) {
	        trees._tr_align(s);
	      } else if (flush !== Z_BLOCK) {
	        /* FULL_FLUSH or SYNC_FLUSH */

	        trees._tr_stored_block(s, 0, 0, false);
	        /* For a full flush, this empty block will be recognized
	         * as a special marker by inflate_sync().
	         */
	        if (flush === Z_FULL_FLUSH) {
	          /*** CLEAR_HASH(s); ***/ /* forget history */
	          zero(s.head); // Fill with NIL (= 0);

	          if (s.lookahead === 0) {
	            s.strstart = 0;
	            s.block_start = 0;
	            s.insert = 0;
	          }
	        }
	      }
	      flush_pending(strm);
	      if (strm.avail_out === 0) {
	        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
	        return Z_OK;
	      }
	    }
	  }
	  //Assert(strm->avail_out > 0, "bug2");
	  //if (strm.avail_out <= 0) { throw new Error("bug2");}

	  if (flush !== Z_FINISH) {
	    return Z_OK;
	  }
	  if (s.wrap <= 0) {
	    return Z_STREAM_END;
	  }

	  /* Write the trailer */
	  if (s.wrap === 2) {
	    put_byte(s, strm.adler & 0xff);
	    put_byte(s, strm.adler >> 8 & 0xff);
	    put_byte(s, strm.adler >> 16 & 0xff);
	    put_byte(s, strm.adler >> 24 & 0xff);
	    put_byte(s, strm.total_in & 0xff);
	    put_byte(s, strm.total_in >> 8 & 0xff);
	    put_byte(s, strm.total_in >> 16 & 0xff);
	    put_byte(s, strm.total_in >> 24 & 0xff);
	  } else {
	    putShortMSB(s, strm.adler >>> 16);
	    putShortMSB(s, strm.adler & 0xffff);
	  }

	  flush_pending(strm);
	  /* If avail_out is zero, the application will call deflate again
	   * to flush the rest.
	   */
	  if (s.wrap > 0) {
	    s.wrap = -s.wrap;
	  }
	  /* write the trailer only once! */
	  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	}

	function deflateEnd(strm) {
	  var status;

	  if (!strm /*== Z_NULL*/ || !strm.state /*== Z_NULL*/) {
	      return Z_STREAM_ERROR;
	    }

	  status = strm.state.status;
	  if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.state = null;

	  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	}

	/* =========================================================================
	 * Copy the source state to the destination state
	 */
	//function deflateCopy(dest, source) {
	//
	//}

	exports.deflateInit = deflateInit;
	exports.deflateInit2 = deflateInit2;
	exports.deflateReset = deflateReset;
	exports.deflateResetKeep = deflateResetKeep;
	exports.deflateSetHeader = deflateSetHeader;
	exports.deflate = deflate;
	exports.deflateEnd = deflateEnd;
	exports.deflateInfo = 'pako deflate (from Nodeca project)';

	/* Not implemented
	exports.deflateBound = deflateBound;
	exports.deflateCopy = deflateCopy;
	exports.deflateSetDictionary = deflateSetDictionary;
	exports.deflateParams = deflateParams;
	exports.deflatePending = deflatePending;
	exports.deflatePrime = deflatePrime;
	exports.deflateTune = deflateTune;
	*/

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);

	/* Public constants ==========================================================*/
	/* ===========================================================================*/

	//var Z_FILTERED          = 1;
	//var Z_HUFFMAN_ONLY      = 2;
	//var Z_RLE               = 3;
	var Z_FIXED = 4;
	//var Z_DEFAULT_STRATEGY  = 0;

	/* Possible values of the data_type field (though see inflate()) */
	var Z_BINARY = 0;
	var Z_TEXT = 1;
	//var Z_ASCII             = 1; // = Z_TEXT
	var Z_UNKNOWN = 2;

	/*============================================================================*/

	function zero(buf) {
	  var len = buf.length;while (--len >= 0) {
	    buf[len] = 0;
	  }
	}

	// From zutil.h

	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES = 2;
	/* The three kinds of block type */

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	/* The minimum and maximum match lengths */

	// From deflate.h
	/* ===========================================================================
	 * Internal compression state.
	 */

	var LENGTH_CODES = 29;
	/* number of length codes, not counting the special END_BLOCK code */

	var LITERALS = 256;
	/* number of literal bytes 0..255 */

	var L_CODES = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */

	var D_CODES = 30;
	/* number of distance codes */

	var BL_CODES = 19;
	/* number of codes used to transfer the bit lengths */

	var HEAP_SIZE = 2 * L_CODES + 1;
	/* maximum heap size */

	var MAX_BITS = 15;
	/* All codes must not exceed MAX_BITS bits */

	var Buf_size = 16;
	/* size of bit buffer in bi_buf */

	/* ===========================================================================
	 * Constants
	 */

	var MAX_BL_BITS = 7;
	/* Bit length codes must not exceed MAX_BL_BITS bits */

	var END_BLOCK = 256;
	/* end of block literal code */

	var REP_3_6 = 16;
	/* repeat previous bit length 3-6 times (2 bits of repeat count) */

	var REPZ_3_10 = 17;
	/* repeat a zero length 3-10 times  (3 bits of repeat count) */

	var REPZ_11_138 = 18;
	/* repeat a zero length 11-138 times  (7 bits of repeat count) */

	var extra_lbits = /* extra bits for each length code */
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];

	var extra_dbits = /* extra bits for each distance code */
	[0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

	var extra_blbits = /* extra bits for each bit length code */
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];

	var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
	/* The lengths of the bit length codes are sent in order of decreasing
	 * probability, to avoid transmitting the lengths for unused bit length codes.
	 */

	/* ===========================================================================
	 * Local data. These are initialized only once.
	 */

	// We pre-fill arrays with 0 to avoid uninitialized gaps

	var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

	// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
	var static_ltree = new Array((L_CODES + 2) * 2);
	zero(static_ltree);
	/* The static literal tree. Since the bit lengths are imposed, there is no
	 * need for the L_CODES extra codes used during heap construction. However
	 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
	 * below).
	 */

	var static_dtree = new Array(D_CODES * 2);
	zero(static_dtree);
	/* The static distance tree. (Actually a trivial tree since all codes use
	 * 5 bits.)
	 */

	var _dist_code = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	/* Distance codes. The first 256 values correspond to the distances
	 * 3 .. 258, the last 256 values correspond to the top 8 bits of
	 * the 15 bit distances.
	 */

	var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
	zero(_length_code);
	/* length code for each normalized match length (0 == MIN_MATCH) */

	var base_length = new Array(LENGTH_CODES);
	zero(base_length);
	/* First normalized length for each code (0 = MIN_MATCH) */

	var base_dist = new Array(D_CODES);
	zero(base_dist);
	/* First normalized distance for each code (0 = distance of 1) */

	var StaticTreeDesc = function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

	  this.static_tree = static_tree; /* static tree or NULL */
	  this.extra_bits = extra_bits; /* extra bits for each code or NULL */
	  this.extra_base = extra_base; /* base index for extra_bits */
	  this.elems = elems; /* max number of elements in the tree */
	  this.max_length = max_length; /* max bit length for the codes */

	  // show if `static_tree` has data or dummy - needed for monomorphic objects
	  this.has_stree = static_tree && static_tree.length;
	};

	var static_l_desc;
	var static_d_desc;
	var static_bl_desc;

	var TreeDesc = function TreeDesc(dyn_tree, stat_desc) {
	  this.dyn_tree = dyn_tree; /* the dynamic tree */
	  this.max_code = 0; /* largest code with non zero frequency */
	  this.stat_desc = stat_desc; /* the corresponding static tree */
	};

	function d_code(dist) {
	  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	}

	/* ===========================================================================
	 * Output a short LSB first on the stream.
	 * IN assertion: there is enough room in pendingBuf.
	 */
	function put_short(s, w) {
	  //    put_byte(s, (uch)((w) & 0xff));
	  //    put_byte(s, (uch)((ush)(w) >> 8));
	  s.pending_buf[s.pending++] = w & 0xff;
	  s.pending_buf[s.pending++] = w >>> 8 & 0xff;
	}

	/* ===========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 */
	function send_bits(s, value, length) {
	  if (s.bi_valid > Buf_size - length) {
	    s.bi_buf |= value << s.bi_valid & 0xffff;
	    put_short(s, s.bi_buf);
	    s.bi_buf = value >> Buf_size - s.bi_valid;
	    s.bi_valid += length - Buf_size;
	  } else {
	    s.bi_buf |= value << s.bi_valid & 0xffff;
	    s.bi_valid += length;
	  }
	}

	function send_code(s, c, tree) {
	  send_bits(s, tree[c * 2], /*.Code*/tree[c * 2 + 1] /*.Len*/);
	}

	/* ===========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 */
	function bi_reverse(code, len) {
	  var res = 0;
	  do {
	    res |= code & 1;
	    code >>>= 1;
	    res <<= 1;
	  } while (--len > 0);
	  return res >>> 1;
	}

	/* ===========================================================================
	 * Flush the bit buffer, keeping at most 7 bits in it.
	 */
	function bi_flush(s) {
	  if (s.bi_valid === 16) {
	    put_short(s, s.bi_buf);
	    s.bi_buf = 0;
	    s.bi_valid = 0;
	  } else if (s.bi_valid >= 8) {
	    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
	    s.bi_buf >>= 8;
	    s.bi_valid -= 8;
	  }
	}

	/* ===========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc;    /* the tree descriptor */
	{
	  var tree = desc.dyn_tree;
	  var max_code = desc.max_code;
	  var stree = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var extra = desc.stat_desc.extra_bits;
	  var base = desc.stat_desc.extra_base;
	  var max_length = desc.stat_desc.max_length;
	  var h; /* heap index */
	  var n, m; /* iterate over the tree elements */
	  var bits; /* bit length */
	  var xbits; /* extra bits */
	  var f; /* frequency */
	  var overflow = 0; /* number of elements with bit length too large */

	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    s.bl_count[bits] = 0;
	  }

	  /* In a first pass, compute the optimal bit lengths (which may
	   * overflow in the case of the bit length tree).
	   */
	  tree[s.heap[s.heap_max] * 2 + 1] /*.Len*/ = 0; /* root of the heap */

	  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
	    n = s.heap[h];
	    bits = tree[tree[n * 2 + 1] /*.Dad*/ * 2 + 1] /*.Len*/ + 1;
	    if (bits > max_length) {
	      bits = max_length;
	      overflow++;
	    }
	    tree[n * 2 + 1] /*.Len*/ = bits;
	    /* We overwrite tree[n].Dad which is no longer needed */

	    if (n > max_code) {
	      continue;
	    } /* not a leaf node */

	    s.bl_count[bits]++;
	    xbits = 0;
	    if (n >= base) {
	      xbits = extra[n - base];
	    }
	    f = tree[n * 2];
	    /*.Freq*/s.opt_len += f * (bits + xbits);
	    if (has_stree) {
	      s.static_len += f * (stree[n * 2 + 1] /*.Len*/ + xbits);
	    }
	  }
	  if (overflow === 0) {
	    return;
	  }

	  // Trace((stderr,"\nbit length overflow\n"));
	  /* This happens for example on obj2 and pic of the Calgary corpus */

	  /* Find the first bit length which could increase: */
	  do {
	    bits = max_length - 1;
	    while (s.bl_count[bits] === 0) {
	      bits--;
	    }
	    s.bl_count[bits]--; /* move one leaf down the tree */
	    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
	    s.bl_count[max_length]--;
	    /* The brother of the overflow item also moves one step up,
	     * but this does not affect bl_count[max_length]
	     */
	    overflow -= 2;
	  } while (overflow > 0);

	  /* Now recompute all bit lengths, scanning in increasing frequency.
	   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
	   * lengths instead of fixing only the wrong ones. This idea is taken
	   * from 'ar' written by Haruhiko Okumura.)
	   */
	  for (bits = max_length; bits !== 0; bits--) {
	    n = s.bl_count[bits];
	    while (n !== 0) {
	      m = s.heap[--h];
	      if (m > max_code) {
	        continue;
	      }
	      if (tree[m * 2 + 1] /*.Len*/ !== bits) {
	        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
	        s.opt_len += (bits - tree[m * 2 + 1]) /*.Len*/ * tree[m * 2];
	        /*.Freq*/tree[m * 2 + 1] /*.Len*/ = bits;
	      }
	      n--;
	    }
	  }
	}

	/* ===========================================================================
	 * Generate the codes for a given tree and bit counts (which need not be
	 * optimal).
	 * IN assertion: the array bl_count contains the bit length statistics for
	 * the given tree and the field len is set for all tree elements.
	 * OUT assertion: the field code is set for all tree elements of non
	 *     zero code length.
	 */
	function gen_codes(tree, max_code, bl_count)
	//    ct_data *tree;             /* the tree to decorate */
	//    int max_code;              /* largest code with non zero frequency */
	//    ushf *bl_count;            /* number of codes at each bit length */
	{
	  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
	  var code = 0; /* running code value */
	  var bits; /* bit index */
	  var n; /* code index */

	  /* The distribution counts are first used to generate the code values
	   * without bit reversal.
	   */
	  for (bits = 1; bits <= MAX_BITS; bits++) {
	    next_code[bits] = code = code + bl_count[bits - 1] << 1;
	  }
	  /* Check that the bit counts in bl_count are consistent. The last code
	   * must be all ones.
	   */
	  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
	  //        "inconsistent bit counts");
	  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

	  for (n = 0; n <= max_code; n++) {
	    var len = tree[n * 2 + 1] /*.Len*/;
	    if (len === 0) {
	      continue;
	    }
	    /* Now reverse the bits */
	    tree[n * 2] /*.Code*/ = bi_reverse(next_code[len]++, len);

	    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
	    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
	  }
	}

	/* ===========================================================================
	 * Initialize the various 'constant' tables.
	 */
	function tr_static_init() {
	  var n; /* iterates over tree elements */
	  var bits; /* bit counter */
	  var length; /* length value */
	  var code; /* code value */
	  var dist; /* distance index */
	  var bl_count = new Array(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  // do check in _tr_init()
	  //if (static_init_done) return;

	  /* For some embedded targets, global variables are not initialized: */
	  /*#ifdef NO_INIT_GLOBAL_POINTERS
	    static_l_desc.static_tree = static_ltree;
	    static_l_desc.extra_bits = extra_lbits;
	    static_d_desc.static_tree = static_dtree;
	    static_d_desc.extra_bits = extra_dbits;
	    static_bl_desc.extra_bits = extra_blbits;
	  #endif*/

	  /* Initialize the mapping length (0..255) -> length code (0..28) */
	  length = 0;
	  for (code = 0; code < LENGTH_CODES - 1; code++) {
	    base_length[code] = length;
	    for (n = 0; n < 1 << extra_lbits[code]; n++) {
	      _length_code[length++] = code;
	    }
	  }
	  //Assert (length == 256, "tr_static_init: length != 256");
	  /* Note that the length 255 (match length 258) can be represented
	   * in two different ways: code 284 + 5 bits or code 285, so we
	   * overwrite length_code[255] to use the best encoding:
	   */
	  _length_code[length - 1] = code;

	  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
	  dist = 0;
	  for (code = 0; code < 16; code++) {
	    base_dist[code] = dist;
	    for (n = 0; n < 1 << extra_dbits[code]; n++) {
	      _dist_code[dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: dist != 256");
	  dist >>= 7; /* from now on, all distances are divided by 128 */
	  for (; code < D_CODES; code++) {
	    base_dist[code] = dist << 7;
	    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
	      _dist_code[256 + dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

	  /* Construct the codes of the static literal tree */
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    bl_count[bits] = 0;
	  }

	  n = 0;
	  while (n <= 143) {
	    static_ltree[n * 2 + 1] /*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  while (n <= 255) {
	    static_ltree[n * 2 + 1] /*.Len*/ = 9;
	    n++;
	    bl_count[9]++;
	  }
	  while (n <= 279) {
	    static_ltree[n * 2 + 1] /*.Len*/ = 7;
	    n++;
	    bl_count[7]++;
	  }
	  while (n <= 287) {
	    static_ltree[n * 2 + 1] /*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  /* Codes 286 and 287 do not exist, but we must include them in the
	   * tree construction to get a canonical Huffman tree (longest code
	   * all ones)
	   */
	  gen_codes(static_ltree, L_CODES + 1, bl_count);

	  /* The static distance tree is trivial: */
	  for (n = 0; n < D_CODES; n++) {
	    static_dtree[n * 2 + 1] /*.Len*/ = 5;
	    static_dtree[n * 2] /*.Code*/ = bi_reverse(n, 5);
	  }

	  // Now data ready and we can init static trees
	  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
	  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
	  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);

	  //static_init_done = true;
	}

	/* ===========================================================================
	 * Initialize a new block.
	 */
	function init_block(s) {
	  var n; /* iterates over tree elements */

	  /* Initialize the trees. */
	  for (n = 0; n < L_CODES; n++) {
	    s.dyn_ltree[n * 2] /*.Freq*/ = 0;
	  }
	  for (n = 0; n < D_CODES; n++) {
	    s.dyn_dtree[n * 2] /*.Freq*/ = 0;
	  }
	  for (n = 0; n < BL_CODES; n++) {
	    s.bl_tree[n * 2] /*.Freq*/ = 0;
	  }

	  s.dyn_ltree[END_BLOCK * 2] /*.Freq*/ = 1;
	  s.opt_len = s.static_len = 0;
	  s.last_lit = s.matches = 0;
	}

	/* ===========================================================================
	 * Flush the bit buffer and align the output on a byte boundary
	 */
	function bi_windup(s) {
	  if (s.bi_valid > 8) {
	    put_short(s, s.bi_buf);
	  } else if (s.bi_valid > 0) {
	    //put_byte(s, (Byte)s->bi_buf);
	    s.pending_buf[s.pending++] = s.bi_buf;
	  }
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	}

	/* ===========================================================================
	 * Copy a stored block, storing first the length and its
	 * one's complement if requested.
	 */
	function copy_block(s, buf, len, header)
	//DeflateState *s;
	//charf    *buf;    /* the input data */
	//unsigned len;     /* its length */
	//int      header;  /* true if block header must be written */
	{
	  bi_windup(s); /* align on byte boundary */

	  if (header) {
	    put_short(s, len);
	    put_short(s, ~len);
	  }
	  //  while (len--) {
	  //    put_byte(s, *buf++);
	  //  }
	  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
	  s.pending += len;
	}

	/* ===========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function smaller(tree, n, m, depth) {
	  var _n2 = n * 2;
	  var _m2 = m * 2;
	  return tree[_n2] /*.Freq*/ < tree[_m2] /*.Freq*/ || tree[_n2] /*.Freq*/ === tree[_m2] /*.Freq*/ && depth[n] <= depth[m];
	}

	/* ===========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 */
	function pqdownheap(s, tree, k)
	//    deflate_state *s;
	//    ct_data *tree;  /* the tree to restore */
	//    int k;               /* node to move down */
	{
	  var v = s.heap[k];
	  var j = k << 1; /* left son of k */
	  while (j <= s.heap_len) {
	    /* Set j to the smallest of the two sons: */
	    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
	      j++;
	    }
	    /* Exit if v is smaller than both sons */
	    if (smaller(tree, v, s.heap[j], s.depth)) {
	      break;
	    }

	    /* Exchange v with the smallest son */
	    s.heap[k] = s.heap[j];
	    k = j;

	    /* And continue down the tree, setting j to the left son of k */
	    j <<= 1;
	  }
	  s.heap[k] = v;
	}

	// inlined manually
	// var SMALLEST = 1;

	/* ===========================================================================
	 * Send the block data compressed using the given Huffman trees
	 */
	function compress_block(s, ltree, dtree)
	//    deflate_state *s;
	//    const ct_data *ltree; /* literal tree */
	//    const ct_data *dtree; /* distance tree */
	{
	  var dist; /* distance of matched string */
	  var lc; /* match length or unmatched char (if dist == 0) */
	  var lx = 0; /* running index in l_buf */
	  var code; /* the code to send */
	  var extra; /* number of extra bits to send */

	  if (s.last_lit !== 0) {
	    do {
	      dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
	      lc = s.pending_buf[s.l_buf + lx];
	      lx++;

	      if (dist === 0) {
	        send_code(s, lc, ltree); /* send a literal byte */
	        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
	      } else {
	          /* Here, lc is the match length - MIN_MATCH */
	          code = _length_code[lc];
	          send_code(s, code + LITERALS + 1, ltree); /* send the length code */
	          extra = extra_lbits[code];
	          if (extra !== 0) {
	            lc -= base_length[code];
	            send_bits(s, lc, extra); /* send the extra length bits */
	          }
	          dist--; /* dist is now the match distance - 1 */
	          code = d_code(dist);
	          //Assert (code < D_CODES, "bad d_code");

	          send_code(s, code, dtree); /* send the distance code */
	          extra = extra_dbits[code];
	          if (extra !== 0) {
	            dist -= base_dist[code];
	            send_bits(s, dist, extra); /* send the extra distance bits */
	          }
	        } /* literal or match pair ? */

	      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
	      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
	      //       "pendingBuf overflow");
	    } while (lx < s.last_lit);
	  }

	  send_code(s, END_BLOCK, ltree);
	}

	/* ===========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc; /* the tree descriptor */
	{
	  var tree = desc.dyn_tree;
	  var stree = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var elems = desc.stat_desc.elems;
	  var n, m; /* iterate over heap elements */
	  var max_code = -1; /* largest code with non zero frequency */
	  var node; /* new node being created */

	  /* Construct the initial heap, with least frequent element in
	   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
	   * heap[0] is not used.
	   */
	  s.heap_len = 0;
	  s.heap_max = HEAP_SIZE;

	  for (n = 0; n < elems; n++) {
	    if (tree[n * 2] /*.Freq*/ !== 0) {
	      s.heap[++s.heap_len] = max_code = n;
	      s.depth[n] = 0;
	    } else {
	      tree[n * 2 + 1] /*.Len*/ = 0;
	    }
	  }

	  /* The pkzip format requires that at least one distance code exists,
	   * and that at least one bit should be sent even if there is only one
	   * possible code. So to avoid special checks later on we force at least
	   * two codes of non zero frequency.
	   */
	  while (s.heap_len < 2) {
	    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
	    tree[node * 2] /*.Freq*/ = 1;
	    s.depth[node] = 0;
	    s.opt_len--;

	    if (has_stree) {
	      s.static_len -= stree[node * 2 + 1];
	    }
	    /* node is 0 or 1 so it does not have extra bits */
	  }
	  /*.Len*/desc.max_code = max_code;

	  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
	   * establish sub-heaps of increasing lengths:
	   */
	  for (n = s.heap_len >> 1 /*int /2*/; n >= 1; n--) {
	    pqdownheap(s, tree, n);
	  }

	  /* Construct the Huffman tree by repeatedly combining the least two
	   * frequent nodes.
	   */
	  node = elems; /* next internal node of the tree */
	  do {
	    //pqremove(s, tree, n);  /* n = node of least frequency */
	    /*** pqremove ***/
	    n = s.heap[1 /*SMALLEST*/];
	    s.heap[1 /*SMALLEST*/] = s.heap[s.heap_len--];
	    pqdownheap(s, tree, 1 /*SMALLEST*/);
	    /***/

	    m = s.heap[1 /*SMALLEST*/]; /* m = node of next least frequency */

	    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
	    s.heap[--s.heap_max] = m;

	    /* Create a new node father of n and m */
	    tree[node * 2] /*.Freq*/ = tree[n * 2] /*.Freq*/ + tree[m * 2];
	    /*.Freq*/s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
	    tree[n * 2 + 1] /*.Dad*/ = tree[m * 2 + 1] /*.Dad*/ = node;

	    /* and insert the new node in the heap */
	    s.heap[1 /*SMALLEST*/] = node++;
	    pqdownheap(s, tree, 1 /*SMALLEST*/);
	  } while (s.heap_len >= 2);

	  s.heap[--s.heap_max] = s.heap[1 /*SMALLEST*/];

	  /* At this point, the fields freq and dad are set. We can now
	   * generate the bit lengths.
	   */
	  gen_bitlen(s, desc);

	  /* The field len is now set, we can generate the bit codes */
	  gen_codes(tree, max_code, s.bl_count);
	}

	/* ===========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree.
	 */
	function scan_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree;   /* the tree to be scanned */
	//    int max_code;    /* and its largest code of non zero frequency */
	{
	  var n; /* iterates over all tree elements */
	  var prevlen = -1; /* last emitted length */
	  var curlen; /* length of current code */

	  var nextlen = tree[0 * 2 + 1] /*.Len*/; /* length of next code */

	  var count = 0; /* repeat count of the current code */
	  var max_count = 7; /* max repeat count */
	  var min_count = 4; /* min repeat count */

	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	  tree[(max_code + 1) * 2 + 1] /*.Len*/ = 0xffff; /* guard */

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1];

	    /*.Len*/if (++count < max_count && curlen === nextlen) {
	      continue;
	    } else if (count < min_count) {
	      s.bl_tree[curlen * 2] /*.Freq*/ += count;
	    } else if (curlen !== 0) {

	      if (curlen !== prevlen) {
	        s.bl_tree[curlen * 2] /*.Freq*/++;
	      }
	      s.bl_tree[REP_3_6 * 2] /*.Freq*/++;
	    } else if (count <= 10) {
	        s.bl_tree[REPZ_3_10 * 2] /*.Freq*/++;
	      } else {
	          s.bl_tree[REPZ_11_138 * 2] /*.Freq*/++;
	        }

	    count = 0;
	    prevlen = curlen;

	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;
	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;
	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}

	/* ===========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 */
	function send_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree; /* the tree to be scanned */
	//    int max_code;       /* and its largest code of non zero frequency */
	{
	  var n; /* iterates over all tree elements */
	  var prevlen = -1; /* last emitted length */
	  var curlen; /* length of current code */

	  var nextlen = tree[0 * 2 + 1] /*.Len*/; /* length of next code */

	  var count = 0; /* repeat count of the current code */
	  var max_count = 7; /* max repeat count */
	  var min_count = 4; /* min repeat count */

	  /* tree[max_code+1].Len = -1; */ /* guard already set */
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1];

	    /*.Len*/if (++count < max_count && curlen === nextlen) {
	      continue;
	    } else if (count < min_count) {
	      do {
	        send_code(s, curlen, s.bl_tree);
	      } while (--count !== 0);
	    } else if (curlen !== 0) {
	      if (curlen !== prevlen) {
	        send_code(s, curlen, s.bl_tree);
	        count--;
	      }
	      //Assert(count >= 3 && count <= 6, " 3_6?");
	      send_code(s, REP_3_6, s.bl_tree);
	      send_bits(s, count - 3, 2);
	    } else if (count <= 10) {
	      send_code(s, REPZ_3_10, s.bl_tree);
	      send_bits(s, count - 3, 3);
	    } else {
	      send_code(s, REPZ_11_138, s.bl_tree);
	      send_bits(s, count - 11, 7);
	    }

	    count = 0;
	    prevlen = curlen;
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;
	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;
	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}

	/* ===========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree(s) {
	  var max_blindex; /* index of last bit length code of non zero freq */

	  /* Determine the bit length frequencies for literal and distance trees */
	  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
	  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

	  /* Build the bit length tree: */
	  build_tree(s, s.bl_desc);
	  /* opt_len now includes the length of the tree representations, except
	   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
	   */

	  /* Determine the number of bit length codes to send. The pkzip format
	   * requires that at least 4 bit length codes be sent. (appnote.txt says
	   * 3 but the actual value used is 4.)
	   */
	  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
	    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] /*.Len*/ !== 0) {
	      break;
	    }
	  }
	  /* Update opt_len to include the bit length tree and counts */
	  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
	  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
	  //        s->opt_len, s->static_len));

	  return max_blindex;
	}

	/* ===========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(s, lcodes, dcodes, blcodes)
	//    deflate_state *s;
	//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
	{
	  var rank; /* index in bl_order */

	  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
	  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
	  //        "too many codes");
	  //Tracev((stderr, "\nbl counts: "));
	  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
	  send_bits(s, dcodes - 1, 5);
	  send_bits(s, blcodes - 4, 4); /* not -3 as stated in appnote.txt */
	  for (rank = 0; rank < blcodes; rank++) {
	    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
	    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], /*.Len*/3);
	  }
	  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
	  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
	  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
	}

	/* ===========================================================================
	 * Check if the data type is TEXT or BINARY, using the following algorithm:
	 * - TEXT if the two conditions below are satisfied:
	 *    a) There are no non-portable control characters belonging to the
	 *       "black list" (0..6, 14..25, 28..31).
	 *    b) There is at least one printable character belonging to the
	 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
	 * - BINARY otherwise.
	 * - The following partially-portable control characters form a
	 *   "gray list" that is ignored in this detection algorithm:
	 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
	 * IN assertion: the fields Freq of dyn_ltree are set.
	 */
	function detect_data_type(s) {
	  /* black_mask is the bit mask of black-listed bytes
	   * set bits 0..6, 14..25, and 28..31
	   * 0xf3ffc07f = binary 11110011111111111100000001111111
	   */
	  var black_mask = 0xf3ffc07f;
	  var n;

	  /* Check for non-textual ("black-listed") bytes. */
	  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
	    if (black_mask & 1 && s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
	      return Z_BINARY;
	    }
	  }

	  /* Check for textual ("white-listed") bytes. */
	  if (s.dyn_ltree[9 * 2] /*.Freq*/ !== 0 || s.dyn_ltree[10 * 2] /*.Freq*/ !== 0 || s.dyn_ltree[13 * 2] /*.Freq*/ !== 0) {
	    return Z_TEXT;
	  }
	  for (n = 32; n < LITERALS; n++) {
	    if (s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
	      return Z_TEXT;
	    }
	  }

	  /* There are no "black-listed" or "white-listed" bytes:
	   * this stream either is empty or has tolerated ("gray-listed") bytes only.
	   */
	  return Z_BINARY;
	}

	var static_init_done = false;

	/* ===========================================================================
	 * Initialize the tree data structures for a new zlib stream.
	 */
	function _tr_init(s) {

	  if (!static_init_done) {
	    tr_static_init();
	    static_init_done = true;
	  }

	  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
	  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
	  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

	  s.bi_buf = 0;
	  s.bi_valid = 0;

	  /* Initialize the first block of the first file: */
	  init_block(s);
	}

	/* ===========================================================================
	 * Send a stored block
	 */
	function _tr_stored_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3); /* send block type */
	  copy_block(s, buf, stored_len, true); /* with header */
	}

	/* ===========================================================================
	 * Send one empty static block to give enough lookahead for inflate.
	 * This takes 10 bits, of which 7 may remain in the bit buffer.
	 */
	function _tr_align(s) {
	  send_bits(s, STATIC_TREES << 1, 3);
	  send_code(s, END_BLOCK, static_ltree);
	  bi_flush(s);
	}

	/* ===========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function _tr_flush_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block, or NULL if too old */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  var opt_lenb, static_lenb; /* opt_len and static_len in bytes */
	  var max_blindex = 0; /* index of last bit length code of non zero freq */

	  /* Build the Huffman trees unless a stored block is forced */
	  if (s.level > 0) {

	    /* Check if the file is binary or text */
	    if (s.strm.data_type === Z_UNKNOWN) {
	      s.strm.data_type = detect_data_type(s);
	    }

	    /* Construct the literal and distance trees */
	    build_tree(s, s.l_desc);
	    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));

	    build_tree(s, s.d_desc);
	    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	    /* At this point, opt_len and static_len are the total bit lengths of
	     * the compressed block data, excluding the tree representations.
	     */

	    /* Build the bit length tree for the above two trees, and get the index
	     * in bl_order of the last bit length code to send.
	     */
	    max_blindex = build_bl_tree(s);

	    /* Determine the best encoding. Compute the block lengths in bytes. */
	    opt_lenb = s.opt_len + 3 + 7 >>> 3;
	    static_lenb = s.static_len + 3 + 7 >>> 3;

	    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
	    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
	    //        s->last_lit));

	    if (static_lenb <= opt_lenb) {
	      opt_lenb = static_lenb;
	    }
	  } else {
	    // Assert(buf != (char*)0, "lost buf");
	    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
	  }

	  if (stored_len + 4 <= opt_lenb && buf !== -1) {
	    /* 4: two words for the lengths */

	    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
	     * Otherwise we can't have processed more than WSIZE input bytes since
	     * the last block flush, because compression would have been
	     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
	     * transform a block into a stored block.
	     */
	    _tr_stored_block(s, buf, stored_len, last);
	  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

	    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
	    compress_block(s, static_ltree, static_dtree);
	  } else {
	    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
	    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
	    compress_block(s, s.dyn_ltree, s.dyn_dtree);
	  }
	  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
	  /* The above check is made mod 2^32, for files larger than 512 MB
	   * and uLong implemented on 32 bits.
	   */
	  init_block(s);

	  if (last) {
	    bi_windup(s);
	  }
	  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
	  //       s->compressed_len-7*last));
	}

	/* ===========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 */
	function _tr_tally(s, dist, lc)
	//    deflate_state *s;
	//    unsigned dist;  /* distance of matched string */
	//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
	{
	  //var out_length, in_length, dcode;

	  s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 0xff;
	  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

	  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
	  s.last_lit++;

	  if (dist === 0) {
	    /* lc is the unmatched char */
	    s.dyn_ltree[lc * 2] /*.Freq*/++;
	  } else {
	      s.matches++;
	      /* Here, lc is the match length - MIN_MATCH */
	      dist--; /* dist = match distance - 1 */
	      //Assert((ush)dist < (ush)MAX_DIST(s) &&
	      //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
	      //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

	      s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2] /*.Freq*/++;
	      s.dyn_dtree[d_code(dist) * 2] /*.Freq*/++;
	    }

	  // (!) This block is disabled in zlib defailts,
	  // don't enable it for binary compatibility

	  //#ifdef TRUNCATE_BLOCK
	  //  /* Try to guess if it is profitable to stop the current block here */
	  //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
	  //    /* Compute an upper bound for the compressed length */
	  //    out_length = s.last_lit*8;
	  //    in_length = s.strstart - s.block_start;
	  //
	  //    for (dcode = 0; dcode < D_CODES; dcode++) {
	  //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
	  //    }
	  //    out_length >>>= 3;
	  //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
	  //    //       s->last_lit, in_length, out_length,
	  //    //       100L - out_length*100L/in_length));
	  //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
	  //      return true;
	  //    }
	  //  }
	  //#endif

	  return s.last_lit === s.lit_bufsize - 1;
	  /* We avoid equality with lit_bufsize because of wraparound at 64K
	   * on 16 bit machines and because stored blocks are restricted to
	   * 64K-1 bytes.
	   */
	}

	exports._tr_init = _tr_init;
	exports._tr_stored_block = _tr_stored_block;
	exports._tr_flush_block = _tr_flush_block;
	exports._tr_tally = _tr_tally;
	exports._tr_align = _tr_align;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	// Note: adler32 takes 12% for level 0 and 2% for level 6.
	// It doesn't worth to make additional optimizationa as in original.
	// Small size is preferable.

	function adler32(adler, buf, len, pos) {
	  var s1 = adler & 0xffff | 0,
	      s2 = adler >>> 16 & 0xffff | 0,
	      n = 0;

	  while (len !== 0) {
	    // Set limit ~ twice less than 5552, to keep
	    // s2 in 31-bits, because we force signed ints.
	    // in other case %= will fail.
	    n = len > 2000 ? 2000 : len;
	    len -= n;

	    do {
	      s1 = s1 + buf[pos++] | 0;
	      s2 = s2 + s1 | 0;
	    } while (--n);

	    s1 %= 65521;
	    s2 %= 65521;
	  }

	  return s1 | s2 << 16 | 0;
	}

	module.exports = adler32;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	// Note: we can't get significant speed boost here.
	// So write code to minimize size - no pregenerated tables
	// and array tools dependencies.

	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	  var c,
	      table = [];

	  for (var n = 0; n < 256; n++) {
	    c = n;
	    for (var k = 0; k < 8; k++) {
	      c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
	    }
	    table[n] = c;
	  }

	  return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();

	function crc32(crc, buf, len, pos) {
	  var t = crcTable,
	      end = pos + len;

	  crc = crc ^ -1;

	  for (var i = pos; i < end; i++) {
	    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 0xFF];
	  }

	  return crc ^ -1; // >>> 0;
	}

	module.exports = crc32;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  '2': 'need dictionary', /* Z_NEED_DICT       2  */
	  '1': 'stream end', /* Z_STREAM_END      1  */
	  '0': '', /* Z_OK              0  */
	  '-1': 'file error', /* Z_ERRNO         (-1) */
	  '-2': 'stream error', /* Z_STREAM_ERROR  (-2) */
	  '-3': 'data error', /* Z_DATA_ERROR    (-3) */
	  '-4': 'insufficient memory', /* Z_MEM_ERROR     (-4) */
	  '-5': 'buffer error', /* Z_BUF_ERROR     (-5) */
	  '-6': 'incompatible version' /* Z_VERSION_ERROR (-6) */
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// String encode/decode helpers
	'use strict';

	var utils = __webpack_require__(12);

	// Quick check if we can use fast array to bin string conversion
	//
	// - apply(Array) can fail on Android 2.2
	// - apply(Uint8Array) can fail on iOS 5.1 Safary
	//
	var STR_APPLY_OK = true;
	var STR_APPLY_UIA_OK = true;

	try {
	  String.fromCharCode.apply(null, [0]);
	} catch (__) {
	  STR_APPLY_OK = false;
	}
	try {
	  String.fromCharCode.apply(null, new Uint8Array(1));
	} catch (__) {
	  STR_APPLY_UIA_OK = false;
	}

	// Table with utf8 lengths (calculated by first byte of sequence)
	// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
	// because max possible codepoint is 0x10ffff
	var _utf8len = new utils.Buf8(256);
	for (var q = 0; q < 256; q++) {
	  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
	}
	_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start

	// convert string to array (typed, when possible)
	exports.string2buf = function (str) {
	  var buf,
	      c,
	      c2,
	      m_pos,
	      i,
	      str_len = str.length,
	      buf_len = 0;

	  // count binary size
	  for (m_pos = 0; m_pos < str_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
	  }

	  // allocate buffer
	  buf = new utils.Buf8(buf_len);

	  // convert
	  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    if (c < 0x80) {
	      /* one byte */
	      buf[i++] = c;
	    } else if (c < 0x800) {
	      /* two bytes */
	      buf[i++] = 0xC0 | c >>> 6;
	      buf[i++] = 0x80 | c & 0x3f;
	    } else if (c < 0x10000) {
	      /* three bytes */
	      buf[i++] = 0xE0 | c >>> 12;
	      buf[i++] = 0x80 | c >>> 6 & 0x3f;
	      buf[i++] = 0x80 | c & 0x3f;
	    } else {
	      /* four bytes */
	      buf[i++] = 0xf0 | c >>> 18;
	      buf[i++] = 0x80 | c >>> 12 & 0x3f;
	      buf[i++] = 0x80 | c >>> 6 & 0x3f;
	      buf[i++] = 0x80 | c & 0x3f;
	    }
	  }

	  return buf;
	};

	// Helper (used in 2 places)
	function buf2binstring(buf, len) {
	  // use fallback for big arrays to avoid stack overflow
	  if (len < 65537) {
	    if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
	      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
	    }
	  }

	  var result = '';
	  for (var i = 0; i < len; i++) {
	    result += String.fromCharCode(buf[i]);
	  }
	  return result;
	}

	// Convert byte array to binary string
	exports.buf2binstring = function (buf) {
	  return buf2binstring(buf, buf.length);
	};

	// Convert binary string (typed, when possible)
	exports.binstring2buf = function (str) {
	  var buf = new utils.Buf8(str.length);
	  for (var i = 0, len = buf.length; i < len; i++) {
	    buf[i] = str.charCodeAt(i);
	  }
	  return buf;
	};

	// convert array to string
	exports.buf2string = function (buf, max) {
	  var i, out, c, c_len;
	  var len = max || buf.length;

	  // Reserve max possible length (2 words per char)
	  // NB: by unknown reasons, Array is significantly faster for
	  //     String.fromCharCode.apply than Uint16Array.
	  var utf16buf = new Array(len * 2);

	  for (out = 0, i = 0; i < len;) {
	    c = buf[i++];
	    // quick process ascii
	    if (c < 0x80) {
	      utf16buf[out++] = c;continue;
	    }

	    c_len = _utf8len[c];
	    // skip 5 & 6 byte codes
	    if (c_len > 4) {
	      utf16buf[out++] = 0xfffd;i += c_len - 1;continue;
	    }

	    // apply mask on first byte
	    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
	    // join the rest
	    while (c_len > 1 && i < len) {
	      c = c << 6 | buf[i++] & 0x3f;
	      c_len--;
	    }

	    // terminated by end of string?
	    if (c_len > 1) {
	      utf16buf[out++] = 0xfffd;continue;
	    }

	    if (c < 0x10000) {
	      utf16buf[out++] = c;
	    } else {
	      c -= 0x10000;
	      utf16buf[out++] = 0xd800 | c >> 10 & 0x3ff;
	      utf16buf[out++] = 0xdc00 | c & 0x3ff;
	    }
	  }

	  return buf2binstring(utf16buf, out);
	};

	// Calculate max possible position in utf8 buffer,
	// that will not break sequence. If that's not possible
	// - (very small limits) return max size as is.
	//
	// buf[] - utf8 bytes array
	// max   - length limit (mandatory);
	exports.utf8border = function (buf, max) {
	  var pos;

	  max = max || buf.length;
	  if (max > buf.length) {
	    max = buf.length;
	  }

	  // go back from last position, until start of sequence found
	  pos = max - 1;
	  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) {
	    pos--;
	  }

	  // Fuckup - very small and broken sequence,
	  // return max, because we should return something anyway.
	  if (pos < 0) {
	    return max;
	  }

	  // If we came to start of buffer - that means vuffer is too small,
	  // return max too.
	  if (pos === 0) {
	    return max;
	  }

	  return pos + _utf8len[buf[pos]] > max ? pos : max;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	function ZStream() {
	  /* next input byte */
	  this.input = null; // JS specific, because we have no pointers
	  this.next_in = 0;
	  /* number of bytes available at input */
	  this.avail_in = 0;
	  /* total number of input bytes read so far */
	  this.total_in = 0;
	  /* next output byte should be put there */
	  this.output = null; // JS specific, because we have no pointers
	  this.next_out = 0;
	  /* remaining free space at output */
	  this.avail_out = 0;
	  /* total number of bytes output so far */
	  this.total_out = 0;
	  /* last error message, NULL if no error */
	  this.msg = '';
	  /* not visible by applications */
	  /*Z_NULL*/this.state = null;
	  /* best guess about the data type: binary or text */
	  this.data_type = 2;
	  /* adler32 value of the uncompressed data */
	  /*Z_UNKNOWN*/this.adler = 0;
	}

	module.exports = ZStream;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var zlib_inflate = __webpack_require__(22);
	var utils = __webpack_require__(12);
	var strings = __webpack_require__(19);
	var c = __webpack_require__(25);
	var msg = __webpack_require__(18);
	var zstream = __webpack_require__(20);
	var gzheader = __webpack_require__(26);

	var toString = Object.prototype.toString;

	/**
	 * class Inflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[inflate]]
	 * and [[inflateRaw]].
	 **/

	/* internal
	 * inflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Inflate#onData]] not overriden.
	 **/

	/**
	 * Inflate.result -> Uint8Array|Array|String
	 *
	 * Uncompressed result, generated by default [[Inflate#onData]]
	 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
	 * push a chunk with explicit flush (call [[Inflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Inflate.err -> Number
	 *
	 * Error code after inflate finished. 0 (Z_OK) on success.
	 * Should be checked if broken data possible.
	 **/

	/**
	 * Inflate.msg -> String
	 *
	 * Error message, if [[Inflate.err]] != 0
	 **/

	/**
	 * new Inflate(options)
	 * - options (Object): zlib inflate options.
	 *
	 * Creates new inflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `windowBits`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw inflate
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 * By default, when no options set, autodetect deflate/gzip data format via
	 * wrapper header.
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var inflate = new pako.Inflate({ level: 3});
	 *
	 * inflate.push(chunk1, false);
	 * inflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (inflate.err) { throw new Error(inflate.err); }
	 *
	 * console.log(inflate.result);
	 * ```
	 **/
	var Inflate = function Inflate(options) {

	  this.options = utils.assign({
	    chunkSize: 16384,
	    windowBits: 0,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  // Force window size for `raw` data, if not set directly,
	  // because we have no header for autodetect.
	  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
	    opt.windowBits = -opt.windowBits;
	    if (opt.windowBits === 0) {
	      opt.windowBits = -15;
	    }
	  }

	  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
	  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
	    opt.windowBits += 32;
	  }

	  // Gzip header has no info about windows size, we can do autodetect only
	  // for deflate. So, if window size not set, force it to max when gzip possible
	  if (opt.windowBits > 15 && opt.windowBits < 48) {
	    // bit 3 (16) -> gzipped data
	    // bit 4 (32) -> autodetect gzip/deflate
	    if ((opt.windowBits & 15) === 0) {
	      opt.windowBits |= 15;
	    }
	  }

	  this.err = 0; // error code, if happens (0 = Z_OK)
	  this.msg = ''; // error message
	  this.ended = false; // used to avoid multiple onEnd() calls
	  this.chunks = []; // chunks of compressed data

	  this.strm = new zstream();
	  this.strm.avail_out = 0;

	  var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);

	  if (status !== c.Z_OK) {
	    throw new Error(msg[status]);
	  }

	  this.header = new gzheader();

	  zlib_inflate.inflateGetHeader(this.strm, this.header);
	};

	/**
	 * Inflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
	 * new output chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
	 *
	 * On fail call [[Inflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Inflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;
	  var next_out_utf8, tail, utf8str;

	  // Flag to properly process Z_BUF_ERROR on testing inflate call
	  // when we check that all output data was flushed.
	  var allowBufError = false;

	  if (this.ended) {
	    return false;
	  }
	  _mode = mode === ~ ~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // Only binary strings can be decompressed on practice
	    strm.input = strings.binstring2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }

	    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH); /* no bad return value */

	    if (status === c.Z_BUF_ERROR && allowBufError === true) {
	      status = c.Z_OK;
	      allowBufError = false;
	    }

	    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }

	    if (strm.next_out) {
	      if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {

	        if (this.options.to === 'string') {

	          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

	          tail = strm.next_out - next_out_utf8;
	          utf8str = strings.buf2string(strm.output, next_out_utf8);

	          // move tail
	          strm.next_out = tail;
	          strm.avail_out = chunkSize - tail;
	          if (tail) {
	            utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
	          }

	          this.onData(utf8str);
	        } else {
	          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	        }
	      }
	    }

	    // When no more input data, we should check that internal inflate buffers
	    // are flushed. The only way to do it when avail_out = 0 - run one more
	    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
	    // Here we set flag to process this error properly.
	    //
	    // NOTE. Deflate does not return error in this case and does not needs such
	    // logic.
	    if (strm.avail_in === 0 && strm.avail_out === 0) {
	      allowBufError = true;
	    }
	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

	  if (status === c.Z_STREAM_END) {
	    _mode = c.Z_FINISH;
	  }

	  // Finalize on the last chunk.
	  if (_mode === c.Z_FINISH) {
	    status = zlib_inflate.inflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === c.Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === c.Z_SYNC_FLUSH) {
	    this.onEnd(c.Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};

	/**
	 * Inflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Inflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};

	/**
	 * Inflate#onEnd(status) -> Void
	 * - status (Number): inflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called either after you tell inflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Inflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === c.Z_OK) {
	    if (this.options.to === 'string') {
	      // Glue & convert here, until we teach pako to send
	      // utf8 alligned strings to onData
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};

	/**
	 * inflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Decompress `data` with inflate/ungzip and `options`. Autodetect
	 * format via wrapper header by default. That's why we don't provide
	 * separate `ungzip` method.
	 *
	 * Supported options are:
	 *
	 * - windowBits
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
	 *   , output;
	 *
	 * try {
	 *   output = pako.inflate(input);
	 * } catch (err)
	 *   console.log(err);
	 * }
	 * ```
	 **/
	function inflate(input, options) {
	  var inflator = new Inflate(options);

	  inflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (inflator.err) {
	    throw inflator.msg;
	  }

	  return inflator.result;
	}

	/**
	 * inflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * The same as [[inflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function inflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return inflate(input, options);
	}

	/**
	 * ungzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Just shortcut to [[inflate]], because it autodetects format
	 * by header.content. Done for convenience.
	 **/

	exports.Inflate = Inflate;
	exports.inflate = inflate;
	exports.inflateRaw = inflateRaw;
	exports.ungzip = inflate;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);
	var adler32 = __webpack_require__(16);
	var crc32 = __webpack_require__(17);
	var inflate_fast = __webpack_require__(23);
	var inflate_table = __webpack_require__(24);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/

	/* Allowed flush values; see deflate() and inflate() below for details */
	//var Z_NO_FLUSH      = 0;
	//var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	//var Z_FULL_FLUSH    = 3;
	var Z_FINISH = 4;
	var Z_BLOCK = 5;
	var Z_TREES = 6;

	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK = 0;
	var Z_STREAM_END = 1;
	var Z_NEED_DICT = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR = -2;
	var Z_DATA_ERROR = -3;
	var Z_MEM_ERROR = -4;
	var Z_BUF_ERROR = -5;
	//var Z_VERSION_ERROR = -6;

	/* The deflate compression method */
	var Z_DEFLATED = 8;

	/* STATES ====================================================================*/
	/* ===========================================================================*/

	var HEAD = 1; /* i: waiting for magic header */
	var FLAGS = 2; /* i: waiting for method and flags (gzip) */
	var TIME = 3; /* i: waiting for modification time (gzip) */
	var OS = 4; /* i: waiting for extra flags and operating system (gzip) */
	var EXLEN = 5; /* i: waiting for extra length (gzip) */
	var EXTRA = 6; /* i: waiting for extra bytes (gzip) */
	var NAME = 7; /* i: waiting for end of file name (gzip) */
	var COMMENT = 8; /* i: waiting for end of comment (gzip) */
	var HCRC = 9; /* i: waiting for header crc (gzip) */
	var DICTID = 10; /* i: waiting for dictionary check value */
	var DICT = 11; /* waiting for inflateSetDictionary() call */
	var TYPE = 12; /* i: waiting for type bits, including last-flag bit */
	var TYPEDO = 13; /* i: same, but skip check to exit inflate on new block */
	var STORED = 14; /* i: waiting for stored size (length and complement) */
	var COPY_ = 15; /* i/o: same as COPY below, but only first time in */
	var COPY = 16; /* i/o: waiting for input or output to copy stored block */
	var TABLE = 17; /* i: waiting for dynamic block table lengths */
	var LENLENS = 18; /* i: waiting for code length code lengths */
	var CODELENS = 19; /* i: waiting for length/lit and distance code lengths */
	var LEN_ = 20; /* i: same as LEN below, but only first time in */
	var LEN = 21; /* i: waiting for length/lit/eob code */
	var LENEXT = 22; /* i: waiting for length extra bits */
	var DIST = 23; /* i: waiting for distance code */
	var DISTEXT = 24; /* i: waiting for distance extra bits */
	var MATCH = 25; /* o: waiting for output space to copy string */
	var LIT = 26; /* o: waiting for output space to write literal */
	var CHECK = 27; /* i: waiting for 32-bit check value */
	var LENGTH = 28; /* i: waiting for 32-bit length (gzip) */
	var DONE = 29; /* finished check, done -- remain here until reset */
	var BAD = 30; /* got a data error -- remain here until reset */
	var MEM = 31; /* got an inflate() memory error -- remain here until reset */
	var SYNC = 32; /* looking for synchronization bytes to restart inflate() */

	/* ===========================================================================*/

	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_WBITS = MAX_WBITS;

	function ZSWAP32(q) {
	  return (q >>> 24 & 0xff) + (q >>> 8 & 0xff00) + ((q & 0xff00) << 8) + ((q & 0xff) << 24);
	}

	function InflateState() {
	  this.mode = 0; /* current inflate mode */
	  this.last = false; /* true if processing last block */
	  this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
	  this.havedict = false; /* true if dictionary provided */
	  this.flags = 0; /* gzip header method and flags (0 if zlib) */
	  this.dmax = 0; /* zlib header max distance (INFLATE_STRICT) */
	  this.check = 0; /* protected copy of check value */
	  this.total = 0; /* protected copy of output count */
	  // TODO: may be {}
	  this.head = null; /* where to save gzip header information */

	  /* sliding window */
	  this.wbits = 0; /* log base 2 of requested window size */
	  this.wsize = 0; /* window size or zero if not using window */
	  this.whave = 0; /* valid bytes in the window */
	  this.wnext = 0; /* window write index */
	  this.window = null; /* allocated sliding window, if needed */

	  /* bit accumulator */
	  this.hold = 0; /* input bit accumulator */
	  this.bits = 0; /* number of bits in "in" */

	  /* for string and stored block copying */
	  this.length = 0; /* literal or length of data to copy */
	  this.offset = 0; /* distance back to copy string from */

	  /* for table and code decoding */
	  this.extra = 0; /* extra bits needed */

	  /* fixed and dynamic code tables */
	  this.lencode = null; /* starting table for length/literal codes */
	  this.distcode = null; /* starting table for distance codes */
	  this.lenbits = 0; /* index bits for lencode */
	  this.distbits = 0; /* index bits for distcode */

	  /* dynamic table building */
	  this.ncode = 0; /* number of code length code lengths */
	  this.nlen = 0; /* number of length code lengths */
	  this.ndist = 0; /* number of distance code lengths */
	  this.have = 0; /* number of code lengths in lens[] */
	  this.next = null; /* next available space in codes[] */

	  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
	  this.work = new utils.Buf16(288); /* work area for code table building */

	  /*
	   because we don't have pointers in js, we use lencode and distcode directly
	   as buffers so we don't need codes
	  */
	  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
	  this.lendyn = null; /* dynamic table for length/literal codes (JS specific) */
	  this.distdyn = null; /* dynamic table for distance codes (JS specific) */
	  this.sane = 0; /* if false, allow invalid distance too far */
	  this.back = 0; /* bits back of last unprocessed length/lit */
	  this.was = 0; /* initial length of match */
	}

	function inflateResetKeep(strm) {
	  var state;

	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  state = strm.state;
	  strm.total_in = strm.total_out = state.total = 0;
	  strm.msg = ''; /*Z_NULL*/
	  if (state.wrap) {
	    /* to support ill-conceived Java test suite */
	    strm.adler = state.wrap & 1;
	  }
	  state.mode = HEAD;
	  state.last = 0;
	  state.havedict = 0;
	  state.dmax = 32768;
	  state.head = null;
	  /*Z_NULL*/state.hold = 0;
	  state.bits = 0;
	  //state.lencode = state.distcode = state.next = state.codes;
	  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
	  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

	  state.sane = 1;
	  state.back = -1;
	  //Tracev((stderr, "inflate: reset\n"));
	  return Z_OK;
	}

	function inflateReset(strm) {
	  var state;

	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  state = strm.state;
	  state.wsize = 0;
	  state.whave = 0;
	  state.wnext = 0;
	  return inflateResetKeep(strm);
	}

	function inflateReset2(strm, windowBits) {
	  var wrap;
	  var state;

	  /* get the state */
	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  state = strm.state;

	  /* extract wrap request from windowBits parameter */
	  if (windowBits < 0) {
	    wrap = 0;
	    windowBits = -windowBits;
	  } else {
	    wrap = (windowBits >> 4) + 1;
	    if (windowBits < 48) {
	      windowBits &= 15;
	    }
	  }

	  /* set number of window bits, free window if different */
	  if (windowBits && (windowBits < 8 || windowBits > 15)) {
	    return Z_STREAM_ERROR;
	  }
	  if (state.window !== null && state.wbits !== windowBits) {
	    state.window = null;
	  }

	  /* update state and reset the rest of it */
	  state.wrap = wrap;
	  state.wbits = windowBits;
	  return inflateReset(strm);
	}

	function inflateInit2(strm, windowBits) {
	  var ret;
	  var state;

	  if (!strm) {
	    return Z_STREAM_ERROR;
	  }
	  //strm.msg = Z_NULL;                 /* in case we return an error */

	  state = new InflateState();

	  //if (state === Z_NULL) return Z_MEM_ERROR;
	  //Tracev((stderr, "inflate: allocated\n"));
	  strm.state = state;
	  state.window = null;
	  /*Z_NULL*/ret = inflateReset2(strm, windowBits);
	  if (ret !== Z_OK) {
	    strm.state = null;
	  }
	  /*Z_NULL*/return ret;
	}

	function inflateInit(strm) {
	  return inflateInit2(strm, DEF_WBITS);
	}

	/*
	 Return state with length and distance decoding tables and index sizes set to
	 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
	 If BUILDFIXED is defined, then instead this routine builds the tables the
	 first time it's called, and returns those tables the first time and
	 thereafter.  This reduces the size of the code by about 2K bytes, in
	 exchange for a little execution time.  However, BUILDFIXED should not be
	 used for threaded applications, since the rewriting of the tables and virgin
	 may not be thread-safe.
	 */
	var virgin = true;

	var lenfix, distfix; // We have no pointers in JS, so keep tables separate

	function fixedtables(state) {
	  /* build fixed huffman tables if first call (may not be thread safe) */
	  if (virgin) {
	    var sym;

	    lenfix = new utils.Buf32(512);
	    distfix = new utils.Buf32(32);

	    /* literal/length table */
	    sym = 0;
	    while (sym < 144) {
	      state.lens[sym++] = 8;
	    }
	    while (sym < 256) {
	      state.lens[sym++] = 9;
	    }
	    while (sym < 280) {
	      state.lens[sym++] = 7;
	    }
	    while (sym < 288) {
	      state.lens[sym++] = 8;
	    }

	    inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });

	    /* distance table */
	    sym = 0;
	    while (sym < 32) {
	      state.lens[sym++] = 5;
	    }

	    inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });

	    /* do this just once */
	    virgin = false;
	  }

	  state.lencode = lenfix;
	  state.lenbits = 9;
	  state.distcode = distfix;
	  state.distbits = 5;
	}

	/*
	 Update the window with the last wsize (normally 32K) bytes written before
	 returning.  If window does not exist yet, create it.  This is only called
	 when a window is already in use, or when output has been written during this
	 inflate call, but the end of the deflate stream has not been reached yet.
	 It is also called to create a window for dictionary data when a dictionary
	 is loaded.

	 Providing output buffers larger than 32K to inflate() should provide a speed
	 advantage, since only the last 32K of output is copied to the sliding window
	 upon return from inflate(), and since all distances after the first 32K of
	 output will fall in the output data, making match copies simpler and faster.
	 The advantage may be dependent on the size of the processor's data caches.
	 */
	function updatewindow(strm, src, end, copy) {
	  var dist;
	  var state = strm.state;

	  /* if it hasn't been done already, allocate space for the window */
	  if (state.window === null) {
	    state.wsize = 1 << state.wbits;
	    state.wnext = 0;
	    state.whave = 0;

	    state.window = new utils.Buf8(state.wsize);
	  }

	  /* copy state->wsize or less output bytes into the circular window */
	  if (copy >= state.wsize) {
	    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
	    state.wnext = 0;
	    state.whave = state.wsize;
	  } else {
	    dist = state.wsize - state.wnext;
	    if (dist > copy) {
	      dist = copy;
	    }
	    //zmemcpy(state->window + state->wnext, end - copy, dist);
	    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
	    copy -= dist;
	    if (copy) {
	      //zmemcpy(state->window, end - copy, copy);
	      utils.arraySet(state.window, src, end - copy, copy, 0);
	      state.wnext = copy;
	      state.whave = state.wsize;
	    } else {
	      state.wnext += dist;
	      if (state.wnext === state.wsize) {
	        state.wnext = 0;
	      }
	      if (state.whave < state.wsize) {
	        state.whave += dist;
	      }
	    }
	  }
	  return 0;
	}

	function inflate(strm, flush) {
	  var state;
	  var input, output; // input/output buffers
	  var next; /* next input INDEX */
	  var put; /* next output INDEX */
	  var have, left; /* available input and output */
	  var hold; /* bit buffer */
	  var bits; /* bits in bit buffer */
	  var _in, _out; /* save starting available input and output */
	  var copy; /* number of stored or match bytes to copy */
	  var from; /* where to copy match bytes from */
	  var from_source;
	  var here = 0; /* current decoding table entry */
	  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
	  //var last;                   /* parent table entry */
	  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
	  var len; /* length to copy for repeats, bits to drop */
	  var ret; /* return code */
	  var hbuf = new utils.Buf8(4); /* buffer for gzip header crc calculation */
	  var opts;

	  var n; // temporary var for NEED_BITS

	  var order = /* permutation of code lengths */
	  [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

	  if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
	    return Z_STREAM_ERROR;
	  }

	  state = strm.state;
	  if (state.mode === TYPE) {
	    state.mode = TYPEDO;
	  } /* skip check */

	  //--- LOAD() ---
	  put = strm.next_out;
	  output = strm.output;
	  left = strm.avail_out;
	  next = strm.next_in;
	  input = strm.input;
	  have = strm.avail_in;
	  hold = state.hold;
	  bits = state.bits;
	  //---

	  _in = have;
	  _out = left;
	  ret = Z_OK;

	  inf_leave: // goto emulation
	  for (;;) {
	    switch (state.mode) {
	      case HEAD:
	        if (state.wrap === 0) {
	          state.mode = TYPEDO;
	          break;
	        }
	        //=== NEEDBITS(16);
	        while (bits < 16) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (state.wrap & 2 && hold === 0x8b1f) {
	          /* gzip header */
	          state.check = 0;
	          //=== CRC2(state.check, hold);
	          /*crc32(0L, Z_NULL, 0)*/hbuf[0] = hold & 0xff;
	          hbuf[1] = hold >>> 8 & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//

	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          state.mode = FLAGS;
	          break;
	        }
	        state.flags = 0; /* expect zlib header */
	        if (state.head) {
	          state.head.done = false;
	        }
	        if (!(state.wrap & 1) || /* check if zlib header allowed */
	        (((hold & 0xff) << /*BITS(8)*/8) + (hold >> 8)) % 31) {
	          strm.msg = 'incorrect header check';
	          state.mode = BAD;
	          break;
	        }
	        if ((hold & 0x0f) !== /*BITS(4)*/Z_DEFLATED) {
	          strm.msg = 'unknown compression method';
	          state.mode = BAD;
	          break;
	        }
	        //--- DROPBITS(4) ---//
	        hold >>>= 4;
	        bits -= 4;
	        //---//
	        len = (hold & 0x0f) + /*BITS(4)*/8;
	        if (state.wbits === 0) {
	          state.wbits = len;
	        } else if (len > state.wbits) {
	          strm.msg = 'invalid window size';
	          state.mode = BAD;
	          break;
	        }
	        state.dmax = 1 << len;
	        //Tracev((stderr, "inflate:   zlib header ok\n"));
	        strm.adler = state.check = 1;
	        /*adler32(0L, Z_NULL, 0)*/state.mode = hold & 0x200 ? DICTID : TYPE;
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        break;
	      case FLAGS:
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.flags = hold;
	        if ((state.flags & 0xff) !== Z_DEFLATED) {
	          strm.msg = 'unknown compression method';
	          state.mode = BAD;
	          break;
	        }
	        if (state.flags & 0xe000) {
	          strm.msg = 'unknown header flags set';
	          state.mode = BAD;
	          break;
	        }
	        if (state.head) {
	          state.head.text = hold >> 8 & 1;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = hold >>> 8 & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = TIME;
	      /* falls through */
	      case TIME:
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (state.head) {
	          state.head.time = hold;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC4(state.check, hold)
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = hold >>> 8 & 0xff;
	          hbuf[2] = hold >>> 16 & 0xff;
	          hbuf[3] = hold >>> 24 & 0xff;
	          state.check = crc32(state.check, hbuf, 4, 0);
	          //===
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = OS;
	      /* falls through */
	      case OS:
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (state.head) {
	          state.head.xflags = hold & 0xff;
	          state.head.os = hold >> 8;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = hold >>> 8 & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = EXLEN;
	      /* falls through */
	      case EXLEN:
	        if (state.flags & 0x0400) {
	          //=== NEEDBITS(16); */
	          while (bits < 16) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.length = hold;
	          if (state.head) {
	            state.head.extra_len = hold;
	          }
	          if (state.flags & 0x0200) {
	            //=== CRC2(state.check, hold);
	            hbuf[0] = hold & 0xff;
	            hbuf[1] = hold >>> 8 & 0xff;
	            state.check = crc32(state.check, hbuf, 2, 0);
	            //===//
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	        } else if (state.head) {
	            state.head.extra = null;
	          }
	        /*Z_NULL*/state.mode = EXTRA;
	      /* falls through */
	      case EXTRA:
	        if (state.flags & 0x0400) {
	          copy = state.length;
	          if (copy > have) {
	            copy = have;
	          }
	          if (copy) {
	            if (state.head) {
	              len = state.head.extra_len - state.length;
	              if (!state.head.extra) {
	                // Use untyped array for more conveniend processing later
	                state.head.extra = new Array(state.head.extra_len);
	              }
	              utils.arraySet(state.head.extra, input, next,
	              // extra field is limited to 65536 bytes
	              // - no need for additional size check
	              copy,
	              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
	              len);
	              //zmemcpy(state.head.extra + len, next,
	              //        len + copy > state.head.extra_max ?
	              //        state.head.extra_max - len : copy);
	            }
	            if (state.flags & 0x0200) {
	              state.check = crc32(state.check, input, copy, next);
	            }
	            have -= copy;
	            next += copy;
	            state.length -= copy;
	          }
	          if (state.length) {
	            break inf_leave;
	          }
	        }
	        state.length = 0;
	        state.mode = NAME;
	      /* falls through */
	      case NAME:
	        if (state.flags & 0x0800) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          copy = 0;
	          do {
	            // TODO: 2 or 1 bytes?
	            len = input[next + copy++];
	            /* use constant limit because in js we should not preallocate memory */
	            if (state.head && len && state.length < 65536 /*state.head.name_max*/) {
	                state.head.name += String.fromCharCode(len);
	              }
	          } while (len && copy < have);

	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          if (len) {
	            break inf_leave;
	          }
	        } else if (state.head) {
	          state.head.name = null;
	        }
	        state.length = 0;
	        state.mode = COMMENT;
	      /* falls through */
	      case COMMENT:
	        if (state.flags & 0x1000) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          copy = 0;
	          do {
	            len = input[next + copy++];
	            /* use constant limit because in js we should not preallocate memory */
	            if (state.head && len && state.length < 65536 /*state.head.comm_max*/) {
	                state.head.comment += String.fromCharCode(len);
	              }
	          } while (len && copy < have);
	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          if (len) {
	            break inf_leave;
	          }
	        } else if (state.head) {
	          state.head.comment = null;
	        }
	        state.mode = HCRC;
	      /* falls through */
	      case HCRC:
	        if (state.flags & 0x0200) {
	          //=== NEEDBITS(16); */
	          while (bits < 16) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          if (hold !== (state.check & 0xffff)) {
	            strm.msg = 'header crc mismatch';
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	        }
	        if (state.head) {
	          state.head.hcrc = state.flags >> 9 & 1;
	          state.head.done = true;
	        }
	        strm.adler = state.check = 0;
	        /*crc32(0L, Z_NULL, 0)*/state.mode = TYPE;
	        break;
	      case DICTID:
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        strm.adler = state.check = ZSWAP32(hold);
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = DICT;
	      /* falls through */
	      case DICT:
	        if (state.havedict === 0) {
	          //--- RESTORE() ---
	          strm.next_out = put;
	          strm.avail_out = left;
	          strm.next_in = next;
	          strm.avail_in = have;
	          state.hold = hold;
	          state.bits = bits;
	          //---
	          return Z_NEED_DICT;
	        }
	        strm.adler = state.check = 1;
	        /*adler32(0L, Z_NULL, 0)*/state.mode = TYPE;
	      /* falls through */
	      case TYPE:
	        if (flush === Z_BLOCK || flush === Z_TREES) {
	          break inf_leave;
	        }
	      /* falls through */
	      case TYPEDO:
	        if (state.last) {
	          //--- BYTEBITS() ---//
	          hold >>>= bits & 7;
	          bits -= bits & 7;
	          //---//
	          state.mode = CHECK;
	          break;
	        }
	        //=== NEEDBITS(3); */
	        while (bits < 3) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.last = hold & 0x01;
	        //--- DROPBITS(1) ---//
	        /*BITS(1)*/hold >>>= 1;
	        bits -= 1;
	        //---//

	        switch (hold & 0x03) {/*BITS(2)*/
	          case 0:
	            /* stored block */
	            //Tracev((stderr, "inflate:     stored block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = STORED;
	            break;
	          case 1:
	            /* fixed block */
	            fixedtables(state);
	            //Tracev((stderr, "inflate:     fixed codes block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = LEN_; /* decode codes */
	            if (flush === Z_TREES) {
	              //--- DROPBITS(2) ---//
	              hold >>>= 2;
	              bits -= 2;
	              //---//
	              break inf_leave;
	            }
	            break;
	          case 2:
	            /* dynamic block */
	            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = TABLE;
	            break;
	          case 3:
	            strm.msg = 'invalid block type';
	            state.mode = BAD;
	        }
	        //--- DROPBITS(2) ---//
	        hold >>>= 2;
	        bits -= 2;
	        //---//
	        break;
	      case STORED:
	        //--- BYTEBITS() ---// /* go to byte boundary */
	        hold >>>= bits & 7;
	        bits -= bits & 7;
	        //---//
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if ((hold & 0xffff) !== (hold >>> 16 ^ 0xffff)) {
	          strm.msg = 'invalid stored block lengths';
	          state.mode = BAD;
	          break;
	        }
	        state.length = hold & 0xffff;
	        //Tracev((stderr, "inflate:       stored length %u\n",
	        //        state.length));
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = COPY_;
	        if (flush === Z_TREES) {
	          break inf_leave;
	        }
	      /* falls through */
	      case COPY_:
	        state.mode = COPY;
	      /* falls through */
	      case COPY:
	        copy = state.length;
	        if (copy) {
	          if (copy > have) {
	            copy = have;
	          }
	          if (copy > left) {
	            copy = left;
	          }
	          if (copy === 0) {
	            break inf_leave;
	          }
	          //--- zmemcpy(put, next, copy); ---
	          utils.arraySet(output, input, next, copy, put);
	          //---//
	          have -= copy;
	          next += copy;
	          left -= copy;
	          put += copy;
	          state.length -= copy;
	          break;
	        }
	        //Tracev((stderr, "inflate:       stored end\n"));
	        state.mode = TYPE;
	        break;
	      case TABLE:
	        //=== NEEDBITS(14); */
	        while (bits < 14) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.nlen = (hold & 0x1f) + /*BITS(5)*/257;
	        //--- DROPBITS(5) ---//
	        hold >>>= 5;
	        bits -= 5;
	        //---//
	        state.ndist = (hold & 0x1f) + /*BITS(5)*/1;
	        //--- DROPBITS(5) ---//
	        hold >>>= 5;
	        bits -= 5;
	        //---//
	        state.ncode = (hold & 0x0f) + /*BITS(4)*/4;
	        //--- DROPBITS(4) ---//
	        hold >>>= 4;
	        bits -= 4;
	        //---//
	        //#ifndef PKZIP_BUG_WORKAROUND
	        if (state.nlen > 286 || state.ndist > 30) {
	          strm.msg = 'too many length or distance symbols';
	          state.mode = BAD;
	          break;
	        }
	        //#endif
	        //Tracev((stderr, "inflate:       table sizes ok\n"));
	        state.have = 0;
	        state.mode = LENLENS;
	      /* falls through */
	      case LENLENS:
	        while (state.have < state.ncode) {
	          //=== NEEDBITS(3);
	          while (bits < 3) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.lens[order[state.have++]] = hold & 0x07; //BITS(3);
	          //--- DROPBITS(3) ---//
	          hold >>>= 3;
	          bits -= 3;
	          //---//
	        }
	        while (state.have < 19) {
	          state.lens[order[state.have++]] = 0;
	        }
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        //state.next = state.codes;
	        //state.lencode = state.next;
	        // Switch to use dynamic table
	        state.lencode = state.lendyn;
	        state.lenbits = 7;

	        opts = { bits: state.lenbits };
	        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
	        state.lenbits = opts.bits;

	        if (ret) {
	          strm.msg = 'invalid code lengths set';
	          state.mode = BAD;
	          break;
	        }
	        //Tracev((stderr, "inflate:       code lengths ok\n"));
	        state.have = 0;
	        state.mode = CODELENS;
	      /* falls through */
	      case CODELENS:
	        while (state.have < state.nlen + state.ndist) {
	          for (;;) {
	            here = state.lencode[hold & (1 << state.lenbits) - 1]; /*BITS(state.lenbits)*/
	            here_bits = here >>> 24;
	            here_op = here >>> 16 & 0xff;
	            here_val = here & 0xffff;

	            if (here_bits <= bits) {
	              break;
	            }
	            //--- PULLBYTE() ---//
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          if (here_val < 16) {
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            state.lens[state.have++] = here_val;
	          } else {
	            if (here_val === 16) {
	              //=== NEEDBITS(here.bits + 2);
	              n = here_bits + 2;
	              while (bits < n) {
	                if (have === 0) {
	                  break inf_leave;
	                }
	                have--;
	                hold += input[next++] << bits;
	                bits += 8;
	              }
	              //===//
	              //--- DROPBITS(here.bits) ---//
	              hold >>>= here_bits;
	              bits -= here_bits;
	              //---//
	              if (state.have === 0) {
	                strm.msg = 'invalid bit length repeat';
	                state.mode = BAD;
	                break;
	              }
	              len = state.lens[state.have - 1];
	              copy = 3 + (hold & 0x03); //BITS(2);
	              //--- DROPBITS(2) ---//
	              hold >>>= 2;
	              bits -= 2;
	              //---//
	            } else if (here_val === 17) {
	                //=== NEEDBITS(here.bits + 3);
	                n = here_bits + 3;
	                while (bits < n) {
	                  if (have === 0) {
	                    break inf_leave;
	                  }
	                  have--;
	                  hold += input[next++] << bits;
	                  bits += 8;
	                }
	                //===//
	                //--- DROPBITS(here.bits) ---//
	                hold >>>= here_bits;
	                bits -= here_bits;
	                //---//
	                len = 0;
	                copy = 3 + (hold & 0x07); //BITS(3);
	                //--- DROPBITS(3) ---//
	                hold >>>= 3;
	                bits -= 3;
	                //---//
	              } else {
	                  //=== NEEDBITS(here.bits + 7);
	                  n = here_bits + 7;
	                  while (bits < n) {
	                    if (have === 0) {
	                      break inf_leave;
	                    }
	                    have--;
	                    hold += input[next++] << bits;
	                    bits += 8;
	                  }
	                  //===//
	                  //--- DROPBITS(here.bits) ---//
	                  hold >>>= here_bits;
	                  bits -= here_bits;
	                  //---//
	                  len = 0;
	                  copy = 11 + (hold & 0x7f); //BITS(7);
	                  //--- DROPBITS(7) ---//
	                  hold >>>= 7;
	                  bits -= 7;
	                  //---//
	                }
	            if (state.have + copy > state.nlen + state.ndist) {
	              strm.msg = 'invalid bit length repeat';
	              state.mode = BAD;
	              break;
	            }
	            while (copy--) {
	              state.lens[state.have++] = len;
	            }
	          }
	        }

	        /* handle error breaks in while */
	        if (state.mode === BAD) {
	          break;
	        }

	        /* check for end-of-block code (better have one) */
	        if (state.lens[256] === 0) {
	          strm.msg = 'invalid code -- missing end-of-block';
	          state.mode = BAD;
	          break;
	        }

	        /* build code tables -- note: do not change the lenbits or distbits
	           values here (9 and 6) without reading the comments in inftrees.h
	           concerning the ENOUGH constants, which depend on those values */
	        state.lenbits = 9;

	        opts = { bits: state.lenbits };
	        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        // state.next_index = opts.table_index;
	        state.lenbits = opts.bits;
	        // state.lencode = state.next;

	        if (ret) {
	          strm.msg = 'invalid literal/lengths set';
	          state.mode = BAD;
	          break;
	        }

	        state.distbits = 6;
	        //state.distcode.copy(state.codes);
	        // Switch to use dynamic table
	        state.distcode = state.distdyn;
	        opts = { bits: state.distbits };
	        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        // state.next_index = opts.table_index;
	        state.distbits = opts.bits;
	        // state.distcode = state.next;

	        if (ret) {
	          strm.msg = 'invalid distances set';
	          state.mode = BAD;
	          break;
	        }
	        //Tracev((stderr, 'inflate:       codes ok\n'));
	        state.mode = LEN_;
	        if (flush === Z_TREES) {
	          break inf_leave;
	        }
	      /* falls through */
	      case LEN_:
	        state.mode = LEN;
	      /* falls through */
	      case LEN:
	        if (have >= 6 && left >= 258) {
	          //--- RESTORE() ---
	          strm.next_out = put;
	          strm.avail_out = left;
	          strm.next_in = next;
	          strm.avail_in = have;
	          state.hold = hold;
	          state.bits = bits;
	          //---
	          inflate_fast(strm, _out);
	          //--- LOAD() ---
	          put = strm.next_out;
	          output = strm.output;
	          left = strm.avail_out;
	          next = strm.next_in;
	          input = strm.input;
	          have = strm.avail_in;
	          hold = state.hold;
	          bits = state.bits;
	          //---

	          if (state.mode === TYPE) {
	            state.back = -1;
	          }
	          break;
	        }
	        state.back = 0;
	        for (;;) {
	          here = state.lencode[hold & (1 << state.lenbits) - 1]; /*BITS(state.lenbits)*/
	          here_bits = here >>> 24;
	          here_op = here >>> 16 & 0xff;
	          here_val = here & 0xffff;

	          if (here_bits <= bits) {
	            break;
	          }
	          //--- PULLBYTE() ---//
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if (here_op && (here_op & 0xf0) === 0) {
	          last_bits = here_bits;
	          last_op = here_op;
	          last_val = here_val;
	          for (;;) {
	            here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> /*BITS(last.bits + last.op)*/last_bits)];
	            here_bits = here >>> 24;
	            here_op = here >>> 16 & 0xff;
	            here_val = here & 0xffff;

	            if (last_bits + here_bits <= bits) {
	              break;
	            }
	            //--- PULLBYTE() ---//
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          //--- DROPBITS(last.bits) ---//
	          hold >>>= last_bits;
	          bits -= last_bits;
	          //---//
	          state.back += last_bits;
	        }
	        //--- DROPBITS(here.bits) ---//
	        hold >>>= here_bits;
	        bits -= here_bits;
	        //---//
	        state.back += here_bits;
	        state.length = here_val;
	        if (here_op === 0) {
	          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	          //        "inflate:         literal '%c'\n" :
	          //        "inflate:         literal 0x%02x\n", here.val));
	          state.mode = LIT;
	          break;
	        }
	        if (here_op & 32) {
	          //Tracevv((stderr, "inflate:         end of block\n"));
	          state.back = -1;
	          state.mode = TYPE;
	          break;
	        }
	        if (here_op & 64) {
	          strm.msg = 'invalid literal/length code';
	          state.mode = BAD;
	          break;
	        }
	        state.extra = here_op & 15;
	        state.mode = LENEXT;
	      /* falls through */
	      case LENEXT:
	        if (state.extra) {
	          //=== NEEDBITS(state.extra);
	          n = state.extra;
	          while (bits < n) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.length += hold & (1 << state.extra) - 1;
	          //--- DROPBITS(state.extra) ---//
	          /*BITS(state.extra)*/hold >>>= state.extra;
	          bits -= state.extra;
	          //---//
	          state.back += state.extra;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", state.length));
	        state.was = state.length;
	        state.mode = DIST;
	      /* falls through */
	      case DIST:
	        for (;;) {
	          here = state.distcode[hold & (1 << state.distbits) - 1]; /*BITS(state.distbits)*/
	          here_bits = here >>> 24;
	          here_op = here >>> 16 & 0xff;
	          here_val = here & 0xffff;

	          if (here_bits <= bits) {
	            break;
	          }
	          //--- PULLBYTE() ---//
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if ((here_op & 0xf0) === 0) {
	          last_bits = here_bits;
	          last_op = here_op;
	          last_val = here_val;
	          for (;;) {
	            here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> /*BITS(last.bits + last.op)*/last_bits)];
	            here_bits = here >>> 24;
	            here_op = here >>> 16 & 0xff;
	            here_val = here & 0xffff;

	            if (last_bits + here_bits <= bits) {
	              break;
	            }
	            //--- PULLBYTE() ---//
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          //--- DROPBITS(last.bits) ---//
	          hold >>>= last_bits;
	          bits -= last_bits;
	          //---//
	          state.back += last_bits;
	        }
	        //--- DROPBITS(here.bits) ---//
	        hold >>>= here_bits;
	        bits -= here_bits;
	        //---//
	        state.back += here_bits;
	        if (here_op & 64) {
	          strm.msg = 'invalid distance code';
	          state.mode = BAD;
	          break;
	        }
	        state.offset = here_val;
	        state.extra = here_op & 15;
	        state.mode = DISTEXT;
	      /* falls through */
	      case DISTEXT:
	        if (state.extra) {
	          //=== NEEDBITS(state.extra);
	          n = state.extra;
	          while (bits < n) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.offset += hold & (1 << state.extra) - 1;
	          //--- DROPBITS(state.extra) ---//
	          /*BITS(state.extra)*/hold >>>= state.extra;
	          bits -= state.extra;
	          //---//
	          state.back += state.extra;
	        }
	        //#ifdef INFLATE_STRICT
	        if (state.offset > state.dmax) {
	          strm.msg = 'invalid distance too far back';
	          state.mode = BAD;
	          break;
	        }
	        //#endif
	        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
	        state.mode = MATCH;
	      /* falls through */
	      case MATCH:
	        if (left === 0) {
	          break inf_leave;
	        }
	        copy = _out - left;
	        if (state.offset > copy) {
	          /* copy from window */
	          copy = state.offset - copy;
	          if (copy > state.whave) {
	            if (state.sane) {
	              strm.msg = 'invalid distance too far back';
	              state.mode = BAD;
	              break;
	            }
	            // (!) This block is disabled in zlib defailts,
	            // don't enable it for binary compatibility
	            //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	            //          Trace((stderr, "inflate.c too far\n"));
	            //          copy -= state.whave;
	            //          if (copy > state.length) { copy = state.length; }
	            //          if (copy > left) { copy = left; }
	            //          left -= copy;
	            //          state.length -= copy;
	            //          do {
	            //            output[put++] = 0;
	            //          } while (--copy);
	            //          if (state.length === 0) { state.mode = LEN; }
	            //          break;
	            //#endif
	          }
	          if (copy > state.wnext) {
	            copy -= state.wnext;
	            from = state.wsize - copy;
	          } else {
	            from = state.wnext - copy;
	          }
	          if (copy > state.length) {
	            copy = state.length;
	          }
	          from_source = state.window;
	        } else {
	          /* copy from output */
	          from_source = output;
	          from = put - state.offset;
	          copy = state.length;
	        }
	        if (copy > left) {
	          copy = left;
	        }
	        left -= copy;
	        state.length -= copy;
	        do {
	          output[put++] = from_source[from++];
	        } while (--copy);
	        if (state.length === 0) {
	          state.mode = LEN;
	        }
	        break;
	      case LIT:
	        if (left === 0) {
	          break inf_leave;
	        }
	        output[put++] = state.length;
	        left--;
	        state.mode = LEN;
	        break;
	      case CHECK:
	        if (state.wrap) {
	          //=== NEEDBITS(32);
	          while (bits < 32) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            // Use '|' insdead of '+' to make sure that result is signed
	            hold |= input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          _out -= left;
	          strm.total_out += _out;
	          state.total += _out;
	          if (_out) {
	            strm.adler = state.check =
	            /*UPDATE(state.check, put - _out, _out);*/
	            state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
	          }
	          _out = left;
	          // NB: crc32 stored as signed 32-bit int, ZSWAP32 returns signed too
	          if ((state.flags ? hold : ZSWAP32(hold)) !== state.check) {
	            strm.msg = 'incorrect data check';
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          //Tracev((stderr, "inflate:   check matches trailer\n"));
	        }
	        state.mode = LENGTH;
	      /* falls through */
	      case LENGTH:
	        if (state.wrap && state.flags) {
	          //=== NEEDBITS(32);
	          while (bits < 32) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          if (hold !== (state.total & 0xffffffff)) {
	            strm.msg = 'incorrect length check';
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          //Tracev((stderr, "inflate:   length matches trailer\n"));
	        }
	        state.mode = DONE;
	      /* falls through */
	      case DONE:
	        ret = Z_STREAM_END;
	        break inf_leave;
	      case BAD:
	        ret = Z_DATA_ERROR;
	        break inf_leave;
	      case MEM:
	        return Z_MEM_ERROR;
	      case SYNC:
	      /* falls through */
	      default:
	        return Z_STREAM_ERROR;
	    }
	  }

	  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

	  /*
	     Return from inflate(), updating the total counts and the check value.
	     If there was no progress during the inflate() call, return a buffer
	     error.  Call updatewindow() to create and/or update the window state.
	     Note: a memory error from inflate() is non-recoverable.
	   */

	  //--- RESTORE() ---
	  strm.next_out = put;
	  strm.avail_out = left;
	  strm.next_in = next;
	  strm.avail_in = have;
	  state.hold = hold;
	  state.bits = bits;
	  //---

	  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
	    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
	      state.mode = MEM;
	      return Z_MEM_ERROR;
	    }
	  }
	  _in -= strm.avail_in;
	  _out -= strm.avail_out;
	  strm.total_in += _in;
	  strm.total_out += _out;
	  state.total += _out;
	  if (state.wrap && _out) {
	    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
	    state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
	  }
	  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
	  if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
	    ret = Z_BUF_ERROR;
	  }
	  return ret;
	}

	function inflateEnd(strm) {

	  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
	      return Z_STREAM_ERROR;
	    }

	  var state = strm.state;
	  if (state.window) {
	    state.window = null;
	  }
	  strm.state = null;
	  return Z_OK;
	}

	function inflateGetHeader(strm, head) {
	  var state;

	  /* check state */
	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  state = strm.state;
	  if ((state.wrap & 2) === 0) {
	    return Z_STREAM_ERROR;
	  }

	  /* save header structure */
	  state.head = head;
	  head.done = false;
	  return Z_OK;
	}

	exports.inflateReset = inflateReset;
	exports.inflateReset2 = inflateReset2;
	exports.inflateResetKeep = inflateResetKeep;
	exports.inflateInit = inflateInit;
	exports.inflateInit2 = inflateInit2;
	exports.inflate = inflate;
	exports.inflateEnd = inflateEnd;
	exports.inflateGetHeader = inflateGetHeader;
	exports.inflateInfo = 'pako inflate (from Nodeca project)';

	/* Not implemented
	exports.inflateCopy = inflateCopy;
	exports.inflateGetDictionary = inflateGetDictionary;
	exports.inflateMark = inflateMark;
	exports.inflatePrime = inflatePrime;
	exports.inflateSetDictionary = inflateSetDictionary;
	exports.inflateSync = inflateSync;
	exports.inflateSyncPoint = inflateSyncPoint;
	exports.inflateUndermine = inflateUndermine;
	*/

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	// See state defs from inflate.js
	var BAD = 30; /* got a data error -- remain here until reset */
	var TYPE = 12; /* i: waiting for type bits, including last-flag bit */

	/*
	   Decode literal, length, and distance codes and write out the resulting
	   literal and match bytes until either not enough input or output is
	   available, an end-of-block is encountered, or a data error is encountered.
	   When large enough input and output buffers are supplied to inflate(), for
	   example, a 16K input buffer and a 64K output buffer, more than 95% of the
	   inflate execution time is spent in this routine.

	   Entry assumptions:

	        state.mode === LEN
	        strm.avail_in >= 6
	        strm.avail_out >= 258
	        start >= strm.avail_out
	        state.bits < 8

	   On return, state.mode is one of:

	        LEN -- ran out of enough output space or enough available input
	        TYPE -- reached end of block code, inflate() to interpret next block
	        BAD -- error in block data

	   Notes:

	    - The maximum input bits used by a length/distance pair is 15 bits for the
	      length code, 5 bits for the length extra, 15 bits for the distance code,
	      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
	      Therefore if strm.avail_in >= 6, then there is enough input to avoid
	      checking for available input while decoding.

	    - The maximum bytes that a single length/distance pair can output is 258
	      bytes, which is the maximum length that can be coded.  inflate_fast()
	      requires strm.avail_out >= 258 for each loop to avoid checking for
	      output space.
	 */
	module.exports = function inflate_fast(strm, start) {
	  var state;
	  var _in; /* local strm.input */
	  var last; /* have enough input while in < last */
	  var _out; /* local strm.output */
	  var beg; /* inflate()'s initial strm.output */
	  var end; /* while out < end, enough space available */
	  //#ifdef INFLATE_STRICT
	  var dmax; /* maximum distance from zlib header */
	  //#endif
	  var wsize; /* window size or zero if not using window */
	  var whave; /* valid bytes in the window */
	  var wnext; /* window write index */
	  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
	  var s_window; /* allocated sliding window, if wsize != 0 */
	  var hold; /* local strm.hold */
	  var bits; /* local strm.bits */
	  var lcode; /* local strm.lencode */
	  var dcode; /* local strm.distcode */
	  var lmask; /* mask for first level of length codes */
	  var dmask; /* mask for first level of distance codes */
	  var here; /* retrieved table entry */
	  var op; /* code bits, operation, extra bits, or */
	  /*  window position, window bytes to copy */
	  var len; /* match length, unused bytes */
	  var dist; /* match distance */
	  var from; /* where to copy match from */
	  var from_source;

	  var input, output; // JS specific, because we have no pointers

	  /* copy state to local variables */
	  state = strm.state;
	  //here = state.here;
	  _in = strm.next_in;
	  input = strm.input;
	  last = _in + (strm.avail_in - 5);
	  _out = strm.next_out;
	  output = strm.output;
	  beg = _out - (start - strm.avail_out);
	  end = _out + (strm.avail_out - 257);
	  //#ifdef INFLATE_STRICT
	  dmax = state.dmax;
	  //#endif
	  wsize = state.wsize;
	  whave = state.whave;
	  wnext = state.wnext;
	  s_window = state.window;
	  hold = state.hold;
	  bits = state.bits;
	  lcode = state.lencode;
	  dcode = state.distcode;
	  lmask = (1 << state.lenbits) - 1;
	  dmask = (1 << state.distbits) - 1;

	  /* decode literals and length/distances until end-of-block or not enough
	     input data or output space */

	  top: do {
	    if (bits < 15) {
	      hold += input[_in++] << bits;
	      bits += 8;
	      hold += input[_in++] << bits;
	      bits += 8;
	    }

	    here = lcode[hold & lmask];

	    dolen: for (;;) {
	      // Goto emulation
	      op = here >>> 24;
	      /*here.bits*/hold >>>= op;
	      bits -= op;
	      op = here >>> 16 & 0xff;
	      /*here.op*/if (op === 0) {
	        /* literal */
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        output[_out++] = here & 0xffff;
	      } else /*here.val*/if (op & 16) {
	          /* length base */
	          len = here & 0xffff;
	          /*here.val*/op &= 15; /* number of extra bits */
	          if (op) {
	            if (bits < op) {
	              hold += input[_in++] << bits;
	              bits += 8;
	            }
	            len += hold & (1 << op) - 1;
	            hold >>>= op;
	            bits -= op;
	          }
	          //Tracevv((stderr, "inflate:         length %u\n", len));
	          if (bits < 15) {
	            hold += input[_in++] << bits;
	            bits += 8;
	            hold += input[_in++] << bits;
	            bits += 8;
	          }
	          here = dcode[hold & dmask];

	          dodist: for (;;) {
	            // goto emulation
	            op = here >>> 24;
	            /*here.bits*/hold >>>= op;
	            bits -= op;
	            op = here >>> 16 & 0xff;

	            /*here.op*/if (op & 16) {
	              /* distance base */
	              dist = here & 0xffff;
	              /*here.val*/op &= 15; /* number of extra bits */
	              if (bits < op) {
	                hold += input[_in++] << bits;
	                bits += 8;
	                if (bits < op) {
	                  hold += input[_in++] << bits;
	                  bits += 8;
	                }
	              }
	              dist += hold & (1 << op) - 1;
	              //#ifdef INFLATE_STRICT
	              if (dist > dmax) {
	                strm.msg = 'invalid distance too far back';
	                state.mode = BAD;
	                break top;
	              }
	              //#endif
	              hold >>>= op;
	              bits -= op;
	              //Tracevv((stderr, "inflate:         distance %u\n", dist));
	              op = _out - beg; /* max distance in output */
	              if (dist > op) {
	                /* see if copy from window */
	                op = dist - op; /* distance back in window */
	                if (op > whave) {
	                  if (state.sane) {
	                    strm.msg = 'invalid distance too far back';
	                    state.mode = BAD;
	                    break top;
	                  }

	                  // (!) This block is disabled in zlib defailts,
	                  // don't enable it for binary compatibility
	                  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	                  //                if (len <= op - whave) {
	                  //                  do {
	                  //                    output[_out++] = 0;
	                  //                  } while (--len);
	                  //                  continue top;
	                  //                }
	                  //                len -= op - whave;
	                  //                do {
	                  //                  output[_out++] = 0;
	                  //                } while (--op > whave);
	                  //                if (op === 0) {
	                  //                  from = _out - dist;
	                  //                  do {
	                  //                    output[_out++] = output[from++];
	                  //                  } while (--len);
	                  //                  continue top;
	                  //                }
	                  //#endif
	                }
	                from = 0; // window index
	                from_source = s_window;
	                if (wnext === 0) {
	                  /* very common case */
	                  from += wsize - op;
	                  if (op < len) {
	                    /* some from window */
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = _out - dist; /* rest from output */
	                    from_source = output;
	                  }
	                } else if (wnext < op) {
	                  /* wrap around window */
	                  from += wsize + wnext - op;
	                  op -= wnext;
	                  if (op < len) {
	                    /* some from end of window */
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = 0;
	                    if (wnext < len) {
	                      /* some from start of window */
	                      op = wnext;
	                      len -= op;
	                      do {
	                        output[_out++] = s_window[from++];
	                      } while (--op);
	                      from = _out - dist; /* rest from output */
	                      from_source = output;
	                    }
	                  }
	                } else {
	                  /* contiguous in window */
	                  from += wnext - op;
	                  if (op < len) {
	                    /* some from window */
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = _out - dist; /* rest from output */
	                    from_source = output;
	                  }
	                }
	                while (len > 2) {
	                  output[_out++] = from_source[from++];
	                  output[_out++] = from_source[from++];
	                  output[_out++] = from_source[from++];
	                  len -= 3;
	                }
	                if (len) {
	                  output[_out++] = from_source[from++];
	                  if (len > 1) {
	                    output[_out++] = from_source[from++];
	                  }
	                }
	              } else {
	                from = _out - dist; /* copy direct from output */
	                do {
	                  /* minimum length is three */
	                  output[_out++] = output[from++];
	                  output[_out++] = output[from++];
	                  output[_out++] = output[from++];
	                  len -= 3;
	                } while (len > 2);
	                if (len) {
	                  output[_out++] = output[from++];
	                  if (len > 1) {
	                    output[_out++] = output[from++];
	                  }
	                }
	              }
	            } else if ((op & 64) === 0) {
	              /* 2nd level distance code */
	              here = dcode[(here & 0xffff) + ( /*here.val*/hold & (1 << op) - 1)];
	              continue dodist;
	            } else {
	              strm.msg = 'invalid distance code';
	              state.mode = BAD;
	              break top;
	            }

	            break; // need to emulate goto via "continue"
	          }
	        } else if ((op & 64) === 0) {
	            /* 2nd level length code */
	            here = lcode[(here & 0xffff) + ( /*here.val*/hold & (1 << op) - 1)];
	            continue dolen;
	          } else if (op & 32) {
	            /* end-of-block */
	            //Tracevv((stderr, "inflate:         end of block\n"));
	            state.mode = TYPE;
	            break top;
	          } else {
	            strm.msg = 'invalid literal/length code';
	            state.mode = BAD;
	            break top;
	          }

	      break; // need to emulate goto via "continue"
	    }
	  } while (_in < last && _out < end);

	  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
	  len = bits >> 3;
	  _in -= len;
	  bits -= len << 3;
	  hold &= (1 << bits) - 1;

	  /* update state and return */
	  strm.next_in = _in;
	  strm.next_out = _out;
	  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
	  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
	  state.hold = hold;
	  state.bits = bits;
	  return;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);

	var MAXBITS = 15;
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	var lbase = [/* Length codes 257..285 base */
	3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];

	var lext = [/* Length codes 257..285 extra */
	16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];

	var dbase = [/* Distance codes 0..29 base */
	1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];

	var dext = [/* Distance codes 0..29 extra */
	16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];

	module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
	  var bits = opts.bits;
	  //here = opts.here; /* table entry for duplication */

	  var len = 0; /* a code's length in bits */
	  var sym = 0; /* index of code symbols */
	  var min = 0,
	      max = 0; /* minimum and maximum code lengths */
	  var root = 0; /* number of index bits for root table */
	  var curr = 0; /* number of index bits for current table */
	  var drop = 0; /* code bits to drop for sub-table */
	  var left = 0; /* number of prefix codes available */
	  var used = 0; /* code entries in table used */
	  var huff = 0; /* Huffman code */
	  var incr; /* for incrementing code, index */
	  var fill; /* index for replicating entries */
	  var low; /* low bits for current root entry */
	  var mask; /* mask for low root bits */
	  var next; /* next available space in table */
	  var base = null; /* base value table to use */
	  var base_index = 0;
	  //  var shoextra;    /* extra bits table to use */
	  var end; /* use base and extra for symbol > end */
	  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
	  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
	  var extra = null;
	  var extra_index = 0;

	  var here_bits, here_op, here_val;

	  /*
	   Process a set of code lengths to create a canonical Huffman code.  The
	   code lengths are lens[0..codes-1].  Each length corresponds to the
	   symbols 0..codes-1.  The Huffman code is generated by first sorting the
	   symbols by length from short to long, and retaining the symbol order
	   for codes with equal lengths.  Then the code starts with all zero bits
	   for the first code of the shortest length, and the codes are integer
	   increments for the same length, and zeros are appended as the length
	   increases.  For the deflate format, these bits are stored backwards
	   from their more natural integer increment ordering, and so when the
	   decoding tables are built in the large loop below, the integer codes
	   are incremented backwards.
	    This routine assumes, but does not check, that all of the entries in
	   lens[] are in the range 0..MAXBITS.  The caller must assure this.
	   1..MAXBITS is interpreted as that code length.  zero means that that
	   symbol does not occur in this code.
	    The codes are sorted by computing a count of codes for each length,
	   creating from that a table of starting indices for each length in the
	   sorted table, and then entering the symbols in order in the sorted
	   table.  The sorted table is work[], with that space being provided by
	   the caller.
	    The length counts are used for other purposes as well, i.e. finding
	   the minimum and maximum length codes, determining if there are any
	   codes at all, checking for a valid set of lengths, and looking ahead
	   at length counts to determine sub-table sizes when building the
	   decoding tables.
	   */

	  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
	  for (len = 0; len <= MAXBITS; len++) {
	    count[len] = 0;
	  }
	  for (sym = 0; sym < codes; sym++) {
	    count[lens[lens_index + sym]]++;
	  }

	  /* bound code lengths, force root to be within code lengths */
	  root = bits;
	  for (max = MAXBITS; max >= 1; max--) {
	    if (count[max] !== 0) {
	      break;
	    }
	  }
	  if (root > max) {
	    root = max;
	  }
	  if (max === 0) {
	    /* no symbols to code at all */
	    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
	    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
	    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
	    table[table_index++] = 1 << 24 | 64 << 16 | 0;

	    //table.op[opts.table_index] = 64;
	    //table.bits[opts.table_index] = 1;
	    //table.val[opts.table_index++] = 0;
	    table[table_index++] = 1 << 24 | 64 << 16 | 0;

	    opts.bits = 1;
	    return 0; /* no symbols, but wait for decoding to report error */
	  }
	  for (min = 1; min < max; min++) {
	    if (count[min] !== 0) {
	      break;
	    }
	  }
	  if (root < min) {
	    root = min;
	  }

	  /* check for an over-subscribed or incomplete set of lengths */
	  left = 1;
	  for (len = 1; len <= MAXBITS; len++) {
	    left <<= 1;
	    left -= count[len];
	    if (left < 0) {
	      return -1;
	    } /* over-subscribed */
	  }
	  if (left > 0 && (type === CODES || max !== 1)) {
	    return -1; /* incomplete set */
	  }

	  /* generate offsets into symbol table for each length for sorting */
	  offs[1] = 0;
	  for (len = 1; len < MAXBITS; len++) {
	    offs[len + 1] = offs[len] + count[len];
	  }

	  /* sort symbols by length, by symbol order within each length */
	  for (sym = 0; sym < codes; sym++) {
	    if (lens[lens_index + sym] !== 0) {
	      work[offs[lens[lens_index + sym]]++] = sym;
	    }
	  }

	  /*
	   Create and fill in decoding tables.  In this loop, the table being
	   filled is at next and has curr index bits.  The code being used is huff
	   with length len.  That code is converted to an index by dropping drop
	   bits off of the bottom.  For codes where len is less than drop + curr,
	   those top drop + curr - len bits are incremented through all values to
	   fill the table with replicated entries.
	    root is the number of index bits for the root table.  When len exceeds
	   root, sub-tables are created pointed to by the root entry with an index
	   of the low root bits of huff.  This is saved in low to check for when a
	   new sub-table should be started.  drop is zero when the root table is
	   being filled, and drop is root when sub-tables are being filled.
	    When a new sub-table is needed, it is necessary to look ahead in the
	   code lengths to determine what size sub-table is needed.  The length
	   counts are used for this, and so count[] is decremented as codes are
	   entered in the tables.
	    used keeps track of how many table entries have been allocated from the
	   provided *table space.  It is checked for LENS and DIST tables against
	   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
	   the initial root table size constants.  See the comments in inftrees.h
	   for more information.
	    sym increments through all symbols, and the loop terminates when
	   all codes of length max, i.e. all codes, have been processed.  This
	   routine permits incomplete codes, so another loop after this one fills
	   in the rest of the decoding tables with invalid code markers.
	   */

	  /* set up for code type */
	  // poor man optimization - use if-else instead of switch,
	  // to avoid deopts in old v8
	  if (type === CODES) {
	    base = extra = work; /* dummy value--not used */
	    end = 19;
	  } else if (type === LENS) {
	    base = lbase;
	    base_index -= 257;
	    extra = lext;
	    extra_index -= 257;
	    end = 256;
	  } else {
	    /* DISTS */
	    base = dbase;
	    extra = dext;
	    end = -1;
	  }

	  /* initialize opts for loop */
	  huff = 0; /* starting code */
	  sym = 0; /* starting code symbol */
	  len = min; /* starting code length */
	  next = table_index; /* current table to fill in */
	  curr = root; /* current table index bits */
	  drop = 0; /* current bits to drop from code for index */
	  low = -1; /* trigger new sub-table when len > root */
	  used = 1 << root; /* use root table entries */
	  mask = used - 1; /* mask for comparing low */

	  /* check available table space */
	  if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
	    return 1;
	  }

	  var i = 0;
	  /* process all codes and make table entries */
	  for (;;) {
	    i++;
	    /* create table entry */
	    here_bits = len - drop;
	    if (work[sym] < end) {
	      here_op = 0;
	      here_val = work[sym];
	    } else if (work[sym] > end) {
	      here_op = extra[extra_index + work[sym]];
	      here_val = base[base_index + work[sym]];
	    } else {
	      here_op = 32 + 64; /* end of block */
	      here_val = 0;
	    }

	    /* replicate for those indices with low len bits equal to huff */
	    incr = 1 << len - drop;
	    fill = 1 << curr;
	    min = fill; /* save offset to next table */
	    do {
	      fill -= incr;
	      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
	    } while (fill !== 0);

	    /* backwards increment the len-bit code huff */
	    incr = 1 << len - 1;
	    while (huff & incr) {
	      incr >>= 1;
	    }
	    if (incr !== 0) {
	      huff &= incr - 1;
	      huff += incr;
	    } else {
	      huff = 0;
	    }

	    /* go to next symbol, update count, len */
	    sym++;
	    if (--count[len] === 0) {
	      if (len === max) {
	        break;
	      }
	      len = lens[lens_index + work[sym]];
	    }

	    /* create new sub-table if needed */
	    if (len > root && (huff & mask) !== low) {
	      /* if first time, transition to sub-tables */
	      if (drop === 0) {
	        drop = root;
	      }

	      /* increment past last table */
	      next += min; /* here min is 1 << curr */

	      /* determine length of next table */
	      curr = len - drop;
	      left = 1 << curr;
	      while (curr + drop < max) {
	        left -= count[curr + drop];
	        if (left <= 0) {
	          break;
	        }
	        curr++;
	        left <<= 1;
	      }

	      /* check for enough space */
	      used += 1 << curr;
	      if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
	        return 1;
	      }

	      /* point entry in root table to sub-table */
	      low = huff & mask;
	      /*table.op[low] = curr;
	      table.bits[low] = root;
	      table.val[low] = next - opts.table_index;*/
	      table[low] = root << 24 | curr << 16 | next - table_index | 0;
	    }
	  }

	  /* fill in remaining table entry if code is incomplete (guaranteed to have
	   at most one remaining entry, since if the code is incomplete, the
	   maximum code length that was allowed to get this far is one bit) */
	  if (huff !== 0) {
	    //table.op[next + huff] = 64;            /* invalid code marker */
	    //table.bits[next + huff] = len - drop;
	    //table.val[next + huff] = 0;
	    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
	  }

	  /* set return parameters */
	  //opts.table_index += used;
	  opts.bits = root;
	  return 0;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {

	  /* Allowed flush values; see deflate() and inflate() below for details */
	  Z_NO_FLUSH: 0,
	  Z_PARTIAL_FLUSH: 1,
	  Z_SYNC_FLUSH: 2,
	  Z_FULL_FLUSH: 3,
	  Z_FINISH: 4,
	  Z_BLOCK: 5,
	  Z_TREES: 6,

	  /* Return codes for the compression/decompression functions. Negative values
	  * are errors, positive values are used for special but normal events.
	  */
	  Z_OK: 0,
	  Z_STREAM_END: 1,
	  Z_NEED_DICT: 2,
	  Z_ERRNO: -1,
	  Z_STREAM_ERROR: -2,
	  Z_DATA_ERROR: -3,
	  //Z_MEM_ERROR:     -4,
	  Z_BUF_ERROR: -5,
	  //Z_VERSION_ERROR: -6,

	  /* compression levels */
	  Z_NO_COMPRESSION: 0,
	  Z_BEST_SPEED: 1,
	  Z_BEST_COMPRESSION: 9,
	  Z_DEFAULT_COMPRESSION: -1,

	  Z_FILTERED: 1,
	  Z_HUFFMAN_ONLY: 2,
	  Z_RLE: 3,
	  Z_FIXED: 4,
	  Z_DEFAULT_STRATEGY: 0,

	  /* Possible values of the data_type field (though see inflate()) */
	  Z_BINARY: 0,
	  Z_TEXT: 1,
	  //Z_ASCII:                1, // = Z_TEXT (deprecated)
	  Z_UNKNOWN: 2,

	  /* The deflate compression method */
	  Z_DEFLATED: 8
	  //Z_NULL:                 null // Use -1 or null inline, depending on var type
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	function GZheader() {
	  /* true if compressed data believed to be text */
	  this.text = 0;
	  /* modification time */
	  this.time = 0;
	  /* extra flags (not used when writing a gzip file) */
	  this.xflags = 0;
	  /* operating system */
	  this.os = 0;
	  /* pointer to extra field or Z_NULL if none */
	  this.extra = null;
	  /* extra field length (valid if extra != Z_NULL) */
	  this.extra_len = 0; // Actually, we don't need it in JS,
	  // but leave for few code modifications

	  //
	  // Setup limits is not necessary because in js we should not preallocate memory
	  // for inflate use constant limit in 65536 bytes
	  //

	  /* space at extra (only when reading header) */
	  // this.extra_max  = 0;
	  /* pointer to zero-terminated file name or Z_NULL */
	  this.name = '';
	  /* space at name (only when reading header) */
	  // this.name_max   = 0;
	  /* pointer to zero-terminated comment or Z_NULL */
	  this.comment = '';
	  /* space at comment (only when reading header) */
	  // this.comm_max   = 0;
	  /* true if there was or will be a header crc */
	  this.hcrc = 0;
	  /* true when done reading gzip header (not used when writing a gzip file) */
	  this.done = false;
	}

	module.exports = GZheader;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Pako = __webpack_require__(11);

	var PixelData = (function () {
	    function PixelData(data, options) {
	        _classCallCheck(this, PixelData);

	        this.width = this.height = 0;

	        options.deflated ? this.setDeflatedData(data) // did we receive the data deflated? first 4 bytes will be width+height
	        : this.setData(data, options.width, options.height); // we received raw data, need width+height
	    }

	    /*
	        @public
	        return a new resized pixel array
	     */

	    _createClass(PixelData, [{
	        key: "resize",
	        value: function resize(newWidth, newHeight) {
	            var stepX = this.width / newWidth,
	                // take a sample every stepX pixels
	            stepY = this.height / newHeight; // no bilinear interpolation (...yet!)
	            var cx,
	                // current X. Since step{X,Y} will be floats, we need to floor them every time
	            cyi,
	                // current y index. We hoist it instead of going 'cy * w + x' we can then do 'cyi + x'
	            ci = 0,
	                // current pixel index
	            coi,
	                // current old pixel index. instead of creating a new variable each iteration... we hoist it
	            _floor = Math.floor,
	                // shortcut to save some scoping. Premature optimization much...
	            data = new Uint8Array(4 * newWidth * newHeight);
	            for (var y = 0, h = this.height, w = this.width; y < h; y += stepY) {
	                cyi = _floor(y) * w;
	                for (var x = 0; x < w; x += stepX, ci += 4) {
	                    coi = (cyi + _floor(x)) * 4; // every original pixel has 4 bytes...
	                    data[ci + 0] = this.data[coi + 0]; // r
	                    data[ci + 1] = this.data[coi + 1]; // g
	                    data[ci + 2] = this.data[coi + 2]; // b
	                    data[ci + 3] = 255; // a (255 = opaque)
	                }
	            }
	            return new PixelData(data, { width: newWidth, height: newHeight });
	        }

	        /*
	            @public
	            set the raw pixel data
	         */
	    }, {
	        key: "setData",
	        value: function setData(data, width, height) {
	            this.data = data;
	            this.width = width;
	            this.height = height;
	        }

	        /*
	            @public
	            set the zlib deflated 24 bits Uint8Array, convert it into 32bits in the meanwhile
	         */
	    }, {
	        key: "setDeflatedData",
	        value: function setDeflatedData(data) {
	            data = Pako.inflate(data);
	            var width = (data[0] << 8) + data[1];
	            var height = (data[2] << 8) + data[3];
	            var newData = new Uint8Array(4 * width * height);
	            for (var iter1 = 0, iter2 = 4, end = 4 * width * height; iter1 < end; iter1 += 4, iter2 += 3) {
	                newData[iter1 + 0] = data[iter2 + 0];
	                newData[iter1 + 1] = data[iter2 + 1];
	                newData[iter1 + 2] = data[iter2 + 2];
	                newData[iter1 + 3] = 255;
	            }
	            this.setData(newData, width, height);
	        }

	        /*
	         @public
	         return a zlib deflated 24 bits Uint8Array (we skip the alpha channel for now)
	         the first 4 bytes of the array are width(2bytes) and height(2bytes)
	         max width and height of 65535
	         */
	    }, {
	        key: "getDeflatedData",
	        value: function getDeflatedData() {
	            // first we convert it to 24bits from 32 bits
	            // the first 4 bytes of the returned
	            var newData = new Uint8Array(3 * this.width * this.height + 4),
	                data = this.data;

	            newData[0] = this.width >> 8 & 255;
	            newData[1] = this.width & 255;
	            newData[2] = this.height >> 8 & 255;
	            newData[3] = this.height & 255;

	            for (var iter1 = 0, iter2 = 4, end = 4 * this.width * this.height; iter1 < end; iter1 += 4, iter2 += 3) {
	                newData[iter2 + 0] = data[iter1 + 0];
	                newData[iter2 + 1] = data[iter1 + 1];
	                newData[iter2 + 2] = data[iter1 + 2];
	            }
	            return Pako.deflate(newData);
	        }
	    }]);

	    return PixelData;
	})();

	module.exports = PixelData;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var THREE = __webpack_require__(3);
	/**
	 * @author Eberhard Graether / http://egraether.com/
	 * @author Mark Lundin 	/ http://mark-lundin.com
	 * @author Simone Manini / http://daron1337.github.io
	 * @author Luca Antiga 	/ http://lantiga.github.io
	 */

	var TrackballControls = function TrackballControls(object, domElement) {

	        var _this = this;
	        var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

	        this.object = object;
	        this.domElement = domElement !== undefined ? domElement : document;

	        // API

	        this.enabled = true;

	        this.screen = { left: 0, top: 0, width: 0, height: 0 };

	        this.rotateSpeed = 1.0;
	        this.zoomSpeed = 1.2;
	        this.panSpeed = 0.3;

	        this.noRotate = false;
	        this.noZoom = false;
	        this.noPan = false;

	        this.staticMoving = false;
	        this.dynamicDampingFactor = 0.2;

	        this.minDistance = 0;
	        this.maxDistance = Infinity;

	        this.keys = [65 /*A*/, 83 /*S*/, 68 /*D*/];

	        // internals

	        this.target = new THREE.Vector3();

	        var EPS = 0.000001;

	        var lastPosition = new THREE.Vector3();

	        var _state = STATE.NONE,
	            _prevState = STATE.NONE,
	            _eye = new THREE.Vector3(),
	            _movePrev = new THREE.Vector2(),
	            _moveCurr = new THREE.Vector2(),
	            _lastAxis = new THREE.Vector3(),
	            _lastAngle = 0,
	            _zoomStart = new THREE.Vector2(),
	            _zoomEnd = new THREE.Vector2(),
	            _touchZoomDistanceStart = 0,
	            _touchZoomDistanceEnd = 0,
	            _panStart = new THREE.Vector2(),
	            _panEnd = new THREE.Vector2();

	        // for reset

	        this.target0 = this.target.clone();
	        this.position0 = this.object.position.clone();
	        this.up0 = this.object.up.clone();

	        // events

	        var changeEvent = { type: 'change' };
	        var startEvent = { type: 'start' };
	        var endEvent = { type: 'end' };

	        // methods

	        this.handleResize = function () {

	                if (this.domElement === document) {

	                        this.screen.left = 0;
	                        this.screen.top = 0;
	                        this.screen.width = window.innerWidth;
	                        this.screen.height = window.innerHeight;
	                } else {

	                        var box = this.domElement.getBoundingClientRect();
	                        // adjustments come from similar code in the jquery offset() function
	                        var d = this.domElement.ownerDocument.documentElement;
	                        this.screen.left = box.left + window.pageXOffset - d.clientLeft;
	                        this.screen.top = box.top + window.pageYOffset - d.clientTop;
	                        this.screen.width = box.width;
	                        this.screen.height = box.height;
	                }
	        };

	        this.handleEvent = function (event) {

	                if (typeof this[event.type] == 'function') {

	                        this[event.type](event);
	                }
	        };

	        var getMouseOnScreen = (function () {

	                var vector = new THREE.Vector2();

	                return function getMouseOnScreen(pageX, pageY) {

	                        vector.set((pageX - _this.screen.left) / _this.screen.width, (pageY - _this.screen.top) / _this.screen.height);

	                        return vector;
	                };
	        })();

	        var getMouseOnCircle = (function () {

	                var vector = new THREE.Vector2();

	                return function getMouseOnCircle(pageX, pageY) {

	                        vector.set((pageX - _this.screen.width * 0.5 - _this.screen.left) / (_this.screen.width * 0.5), (_this.screen.height + 2 * (_this.screen.top - pageY)) / _this.screen.width);

	                        // screen.width intentional
	                        return vector;
	                };
	        })();

	        this.rotateCamera = (function () {

	                var axis = new THREE.Vector3(),
	                    quaternion = new THREE.Quaternion(),
	                    eyeDirection = new THREE.Vector3(),
	                    objectUpDirection = new THREE.Vector3(),
	                    objectSidewaysDirection = new THREE.Vector3(),
	                    moveDirection = new THREE.Vector3(),
	                    angle;

	                return function rotateCamera() {

	                        moveDirection.set(_moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0);
	                        angle = moveDirection.length();

	                        if (angle) {

	                                _eye.copy(_this.object.position).sub(_this.target);

	                                eyeDirection.copy(_eye).normalize();
	                                objectUpDirection.copy(_this.object.up).normalize();
	                                objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();

	                                objectUpDirection.setLength(_moveCurr.y - _movePrev.y);
	                                objectSidewaysDirection.setLength(_moveCurr.x - _movePrev.x);

	                                moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));

	                                axis.crossVectors(moveDirection, _eye).normalize();

	                                angle *= _this.rotateSpeed;
	                                quaternion.setFromAxisAngle(axis, angle);

	                                _eye.applyQuaternion(quaternion);
	                                _this.object.up.applyQuaternion(quaternion);

	                                _lastAxis.copy(axis);
	                                _lastAngle = angle;
	                        } else if (!_this.staticMoving && _lastAngle) {

	                                _lastAngle *= Math.sqrt(1.0 - _this.dynamicDampingFactor);
	                                _eye.copy(_this.object.position).sub(_this.target);
	                                quaternion.setFromAxisAngle(_lastAxis, _lastAngle);
	                                _eye.applyQuaternion(quaternion);
	                                _this.object.up.applyQuaternion(quaternion);
	                        }

	                        _movePrev.copy(_moveCurr);
	                };
	        })();

	        this.zoomCamera = function () {

	                var factor;

	                if (_state === STATE.TOUCH_ZOOM_PAN) {

	                        factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
	                        _touchZoomDistanceStart = _touchZoomDistanceEnd;
	                        _eye.multiplyScalar(factor);
	                } else {

	                        factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * _this.zoomSpeed;

	                        if (factor !== 1.0 && factor > 0.0) {

	                                _eye.multiplyScalar(factor);

	                                if (_this.staticMoving) {

	                                        _zoomStart.copy(_zoomEnd);
	                                } else {

	                                        _zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
	                                }
	                        }
	                }
	        };

	        this.panCamera = (function () {

	                var mouseChange = new THREE.Vector2(),
	                    objectUp = new THREE.Vector3(),
	                    pan = new THREE.Vector3();

	                return function panCamera() {

	                        mouseChange.copy(_panEnd).sub(_panStart);

	                        if (mouseChange.lengthSq()) {

	                                mouseChange.multiplyScalar(_eye.length() * _this.panSpeed);

	                                pan.copy(_eye).cross(_this.object.up).setLength(mouseChange.x);
	                                pan.add(objectUp.copy(_this.object.up).setLength(mouseChange.y));

	                                _this.object.position.add(pan);
	                                _this.target.add(pan);

	                                if (_this.staticMoving) {

	                                        _panStart.copy(_panEnd);
	                                } else {

	                                        _panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
	                                }
	                        }
	                };
	        })();

	        this.checkDistances = function () {

	                if (!_this.noZoom || !_this.noPan) {

	                        if (_eye.lengthSq() > _this.maxDistance * _this.maxDistance) {

	                                _this.object.position.addVectors(_this.target, _eye.setLength(_this.maxDistance));
	                                _zoomStart.copy(_zoomEnd);
	                        }

	                        if (_eye.lengthSq() < _this.minDistance * _this.minDistance) {

	                                _this.object.position.addVectors(_this.target, _eye.setLength(_this.minDistance));
	                                _zoomStart.copy(_zoomEnd);
	                        }
	                }
	        };

	        this.update = function () {

	                _eye.subVectors(_this.object.position, _this.target);

	                if (!_this.noRotate) {

	                        _this.rotateCamera();
	                }

	                if (!_this.noZoom) {

	                        _this.zoomCamera();
	                }

	                if (!_this.noPan) {

	                        _this.panCamera();
	                }

	                _this.object.position.addVectors(_this.target, _eye);

	                _this.checkDistances();

	                _this.object.lookAt(_this.target);

	                if (lastPosition.distanceToSquared(_this.object.position) > EPS) {

	                        _this.dispatchEvent(changeEvent);

	                        lastPosition.copy(_this.object.position);
	                }
	        };

	        this.reset = function () {

	                _state = STATE.NONE;
	                _prevState = STATE.NONE;

	                _this.target.copy(_this.target0);
	                _this.object.position.copy(_this.position0);
	                _this.object.up.copy(_this.up0);

	                _eye.subVectors(_this.object.position, _this.target);

	                _this.object.lookAt(_this.target);

	                _this.dispatchEvent(changeEvent);

	                lastPosition.copy(_this.object.position);
	        };

	        // listeners

	        function keydown(event) {

	                if (_this.enabled === false) return;

	                window.removeEventListener('keydown', keydown);

	                _prevState = _state;

	                if (_state !== STATE.NONE) {

	                        return;
	                } else if (event.keyCode === _this.keys[STATE.ROTATE] && !_this.noRotate) {

	                        _state = STATE.ROTATE;
	                } else if (event.keyCode === _this.keys[STATE.ZOOM] && !_this.noZoom) {

	                        _state = STATE.ZOOM;
	                } else if (event.keyCode === _this.keys[STATE.PAN] && !_this.noPan) {

	                        _state = STATE.PAN;
	                }
	        }

	        function keyup(event) {

	                if (_this.enabled === false) return;

	                _state = _prevState;

	                window.addEventListener('keydown', keydown, false);
	        }

	        function mousedown(event) {

	                if (_this.enabled === false) return;

	                event.preventDefault();
	                event.stopPropagation();

	                if (_state === STATE.NONE) {

	                        _state = event.button;
	                }

	                if (_state === STATE.ROTATE && !_this.noRotate) {

	                        _moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
	                        _movePrev.copy(_moveCurr);
	                } else if (_state === STATE.ZOOM && !_this.noZoom) {

	                        _zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));
	                        _zoomEnd.copy(_zoomStart);
	                } else if (_state === STATE.PAN && !_this.noPan) {

	                        _panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
	                        _panEnd.copy(_panStart);
	                }

	                document.addEventListener('mousemove', mousemove, false);
	                document.addEventListener('mouseup', mouseup, false);

	                _this.dispatchEvent(startEvent);
	        }

	        function mousemove(event) {

	                if (_this.enabled === false) return;

	                event.preventDefault();
	                event.stopPropagation();

	                if (_state === STATE.ROTATE && !_this.noRotate) {

	                        _movePrev.copy(_moveCurr);
	                        _moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
	                } else if (_state === STATE.ZOOM && !_this.noZoom) {

	                        _zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
	                } else if (_state === STATE.PAN && !_this.noPan) {

	                        _panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
	                }
	        }

	        function mouseup(event) {

	                if (_this.enabled === false) return;

	                event.preventDefault();
	                event.stopPropagation();

	                _state = STATE.NONE;

	                document.removeEventListener('mousemove', mousemove);
	                document.removeEventListener('mouseup', mouseup);
	                _this.dispatchEvent(endEvent);
	        }

	        function mousewheel(event) {

	                if (_this.enabled === false) return;

	                event.preventDefault();
	                event.stopPropagation();

	                var delta = 0;

	                if (event.wheelDelta) {

	                        // WebKit / Opera / Explorer 9

	                        delta = event.wheelDelta / 40;
	                } else if (event.detail) {

	                        // Firefox

	                        delta = -event.detail / 3;
	                }

	                _zoomStart.y += delta * 0.01;
	                _this.dispatchEvent(startEvent);
	                _this.dispatchEvent(endEvent);
	        }

	        function touchstart(event) {

	                if (_this.enabled === false) return;

	                switch (event.touches.length) {

	                        case 1:
	                                _state = STATE.TOUCH_ROTATE;
	                                _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
	                                _movePrev.copy(_moveCurr);
	                                break;

	                        case 2:
	                                _state = STATE.TOUCH_ZOOM_PAN;
	                                var dx = event.touches[0].pageX - event.touches[1].pageX;
	                                var dy = event.touches[0].pageY - event.touches[1].pageY;
	                                _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

	                                var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	                                var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	                                _panStart.copy(getMouseOnScreen(x, y));
	                                _panEnd.copy(_panStart);
	                                break;

	                        default:
	                                _state = STATE.NONE;

	                }
	                _this.dispatchEvent(startEvent);
	        }

	        function touchmove(event) {

	                if (_this.enabled === false) return;

	                event.preventDefault();
	                event.stopPropagation();

	                switch (event.touches.length) {

	                        case 1:
	                                _movePrev.copy(_moveCurr);
	                                _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
	                                break;

	                        case 2:
	                                var dx = event.touches[0].pageX - event.touches[1].pageX;
	                                var dy = event.touches[0].pageY - event.touches[1].pageY;
	                                _touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

	                                var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	                                var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	                                _panEnd.copy(getMouseOnScreen(x, y));
	                                break;

	                        default:
	                                _state = STATE.NONE;

	                }
	        }

	        function touchend(event) {

	                if (_this.enabled === false) return;

	                switch (event.touches.length) {

	                        case 1:
	                                _movePrev.copy(_moveCurr);
	                                _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
	                                break;

	                        case 2:
	                                _touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

	                                var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	                                var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	                                _panEnd.copy(getMouseOnScreen(x, y));
	                                _panStart.copy(_panEnd);
	                                break;

	                }

	                _state = STATE.NONE;
	                _this.dispatchEvent(endEvent);
	        }

	        function contextmenu(event) {

	                event.preventDefault();
	        }

	        this.dispose = function () {

	                this.domElement.removeEventListener('contextmenu', contextmenu, false);
	                this.domElement.removeEventListener('mousedown', mousedown, false);
	                this.domElement.removeEventListener('mousewheel', mousewheel, false);
	                this.domElement.removeEventListener('DOMMouseScroll', mousewheel, false); // firefox

	                this.domElement.removeEventListener('touchstart', touchstart, false);
	                this.domElement.removeEventListener('touchend', touchend, false);
	                this.domElement.removeEventListener('touchmove', touchmove, false);

	                document.removeEventListener('mousemove', mousemove, false);
	                document.removeEventListener('mouseup', mouseup, false);

	                window.removeEventListener('keydown', keydown, false);
	                window.removeEventListener('keyup', keyup, false);
	        };

	        this.domElement.addEventListener('contextmenu', contextmenu, false);
	        this.domElement.addEventListener('mousedown', mousedown, false);
	        this.domElement.addEventListener('mousewheel', mousewheel, false);
	        this.domElement.addEventListener('DOMMouseScroll', mousewheel, false); // firefox

	        this.domElement.addEventListener('touchstart', touchstart, false);
	        this.domElement.addEventListener('touchend', touchend, false);
	        this.domElement.addEventListener('touchmove', touchmove, false);

	        window.addEventListener('keydown', keydown, false);
	        window.addEventListener('keyup', keyup, false);

	        this.handleResize();

	        // force an update at start
	        this.update();
	};

	TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
	TrackballControls.prototype.constructor = TrackballControls;
	module.exports = TrackballControls;

/***/ }
/******/ ]);
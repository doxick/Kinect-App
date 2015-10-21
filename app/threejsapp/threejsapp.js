"use strict";
var Three = require('three'),
    BaseApp = require('../baseapp/baseapp');

class ThreejsApp extends BaseApp
{
    constructor(container, width, height)
    {
        super();
        this.rootScene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(90, width / height, 0.1, 1000 * 1000);
        this.camera.position.z = 100;
        var renderer = this.renderer = new Three.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.appendChild( renderer.domElement );

        this._onWindowResize = this._onWindowResize.bind(this);
        this._bindEvents();
    }
    beforeUpdate()
    {

    }
    update()
    {

    }
    afterUpdate()
    {
        this.render();
    }
    onBodyData(bodyFrame)
    {

    }
    onColorData(colorFrame)
    {

    }
    render()
    {
        this.camera.lookAt(new Three.Vector3());
        this.renderer.render(this.rootScene, this.camera);
    }
    stop()
    {
        super.stop();
        this._unbinedEvents();
    }

    _bindEvents()
    {
        window.addEventListener('resize',this._onWindowResize, false);
    }
    _unbinedEvents()
    {
        window.removeEventListener('resize', this._onWindowResize, false);
    }
    _onWindowResize()
    {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
    _handleMessage(msg)
    {
        super._handleMessage(msg);
    }
}

module.exports = BaseApp;
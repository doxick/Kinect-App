"use strict";
var Three = require('three'),
    BodyData = require('../../includes/bodydata/bodydata'),
    PixelData = require('../../includes/pixeldata/pixeldata');

class BaseApp
{
    constructor(container, width, height)
    {
        this.rootScene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(90, width / height, 0.1, 1000 * 1000);
        this.camera.position.z = 100;
        var renderer = this.renderer = new Three.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.appendChild( renderer.domElement );

        this._onWindowResize = this._onWindowResize.bind(this);
        this._bindEvents();
        this._bindSocket();
    }
    run()
    {
        this.animationFrameId = requestAnimationFrame(this._update.bind(this));
    }
    _update()
    {
        this.beforeUpdate();
        this.update();
        this.afterUpdate();
        this.render();
        this.animationFrameId = requestAnimationFrame(this._update.bind(this));
    }
    beforeUpdate()
    {

    }
    update()
    {

    }
    afterUpdate()
    {

    }
    onBodyData(bodyFrame)
    {
        if (bodyFrame.bodies.length) {
            console.log(bodyFrame);
            this.onBodyData = function () {
            };
        }
        this.testing = 1;
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
        cancelAnimationFrame(this.animationFrameId);
        this._unbinedEvents();
        this._unbindSocket();
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

    _bindSocket()
    {
        this.websocket = new WebSocket('ws://localhost:1234/');
        this.websocket.onmessage = this._handleMessage.bind(this);
    }
    _handleMessage(msg)
    {
        var packet = JSON.parse(msg.data);
        switch(packet.type)
        {
            case 'bodyData':
                this._onBodyData(packet.data);
                break;
            case 'colorData':
                this._onColorData(packet.data);
                break;
        }
    }
    _onColorData(data)
    {
        this.onColorData(new PixelData(atob(data),{deflated:true}));
    }
    _onBodyData(data)
    {
        this.onBodyData(new BodyData(data));
    }
    _unbindSocket()
    {
        this.websocket.close();
    }

}

module.exports = BaseApp;
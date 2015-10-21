"use strict";
var BodyData = require('../../includes/bodydata/bodydata'),
    PixelData = require('../../includes/pixeldata/pixeldata');

class BaseApp
{
    constructor()
    {
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

    }
    onColorData(colorFrame)
    {

    }
    stop() {
        cancelAnimationFrame(this.animationFrameId);
        this._unbindSocket();
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
                return this._onBodyData(packet.data);
            case 'colorData':
                return this._onColorData(packet.data);
        }
    }
    _onColorData(data)
    {
        return this.onColorData(new PixelData(atob(data),{deflated:true}));
    }
    _onBodyData(data)
    {
        return this.onBodyData(new BodyData(data));
    }
    _unbindSocket()
    {
        this.websocket.close();
    }

}

module.exports = BaseApp;
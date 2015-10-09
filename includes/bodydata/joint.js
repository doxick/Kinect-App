"use strict";
var Pako = require('pako'),
    Vector2 = require('three').Vector2,
    Vector3 = require('three').Vector3,
    Vector4 = require('three').Vector4;

class Joint {
    constructor(data, options) {
        options = options || {};
        this.position = new Vector3();      // position in a 3d scene, relative to the camera
        this.depth = new Vector2();         // position on a 2d plane, relative to the depth sensor. x * width, y * width
        this.color = new Vector2();         // position on a 2d plane, relative to the color sensor. x * width, y * width
        this.orientation = new Vector4();   // orientation relative to the parent Join.

        options.deflated
            ? this.setDeflatedData(data)
            : this.setData(data);
    }

    setData(data) {
        this.position.set(data.cameraX, data.cameraY, data.cameraZ);
        this.depth.set(data.depthX, data.depthY);
        this.color.set(data.colorX, data.colorY);
        this.orientation.set(data.orientationX, data.orientationY, data.orientationZ, data.orientationW);
    }
    setDeflatedData(data)
    {
        // todo
        console.warn('Joint::setDeflatedData not yet implemented');
    }
    getData()
    {
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
    getDeflatedData()
    {
        console.warn('Joint::getDeflatedData not yet implemented');
    }

}

module.exports = Joint;
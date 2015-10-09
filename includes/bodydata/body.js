"use strict";
var Joint = require('./joint');

class Body {
    constructor(data, options) {
        options = options || {};
        this.jointCount = 0;
        this.trackingId = 0;
        this.leftHandState = 0;
        this.rightHandState = 0;
        this.tracked = false;
        this.joints = [];

        options.deflated
            ? this.setDeflatedData(data)
            : this.setData(data);
    }

    setData(data) {
        this.tracked = data.tracked;
        this.jointCount = this.tracked ? data.joints.length : 0;
        this.trackingId = this.tracked ? data.trackingId : 0;
        this.leftHandState = this.tracked ? data.leftHandState : 0;
        this.rightHandState = this.tracked ? data.rightHandState : 0;
        this.joints = [];
        this.tracked ? data.joints.forEach((joint) => {
            this.joints.push( new Joint(joint) );
        }) : 0;
    }
    getData()
    {
        return {
            tracked: this.tracked,
            jointCount: this.jointCount,
            trackingId: this.trackingId,
            leftHandState: this.leftHandState,
            rightHandState: this.rightHandState,
            joints: this.joints.map((joint) => joint.getData())
        };
    }

    setDeflatedData(data)
    {
        // todo
        console.warn('Body::setDeflatedData not yet implemented');
    }
    getDeflatedData()
    {
        // todo
        console.warn('Body::getDeflatedData not yet implemented');
    }
}

module.exports = Body;
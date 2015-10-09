"use strict";
var JointType = require('./jointtype'),
    HandState = require('./handstate'),
    Body = require('./body');


class BodyData {
    constructor(data, options) {
        options = options || {};

        this.bodies = [];
        options.deflated
            ? this.setDeflatedData(data)    // did we receive the data deflated?
            : this.setData(data); // we received raw data
    }

    setData(data)
    {
        this.bodies = [];
        data.bodies.forEach((body) => {
            if (body.tracked)
                this.bodies.push(new Body(body));
        });
    }
    getData()
    {
        return {
            bodies: this.bodies.map((body)=> body.getData())
        }
    }
    setDeflatedData(data)
    {
        // todo
        console.warn('BodyData::setDeflatedData not yet implemented');
    }
    getDeflatedData()
    {
        // todo
        console.warn('BodyData::getDeflatedData not yet implemented');
    }
};

module.exports = BodyData;
module.exports.jointType = JointType;
module.exports.handState = HandState;
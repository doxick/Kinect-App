/**
 * Created by martijn on 23/10/15.
 */
var BaseApp = require('../baseapp/baseapp'),
    Three = require('three'),
    $ = require('jquery'),
    JointTypes = require('../../includes/bodydata/jointtype'),
    TouchPointers = require('../../includes/kinect-touch-pointer/kinect-touch-pointer');

class TestApp extends BaseApp
{
    constructor(container)
    {
        super();
        this.$container = $(container);
        this.$handLeft = $('<div class="hand hand-left" />');
        this.$handRight = $('<div class="hand hand-right" />');
        this.$container.append(this.$handLeft).append(this.$handRight);
        this.trackingId = false;
        this.touchSimulator;
        this.bodyState = {
            current: false,
            previous: false
        };
        $(function(){
            document.body.addEventListener('handmove',function(event){

                var elem = document.querySelector('.hand.hand-' + event.name);
                elem.style.left = event.screenX + 'px';
                elem.style.top = event.screenY + 'px';
            });
            document.body.addEventListener('handopen',function(event){
                console.log('opened');
                var elem = document.querySelector('.hand.hand-' + event.name);
                elem.style.backgroundColor = 'red';
            });
            document.body.addEventListener('handclosed',function(event){
                console.log('closed', Date.now());
                var elem = document.querySelector('.hand.hand-' + event.name);
                elem.style.backgroundColor = 'black';
            });
        })
    }
    _bindSocket()
    {
        this.websocket = new WebSocket('ws://10.111.100.101:1234/');
        this.websocket.onmessage = this._handleMessage.bind(this);
    }
    onBodyData(bodyData)
    {
        if (bodyData.bodies.length == 0)
            this.trackingId = false;
        bodyData.bodies.forEach(body => {
            if (!body.tracked) return;
            if (this.trackingId != false && this.trackingId != body.trackingId)
                return
            if (this.trackingId == false)
                this.touchSimulator = new TouchPointers(body.trackingId);
            this.trackingId = body.trackingId;

            this.touchSimulator.update(bodyData);
            this.updateBody(body);
        })
    }

    updateBody(body)
    {

    }




}

module.exports = TestApp;
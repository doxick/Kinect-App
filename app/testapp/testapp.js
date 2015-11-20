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
	    this.trackingTimer = false;
	    var _this = this;
        $(function(){
	        ['handmove','handopen','handclose'].forEach(eventName => {
		        document.addEventListener(eventName, function(event){
			        clearTimeout(_this.trackingTimer);
			        _this.trackingTimer = setTimeout(function(){
				        _this.trackingId = false;
			        },2500);
			        _this.trackingId = _this.trackingId || event.trackingId;
			        console.log(_this.trackingId);
		        });
	        });
            document.body.addEventListener('handmove',function(event){
				if (event.trackingId != _this.trackingId) return;
                var elem = document.querySelector('.hand.hand-' + event.which);
                elem.style.left = event.screenX + 'px';
                elem.style.top = event.screenY + 'px';
            });
            document.body.addEventListener('handopen',function(event){
	            console.log('handopen');
	            if (event.trackingId != _this.trackingId) return;
	            var elem = document.querySelector('.hand.hand-' + event.which);
                elem.style.backgroundColor = 'red';
            });
            document.body.addEventListener('handclose',function(event){
	            console.log('handclose');
	            if (event.trackingId != _this.trackingId) return;
	            var elem = document.querySelector('.hand.hand-' + event.which);
                elem.style.backgroundColor = 'black';
            });
        });
    }
    _bindSocket()
    {
        this.websocket = new WebSocket('ws://10.111.100.96:1234/');
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
var Vector2 = require('three').Vector2,
    Vector3 = require('three').Vector3,
    HandState = require('../bodydata/handstate'),
    JointType = require('../bodydata/jointtype');


var temp3 = new Vector3(),
    lerpCount = 3;

class KinectTouchPointerState
{
	constructor()
	{
		this.left = {
			screenX: 0,
			screenXHist: [],
			screenY: 0,
			screenYHist: [],
			state: HandState.Unknown,
			hasOpened: false,
			hasMoved: false,
			hasClosed: false
		}
		this.right = {
			screenXHist: [],
			screenY: 0,
			screenYHist: [],
			state: HandState.Unknown,
			hasOpened: false,
			hasMoved: false,
			hasClosed: false
		}
	}
	setState(which, state)
	{
		var cur = this[which];
		cur.screenXHist.push(state.screenX);
		cur.screenXHist = cur.screenXHist.slice(-lerpCount);
		cur.screenX = cur.screenXHist.reduce((a,b)=>a+b,0) / cur.screenXHist.length;
		cur.screenYHist.push(state.screenY);
		cur.screenYHist = cur.screenYHist.slice(-lerpCount);
		cur.screenY = cur.screenYHist.reduce((a,b)=>a+b,0) / cur.screenYHist.length;

		cur.hasMoved = cur.screenX != state.screenX || cur.screenY != state.screenY;
		cur.hasOpened = state.state == HandState.Open && cur.state != HandState.Open;
		cur.hasClosed = state.state == HandState.Closed && cur.state != HandState.Closed;
		cur.state = state.state;
	}
}

class KinectTouchPointer
{
	constructor(id)
	{
		this.id = id;
		this.states = {};
	}
	update(bodyData)
	{
		var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		bodyData.bodies.forEach((body) => {
			var armLength = this.getArmLength(body),
			    boundingBox = [new Vector2(), new Vector2()],
			    currentState = this._getState(body.trackingId),
			    hand = new Vector2(),
			    pos2 = new Vector2();

			// we are going to project the coordinates on a plane at Z = 1, which simplifies our * (planeZ / DepthZ) calculation to * (1 /  depthZ) = / depthZ



			[['left', JointType.HandLeft, JointType.ShoulderLeft], ['right',JointType.HandRight, JointType.ShoulderRight]].forEach(([name, jointTypeHand, jointTypeShoulder]) => {
				var jntHand = body.joints[jointTypeHand],
				    jntShoulder = body.joints[jointTypeShoulder],
				    armLength = this.getArmLength(body,name) / 1.4;
				boundingBox[0].x = (jntShoulder.position.x - armLength) /  jntShoulder.position.z;
				boundingBox[0].y = (jntShoulder.position.y - armLength) /  jntShoulder.position.z;
				boundingBox[1].x = (jntShoulder.position.x + armLength) /  jntShoulder.position.z;
				boundingBox[1].y = (jntShoulder.position.y + armLength) /  jntShoulder.position.z;
				hand.x = jntHand.position.x / jntHand.position.z;
				hand.y = jntHand.position.y / jntHand.position.z;

				pos2.x = ((hand.x - boundingBox[0].x) / (boundingBox[1].x - boundingBox[0].x)) * screenWidth;// / (screenWidth / screenHeight);
				pos2.y = screenHeight - (((hand.y - boundingBox[0].y) / (boundingBox[1].y - boundingBox[0].y)) * screenHeight);

				currentState.setState(name, {
					screenX: Math.min(screenWidth - 1,Math.max(1,pos2.x)),
					screenY: Math.min(screenHeight - 1,Math.max(1,pos2.y)),
					state: body[name+'HandState']
				});

				var currentHandState = currentState[name];

				this._dispatchEvent({
					screenX: currentHandState.screenX,
					screenY: currentHandState.screenY,
					name: name,
					target: document.elementFromPoint(currentHandState.screenX, currentHandState.screenY) || window,
					tackingId: body.trackingId,
					hasMoved: currentHandState.hasMoved,
					hasHandOpened: currentHandState.hasOpened,
					hasHandClosed: currentHandState.hasClosed
				});
			});
		});

	}
	_cleanUp(bodyData)
	{
		var ids = bodyData.bodies.map(body => body.trackingId);
		this.states.keys().forEach(id => {
			if (! ids.indexOf(id)) return;
			this.states[ids] = null;
			delete this.states[ids];
		})
	}
	_getState(id)
	{
		if (! this.states.hasOwnProperty(id)) {
			this._setState(id,new KinectTouchPointerState());
		}
		return this.states[id];
	}
	_setState(id, state)
	{
		this.states[id] = state;
	}
	_dispatchEvent(event){
		var evt,
		    data = {
			    bubbles: true,
			    cancelable: true
		    };
		[   [event.hasMoved, 'handmove'],
			[event.hasHandOpened,'handopen'],
			[event.hasHandClosed,'handclose']
		].forEach(([hasEvent,eventType])=>{
			if (! hasEvent) return;

			evt = new CustomEvent(eventType, data);
			evt.screenX = event.screenX;
			evt.screenY = event.screenY;
			evt.which = event.name;
			evt.trackingId = this.id;
			event.target.dispatchEvent(evt);
		});

	}
	getArmLength(body,which)
	{
		which = which == 'left'?'Left':'Right';
		// first we calculate the length of the arms
		var spine = body.joints[JointType.SpineShoulder],
		    shoulder = body.joints[JointType['Shoulder'+which]],
		    elbow = body.joints[JointType['Elbow'+which]],
		    hand = body.joints[JointType['Hand'+which]],
		    length3 = 0;
		length3 += temp3.subVectors(spine.position, shoulder.position).length();
		length3 += temp3.subVectors(elbow.position, shoulder.position).length();
		length3 += temp3.subVectors(elbow.position, hand.position).length();
		return length3;
	}
}

module.exports = KinectTouchPointer;
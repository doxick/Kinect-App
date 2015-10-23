var BodyData = require('../bodydata/bodydata'),
    Three = require('three'),
    HandState = require('../bodydata/handstate'),
    JointType = require('../bodydata/jointtype');


var temp2 = new Three.Vector2(),
    temp3 = new Three.Vector3();

class KinectTouchPointer
{
    constructor(id)
    {
        this.id = id;

        this.state = {
            left:
            {
                screenX: 0,
                screenY: 0,
                state: HandState.Unknown
            },
            right:
            {
                screenX: 0,
                screenY: 0,
                state: HandState.Unknown
            }
        }
    }
    update(bodyData)
    {
        var body = bodyData.bodies.filter(body =>  body.trackingId = this.id);
        if (body.length == 0)
            return;
        body = body[0];
        var shoulder3d = this.get3dShoulderLength(body),
            shoulder2d = this.get2dShoulderLength(body),
            ratio = shoulder2d / shoulder3d,
            armLength3 = this.get3dArmLength(body),
            armLength2 = armLength3 * ratio,
            screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            leftHandZ = body.joints[JointType.HandLeft].position.z,
            rightHandZ = body.joints[JointType.HandRight].position.z;

        var midPoint2 = body.joints[JointType.SpineShoulder].color;
        [['left', JointType.HandLeft], ['right',JointType.HandRight]].forEach(([name, jointType]) => {
            var joint = body.joints[jointType],
                pos2 = joint.color.clone();
            pos2.sub(midPoint2).multiplyScalar(joint.position.z * 0.8);
            pos2.x = (0.5 + (pos2.x * (0.8 * screenWidth / screenHeight))) * screenWidth;
            pos2.y = (0.5 + (pos2.y)) * screenHeight;
            var newState = body[name+'HandState'],
                oldState = this.state[name];


            pos2.x = Math.max(0,Math.min(pos2.x,screenWidth));
            pos2.y = Math.max(0,Math.min(pos2.y,screenHeight));
            var evt = {
                screenX: pos2.x,
                screenY: pos2.y,
                name: name,
                target: document.elementFromPoint(pos2.x, pos2.y) || window,
                isMoved: pos2.x != oldState.screenX || pos2.y != oldState.screenY,
                isHandOpen: [HandState.Open, HandState.Unknown].indexOf(newState) >=0 && [HandState.Open, HandState.Unknown].indexOf(oldState.state) == -1,
                isHandClosed: newState == HandState.Closed && oldState.state != HandState.Closed
            };
            oldState.screenX = evt.screenX;
            oldState.screenY = evt.screenY;
            oldState.state = newState;
            this._dispatchEvent(evt);
        });
    }
    _dispatchEvent(event){
        var evt,
            data = {
                bubbles: true,
                cancelable: true
            };
        if (event.isMoved)
        {
            evt = new CustomEvent('handmove', data);
            evt.screenX = event.screenX;
            evt.screenY = event.screenY;
            evt.name = event.name;
            evt.trackingId = this.id;
            event.target.dispatchEvent(evt);
        }
        if (event.isHandOpen){
            evt = new CustomEvent('handopen', data);
            evt.screenX = event.screenX;
            evt.screenY = event.screenY;
            evt.name = event.name;
            evt.trackingId = this.id;
            event.target.dispatchEvent(evt);
        }
        if (event.isHandClosed)
        {
            evt = new CustomEvent('handclosed', data);
            evt.screenX = event.screenX;
            evt.screenY = event.screenY;
            evt.name = event.name;
            evt.trackingId = this.id;
            event.target.dispatchEvent(evt);
        }
    }
    get3dArmLength(body)
    {
        // first we calculate the length of the arms
        var spine = body.joints[JointType.SpineShoulder],
            shoulder = body.joints[JointType.ShoulderRight],
            elbow = body.joints[JointType.ElbowRight],
            hand = body.joints[JointType.HandRight],
            length3 = 0;
        length3 += temp3.subVectors(spine.position, shoulder.position).length();
        length3 += temp3.subVectors(elbow.position, shoulder.position).length();
        length3 += temp3.subVectors(elbow.position, hand.position).length();
        return length3;
    }
    get3dShoulderLength(body)
    {
        var shoulderLeft = body.joints[JointType.ShoulderLeft],
            shoulderRight = body.joints[JointType.ShoulderRight];
        return temp3.subVectors(shoulderLeft.position, shoulderRight.position).length();
    }
    get2dShoulderLength(body)
    {
        var shoulderLeft = body.joints[JointType.ShoulderLeft],
            shoulderRight = body.joints[JointType.ShoulderRight];
        return temp2.subVectors(shoulderLeft.color, shoulderRight.color).length();
    }
}

module.exports = KinectTouchPointer;
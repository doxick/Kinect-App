"use strict";
var Three = require('three'),
    BaseApp = require('../baseapp/baseapp'),
    ThreeTrackballControls = require('./trackballcontrols'),
    HandState = require('../../includes/bodydata/handstate'),
    JointType = require('../../includes/bodydata/jointtype');


/*
    We cache some geometry and materials so we don't have to create them on the fly every iteration
    Saves memory + performance

    OTHERWISE:
        if you remove a mesh from a scene, do not forgot to mesh.geometry.dispose() otherwise it won't be removed.
        If geometry is shared: this will remove it from memory so only remove it from the last mesh.
 */
var SPHERE = new Three.SphereGeometry(2.5, 16, 6);
var MATERIALS = [
    new Three.MeshPhongMaterial( { color: 0xFF0000, specular: 0x009900, shininess: 30, shading: Three.FlatShading } ),
    new Three.MeshPhongMaterial( { color: 0x00FF00, specular: 0x009900, shininess: 30, shading: Three.FlatShading } ),
    new Three.MeshPhongMaterial( { color: 0x0000FF, specular: 0x009900, shininess: 30, shading: Three.FlatShading } ),
    new Three.MeshPhongMaterial( { color: 0x00FFFF, specular: 0x009900, shininess: 30, shading: Three.FlatShading } ),
    new Three.MeshPhongMaterial( { color: 0xFFFF00, specular: 0x009900, shininess: 30, shading: Three.FlatShading } ),
    new Three.MeshPhongMaterial( { color: 0xFF00FF, specular: 0x009900, shininess: 30, shading: Three.FlatShading } )
];
class DemoApp extends BaseApp
{
    constructor(container, width, height)
    {
        super(container, width, height);

        // add some trackball controls
        this.controls = new ThreeTrackballControls( this.camera );
        this.controls.target.set( 0, 0, 0 );

        // add some light to show what's on
        this.rootScene.add ( new Three.AmbientLight( 0xaaaaaa ) );
        // add some shading light sources
        var directionalLight = new Three.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.position.set( 0, 0, 10 );
        this.rootScene.add( directionalLight );

        // just a collection of the skeletons
        this.baseNode = new Three.Object3D();
        this.rootScene.add(this.baseNode);
    }
    onBodyData(bodyData)
    {
        this.baseNode.children.forEach((skeleton) => {
            this.baseNode.remove(skeleton);
        });

        if(bodyData.bodies.length == 0)
            return;

        bodyData.bodies.forEach((body, bodyIdx)=>{

            let skeleton = new Three.Group();
            body.joints.forEach((joint)=>{
                let mesh = new Three.Mesh( SPHERE , MATERIALS[[body.leftHandState,body.rightHandState].indexOf(HandState.Closed) > -1 ? 6 : bodyIdx] );
                mesh.position.set(
                    joint.position.x * 100,
                    joint.position.y * 100,
                    joint.position.z * 10
                );
                skeleton.add(mesh);
            })
            this.baseNode.add(skeleton);
        });
    }
    update()
    {
        this.controls.update();
    }

}

module.exports = DemoApp;
// Module imports 


import * as THREE from '../node_modules/three/build/three.module.js';

import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

const myWorldObj = document.getElementById('myWorld');

// SCENE required 1 of 3
var scene = new THREE.Scene();

scene.background = new THREE.Color(0x361B29);

// Add Light to scene .. REQUIRED for 3D Models

var ambLight = new THREE.AmbientLight(0x101010, 25);
scene.add(ambLight);

var camera = new THREE.PerspectiveCamera(55, myWorldObj.scrollWidth / myWorldObj.scrollHeight, 1, 1000);

camera.position.z = 30;


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(myWorldObj.scrollWidth, myWorldObj.scrollHeight);
myWorldObj.appendChild(renderer.domElement);

let modelObj;

// Load a gltf resource

const loaderObj = new GLTFLoader().setPath('media/mystery/');

loaderObj.load(
    'scene.gltf',
    function (gltf) {
        modelObj = gltf.scene;
        scene.add(modelObj);
        modelObj.position.y = -6;
        modelObj.position.x = 1.5;

    },
    // while loading is processing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called if loading error
    function (error) {
        console.log('An error happened' + error);
    }
);

function controlsRender() {
    renderer.render(scene, camera);
}

let controlsObj = new OrbitControls(camera, myWorldObj);
controlsObj.addEventListener('change', controlsRender);

//Auto LOOP
//Create JS Functtion that auto LOOPS
const animate = function () {
    requestAnimationFrame(animate);

    if (modelObj) {
        modelObj.rotation.y += 0/* 0.001 *//* -0.003 */;
        /* modelObj.position.z += 30; */
    }

    renderer.render(scene, camera);
};
animate();


var stop = document.getElementById("rotate")

stop.onclick = function (){
    console.log('stop btn working');
    modelObj.rotation.y = 0;
}

var rightbtn = document.getElementById("right")

rightbtn.onclick = function () {
    console.log('right btn working');
    modelObj.rotation.y += 1;
}

var leftbtn = document.getElementById("left")

leftbtn.onclick = function () {
    console.log('left btn working');
    modelObj.rotation.y += -1;
}

var zoom = document.getElementById("zoom")

zoom.onclick = function () {
    console.log('zoom btn working');
    camera.position.z += -3;

}

var zoomOut = document.getElementById("zoomout")

zoomOut.onclick = function () {
    console.log('zoomOut btn working');
    camera.position.z += 3;

}

var light = document.getElementById("light")

light.onclick = function () {
    console.log('light btn working');
    var ambLight = new THREE.AmbientLight(0x101010, 5);
    scene.add(ambLight);

    scene.background = new THREE.Color(0xB1D6E6);
}

var dark = document.getElementById("Dark")

dark.onclick = function () {
    console.log('light btn working');
    var ambLight = new THREE.AmbientLight(0x101010, -5);
    scene.add(ambLight);

    scene.background = new THREE.Color(0x361B29);
}

var hang = document.getElementById("hang")

hang.onclick = function () {
    console.log('hang btn working');
    
    var camera = new THREE.PerspectiveCamera(10, myWorldObj.scrollWidth / myWorldObj.scrollHeight, 1, 1000);

    camera.position.z = 0;
    amera.position.x = -30;
    camera.position.y = 40; 

/* Figure out how to make this button work to go to the hanout spot */
}


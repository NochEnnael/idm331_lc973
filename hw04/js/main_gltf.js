// Module imports 


import * as THREE from '../node_modules/three/build/three.module.js';

import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

const myWorldObj = document.getElementById('myWorld');

// SCENE required 1 of 3
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x1C243C);

// Add Light to scene .. REQUIRED for 3D Models

const ambLight = new THREE.AmbientLight(0x101010, 20);
scene.add(ambLight);

const camera = new THREE.PerspectiveCamera(55, myWorldObj.scrollWidth / myWorldObj.scrollHeight, 1, 1000);

camera.position.z= 130;


const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(myWorldObj.scrollWidth, myWorldObj.scrollHeight);
myWorldObj.appendChild(renderer.domElement);

let modelObj; 

// Load a gltf resource

const loaderObj = new GLTFLoader().setPath('media/sleepycity/');

loaderObj.load(
    'scene.gltf',
    function ( gltf ) {
        modelObj = gltf.scene;
        scene.add(modelObj);
        modelObj.position.y = -30;
        modelObj.position.x = -10;
    },
    // while loading is processing
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // called if loading error
    function ( error ) {
        console.log ('An error happened' + error);
    }
);

function controlsRender(){
    renderer.render(scene, camera);
}

let controlsObj = new OrbitControls(camera, myWorldObj);
controlsObj.addEventListener('change', controlsRender);

//Auto LOOP
//Create JS Functtion that auto LOOPS
const animate = function() {
    requestAnimationFrame(animate);

    if(modelObj){
        modelObj.rotation.y += 0;
    }

    renderer.render(scene, camera);
};
animate();
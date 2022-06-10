import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import gsap from 'gsap';
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

// Material
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
});

// Mesh
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)
// let meshes = [];
// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         const mesh = new THREE.Mesh(geometry, material);
//         mesh.position.x = i * 1.1 - 5;
//         mesh.position.y = j * 1.1 - 5;
//         mesh.scale.set(0.1, 0.1, 0.1);
//         scene.add(mesh);
//         meshes.push(mesh.scale);

//     }

// }

let count = 20;

const mesh = new THREE.InstancedMesh(
    geometry,
    material,
    count ** 3
);

let random = new Float32Array(count ** 3);
let depth = new Float32Array(count ** 3);
// 
let transform = new THREE.Object3D();
let ii = 0;

for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
        for (let k = 0; k < count; k++) {
            transform.position.set(i - count / 2, j - count / 2, k - count / 2);
            transform.updateMatrix();
            random[ii] = Math.random();
            mesh.setMatrixAt(ii++, transform.matrix);

        }
    }
}

geometry.setAttribute('random', new THREE.InstancedBufferAttribute(random, 1));
scene.add(mesh);
scene.rotation.y = (53 * Math.PI / 180);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

let t1 = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

// t1.to(meshes, {
//     duration: 1,
//     x: 1,
//     y: 1,
//     z: 1,
//     stagger: {
//         grid: [10, 10],
//         from: 'center',
//         amount: 1.5,
//     }
// });

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Orthographic camera
// const camera = new THREE.OrthographicCamera(-1/2, 1/2, 1/2, -1/2, 0.1, 100)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, -10, 20);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    // Update controls
    controls.update();

    // Get elapsedtime
    const elapsedTime = clock.getElapsedTime();

    // Update uniforms
    material.uniforms.uTime.value = elapsedTime;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
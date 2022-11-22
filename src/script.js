import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// Canvas
const canvas = document.querySelector('canvas.webgl');

const { width, height } = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const catTexture = textureLoader.load('/textures/cat.png');

// Geometry
const geometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = Math.random()*3;
}
geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  map: catTexture,
  transparent: true,
});
material.size = 0.02;
material.sizeAttenuation = true;

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// const cube = new THREE.Mesh(
//   new THREE.SphereGeometry(1),
//   new THREE.MeshBasicMaterial({
//     map: catTexture
//   })
// );
// cube.geometry.setAttribute(
//   'uv2',
//   new THREE.Float32BufferAttribute(cube.geometry.attributes.uv.array, 2)
// );
// scene.add(cube);

// Camera
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 100);
camera.position.set(2,2,2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(width, height);

const clock = new THREE.Clock();

const tick = () => {
  requestAnimationFrame(tick);

  const elapsedTime = clock.getElapsedTime();

  camera.position.y = Math.cos(elapsedTime / 4) + 1.5;
  camera.position.x = Math.cos(elapsedTime / 4) + 1.5;
  camera.position.z = Math.sin(elapsedTime / 4) + 1.5;
  
  renderer.render(scene, camera);

}
tick();
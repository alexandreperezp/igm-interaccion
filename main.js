import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const loader = new THREE.TextureLoader();
material.map = loader.load('images/earthmap.jpg');
material.bumpMap = loader.load('images/earthbump.jpg');
material.bumpScale = 5;
material.specularMap = loader.load('images/earthspecular.jpg');
material.specular = new THREE.Color('grey');
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

var geometry2   = new THREE.SphereGeometry(1.01, 32, 32)
var material2  = new THREE.MeshPhongMaterial({
  side        : THREE.DoubleSide,
  opacity     : 0.8,
  transparent : true,
  depthWrite  : false,
});
material2.map = loader.load('images/fair_clouds_4k.png')
var cloudMesh = new THREE.Mesh(geometry2, material2)
earthMesh.add(cloudMesh)

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 5);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

camera.position.z = 2;

earthMesh.rotation.x = 0.5
// earthMesh.rotation.z -= THREE.MathUtils.degToRad(-40)

function animate() {
	requestAnimationFrame(animate);

	// earthMesh.rotation.x += 0.01;
	earthMesh.rotation.y += 0.003;

	renderer.render(scene, camera);
}

animate();
// Define the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define the material for the car body
var bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

// Load the car model
var loader = new THREE.GLTFLoader();
loader.load('car.glb', function (gltf) {
  // Add the car to the scene
  var car = gltf.scene;
  car.scale.set(0.1, 0.1, 0.1);
  car.position.set(0, -1, 0);
  scene.add(car);

  // Set the material for the car body
  car.traverse(function (node) {
    if (node.isMesh) node.material = bodyMaterial;
  });
});

// Add some lights to the scene
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(5, 5, 5);
camera.add(pointLight);
scene.add(camera);

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    300,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 50;
scene.background = new THREE.Color(0x283655);
var renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvases').appendChild(renderer.domElement);
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 2, 2);
scene.add(directionalLight);

let tubes = Math.floor(Math.random() * 201);
let x = Math.floor(Math.random() * 2);
let moveRight = x >= 0.5 ? true : false;

var geometry = new THREE.TorusKnotGeometry(8, 3, tubes, 15, 18, 15);
var material = new THREE.MeshToonMaterial({color: '#4d648d'});
var knot = new THREE.Mesh(geometry, material);
scene.add(knot);

console.log(moveRight, x);

function render() {
    if(moveRight) {
        knot.rotation.z += 0.005;
        knot.rotation.y -= 0.005;
    }
    else {
        knot.rotation.z -= 0.005;
        knot.rotation.y += 0.005;
    }
    
    
    
    

    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
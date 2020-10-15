// skybox

let scene, camera, renderer;

function init() {
	scene = new THREE.Scene;

	camera = new THREE.PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		1,
		20000);
	camera.position.set(0, 0, 0);

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	let controls = new THREE.OrbitControls(camera, document.body);
	controls.addEventListener('change', renderer);
	controls.minDistance = 500;
	controls.maxDistance = 1500;


	let materialArray = [];
	let texture_ft = new THREE.TextureLoader().load('images/assets/ulukai/corona_ft.png');
	let texture_bk = new THREE.TextureLoader().load('images/assets/ulukai/corona_bk.png');
	let texture_lf = new THREE.TextureLoader().load('images/assets/ulukai/corona_lf.png');
	let texture_rt = new THREE.TextureLoader().load('images/assets/ulukai/corona_rt.png');
	let texture_up = new THREE.TextureLoader().load('images/assets/ulukai/corona_up.png');
	let texture_dn = new THREE.TextureLoader().load('images/assets/ulukai/corona_dn.png');

	materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
	materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
	materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
	materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
	materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
	materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

	for (let i = materialArray.length - 1; i >= 0; i--) {
		materialArray[i].side = THREE.BackSide;
	}

	let skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
	let skybox = new THREE.Mesh(skyboxGeometry, materialArray);
	skybox.rotation.x = Math.PI / 180 * 90;

	scene.add(skybox);

	function animate() {
		requestAnimationFrame(animate);

		renderer.render(scene, camera);
	}

	animate();
}

init();
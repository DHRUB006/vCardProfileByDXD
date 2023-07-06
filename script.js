import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.module.min.js';

class Stage {
	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('game').appendChild(this.renderer.domElement);

		this.camera.position.z = 5;

		this.blocks = [];
		this.init();
	}

	init() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

		for (let i = 0; i < 10; i++) {
			const block = new Block(geometry, material);
			block.position.y = i * 1.1;
			this.blocks.push(block);
			this.scene.add(block);
		}

		this.animate();
	}

	animate() {
		requestAnimationFrame(() => this.animate());

		this.blocks.forEach((block) => {
			block.rotation.x += 0.01;
			block.rotation.y += 0.01;
		});

		this.renderer.render(this.scene, this.camera);
	}
}

class Block extends THREE.Mesh {
	constructor(geometry, material) {
		super(geometry, material);
	}
}

class Game {
	constructor() {
		this.stage = new Stage();
	}
}

new Game();
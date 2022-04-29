import * as THREE from 'three'
import Experience from './Experience.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import gsap from 'gsap'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas
		this.time = this.experience.time
		//// added for passing to ray
		// this.resource = this.experience.resources.forestOfNiko

		// instantiate raycaster

		this.setInstance()
		this.setControls()
		// instantiate after the instance and controls (above have been created so that we can pass as args)

		// Debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('camera')
			this.controls.enabled = false
		}

		this.setDebug()
		// teleporter stopper
		this.teleportInProgress = false
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			60,
			this.sizes.width / this.sizes.height,
			0.1,
			1500
		)

		// sets player start
		this.instance.position.set(0, 1.1, 0)
		this.scene.add(this.instance)
	}

	setControls() {
		// properties for controls

		this.controls = new FirstPersonControls(this.instance, document)

		this.controls.movementSpeed = 0.003
		this.controls.lookSpeed = 0.00008
		// this.controls.heightCoef = 0.2
	}

	teleportToEldia() {
		console.log('teleported!')
		window.open('https://peaceful-inlet-40638.herokuapp.com/', '_self')
		this.teleportInProgress = true
	}
	teleportToSkills() {
		console.log('teleported!')
		window.open('https://www.linkedin.com/in/nick-gillham-3bb6971a1/', '_self')
		this.teleportInProgress = true
	}
	teleportToRandom() {
		console.log('teleported!')
		window.open('https://twitter.com/eth_nikodev', '_self')
		this.teleportInProgress = true
	}
	teleportToFullFat() {
		console.log('teleported!')
		window.open('https://fullfatgrappling.netlify.app', '_self')
		this.teleportInProgress = true
	}
	teleportToSpace() {
		console.log('teleported!')
		window.open('https://space-portfolio-project.netlify.app', '_self')
		this.teleportInProgress = true
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
		this.controls.handleResize()
	}

	sendup() {
		gsap.to(this.instance.position, {
			duration: 1,
			ease: 'power2.inOut',
			y: '+=1.1',
		})
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.controls, 'enabled')
		}
	}

	update() {
		this.controls.update(this.time.delta)
		if (this.instance.position.y < 1) {
			this.sendup()
		}
		// console.log(this.controls.object.position)

		if (
			this.controls.object.position.x > 7 &&
			this.controls.object.position.x < 8 &&
			this.controls.object.position.z > 2 &&
			this.controls.object.position.z < 3 &&
			!this.teleportInProgress
		) {
			this.teleportToEldia()
		}
		if (
			this.controls.object.position.x > 0 &&
			this.controls.object.position.x < 1 &&
			this.controls.object.position.z > 9 &&
			this.controls.object.position.z < 10 &&
			!this.teleportInProgress
		) {
			this.teleportToSkills()
		}
		if (
			this.controls.object.position.x > -14 &&
			this.controls.object.position.x < -13 &&
			this.controls.object.position.z > 9 &&
			this.controls.object.position.z < 10 &&
			!this.teleportInProgress
		) {
			this.teleportToRandom()
		}
		if (
			this.controls.object.position.x > -6 &&
			this.controls.object.position.x < -5 &&
			this.controls.object.position.z > -8 &&
			this.controls.object.position.z < -7 &&
			!this.teleportInProgress
		) {
			this.teleportToSpace()
		}
		if (
			this.controls.object.position.x > -15 &&
			this.controls.object.position.x < -14 &&
			this.controls.object.position.z > -3 &&
			this.controls.object.position.z < -2 &&
			!this.teleportInProgress
		) {
			this.teleportToFullFat()
		}
	}
}

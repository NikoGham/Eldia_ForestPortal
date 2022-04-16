import Experience from '../Experience'

export default class Airship {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		// resource for airship model
		this.resource = this.resources.items.airship

		this.radiusX = 15
		this.radiusY = 15

		this.setModel()

		// debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('airship')
		}
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene

		this.scene.add(this.model)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this, 'radiusX').min(1).max(20).step(1).name('radiusX')
			this.debugFolder.add(this, 'radiusY').min(1).max(20).step(1).name('radiusY')
		}
	}

	update() {
		this.model.position.x = this.radiusX * Math.cos(this.time.elapsed * 0.00001)

		this.model.position.z = this.radiusY * Math.sin(this.time.elapsed * 0.00001)

		this.model.rotation.y = this.time.elapsed * -0.0001
	}
}

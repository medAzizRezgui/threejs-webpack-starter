import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Loading the textures
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load("/textures/normal.png")
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.8;
material.roughness = 0.1;
material.normalMap = normalTexture

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights
// *********************************
const light1 = gui.addFolder('Light 1')
const light2 = gui.addFolder('Light 2')

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)

pointLight2.position.set(-1.9, 1.4, -1.3)
pointLight2.intensity = 10
scene.add(pointLight2)

// point light 2 GUI
light1.add(pointLight2.position, 'x').min(-3).max(3)
light1.add(pointLight2.position, 'y').min(-6).max(6)
light1.add(pointLight2.position, 'z').min(-3).max(3)
light1.add(pointLight2, 'intensity').min(0).max(10)
// Light Helpers


// *********************************

const pointLight3 = new THREE.PointLight(0xaaff, 2)

pointLight3.position.set(1.9, -1.4, -1.3)
pointLight3.intensity = 10
scene.add(pointLight3)


// point light 3 GUI
light2.add(pointLight3.position, 'x').min(-3).max(3)
light2.add(pointLight3.position, 'y').min(-6).max(6)
light2.add(pointLight3.position, 'z').min(-3).max(3)
light2.add(pointLight3, 'intensity').min(0).max(10)

const light2Color = {
    color: 0xFF0000
}
light2.addColor(light2Color, 'color').onChange(() => {
    pointLight3.color.set(light2Color.color)
})
// Light Helpers


// *********************************

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}


const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .001;
    targetY = mouseY * .001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 1 * elapsedTime
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += -.5 * (targetY - sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
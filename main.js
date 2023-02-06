import * as THREE from 'three';
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.defaults({
  scrub: 3,
  ease: 'none',
})

const gltfLoader = new GLTFLoader()


//Scene
const scene = new THREE.Scene();

//Create Sphere
// const geometry = new THREE.SphereGeometry(3, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//   color: '#00ff83',
// })

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)


//Create Logo

gltfLoader.load('/wua-v4.gltf', (gltf) => {

    /**
   * Animation GSAP
   */

  const logo = gltf.scene
  const sections = document.querySelectorAll('.section')
  gsap.from(logo.position, {
    y: 1,
    duration: 1,
    ease: 'expo',
  })
  gsap.from('h1', {
    yPercent: 100,
    autoAlpha: 0,
    ease: 'back',
    delay: 0.3,
  })
  gsap.to(logo.rotation, {
    x: Math.PI * 2,
    scrollTrigger: {
      trigger: sections[1],
    },
  })
  gsap.to(logo.scale, {
    x: 2,
    y: 2,
    scrollTrigger: {
      trigger: sections[2],
    },
  })
  gsap.to(logo.rotation, {
    y: Math.PI * 2,
    scrollTrigger: {
      trigger: sections[3],
    },
  })

  scene.add(logo)
})




//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 1, 500)
light.position.set(0, 0, 10)

const light2 = new THREE.PointLight(0xffffff, 1, 800)
light2.position.set(20, 10, -50)

const light3 = new THREE.PointLight(0xffffff, 1, 500)
light3.position.set(0, 0, -10)

const light4 = new THREE.PointLight(0xffffff, 1, 800)
light4.position.set(-20, 10, 50)

const light5 = new THREE.PointLight(0xffffff, 3, 1400)
light5.position.set(-50, 90, 100)

const light6 = new THREE.PointLight(0xffffff, 3, 1400)
light6.position.set(-80, -90, -140)

scene.add(light)
scene.add(light2)
scene.add(light3)
scene.add(light4)
scene.add(light5)
scene.add(light6)


let circleGeo = new THREE.CircleGeometry(20, 50);
let circleMat = new THREE.MeshBasicMaterial({color: 0xffccaa})
let circle = new THREE.Mesh(circleGeo, circleMat)
circle.position.set(0, 0, -150)
circle.scale.setX(1.2)
// scene.add(circle);

//Camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 500)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ 
  canvas: canvas,
  alpha: true 
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(4)
renderer.render(scene, camera)



//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.autoRotate = true
controls.autoRotateSpeed = 5




//Resize
window.addEventListener('resize', () => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update Camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})




const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()


//TimeLine 
const tl = gsap.timeline({ defaults: { duration: 1} })
// tl.fromTo(mesh.scale, {z:0, x:0, y:0 }, {z: 1, x: 1, y: 1})






//Mouse Animation Color
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]
    //Lets's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    // gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
  }
});
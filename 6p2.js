// terreno3d.js
const { ejecutar } = require("./6.js");
const THREE = require("three");
const { createCanvas } = require("canvas");
const fs = require("fs");

// Canvas para renderizar en Node
const width = 800, height = 600;
const canvas = createCanvas(width, height);

// Renderizador con Three.js
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(width, height);

// Escena, cámara y luz
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // cielo
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.set(0, 50, 100);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(50, 100, 50);
scene.add(light);

// Exponer objetos al intérprete
global.THREE = THREE;
global.scene = scene;
global.camera = camera;
global.renderer = renderer;

// Código en español para generar terreno procedural
const codigoEsp = `
funcion generarTerreno() {
  variable tamaño = 100
  variable segmentos = 64

  // Plano que será el terreno
  variable geometria = new THREE.PlaneGeometry(tamaño, tamaño, segmentos, segmentos)

  // Modificar vértices con ruido simple
  para variable i = 0; i < geometria.attributes.position.count; i++ {
    variable x = geometria.attributes.position.getX(i)
    variable y = geometria.attributes.position.getY(i)
    variable altura = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 5
    geometria.attributes.position.setZ(i, altura)
  }
  geometria.computeVertexNormals()

  variable material = new THREE.MeshStandardMaterial({ color: 0x228B22, wireframe: false })
  variable terreno = new THREE.Mesh(geometria, material)
  terreno.rotation.x = -Math.PI / 2
  scene.add(terreno)
}
generarTerreno()
`;

// Ejecutar con tu traductor
ejecutar(codigoEsp);

// Renderizar una imagen
renderer.render(scene, camera);
fs.writeFileSync("terreno3d.png", canvas.toBuffer("image/png"));
console.log("✅ Terreno 3D generado en terreno3d.png");

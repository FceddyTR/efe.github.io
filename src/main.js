import * as THREE from 'https://unpkg.com/three@0.161.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('scene-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0b1224');

const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(6, 4, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.5, 0);

// Lights
const hemi = new THREE.HemisphereLight('#a5b4fc', '#0b1224', 0.9);
scene.add(hemi);
const dir = new THREE.DirectionalLight('#ffffff', 1.05);
dir.position.set(5, 6, 4);
scene.add(dir);

// Ground
const groundGeo = new THREE.CircleGeometry(25, 64);
const groundMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.8, metalness: 0.1 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Player
const playerGeo = new THREE.CapsuleGeometry(0.35, 1.1, 8, 16);
const playerMat = new THREE.MeshStandardMaterial({ color: '#22d3ee', emissive: '#1f2937', metalness: 0.2, roughness: 0.45 });
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.y = 0.8;
scene.add(player);

// Boss
const bossGeo = new THREE.IcosahedronGeometry(1.2, 1);
const bossMat = new THREE.MeshStandardMaterial({ color: '#ef4444', emissive: '#7f1d1d', metalness: 0.35, roughness: 0.4 });
const boss = new THREE.Mesh(bossGeo, bossMat);
boss.position.set(0, 1.5, -5);
scene.add(boss);

// UI
const ui = {
  level: document.getElementById('level'),
  bossHP: document.getElementById('bossHP'),
  playerHP: document.getElementById('playerHP'),
  exp: document.getElementById('exp')
};

let bossMaxHP = 100;
let bossHP = bossMaxHP;
let playerHP = 100;
let exp = 0;
let level = 1;
let speed = 0.06;
let dashCooldown = 0;
const pressed = new Set();
const bullets = [];
const clock = new THREE.Clock();

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function spawnBullet() {
  const geo = new THREE.SphereGeometry(0.12, 12, 12);
  const mat = new THREE.MeshStandardMaterial({ color: '#a78bfa', emissive: '#5b21b6' });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(player.position);
  mesh.position.y = 0.6;

  const dirVec = new THREE.Vector3();
  camera.getWorldDirection(dirVec);
  dirVec.y = 0;
  dirVec.normalize();

  bullets.push({ mesh, velocity: dirVec.multiplyScalar(0.2), ttl: 2 });
  scene.add(mesh);
}

function takeDamage(amount) {
  playerHP = clamp(playerHP - amount, 0, 100);
  ui.playerHP.style.width = `${playerHP}%`;
  if (playerHP <= 0) {
    player.position.set(0, 0.8, 4);
    playerHP = 100;
    ui.playerHP.style.width = '100%';
  }
}

function updateBossHP(amount) {
  bossHP = clamp(bossHP - amount, 0, bossMaxHP);
  const percent = Math.round((bossHP / bossMaxHP) * 100);
  ui.bossHP.textContent = percent;
  boss.material.emissiveIntensity = 1 - bossHP / bossMaxHP + 0.3;

  if (bossHP <= 0) {
    level += 1;
    bossMaxHP += 40;
    bossHP = bossMaxHP;
    exp = 0;
    speed += 0.005;
    ui.level.textContent = level;
    boss.position.x = (Math.random() - 0.5) * 10;
    boss.position.z = -5 - Math.random() * 3;
  }
}

function grantExp(amount) {
  exp = clamp(exp + amount, 0, 100);
  ui.exp.style.width = `${exp}%`;
  if (exp >= 100) {
    exp = 0;
    level += 1;
    speed += 0.008;
    ui.level.textContent = level;
  }
}

function handleInput(delta) {
  const dirVec = new THREE.Vector3();
  if (pressed.has('KeyW')) dirVec.z -= 1;
  if (pressed.has('KeyS')) dirVec.z += 1;
  if (pressed.has('KeyA')) dirVec.x -= 1;
  if (pressed.has('KeyD')) dirVec.x += 1;

  if (dirVec.lengthSq() > 0) {
    dirVec.normalize();
    dirVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), camera.rotation.y);
    player.position.addScaledVector(dirVec, speed / delta);
    player.rotation.y = Math.atan2(dirVec.x, dirVec.z);
  }

  if (pressed.has('Space') && dashCooldown <= 0) {
    const dashDir = new THREE.Vector3();
    camera.getWorldDirection(dashDir);
    dashDir.y = 0;
    dashDir.normalize();
    player.position.addScaledVector(dashDir, 1.4);
    dashCooldown = 1.2;
  }
}

function animate() {
  const delta = clock.getDelta();
  dashCooldown = Math.max(0, dashCooldown - delta);

  handleInput(delta + 0.0001);
  controls.update();

  // Boss faces player
  const lookAtPlayer = new THREE.Vector3().copy(player.position);
  lookAtPlayer.y = boss.position.y;
  boss.lookAt(lookAtPlayer);

  // Boss pulse movement
  boss.position.x = Math.sin(performance.now() * 0.001) * 2.5;

  // Boss attack tick
  if (Math.random() < 0.01 + level * 0.0005) {
    const diff = new THREE.Vector3().subVectors(player.position, boss.position);
    if (diff.length() < 2.2) {
      takeDamage(15);
    }
  }

  // Bullets
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const bullet = bullets[i];
    bullet.mesh.position.addScaledVector(bullet.velocity, 1 + level * 0.03);
    bullet.ttl -= delta;

    if (bullet.mesh.position.distanceTo(boss.position) < 1.2) {
      updateBossHP(8 + level * 2);
      grantExp(14);
      scene.remove(bullet.mesh);
      bullets.splice(i, 1);
      continue;
    }

    if (bullet.ttl <= 0) {
      scene.remove(bullet.mesh);
      bullets.splice(i, 1);
    }
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resize);
window.addEventListener('keydown', (e) => {
  pressed.add(e.code);
  if (e.code === 'Digit1') {
    spawnBullet();
  }
});
window.addEventListener('keyup', (e) => pressed.delete(e.code));

animate();


/* assets/js/grid.js – theme-aware cyber-grid (Optimized) */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161/build/three.module.js";

export function initGrid(canvas) {
  if (!canvas) return;

  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;

  /* Renderer setup */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(W, H);

  /* Scene and camera */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.set(0, 10, 63);

  /* Grid helper */
  const grid = new THREE.GridHelper(100, 60, 0x66fcf1, 0x66fcf1);
  grid.material.transparent = true;
  scene.add(grid);

  /* Theme adaptation */
  function applyTheme() {
    const light = document.documentElement.dataset.theme === 'light';
    grid.material.color.set(light ? 0x045d75 : 0x66fcf1);
    grid.material.opacity = light ? 0.35 : 0.48;
  }

  applyTheme();
  window.addEventListener('themechange', applyTheme);

  /* Animation loop (30fps) */
  let t = 0, id;
  function step() {
    t += 0.002;
    grid.position.z = (t * 2) % 2;
    renderer.render(scene, camera);
  }

  function loop() {
    step();
    id = setTimeout(() => requestAnimationFrame(loop), 33);
  }

  loop();

  document.addEventListener('visibilitychange', () => {
    document.hidden ? clearTimeout(id) : loop();
  });

  return step;
}

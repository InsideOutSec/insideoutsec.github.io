/* assets/js/grid.js – theme-aware cyber-grid */

import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.161/build/three.module.js";

export function initGrid(canvas) {
  if (!canvas) return;
  const W = canvas.offsetWidth, H = canvas.offsetHeight;

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(W, H);

  /* scene & camera */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.set(0, 10, 63);

  /* grid helper (lines) */
  const grid = new THREE.GridHelper(100, 60, 0x66fcf1, 0x66fcf1);
  grid.material.transparent = true;
  scene.add(grid);

  /* ---------- theme adaptation ---------- */
  function applyTheme() {
    const light = document.documentElement.dataset.theme === 'light';

    grid.material.color.set(light ? 0x045d75 : 0x66fcf1);
    grid.material.opacity = light ? 0.35 : 0.48;

  }
  applyTheme();
  window.addEventListener('themechange', applyTheme);

  /* ---------- animation loop (30 fps) ---------- */
  let t = 0, id;
  function step() {
    t += 0.002;
    grid.position.z = (t * 2) % 2;
    renderer.render(scene, camera);
  }
  function loop() {
    step();
    id = setTimeout(() => requestAnimationFrame(loop), 33); // 30 fps
  }
  loop();

  /* pause on tab blur */
  document.addEventListener('visibilitychange', () =>
    document.hidden ? clearTimeout(id) : loop()
  );

  /* return step in case site.js wants it */
  return step;
}

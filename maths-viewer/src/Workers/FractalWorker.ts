/*eslint no-restricted-globals: ["error", "event"]*/
import { WorkerJob } from '../d';

import('wasm').then(async (wasm) => {
  wasm.init();
  self.addEventListener('message', (e: MessageEvent) => {
    let mandelbrotGenerator = new wasm.Mandelbrot();
    try {
      let job: WorkerJob = e.data;
      const data = mandelbrotGenerator.get_tile(
        job.coords.x,
        job.coords.y,
        job.coords.z,
        job.maxIteration,
        job.tileSize,
        job.theme,
        job.fractalId,
        job.juliaReal,
        job.juliaImag,
        job.exponent
      );

      self.postMessage({
        coords: job.coords,
        img: data,
      });
    } catch (err) {
      console.error(err);
    }
  });
  self.postMessage({ ready: true });
});

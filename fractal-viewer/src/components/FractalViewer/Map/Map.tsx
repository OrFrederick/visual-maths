/* eslint-disable react-hooks/exhaustive-deps */
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { TileWorker, WorkerJob, Coordinates, MapProps } from '../../../d';

function Map(props: MapProps) {
  const [map, setMap] = useState<L.Map>();
  const [workers, setWorkers] = useState<Array<TileWorker>>([]);
  const [workerReady, setWorkerReady] = useState(false);

  const { config, flight, setZoom } = props;

  const resetWorkers = () => {
    let tmpWorkers = [];
    for (let i = 0; i < config.numberWorkers; i++) {
      tmpWorkers.push(createWorker());
    }
    setWorkers(tmpWorkers);
  };

  const createLayer = () => {
    let layer: L.GridLayer = new L.GridLayer({
      noWrap: true,
      updateWhenZooming: false,
      tileSize: config.tileSize,
      updateWhenIdle: true,
    });

    // @ts-ignore
    layer.createTile = (coords: Coordinates, done) => {
      var tile = document.createElement('canvas');
      tile.width = config.tileSize;
      tile.height = config.tileSize;

      if (workers.length === 0) {
        return tile;
      }

      let readyWorkers = workers.filter((w: TileWorker) => {
        return w.ready;
      });

      let currentWorker = readyWorkers.reduce(
        (leastActive: TileWorker, worker: TileWorker) =>
          worker.tasks < leastActive.tasks ? worker : leastActive,
        readyWorkers[0]
      );
      currentWorker.tasks += 1;

      var ctx = tile.getContext('2d');

      let job: WorkerJob = {
        coords: coords,
        maxIteration: config.maxIteration,
        theme: config.theme,
        tileSize: config.tileSize,
        fractalId: props.fractalId,
        juliaReal: config.juliaRe,
        juliaImag: config.juliaImag,
        exponent: config.exponent,
      };

      const tileRetrievedHandler = (msg: MessageEvent) => {
        let data = msg.data;
        if (JSON.stringify(data.coords) === JSON.stringify(coords)) {
          currentWorker.worker.removeEventListener(
            'message',
            tileRetrievedHandler
          );
          currentWorker.tasks = Math.max(currentWorker.tasks - 1, 0);
          try {
            var imageData = new ImageData(
              Uint8ClampedArray.from(data.img),
              config.tileSize,
              config.tileSize
            );

            if (ctx) {
              ctx.putImageData(imageData, 0, 0);
              done(undefined, tile);
            }
          } catch (IndexSizeError) {}
        }
      };

      currentWorker.worker.addEventListener('message', tileRetrievedHandler);
      currentWorker.worker.postMessage(job);
      return tile;
    };
    return layer;
  };

  const createWorker = (): TileWorker => {
    let w: TileWorker = {
      worker: new Worker(
        new URL('../../../Workers/FractalWorker', import.meta.url)
      ),
      ready: false,
      tasks: 0,
    };

    w.worker.onmessage = (msg: any) => {
      if (msg.data.ready) {
        w.ready = true;
        setWorkerReady(true);
      }
    };
    return w;
  };

  const reloadMap = () => {
    if (map) {
      map.eachLayer((l) => {
        map.removeLayer(l);
      });
      map.addLayer(createLayer());
    }
  };

  useEffect(() => {
    const createMap = () => {
      let zoom = 2;
      let center = L.latLng(0, 0);
      if (map) {
        center = map.getCenter();
        zoom = map.getZoom();
        map.remove();
      }

      let tmpMap = L.map('map', {
        center: center,
        zoom: zoom,
        minZoom: 2,
        maxZoom: 50,
        attributionControl: false,
        zoomAnimation: false,
        maxBounds: L.latLngBounds(L.latLng(100, -100), L.latLng(-100, 100)),
      });

      tmpMap.addLayer(createLayer());
      tmpMap.on('zoom', () => {
        setZoom(tmpMap.getZoom());
      });

      /* tmpMap.addEventListener('mousemove', (e: L.LeafletMouseEvent) => {
        console.log(e.latlng.lat, e.latlng.lng);
      }); */
      return tmpMap;
    };

    if (workerReady) {
      setMap(createMap());
    }
  }, [workerReady]);

  useEffect(() => {
    reloadMap();
  }, [config]);

  useEffect(() => {
    if (map && flight) {
      map.flyTo(flight.latLng, flight.zoom, {
        animate: false,
        duration: 0,
      });
    }
  }, [flight]);

  useEffect(resetWorkers, []);

  return <div className="w-screen h-screen" id="map"></div>;
}

export default Map;

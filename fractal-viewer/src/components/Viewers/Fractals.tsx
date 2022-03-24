import Map from '../FractalViewer/Map/Map';
import Overlay from '../FractalViewer/Overlay/Overlay';
import { Config, Flight } from '../../d';
import React, { useState } from 'react';
import L from 'leaflet';

function Fractals() {
  const [zoom, setZoom] = useState(2);
  const [flight, setFlight] = useState<Flight>();
  const [lastFlight, setLastFlight] = useState<Flight>();
  const [config, setConfig] = useState<Config>({
    width: 1280,
    height: 720,
    theme: 5,
    tileSize: 256,
    maxIteration: 100,
    refresh: false,
    numberWorkers: 3,
    fractalId: 0,
    juliaRe: -0.7,
    juliaImag: -0.3,
    exponent: 2,
  });

  const flights: Flight[] = [
    createFlight(6.293970640708926, -53.400099277496345, 16, 800, 0, 0, 0),
    createFlight(24.640037419589472, -17.729575932025913, 19, 800, 0, 0, 0),
    createFlight(25.319249125072524, -16.797858730295484, 43, 1000, 0, 0, 0),
    createFlight(-41.250652425645455, -5.155400186777116, 15, 1500, 0, 0, 0),
    createFlight(14.036988326329112, 18.874946236610416, 18, 1500, 0, 0, 0),
    createFlight(0, 0, 4, 2000, -0.4, -0.583, 1),
    createFlight(0, 0, 4, 2000, -0.4, 0.6, 1),
    createFlight(0, 0, 4, 250, -0.4, -0.583, 1),
    createFlight(0, 0, 4, 400, 0, -0.8, 1),
    createFlight(4.7156560770548, -17.8552951298479, 31, 2000, -0.64, -0.47, 1),
  ];

  function createFlight(
    lat: number,
    lng: number,
    zoom: number,
    iterations: number,
    juliaRe: number,
    juliaImag: number,
    fractalId: number
  ): Flight {
    return {
      latLng: L.latLng(lat, lng),
      zoom: zoom,
      iterations: iterations,
      fractalId: fractalId,
      juliaRe: juliaRe,
      juliaImag: juliaImag,
      exponent: 2,
    };
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig({
      ...config,
      theme: parseInt(e.target.value),
    });
  };

  const handleFractalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig({
      ...config,
      fractalId: parseInt(e.target.value),
    });
  };

  const handleMaxIteration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      maxIteration: parseInt(e.target.value),
    });
  };

  const handleTileSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      tileSize: parseInt(e.target.value),
    });
  };

  const handleNumberWorkers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      numberWorkers: parseInt(e.target.value),
    });
  };

  const handleJuliaCReal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      juliaRe: parseFloat(e.target.value),
    });
  };

  const handleJuliaCImag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      juliaImag: parseFloat(e.target.value),
    });
  };

  const handleExponent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      exponent: parseFloat(e.target.value),
    });
  };

  // In order to refresh, only change something in config such that the useEffect hook in Map fires
  const handleRefresh = () => {
    setConfig({
      ...config,
    });
  };

  const handleFlight = () => {
    let flight: Flight = flights[Math.floor(Math.random() * flights.length)];

    while (flight === lastFlight || config.fractalId !== flight.fractalId) {
      flight = flights[Math.floor(Math.random() * flights.length)];
    }

    setConfig({
      ...config,
      maxIteration: flight.iterations,
      juliaRe: flight.juliaRe,
      juliaImag: flight.juliaImag,
    });
    setTimeout(() => setFlight(flight), 100);
    setLastFlight(flight);
  };

  return (
    <div>
      <Overlay
        handleNumberWorkers={handleNumberWorkers}
        handleFractalChange={handleFractalChange}
        handleMaxIteration={handleMaxIteration}
        handleThemeChange={handleThemeChange}
        handleTileSize={handleTileSize}
        handleRefresh={handleRefresh}
        handleFlight={handleFlight}
        handleJuliaCReal={handleJuliaCReal}
        handleJuliaCImag={handleJuliaCImag}
        handleExponent={handleExponent}
        exponent={config.exponent}
        numberWorkers={config.numberWorkers}
        maxIteration={config.maxIteration}
        tileSize={config.tileSize}
        theme={config.theme}
        fractalId={config.fractalId}
        juliaRe={config.juliaRe}
        juliaImag={config.juliaImag}
        zoom={zoom}
      />
      <Map
        config={config}
        flight={flight}
        setZoom={setZoom}
        fractalId={config.fractalId}
      />
    </div>
  );
}

export default Fractals;

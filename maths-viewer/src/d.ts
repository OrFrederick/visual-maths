export interface TileWorker {
  worker: any;
  tasks: number;
  ready: boolean;
}

export interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export interface WorkerJob {
  coords: Coordinates;
  maxIteration: number;
  theme: number;
  tileSize: number;
  fractalId: number;
  juliaReal: number;
  juliaImag: number;
  exponent: number;
}

export interface Config {
  width: number;
  height: number;
  tileSize: number;
  maxIteration: number;
  theme: number;
  numberWorkers: number;
  refresh: boolean;
  fractalId: number;
  juliaRe: number;
  juliaImag: number;
  exponent: number;
}

export interface Flight {
  latLng: L.LatLng;
  zoom: number;
  iterations: number;
  fractalId: number;
  juliaRe: number;
  juliaImag: number;
  exponent: number;
}

export interface MapProps {
  config: Config;
  setZoom: any;
  flight?: Flight;
  fractalId: number; // 0 - Mandelbrot, 1 - Julia
}

export interface OverlayProps {
  zoom: number;
  handleFlight: () => void;
  handleThemeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFractalChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMaxIteration: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTileSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberWorkers: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleJuliaCReal: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleJuliaCImag: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExponent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRefresh: () => void;
  exponent: number;
  theme: number;
  maxIteration: number;
  tileSize: number;
  numberWorkers: number;
  fractalId: number;
  juliaRe: number;
  juliaImag: number;
}

export interface SliderProps {
  value: number;
  step?: string;
  min: string;
  max: string;
  title: string;
  tooltip: string;
  handler?: (e: any) => void;
}

import { useState } from 'react';
import Slider from './Slider';
import { OverlayProps } from '../../d';
// @ts-ignore
import MathJax from 'mathjax3-react';

function Overlay(props: OverlayProps) {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const {
    zoom,
    handleFlight,
    handleThemeChange,
    handleMaxIteration,
    handleTileSize,
    handleJuliaCReal,
    handleJuliaCImag,
    handleNumberWorkers,
    handleFractalChange,
    handleRefresh,
    handleExponent,
    exponent,
    theme,
    maxIteration,
    tileSize,
    numberWorkers,
    fractalId,
    juliaRe,
    juliaImag,
  } = props;

  const toggleSettings = () => {
    setSettingsOpened(!settingsOpened);
  };

  return (
    <>
      <div className="z-401 absolute bottom-2 left-2 w-fit bg-white border rounded p-2 cursor-default">
        Zoom: {Math.round(zoom)}
      </div>
      <div className="z-401 w-fit absolute right-1/2 translate-x-1/2 top-1">
        <button
          className="bg-white font-bold text-gray-700 hover:bg-gray-700 hover:text-white border border-gray-700 text-xl p-2 rounded"
          onClick={handleFlight}
        >
          <abbr
            className="no-underline"
            title="Fly to an interesting spot in the Fractal"
          >
            <i className="fa-solid fa-magnifying-glass-location"></i> Explore
          </abbr>
        </button>
      </div>
      <button
        className="z-402 absolute right-0 top-0 p-2 border-0 rounded rounded-br-none bg-white font-bold text-gray-700 hover:bg-gray-700 hover:text-white ml-5"
        onClick={toggleSettings}
      >
        {settingsOpened ? (
          <i className="fa-solid fa-down-left-and-up-right-to-center fa-2xl"></i>
        ) : (
          <i className="fa-solid fa-sliders fa-2xl"></i>
        )}
      </button>
      <div
        className={`z-401 absolute right-0 top-10 rounded rounded-tr-none w-50 bg-white font-bold text-gray-700  p-10 transition-all ease-in duration-300 ${
          settingsOpened ? 'opacity-100' : 'opacity-0 hidden'
        }`}
      >
        <h2>
          <div>
            <MathJax.Provider>
              <MathJax.Formula
                formula={`$$ z_{n+1} = z_n^{${exponent}} + c $$`}
              />
              {fractalId === 1 && (
                <MathJax.Formula
                  formula={`$$ c = ${juliaRe} ${
                    juliaImag > 0 ? '+' : ''
                  } ${juliaImag}i $$`}
                />
              )}
            </MathJax.Provider>
          </div>
        </h2>
        <div className="item flex flex-col justify-evenly mt-2">
          <label className="label" htmlFor="fractals">
            Fractal
          </label>
          <select
            name="fractals"
            onChange={handleFractalChange}
            value={fractalId}
            className="w-1/2 m-auto"
          >
            <option value="0">Mandelbrot Set</option>
            <option value="1">Julia Set</option>
          </select>
        </div>
        <div className="item flex flex-col justify-evenly mt-5">
          <label className="label" htmlFor="themes">
            Theme
          </label>
          <select
            name="themes"
            onChange={handleThemeChange}
            value={theme}
            className="w-1/2 m-auto"
          >
            <option value="5">Rainbow</option>
            <option value="0">Black</option>
            <option value="1">White</option>
            <option value="2">Red</option>
            <option value="3">Green</option>
            <option value="4">Blue</option>
          </select>
        </div>

        <Slider
          title="Exponent"
          tooltip="Exponent of z"
          handler={handleExponent}
          value={exponent}
          min="1"
          step="0.1"
          max="10"
        />

        <Slider
          title="Iterations"
          tooltip="Number of iterations for the Fractal"
          handler={handleMaxIteration}
          value={maxIteration}
          min="10"
          max="3000"
        />
        {fractalId === 1 && (
          <>
            <Slider
              title="c (Real)"
              tooltip="Real part of c in the Julia Set"
              handler={handleJuliaCReal}
              value={juliaRe}
              min="-1"
              max="1"
              step="0.001"
            />
            <Slider
              title="c (Imaginary)"
              tooltip="Imaginary part of c in the Julia Set"
              handler={handleJuliaCImag}
              value={juliaImag}
              min="-1"
              max="1"
              step="0.001"
            />
          </>
        )}
        <Slider
          title="TileSize"
          tooltip="The size of the tiles rendered"
          handler={handleTileSize}
          value={tileSize}
          min="30"
          max="1000"
        />
        <Slider
          title="Workers"
          tooltip="NUmber of background jobs started to generate the tiles"
          handler={handleNumberWorkers}
          value={numberWorkers}
          min="1"
          max="20"
        />
        <div className="item w-1/3 m-auto flex flex-row justify-center mt-5 border border-gray-700 rounded bg-white font-bold text-gray-700 hover:bg-gray-700 hover:text-white">
          <button
            className="w-full"
            id="refresh-button"
            onClick={handleRefresh}
          >
            <i className="fa-solid fa-arrow-rotate-right"></i> Refresh
          </button>
        </div>
      </div>
    </>
  );
}

export default Overlay;

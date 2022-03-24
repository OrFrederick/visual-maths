import { GameOfLife, Cell } from 'wasm';
import { memory } from 'wasm/wasm_bg.wasm';
import { useEffect, useRef, useState } from 'react';

function GameOfLifeViewer() {
  const GRID_COLOR = '#CCCCCC';
  const DEAD_COLOR = '#FFFFFF';
  const ALIVE_COLOR = '#000000';

  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  const [config, setConfig] = useState({
    random: true,
    width: 40,
    height: 20,
    cellSize: 20,
  });

  const [rendering, setRendering] = useState(false);
  const [animationId, setAnimationId] = useState(0);
  const [gameOfLife, setGameOfLife] = useState<GameOfLife>(
    new GameOfLife(config.width, config.height)
  );

  useEffect(() => {
    if (rendering) {
      renderLoop();
    } else {
      cancelAnimationFrame(animationId);
    }
  }, [rendering]);

  useEffect(() => {
    clearGrid();
    drawCells();
    drawGrid();
  }, [config]);

  const setupCanvas = () => {
    let canvas: any = canvasRef.current;
    canvas.height = (config.cellSize + 1) * config.height + 1;
    canvas.width = (config.cellSize + 1) * config.width + 1;
    setCtx(canvas.getContext('2d'));
  };

  useEffect(() => {
    setGameOfLife(new GameOfLife(config.width, config.height));
    setupCanvas();
    renderLoop();
  }, [canvasRef.current]);

  const renderLoop = () => {
    gameOfLife.tick();
    drawGrid();
    drawCells();
    if (rendering) {
      setAnimationId(requestAnimationFrame(renderLoop));
    }
  };

  const clearGrid = () => {
    if (!ctx || !canvasRef.current) {
      return;
    }
    let cvs: any = canvasRef.current;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
  };

  const drawGrid = () => {
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= config.width; i++) {
      ctx.moveTo(i * (config.cellSize + 1) + 1, 0);
      ctx.lineTo(
        i * (config.cellSize + 1) + 1,
        (config.cellSize + 1) * config.height + 1
      );
    }

    // Horizontal lines.
    for (let j = 0; j <= config.height; j++) {
      ctx.moveTo(0, j * (config.cellSize + 1) + 1);
      ctx.lineTo(
        (config.cellSize + 1) * config.width + 1,
        j * (config.cellSize + 1) + 1
      );
    }

    ctx.stroke();
  };

  const getIndex = (row: number, column: number) => {
    return row * config.width + column;
  };

  const drawCells = () => {
    if (!ctx) {
      return;
    }

    const cellsPtr = gameOfLife.cells();
    const cells = new Uint8Array(
      memory.buffer,
      cellsPtr,
      config.width * config.height
    );

    ctx.beginPath();

    for (let row = 0; row < config.height; row++) {
      for (let col = 0; col < config.width; col++) {
        const idx = getIndex(row, col);
        ctx.fillStyle = cells[idx] === 1 ? ALIVE_COLOR : DEAD_COLOR;

        ctx.fillRect(
          col * (config.cellSize + 1) + 1,
          row * (config.cellSize + 1) + 1,
          config.cellSize,
          config.cellSize
        );
      }
    }

    ctx.stroke();
  };

  const handleStart = () => {
    if (!rendering) {
      setRendering(true);
    }
  };

  const handleStop = () => {
    if (rendering) {
      setRendering(false);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = parseInt(e.target.value);
    setConfig({
      ...config,
      width: v,
    });
    gameOfLife.set_width(v);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = parseInt(e.target.value);
    setConfig({
      ...config,
      height: v,
    });
    gameOfLife.set_height(v);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      cellSize: parseInt(e.target.value),
    });
  };

  return (
    <div>
      <h1>Game of Life</h1>
      <canvas ref={canvasRef} id="game-of-life"></canvas>
      <label htmlFor="inpt-width">Width</label>
      <input
        name="inpt-width"
        type="range"
        min="5"
        max="100"
        onChange={handleWidthChange}
      />
      <label htmlFor="inpt-height">Height</label>
      <input type="range" min="5" max="100" onChange={handleHeightChange} />
      <label htmlFor="inpt-size">Cell size</label>
      <input type="range" min="1" max="100" onChange={handleSizeChange} />
      <button onClick={handleStart}>START</button>
      <button onClick={handleStop}>STOP</button>
    </div>
  );
}

export default GameOfLifeViewer;

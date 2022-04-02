import { GameOfLife, Cell } from 'wasm';
import { memory } from 'wasm/wasm_bg.wasm';
import React, { useEffect, useRef, useState } from 'react';
import IconButton from '../GameOfLive/IconButton';
import { Link } from 'react-router-dom';

function GameOfLifeViewer() {
  const GRID_COLOR = '#CCCCCC';
  const DEAD_COLOR = '#FFFFFF';
  const ALIVE_COLOR = '#000000';

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  const [config, setConfig] = useState({
    random: true,
    cols: Math.round((window.innerWidth * 0.7) / 20),
    rows: Math.round((window.innerHeight * 0.7) / 20),
    cellSize: 20,
  });

  const [rendering, setRendering] = useState(false);
  const [animationId, setAnimationId] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastDrawn, setLastDrawn] = useState(0);
  const [gameOfLife, setGameOfLife] = useState<GameOfLife>(
    new GameOfLife(config.cols, config.rows)
  );

  useEffect(() => {
    if (rendering) {
      renderLoop();
    } else {
      cancelAnimationFrame(animationId);
    }
  }, [rendering]);

  useEffect(() => {
    drawCells();
    drawGrid();
  }, [config]);

  const setupCanvas = () => {
    let canvas: any = canvasRef.current;
    canvas.height = (config.cellSize + 1) * config.rows + 1;
    canvas.width = (config.cellSize + 1) * config.cols + 1;
    setCtx(canvas.getContext('2d'));
  };

  useEffect(() => {
    setGameOfLife(new GameOfLife(config.cols, config.rows));
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

  const drawGrid = () => {
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= config.cols; i++) {
      ctx.moveTo(i * (config.cellSize + 1) + 1, 0);
      ctx.lineTo(
        i * (config.cellSize + 1) + 1,
        (config.cellSize + 1) * config.rows + 1
      );
    }

    // Horizontal lines.
    for (let j = 0; j <= config.rows; j++) {
      ctx.moveTo(0, j * (config.cellSize + 1) + 1);
      ctx.lineTo(
        (config.cellSize + 1) * config.cols + 1,
        j * (config.cellSize + 1) + 1
      );
    }

    ctx.stroke();
  };

  const getIndex = (row: number, column: number) => {
    return row * config.cols + column;
  };

  const drawCells = (pcells?: number) => {
    if (!ctx) {
      return;
    }

    const cellsPtr = pcells ? pcells : gameOfLife.cells();
    const cells = new Uint8Array(
      memory.buffer,
      cellsPtr,
      config.cols * config.rows
    );

    ctx.beginPath();

    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
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

  const handleNextStep = () => {
    if (!rendering) {
      renderLoop();
    }
  };

  const handleRandomGeneration = () => {
    if (!rendering) {
      let gol = new GameOfLife(config.cols, config.rows);
      setGameOfLife(gol);
      drawGrid();
      drawCells(gol.cells());
    }
  };

  const redraw = (x: number, y: number, v: Cell) => {
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.fillStyle = v === 1 ? ALIVE_COLOR : DEAD_COLOR;

    ctx.fillRect(
      x * (config.cellSize + 1) + 1,
      y * (config.cellSize + 1) + 1,
      config.cellSize,
      config.cellSize
    );
    ctx.stroke();
  };

  const handleMouseMove = (e: React.MouseEvent, md?: boolean) => {
    if (!canvasRef.current || (!mouseDown && !md)) {
      console.log('return');
      return;
    }

    const cellsPtr = gameOfLife.cells();
    const cells = new Uint8Array(
      memory.buffer,
      cellsPtr,
      config.cols * config.rows
    );
    const rect = canvasRef.current.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor(x / (config.cellSize + 1));
    y = Math.floor(y / (config.cellSize + 1));

    let idx = getIndex(y, x);
    if (idx !== lastDrawn) {
      let v = cells[idx] === 1 ? 0 : 1;

      gameOfLife.change_cell(y, x, v);
      redraw(x, y, v);
      setLastDrawn(idx);
    }
  };

  const handleClear = () => {
    if (!rendering) {
      gameOfLife.clear_grid();
      drawCells();
    }
  };

  return (
    <div className="h-screen dark:bg-darkgray dark:text-white">
      <Link to="/">
        <IconButton
          handler={() => {}}
          icon="fa-solid fa-house"
          classes="absolute left-2 top-2"
        />
      </Link>
      <h1 className="font-bold text-4xl w-fit m-auto pb-2 pt-2">
        Game of Life
      </h1>
      <canvas
        className="w-fit m-auto bg-white"
        ref={canvasRef}
        id="game-of-life"
        onMouseMove={handleMouseMove}
        onMouseDown={() => setMouseDown(true)}
        onMouseLeave={() => setMouseDown(false)}
        onMouseUp={() => setMouseDown(false)}
        onClick={(e) => {
          handleMouseMove(e, true);
        }}
      ></canvas>
      <div className="actions w-fit m-auto mt-5 bg-slate-300 py-2 px-4 rounded-full">
        {rendering ? (
          <IconButton handler={handleStop} icon="fa-solid fa-pause" />
        ) : (
          <IconButton handler={handleStart} icon="fa-solid fa-play" />
        )}
        <IconButton handler={handleNextStep} icon="fa-solid fa-forward-step" />
        <IconButton
          handler={handleRandomGeneration}
          icon="fa-solid fa-shuffle"
        />
        <IconButton handler={handleClear} icon="fa-solid fa-trash-can" />
      </div>
    </div>
  );
}

export default GameOfLifeViewer;

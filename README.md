# Visual Maths

This is my project, where you can explore the <a href="https://en.wikipedia.org/wiki/Mandelbrot_set">Mandelbrot set</a> and the <a href="https://en.wikipedia.org/wiki/Julia_set">Julia set</a>. If you like the Conveys game of life, explore it too. You can view it at:

<a href="https://orfrederick.github.io/visual-maths/">https://orfrederick.github.io/visual-maths/</a>

# How its built

Its a React App, which uses Rust compiled to Webassembly to calculate the tiles. The tiles are orgeanized by a <a href="https://leafletjs.com/">leafletjs</a> map.

# Features

- Zoom and explore the fractal
- Fly to a random and interesting point inside the fractal
- Change the number of iterations per pixel
- Change the size of the tiles generated
- Adjust the number of background jobs running, to calculate the tiles
- Change c, which gets added per iteration (Julia set only)
- Choose between different themes:<br />
  ## Orange Rainbow
  <img src="https://user-images.githubusercontent.com/76128272/159796213-63405c59-a6e4-4741-951e-267e4bf54a91.png" width=100% ><br />
  ## Black
  <img src="https://user-images.githubusercontent.com/76128272/159796212-9379e5ea-1795-42df-8313-15c7b2fd85f7.png" width=100% ><br />
  ## White
  <img src="https://user-images.githubusercontent.com/76128272/159796207-99050032-433b-4c8f-bf3b-08005b062d8c.png" width=100% ><br />
  ## Red
  <img src="https://user-images.githubusercontent.com/76128272/159796204-a2bf1474-a49d-4764-88c4-9bcd85b96042.png" width=100% ><br />
  ## Green
  <img src="https://user-images.githubusercontent.com/76128272/159796203-430f6fe2-00fd-46cf-bd40-7ac0f2c02c17.png" width=100% ><br />
  ## Blue
  <img src="https://user-images.githubusercontent.com/76128272/159796201-e4fd4c72-831f-46d3-b233-0702f54a1974.png" width=100% >

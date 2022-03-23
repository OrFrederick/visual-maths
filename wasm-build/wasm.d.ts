/* tslint:disable */
/* eslint-disable */
/**
*/
export function init(): void;
/**
*/
export function set_panic_hook(): void;
/**
*/
export class HSVColor {
  free(): void;
}
/**
*/
export class Mandelbrot {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} color_scheme
* @param {number} iteration
* @param {number} max_iteration
* @returns {RGBAColor}
*/
  get_color(color_scheme: number, iteration: number, max_iteration: number): RGBAColor;
/**
* @param {number} x
* @param {number} y
* @param {number} z
* @param {number} max_iteration
* @param {number} tile_size
* @param {number} theme_id
* @param {number} fractal_id
* @param {number} julia_real
* @param {number} julia_imag
* @param {number} exponent
* @returns {Uint8Array}
*/
  get_tile(x: number, y: number, z: number, max_iteration: number, tile_size: number, theme_id: number, fractal_id: number, julia_real: number, julia_imag: number, exponent: number): Uint8Array;
/**
* @param {number} val
*/
  set_cen_r(val: number): void;
/**
* @param {number} val
*/
  set_cen_i(val: number): void;
/**
* @param {number} val
*/
  set_range_r(val: number): void;
/**
* @param {number} val
*/
  set_range_i(val: number): void;
/**
* @returns {number}
*/
  get_range_r(): number;
}
/**
*/
export class RGBAColor {
  free(): void;
}

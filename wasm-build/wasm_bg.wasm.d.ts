/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_rgbacolor_free(a: number): void;
export function __wbg_hsvcolor_free(a: number): void;
export function __wbg_mandelbrot_free(a: number): void;
export function mandelbrot_new(): number;
export function mandelbrot_get_color(a: number, b: number, c: number, d: number): number;
export function mandelbrot_get_tile(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number): void;
export function mandelbrot_set_cen_r(a: number, b: number): void;
export function mandelbrot_set_cen_i(a: number, b: number): void;
export function mandelbrot_set_range_r(a: number, b: number): void;
export function mandelbrot_set_range_i(a: number, b: number): void;
export function mandelbrot_get_range_r(a: number): number;
export function init(): void;
export function set_panic_hook(): void;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number): void;

import * as wasm from './wasm_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
export function init() {
    wasm.init();
}

/**
*/
export function set_panic_hook() {
    wasm.set_panic_hook();
}

/**
*/
export class HSVColor {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hsvcolor_free(ptr);
    }
}
/**
*/
export class Mandelbrot {

    static __wrap(ptr) {
        const obj = Object.create(Mandelbrot.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mandelbrot_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.mandelbrot_new();
        return Mandelbrot.__wrap(ret);
    }
    /**
    * @param {number} color_scheme
    * @param {number} iteration
    * @param {number} max_iteration
    * @returns {RGBAColor}
    */
    get_color(color_scheme, iteration, max_iteration) {
        var ret = wasm.mandelbrot_get_color(this.ptr, color_scheme, iteration, max_iteration);
        return RGBAColor.__wrap(ret);
    }
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
    get_tile(x, y, z, max_iteration, tile_size, theme_id, fractal_id, julia_real, julia_imag, exponent) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.mandelbrot_get_tile(retptr, this.ptr, x, y, z, max_iteration, tile_size, theme_id, fractal_id, julia_real, julia_imag, exponent);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} val
    */
    set_cen_r(val) {
        wasm.mandelbrot_set_cen_r(this.ptr, val);
    }
    /**
    * @param {number} val
    */
    set_cen_i(val) {
        wasm.mandelbrot_set_cen_i(this.ptr, val);
    }
    /**
    * @param {number} val
    */
    set_range_r(val) {
        wasm.mandelbrot_set_range_r(this.ptr, val);
    }
    /**
    * @param {number} val
    */
    set_range_i(val) {
        wasm.mandelbrot_set_range_i(this.ptr, val);
    }
    /**
    * @returns {number}
    */
    get_range_r() {
        var ret = wasm.mandelbrot_get_range_r(this.ptr);
        return ret;
    }
}
/**
*/
export class RGBAColor {

    static __wrap(ptr) {
        const obj = Object.create(RGBAColor.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rgbacolor_free(ptr);
    }
}

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};


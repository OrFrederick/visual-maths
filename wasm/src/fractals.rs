use itertools_num::linspace;
use wasm_bindgen::prelude::*;
use num::complex::Complex64;

#[wasm_bindgen]
pub struct RGBAColor {
    r: u8,
    g: u8,
    b: u8,
    a: u8,
}

#[wasm_bindgen]
pub struct HSVColor {
    h: f64,
    s: f64,
    v: f64,
}

#[wasm_bindgen]
pub struct Mandelbrot {
    cen_r: f64,
    cen_i: f64,
    range_r: f64,
    range_i: f64,
}

#[wasm_bindgen]
impl Mandelbrot {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Mandelbrot {
            cen_r: -0.765,
            cen_i: 0.0,
            range_r: 3.5,
            range_i: 2.0,
        }
    }

    /*
        color_scheme:
            0 - black and white
            1 - shadowed white
            2 - shadowed red
            3 - shadowed blue
            4 - shadowed green
            5 - super orange
    */
    pub fn get_color(&self, color_scheme: usize, iteration: u32, max_iteration: u32) -> RGBAColor {
        match color_scheme {
            0 => {
                if iteration == max_iteration {
                    RGBAColor {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 255,
                    }
                } else {
                    RGBAColor {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 255,
                    }
                }
            }
            1 => {
                let v = (255.0 * iteration as f64 / max_iteration as f64) as u8;
                RGBAColor {
                    r: v,
                    g: v,
                    b: v,
                    a: 255,
                }
            }
            2 => {
                let v = (255.0 * iteration as f64 / max_iteration as f64) as u8;
                RGBAColor {
                    r: v,
                    g: 0,
                    b: 0,
                    a: 255,
                }
            }
            3 => {
                let v = (255.0 * iteration as f64 / max_iteration as f64) as u8;
                RGBAColor {
                    r: 0,
                    g: v,
                    b: 0,
                    a: 255,
                }
            }
            4 => {
                let v = (255.0 * iteration as f64 / max_iteration as f64) as u8;
                RGBAColor {
                    r: 0,
                    g: 0,
                    b: v,
                    a: 255,
                }
            }
            5 => {
                let hue = 1.0 * iteration as f64 / max_iteration as f64;
                let saturation = 1.0;
                let value = if iteration < max_iteration {
                    1.0
                } else {
                    0.0
                };
                let hsv = HSVColor{h: hue, s: saturation, v: value};
                let rgb = self.hsv_to_rgb(hsv);
                rgb
            }
            c => panic!("Unknown color scheme {}", c),
        }
    }

    // https://github.com/rosslh/rust-mandelbrot-set/blob/23ecc4c3208921c814f3abe573df2358a372b179/mandelbrot/src/lib.rs#L79
    fn map_coordinates(&self, x: f64, y: f64, z: f64, tile_size: usize) -> Complex64 {
        let scale_factor = tile_size as f64 / 128.5;
        let d: f64 = 2.0f64.powf(z - 2.0);
        let re = x / d * scale_factor - 4.0;
        let im = y / d * scale_factor - 4.0;
        Complex64 { re, im }
    }

    fn get_escape_iteration(&self, re: f64, im: f64, max_iteration: u32, c: Complex64, exponent: f64) -> u32 {
        let mut iteration: u32 = 0;
        let mut z = Complex64{re, im};

        // Speeding up the calculations if the exponent is 2, because we dont need powf()
        if exponent == 2.0{ 
            while iteration < max_iteration && z.re * z.re + z.im * z.im <= 4.0
            {
                let temp: f64 = z.re * z.re - z.im * z.im + c.re;
                z.im = 2.0 * z.re * z.im + c.im;
                z.re = temp;
                iteration += 1;
            }
            iteration
        } else { 
    
            while iteration < max_iteration && z.norm() <= 2.0 {
                z = z.powf(exponent) + c;
                iteration += 1;
            }
    
            if iteration == max_iteration{
                return iteration
            }
    
            (iteration as f64 + 1.0 - ((z.re * z.re + z.im * z.im).log2() as f64).log10()) as u32
         } 
    }

    pub fn get_tile(
        &self,
        x: f64,
        y: f64,
        z: f64,
        max_iteration: u32,
        tile_size: usize,
        theme_id: usize,
        fractal_id: usize,
        julia_real: f64,
        julia_imag: f64,
        exponent: f64,
    ) -> Vec<u8> {
        let mut image_data: Vec<u8> = vec![0; (tile_size * tile_size * 4) as usize];

        // map leaflet coordinates to complex plane
        let min: Complex64 = self.map_coordinates(x, y, z, tile_size);
        let max: Complex64 = self.map_coordinates(x + 1.0, y + 1.0, z, tile_size);

        // vectors which contain tile_size items between (re and im) min and (re and im) max
        let re_range = linspace(min.re, max.re, tile_size);
        let im_range = linspace(min.im, max.im, tile_size);

        for (px, c_re) in re_range.enumerate() {
            for (py, c_im) in im_range.clone().enumerate() {

                let c: Complex64 = if fractal_id == 1 { // If its the Julia Set
                    Complex64{re: julia_real, im: julia_imag}
                } else {
                    Complex64{re: c_re, im: c_im}
                };

        
                let iteration = self.get_escape_iteration(c_re, c_im, max_iteration, c, exponent);

                let pixel: u32 = 4 * (px + (py * tile_size as usize)) as u32;
                let color: RGBAColor = self.get_color(theme_id, iteration, max_iteration);

                image_data[pixel as usize] = color.r;
                image_data[(pixel + 1) as usize] = color.g;
                image_data[(pixel + 2) as usize] = color.b;
                image_data[(pixel + 3) as usize] = color.a;
            }
        }
        image_data
    }

    // https://stackoverflow.com/a/17243070/13652624
    fn hsv_to_rgb(&self, hsv: HSVColor) -> RGBAColor{
        let r;
        let g;
        let b;
        
        let i = (hsv.h * 6.0).floor();
        let f = hsv.h * 6.0 - i;
        let p = hsv.v * (1.0 - hsv.s);
        let q = hsv.v * (1.0 - f * hsv.s);
        let t = hsv.v * (1.0 - (1.0 - f) * hsv.s);
    
        match (i as i32) % 6{
            0 => {
                r = hsv.v; g = t; b = p;
            }
            1 => {
                r = q; g = hsv.v; b = p;
            }
            2 => {
                r = p; g = hsv.v; b = t;
            }
            3 => {
                r = p; g = q; b = hsv.v;
            }
            4 => {
                r = t; g = p; b = hsv.v;
            }
            5 => {
                r = hsv.v; g = p; b = q;
            }
            _ => {panic!("ISSUE WHEN CONVERTING")}          
        }
    
        RGBAColor{r:(r * 255.0) as u8,g: (g * 255.0) as u8,b: (b * 255.0) as u8, a: 255}
    }

    pub fn set_cen_r(&mut self, val: f64) {
        self.cen_r *= val;
    }

    pub fn set_cen_i(&mut self, val: f64) {
        if self.cen_i == 0.0 {
            self.cen_i = 0.1;
        } else {
            self.cen_i *= val;
        }
    }

    pub fn set_range_r(&mut self, val: f64) {
        self.range_r *= val;
    }

    pub fn set_range_i(&mut self, val: f64) {
        self.range_i *= val;
    }

    pub fn get_range_r(&self) -> f64 {
        return self.cen_i;
    }
}

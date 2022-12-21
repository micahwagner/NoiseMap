import NoiseMap from "../noise_map.js"

var screen_res = 500;

let foo = new NoiseMap(screen_res, 2, "silly");
let bar = new NoiseMap(screen_res, 10,"noise");
let mgoy = new NoiseMap(screen_res, 20,  "map");
let baz = new NoiseMap(screen_res, 45, "seed");

bar.generate();
mgoy.generate();
baz.generate();
foo.generate().add_octave(bar, 0.2).add_octave(mgoy, 0.1).add_octave(baz, 0.035);


let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.width = screen_res;
canvas.height = screen_res;

let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

function draw() {
  
  for(var y = 0; y < screen_res; y++) {
    for(var x = 0; x < screen_res; x++) {
      
      var height = (foo.map[y][x]+1)/2;

      if(height > 0.625) {
        pixels[(x + y*screen_res)*4] = 245 * height * 1.5;
        pixels[(x + y*screen_res)*4 + 1] = 245 * height * 1.5;
        pixels[(x + y*screen_res)*4 + 2] = 245 * height * 1.5;
        pixels[(x + y*screen_res)*4 + 3] = 255;
      } else if(height > 0.575){
        pixels[(x + y*screen_res)*4] = 130 * height * 2;
        pixels[(x + y*screen_res)*4 + 1] = 130 * height * 2;
        pixels[(x + y*screen_res)*4 + 2] = 130 * height * 2;
        pixels[(x + y*screen_res)*4 + 3] = 255;
      } else if(height > 0.5) {
        pixels[(x + y*screen_res)*4] = 30 * height * 2;
        pixels[(x + y*screen_res)*4 + 1] = 180 * height * 2;
        pixels[(x + y*screen_res)*4 + 2] = 30 * height * 2;
        pixels[(x + y*screen_res)*4 + 3] = 255;
      } else if(height > 0.48) {
        pixels[(x + y*screen_res)*4] = 220 * height * 2;
        pixels[(x + y*screen_res)*4 + 1] = 220 * height * 2;
        pixels[(x + y*screen_res)*4 + 2] = 80 * height * 2;
        pixels[(x + y*screen_res)*4 + 3] = 255;
      } else if(height > 0.42){
        pixels[(x + y*screen_res)*4] = 60 * height * 2;
        pixels[(x + y*screen_res)*4 + 1] = 180 * height * 2;
        pixels[(x + y*screen_res)*4 + 2] = 240 * height * 2;
        pixels[(x + y*screen_res)*4 + 3] = 255;
      } else {
        pixels[(x + y*screen_res)*4] = 40 * height * 2;
        pixels[(x + y*screen_res)*4 + 1] = 125 * height * 2;
        pixels[(x + y*screen_res)*4 + 2] = 185 * height * 2;
        pixels[(x + y*screen_res)*4 + 3] = 255;
      }
    }
  }

  ctx.putImageData(new ImageData(pixels, canvas.width), 0, 0);
}

draw();
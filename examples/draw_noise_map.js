import NoiseMap from "../noise_map.js"

var screen_res = 600;


let foo = new NoiseMap(screen_res, 2, "silly");
let bar = new NoiseMap(screen_res, 10,"noise");
let mgoy = new NoiseMap(screen_res, 20, "map");
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
      
      pixels[(x + y*screen_res)*4] = height * 255;
      pixels[(x + y*screen_res)*4 + 1] = height * 255;
      pixels[(x + y*screen_res)*4 + 2] = height * 255;
      pixels[(x + y*screen_res)*4 + 3] = 255;
    }
  }
  ctx.putImageData(new ImageData(pixels, canvas.width), 0, 0);
}

draw();
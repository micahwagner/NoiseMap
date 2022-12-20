import NoiseMap from "../noise_map.js"

var screen_width = 600;
var screen_height = 600;

let foo = new NoiseMap(screen_width,screen_height,  2, "silly");
let bar = new NoiseMap(screen_width,screen_height, 10, "noise");
let mgoy = new NoiseMap(screen_width,screen_height, 20, "map");
let baz = new NoiseMap(screen_width,screen_height, 45, "seed");

bar.generate(0,0);
mgoy.generate(0, 0);
baz.generate(0, 0);
foo.generate(0, 0).add_octave(bar, 0.2).add_octave(mgoy, 0.1).add_octave(baz, 0.035);


let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.width = screen_width;
canvas.height = screen_height;

let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

function draw() {
  
  for(var y = 0; y < screen_height; y++) {
    for(var x = 0; x < screen_width; x++) {
      
      var height = (foo.map[x][y]+1)/2;
      
      pixels[(x + y*screen_width)*4] = height * 255;
      pixels[(x + y*screen_width)*4 + 1] = height * 255;
      pixels[(x + y*screen_width)*4 + 2] = height * 255;
      pixels[(x + y*screen_width)*4 + 3] = 255;
    }
  }

  ctx.putImageData(new ImageData(pixels, canvas.width), 0, 0);
}

draw();
import PerlinNoise from "./perlin.js"

export default class NoiseMap {
  constructor(screen_res, g_res, seed) {
    this.screen_res = screen_res;
    this.g_res = g_res;
    this.seed = seed;
    this.perlin = new PerlinNoise(this.seed);
    this.map = [];
  }
  
  generate() {
    
    var tmp = [];
    this.map = [];
    
    for(var y = 0; y < this.screen_res; y++) {
      for(var x = 0; x < this.screen_res; x++) { 
        var noise_val = this.perlin.get((x * this.g_res/this.screen_res), (y * this.g_res/this.screen_res));
        tmp.push(noise_val);
      }
      this.map.push(tmp);
      tmp = [];
    }
    
    return this;
  }
  
  //expects noise_map to have the same dimensions as this.screen_width and this.screen_height
  add_octave(noise_map, bias) {  
    for(var y = 0; y < this.screen_res; y++) {
      for(var x = 0; x < this.screen_res; x++) {
      	var new_x = this.screen_res / noise_map.screen_res * x;
      	var new_y = this.screen_res / noise_map.screen_res * y;
        this.map[y][x] = this.map[y][x] * (1-bias) + noise_map.map[new_y][new_x] * (bias);
      }
    }
    
    return this;
  }
  
  
}
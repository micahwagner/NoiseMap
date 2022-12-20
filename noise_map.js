import PerlinNoise from "./perlin.js"

export default class NoiseMap {
  constructor(screen_width, screen_height, res, seed) {
    this.screen_width = screen_width;
    this.screen_height = screen_height;
    this.res = res;
    this.seed = seed;
    this.perlin = new PerlinNoise(this.seed);
    this.map = [];
  }
  
  generate(g_offset_x, g_offset_y) {
    
    var tmp = [];
    this.map = [];
    
    for(var y = 0; y < this.screen_height; y++) {
      for(var x = 0; x < this.screen_width; x++) { 
        var noise_val = this.perlin.get((x * this.res/this.screen_width) + g_offset_x, (y * this.res/this.screen_height) + g_offset_y);
        tmp.push(noise_val);
      }
      this.map.push(tmp);
      tmp = [];
    }
    
    return this;
  }
  
  //expects noise_map to have the same dimensions as this.screen_width and this.screen_height
  add_octave(noise_map, bias) {  
    for(var y = 0; y < this.screen_height; y++) {
      for(var x = 0; x < this.screen_width; x++) { 
        this.map[x][y] = this.map[x][y] * (1-bias) + noise_map.map[x][y] * (bias);
      }
    }
    
    return this;
  }
  
  
}
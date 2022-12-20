import seed_rng from "./seedRNG.js"

export default class PerlinNoise {
  
  #random_number;
  
  constructor(seed) {
    this.seed = seed;
    this.gvecs = {};
    this.#random_number = seed_rng.SimpleFastCounter32(seed_rng.MurmurHash3(this.seed)(),seed_rng.MurmurHash3(this.seed)());
  } 
  
  #generate_gvec(x, y) {

    let theta = this.#random_number() * 2 * Math.PI;
    
    if (this.gvecs[[x,y]]){
            return this.gvecs[[x,y]];
        } else {
            this.gvecs[[x, y]] = {
              x: Math.cos(theta), 
              y: Math.sin(theta)
            };
        }
    
    return this.gvecs[[x,y]];
  }

  get(x, y) {
    
      var top_L_x = Math.floor(x);
      var top_L_y = Math.floor(y);
      
      var top_R_x = top_L_x + 1;
      var top_R_y = top_L_y;
      
      var bottom_L_x = top_L_x;
      var bottom_L_y = top_L_y + 1;
      
      var bottom_R_x = top_L_x + 1;
      var bottom_R_y = top_L_y + 1;

      var top_L_g = this.#generate_gvec(top_L_x, top_L_y);
      var top_R_g = this.#generate_gvec(top_R_x, top_R_y);
      var bottom_L_g = this.#generate_gvec(bottom_L_x, bottom_L_y);
      var bottom_R_g = this.#generate_gvec(bottom_R_x, bottom_R_y);
      
      var btw_top_L = {
        x: x - top_L_x, 
        y: y - top_L_y
      };
      var btw_top_R = {
        x: x - top_R_x, 
        y: y - top_R_y
      };
      var btw_bottom_L = {
        x: x - bottom_L_x, 
        y: y - bottom_L_y
      };
      var btw_bottom_R = {
        x: x - bottom_R_x, 
        y: y - bottom_R_y
      };
      
      var top_L_dot = top_L_g.x * btw_top_L.x + top_L_g.y * btw_top_L.y;
      var top_R_dot = top_R_g.x * btw_top_R.x + top_R_g.y * btw_top_R.y;
      var bottom_L_dot = bottom_L_g.x * btw_bottom_L.x + bottom_L_g.y * btw_bottom_L.y;
      var bottom_R_dot = bottom_R_g.x * btw_bottom_R.x + bottom_R_g.y * btw_bottom_R.y;
      
      var Sx = this.#ease_curve(x - top_L_x);
      var a = bottom_L_dot + Sx*(bottom_R_dot - bottom_L_dot);
      var b = top_L_dot + Sx * (top_R_dot - top_L_dot);
      
      var Sy = this.#ease_curve(y - top_L_y);
      var final_val = b + Sy * (a - b);
    
      return final_val;
  }

  #ease_curve(x) {
    return 6*x**5 - 15*x**4 + 10*x**3;
  }
  
}


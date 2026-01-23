export interface Bullet {
  x: number;
  z: number;
  angle: number;
  speed: number;
}

export interface Enemy {
  x: number;
  z: number;
  health: number;
  angle: number;
  state: 'idle' | 'chase' | 'shoot';
  shootCooldown: number;
}

export interface Tree {
  x: number;
  z: number;
  type: number;
}

export interface Building {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  type: 'normal' | 'tower' | 'asian' | 'ruins';
  roofColor?: string;
}

export interface Stair {
  x: number;
  z: number;
  width: number;
  steps: number;
}

export interface Plaza {
  x: number;
  z: number;
  size: number;
}

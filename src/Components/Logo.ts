import * as PIXI from 'pixi.js-legacy';
import viteLogo from '../vite.svg';

export class Logo {
  public app: PIXI.Application;
  public logo?: PIXI.Sprite;

  constructor(app: PIXI.Application) {
    this.app = app;
  }

  public tick() {
    // this.logo!.rotation += 0.01;
  }

  public async create(x: number, y: number) {
    const texture = await PIXI.Assets.load(viteLogo);
    // This creates a texture from a 'bunny.png' image
    this.logo = new PIXI.Sprite(texture);

    // this.logo.width = 15;
    // this.logo.height = 200;

    // Setup the position of the bunny
    this.logo.x = x;
    this.logo.y = y;

    // logo.x = 10;
    // logo.y = 10;

    // Rotate around the center
    this.logo.anchor.x = 0.5;
    this.logo.anchor.y = 0.5;
    this.app.stage.addChild(this.logo);

    // // Listen for frame updates
    // this.app.ticker.add(() => {
    //   // each frame we spin the bunny around a bit
    //   this.logo!.rotation += 0.01;
    // });

    return this;
  }
}

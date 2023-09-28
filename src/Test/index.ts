import * as PIXI from 'pixi.js-legacy';
import { ScreenVersion } from './types';
import { TweenManager } from './Tween.js';
import { Tank } from '../Components/Tank';

import { assetsMap } from './assetsMap';

declare global {
  interface Window {
    RECTANGLE: PIXI.Graphics;
  }
}

type TestType = {
  canvasWrapper: HTMLDivElement;
};

export class App {
  public app: PIXI.Application | null = null;
  public canvasWrapper: HTMLDivElement;
  public screenSize = ScreenVersion.DESKTOP || ScreenVersion.MOBILE;

  constructor(canvasWrapper: HTMLDivElement) {
    this.canvasWrapper = canvasWrapper;
    this.loadImages().then(() => this.createApp());
  }

  private createApp = async () => {
    if (this.app) {
      this.destroy();
    }

    this.app = new PIXI.Application({
      background: '#1099bb',
      width: 800,
      height: 800,
    });

    const marker = new PIXI.Graphics();
    marker.beginFill(0xff0000, 1);
    marker.drawCircle(0, 0, 5);
    marker.endFill();

    const tank = new Tank();
    this.app.stage.addChild(tank.view);
    this.app.stage.addChild(marker);
    this.app.stage.position.set(800 / 2, 800 / 2);

    const tweenManager = new TweenManager(this.app.ticker);

    const moveTank = (e: PIXI.FederatedPointerEvent) => {
      console.log(e);
      const distanceToCenter = e.getLocalPosition(this.app!.stage);
      const distanceToTank = e.getLocalPosition(tank.view);
      const angle = Math.atan2(distanceToTank.y, distanceToTank.x);

      let callAmount = 2;

      const move = () => {
        callAmount -= 1;
        if (callAmount <= 0) {
          tweenManager.createTween(
            tank,
            3000,
            {
              x: distanceToCenter.x,
              y: distanceToCenter.y,
            },
            {
              onStart() {
                tank.startTracks();
              },
              onFinish() {
                tank.stopTracks();
              },
            },
          );
        }
      };

      tweenManager.createTween(
        tank,
        1000,
        { towerDirection: angle },
        {
          onFinish() {
            move();
          },
        },
      );
      tweenManager.createTween(
        tank,
        2000,
        { bodyDirection: angle },
        {
          onStart() {
            tank.startTracks();
          },
          onFinish() {
            tank.stopTracks();
            move();
          },
        },
      );
    };

    this.app.stage.on('pointerdown', moveTank, this);
    this.app.stage.eventMode = 'dynamic';
    this.app.stage.interactiveChildren = false;
    this.app.stage.hitArea = new PIXI.Rectangle(-400, -400, 800, 800);

    this.canvasWrapper.appendChild(this.app.view as HTMLCanvasElement);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    globalThis.__PIXI_APP__ = this.app;
  };

  private loadImages = async () => {
    const bundle = assetsMap.sprites.reduce((acc, sprite) => {
      acc[sprite.name] = sprite.url;
      return acc;
    }, {} as Record<string, string>);

    PIXI.Assets.addBundle('tankDetails', bundle);

    await PIXI.Assets.loadBundle('tankDetails');
  };

  public destroy = () => {
    this.app?.destroy(true, { baseTexture: true, children: true });
  };
}

export class Test {
  public app: App;

  constructor({ canvasWrapper }: TestType) {
    this.app = new App(canvasWrapper);
  }

  destroy = () => {
    this.app.destroy();
  };
}

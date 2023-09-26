import {
  AnimatedSprite,
  Assets,
  Container,
  Resource,
  Sprite,
  SpriteSource,
  Texture,
} from 'pixi.js-legacy';

export const createAnimatedSprite = (
  textures: Texture<Resource>[],
  position = { x: 0, y: 0 },
  anchor = { x: 0.5, y: 0.5 },
) => {
  const animatedSprite = new AnimatedSprite(textures);
  animatedSprite.position.copyFrom(position);
  animatedSprite.anchor.copyFrom(anchor);
  return animatedSprite;
};

export const createSprite = (
  texture: SpriteSource,
  position = { x: 0, y: 0 },
  anchor = { x: 0.5, y: 0.5 },
) => {
  const sprite = Sprite.from(texture);
  sprite.position.copyFrom(position);
  sprite.anchor.copyFrom(anchor);

  return sprite;
};

export const getTexture = (name: string) => {
  const texture: Texture<Resource> = Assets.get(name);
  return texture;
};

export class Tank {
  private _view: Container;
  private _towerContainer: Container;
  private _bodyContainer: Container;

  private _trackLeft: AnimatedSprite;
  private _trackRight: AnimatedSprite;
  private _hull: Sprite;

  constructor() {
    this._view = new Container();

    this._bodyContainer = new Container();

    this._view.addChild(this._bodyContainer);

    this._trackLeft = createAnimatedSprite(
      [getTexture('TrackСFrame1'), getTexture('TrackСFrame2')],
      {
        x: 0,
        y: -80,
      },
    );
    this._trackLeft.animationSpeed = 0.25;

    this._trackRight = createAnimatedSprite(
      [getTexture('TrackСFrame1'), getTexture('TrackСFrame2')],
      {
        x: 0,
        y: 80,
      },
    );
    this._trackRight.animationSpeed = 0.25;

    this._hull = createSprite(getTexture('HeavyHullB'));

    this._bodyContainer.addChild(this._trackLeft, this._trackRight, this._hull);

    this._towerContainer = new Container();

    this._view.addChild(this._towerContainer);

    this._towerContainer.addChild(
      createSprite(getTexture('HeavyGunB'), {
        x: 140,
        y: -27,
      }),
      createSprite(getTexture('HeavyGunB'), {
        x: 160,
        y: 29,
      }),
    );

    this._towerContainer.addChild(
      createSprite(getTexture('GunConnectorD'), { x: 80, y: 0 }),
    );
    this._towerContainer.addChild(createSprite(getTexture('HeavyTowerB')));
  }

  get view() {
    return this._view;
  }

  rotateTowerBy(angle: number) {
    this._towerContainer.rotation += angle;
  }

  rotateBodyBy(angle: number) {
    this._bodyContainer.rotation += angle;
  }

  startTracks() {
    this._trackRight.play();
    this._trackLeft.play();
  }

  stopTracks() {
    this._trackRight.stop();
    this._trackLeft.stop();
  }
}

import * as PIXI from 'pixi.js'; // Импортируйте модуль pixi.js или его эквивалент, если необходимо

interface TestTweens {
  moveTo(duration: number, position: PIXI.Point): void;
  rotateTo(duration: number, rotationData: { rotation: number }): void; // Изменено на { rotation: number }
  moveAndRotate(
    moveDuration: number,
    position: PIXI.Point,
    rotationDuration: number,
    rotationData: { rotation: number },
  ): void;
}

declare global {
  interface Window {
    testTweens: TestTweens;
  }
}

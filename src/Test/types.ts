export enum ScreenVersion {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

export const screenSizes = {
  [ScreenVersion.MOBILE]: {
    width: 640,
    height: 500,
    breakpoint: 640,
  },
  [ScreenVersion.DESKTOP]: {
    width: 1920,
    height: 600,
    breakpoint: 1920,
  },
};

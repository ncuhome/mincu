// Type definitions for react-native-orientation 5.0
// Project: https://github.com/yamill/react-native-orientation
// Definitions by: Moshe Atlow <https://github.com/MoLow>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export namespace Orientation {
  type orientation = 'LANDSCAPE' | 'PORTRAIT' | 'UNKNOWN' | 'PORTRAITUPSIDEDOWN'
  type specificOrientation =
    | 'LANDSCAPE-LEFT'
    | 'LANDSCAPE-RIGHT'
    | 'PORTRAIT'
    | 'UNKNOWN'
    | 'PORTRAITUPSIDEDOWN'

  export declare function addOrientationListener(
    callback: (orientation: orientation) => void
  ): void
  export declare function removeOrientationListener(
    callback: (orientation: orientation) => void
  ): void
  export declare function addSpecificOrientationListener(
    callback: (specificOrientation: specificOrientation) => void
  ): void
  export declare function removeSpecificOrientationListener(
    callback: (specificOrientation: specificOrientation) => void
  ): void

  export declare function getInitialOrientation(): orientation
  export declare function lockToPortrait(): void
  export declare function lockToLandscape(): void
  export declare function lockToLandscapeLeft(): void
  export declare function lockToLandscapeRight(): void
  export declare function unlockAllOrientations(): void
  export declare function getOrientation(
    callback: (err: Error, orientation: orientation) => void
  ): void
  export declare function getSpecificOrientation(
    callback: (err: Error, orientation: specificOrientation) => void
  ): void
}

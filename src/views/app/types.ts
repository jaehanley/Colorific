import { Color } from 'chroma-js';

export interface ISwatchProps {
  foreground: Color;
  background: Color;
}

export interface IAppState extends ISwatchProps {
  swatches: Array<ISwatchProps>;
}
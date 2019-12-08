import { Color } from 'chroma-js';

export interface ISwatchProps {
  /** The foreground color for the color swatch */
  foreground: Color;
  /** The background color for the color swatch */
  background: Color;
  /**
   * Callback for when the color swatch has been clicked
   * @param foreground chroma-js value for the foreground
   * @param background chroma-js value for the background
   */
  onClick: (foreground: Color, background: Color) => void;
}
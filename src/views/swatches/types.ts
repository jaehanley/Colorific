import { Color } from 'chroma-js';

export interface ISwatchItemProps {
  /** The foreground color of the swatch */
  foreground: Color;
  /** The background color of the swatch */
  background: Color;
}

export interface ISwatchesProps {
  /** The current foreground color */
  foreground: Color,
  /** The current background color */
  background: Color,
  /** An array of saved swatch color values */
  swatches: Array<ISwatchItemProps>;
  /**
   * Callback for when a swatch has been clicked to be active
   * @param foreground A chroma object representing the foreground of the swatch
   * @param background A chroma object representing the background of the swatch
   */
  onSwatchClick: (foreground: Color, background: Color) => void;
  /**
   * Callback for when a swatch has been added to the saved swatch array
   * @param foreground A chroma object representing the new swatch's foreground color
   * @param background A chroma object representing the new swatch's background color
   */
  onAddSwatch: (foreground: Color, background: Color) => void;
  /**
   * Callback for when a swatch has been removed from the saved swatch array
   * @param index the index number of the swatch to be removed from the array
   */
  onRemoveSwatch: (index: number) => void;
}
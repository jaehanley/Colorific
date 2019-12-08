import { Color } from 'chroma-js';

export interface IColorInputProps {
  /** The label used for the button input */
  label: string;
  /**  Color chroma-js object */
  color: Color;
  /**
   * Callback to set the color
   * @param color a Chroma-js color object
   */
  onChange: (color: Color) => void;
}

export interface IColorInputState {
  showColorPicker: boolean;
}
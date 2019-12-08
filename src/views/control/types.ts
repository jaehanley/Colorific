import { Color } from 'chroma-js';

export interface IControlProps {
  /** Foreground color chroma-js object */
  foreground: Color;
  /** Background color chroma-js object */
  background: Color;
  /**
   * Sets the foreground color
   * @param foreground chroma-js color object
   */
  onSetForeground: (foreground: Color) => void;
  /**
   * Sets the background color
   * @param background chroma-js color object
   */
  onSetBackground: (background: Color) => void;
  /** callback to swap the foreground and background colors */
  onSwapColors: () => void;
}
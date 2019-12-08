/**
 * Returns a processed color
 * @param color any valid css color string
 * @param returnRgb determines if the returned value is an RGB, defaults to false
 */
type TBlinderFunc = (color: string, returnRgb?: boolean) => string;

declare module 'color-blind' {
  interface IBlinder {
    /** Returns colors with protanomaly color blindness */
    public protanomaly: TBlinderFunc,
    /** Returns colors with deuteranomaly color blindness */
    public deuteranomaly: TBlinderFunc,
    /** Returns colors with tritanomaly colßor blindness */
    public tritanomaly: TBlinderFunc,
    /** Returns colors with protanopia color blindness */
    public protanopia: TBlinderFunc,
    /** Returns colors with deuteranopia color blindess */
    public deuteranopia: TBlinderFunc,
    /** Returns colors with tritanopia color blindness */
    public tritanopia: TBlinderFunc,
    /** Returns colors with achromatomaly color blindness */
    public achromatomaly: TBlinderFunc,
    /** Returns colors with achromatopasia colßor blindness */
    public achromatopsia: TBlinderFunc
  }

  const blind: IBlinder;
  export = blind
}
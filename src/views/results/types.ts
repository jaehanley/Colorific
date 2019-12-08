import { Color } from 'chroma-js';

export interface IResultsProps {
  foreground: Color;
  background: Color;
};

export interface IResultViewProps extends IResultsProps {
  label: string;
}

export enum Ranking {
  AAA = 'AAA',
  AA = 'AA',
  AALarge = 'AA Large',
  Fail = 'Fail'
};

export enum Explainer {
  AAA = 'These colors compensate for the loss in contrast sensitivity usually experienced by users with vision loss equivalent to approximately 20/80 vision.',
  AA = 'These colors compensate for the loss in contrast sensitivity usually experienced by users with vision loss equivalent to approximately 20/40 vision',
  AALarge = 'These colors reach the minimum contrast sensitivity requirements for individuals with 20/40 vision',
  Fail = 'These colors fail to reach the minium requirements for contrast sensitivity'
}

export enum BlindTypes {
  Protanomaly = 'Protanomaly',
  Deuteranomaly = 'Deuteranomaly',
  Tritanomaly = 'Tritanomaly',
  Protanopia = 'Protanopia',
  Deuteranopia = 'Deuteranopia',
  Tritanopia = 'Tritanopia',
  Achromatomaly = 'Achromatomaly',
  Achromatopsia = 'Achromatopsia'
}
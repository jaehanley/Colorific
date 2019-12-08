import React from 'react';
import Chroma, { contrast } from 'chroma-js';
import blind from 'color-blind';
import styles from './styles.module.css';
import {
  IResultsProps, IResultViewProps, Ranking, BlindTypes } from './types';

const ResultView = (props: IResultViewProps) => {
  const contrastRating = contrast(props.foreground, props.background);
  const rank: Ranking = contrastRating >= 7
    ? Ranking.AAA
    : contrastRating >= 4.5
      ? Ranking.AA
      : contrastRating >= 3
        ? Ranking.AALarge
        : Ranking.Fail
  return (
    <div
      className={styles.resultView}
      style={{
        backgroundColor: props.background.hex(),
        color: props.foreground.hex()
      }}
    >
      <h4
        className={styles.perceptionLabel}
        aria-label='color perception'
        style={{
          color: contrast('#000', props.background) >= contrast('#fff', props.background)
            ? '#000'
            : '#fff'
        }}
      >
        {props.label}
      </h4>
      <div className={styles.contrastContainer}>
        <b
          className={styles.contrastRating}
          aria-label='accessibility rating'
        >
          {rank}
        </b>
        <i
          className={styles.contrastRatio}
          aria-label={`contrast ratio: ${contrastRating.toFixed(3)} to 1`}
        >
          {contrastRating.toFixed(3)}:1
        </i>
      </div>
    </div>
  );
}
const Common = (props: IResultsProps) => (
  <ResultView
    label='Common'
    foreground={props.foreground}
    background={props.background}
  />
);

const Protanomaly = (props: IResultsProps) => (
  <ResultView
    label={BlindTypes.Protanomaly}
    foreground={Chroma(blind.protanomaly(props.foreground.hex()))}
    background={Chroma(blind.protanomaly(props.background.hex()))}
  />
);

const Deuteranomaly = (props: IResultsProps) => (
  <ResultView
    label={BlindTypes.Deuteranomaly}
    foreground={Chroma(blind.deuteranomaly(props.foreground.hex()))}
    background={Chroma(blind.deuteranomaly(props.background.hex()))}
  />
);

const Tritanomaly = (props: IResultsProps) => (
  <ResultView
    label={BlindTypes.Tritanomaly}
    foreground={Chroma(blind.tritanomaly(props.foreground.hex()))}
    background={Chroma(blind.tritanomaly(props.background.hex()))}
  />
);

const Protanopia = (props: IResultsProps) => (
  <ResultView
    label={BlindTypes.Protanopia}
    foreground={Chroma(blind.protanopia(props.foreground.hex()))}
    background={Chroma(blind.protanopia(props.background.hex()))}
  />
);

const Deuteranopia = (props: IResultsProps) => (
  <ResultView
    label={BlindTypes.Deuteranopia}
    foreground={Chroma(blind.deuteranopia(props.foreground.hex()))}
    background={Chroma(blind.deuteranopia(props.background.hex()))}
  />
);

const Tritanopia = (props: IResultsProps) => (
  <ResultView
    label={BlindTypes.Tritanopia}
    foreground={Chroma(blind.tritanopia(props.foreground.hex()))}
    background={Chroma(blind.tritanopia(props.background.hex()))}
  />
);

const Achromatomaly = (props: IResultsProps) => (
  <ResultView
    label={BlindTypes.Achromatomaly}
    foreground={Chroma(blind.achromatomaly(props.foreground.hex()))}
    background={Chroma(blind.achromatomaly(props.background.hex()))}
  />
);

const Achromatopsia = (props: IResultsProps) => (
  <ResultView
    label={BlindTypes.Achromatopsia}
    foreground={Chroma(blind.achromatopsia(props.foreground.hex()))}
    background={Chroma(blind.achromatopsia(props.background.hex()))}
  />
);

const Results = (props: IResultsProps) => (
  <div className={styles.view}>
    <Common
      foreground={props.foreground}
      background={props.background}
    />
    <div className={styles.threeRows}>
      <Protanomaly
        foreground={props.foreground}
        background={props.background}
      />
      <Deuteranomaly
        foreground={props.foreground}
        background={props.background}
      />
      <Tritanomaly
        foreground={props.foreground}
        background={props.background}
      />
    </div>
    <div className={styles.threeRows}>
      <Protanopia
        foreground={props.foreground}
        background={props.background}
      />
      <Deuteranopia
        foreground={props.foreground}
        background={props.background}
      />
      <Tritanopia
        foreground={props.foreground}
        background={props.background}
      />
    </div>
    <div className={styles.twoRows}>
      <Achromatomaly
        foreground={props.foreground}
        background={props.background}
      />
      <Achromatopsia
        foreground={props.foreground}
        background={props.background}
      />
    </div>
  </div>
);

export default Results;

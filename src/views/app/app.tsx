import React, { Component } from 'react';
import Chroma, { Color, contrast } from 'chroma-js';
import Results from '../results/results';
import Control from '../control/control';
import Swatches from '../swatches/swatches';
import styles from './styles.module.css';
import { IAppState } from './types';

const defaultToDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultLight = Chroma('#fbffef');
const defaultDark = Chroma('#030120');


export default class App extends Component<{}, IAppState> {
  state: IAppState = {
    foreground: defaultToDark ? defaultLight : defaultDark,
    background: defaultToDark ? defaultDark : defaultLight,
    swatches: []
  }

  /**
   * Updates local storage with swatch array values
   */
  private updateLocalStorage = () => {
    localStorage.setItem('swatches', JSON.stringify(
      this.state.swatches.map(swatch => ({
        foreground: swatch.foreground.hex(),
        background: swatch.background.hex()
      }))
    ));
  }

  /**
   * Retrieves saved swatches from local storage,
   * parses and sets them to swatches in state
   */
  private setSwatchesFromLocalStorage = () => {
    const savedSwatches = localStorage.getItem('swatches');
    if (savedSwatches) {
      interface unprocessedSwatch {
        foreground: string;
        background: string;
      }
      const parsedSwatches = JSON.parse(savedSwatches) as Array<unprocessedSwatch>;
      const swatches = parsedSwatches.map(swatch => ({
        foreground: Chroma(swatch.foreground),
        background: Chroma(swatch.background)
      }));
      this.setState({ swatches })
    }
  }

  /**
   * Updates the foreground color
   * @param foreground a Chroma color object
   */
  private setForeground = (foreground: Color) => this.setState({ foreground });

  /**
   * Updates the background color
   * @param background a Chroma color object
   */
  private setBackground = (background: Color) => this.setState({ background });

  /**
   * Swaps the foreground and background colors
   */
  private swapColors = () => this.setState({
    foreground: this.state.background,
    background: this.state.foreground,
  });

  /**
   * Sets swatch colors to the active foreground and background
   * @param foreground A chroma object representing the new foreground color
   * @param background A chroma jobject representing the new background color
   */
  private setSwatchActive = (foreground: Color, background: Color) =>
    this.setState({
      foreground,
      background
    });

  /**
   * Adds a new swatch to the saved swatches
   * @param foreground A chroma color object representing the foreground color
   * @param background A chroma color object representing the background color
   */
  private addSwatch = (foreground: Color, background: Color) =>
    this.setState({
      swatches: [
        ...this.state.swatches,
        {
          foreground,
          background
        }
      ]
    }, this.updateLocalStorage);
  
  /**
   * Removes a swatch from the array of saved swatches
   * @param index The index of the swatch item to remove
   */
  private removeSwatch = (index: number) => {
    const swatches = this.state.swatches.filter((swatch, i) => i !== index && swatch);
    this.setState({ swatches }, this.updateLocalStorage)
  }

  componentDidMount() {
    this.setSwatchesFromLocalStorage()
  }

  render() {
    return (
      <div
        className={styles.appView}
        style={{
          backgroundColor: contrast('#000', this.state.background) >= contrast('#fff', this.state.background)
            ? '#000'
            : '#fff'
        }}
      >
        <Results
          foreground={this.state.foreground}
          background={this.state.background}
        />
        <div className={styles.controllers}>
          <Control
            foreground={this.state.foreground}
            background={this.state.background}
            onSetForeground={this.setForeground}
            onSetBackground={this.setBackground}
            onSwapColors={this.swapColors}
          />
          <Swatches
            foreground={this.state.foreground}
            background={this.state.background}
            swatches={this.state.swatches}
            onSwatchClick={this.setSwatchActive}
            onAddSwatch={this.addSwatch}
            onRemoveSwatch={this.removeSwatch}
          />
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';
import classnames from 'classnames';
import AddIcon from '../../assets/add-swatch-btn.svg';
import TrashIcon from '../../assets/trash.svg';
import { ISwatchesProps } from './types';
import styles from './styles.module.css';

export default class Swatches extends Component<ISwatchesProps> {
  private swatchContainer: HTMLDivElement|undefined;
  private swatchContainerRef = (el: HTMLDivElement) => (this.swatchContainer = el);
  
  /**
   * Determine if the color combination already has a swatch set to it
   */
  private get swatchExists() {
    return this.props.swatches.filter(swatch => 
      swatch.foreground.hex() === this.props.foreground.hex() &&
      swatch.background.hex() === this.props.background.hex()
    ).length > 0;
  }

  /**
   * Callback to save a color swatch
   */
  private handleAddSwatch = () =>
    this.props.onAddSwatch(this.props.foreground, this.props.background);

  /**
   * Scrolls the swatch container to the end of the element
   */
  private scrollContainerToEnd = () => {
    if (this.swatchContainer) {
      this.swatchContainer.scrollTo(this.swatchContainer.scrollWidth, 0);
    }
  }

  /**
   * Methods to fire when the component has mounted
   */
  componentDidMount() {
    this.scrollContainerToEnd();
  }

  /**
   * Methods to fire when the component has been updated
   * @param prevProps the snapshot saves prior to props changes
   */
  componentDidUpdate(prevProps: ISwatchesProps) {
    if (prevProps.swatches.length < this.props.swatches.length) {
      this.scrollContainerToEnd();
    }
  } 

  render() {
    return (
      <div className={styles.container}>
        <div
          ref={this.swatchContainerRef}
          className={styles.swatchContainer}
        >
          {this.props.swatches.map((swatch, index) => {
            const activeSwatch = this.props.foreground.hex() === swatch.foreground.hex() &&
              this.props.background.hex() === swatch.background.hex();
            const handleSwatchClick = () => this.props.onSwatchClick(swatch.foreground, swatch.background);
            const handleSwatchDelete = () => this.props.onRemoveSwatch(index);
            return (
              <div
                key={`${swatch.foreground.hex()}-${swatch.background.hex()}`}
                className={classnames(
                  styles.swatch,
                  activeSwatch && styles.active
                )}
              >
                <button
                  disabled={activeSwatch}
                  className={styles.background}
                  onClick={handleSwatchClick}
                  style={{
                    background: swatch.background.hex()
                  }}
                >
                  <div
                    className={styles.foreground}
                    style={{
                      borderColor: `transparent ${swatch.foreground.hex()} transparent transparent`
                    }}
                  />
                </button>
                <div className={styles.deleteContainer}>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleSwatchDelete}
                  >
                    <img
                      alt="Remove swatch"
                      src={TrashIcon}
                    />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <button
          disabled={this.swatchExists}
          className={styles.addBtn}
          onClick={this.handleAddSwatch}
        >
          <img
            alt='Save swatch'
            src={AddIcon}
          />
        </button>
      </div>
    );
  }
}
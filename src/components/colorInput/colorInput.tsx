import React, { Component} from 'react';
import {
  CustomPicker,
  CustomPickerProps,
  ColorResult
} from 'react-color';
import {
  EditableInput,
  Hue,
  Saturation
} from 'react-color/lib/components/common';
import Chroma from 'chroma-js';
import styles from './styles.module.css';
import { IColorInputProps, IColorInputState } from './types';

const CustomHuePointer = () =>
  <div className={styles.huePickerCircle} />

const CustomSaturationPointer = () =>
  <div className={styles.saturationPickerCircle} />

const ColorPickerComponent = (props: CustomPickerProps<HTMLDivElement>) => {
  return (
    <div className={styles.pickerView}>
      <div className={styles.colorInputContainer}>
        <div className={styles.saturationContainer}>
          <Saturation
            {...(props as any)}
            pointer={CustomSaturationPointer}
          />
        </div>
        <div className={styles.hueContainer}>
          <Hue
            {...(props as any)}
            pointer={CustomHuePointer}
          />
        </div>
        <div className={styles.colorTextInputContainer}>
          <EditableInput
            {...(props as any)}
            label={null}
            value={props.color}
            style={{
              input: {
                fontSize: '16px',
                lineHeight: '20px',
                width: '100%',
                padding: '5px'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

const ColorPicker = CustomPicker(ColorPickerComponent);

export default class ColorInput extends Component<IColorInputProps, IColorInputState> {
  state = {
    showColorPicker: false
  }

  /**
   * Ref for div containing the react color picker
   */
  private pickerContainerElem: HTMLDivElement | undefined;
  /**
   * Function for setting the picker container ref
   */
  private pickerContainerElemRef = (elem: HTMLDivElement) => (
    this.pickerContainerElem = elem
  );

  /**
   * Toggles if the color picker is visible,
   * Adds or removes event handler for outside of div clicks
   */
  private toggleShowPicker = () => this.setState({
    showColorPicker: !this.state.showColorPicker
  }, () => setTimeout(() => {
      if (this.state.showColorPicker) {
        window.addEventListener('mousedown', this.handlePickerClick);
      } else {
        window.removeEventListener('mousedown', this.handlePickerClick);
      }
    }, 0)
  );

  private hidePicker = () => this.setState({
    showColorPicker: false,
  }, () => window.removeEventListener('mousedown', this.handlePickerClick));

  /**
   * Sends the updated color value to the parent as a Chroma color object
   */
  private handleColorChange = (color: ColorResult) =>
    this.props.onChange(Chroma(color.hex));

  /**
   * Handles outside element clicks to hide the color picker modal
   */
  private handlePickerClick = (e: MouseEvent) => {
    if (e.target !== this.pickerContainerElem && !(e.target && this.pickerContainerElem && this.pickerContainerElem.contains(e.target as Element))) {
      this.toggleShowPicker();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handlePickerClick);
  }

  render() {
    return (
      <div className={styles.container}>
        <label className={styles.buttonLabel}>
          <b className={styles.labelText}>
            {this.props.label}
          </b>
          <button
            aria-label={this.props.label}
            className={styles.button}
            onClick={this.toggleShowPicker}
            style={{
              backgroundColor: this.props.color.hex()
            }}
          />
          <i className={styles.labelHex}>
            {this.props.color.hex()}
          </i>
        </label>
        {this.state.showColorPicker && (
          <div
            ref={this.pickerContainerElemRef}
            className={styles.pickerContainer}
          >
            <ColorPicker
              color={this.props.color.hex()}
              onChange={this.handleColorChange}
            />
            <button
              className={styles.doneBtn}
              onClick={this.hidePicker}
            >
              Done
            </button>
          </div>
        )}
      </div>
    )
  }
};
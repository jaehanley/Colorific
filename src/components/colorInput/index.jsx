import React, { Component, Fragment } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import style from './style.css';

export default class ColorInput extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    floatLeft: PropTypes.bool,
  }

  static defaultProps = {
    floatLeft: true,
  }

  render() {
    const {
      color,
      floatLeft
    } = this.props;
    return (
      <Fragment>
        <div
          className={style.overlay}
          role='button'
          onClick={() => this.props.onClose()}
          />
        <div
          className={[
            style.colorControls,
            floatLeft ? style.leftAlgin : style.rightAlign
          ].join(' ')}>
          <ChromePicker
            color={color}
            disableAlpha
            onChangeComplete={(color) => this.props.onChange(color.hex)}
            />
        </div>
      </Fragment>
    );
  }
}
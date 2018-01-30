import React, { Component, Fragment } from 'react';
import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';
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

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    const { color } = this.props;
    if (e.key) {
      const key = e.key.toLowerCase();
      if (key === 'escape') {
        this.props.onClose();
      } else if (key === 'arrowup') {
        this.props.onChange(chroma(color).brighten(0.2).hex());
      } else if (key === 'arrowdown') {
        this.props.onChange(chroma(color).darken(0.2).hex());
      }
    }
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
            onChangeComplete={(resColor) => this.props.onChange(resColor.hex)}
            />
          <button
            className={style.doneBtn}
            onClick={() => this.props.onClose()}>
            Done
          </button>
        </div>
      </Fragment>
    );
  }
}
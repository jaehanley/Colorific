import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma from 'chroma-js';
import {
  setForeground,
  setBackground,
  swapColors,
  setControlsShown
} from 'actions/colors';
import ColorInput from 'components/colorInput';
import swapWhite from 'assets/swap-white.svg';
import style from './style.css';

class Controls extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    foreground: PropTypes.string.isRequired,
    setForeground: PropTypes.func.isRequired,
    setBackground: PropTypes.func.isRequired,
    swapColors: PropTypes.func.isRequired,
    pickerShown: PropTypes.bool.isRequired,
    setControlsShown: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      showForegroundEditor: false,
      showBackgroundEditor: false,
    }
  }

  showForegroundEditor() {
    this.props.setControlsShown(true);
    this.setState({
      showForegroundEditor: true,
      showBackgroundEditor: false,
    });
  }

  showBackgroundEditor() {
    this.props.setControlsShown(true);
    this.setState({
      showForegroundEditor: false,
      showBackgroundEditor: true,
    });
  }

  hideEditors() {
    this.props.setControlsShown(false);
    this.setState({
      showForegroundEditor: false,
      showBackgroundEditor: false,
    });
  }

  render() {
    const {
      background,
      foreground,
      pickerShown
    } = this.props;


    const {
      showForegroundEditor,
      showBackgroundEditor,
    } = this.state;

    return (
      <Fragment>
        <div
          aria-hidden={pickerShown}
          disabled={pickerShown}
          className={style.container}
          tabIndex={pickerShown ? -1 : undefined}>
          <button
            disabled={pickerShown}
            aria-label={`foreground color: ${chroma(foreground).name()}`}
            id='foreground-btn'
            className={style.inputLabel}
            onClick={() => this.showForegroundEditor()}>
            <b aria-hidden>Foreground</b>
            <div
              aria-hidden
              className={style.colorInput}
              style={{
                backgroundColor: chroma(foreground).hex(),
              }}
              />
            <span
              aria-hidden
              className={style.hexValue}>
              {chroma(foreground).hex()}
            </span>
          </button>
          <button
            disabled={pickerShown}
            aria-label='swap colors'
            className={style.swapBtn}
            onClick={() => this.props.swapColors()}>
            <img
              aria-hidden={true}
              alt='swap colors'
              src={swapWhite}/>
          </button>
          <button
            disabled={pickerShown}
            aria-label={`background color: ${chroma(background).name()}`}
            id='background-btn'
            className={style.inputLabel}
            onClick={() => this.showBackgroundEditor()}>
            <b aria-hidden>Background</b>
            <div
              aria-hidden
              className={style.colorInput}
              style={{
                backgroundColor: chroma(background).hex()
              }}/>
            <span
              aria-hidden
              className={style.hexValue}>
              {chroma(background).hex()}
            </span>
          </button>
        </div>
        {(showForegroundEditor || (!showForegroundEditor && !showBackgroundEditor && pickerShown)) && (
          <ColorInput
            color={chroma(foreground).hex()}
            floatLeft
            onChange={(hex) => this.props.setForeground(chroma(hex).hex())}
            onClose={() => this.hideEditors()} />
        )}
        {showBackgroundEditor && (
          <ColorInput
            color={chroma(background).hex()}
            floatLeft={false}
            onChange={(hex) => this.props.setBackground(chroma(hex).hex())}
            onClose={() => this.hideEditors()} />
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    background: state.colors.background,
    foreground: state.colors.foreground,
    pickerShown: state.colors.controlsShown || false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setBackground: (color) => {
      dispatch(setBackground(color));
    },
    setForeground: (color) => {
      dispatch(setForeground(color));
    },
    swapColors: () => {
      dispatch(swapColors());
    },
    setControlsShown: (bool) => {
      dispatch(setControlsShown(bool));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls);
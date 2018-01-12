import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma, { mix } from 'chroma-js';
import blind from 'color-blind';
import {
  setForeground,
  setBackground,
  swapColors,
} from 'actions/colors';
import swapWhite from 'assets/swap-white.svg';
import style from './style.css';

class Controls extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    foreground: PropTypes.string.isRequired,
    setForeground: PropTypes.func.isRequired,
    setBackground: PropTypes.func.isRequired,
    swapColors: PropTypes.func.isRequired,
    blindness: PropTypes.string,
    setting: PropTypes.string,
  };

  render() {
    const {
      background,
      foreground,
      blindness,
      setting,
    } = this.props;

    let containerBackground = chroma(background);
    if (blindness && blindness !== 'common') {
      const modifier = blind[setting];
      containerBackground = modifier(background)
    }

    return (
      <div
        className={style.container}
        style={{
          backgroundColor: mix('#1a1a1a', containerBackground, 0.2),
        }}>
        <label className={style.inputLabel}>
          <b>Foreground</b>
          <input
            type='color'
            className={style.colorInput}
            value={chroma(foreground).hex()}
            onChange={(e) => {
              this.props.setForeground(chroma(e.target.value).hex())
            }}/>
          <span className={style.hexValue}>
            {chroma(foreground).hex()}
          </span>
        </label>
        <button
          aria-label='swap colors'
          className={style.swapBtn}
          onClick={() => this.props.swapColors()}>
          <img
            aria-hidden={true}
            alt='swap colors'
            src={swapWhite}/>
        </button>
        <label className={style.inputLabel}>
          <b>Background</b>
          <input
            type='color'
            className={style.colorInput}
            value={chroma(background).hex()}
            onChange={(e) => {
              this.props.setBackground(chroma(e.target.value).hex())
            }}/>
          <span className={style.hexValue}>
            {chroma(background).hex()}
          </span>
        </label>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    background: state.colors.background,
    foreground: state.colors.foreground,
    blindness: state.colors.blindness,
    setting: state.colors.setting,
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls);
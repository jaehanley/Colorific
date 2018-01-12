import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setForeground,
  setBackground,
  swapColors,
} from 'actions/colors';
import swapWhite from 'assets/swap-white.svg';
import swapBlack from 'assets/swap-black.svg';
import chroma from 'chroma-js';
import blind from 'color-blind';
import style from './style.css';

class Controls extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    foreground: PropTypes.string.isRequired,
    setForeground: PropTypes.func.isRequired,
    setBackground: PropTypes.func.isRequired,
    swapColors: PropTypes.func.isRequired,
    blindness: PropTypes.string.isRequired,
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
    let containerForeground = chroma(foreground);
    if (blindness !== 'common') {
      const modifier = blind[setting];
      containerBackground = modifier(background);
      containerForeground = modifier(foreground);
    }

    const lums = chroma(containerBackground).luminance();
    const isDark = lums <= 0.5;

    return (
      <div
        className={style.container}
        style={{
          backgroundColor: isDark
            ? chroma(containerBackground).brighten(0.5)
            : chroma(containerBackground).darken(0.5),
          color: isDark ? '#fff' : '#222',
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
            src={isDark ? swapWhite : swapBlack}/>
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
    setting: state.colors.setting
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
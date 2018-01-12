import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma from 'chroma-js';
import blind from 'color-blind';
import { setColorBlind } from 'actions/colors';
import style from './style.css';

const blindTypes = [
  'common',
  'trichromat',
  'dichromat',
  'monochromat',
];

const blindSettings = {
  trichromat: [
    'protanomaly',
    'deuteranomaly',
    'tritanomaly',
  ],
  dichromat: [
    'protanopia',
    'deuteranopia',
    'tritanopia',
  ],
  monochromat: [
    'achromatomaly',
    'achromatopsia',
  ],
};

class ColorBlindOptions extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    blindness: PropTypes.string.isRequired,
    setColorBlind: PropTypes.func.isRequired,
    setting: PropTypes.string,
  }

  render() {
    const {
      blindness,
      setting,
      background
    } = this.props;

    let containerBackground = chroma(background);
    if (blindness !== 'common') {
      const modifier = blind[setting];
      containerBackground = modifier(background)
    }

    const lums = chroma(containerBackground).luminance();
    const isDark = lums <= 0.5;

    containerBackground = isDark
      ? chroma(containerBackground).darken(0.15)
      : chroma(containerBackground).brighten(0.15);

    return (
      <div
        style={{
          color: isDark ? '#fff' : '#222',
          backgroundColor: containerBackground,
        }}>
        <div className={style.blindTypes}>
          {blindTypes.map((type) => {
            return (
              <label
                key={type}
                className={style.blindOption}>
                <input
                  type='radio'
                  name='blind_type'
                  value={type}
                  checked={type === blindness}
                  onChange={(e) => {
                    this.props.setColorBlind(e.target.value, blindSettings[e.target.value] ? blindSettings[e.target.value][0] : null)
                  }}/>
                <span>{type}</span>
              </label>
            );
          })}
        </div>
        {blindSettings[blindness] && (
          <div
            className={style.blindTypes}
            style={{
              backgroundColor: isDark
                ? chroma(containerBackground).brighten(0.07)
                : chroma(containerBackground).darken(0.07),
            }}>
            {blindSettings[blindness].map((type) => {
              return (
                <label
                  key={type}
                  className={style.blindOption}>
                  <input
                    type='radio'
                    name='blind_setting'
                    value={type}
                    checked={type === setting}
                    onChange={(e) => {
                      this.props.setColorBlind(blindness, e.target.value);
                    }}/>
                  <span>{type}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    background: state.colors.background,
    blindness: state.colors.blindness,
    setting: state.colors.setting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setColorBlind: (blindness, setting) => {
      dispatch(setColorBlind(blindness, setting));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorBlindOptions);
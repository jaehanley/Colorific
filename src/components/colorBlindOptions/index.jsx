import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma, { contrast } from 'chroma-js';
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
    foreground: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    blindness: PropTypes.string.isRequired,
    setColorBlind: PropTypes.func.isRequired,
    setting: PropTypes.string,
    pickerShown: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      failures: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const colorsChanged = nextProps.foreground !== this.props.foreground
      || nextProps.background !== this.props.background;
    if (colorsChanged) {
      this.checkFailers(nextProps);
    }
  }

  componentDidMount() {
    this.checkFailers();
  }

  checkFailers(nextProps) {
    const {
      foreground,
      background,
    } = (nextProps || this.props);
    const failures = [];
    const commonFail = contrast(chroma(foreground), chroma(background)) < 3;
    if (commonFail) {
      failures.push('common');
    }
    Object.keys(blindSettings).forEach((key) => {
      blindSettings[key].forEach((state) => {
        const modifier = blind[state];
        const failed = contrast(modifier(foreground), modifier(background)) < 3;
        if (failed) {
          if (failures.find((elem) => elem === key) === undefined) {
            failures.push(key);
          }
          failures.push(state);
        }
      });
    });
    const shouldUpdate = this.state.failures !== failures;
    if (shouldUpdate) {
      this.setState({
        failures
      });
    }
  }

  render() {
    const {
      blindness,
      setting,
      background,
      pickerShown
    } = this.props;

    const { failures } = this.state;

    const isFailedState = (name) => {
      return failures.find((elem) => elem === name) !== undefined;
    };

    let containerBackground = chroma(background);
    if (blindness !== 'common') {
      const modifier = blind[setting];
      containerBackground = modifier(background)
    }
    const previewColor = containerBackground;

    containerBackground = chroma(containerBackground).darken(1);
    const secondRowColor = chroma(containerBackground).brighten(0.5);

    const lums = chroma(containerBackground).luminance();
    const isDark = lums <= 0.5;

    return (
      <div
        aria-hidden={pickerShown}
        disabled={pickerShown}
        tabIndex={pickerShown ? -1 : undefined}
        className={`${style.blindnessOptionsContainer} ${isDark ? style.lightText : style.darkText}`}
        style={{ backgroundColor: containerBackground }}>
        <div
          arial-labelledby='color-perception'
          role='group'
          className={style.blindTypes}
          >
          <b
            className={style.blindLabel}
            id='color-perception'
            role='heading'
            >
            Color Perception
          </b>
          {blindTypes.map((type) => {
            const isActive = type === blindness;
            return (
              <label
                key={type}
                className={`${style.blindOption} ${isActive ? style.active : undefined}`}>
                <input
                  disabled={pickerShown}
                  type='radio'
                  name='blind_type'
                  value={type}
                  checked={isActive}
                  onChange={(e) => {
                    this.props.setColorBlind(e.target.value, blindSettings[e.target.value] ? blindSettings[e.target.value][0] : null)
                  }}/>
                <span>
                  {type}
                  {isFailedState(type) && (
                    <i
                      className={style.failed}
                      style={{ color: containerBackground }}>
                      !
                    </i>
                  )}
                </span>
                <i className={style.indicator} />
              </label>
            );
          })}
        </div>
        {blindSettings[blindness] && (
          <div
            aria-labelledby='blindness-perception'
            role='group'
            className={`${style.blindTypes} ${chroma(secondRowColor).luminance() <= 0.5 ? style.lightText : style.darkText}`}
            style={{ backgroundColor: secondRowColor }}>
            <b
              className={style.blindLabel}
              id='blindness-perception'
              role='heading'
              >
              Blindness
            </b>
            {blindSettings[blindness].map((type) => {
              const isActive = type === setting;
              return (
                <label
                  key={type}
                  className={`${style.blindOption} ${isActive ? style.active : undefined}`}
                  >
                  <input
                    disabled={pickerShown}
                    type='radio'
                    name='blind_setting'
                    value={type}
                    checked={isActive}
                    onChange={(e) => {
                      this.props.setColorBlind(blindness, e.target.value);
                    }}/>
                  <span>
                    {type}
                    {isFailedState(type) && (
                      <i
                        className={style.failed}
                        style={{ color: secondRowColor}}>
                        !
                      </i>
                    )}
                  </span>
                  <i className={style.indicator} />
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
    foreground: state.colors.foreground,
    background: state.colors.background,
    blindness: state.colors.blindness,
    setting: state.colors.setting,
    pickerShown: state.colors.controlsShown || false,
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
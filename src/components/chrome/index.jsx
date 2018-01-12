import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma from 'chroma-js';
import blind from 'color-blind';
import style from './style.css';

class Chrome extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    blindness: PropTypes.string.isRequired,
    setting: PropTypes.string,
  }

  render() {
    const {
      background,
      blindness,
      setting,
    } = this.props;

    let containerBackground = chroma(background);
    if (blindness !== 'common') {
      const modifier = blind[setting];
      containerBackground = modifier(background);
    }

    const lums = chroma(containerBackground).luminance();
    const isDark = lums <= 0.5;

    return (
      <span
        className={style.chrome}
        style={{
          WebkitAppRegion: 'drag',
          backgroundColor: isDark
            ? chroma(containerBackground).darken(0.3)
            : chroma(containerBackground).brighten(0.3),
        }}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    background: state.colors.background,
    blindness: state.colors.blindness,
    setting: state.colors.setting,
  };
}

export default connect(
  mapStateToProps
)(Chrome);
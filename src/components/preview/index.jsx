import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma, { contrast } from 'chroma-js';
import blind from 'color-blind';
import style from './style.css';

class Preview extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    foreground: PropTypes.string.isRequired,
    blindness: PropTypes.string.isRequired,
    setting: PropTypes.string,
  }

  render() {
    const {
      background,
      blindness,
      foreground,
      setting,
    } = this.props;

    let containerBackground = chroma(background);
    let containerForeground = chroma(foreground);
    if (blindness !== 'common') {
      const modifier = blind[setting];
      containerBackground = modifier(background);
      containerForeground = modifier(foreground);
    }

    let ranking;
    const rating = contrast(containerForeground, containerBackground);

    if (rating >= 7) {
      ranking = 'AAA';
    } else if (rating >= 4.5) {
      ranking = 'AA';
    } else if (rating >= 3) {
      ranking = 'AA Large';
    } else {
      ranking = 'Fail';
    }

    return (
      <div
        className={style.container}
        style={{
          backgroundColor: containerBackground,
          color: containerForeground,
        }}>
        <b
          aria-label="accessibility rating"
          className={style.rating}>
          {ranking}
        </b>
        <span className={style.ratio}>
          {rating.toFixed(3)}:1
        </span>
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

export default connect(
  mapStateToProps,
)(Preview);
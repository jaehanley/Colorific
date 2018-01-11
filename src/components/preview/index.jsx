import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contrast } from 'chroma-js';
import style from './style.css';

class Preview extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    foreground: PropTypes.string.isRequired,
  }

  render() {
    const {
      background,
      foreground,
    } = this.props;

    let ranking;
    const rating = contrast(foreground, background);
    if (rating >= 7) {
      ranking = 'AAA';
    } else if (rating >= 4.5) {
      ranking = 'AA';
    } else if (rating >= 3) {
      ranking = 'A';
    } else {
      ranking = 'Fail';
    }

    return (
      <div
        className={style.container}
        style={{
          backgroundColor: background,
          color: foreground,
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
  };
}

export default connect(
  mapStateToProps,
)(Preview);
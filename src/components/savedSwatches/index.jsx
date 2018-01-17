import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setBackground,
  setForeground,
} from 'actions/colors';
import {
  deleteSwatch,
  saveSwatch,
} from 'actions/swatches';
import addBtn from 'assets/add-swatch-btn.svg';
import trash from 'assets/trash.svg';
import style from './style.css';

class SavedSwatches extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    deleteSwatch: PropTypes.func.isRequired,
    foreground: PropTypes.string.isRequired,
    saveSwatch: PropTypes.func.isRequired,
    setColors: PropTypes.func.isRequired,
    swatches: PropTypes.array.isRequired,
  }

  render() {
    const {
      foreground,
      background,
      swatches,
    } = this.props;
    return (
      <div className={style.container}>
        <button
          className={style.saveBtn}
          onClick={() => this.props.saveSwatch(foreground, background)}
          disabled={swatches.includes({foreground, background})}>
          <img
            alt='Save Swatch'
            src={addBtn}
            />
        </button>
        <div className={style.swatchContainer}>
          {swatches.map((swatch) => {
            return (
              <Swatch
                key={`swatch-${swatch.foreground}-${swatch.background}`}
                swatch={swatch}
                onClick={() => this.props.setColors(swatch.foreground, swatch.background)}
                onDelete={() => this.props.deleteSwatch(swatch)}
                active={{ foreground, background } === swatch}
                />
            )
          })}
        </div>
      </div>
    );
  }
}

class Swatch extends Component {
  static propTypes = {
    active: PropTypes.bool,
    swatch: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static defaultProps = {
    active: false,
  }

  render() {
    const {
      active,
      swatch,
    } = this.props;
    return (
      <div className={style.swatchObject}>
        <button
          className={[
            style.swatch,
            active ? style.active : style.inactive
          ].join(' ')}
          onClick={() => this.props.onClick()}
          disabled={active}
          style={{
            backgroundColor: swatch.background
          }}>
          <div
            className={style.foreground}
            style={{
              borderBottomColor: swatch.foreground
            }}
            />
        </button>
        <div className={style.trash}>
            <button onClick={() => this.props.onDelete()}>
              <img
                alt='Delete Swatch'
                src={trash}
                />
            </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    background: state.colors.background,
    foreground: state.colors.foreground,
    swatches: state.swatches.swatches || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSwatch: (swatch) => {
      dispatch(deleteSwatch(swatch));
    },
    saveSwatch: (foreground, background) => {
      dispatch(saveSwatch(foreground, background));
    },
    setColors: (foreground, background) => {
      dispatch(setBackground(background))
      dispatch(setForeground(foreground))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedSwatches);
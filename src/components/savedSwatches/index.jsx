import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
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
    pickerShown: PropTypes.bool.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    // A new swatch has been added
    if (nextProps.swatches.length > this.props.swatches.length) {
      findDOMNode(this.swatchContainer).scrollLeft = 0;
    }
  }

  render() {
    const {
      foreground,
      background,
      swatches,
      pickerShown,
    } = this.props;

    let disableAdd = false;
    let swatchMsg = 'Save swatch';
    if (swatches.length >= 500) {
      swatchMsg = 'Maximum swatches saved';
      disableAdd = true;
    }
    swatches.forEach((swatch) => {
      if (swatch.foreground === foreground && swatch.background === background) {
        disableAdd = true;
        swatchMsg = 'Swatch already saved';
      }
    });
    return (
      <div
        aria-hidden={pickerShown}
        disabled={pickerShown}
        className={style.container}>
        <button
          title={swatchMsg}
          className={style.saveBtn}
          onClick={() => this.props.saveSwatch(foreground, background)}
          disabled={disableAdd}
          tabIndex={pickerShown ? -1 : undefined}>
          <img
            aria-hidden
            alt='Save Swatch'
            src={addBtn}
            />
        </button>
        <a
          tabIndex={pickerShown ? -1 : undefined}
          aria-hidden={pickerShown}
          disabled={pickerShown}
          role='button'
          href='#foreground-btn'
          className={style.skipBtns}
          >
          Skip Swatches
        </a>
        <div
          className={style.swatchContainer}
          ref={(c) => this.swatchContainer = c}>
          {swatches.map((swatch) => {
            return (
              <Swatch
                key={`swatch-${swatch.foreground}-${swatch.background}`}
                swatch={swatch}
                onClick={() => this.props.setColors(swatch.foreground, swatch.background)}
                onDelete={() => this.props.deleteSwatch(swatch)}
                active={foreground === swatch.foreground && background === swatch.background}
                disabled={pickerShown}
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
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    active: false,
    disabled: false,
  }

  render() {
    const {
      active,
      swatch,
      disabled
    } = this.props;
    return (
      <div className={[
          style.swatchObject,
          active ? style.active : style.inactive
        ].join(' ')}>
        <button
          title='Select Swatch'
          className={style.swatch}
          onClick={() => this.props.onClick()}
          disabled={active || disabled}
          style={{
            backgroundColor: swatch.foreground
          }}>
          <div
            className={style.foreground}
            style={{
              borderBottomColor: swatch.background
            }}
            />
        </button>
        <div className={style.trash}>
            <button
              title='Delete Swatch'
              onClick={() => this.props.onDelete()}
              disabled={disabled}>
              <img
                aria-hidden
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
    swatches: state.swatches.swatches ? [...state.swatches.swatches].reverse() : [],
    pickerShown: state.colors.controlsShown || false,
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
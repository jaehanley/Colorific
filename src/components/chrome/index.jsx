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

  constructor(props) {
    super(props);
    this.state = {
      activeWindow: document.hasFocus(),
    };
    this.setVisibility = this.setVisibility.bind(this);
  }

  componentDidMount() {
    ['focus', 'blur'].forEach((method) => {
      window.addEventListener(method, this.setVisibility);
    });
  }

  componentWillUnmount() {
    ['focus', 'blur'].forEach((method) => {
      window.removeEventListener(method, this.setVisibility);
    })
  }

  setVisibility() {
    const { activeWindow } = this.state;
    const currentVisibility = document.hasFocus();
    if (activeWindow !== currentVisibility) {
      this.setState({
        activeWindow: currentVisibility,
      });
    }
  }

  render() {
    const {
      background,
      blindness,
      setting,
    } = this.props;

    const { activeWindow } = this.state;

    let containerBackground = chroma(background);
    if (blindness !== 'common') {
      const modifier = blind[setting];
      containerBackground = modifier(background);
    }

    return (
      <span
        className={[
          style.chrome,
          !activeWindow ? style.inactive : undefined
        ].join(' ')}
        style={{
          WebkitAppRegion: 'drag',
          backgroundColor: chroma(containerBackground).darken(1.5),
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
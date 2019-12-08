import React from 'react';
import ColorInput from '../../components/colorInput/colorInput';
import SwapIcon from '../../assets/swap-icon.svg';
import styles from './styles.module.css';
import { IControlProps } from './types';

const Control = (props: IControlProps) => (
  <div className={styles.view}>
    <ColorInput
      label='Foreground'
      color={props.foreground}
      onChange={props.onSetForeground}
    />
    <button
      className={styles.swapButton}
      onClick={props.onSwapColors}
    >
      <img
        alt="Swap colors"
        src={SwapIcon}
      />
    </button>
    <ColorInput
      label='Background'
      color={props.background}
      onChange={props.onSetBackground}
    />
  </div>
);

export default Control;
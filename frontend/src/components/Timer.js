import React from 'react';
import {toTimerString} from '../utils';

const Timer = (props) => {
  const {currentMs, styleClass} = props;
  return (
    <div className={styleClass}>
      <span className="timer-digit">{toTimerString(currentMs)}</span>
    </div>
  );
}

export default Timer;

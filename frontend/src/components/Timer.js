import React from 'react';

const Timer = (props) => {

  const {currentMs, styleClass} = props;

  const min = Math.floor(currentMs/60000);
  const sec = Math.floor((currentMs/1000)%60);
  const msec = Math.floor((currentMs/10)%100);

  const minStr = min < 10 ? '0' + min : min;
  const secStr = sec < 10 ? '0' + sec : sec;
  const msecStr = msec < 10 ? '0' + msec : msec;

  return (
    <div className={styleClass}>
      <span className="timer-digit">{minStr}:</span>
      <span className="timer-digit">{secStr}:</span>
      <span className="timer-digit">{msecStr}</span>
    </div>
  );
}

export default Timer;

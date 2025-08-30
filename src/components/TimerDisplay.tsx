import React from 'react';
import { formatTime } from '../utils/time';

type Props = {
  millis: number;
};

const TimerDisplay: React.FC<Props> = ({ millis }) => {
  return <div style={{ fontSize: '4rem', fontFamily: 'monospace' }}>{formatTime(millis)}</div>;
};

export default TimerDisplay;

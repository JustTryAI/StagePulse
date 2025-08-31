import React from 'react';
import { formatTime } from '../utils/time';
import { useCustomization } from '../context/CustomizationContext';

type Props = {
  millis: number;
};

const TimerDisplay: React.FC<Props> = ({ millis }) => {
  const { state } = useCustomization();

  return (
    <div
      style={{
        fontSize: '4rem',
        fontFamily: state.fontFamily,
        color: state.themeColor,
      }}
    >
      {formatTime(millis)}
    </div>
  );
};

export default TimerDisplay;

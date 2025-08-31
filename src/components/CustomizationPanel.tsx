import React from 'react';
import { useCustomization } from '../context/CustomizationContext';

const CustomizationPanel: React.FC = () => {
  const { state, dispatch } = useCustomization();

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Customization</h3>
      <div>
        <label>
          Theme Color:
          <input
            type="color"
            value={state.themeColor}
            onChange={(e) => dispatch({ type: 'setThemeColor', color: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Background Color:
          <input
            type="color"
            value={state.backgroundColor}
            onChange={(e) => dispatch({ type: 'setBackgroundColor', color: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Font Family:
          <input
            type="text"
            value={state.fontFamily}
            onChange={(e) => dispatch({ type: 'setFontFamily', font: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={state.showProgressBar}
            onChange={() => dispatch({ type: 'toggleProgressBar' })}
          />
          Show Progress Bar
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={state.showTimer}
            onChange={() => dispatch({ type: 'toggleTimer' })}
          />
          Show Timer
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={state.showMessage}
            onChange={() => dispatch({ type: 'toggleMessage' })}
          />
          Show Message
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={state.mirror}
            onChange={() => dispatch({ type: 'toggleMirror' })}
          />
          Mirror Mode
        </label>
      </div>
    </div>
  );
};

export default CustomizationPanel;


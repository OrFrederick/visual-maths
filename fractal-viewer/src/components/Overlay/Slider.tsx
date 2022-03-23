import { useState } from 'react';
import { SliderProps } from '../../d';
import './slider.css';

function Slider(props: SliderProps) {
  const { value, min, max, title, handler, step, tooltip } = props;
  const [sliderVal, setSliderVal] = useState(value);

  return (
    <div className="w-1/2 m-auto mt-5">
      <label htmlFor="slider" className="left-0">
        <abbr className="no-underline" title={tooltip}>
          {title}:
        </abbr>
        <input
          className="w-20 ml-3"
          type="number"
          min={min}
          max={max}
          onChange={(e) => {
            if (handler) {
              handler(e);
              setSliderVal(parseFloat(e.target.value));
            }
          }}
          value={value}
        ></input>
      </label>
      <input
        type="range"
        min={min}
        name="slider"
        max={max}
        step={step ? step : 1}
        onMouseUp={handler}
        onChange={(e) => {
          // @ts-ignore
          setSliderVal(parseFloat(e.target.value));
        }}
        value={sliderVal}
        className="w-full h-5 bg-blue-100"
      />
    </div>
  );
}

export default Slider;

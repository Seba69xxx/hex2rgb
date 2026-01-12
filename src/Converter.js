import React, { useState } from 'react';
import './Converter.css';

export default function Converter() {
  const [form, setForm] = useState({
    hex: '#',
    rgb: 'rgb(255, 255, 255)',
    background: '#ffffff'
  });

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  const handleHexChange = (evt) => {
    const { value } = evt.target;
    
    if (value.length > 7) return;

    setForm((prev) => ({ ...prev, hex: value }));

    if (value.length === 7) {
      if (/^#[0-9A-F]{6}$/i.test(value)) {
        const rgbObj = hexToRgb(value);
        const rgbString = `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
        setForm({
          hex: value,
          rgb: rgbString,
          background: value
        });
      } else {
        setForm((prev) => ({
          ...prev,
          hex: value,
          rgb: 'Ошибка!',
          background: '#e94b35'
        }));
      }
    }
  };

  return (
    <div 
      className="container" 
      style={{ backgroundColor: form.background }}
    >
      <div className="converter-box">
        <input 
          className="input-hex"
          name="hex"
          value={form.hex}
          onChange={handleHexChange}
        />
        <div className="output-rgb">
          {form.rgb}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { FaBold, FaItalic, FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';
import '../styles/global.css'

const families = [
  'Amiri, serif',
  'Aref Ruqaa, serif',
  'Arial, sans-serif',
  'Cairo, sans-serif',
  'Courier New, monospace',
  'Dancing Script, cursive',
  'EB Garamond, serif',
  'El Messiri, sans-serif',
  'Fira Sans, sans-serif',
  'Georgia, serif',
  'Great Vibes, cursive',
  'Gulzar, serif',
  'IBM Plex Sans Arabic, sans-serif',
  'IranNastaliq, serif',
  'Lateef, cursive',
  'Libre Baskerville, serif',
  'Lora, serif',
  'Merriweather, serif',
  'Noto Nastaliq Urdu, serif',
  'Noto Naskh Arabic, serif',
  'Noto Sans Arabic, sans-serif',
  'Playfair Display, serif',
  'Poppins, sans-serif',
  'Quicksand, sans-serif',
  'Reem Kufi, sans-serif',
  'Rubik, sans-serif',
  'Scheherazade, serif',
  'Tajawal, sans-serif',
  'Times New Roman, serif',
  'Vazirmatn, sans-serif'
];

const alignments = [
  { icon: <FaAlignLeft />, value: 'left' },
  { icon: <FaAlignCenter />, value: 'center' },
  { icon: <FaAlignRight />, value: 'right' },
];

const TypographySettings = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onChange(updated);
  };

  const toggleStyle = (styleKey) => {
    handleChange(styleKey, !localSettings[styleKey]);
  };


  return (
    <div className="typography-toolbar">
      <select
        className="toolbar-select"
        value={localSettings.fontFamily}
        onChange={(e) => handleChange('fontFamily', e.target.value)}
      >
        {families.map((f) => (
          <option key={f} value={f}>
            {f.split(',')[0]}
          </option>
        ))}
      </select>

      <input
        type="number"
        min={0.5}
        step={0.1}
        value={parseFloat(localSettings.fontSize) || 1}
        onChange={(e) => handleChange('fontSize', `${e.target.value}rem`)}
      />
    
      <button
        className={localSettings.bold ? 'active' : ''}
        onClick={() => toggleStyle('bold')}
        title="Bold"
      >
        <FaBold />
      </button>

      <button
        className={localSettings.italic ? 'active' : ''}
        onClick={() => toggleStyle('italic')}
        title="Italic"
      >
        <FaItalic />
      </button>

      <input
        type="color"
        value={localSettings.color}
        onChange={(e) => handleChange('color', e.target.value)}
        title="Text Color"
      />

      {alignments.map((a) => (
        <button
          key={a.value}
          className={localSettings.textAlign === a.value ? 'active' : ''}
          onClick={() => handleChange('textAlign', a.value)}
          title={`Align ${a.value}`}
        >
          {a.icon}
        </button>
      ))}
    </div>
  );
};

export default TypographySettings;

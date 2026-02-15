import { PRESETS } from '../../constants/stats';

const colorMap = {
  'hoop-green': 'bg-hoop-green/15 text-hoop-green border-hoop-green/30',
  'hoop-red': 'bg-hoop-red/15 text-hoop-red border-hoop-red/30',
  'hoop-cyan': 'bg-hoop-cyan/15 text-hoop-cyan border-hoop-cyan/30',
  'hoop-yellow': 'bg-hoop-yellow/15 text-hoop-yellow border-hoop-yellow/30',
  'hoop-orange': 'bg-hoop-orange/15 text-hoop-orange border-hoop-orange/30',
};

export default function PresetButtons({ onPreset }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {PRESETS.map((preset) => (
        <button
          key={preset.label}
          onClick={() => onPreset(preset)}
          className={`px-3 py-2 rounded-xl text-xs font-semibold border active:scale-95 transition-all ${colorMap[preset.color] || colorMap['hoop-orange']}`}
          aria-label={`Quick add: ${preset.label}`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}

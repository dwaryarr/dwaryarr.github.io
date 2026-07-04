export default function SelectField({ field, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/70">{field.label}</label>

      <select
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

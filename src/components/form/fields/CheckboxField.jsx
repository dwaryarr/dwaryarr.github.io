export default function CheckboxField({ field, value, onChange }) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
      />

      <span>{field.label}</span>
    </label>
  );
}

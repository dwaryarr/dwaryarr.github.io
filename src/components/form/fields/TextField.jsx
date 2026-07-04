export default function TextField({ field, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/70">{field.label}</label>

      <input
        className="form-input"
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

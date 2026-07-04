export default function TextAreaField({ field, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/70">{field.label}</label>

      <textarea
        rows={5}
        className="form-input"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

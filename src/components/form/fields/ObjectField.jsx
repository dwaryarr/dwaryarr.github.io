import FieldRenderer from "../FieldRenderer";

export default function ObjectField({ field, value = {}, onChange }) {
  function update(name, val) {
    onChange({
      ...value,

      [name]: val,
    });
  }

  return (
    <div className="space-y-4 rounded-xl border border-white/10 p-4">
      <h3 className="font-semibold">{field.label}</h3>

      {field.fields.map((sub) => (
        <FieldRenderer
          key={sub.name}
          field={sub}
          value={value[sub.name]}
          onChange={(v) => update(sub.name, v)}
        />
      ))}
    </div>
  );
}

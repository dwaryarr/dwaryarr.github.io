import { Plus, Trash2 } from "lucide-react";

export default function ArrayField({ field, value = [], onChange }) {
  function add() {
    onChange([...value, ""]);
  }

  function update(index, val) {
    const next = [...value];
    next[index] = val;
    onChange(next);
  }

  function remove(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-white/70">{field.label}</label>

        <button
          type="button"
          onClick={add}
          className="btn-secondary !px-2 !py-1">
          <Plus size={14} />
        </button>
      </div>

      {value.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            className="form-input flex-1"
            value={item}
            placeholder={field.placeholder}
            onChange={(e) => update(index, e.target.value)}
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="btn-secondary !px-2">
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}

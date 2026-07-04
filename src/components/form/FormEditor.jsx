export default function FormEditor({ schema = [], value = {}, onChange }) {
  function update(field, val) {
    onChange({
      ...value,
      [field]: val,
    });
  }

  return (
    <div className="space-y-5">
      {schema.map((field) => (
        <div key={field.name}>
          <label className="mb-2 block text-sm font-medium text-white">
            {field.label}
          </label>

          {field.type === "textarea" && (
            <textarea
              rows={5}
              value={value[field.name] ?? ""}
              onChange={(e) => update(field.name, e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          )}

          {field.type === "select" && (
            <select
              value={value[field.name] ?? ""}
              onChange={(e) => update(field.name, e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white">
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {field.type === "checkbox" && (
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={value[field.name] ?? false}
                onChange={(e) => update(field.name, e.target.checked)}
              />
              Featured
            </label>
          )}

          {!["textarea", "select", "checkbox"].includes(field.type) && (
            <input
              type={field.type}
              value={value[field.name] ?? ""}
              onChange={(e) => update(field.name, e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          )}
        </div>
      ))}
    </div>
  );
}

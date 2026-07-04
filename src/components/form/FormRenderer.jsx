import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import CheckboxField from "./fields/CheckboxField";
import SelectField from "./fields/SelectField";
import ArrayField from "./fields/ArrayField";
import ObjectField from "./fields/ObjectField";

export default function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return <TextField field={field} value={value} onChange={onChange} />;

    case "textarea":
      return <TextAreaField field={field} value={value} onChange={onChange} />;

    case "checkbox":
      return <CheckboxField field={field} value={value} onChange={onChange} />;

    case "select":
      return <SelectField field={field} value={value} onChange={onChange} />;

    case "array":
      return <ArrayField field={field} value={value} onChange={onChange} />;

    case "object":
      return <ObjectField field={field} value={value} onChange={onChange} />;

    default:
      return null;
  }
}

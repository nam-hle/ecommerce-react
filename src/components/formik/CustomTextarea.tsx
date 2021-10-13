import React from "react";

export const CustomTextarea: React.FC<CustomTextareaProps> = ({
  field,
  form: { touched, errors },
  label,
  ...props
}) => (
  <div className="input-group">
    {touched[field.name] && errors[field.name] ? (
      <span className="label-input label-error">{errors[field.name]}</span>
    ) : (
      <label className="label-input" htmlFor={field.name}>
        {label}
      </label>
    )}
    <textarea
      cols={30}
      rows={4}
      id={field.name}
      className={`input-form ${touched[field.name] && errors[field.name] && "input-error"}`}
      {...field}
      {...props}
      name={field.name}
    />
  </div>
);

type CustomTextareaProps = {
  label: string;
  field: { name: string };
  form: { touched: Record<string, string[]>; errors: Record<string, string[]> };
};

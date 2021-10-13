import React from "react";

export const CustomInput: React.FC<CustomInputProps> = ({
  field,
  form: { touched, errors },
  label,
  inputRef,
  ...props
}) => {
  return (
    <div className="input-group">
      {touched[field.name] && errors[field.name] ? (
        <span className="label-input label-error">{errors[field.name]}</span>
      ) : (
        <label className="label-input" htmlFor={field.name}>
          {label}
        </label>
      )}
      <input
        type="text"
        id={field.name}
        className={`input-form ${touched[field.name] && errors[field.name] && "input-error"}`}
        ref={inputRef}
        {...field}
        {...props}
      />
    </div>
  );
};

CustomInput.defaultProps = {
  inputRef: undefined,
};

type CustomInputProps = {
  label: string;
  field: { name: string };
  form: { touched: Record<string, string[]>; errors: Record<string, string[]> };
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

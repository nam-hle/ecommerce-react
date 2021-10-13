import { useField } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";

export const CustomMobileInput: React.FC<CustomMobileInputProps> = (props) => {
  // @ts-ignore
  const [field, meta, helpers] = useField(props);
  const { label, placeholder, defaultValue } = props;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleChange = (value: string, data: { dialCode: number; countryCode: number; name: string }) => {
    const mob = {
      dialCode: data.dialCode,
      countryCode: data.countryCode,
      country: data.name,
      value,
    };

    setValue(mob);
  };

  return (
    <div className="input-group">
      {touched && error ? (
        // @ts-ignore
        <span className="label-input label-error">{error?.value || error?.dialCode}</span>
      ) : (
        <label className="label-input" htmlFor={field.name}>
          {label}
        </label>
      )}
      <PhoneInput
        // @ts-ignore
        name={field.name}
        country="ph"
        inputClass="input-form d-block"
        style={{
          border: touched && error ? "1px solid red" : "1px solid #cacaca",
        }}
        inputExtraProps={{ required: true }}
        onChange={handleChange}
        placeholder={placeholder}
        value={defaultValue.value}
      />
    </div>
  );
};

CustomMobileInput.defaultProps = {
  label: "Mobile Number",
  placeholder: "09254461351",
};

type CustomMobileInputProps = {
  label?: string;
  placeholder?: string;
  defaultValue: { value: string };
  name?: string;
  disabled?: boolean;
};

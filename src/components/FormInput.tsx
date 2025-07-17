import React from 'react';

export interface FormInputProps {
  type?: string;
  title: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  error?: string;
}

// Bileşen tanımı
const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  title,
  name,
  onChange,
  value,
  error,
}) => {
  return (
    <div>
      <label htmlFor={name} className="label">
        {title}:
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        className={`input ${error && 'border-red-600'}`}
        value={value}
        required={true}
      />
      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;

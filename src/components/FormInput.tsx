// src/components/FormInput.tsx
import React from 'react'

export interface FormInputProps {
  type?: string
  title: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  error?: string
  required?: boolean
}

const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  title,
  name,
  onChange,
  value,
  error,
  required = true
}) => {
  const isFile = type === 'file'

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
        className={`input ${error ? 'border-red-600' : ''}`}
        {...(!isFile && { value })}
        {...(isFile && { accept: 'image/jpeg,image/png,image/gif,image/webp' })}
        required={required}
      />

      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  )
}

export default FormInput

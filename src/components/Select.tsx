import React from 'react'

interface SelectProps<T> {
  title: string
  name: string
  data: T[]
  optionValueKey: keyof T
  optionLabelKey: keyof T
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  value?: string
}

export default function Select<T extends Record<string, any>>({
  title,
  name,
  data,
  optionValueKey,
  optionLabelKey,
  onChange,
  value,
}: SelectProps<T>) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {title}:
      </label>
      <select
        id={name}
        name={name}
        className="input"
        onChange={onChange}
        value={value}
        required
      >
        <option value="">{`${title} seçiniz`}</option>
        {data.map((item) => {
          const val = item[optionValueKey]
          const lbl = item[optionLabelKey]
          return (
            <option key={String(val)} value={String(val)}>
              {String(lbl)}
            </option>
          )
        })}
      </select>
    </div>
  )
}

'use client';

import { useFormContext } from 'react-hook-form';
import Input from './Input';
import Select from './Select';

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  options,
  ...props
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  if (type === 'select' || options) {
    return (
      <Select
        label={label}
        name={name}
        placeholder={placeholder}
        required={required}
        error={error}
        className={className}
        options={options || []}
        {...register(name)}
        {...props}
      />
    );
  }

  return (
    <Input
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      error={error}
      className={className}
      {...register(name)}
      {...props}
    />
  );
}


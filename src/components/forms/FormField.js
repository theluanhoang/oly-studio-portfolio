'use client';

import { useFormContext } from 'react-hook-form';
import Input from './Input';

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  ...props
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

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


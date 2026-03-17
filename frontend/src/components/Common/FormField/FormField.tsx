import React from 'react';
import {
  FieldWrapper,
  Label,
  Input,
  Select,
  Textarea,
} from '@/components/Forms/AuthForm/Form.styled';

interface FormFieldProps {
  label: string;
  id: string;
  name?: string;
  type?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string | number; label: string }[];
  isTextarea?: boolean;
  isSelect?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  options,
  isTextarea = false,
  isSelect = false,
}) => {
  return (
    <FieldWrapper>
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>

      {isSelect ? (
        <Select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        >
          <option value="">Select...</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      ) : isTextarea ? (
        <Textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      )}
    </FieldWrapper>
  );
};

export default FormField;

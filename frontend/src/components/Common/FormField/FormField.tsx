import React, { forwardRef } from 'react';
import {
  FieldWrapper,
  Label,
  Input,
  Select,
  Textarea,
} from '@/components/Forms/AuthForm/Form.styled';

interface FormFieldProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> {
  label: string;
  id?: string;
  error?: string;
  isTextarea?: boolean;
  isSelect?: boolean;
  options?: { value: string | number; label: string }[];
}

const FormField = forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    { label, id, error, isTextarea = false, isSelect = false, options, required, ...props },
    ref,
  ) => {
    // Use provided id or fallback to name (which register() provides)
    const fieldId = id || props.name;

    return (
      <FieldWrapper>
        <Label htmlFor={fieldId}>
          {label} {required && '*'}
        </Label>

        {isSelect ? (
          <Select
            id={fieldId}
            ref={ref as React.Ref<HTMLSelectElement>}
            required={required}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
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
            id={fieldId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            required={required}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <Input
            id={fieldId}
            ref={ref as React.Ref<HTMLInputElement>}
            required={required}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && (
          <span style={{ color: '#e44848', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>
            {error}
          </span>
        )}
      </FieldWrapper>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;

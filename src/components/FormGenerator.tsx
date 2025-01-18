/**
 * FormGenerator Component
 * 
 * A dynamic form generator that creates form fields based on configuration.
 * Supports multiple field types including text, email, select, and textarea.
 * Includes real-time validation and error handling.
 */

import React, { useState, FormEvent } from 'react';
import { Box, Alert, Snackbar } from '@mui/material';
import { Select as BaseSelect, SelectProps } from '@mui/base/Select';
import { FormControl } from '@mui/base/FormControl';
import * as Icons from '@mui/icons-material';
import {
  StyledInput,
  SelectListbox,
  Popup,
  StyledOption,
  StyledTextarea,
  StyledButton,
  FormContainer,
  FormFieldContainer,
  InputWrapper,
  Label,
  HelperText,
  SelectButton
} from '../styles/theme';
import { emailPattern } from '../utils/validation';

/**
 * Raw form field configuration as received from JSON
 * Supports both camelCase and PascalCase properties for backwards compatibility
 */
interface RawFormField {
  name?: string;
  label?: string;
  type?: string;
  icon?: string;
  validation?: {
    required?: boolean;
    pattern?: { value: string; message: string };
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
  };
  Validation?: {
    required?: boolean;
    pattern?: { value: string; message: string };
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
  };
  options?: Array<string | { id: string; name: string }>;
  Options?: Array<string | { id: string; name: string }>;
}

/**
 * Normalized form field structure used internally
 */
interface FormField {
  name: string;
  label: string;
  type: string;
  icon?: string;
  validation?: {
    required?: boolean;
    pattern?: { value: string; message: string };
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
  };
  options?: Array<string | { id: string; name: string }>;
}

interface FormGeneratorProps {
  fields: RawFormField[];
}

const Select = React.forwardRef(function Select(
  props: SelectProps<string, false>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: SelectButton,
    listbox: SelectListbox,
    popup: Popup,
    ...props.slots,
  };

  return (
    <BaseSelect
      {...props}
      ref={ref}
      value={props.value || ''}
      slots={slots}
    />
  );
});

/**
 * Normalizes a raw form field into the internal format
 * Handles both camelCase and PascalCase property names
 */
const normalizeField = (field: RawFormField): FormField => ({
  name: field.name || field.label?.toLowerCase().replace(/\s+/g, '_') || 'unnamed_field',
  label: field.label || '',
  type: (field.type || 'text').toLowerCase(),
  icon: field.icon,
  validation: field.validation || field.Validation,
  options: field.options || field.Options || []
});

/**
 * Main form generator component
 * @param fields - Array of form field configurations
 */
const FormGenerator: React.FC<FormGeneratorProps> = ({ fields }) => {
  // Track form values and validation state
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Validates a single form field
   * @param field - The field configuration
   * @param value - Current field value
   * @returns Error message if validation fails, empty string otherwise
   */
  const validateField = (field: FormField, value: string): string => {
    // Required field validation
    if (field.validation?.required && !value) {
      return `${field.label} is required`;
    }

    // Email-specific validation
    if (field.type === 'email') {
      const emailRegex = new RegExp(emailPattern.value);
      if (!emailRegex.test(value)) {
        return emailPattern.message;
      }
    }

    // Custom pattern validation
    if (field.validation?.pattern?.value && value) {
      const regex = new RegExp(field.validation.pattern.value, 'i');
      if (!regex.test(value)) {
        return field.validation.pattern.message || `Invalid ${field.label.toLowerCase()} format`;
      }
    }

    // Length validations
    if (field.validation?.minLength && value.length < field.validation.minLength.value) {
      return field.validation.minLength.message;
    }
    if (field.validation?.maxLength && value.length > field.validation.maxLength.value) {
      return field.validation.maxLength.message;
    }
    return '';
  };

  /**
   * Handles form submission
   * Validates all fields and shows success message if valid
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    let hasErrors = false;

    fields.forEach(rawField => {
      const field = normalizeField(rawField);
      const value = formValues[field.name] || '';
      const error = validateField(field, value);
      if (error) {
        hasErrors = true;
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      console.log('Form submitted:', formValues);
      setShowSuccess(true);
      setFormValues({});
    }
  };

  const handleClear = () => {
    setFormValues({});
    setErrors({});
  };

  /**
   * Renders a single form field based on its type
   * Supports: text, email, number, select, textarea
   */
  const renderField = (rawField: RawFormField) => {
    const field = normalizeField(rawField);
    const fieldError = errors[field.name];
    const fieldId = `field-${field.name}`;
    
    return (
      <FormFieldContainer>
        <FormControl 
          key={field.name} 
          error={Boolean(fieldError)}
          required={field.validation?.required}
        >
          {/* Field label with optional icon */}
          <Label htmlFor={fieldId}>
            {field.icon && (
              <span className="icon-wrapper">
                {React.createElement(Icons[field.icon as keyof typeof Icons], { 
                  className: "label-icon"
                })}
              </span>
            )}
            {field.label}
          </Label>

          {/* Dynamic field rendering based on type */}
          <Box sx={{ width: '100%', position: 'relative' }}>
            {(() => {
              switch (field.type) {
                case 'text':
                case 'email':
                case 'number':
                  return (
                    <InputWrapper>
                      {/* Standard input field with real-time validation */}
                      <StyledInput 
                        id={fieldId}
                        type={field.type}
                        aria-label={field.label}
                        placeholder={`Enter ${field.label?.toLowerCase()}`}
                        sx={{ width: '100%' }}
                        value={formValues[field.name] || ''}
                        onChange={(event) => {
                          const value = event.target.value;
                          // Update form value
                          setFormValues(prev => ({ ...prev, [field.name]: value }));
                          // Validate on change
                          const error = validateField(field, value);
                          setErrors(prev => ({ ...prev, [field.name]: error }));
                        }}
                        // Validate on blur for better UX
                        onBlur={() => {
                          const value = formValues[field.name] || '';
                          const error = validateField(field, value);
                          setErrors(prev => ({ ...prev, [field.name]: error }));
                        }}
                      />
                    </InputWrapper>
                  );
                case 'select':
                  return (
                    // Custom select component with options
                    <Box sx={{ width: '100%', position: 'relative' }}>
                      <Select
                        id={fieldId}
                        value={formValues[field.name] || ''}
                        onChange={(_, value) => {
                          setFormValues(prev => ({ ...prev, [field.name]: String(value || '') }));
                          if (errors[field.name]) {
                            setErrors(prev => ({ ...prev, [field.name]: '' }));
                          }
                        }}
                        slotProps={{
                          root: {
                          'aria-label': field.label,
                          'aria-selected': formValues[field.name] ? 'true' : 'false'
                          },
                          listbox: {
                          style: {
                            maxWidth: 'auto'
                          }
                          },
                          popup: {
                          style: {
                            width: '100%',
                            maxWidth: '397px'
                          }
                          }
                        }}
                        >
                        <StyledOption value="">Select {field.label.toLowerCase()}</StyledOption>
                        {field.options?.map((option) => {
                          const value = typeof option === 'string' ? option : option.name;
                          return (
                            <StyledOption key={value} value={value}>
                              {value}
                            </StyledOption>
                          );
                        })}
                      </Select>
                    </Box>
                  );
                case 'textarea':
                  return (
                    <StyledTextarea
                      id={fieldId}
                      aria-label={field.label}
                      minRows={3}
                      placeholder={`Enter ${field.label?.toLowerCase()}`}
                      style={{ width: '100%' }}
                    />
                  );
                default:
                  return (
                    <StyledInput 
                      id={fieldId}
                      type={field.type}
                      aria-label={field.label}
                      sx={{ width: '100%' }}
                    />
                  );
              }
            })()}
          </Box>
          {/* Error message display */}
          {fieldError && <HelperText id={`${fieldId}-error`}>{fieldError}</HelperText>}
        </FormControl>
      </FormFieldContainer>
    );
  };

  return (
    <FormContainer onSubmit={handleSubmit} noValidate>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        {fields.map((field, index) => (
          <Box key={`field-${field.name || index}`} sx={{ width: '100%' }}>
            {renderField(field)}
          </Box>
        ))}
      </Box>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        justifyContent: 'flex-end',
        mt: 4,
        pt: 3,
        borderTop: t => `1px solid ${t.palette.divider}`
      }}>
        <StyledButton
          variant="clear"
          onClick={handleClear}
        >
          Clear
        </StyledButton>
        <StyledButton
          type="submit"
          variant="submit"
        >
          Submit
        </StyledButton>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          variant="filled"
        >
          Form submitted successfully!
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default FormGenerator;

/**
 * CompanySelector Component
 * 
 * Main container component that handles company selection and form generation.
 * Loads company configurations from JSON and generates corresponding forms.
 */

import React, { useState, useCallback } from 'react';
import { Select as BaseSelect } from '@mui/base/Select';
import { SelectProps } from '@mui/base/Select';
import { 
  Paper,
  Typography,
  Box,
} from '@mui/material';
import FormGenerator from './FormGenerator';
import companiesData from '../config/companies.json' assert { type: 'json' };
import {
  SelectListbox,
  Popup,
  StyledOption,
  SelectButton
} from '../styles/theme';

/**
 * Type for company keys from configuration
 */
type CompanyKey = keyof typeof companiesData;

/**
 * Interface for form field configuration
 */
interface FormField {
  name: string;
  label: string;
  type: string;
  icon?: string;
  validation?: {
    required?: boolean;
    pattern?: {
      value: string;
      message: string;
    };
  };
  options?: Array<string>;
}

/**
 * Interface for company form field configuration from JSON
 */
interface CompanyFormField {
  Label: string;
  Type: string;
  Icon?: string;
  Validation?: {
    required?: boolean;
    pattern?: string;
  };
  Options?: string[];
}

const Select = React.forwardRef(function Select(
  props: SelectProps<string, false>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <BaseSelect
      {...props}
      ref={ref}
      slots={{
        root: SelectButton,
        listbox: SelectListbox,
        popup: Popup,
        ...props.slots,
      }}
      slotProps={{
        root: {
          ...props.slotProps?.root,
        },
        listbox: {
          ...props.slotProps?.listbox,
        },
        popup: {
          ...props.slotProps?.popup,
        }
      }}
    />
  );
});

/**
 * Main component for company selection and form display
 * Handles:
 * - Company selection from dropdown
 * - Form field generation based on selection
 * - Dynamic form rendering
 */
const CompanySelector: React.FC = () => {
  // Track the currently selected company and its form configuration
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [formFields, setFormFields] = useState<FormField[]>([]);

  /**
   * Transform company selection into form fields
   * Memoized to prevent unnecessary re-renders
   */
  const handleCompanyChange = useCallback((value: string | null) => {
    const company = value as CompanyKey;
    setSelectedCompany(company);
    
    // Reset form when no company is selected
    if (!company) {
      setFormFields([]);
      return;
    }
  
    // Transform company configuration into form fields
    const mappedFields = companiesData[company]?.FormFields.map((field: CompanyFormField) => ({
      // Convert label to lowercase with underscores for field names
      name: field.Label.toLowerCase().replace(/\s+/g, '_'),
      label: field.Label,
      type: field.Type.toLowerCase(),
      icon: field.Icon,
      // Set up field validation rules
      validation: {
        required: field.Validation?.required || false,
        pattern: field.Validation?.pattern ? {
          value: field.Validation.pattern,
          message: `Invalid ${field.Label} format`
        } : undefined
      },
      options: field.Options || []
    })) || [];
  
    setFormFields(mappedFields);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      {/* Sticky company selector header */}
      <Paper 
        sx={{ 
          p: 3,
          position: 'sticky',
          top: 10,
          zIndex: 2, // Ensure dropdown appears above content
          backgroundColor: 'background.default',
          borderBottom: t => `3px solid ${t.palette.primary.main}`
        }}
      >
        {/* Section title */}
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          Select a Company
        </Typography>

        {/* Company selection dropdown */}
        <Box sx={{ width: '100%', position: 'relative' }}>
          <Select
            value={selectedCompany}
            onChange={(_, value) => handleCompanyChange(value)}
            defaultValue={selectedCompany}
            slotProps={{
              // Configure accessibility attributes
              root: {
                'aria-label': 'Select Company',
                'aria-selected': selectedCompany ? 'true' : 'false'
              },
              // Style configurations for dropdown
              listbox: { style: { maxWidth: '100%' } },
              popup: {
                style: {
                  width: '100%',
                  maxWidth: '432px',
                  zIndex: 2
                },
                'aria-label': 'Companies List'
              }
            }}
          >
            {/* Default placeholder option */}
            <StyledOption value="">Select a company</StyledOption>
            {/* Generate options from company data */}
            {Object.entries(companiesData).map(([key]) => (
              <StyledOption key={`company-${key}`} value={key}>
                {key}
              </StyledOption>
            ))}
          </Select>
        </Box>
      </Paper>
      
      {/* Dynamic form container */}
      <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column',minHeight: '325px' }}>
        {/* Show placeholder or form based on selection */}
        {!selectedCompany ? (
          // Placeholder when no company is selected
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flex: 1,
            color: 'text.secondary' 
          }}>
            <Typography sx={{ fontWeight: 'normal', fontSize: '0.9rem' }}>
              Select a company to start
            </Typography>
          </Box>
        ) : (
          // Render dynamic form with current field configuration
          <FormGenerator fields={formFields} />
        )}
      </Paper>
    </Box>
  );
};

export default CompanySelector;

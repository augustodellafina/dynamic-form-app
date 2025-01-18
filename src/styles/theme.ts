/**
 * Global Theme Configuration
 * 
 * Defines the application's theme including:
 * - Color palette
 * - Typography
 * - Component styles
 * - Custom styled components
 */

import { styled } from '@mui/system';
import { Input, Button, TextareaAutosize } from '@mui/base';
import { Option } from '@mui/base';
import { buttonClasses } from '@mui/base/Button';
import React from 'react';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { optionClasses } from '@mui/base/Option';
import {selectClasses} from '@mui/base/Select';
import {createTheme} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    red: { [key: number]: string };
  }
  interface PaletteOptions {
    red?: { [key: number]: string };
  }
}

/**
 * Color Palettes
 * Define custom color scales for the application
 */
export const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const red = {
  50: '#FFF2F2',
  100: '#FFE5E5',
  200: '#FFB2B2',
  300: '#FF8080',
  400: '#FF4D4D',
  500: '#FF1A1A',
  600: '#E60000',
  700: '#B30000',
  800: '#800000',
  900: '#4D0000',
};

/**
 * Material-UI Theme Configuration
 * Customizes the global theme settings
 */
export const theme = createTheme({
  palette: {
    grey,
    red,
    primary: {
      main: red[600],
      light: red[400],
      dark: red[800],
      contrastText: '#ffffff',
    },
    background: {
      default: grey[50],
      paper: '#ffffff',
    }
  },
  typography: {
    body2: {
      fontSize: 14,
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.25px',
    },
    h6: {
      fontWeight: 600,
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '100%',
          maxWidth: '800px !important',
          margin: '0 auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '@media (max-width: 600px)': {
            padding: '16px',
            width: '100%',
          },
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          fontWeight: 600,
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        }
      }
    }
  }
});

// Add these interfaces at the top
export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'select' | 'button' | 'submit' | 'clear';
}

interface SelectButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: React.ReactNode;
}

export const SelectButton = React.forwardRef(function SelectButton(
  props: SelectButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { children, ...other } = props;
  return React.createElement(StyledSelectButton, { ...other, ref },
    typeof children === 'string' ? children : 'Select',
    React.createElement(UnfoldMoreRoundedIcon)
  );
});

/**
 * Styled Components
 * Custom styled components for forms and inputs
 */

// Form Elements
// Input Components
export const StyledInput = styled(Input)`
  width: 100%;
  & input {
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${grey[900]};
    background: #fff;
    border: 1px solid ${grey[200]};
    box-shadow: 0 2px 2px ${grey[50]};
    padding-left: var(--input-padding, 12px); // Add this line

    &:hover {
      border-color: ${red[400]};
    }

    &:focus {
      border-color: ${red[400]};
      box-shadow: 0 0 0 3px ${red[100]};
      outline: none;
    }
  }
`;

// Select Components
export const StyledSelectButton = styled(Button, { shouldForwardProp: () => true })(
  () => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: #fff;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  position: relative;
  box-shadow: 0 2px 2px ${grey[50]};
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    background: ${red[50]};
    border-color: ${red[400]};
  }

  &:focus-visible {
    border-color: ${red[400]};
    box-shadow: 0 0 0 3px ${red[100]};
    outline: none;
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
    color: ${grey[500]};
    pointer-events: none;
  }

  &:hover > svg {
    color: ${red[400]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${red[400]};
    box-shadow: 0 0 0 3px ${red[100]};
  }

  &[aria-expanded="true"] {
    background: ${red[50]};
    border-color: ${red[400]};
    & > svg {
      color: ${red[400]};
    }
  }

  &[aria-selected="true"] {
    background: ${red[50]};
    border-color: ${red[400]};
    color: ${red[900]};
    font-weight: 500;
    & > svg {
      color: ${red[400]};
    }
  }
`);

export const SelectListbox = styled('ul')(
  () => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 6px 0;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: #fff;
  border: 1px solid ${red[200]};
  color: ${grey[900]};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }
`);

export const Popup = styled('div')`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;

  & > div {
    width: 100%;
    max-width: 100%;
  }
`;

export const StyledOption = styled(Option)(
  () => `
  list-style: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &[data-selected="true"] {
    background-color: ${red[100]};
    color: ${red[900]};
    font-weight: 500;
    &:hover {
      background-color: ${red[200]};
    }
  }

  &[data-highlighted="true"]:not([data-selected="true"]) {
    background-color: ${grey[100]};
    color: ${grey[900]};
    }
    
  &:hover:not([data-selected="true"]) {
    background-color: ${grey[100]};
  }

  &.${optionClasses.selected} {
    border: 1px solid ${red[200]};
    background-color: ${red[50]};
    color: ${red[900]};
    font-weight: 500;
  }

  &.${optionClasses.highlighted} {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${red[100]};
    color: ${red[900]};
  }

  &:hover:not(.${optionClasses.selected}):not(.${optionClasses.disabled}) {
    background-color: ${grey[50]};
  }
`);

// Form Components
export const StyledButton = styled(Button)<CustomButtonProps>(
  ({ variant = 'button' }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 24px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  min-width: 120px;
  text-transform: uppercase;

  ${variant === 'submit' ? `
    background-color: ${red[500]};
    color: white;
    border: 1px solid ${red[600]};
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: ${red[600]};
      border-color: ${red[600]};
    }

    &.${buttonClasses.active} {
      background-color: ${red[700]};
      box-shadow: none;
      transform: scale(0.98);
    }
  ` : variant === 'clear' ? `
    background-color: transparent;
    color: ${grey[700]};
    border: 1px solid ${grey[200]};
    box-shadow: none;

    &:hover {
      background-color: ${grey[50]};
      border-color: ${grey[200]};
    }

    &.${buttonClasses.active} {
      background-color: ${grey[700]};
      transform: scale(0.98);
    }
  ` : `
    background-color: ${red[600]};
    color: white;
    border: 1px solid ${red[600]};
    box-shadow: 0 2px 1px rgba(45, 45, 60, 0.2);

    &:hover {
      background-color: ${red[700]};
    }
  `}

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 3px ${variant === 'submit' ? red[100] : variant === 'clear' ? grey[200] : red[200]};
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${grey[200]};
    color: ${grey[400]};
    border: 1px solid ${grey[200]};
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
`);

export const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};

  &:hover {
    border-color: ${red[400]};
  }

  &:focus {
    border-color: ${red[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? red[600] : red[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`);

// Container Components
export const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  background: #fff;
`;

export const FormFieldContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  padding: 16px;
  border: 1px solid ${grey[200]};
  border-radius: 8px;

  &:hover {
    border-color: ${red[400]};
    & .label-icon {
      color: ${red[400]};
    }
  }
`;

export const InputWrapper = styled('div')`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  & .icon {
    position: absolute;
    left: 12px;
    color: ${grey[500]};
    pointer-events: none;
  }
`;

// Label Components
export const Label = styled('label')<{ icon?: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${grey[900]};
  margin-bottom: 8px;

  & .icon-wrapper {
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
  }

  & .label-icon {
    color: ${grey[500]};
    font-size: 1.2rem;
    transition: color 0.2s ease;
  }

  &:hover .label-icon {
    color: ${red[400]};
  }

  &.required::after {
    content: ' *';
    color: ${red[500]};
  }
`;

export const HelperText = styled('span')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.75rem;
  color: ${red[500]};
  margin-top: 4px;
`;

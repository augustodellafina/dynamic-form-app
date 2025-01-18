import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormGenerator from '../components/FormGenerator';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const mockFields = [
  {
    label: "Full Name",
    type: "text",
    icon: "Person",
    validation: {
      required: true
    }
  },
  {
    label: "Email Address",
    type: "email",
    icon: "AlternateEmail",
    validation: {
      required: true,
      pattern: {
        value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        message: "Invalid email format"
      }
    }
  },
  {
    label: "Department",
    type: "select",
    icon: "Business",
    options: ["HR", "IT", "Finance"],
    validation: {
      required: true
    }
  },
  {
    label: "Comments",
    type: "textarea",
    icon: "Comment"
  }
];

const renderFormGenerator = () => {
  return render(
    <ThemeProvider theme={theme}>
      <FormGenerator fields={mockFields} />
    </ThemeProvider>
  );
};

describe('FormGenerator Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup({ delay: null });
    renderFormGenerator();
  });

  it('renders all form fields with correct labels', () => {
    mockFields.forEach(field => {
      expect(screen.getByText(field.label)).toBeInTheDocument();
    });
  });

  it('renders all icons correctly', () => {
    const iconWrappers = screen.getAllByTestId('icon-wrapper');
    expect(iconWrappers).toHaveLength(mockFields.length);
  });

  it('shows validation errors for required fields when submitting empty', async () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await act(async () => {
      await user.click(submitButton);
    });

    const requiredFields = mockFields.filter(field => field.validation?.required);
    for (const field of requiredFields) {
      expect(screen.getByText(`${field.label} is required`)).toBeInTheDocument();
    }
  });

  it('handles text input correctly', async () => {
    const input = screen.getByLabelText(/full name/i);
    await act(async () => {
      await user.type(input, 'John Doe');
    });
    expect(input).toHaveValue('John Doe');
  });

  it('handles email input correctly', async () => {
    const input = screen.getByLabelText(/email address/i);
    await userEvent.type(input, 'john@example.com');
    expect(input).toHaveValue('john@example.com');
  });

  it('handles select input correctly', async () => {
    const select = screen.getByRole('combobox', { name: /department/i });
    await act(async () => {
      await user.click(select);
      const option = screen.getByRole('option', { name: 'HR' });
      await user.click(option);
    });
    expect(select).toHaveTextContent('HR');
  });

  it('handles textarea input correctly', async () => {
    const textarea = screen.getByRole('textbox', { name: /comments/i });
    await userEvent.type(textarea, 'Test comment');
    expect(textarea).toHaveValue('Test comment');
  });

  it('clears form values when Clear button is clicked', async () => {
    const nameInput = screen.getByRole('textbox', { name: /full name/i });
    await userEvent.type(nameInput, 'John Doe');

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);

    expect(nameInput).toHaveValue('');
  });

  it('validates email format', async () => {
    const emailInput = screen.getByLabelText(/email address/i);
    await userEvent.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });
});

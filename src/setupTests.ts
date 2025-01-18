import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { useSelect } from '@mui/base';

// Extend expect with DOM matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Type definition for the actual object
interface SelectHookResult {
  useSelect: () => Record<string, unknown>;
  [key: string]: unknown;
}

// Mock useSelect hook
const mockUseSelect = () => {
  const actual = useSelect as unknown as SelectHookResult;
  
  return {
    useSelect: () => ({
      ...actual.useSelect(),
      getOptionProps: () => ({
        role: 'option',
        'aria-selected': false
      }),
      getRootProps: () => ({
        role: 'combobox',
        'aria-expanded': false
      }),
      getListboxProps: () => ({
        role: 'listbox'
      }),
    })
  };
};

jest.mock('@mui/base', () => ({
  useSelect: mockUseSelect
}));

beforeAll(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

afterAll(() => {
  vi.resetModules();
});

export {};

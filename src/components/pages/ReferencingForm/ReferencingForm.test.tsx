import React from 'react';
import { render } from '@testing-library/react';
import ReferencingForm from './ReferencingForm';
import { StepName, initialState } from './ReferencingForm.reducer';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useReducer: jest.fn(),
}));

describe('ReferencingForm component', () => {
  it('renders with Personal step', () => {
    const mockDispatch = jest.fn();
    (React.useReducer as jest.Mock).mockReturnValue([
      {
        ...initialState,
        step: StepName.PERSONAL,
      },
      mockDispatch,
    ]);

    const { getByText } = render(<ReferencingForm />);

    expect(getByText('Goodlord referencing form')).toBeInTheDocument();
    expect(getByText('Personal')).toBeInTheDocument();
  });

  it('renders with Employer step', () => {
    const mockDispatch = jest.fn();
    (React.useReducer as jest.Mock).mockReturnValue([
      {
        ...initialState,
        step: StepName.EMPLOYER,
      },
      mockDispatch,
    ]);

    const { getByText } = render(<ReferencingForm />);

    expect(getByText('Goodlord referencing form')).toBeInTheDocument();
    expect(getByText('Employer')).toBeInTheDocument();
  });

  it('renders with Guarantor step', () => {
    const mockDispatch = jest.fn();
    (React.useReducer as jest.Mock).mockReturnValue([
      {
        ...initialState,
        step: StepName.GUARANTOR,
      },
      mockDispatch,
    ]);

    const { getByText } = render(<ReferencingForm />);

    expect(getByText('Goodlord referencing form')).toBeInTheDocument();
    expect(getByText('Guarantor')).toBeInTheDocument();
  });

  it('renders with Confirmation step', () => {
    const mockDispatch = jest.fn();
    (React.useReducer as jest.Mock).mockReturnValue([
      {
        ...initialState,
        step: StepName.CONFIRMATION,
      },
      mockDispatch,
    ]);

    const { getByText } = render(<ReferencingForm />);

    expect(getByText('Goodlord referencing form')).toBeInTheDocument();
    expect(getByText('Confirmation')).toBeInTheDocument();
  });
});

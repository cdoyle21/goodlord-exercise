import React from 'react';
import { render } from '@testing-library/react';
import ReferencingForm from './ReferencingForm';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useReducer: jest.fn(),
}));

jest.mock('./ReferencingForm.reducer', () => {
  const initialState = {
    step: 'PERSONAL',
    personalValues: {
      firstName: '',
      lastName: '',
      address: '',
    },
    employerValues: {
      employerName: '',
      employerStartDate: null,
      employerEndDate: null,
    },
    guarantorValues: {
      guarantorName: '',
      guarantorAddress: '',
      relationship: 'PARENT',
    },
  };
  return {
    initialState,
    reducer: jest.fn(),
    StepName: {
      PERSONAL: 'Personal',
      EMPLOYER: 'Employer',
      GUARANTOR: 'Guarantor',
    },
    GuarantorRelationship: {
      PARENT: 'Parent',
      SIBLING: 'Sibling',
      EMPLOYER: 'Employer',
      OTHER: 'Other',
    },
  };
});

describe('ReferencingForm component', () => {
  it('renders with Personal step', () => {
    const mockDispatch = jest.fn();
    (React.useReducer as jest.Mock).mockReturnValue([
      {
        step: 'Personal',
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
        step: 'Employer',
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
        step: 'Guarantor',
      },
      mockDispatch,
    ]);

    const { getByText } = render(<ReferencingForm />);

    expect(getByText('Goodlord referencing form')).toBeInTheDocument();
    expect(getByText('Guarantor')).toBeInTheDocument();
  });
});

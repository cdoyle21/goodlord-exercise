import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EmployerStep from './EmployerStep';
import { GuarantorRelationship, StepName } from '../../ReferencingForm.reducer';

const mockDispatch = jest.fn();
const initialState = {
  step: StepName.EMPLOYER,
  personalValues: {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
  },
  employerValues: [
    {
      employerName: '',
      employerStartDate: null,
      employerEndDate: null,
    },
  ],
  guarantorValues: {
    guarantorName: '',
    guarantorAddress: '',
    relationship: GuarantorRelationship.PARENT,
  },
};

const setup = () => {
  const utils = render(<EmployerStep localDispatch={mockDispatch} localState={initialState} />);
  const employerNameInput = utils.getByTestId('employerName-input');
  const startDateInput = utils.getByTestId('employmentStartDate-input');
  const endDateInput = utils.getByTestId('employmentEndDate-input');
  const continueButton = utils.getByTestId('employer-continue-action');
  return {
    employerNameInput,
    startDateInput,
    endDateInput,
    continueButton,
    ...utils,
  };
};

describe('EmployerStep', () => {
  it('renders with all input fields', () => {
    const { employerNameInput, startDateInput, endDateInput, continueButton } = setup();
    expect(employerNameInput).toBeInTheDocument();
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });

  it('calls dispatch with correct action and payload when Continue button is clicked', async () => {
    const { employerNameInput, startDateInput, endDateInput, continueButton } = setup();

    fireEvent.change(employerNameInput, { target: { value: 'ABC Corporation' } });
    fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2022-12-31' } });

    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setStep',
        payload: StepName.GUARANTOR,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setEmployerValues',
        payload: [
          {
            employerName: 'ABC Corporation',
            employerStartDate: '2022-01-01',
            employerEndDate: '2022-12-31',
          },
        ],
      });
    });
  });
});

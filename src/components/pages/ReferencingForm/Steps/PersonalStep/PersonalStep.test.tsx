import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PersonalStep from './PersonalStep';
import { GuarantorRelationship, StepName } from '../../ReferencingForm.reducer';

const mockDispatch = jest.fn();

const initialState = {
  step: StepName.PERSONAL,
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
    relationship: GuarantorRelationship.PARENT,
  },
};

const setup = () => {
  const utils = render(<PersonalStep localDispatch={mockDispatch} localState={initialState} />);
  const firstNameInput = utils.getByTestId('firstName-input');
  const lastNameInput = utils.getByTestId('lastName-input');
  const addressInput = utils.getByTestId('address-input');
  const continueButton = utils.getByTestId('personal-continue-action');
  return {
    firstNameInput,
    lastNameInput,
    addressInput,
    continueButton,
    ...utils,
  };
};

describe('PersonalStep', () => {
  it('renders with all input fields', () => {
    const { firstNameInput, lastNameInput, addressInput, continueButton } = setup();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });

  it('calls dispatch with correct action when Continue button is clicked', async () => {
    const { firstNameInput, lastNameInput, addressInput, continueButton } = setup();

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setStep',
        payload: StepName.EMPLOYER,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setPersonalValues',
        payload: {
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
        },
      });
    });
  });
});

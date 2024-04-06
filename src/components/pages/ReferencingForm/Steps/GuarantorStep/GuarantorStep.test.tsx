import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GuarantorStep from './GuarantorStep';
import { GuarantorRelationship, StepName } from '../../ReferencingForm.reducer';

const mockDispatch = jest.fn();

const initialState = {
  step: StepName.GUARANTOR,
  personalValues: {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
  },
  employerValues: {
    employerName: 'ABC Corporation',
    employerStartDate: new Date('2022-01-01'),
    employerEndDate: new Date('2022-12-31'),
  },
  guarantorValues: {
    guarantorName: '',
    guarantorAddress: '',
    relationship: GuarantorRelationship.PARENT,
  },
};

const setup = () => {
  const utils = render(<GuarantorStep localDispatch={mockDispatch} localState={initialState} />);
  const guarantorNameInput = utils.getByTestId('guarantorName-input');
  const guarantorAddressInput = utils.getByTestId('guarantorAddress-input');
  const relationshipSelect = utils.getByTestId('relationship-input');
  const submitButton = utils.getByTestId('guarantor-submit-action');
  return {
    guarantorNameInput,
    guarantorAddressInput,
    relationshipSelect,
    submitButton,
    ...utils,
  };
};

describe('GuarantorStep', () => {
  it('renders with all input fields', () => {
    const { guarantorNameInput, guarantorAddressInput, relationshipSelect, submitButton } = setup();
    expect(guarantorNameInput).toBeInTheDocument();
    expect(guarantorAddressInput).toBeInTheDocument();
    expect(relationshipSelect).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('calls dispatch with correct action when Submit button is clicked', async () => {
    const { guarantorNameInput, guarantorAddressInput, relationshipSelect, submitButton } = setup();

    fireEvent.change(guarantorNameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(guarantorAddressInput, { target: { value: '456 Elm St' } });
    fireEvent.change(relationshipSelect, { target: { value: GuarantorRelationship.SIBLING } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setGuarantorValues',
        payload: {
          guarantorName: 'Jane Doe',
          guarantorAddress: '456 Elm St',
          relationship: GuarantorRelationship.SIBLING,
        },
      });
    });
  });
});

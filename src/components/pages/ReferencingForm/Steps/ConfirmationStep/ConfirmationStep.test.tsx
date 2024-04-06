import React from 'react';
import { render } from '@testing-library/react';
import ConfirmationStep from './ConfirmationStep';

describe('ConfirmationStep', () => {
  it('renders the component with correct content', () => {
    const { getByText } = render(<ConfirmationStep />);

    expect(getByText('Confirmation')).toBeInTheDocument();
    expect(
      getByText('Thank you for your submission. We will get back to you soon.'),
    ).toBeInTheDocument();
  });
});

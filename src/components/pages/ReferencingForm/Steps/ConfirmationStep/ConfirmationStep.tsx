import React, { FC } from 'react';
import { Container, Subtitle } from '../../ReferencingForm.styles';

const ConfirmationStep: FC = () => {
  return (
    <Container>
      <Subtitle>Confirmation</Subtitle>
      <p>Thank you for your submission. We will get back to you soon.</p>
    </Container>
  );
};

export default ConfirmationStep;

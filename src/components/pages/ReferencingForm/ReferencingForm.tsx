import React, { FC, useReducer } from 'react';
import { Container } from './ReferencingForm.styles';
import { StepName, initialState, reducer } from './ReferencingForm.reducer';

const ReferencingForm: FC = () => {
  const [localState, localDispatch] = useReducer(reducer, initialState);

  const activeStep: StepName = localState.step;

  const returnStep = (stepName: StepName) => {
    switch (stepName) {
      case StepName.EMPLOYER:
        return <></>;
      case StepName.GUARANTOR:
        return <></>;
      default:
        return <></>;
    }
  };

  return <Container>{returnStep(activeStep)}</Container>;
};

export default ReferencingForm;

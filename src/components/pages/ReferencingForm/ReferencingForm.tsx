import React, { FC, useReducer } from 'react';
import { Wrapper, Title, Steps } from './ReferencingForm.styles';
import { StepName, initialState, reducer } from './ReferencingForm.reducer';
import PersonalStep from './Steps/PersonalStep';
import EmployerStep from './Steps/EmployerStep';
import GuarantorStep from './Steps/GuarantorStep';

const ReferencingForm: FC = () => {
  const [localState, localDispatch] = useReducer(reducer, initialState);

  const activeStep: StepName = localState.step;

  const returnStep = (stepName: StepName) => {
    switch (stepName) {
      case StepName.EMPLOYER:
        return <EmployerStep localDispatch={localDispatch} localState={localState} />;
      case StepName.GUARANTOR:
        return <GuarantorStep localDispatch={localDispatch} localState={localState} />;
      default:
        return <PersonalStep localDispatch={localDispatch} localState={localState} />;
    }
  };

  return (
    <Wrapper>
      <Title>Goodlord referencing form</Title>
      <Steps>{returnStep(activeStep)}</Steps>
    </Wrapper>
  );
};

export default ReferencingForm;

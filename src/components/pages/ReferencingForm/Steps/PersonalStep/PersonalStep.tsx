import React, { Dispatch, FC } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Subtitle,
  InputLabel,
  InputWrapper,
  ErrorWrapper,
  Buttons,
} from '../../ReferencingForm.styles';
import { Action, PersonalValues, State, StepName } from '../../ReferencingForm.reducer';
import { Button } from '../../../../atoms/Button/Button';

type Props = {
  localDispatch: Dispatch<Action>;
  localState: State;
};

const PersonalStep: FC<Props> = ({ localDispatch, localState }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name can not be empty')
      .max(30, 'You have exceeded the character limit for a first name')
      .trim(),
    lastName: Yup.string()
      .required('Last name can not be empty')
      .max(30, 'You have exceeded the character limit for a last name')
      .trim(),
    address: Yup.string().required('Address can not be empty'),
  });

  const onSubmit = (values: PersonalValues) => {
    localDispatch({ type: 'setStep', payload: StepName.EMPLOYER });
    localDispatch({ type: 'setPersonalValues', payload: values });
  };

  return (
    <Container>
      <Subtitle>Personal</Subtitle>
      <Formik
        initialValues={localState.personalValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, isSubmitting, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <InputLabel htmlFor="first name">First name</InputLabel>
            <InputWrapper>
              <Field type="text" name="firstName" data-testid="firstName-input" />
              <ErrorWrapper>
                <ErrorMessage name="firstName" />
              </ErrorWrapper>
            </InputWrapper>

            <InputLabel htmlFor="last name">Last name</InputLabel>
            <InputWrapper>
              <Field type="text" name="lastName" data-testid="lastName-input" />
              <ErrorWrapper>
                <ErrorMessage name="lastName" />
              </ErrorWrapper>
            </InputWrapper>

            <InputLabel htmlFor="address">Address</InputLabel>
            <InputWrapper>
              <Field type="text" name="address" data-testid="address-input" />
              <ErrorWrapper>
                <ErrorMessage name="address" />
              </ErrorWrapper>
            </InputWrapper>

            <Buttons>
              <Button
                onClick={() => onSubmit(values)}
                testId="personal-continue-action"
                disabled={!isValid || !dirty}
                loading={isSubmitting}
              >
                Continue
              </Button>
            </Buttons>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default PersonalStep;

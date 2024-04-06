import React, { Dispatch, FC } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  InputLabel,
  InputWrapper,
  ErrorWrapper,
  Buttons,
  Subtitle,
} from '../../ReferencingForm.styles';
import { Action, EmployerValues, State, StepName } from '../../ReferencingForm.reducer';
import { Button } from '../../../../atoms/Button';

type Props = {
  localDispatch: Dispatch<Action>;
  localState: State;
};

const EmployerStep: FC<Props> = ({ localDispatch, localState }) => {
  const validationSchema = Yup.object().shape({
    employerName: Yup.string()
      .required('Employer name can not be empty')
      .max(50, 'You have exceeded the character limit for an employer name')
      .trim(),
    employerStartDate: Yup.date()
      .required('Start date can not be empty')
      .max(new Date(), 'Start date must be in the past'),
    employerEndDate: Yup.date()
      .required('End date can not be empty')
      .min(Yup.ref('employerStartDate'), 'End date can not be before start date'),
  });

  const onSubmit = (values: EmployerValues) => {
    localDispatch({ type: 'setStep', payload: StepName.GUARANTOR });
    localDispatch({ type: 'setEmployerValues', payload: values });
  };

  return (
    <Container>
      <Subtitle>Employer</Subtitle>
      <Formik
        initialValues={localState.employerValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, isSubmitting, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <InputLabel htmlFor="employer name">Employer name</InputLabel>
            <InputWrapper>
              <Field type="text" name="employerName" data-testid="employerName-input" />
              <ErrorWrapper>
                <ErrorMessage name="employerName" />
              </ErrorWrapper>
            </InputWrapper>

            <InputLabel htmlFor="employment start date">Employment start date</InputLabel>
            <InputWrapper>
              <Field
                type="date"
                name="employerStartDate"
                placeholder="YYYY-MM-DD"
                data-testid="employmentStartDate-input"
              />
              <ErrorWrapper>
                <ErrorMessage name="employerStartDate" />
              </ErrorWrapper>
            </InputWrapper>

            <InputLabel htmlFor="employment end date">Employment end date</InputLabel>
            <InputWrapper>
              <Field
                type="date"
                name="employerEndDate"
                placeholder="YYYY-MM-DD"
                data-testid="employmentEndDate-input"
              />
              <ErrorWrapper>
                <ErrorMessage name="employerEndDate" />
              </ErrorWrapper>
            </InputWrapper>

            <Buttons>
              <Button
                onClick={() => onSubmit(values)}
                testId="employer-continue-action"
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

export default EmployerStep;

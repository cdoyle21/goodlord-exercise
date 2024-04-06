import React, { Dispatch, FC } from 'react';
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik';
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
  const initialValues = {
    employers: localState.employerValues.map((employer: EmployerValues) => ({
      employerName: employer.employerName,
      employerStartDate: employer.employerStartDate,
      employerEndDate: employer.employerEndDate,
    })),
  };

  const validationSchema = Yup.object().shape({
    employers: Yup.array().of(
      Yup.object().shape({
        employerName: Yup.string()
          .required('Employer name can not be empty')
          .max(50, 'You have exceeded the character limit for an employer name')
          .trim(),
        employerStartDate: Yup.date()
          .required('Start date can not be empty')
          .max(new Date(), 'Start date must be in the past'),
        employerEndDate: Yup.date()
          .min(Yup.ref('employerStartDate'), 'End date can not be before start date')
          .nullable(),
      }),
    ),
  });

  const onCancel = () => {
    localDispatch({ type: 'setStep', payload: StepName.PERSONAL });
    localDispatch({ type: 'clearValues' });
  };

  const onSubmit = (values: { employers: Array<EmployerValues> }) => {
    localDispatch({ type: 'setStep', payload: StepName.GUARANTOR });
    localDispatch({ type: 'setEmployerValues', payload: values.employers });
  };

  return (
    <Container>
      <Subtitle>Employer</Subtitle>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit, values, isSubmitting, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <FieldArray name="employers">
              {() => (
                <>
                  {values.employers.map((employer, index) => (
                    <div key={index}>
                      <InputLabel htmlFor={`employerName-${index}`}>Employer name</InputLabel>
                      <InputWrapper>
                        <Field
                          type="text"
                          name={`employers[${index}].employerName`}
                          data-testid="employerName-input"
                        />
                        <ErrorWrapper>
                          <ErrorMessage name={`employers[${index}].employerName`} />
                        </ErrorWrapper>
                      </InputWrapper>

                      <InputLabel htmlFor={`employerStartDate-${index}`}>
                        Employment start date
                      </InputLabel>
                      <InputWrapper>
                        <Field
                          type="date"
                          name={`employers[${index}].employerStartDate`}
                          data-testid="employmentStartDate-input"
                        />
                        <ErrorWrapper>
                          <ErrorMessage name={`employers[${index}].employerStartDate`} />
                        </ErrorWrapper>
                      </InputWrapper>

                      <InputLabel htmlFor={`employerEndDate-${index}`}>
                        Employment end date
                      </InputLabel>
                      <InputWrapper>
                        <Field
                          type="date"
                          name={`employers[${index}].employerEndDate`}
                          data-testid="employmentEndDate-input"
                        />
                        <ErrorWrapper>
                          <ErrorMessage name={`employers[${index}].employerEndDate`} />
                        </ErrorWrapper>
                      </InputWrapper>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>

            <Buttons>
              <Button onClick={() => onCancel()} testId="employer-cancel-action">
                Cancel
              </Button>

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

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
import {
  Action,
  GuarantorValues,
  State,
  GuarantorRelationship,
  StepName,
} from '../../ReferencingForm.reducer';
import { Button } from '../../../../atoms/Button/Button';
import { createReference } from '../../../../services/references';

type Props = {
  localDispatch: Dispatch<Action>;
  localState: State;
  referenceEndpoint?: string;
};

const GuarantorStep: FC<Props> = ({ localDispatch, localState, referenceEndpoint }) => {
  const validationSchema = Yup.object().shape({
    guarantorName: Yup.string()
      .required('Guarantor name can not be empty')
      .max(30, 'You have exceeded the character limit for a guarantor name')
      .trim(),
    guarantorAddress: Yup.string().required('Guarantor address can not be empty'),
    relationship: Yup.string().required('Please select an option'),
  });

  const onSubmit = async (values: GuarantorValues) => {
    try {
      localDispatch({ type: 'setGuarantorValues', payload: values });
      localDispatch({ type: 'setStep', payload: StepName.CONFIRMATION });

      const { personalValues, employerValues } = localState;

      const newReference = await createReference(
        {
          personalValues: {
            firstName: personalValues.firstName,
            lastName: personalValues.lastName,
            address: personalValues.address,
          },
          employerValues: employerValues.map((employer) => ({
            employerName: employer.employerName,
            employerStartDate: employer.employerStartDate,
            employerEndDate: employer.employerEndDate,
          })),
          guarantorValues: values,
        },
        referenceEndpoint,
      );

      if (!newReference) {
        throw new Error('Failed to create reference');
      }
    } catch (error) {
      console.error('Error creating reference:', error);
    }
  };

  return (
    <Container>
      <Subtitle>Guarantor</Subtitle>
      <Formik
        initialValues={localState.guarantorValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, isSubmitting, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <InputLabel htmlFor="guarantor name">Guarantor name</InputLabel>
            <InputWrapper>
              <Field type="text" name="guarantorName" data-testid="guarantorName-input" />
              <ErrorWrapper>
                <ErrorMessage name="guarantorName" />
              </ErrorWrapper>
            </InputWrapper>

            <InputLabel htmlFor="guarantor address">Guarantor address</InputLabel>
            <InputWrapper>
              <Field type="text" name="guarantorAddress" data-testid="guarantorAddress-input" />
              <ErrorWrapper>
                <ErrorMessage name="guarantorAddress" />
              </ErrorWrapper>
            </InputWrapper>

            <InputLabel htmlFor="relationship">Relationship to guarantor</InputLabel>
            <InputWrapper>
              <Field as="select" name="relationship" data-testid="relationship-input">
                <option value={GuarantorRelationship.PARENT}>{GuarantorRelationship.PARENT}</option>
                <option value={GuarantorRelationship.SIBLING}>
                  {GuarantorRelationship.SIBLING}
                </option>
                <option value={GuarantorRelationship.EMPLOYER}>
                  {GuarantorRelationship.EMPLOYER}
                </option>
                <option value={GuarantorRelationship.OTHER}>{GuarantorRelationship.OTHER}</option>
              </Field>
              <ErrorWrapper>
                <ErrorMessage name="relationship" />
              </ErrorWrapper>
            </InputWrapper>

            <Buttons>
              <Button
                onClick={() => onSubmit(values)}
                testId="guarantor-submit-action"
                disabled={!isValid || !dirty}
                loading={isSubmitting}
              >
                Submit
              </Button>
            </Buttons>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default GuarantorStep;

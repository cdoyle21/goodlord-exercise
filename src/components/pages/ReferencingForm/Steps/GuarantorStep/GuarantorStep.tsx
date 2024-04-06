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
} from '../../ReferencingForm.reducer';
import { Button } from '../../../../atoms/Button/Button';

type Props = {
  localDispatch: Dispatch<Action>;
  localState: State;
};

const GuarantorStep: FC<Props> = ({ localDispatch, localState }) => {
  const validationSchema = Yup.object().shape({
    guarantorName: Yup.string()
      .required('Guarantor name can not be empty')
      .max(30, 'You have exceeded the character limit for a guarantor name')
      .trim(),
    guarantorAddress: Yup.string().required('Guarantor address can not be empty'),
    relationship: Yup.string().required('Please select an option'),
  });

  const onSubmit = (values: GuarantorValues) => {
    localDispatch({ type: 'setGuarantorValues', payload: values });
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

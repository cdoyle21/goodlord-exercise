import axios from 'axios';
import { GuarantorRelationship, State } from '../pages/ReferencingForm/ReferencingForm.reducer';

export type CreateReferenceData = Omit<State, 'step'>;

export type CreateReferenceResult = {
  personal: {
    first_name: string;
    last_name: string;
    current_address: string;
  };
  employer: [
    {
      name: string;
      start_date: Date;
      end_date: Date | null;
    },
  ];
  guarantor: {
    name: string;
    address: string;
    relation: GuarantorRelationship;
  };
};

/**
 * Create a reference
 * @param referencesServiceUrl Reference Service URL endpoint
 * @param data Object matching the shape of CreateReferenceData passed to request body
 * @returns A new reference
 */
export const createReference = async (
  referenceData: CreateReferenceData,
  referencesServiceUrl?: string,
): Promise<CreateReferenceResult> => {
  const url = `${referencesServiceUrl}/new`;
  const { personalValues, employerValues, guarantorValues } = referenceData;
  try {
    const { data: response } = await axios({
      method: 'post',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      },
      data: {
        personal: {
          first_name: personalValues.firstName,
          last_name: personalValues.lastName,
          current_address: personalValues.address,
        },
        employer: employerValues.map((employer) => ({
          name: employer.employerName,
          start_date: employer.employerStartDate,
          end_date: employer.employerEndDate,
        })),
        guarantor: {
          name: guarantorValues.guarantorName,
          address: guarantorValues.guarantorAddress,
          relation: guarantorValues.relationship,
        },
      },
    });

    return response;
  } catch (error) {
    console.log('Reference service error: ', error);
    throw error;
  }
};

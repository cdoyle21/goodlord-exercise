export enum StepName {
  PERSONAL = 'Personal',
  EMPLOYER = 'Employer',
  GUARANTOR = 'Guarantor',
  CONFIRMATION = 'Confirmation',
}

export enum GuarantorRelationship {
  PARENT = 'Parent',
  SIBLING = 'Sibling',
  EMPLOYER = 'Employer',
  OTHER = 'Other',
}

export type PersonalValues = {
  firstName: string;
  lastName: string;
  address: string;
};

export type EmployerValues = {
  employerName: string;
  employerStartDate: Date | null;
  employerEndDate: Date | null;
};

export type GuarantorValues = {
  guarantorName: string;
  guarantorAddress: string;
  relationship: GuarantorRelationship;
};

export type State = {
  step: StepName;
  personalValues: PersonalValues;
  employerValues: Array<EmployerValues>;
  guarantorValues: GuarantorValues;
};

export type Action =
  | { type: 'setStep'; payload: StepName }
  | { type: 'setPersonalValues'; payload: PersonalValues }
  | { type: 'setEmployerValues'; payload: Array<EmployerValues> }
  | { type: 'setGuarantorValues'; payload: GuarantorValues };

export const initialState: State = {
  step: StepName.PERSONAL,
  personalValues: {
    firstName: '',
    lastName: '',
    address: '',
  },
  employerValues: [
    {
      employerName: '',
      employerStartDate: null,
      employerEndDate: null,
    },
  ],
  guarantorValues: {
    guarantorName: '',
    guarantorAddress: '',
    relationship: GuarantorRelationship.PARENT,
  },
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setStep':
      return {
        ...state,
        step: action.payload,
      };
    case 'setPersonalValues':
      return {
        ...state,
        personalValues: action.payload,
      };
    case 'setEmployerValues':
      return {
        ...state,
        employerValues: action.payload,
      };
    case 'setGuarantorValues':
      return {
        ...state,
        guarantorValues: action.payload,
      };
    default:
      return { ...state };
  }
};

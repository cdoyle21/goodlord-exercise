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
  employerStartDate: Date;
  employerEndDate: Date;
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
  | { type: 'setGuarantorValues'; payload: GuarantorValues }
  | { type: 'clearValues' };

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
      employerStartDate: new Date(),
      employerEndDate: new Date(),
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
    case 'clearValues':
      return { ...initialState };
    default:
      return { ...state };
  }
};

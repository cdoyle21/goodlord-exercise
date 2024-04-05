export enum StepName {
  PERSONAL = 'Personal',
  EMPLOYER = 'Employer',
  GUARANTOR = 'Guarantor',
}

export interface State {
  step: StepName;
}

export type Action = { type: 'setStep'; payload: StepName };

export const initialState: State = {
  step: StepName.PERSONAL,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setStep':
      return {
        ...state,
        step: action.payload,
      };
    default:
      return { ...state };
  }
};

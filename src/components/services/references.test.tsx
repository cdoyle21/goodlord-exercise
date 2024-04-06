const axios = require('axios');
import { createReference } from './references';
import { GuarantorRelationship } from '../pages/ReferencingForm/ReferencingForm.reducer';

jest.mock('axios');

describe('createReference', () => {
  const referencesServiceUrl = 'http://example.com/references';
  const mockData = {
    personalValues: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
    },
    employerValues: [
      {
        employerName: 'ABC Inc',
        employerStartDate: new Date('2020-01-01'),
        employerEndDate: new Date('2021-01-01'),
      },
    ],
    guarantorValues: {
      guarantorName: 'Jane Smith',
      guarantorAddress: '456 Oak St',
      relationship: GuarantorRelationship.EMPLOYER,
    },
  };

  const mockResponseData = {
    data: {
      personal: {
        first_name: 'John',
        last_name: 'Doe',
        current_address: '123 Main St',
      },
      employer: [
        {
          name: 'ABC Inc',
          start_date: new Date('2020-01-01'),
          end_date: new Date('2021-01-01'),
        },
      ],
      guarantor: {
        name: 'Jane Smith',
        address: '456 Oak St',
        relation: 'Employer',
      },
    },
  };

  it('should create a reference successfully', async () => {
    axios.mockImplementationOnce(() => Promise.resolve(mockResponseData));

    const result = await createReference(mockData, referencesServiceUrl);
    expect(result).toEqual(mockResponseData.data);
  });

  it('should handle error when creating reference', async () => {
    console.error = jest.fn();
    const mockedError = new Error('mock error');
    axios.mockImplementationOnce(() => Promise.reject(mockedError));

    await expect(createReference(mockData, referencesServiceUrl)).rejects.toThrow(mockedError);
  });
});

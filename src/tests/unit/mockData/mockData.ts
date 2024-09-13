import mongoose from 'mongoose';
import { Status } from '../../../common/enums/status.enum';
import { transformToLocale } from '../../../common/date';

export const mockRequestData = {
  title: 'Test Task',
  description: 'Test Description',
  dueDate: new Date('09/28/2024').getTime(),
  priority: 'high',
  assignedMember: 'John Smith',
  status: Status.INPROGRESS,
};
export const _id = new mongoose.Types.ObjectId().toHexString();

export const mockSavedTask = {
  dueDate: mockRequestData.dueDate,
  toObject: () => ({
    ...mockRequestData,
    _id: _id,
  }),
};

export const mockReturnedData = {
  ...mockRequestData,
  _id,
  dueDate: transformToLocale(mockRequestData.dueDate),
};

export const mockFoundReportData = [
    {
      ...mockRequestData,
      status: Status.COMPLETED,
      startDate: 1726257600000,
      endDate: 1726603200000,
    },
    {
      title: 'Car Repairment',
      description: 'Repair a Car',
      dueDate: new Date().getTime(),
      priority: 'medium',
      assignedMember: 'Kate Jones',
      status: Status.COMPLETED,
      startDate: 1727121600000,
      endDate: 1727985600000,
    },
  ];

  export const mockReportData = {
    teamMembers: {
      'John Smith': [
        {
          title: 'Test Task',
          completionTime: '4 days',
        },
      ],
      'Kate Jones': [
        {
          title: 'Car Repairment',
          completionTime: '10 days',
        },
      ],
    },
    completedTasksCount: 2,
    avgCompletionTime: '7 days',
  };

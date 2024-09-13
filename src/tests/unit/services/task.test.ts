import Task from '../../../models/task';
import { createTask, generateReport, updateTask } from '../../../services/task';
import { _id, mockFoundReportData, mockReportData, mockRequestData, mockReturnedData, mockSavedTask } from '../mockData/mockData';



describe('createTask', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a task successfully', async () => {

    jest.spyOn(Task, 'create').mockReturnValueOnce(mockSavedTask as any);

    const result = await createTask(mockRequestData);

    expect(result).toEqual(mockReturnedData);
  });

  it('should successfully update a task', async () => {
    jest
      .spyOn(Task, 'findByIdAndUpdate')
      .mockReturnValueOnce(mockSavedTask as any);

    const result = await updateTask(_id, mockRequestData);

    expect(result).not.toBeNull();
  });

  it('should generate a report', async () => {

    jest.spyOn(Task, 'find').mockReturnValueOnce(mockFoundReportData as any);

    const result = await generateReport();

    expect(result).not.toBeNull();
    expect(result).toEqual(mockReportData);
  });
});

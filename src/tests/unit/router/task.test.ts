import request from 'supertest';
import express from 'express';
import router from '../../../router/task';
import { createTask, updateTask, generateReport } from '../../../services/task';
import {
  _id,
  mockReportData,
  mockRequestData,
  mockReturnedData,
} from '../mockData/mockData';

jest.mock('../../../services/task');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Task Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create a Task', () => {
    it('should create a new task', async () => {
      (createTask as jest.Mock).mockResolvedValueOnce(mockReturnedData);

      const response = await request(app).post('/').send(mockRequestData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockReturnedData);
    });

    it('should return 500 if createTask throws an error', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      (createTask as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const response = await request(app).post('/').send(mockRequestData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Something happened while creating a task: Error: Error',
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Update a Task', () => {
    it('should update a task', async () => {
      (updateTask as jest.Mock).mockResolvedValueOnce({
        _id,
        title: 'Updated Task',
        description: 'Updated Description',
      });

      const response = await request(app).put(`/${_id}`).send({
        title: 'Updated Task',
        description: 'Updated Description',
      });

      expect(response.status).toBe(201);
      expect(response.text).toBe('Task was successfully updated.');
    });

    it('should return 404 if task is not found', async () => {
      (updateTask as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app).put(`/${_id}`).send({
        title: 'Updated Task',
        description: 'Updated Description',
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Task not found.',
      });
    });
  });

  describe('Get a report', () => {
    it('should generate and return a report', async () => {
      (generateReport as jest.Mock).mockResolvedValueOnce(mockReportData);

      const response = await request(app).get('/reports');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReportData);
    });

    it('should return 404 if no completed tasks are found', async () => {
      (generateReport as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app).get('/reports');

      expect(response.status).toBe(404);
      expect(response.text).toBe('No tasks found.');
    });
  });
});

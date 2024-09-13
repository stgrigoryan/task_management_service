import { Router, Request, Response } from 'express';
import { createTask, generateReport, updateTask } from '../services/task';
import {
  validateTaskCreation,
  validateTaskUpdate,
} from '../validators/validateTask';
import { ITask } from '../models/task';

const router = Router();

router.post('/', validateTaskCreation, async (req: Request, res: Response) => {
  try {
    const task = <ITask>req.body;
    const savedTask = await createTask(task);

    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Something happened while creating a task: ${error}`,
    });
  }
});

router.put('/:id', validateTaskUpdate, async (req: Request, res: Response) => {
  try {
    const updateBody = <ITask>req.body;
    const taskId = req.params.id;
    const updatedTask = await updateTask(taskId, updateBody);
  
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.status(201).send('Task was successfully updated.');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Something happened while updating a task: ${error}`,
    });
  }
});

router.get('/reports', async (_req: Request, res: Response) => {
  try {
    const report = await generateReport();
    if(!report) {
      return res.status(404).send('No tasks found.');
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to get the report: ${error}` });
  }
});

export default router;

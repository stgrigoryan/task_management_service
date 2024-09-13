import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Status } from '../common/enums/status.enum';
import mongoose from 'mongoose';

const taskSchema = Joi.object().keys({
  title: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(2).max(255).required(),
  dueDate: Joi.date().greater('now').required(),
  priority: Joi.string().min(2).max(10).required(),
  assignedMember: Joi.string().min(2).max(20).required(),
  status: Joi.string().valid(...Object.values(Status)),
  startDate: Joi.date().greater('now'),
  endDate: Joi.date().greater('now'),
});

const updateTaskSchema = taskSchema.fork(
  Object.keys(taskSchema.describe().keys),
  (schema) => schema.optional(),
);

export const validateTaskCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error?.details[0]?.message });
  }
  next();
};

export const validateTaskUpdate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id format.' });
  }
  const { error } = updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error?.details[0]?.message });
  }
  next();
};

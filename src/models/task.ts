import mongoose, { Schema } from 'mongoose';
import { Status } from '../common/enums/status.enum';

export interface ITask {
  title: string;
  description: string;
  dueDate: number;
  priority: string;
  assignedMember: string;
  status: Status;
  startDate?: number;
  endDate?: number;
}

const parseDateWithTimezone = (dateString: string) => {
  return new Date(dateString).getTime();
};

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Number,
    required: true,
    set: (v: string) => parseDateWithTimezone(v),
  },
  priority: {
    type: String,
    required: true,
  },
  assignedMember: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
  },
  startDate: {
    type: Number,
    set: (v: string) => parseDateWithTimezone(v),
  },
  endDate: {
    type: Number,
    set: (v: string) => parseDateWithTimezone(v),
  },
});

const Task = mongoose.model<ITask>('Task', schema);
export default Task;

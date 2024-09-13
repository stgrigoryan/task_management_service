import moment from 'moment';

import Task, { ITask } from '../models/task';
import { transformToLocale } from '../common/date';

interface Report {
  teamMembers: {
    [teamMember: string]: {
      title: string;
      completionTime: string;
    }[];
  };
  completedTasksCount: number;
  avgCompletionTime: string;
}

export const createTask = async (task: ITask) => {
  const savedTask = await Task.create(task);

  const formattedTask = {
    ...savedTask.toObject(),
    dueDate: transformToLocale(savedTask.dueDate),
  };

  return formattedTask;
};

export const updateTask = async (
  taskId: string,
  updateBody: Partial<ITask>,
) => {
  return Task.findByIdAndUpdate(taskId, updateBody);
};

export const generateReport = async () => {
  const tasks = await Task.find({ status: 'completed' });

  if (!tasks.length) {
    return null;
  }

  const report: Report = {
    teamMembers: {},
    completedTasksCount: 0,
    avgCompletionTime: '',
  };

  let totalCompletionTime = 0;

  tasks.forEach((task) => {
    const completionTime = task.endDate - task.startDate;
    const teamMember = task.assignedMember;

    if (!report.teamMembers[teamMember]) {
      report.teamMembers[teamMember] = [];
    }

    report.teamMembers[teamMember].push({
      title: task.title,
      completionTime: moment.duration(completionTime).humanize(),
    });
    report.completedTasksCount += 1;
    totalCompletionTime += completionTime;
  });

  if (report.completedTasksCount > 0) {
    const avgCompletionTimeMs =
      totalCompletionTime / report.completedTasksCount;
    report.avgCompletionTime = moment.duration(avgCompletionTimeMs).humanize();
  }

  return report;
};

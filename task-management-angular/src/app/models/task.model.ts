export enum TaskPriority {
  Low = 1,
  Medium = 2,
  High = 3
}

export enum TaskStatus {
  New = 1,
  InProgress = 2,
  Completed = 3,
  Archived = 4
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}
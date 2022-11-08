import { Injectable } from '@nestjs/common';
import { Task } from '../models/task';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from '../models/create-task.dto';
import { PatchTaskDto } from '../models/patch-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  constructor() {
    this.tasks.push({
      uuid: uuid(),
      userUuid: uuid(),
      task: 'Completar path de Nest',
    });
    this.tasks.push({
      uuid: uuid(),
      userUuid: uuid(),
      task: 'Completar path de React Native',
    });
    this.tasks.push({
      uuid: uuid(),
      userUuid: uuid(),
      task: 'Completar curso de Angular',
    });
  }
  getAll(): Task[] {
    return this.tasks;
  }
  getById(id: string) {
    return this.tasks.find((task) => task.uuid == id);
  }
  create(data: CreateTaskDto): Task {
    this.tasks.push({
      uuid: uuid(),
      userUuid: data.userUuid,
      task: data.task,
    });
    return this.tasks[this.tasks.length - 1];
  }
  update(id: string, taskDto: CreateTaskDto): Task {
    const oldTask: Task | undefined = this.tasks.find(
      (task) => task.uuid == id,
    );

    if (oldTask) {
      oldTask.userUuid = taskDto.userUuid;
      oldTask.task = taskDto.task;
      return oldTask;
    }
    return this.create(taskDto);
  }
  remove(id: string): boolean {
    const task: Task | undefined = this.tasks.find((task) => task.uuid == id);
    if (task) {
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
  patch(id: string, taskDto: PatchTaskDto): Task | undefined {
    const oldTask = this.tasks.find((task) => task.uuid == id);
    if (oldTask) {
      const index = this.tasks.indexOf(oldTask);
      const updatedtask = {
        ...oldTask,
        ...taskDto,
      };
      this.tasks[index] = updatedtask;
      return updatedtask;
    }
    return undefined;
  }
}

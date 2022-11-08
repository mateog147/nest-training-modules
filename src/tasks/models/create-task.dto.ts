import { Task } from './task';
export class CreateTaskDto implements Task {
  uuid: string;
  userUuid: string;
  task: string;

  constructor(data: Task) {
    this.uuid = data.uuid ?? '';
  }
}

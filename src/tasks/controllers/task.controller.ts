import { Controller, Get } from '@nestjs/common';
import { TaskService } from '../services/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('message')
  get(): string {
    return this.taskService.getMessage();
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../models/create-task.dto';
import { PatchTaskDto } from '../models/patch-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  geAllTasks(): Task[] {
    return this.taskService.getAll();
  }
  @Get(':uuid')
  getTaskById(@Param('uuid') uuid: string): Task {
    return (
      this.taskService.getById(uuid) ?? {
        uuid: '',
        userUuid: '',
        task: '',
      }
    );
  }

  @Post()
  addNewTask(@Body() taskDto: CreateTaskDto): Task {
    return this.taskService.create(taskDto);
  }

  @Put(':uuid')
  editExistingtask(
    @Param('uuid') uuid: string,
    @Body() taskDto: CreateTaskDto,
  ): Task {
    return this.taskService.update(uuid, taskDto);
  }

  @Delete(':uuid')
  removetask(@Param('uuid') uuid: string): boolean {
    return this.taskService.remove(uuid);
  }

  @Patch(':uuid')
  updatetaskInfo(
    @Param('uuid') uuid: string,
    @Body() taskDto: PatchTaskDto,
  ): Task {
    return (
      this.taskService.patch(uuid, taskDto) ?? {
        uuid: '',
        userUuid: '',
        task: '',
      }
    );
  }
}

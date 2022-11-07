import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getMessage(): string {
    return 'Hola desde el servicio de Tasks';
  }
}

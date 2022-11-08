import { Controller, Get } from '@nestjs/common';
import { ContactService } from '../services/contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('message')
  get(): string {
    return this.contactService.getMessage();
  }

  @Get('express/message')
  get2(): string {
    return this.contactService.getMessage();
  }
}

import { Module } from '@nestjs/common';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactsModule {}

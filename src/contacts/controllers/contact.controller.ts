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
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';
import { CreateContactDto } from '../models/create-contact.dto';
import { PatchContactDto } from '../models/patch-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('')
  getAllcontacts(): Contact[] {
    return this.contactService.getAll();
  }

  @Get(':uuid')
  getcontactByUid(@Param('uuid') uuid: string): Contact {
    return (
      this.contactService.getById(uuid) ?? {
        uuid: '',
        name: '',
        lastNames: '',
        email: '',
        phone: '',
        userUuid: '',
      }
    );
  }

  @Post()
  addNewcontact(@Body() createcontactDto: CreateContactDto): Contact {
    return this.contactService.create(createcontactDto);
  }

  @Put(':uuid')
  editExistingcontact(
    @Param('uuid') uuid: string,
    @Body() contactDto: CreateContactDto,
  ): Contact {
    return this.contactService.update(uuid, contactDto);
  }

  @Delete(':uuid')
  removecontact(@Param('uuid') uuid: string): boolean {
    return this.contactService.remove(uuid);
  }

  @Patch(':uuid')
  updatecontactInfo(
    @Param('uuid') uuid: string,
    @Body() contactDto: PatchContactDto,
  ): Contact {
    return (
      this.contactService.patch(uuid, contactDto) ?? {
        uuid: '',
        name: '',
        lastNames: '',
        email: '',
        phone: '',
        userUuid: '',
      }
    );
  }
}

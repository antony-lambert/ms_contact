import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/types';

import { ContactController } from './contact.controller';
import { ContactManager } from '../managers/contact.manager';
import { Contact } from '../models/contact.model';
import { ContactDTO } from '../models/contact.model.dto';

@injectable()
export class ContactControllerImpl implements ContactController {

    constructor(@inject(TYPES.ContactManager) private contactManager: ContactManager) { }

    async getAll(): Promise<Contact[]> {
        return await this.contactManager.getAll();
    }

    async getById(pathParameters: any): Promise<Contact> {
        return this.contactManager.getById(pathParameters.id);
    }

    async add(body: any): Promise<any> {
        const contactDTO = new ContactDTO(body.phoneNumber);
        return await this.contactManager.add(contactDTO);
    }
}

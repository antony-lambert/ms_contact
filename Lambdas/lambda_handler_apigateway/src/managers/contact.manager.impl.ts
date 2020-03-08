import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/types';

import { ContactManager } from '../managers/contact.manager';
import { Contact } from '../models/contact.model';
import { ContactRepository } from '../repositories/contact.repository';
import { ContactDTO } from '../models/contact.model.dto';

@injectable()
export class ContactManagerImpl implements ContactManager {

    constructor(@inject(TYPES.ContactRepository) private contactRepository: ContactRepository) { }

    async getAll(): Promise<Contact[]> {
        return await this.contactRepository.getAll();
    }

    async getById(id: string): Promise<Contact> {
        return await this.contactRepository.getById(id);
    }

    async add(contactDTO: ContactDTO): Promise<any> {
        const contact = new Contact(contactDTO.phoneNumber);
        return await this.contactRepository.add(contact);
    }
}

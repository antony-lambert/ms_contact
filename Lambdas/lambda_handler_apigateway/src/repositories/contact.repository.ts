import { Contact } from '../models/contact.model';

export interface ContactRepository {

    getAll(): Promise<Contact[]>;

    getById(id: string): Promise<Contact>;

    add(contact: Contact): Promise<any>;
}

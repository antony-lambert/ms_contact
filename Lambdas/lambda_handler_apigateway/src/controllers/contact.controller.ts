import { Contact } from '../models/contact.model';

export interface ContactController {

    getAll(): Promise<Contact[]>;

    getById(id: string): Promise<Contact>;

    add(body: any): Promise<any>;
}

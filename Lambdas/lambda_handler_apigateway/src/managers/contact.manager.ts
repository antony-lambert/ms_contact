import { Contact } from '../models/contact.model';
import { ContactDTO } from '../models/contact.model.dto';

export interface ContactManager {

    getAll(): Promise<Contact[]>;

    getById(id: string): Promise<Contact>;

    add(Contact: ContactDTO): Promise<any>;
}

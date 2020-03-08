import 'reflect-metadata';
import { Container, BindingScopeEnum } from 'inversify';

// Contact
import { ContactController } from '../controllers/contact.controller';
import { ContactControllerImpl } from '../controllers/contact.controller.impl';

import { ContactManager } from '../managers/contact.manager';
import { ContactManagerImpl } from '../managers/contact.manager.impl';

import { ContactRepository } from '../repositories/contact.repository';
import { ContactRepositoryImpl } from '../repositories/contact.repository.impl';

import { Handler } from '../handler';

import { TYPES } from './types';

const container = new Container();
container.options.defaultScope = BindingScopeEnum.Singleton;

container.bind<ContactController>(TYPES.ContactController).to(ContactControllerImpl);
container.bind<ContactManager>(TYPES.ContactManager).to(ContactManagerImpl);
container.bind<ContactRepository>(TYPES.ContactRepository).to(ContactRepositoryImpl);
container.bind<Handler>(TYPES.Handler).to(Handler);

export { container };

import 'reflect-metadata';
import { injectable } from 'inversify';

import { Contact } from '../models/contact.model';
import { ContactRepository } from './contact.repository';

import AWS from 'aws-sdk';

@injectable()
export class ContactRepositoryImpl implements ContactRepository {

    private dynamoDb: any;
    private params: any;

    constructor() {
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
        this.params = {
            TableName: process.env.DB_NAME
        }
    }

    async getAll(): Promise<Contact[]> {
        try {
            let results = await this.dynamoDb.scan(this.params).promise();
            return results.Items || [];
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id: string): Promise<Contact> {
        try {
            let _params = { ...this.params }
            _params['Key'] = {
                "id": id
            }

            let result = await this.dynamoDb.get(_params).promise();
            return result.Item;
        } catch (error) {
            console.error(error);
        }
    }

    async add(contact: Contact): Promise<any> {
        try {
            let _params = { ...this.params }
            _params['Item'] = contact;
            let result = await this.dynamoDb.put(_params).promise();
            return result.Item;
        } catch (error) {
            console.error(error);
        }
    }
}

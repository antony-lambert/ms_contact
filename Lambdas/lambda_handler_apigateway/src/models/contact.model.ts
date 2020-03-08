import uuidv4 from 'uuid/v4';

const PHONE_NUMBER_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

export class Contact {

    readonly id: string;
    readonly phoneNumber: string;

    constructor(phoneNumber: string, id?: string, ) {

        if (!PHONE_NUMBER_REGEX.test(phoneNumber)) {
            throw Error('Phone Number is invalid.');
        }

        this.phoneNumber = phoneNumber;

        if (!id) {
            this.id = uuidv4();
        }
    }
}

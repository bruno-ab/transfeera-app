
import { Receiver as ReceiverEntity } from '@prisma/client';

export class Receiver implements ReceiverEntity {
    id: string;
    name: string;
    document: string;
    bank: string;
    bank_agency: string;
    bank_account: string;
    status: string;
    pix_key_type: string;
    pix_key: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}


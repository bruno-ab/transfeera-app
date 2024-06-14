import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReceiverDTO } from './dto/create-receiver.dto';
import { UpdateReceiverDTO } from './dto/update-receiver.dto';
import { DeleteReceiverDTO } from './dto/delete-receiver.dto';
import { ReceiverRepository } from '../entity/receiver.repository';
import { Receiver } from '../entity/receiver.entity';

@Injectable()
export class ReceiverService {
    constructor(
        private receiverRepository: ReceiverRepository
    ) { }
    async createReceiver(data: CreateReceiverDTO): Promise<Receiver> {
        const createdReceiver = await this.receiverRepository.createReceiver(data);
        return createdReceiver
    }

    async getReceiver(id: string, data: UpdateReceiverDTO) {

    }

    async listReceivers(): Promise<Receiver[]> {
        return await this.receiverRepository.listReceivers();
    }

    async updateReceiver(id: string, data: UpdateReceiverDTO) {

    }

    async deleteReceiver(data: DeleteReceiverDTO) {

    }

    async allowUpdate(receiver: Receiver, updatedData: Partial<Receiver>): Promise<void> {
        if (receiver.status === 'rascunho') {
            return;
        } else if (receiver.status === 'validado') {
            const allowedKeys = ['email'];
            const isUpdateAllowed = Object.keys(updatedData).every(key => allowedKeys.includes(key));

            if (!isUpdateAllowed) {
                throw new BadRequestException('Only email can be updated for validated receivers');
            }

        } else {
            throw new BadRequestException('Receiver status does not allow updates');
        }
    }

}

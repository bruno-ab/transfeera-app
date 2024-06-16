import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateReceiverDTO } from './dto/create-receiver.dto';
import { UpdateReceiverDTO } from './dto/update-receiver.dto';

import { ReceiverRepository } from '../entity/receiver.repository';
import { Receiver } from '../entity/receiver.entity';
import { ListReceiversDTO } from './dto/list-receiver.dto';
import { DeleteReceiversDTO } from './dto/delete-receivers.dto';

@Injectable()
export class ReceiverService {
    constructor(private receiverRepository: ReceiverRepository) { }

    async createReceiver(data: CreateReceiverDTO) {
        const createdReceiver = await this.receiverRepository.createReceiver(data);
        return createdReceiver;
    }

    async listReceivers(query: ListReceiversDTO): Promise<{ receivers: Receiver[], totalPages: number, currentPage: number }> {
        const { page, status, name, pix_key_type, pix_key } = query;
        return await this.receiverRepository.listReceivers(page, status, name, pix_key_type, pix_key);
    }

    async updateReceiver(id: string, updateReceiverData: UpdateReceiverDTO) {
        const receiver = await this.receiverRepository.findReceiverById(id);
        if (!receiver) {
            throw new NotFoundException('Receiver not found');
        }

        try {
            await this.allowUpdate(receiver, updateReceiverData);

            const updatedReceiver = await this.receiverRepository.updateReceiver(id, updateReceiverData);
            return updatedReceiver;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async deleteReceivers(deleteReceivers: DeleteReceiversDTO) {
        return await this.receiverRepository.deleteReceiversByIds(deleteReceivers);
    }

    async allowUpdate(receiver: Receiver, updatedData: Partial<Receiver>): Promise<void> {
        if (receiver.status === 'Rascunho') {
            return;
        } else if (receiver.status === 'Validado') {
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

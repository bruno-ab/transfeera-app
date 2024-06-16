import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateReceiverDTO } from 'src/modules/receiver/dto/create-receiver.dto';
import { Receiver } from '@prisma/client';
import { DeleteReceiversDTO } from 'src/modules/receiver/dto/delete-receivers.dto';
import { UpdateReceiverDTO } from 'src/modules/receiver/dto/update-receiver.dto';


@Injectable()
export class PrismaReceiverRepository implements PrismaReceiverRepository {
    constructor(private prisma: PrismaService) { }

    async createReceiver(data: CreateReceiverDTO): Promise<Receiver> {
        return await this.prisma.receiver.create({ data });
    }

    async listReceivers(
        page: number = 1,
        status?: string,
        name?: string,
        pix_key_type?: string,
        pix_key?: string,
    ): Promise<{ receivers: Receiver[], totalPages: number, currentPage: number }> {
        const take = 10;
        const skip = (page - 1) * take;

        const where: any = {
            status: {
                in: ['Validado', 'Rascunho'],
            },
        };

        if (status) {
            where.status = status;
        }

        if (name) {
            where.name = {
                contains: name,
            };
        }

        if (pix_key_type) {
            where.pix_key_type = pix_key_type;
        }

        if (pix_key) {
            where.pix_key = {
                contains: pix_key,
            };
        }

        const filteredReceivers = await this.prisma.receiver.findMany({
            where,
            orderBy: {
                name: 'asc',
            },
            skip,
            take,
        });

        const totalReceivers = await this.prisma.receiver.count({
            where,
        });

        const totalPages = Math.ceil(totalReceivers / take);

        return {
            receivers: filteredReceivers,
            totalPages,
            currentPage: page,
        };
    }

    async findReceiverById(id: string): Promise<Receiver> {
        return await this.prisma.receiver.findUnique({
            where: {
                id,
            },
        });
    }

    async updateReceiver(id: string, updateReceiverDTO: UpdateReceiverDTO): Promise<Receiver> {

        const existingReceiver = await this.findReceiverById(id);

        if (!existingReceiver) {
            throw new NotFoundException('Receiver not found');
        }


        return await this.prisma.receiver.update({
            where: {
                id,
            },
            data: updateReceiverDTO,
        });
    }

    async deleteReceiversByIds(deleteReceivers: DeleteReceiversDTO): Promise<{ deleted: number }> {
        const result = await this.prisma.receiver.deleteMany({
            where: {
                id: {
                    in: deleteReceivers.ids,
                },
            },
        });

        return { deleted: result.count };
    }
}

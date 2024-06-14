import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateReceiverDTO } from 'src/modules/receiver/dto/create-receiver.dto';
import { Receiver } from '@prisma/client';


@Injectable()
export class PrismaReceiverRepository implements PrismaReceiverRepository {
    constructor(private prisma: PrismaService) { }
    async createReceiver(data: CreateReceiverDTO): Promise<Receiver> {
        return await this.prisma.receiver.create({ data });
    }

    async listReceivers(): Promise<Receiver[]> {
        return await this.prisma.receiver.findMany({
            orderBy: {
                name: 'asc'
            },
        });
    }
}

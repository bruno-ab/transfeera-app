import { ReceiverService } from './receiver.service';
import { Module } from '@nestjs/common';
import { ReceiverController } from './receiver.controller';
import { ReceiverRepository } from '../entity/receiver.repository';
import { PrismaReceiverRepository } from 'src/infra/database/prisma/repositories/receiver.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [ReceiverController],
    providers: [
        PrismaService,
        ReceiverService,
        {
            provide: ReceiverRepository,
            useClass: PrismaReceiverRepository,
        },
    ],
})
export class ReceiverModule { }

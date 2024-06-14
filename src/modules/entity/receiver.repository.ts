import { Receiver } from "@prisma/client";
import { CreateReceiverDTO } from "../receiver/dto/create-receiver.dto";

export abstract class ReceiverRepository {
    abstract createReceiver(
        createReceiver: CreateReceiverDTO,
    ): Promise<Receiver>;

    abstract listReceivers(): Promise<Receiver[]>;
}

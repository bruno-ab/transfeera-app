import { Receiver } from "@prisma/client";
import { CreateReceiverDTO } from "../receiver/dto/create-receiver.dto";
import { DeleteReceiversDTO } from "../receiver/dto/delete-receivers.dto";

export abstract class ReceiverRepository {
    abstract createReceiver(
        createReceiver: CreateReceiverDTO,
    ): Promise<Receiver>;


    abstract listReceivers(
        page: number,
        status?: string,
        name?: string,
        pix_key_type?: string,
        pix_key?: string,
    ): Promise<{ receivers: Receiver[], totalPages: number, currentPage: number }>;

    abstract deleteReceiversByIds(deleteReceivers: DeleteReceiversDTO): Promise<void>;
}

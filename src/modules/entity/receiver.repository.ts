import { Receiver } from "@prisma/client";
import { CreateReceiverDTO } from "../receiver/dto/create-receiver.dto";
import { DeleteReceiversDTO } from "../receiver/dto/delete-receivers.dto";
import { UpdateReceiverDTO } from "../receiver/dto/update-receiver.dto";

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

    abstract findReceiverById(id: string): Promise<Receiver>;

    abstract updateReceiver(id: string, updateReceiverData: UpdateReceiverDTO): Promise<Receiver>;

    abstract deleteReceiversByIds(deleteReceivers: DeleteReceiversDTO): Promise<void>;
}

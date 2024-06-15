import { Controller, Post, Body, Delete, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReceiverDTO } from './dto/create-receiver.dto';
import { UpdateReceiverDTO } from './dto/update-receiver.dto';
import { DeleteReceiversDTO } from './dto/delete-receivers.dto';
import { ReceiverService } from './receiver.service';
import { PixKeyValidator } from './validators/validate-pix-key';
import { Receiver } from '@prisma/client';
import { ListReceiversDTO } from './dto/list-receiver.dto';


@ApiTags('Receiver')
@Controller('receiver')
export class ReceiverController {
    constructor(
        private readonly receiverService: ReceiverService
    ) { }

    @Post('/')
    @ApiOperation({ summary: 'Create receiver' })
    createReceiver(@Body() createReceiverDto: CreateReceiverDTO, @PixKeyValidator() validatedPixKey: { pixKey: string, pixKeyType: string }) {
        createReceiverDto.pix_key = validatedPixKey.pixKey;
        createReceiverDto.pix_key_type = validatedPixKey.pixKeyType;
        return this.receiverService.createReceiver(createReceiverDto);
    }

    @Get("/list")
    async listReceivers(@Query() query: ListReceiversDTO) {
        return this.receiverService.listReceivers(query);
    }

    // @Put('/receiver')
    // @ApiOperation({ summary: 'Create Receiver' })
    // createReceiver(@Body() UpdateReceiverDTO: UpdateReceiverDTO) {
    //     return this.receiverService.updateReceiver(UpdateReceiverDTO);
    // }

    @Delete('/')
    @ApiOperation({ summary: 'Delete Receivers' })
    deleteReceivers(@Body() deleteReceiver: DeleteReceiversDTO) {
        return this.receiverService.deleteReceivers(deleteReceiver);
    }
}

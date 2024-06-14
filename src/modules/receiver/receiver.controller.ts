import { Controller, Post, Body, Delete, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReceiverDTO } from './dto/create-receiver.dto';
import { UpdateReceiverDTO } from './dto/update-receiver.dto';
import { DeleteReceiverDTO } from './dto/delete-receiver.dto';
import { ReceiverService } from './receiver.service';

@ApiTags('Receiver')
@Controller('receiver')
export class ReceiverController {
    constructor(
        private readonly receiverService: ReceiverService
    ) { }

    @Post('/')
    @ApiOperation({ summary: 'Create receiver' })
    createReceiver(@Body() createReceiverDto: CreateReceiverDTO) {
        return this.receiverService.createReceiver(createReceiverDto);
    }

    @Get('/list')
    @ApiOperation({ summary: 'Get a list of receivers' })
    listReceivers() {
        return this.receiverService.listReceivers();
    }

    // @Put('/receiver')
    // @ApiOperation({ summary: 'Create Receiver' })
    // createReceiver(@Body() UpdateReceiverDTO: UpdateReceiverDTO) {
    //     return this.receiverService.updateReceiver(UpdateReceiverDTO);
    // }

    // @Delete('/')
    // @ApiOperation({ summary: 'Create Receiver' })
    // deleteReceiver(@Body() deleteReceiver: DeleteReceiverDTO) {
    //     return this.receiverService.createReceiver(deleteReceiver);
    // }
}

import { IsString, IsEmail, IsOptional, IsIn, Length, Matches } from 'class-validator';
import { IsNotStatus } from '../validators/isNotStatus.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReceiverDTO {
    @ApiProperty({ description: 'Receiver name' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Receiver document' })
    @IsString()
    document: string;

    @ApiProperty({ description: 'Receiver bank' })
    @IsString()
    bank: string;

    @ApiProperty({ description: 'Receiver bank agency' })
    @IsString()
    bank_agency: string;

    @ApiProperty({ description: 'Receiver bank account' })
    @IsString()
    bank_account: string;

    @ApiProperty({
        description: 'Type of PIX key',
        enum: ['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'],
    })
    @IsString()
    @IsIn(['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'])
    pix_key_type: string;

    @ApiProperty({ description: 'Receiver PIX key' })
    @IsString()
    pix_key: string;

    @ApiProperty({
        description: 'Receiver email (optional)',
        required: false,
    })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    @Length(1, 250)
    email: string;


    @IsNotStatus({
        message: 'The status field cannot be created'
    })
    status?: string;
}

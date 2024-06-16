import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsIn, Length } from 'class-validator';
import { IsNotStatus } from '../validators/isNotStatus.decorator';

export class UpdateReceiverDTO {
    @ApiProperty({
        required: false,
        description: 'Name of the receiver',
        type: String,
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        required: false,
        description: 'Document of the receiver',
        type: String,
    })
    @IsOptional()
    @IsString()
    document?: string;

    @ApiProperty({
        required: false,
        description: 'Bank of the receiver',
        type: String,
    })
    @IsOptional()
    @IsString()
    bank?: string;

    @ApiProperty({
        required: false,
        description: 'Bank agency of the receiver',
        type: String,
    })
    @IsOptional()
    @IsString()
    bank_agency?: string;

    @ApiProperty({
        required: false,
        description: 'Bank account of the receiver',
        type: String,
    })
    @IsOptional()
    @IsString()
    bank_account?: string;

    @ApiProperty({
        required: false,
        description: 'Type of PIX key (CPF, CNPJ, EMAIL, TELEFONE, CHAVE_ALEATORIA)',
        enum: ['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'],
    })
    @IsOptional()
    @IsString()
    @IsIn(['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'])
    pix_key_type?: string;

    @ApiProperty({
        required: false,
        description: 'Value of the PIX key',
        type: String,
    })
    @IsOptional()
    @IsString()
    pix_key?: string;

    @ApiProperty({
        required: false,
        description: 'Email of the receiver',
        type: String,
    })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    @Length(1, 250)
    email?: string;

    @ApiProperty({
        required: false,
        description: 'Status of the receiver (cannot be updated)',
        type: String,
    })
    @IsNotStatus({
        message: 'The status field cannot be updated'
    })
    status?: string;
}

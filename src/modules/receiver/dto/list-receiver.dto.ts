import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListReceiversDTO {
    @ApiProperty({
        required: false,
        description: 'Page number for pagination, defaults to 1',
        minimum: 1,
        default: 1,
        type: Number,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiProperty({
        required: false,
        description: 'Status of the receivers (Validado or Rascunho)',
        enum: ['Validado', 'Rascunho'],
    })
    @IsOptional()
    @IsString()
    @IsIn(['Validado', 'Rascunho'])
    status?: string;

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
}

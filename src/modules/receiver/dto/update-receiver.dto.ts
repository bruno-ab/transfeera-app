import { IsString, IsEmail, IsOptional, IsIn, Length, Matches } from 'class-validator';
import { IsNotStatus } from '../validators/isNotStatus.decorator';

export class UpdateReceiverDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    document?: string;

    @IsOptional()
    @IsString()
    bank?: string;

    @IsOptional()
    @IsString()
    bank_agency?: string;

    @IsOptional()
    @IsString()
    bank_account?: string;

    @IsOptional()
    @IsString()
    @IsIn(['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'])
    pix_key_type?: string;

    @IsOptional()
    @IsString()
    pix_key?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    @Length(1, 250)
    email?: string;

    @IsNotStatus({
        message: 'The status field cannot be updated'
    })
    status?: string;
}
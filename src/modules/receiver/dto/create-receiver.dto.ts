import { IsString, IsEmail, IsOptional, IsIn, Length, Matches } from 'class-validator';
import { IsNotStatus } from '../validators/isNotStatus.decorator';

export class CreateReceiverDTO {
    @IsString()
    name: string;

    @IsString()
    document: string;

    @IsString()
    bank: string;

    @IsString()
    bank_agency: string;

    @IsString()
    bank_account: string;

    @IsString()
    @IsIn(['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'])
    pix_key_type: string;

    @IsString()
    pix_key: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    @Length(1, 250)
    email?: string;

    @IsNotStatus({
        message: 'The status field cannot be created'
    })
    status?: string;
}

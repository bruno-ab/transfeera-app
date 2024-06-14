import { IsString, IsEmail, IsOptional, IsIn, Length, Matches } from 'class-validator';

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
    status: string;

    @IsString()
    @IsIn(['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'])
    pix_key_type: string;

    @IsString()
    @Length(1, 140)
    @Matches(/^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/, { message: 'Invalid CPF format', context: { pix_key_type: 'CPF' } })
    @Matches(/^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/, { message: 'Invalid CNPJ format', context: { pix_key_type: 'CNPJ' } })
    @Matches(/^[a-z0-9+_.-]+@[a-z0-9.-]+$/, { message: 'Invalid EMAIL format', context: { pix_key_type: 'EMAIL' } })
    @Matches(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/, { message: 'Invalid TELEFONE format', context: { pix_key_type: 'TELEFONE' } })
    @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, { message: 'Invalid CHAVE_ALEATORIA format', context: { pix_key_type: 'CHAVE_ALEATORIA' } })
    pix_key: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    @Length(1, 250)
    email?: string;
}

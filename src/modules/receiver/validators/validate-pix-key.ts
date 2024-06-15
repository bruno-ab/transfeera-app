import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';


export const PixKeyValidator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const pixKey = request.body.pix_key;
        const pixKeyType = request.body.pix_key_type;
        const { method, body } = request;



        const isValidCpf = (cpf: string): boolean => {
            return /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/.test(cpf);
        };

        const isValidCnpj = (cnpj: string): boolean => {
            return /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/.test(cnpj);
        };

        const isValidPhone = (phone: string): boolean => {
            return /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/.test(phone);
        };

        const isValidRandomKey = (key: string): boolean => {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key);
        };

        const isValidEmail = (email: string): boolean => {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        };


        if (method !== 'PUT') {
            if (!pixKey || !pixKeyType) {
                throw new BadRequestException('pix_key and pix_key_type are required');
            }

            let isValid = false;

            switch (pixKeyType) {
                case 'CPF':
                    isValid = isValidCpf(pixKey);
                    break;
                case 'CNPJ':
                    isValid = isValidCnpj(pixKey);
                    break;
                case 'EMAIL':
                    isValid = isValidEmail(pixKey);
                    break;
                case 'TELEFONE':
                    isValid = isValidPhone(pixKey);
                    break;
                case 'CHAVE_ALEATORIA':
                    isValid = isValidRandomKey(pixKey);
                    break;
                default:
                    throw new BadRequestException('Invalid pix_key_type');
            }

            if (!isValid) {
                throw new BadRequestException(`Invalid pix_key format for type ${pixKeyType}`);
            }
        }




        return { pixKey, pixKeyType };
    },
);

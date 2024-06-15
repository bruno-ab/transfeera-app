import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNotStatus(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNotStatus',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value === undefined;
                },
                defaultMessage(args: ValidationArguments) {
                    return 'The status field cannot be updated';
                },
            },
        });
    };
}

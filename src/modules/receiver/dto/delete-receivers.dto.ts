import { ApiProperty } from '@nestjs/swagger';

export class DeleteReceiversDTO {
    @ApiProperty({
        description: 'Array of receiver IDs to delete',
        example: ['f57bb980-1fff-4260-b1ee-d2968dbc8820', 'f57bb980-1gde-4260-b1ee-d2968dbc8820'],
        type: [String],
    })
    ids: string[];
}

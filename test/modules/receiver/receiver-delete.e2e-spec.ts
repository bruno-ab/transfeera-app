import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { ReceiverService } from 'src/modules/receiver/receiver.service';
import { DeleteReceiversDTO } from 'src/modules/receiver/dto/delete-receivers.dto';

describe('ReceiverController e2e delete', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should delete receivers by IDs', async () => {
        const deleteReceiversMock = jest.fn().mockResolvedValue({ deleted: 3 });
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(ReceiverService)
            .useValue({ deleteReceivers: deleteReceiversMock })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const deleteReceiversDTO: DeleteReceiversDTO = {
            ids: ['f57bb980-1fff-4260-b1ee-d2968dbc8820', 'f57bb980-1gde-4260-b1ee-d2968dbc8820', 'h989da-465l-4260-b1ee-d2968dbc8820'],
        };

        return request(app.getHttpServer())
            .delete('/receiver')
            .send(deleteReceiversDTO)
            .expect(200)
            .then(response => {
                expect(response.body.deleted).toBe(3);
            });

    })
});
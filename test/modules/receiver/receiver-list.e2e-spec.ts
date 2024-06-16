import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

import receivers from '../receiver/mocks/list-receiver-mock'
import { ReceiverService } from 'src/modules/receiver/receiver.service';

describe('ReceiverController  e2e list', () => {
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

    it('should list receivers', async () => {

        const listReceiversMock = jest.fn().mockResolvedValue({
            receivers: receivers.slice(0, 10),
            totalPages: Math.ceil(receivers.length / 10),
            currentPage: 1,
        });


        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(ReceiverService)
            .useValue({ listReceivers: listReceiversMock })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const query = {
            page: 1,
            status: 'Validado',
            name: 'Luke',
            pix_key_type: 'EMAIL',
            pix_key: 'luke.skywalker@jeditemple.com',
        };

        return request(app.getHttpServer())
            .get('/receiver/list')
            .query(query)
            .expect(200)
            .then(response => {

                expect(response.body.receivers).toHaveLength(10);
                expect(response.body.totalPages).toBe(3);
                expect(response.body.currentPage).toBe(1);
            });
    });

});


import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { ReceiverService } from 'src/modules/receiver/receiver.service';

describe('ReceiverController e2e update', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should update receiver in stauts Rascunho status with any data', async () => {
        const updateReceiverMock = jest.fn().mockImplementation(async (id: string, updateData: any) => {
            return {
                id,
                status: 'Rascunho',
                ...updateData,
            };
        });

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(ReceiverService)
            .useValue({ updateReceiver: updateReceiverMock })
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const receiverId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        const updateData = {
            name: 'Updated Name',
            email: 'updated.email@example.com',
        };

        return request(app.getHttpServer())
            .put(`/receiver/${receiverId}`)
            .send(updateData)
            .expect(200)
            .then(response => {
                expect(response.body.id).toBe(receiverId);
                expect(response.body.status).toBe('Rascunho');
                expect(response.body.name).toBe(updateData.name);
                expect(response.body.email).toBe(updateData.email);
            });
    });

    it('should update receiver in "Validado" status with only email', async () => {
        const updateReceiverMock = jest.fn().mockImplementation(async (id: string, updateData: any) => {
            return {
                id,
                status: 'Validado',
                email: updateData.email,
            };
        });

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(ReceiverService)
            .useValue({ updateReceiver: updateReceiverMock })
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const receiverId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        const updateData = {
            name: 'Updated Name',
            email: 'updated.email@example.com',
        };

        return request(app.getHttpServer())
            .put(`/receiver/${receiverId}`)
            .send(updateData)
            .expect(200)
            .then(response => {
                expect(response.body.id).toBe(receiverId);
                expect(response.body.status).toBe('Validado');
                expect(response.body.name).not.toBe(updateData.name);
                expect(response.body.email).toBe(updateData.email);
            });
    });

    it('should not update status of receiver', async () => {

        const updateReceiverMock = jest.fn().mockImplementation(async (id: string, updateData: any) => {
            return {
                id,
                ...updateData,
            };
        });

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(ReceiverService)
            .useValue({ updateReceiver: updateReceiverMock })
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const receiverId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        const updateData = {
            status: 'Validado',
        };

        return request(app.getHttpServer())
            .put(`/receiver/${receiverId}`)
            .send(updateData)
            .expect(400)
            .then(response => {
                expect(response.body.message[0]).toBe("The status field cannot be updated");
                expect(response.body.error).toBe("Bad Request");
                expect(response.body.status).not.toBe(200);
            });
    });

});


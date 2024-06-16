
import { CreateReceiverDTO } from '@modules/receiver/dto/create-receiver.dto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';


describe('ReceiverController e2e create', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create a receiver (positive scenario)', async () => {
        const createReceiverDto: CreateReceiverDTO = {
            name: 'John Doe',
            document: '12345678901',
            bank: 'Sample Bank',
            bank_agency: '1234',
            bank_account: '56789-0',
            pix_key_type: 'CPF',
            pix_key: '12345678901',
            email: 'john.doe@example.com',
        };

        return request(app.getHttpServer())
            .post('/receiver')
            .send(createReceiverDto)
            .expect(201)
            .then(response => {
                expect(response.body).toMatchObject(createReceiverDto);
            });
    });

    it('should fail validation if required fields are missing', async () => {
        const createReceiverDto: Partial<CreateReceiverDTO> = {
            name: 'John Doe',
            bank: 'Sample Bank',
            bank_agency: '1234',
        };

        return request(app.getHttpServer())
            .post('/receiver')
            .send(createReceiverDto)
            .expect(400)
            .then(response => {
                expect(response.body.message).toContain('pix_key and pix_key_type are required');
            });
    });

    it('should fail validation if pix_key_type is invalid', async () => {
        const createReceiverDto: CreateReceiverDTO = {
            name: 'John Doe',
            document: '12345678901',
            bank: 'Sample Bank',
            bank_agency: '1234',
            bank_account: '56789-0',
            pix_key_type: 'INVALID_TYPE',
            pix_key: '12345678901',
            email: 'john.doe@example.com',
        };

        return request(app.getHttpServer())
            .post('/receiver')
            .send(createReceiverDto)
            .expect(400)
            .then(response => {
                expect(response.body.message).toContain('Invalid pix_key_type');
            });
    });

    it('should fail validation if email format is invalid', async () => {
        const createReceiverDto: CreateReceiverDTO = {
            name: 'John Doe',
            document: '12345678901',
            bank: 'Sample Bank',
            bank_agency: '1234',
            bank_account: '56789-0',
            pix_key_type: 'CPF',
            pix_key: '12345678901',
            email: 'invalid-email-format',
        };

        return request(app.getHttpServer())
            .post('/receiver')
            .send(createReceiverDto)
            .expect(400)
            .then(response => {
                expect(response.body.message).toContain('Invalid email format');
            });
    });

    it('should fail validation if status is provided', async () => {
        const createReceiverDto: any = {
            name: 'John Doe',
            document: '12345678901',
            bank: 'Sample Bank',
            bank_agency: '1234',
            bank_account: '56789-0',
            pix_key_type: 'CPF',
            pix_key: '12345678901',
            email: 'john.doe@example.com',
            status: 'active',
        };

        return request(app.getHttpServer())
            .post('/receiver')
            .send(createReceiverDto)
            .expect(400)
            .then(response => {
                expect(response.body.message).toContain('The status field cannot be created');
            });
    });



});

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Receiver } from '@prisma/client';
import { CreateReceiverDTO } from 'src/modules/receiver/dto/create-receiver.dto';
import { DeleteReceiversDTO } from 'src/modules/receiver/dto/delete-receivers.dto';
import { UpdateReceiverDTO } from 'src/modules/receiver/dto/update-receiver.dto';
import { ReceiverService } from 'src/modules/receiver/receiver.service';
import { ReceiverRepository } from 'src/modules/entity/receiver.repository';


describe('ReceiverService', () => {
    let service: ReceiverService;
    let receiverRepository: ReceiverRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReceiverService,
                {
                    provide: ReceiverRepository,
                    useValue: {
                        createReceiver: jest.fn(),
                        listReceivers: jest.fn(),
                        updateReceiver: jest.fn(),
                        deleteReceiversByIds: jest.fn(),
                        findReceiverById: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ReceiverService>(ReceiverService);
        receiverRepository = module.get<ReceiverRepository>(ReceiverRepository);

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createReceiver', () => {
        it('should create a receiver with CPF', async () => {
            const createReceiverDTO: CreateReceiverDTO = {
                name: 'Bárbara da Silva Silveira Fontes',
                document: '02193523912',
                bank: 'Bradesco',
                bank_agency: '0814-0',
                bank_account: '01002713-9',
                pix_key_type: 'CPF',
                pix_key: '02193523912',
                email: 'barbaradas@gmail.com',
            };
            const mockCreatedReceiver: Receiver = {
                id: '60e9e428-71eb-4245-ad0b-342e65e836cf',
                name: 'Bárbara da Silva Silveira Fontes',
                document: '02193523912',
                bank: 'Bradesco',
                status: 'Rascunho',
                bank_agency: '0814-0',
                bank_account: '01002713-9',
                pix_key_type: 'CPF',
                pix_key: '02193523912',
                email: 'barbaradas@gmail.com',
                created_at: new Date(),
                updated_at: null
            };
            jest.spyOn(receiverRepository, 'createReceiver').mockResolvedValue(mockCreatedReceiver);

            const result = await service.createReceiver(createReceiverDTO);

            expect(result).toEqual(mockCreatedReceiver);
        });

        it('should create a receiver with CNPJ', async () => {
            const createReceiverDTO: CreateReceiverDTO = {
                name: 'Transfeera Serviços de Pagamentos',
                document: '27084098000169',
                bank: 'Sicoob',
                bank_agency: '123-x',
                bank_account: '432-1',
                pix_key_type: 'CNPJ',
                pix_key: '27084098000169',
                email: 'financeiro@transfeera.com',
            };
            const mockCreatedReceiver: Receiver = {
                id: '60e9e428-71eb-4245-ad0b-342e65e836cf',
                name: 'Transfeera Serviços de Pagamentos',
                status: 'Rascunho',
                document: '27084098000169',
                bank: 'Sicoob',
                bank_agency: '123-x',
                bank_account: '432-1',
                pix_key_type: 'CNPJ',
                pix_key: '27084098000169',
                email: 'financeiro@transfeera.com',
                created_at: new Date(),
                updated_at: null
            };
            jest.spyOn(receiverRepository, 'createReceiver').mockResolvedValue(mockCreatedReceiver);

            const result = await service.createReceiver(createReceiverDTO);

            expect(result).toEqual(mockCreatedReceiver);
        });

        it('should create a receiver with Email', async () => {
            const createReceiverDTO: CreateReceiverDTO = {
                name: 'Guilherme Damian Verdasca',
                document: '06795621928',
                bank: 'Inter',
                bank_agency: '0814-0',
                bank_account: '01002713-9',
                pix_key_type: 'email',
                pix_key: 'gui.verdasca@gmail.com',
                email: 'gui.verdasca@gmail.com',
            };
            const mockCreatedReceiver: Receiver = {
                id: '60e9e428-71eb-4245-ad0b-342e65e836cf',
                name: 'Guilherme Damian Verdasca',
                status: 'Rascunho',
                document: '06795621928',
                bank: 'Inter',
                bank_agency: '0814-0',
                bank_account: '01002713-9',
                pix_key_type: 'email',
                pix_key: 'gui.verdasca@gmail.com',
                email: 'gui.verdasca@gmail.com',
                created_at: new Date(),
                updated_at: null
            };
            jest.spyOn(receiverRepository, 'createReceiver').mockResolvedValue(mockCreatedReceiver);

            const result = await service.createReceiver(createReceiverDTO);

            expect(result).toEqual(mockCreatedReceiver);
        });

        it('should create a receiver with CHAVE ALEATORIA', async () => {
            const createReceiverDTO: CreateReceiverDTO = {
                name: 'Rodrigo Kratzerr',
                document: '08815211118',
                bank: 'Nubank',
                bank_agency: '1000',
                bank_account: '501002713-9',
                pix_key_type: 'CHAVE_ALEATORIA',
                pix_key: '123e4567-e89b-12d3-a456-426614174000',
                email: 'rodrigo.kratzer@gmail.com',
            };
            const mockCreatedReceiver: Receiver = {
                id: '60e9e428-71eb-4245-ad0b-342e65e836cf',
                name: 'Rodrigo Kratzerr',
                status: 'Rascunho',
                document: '08815211118',
                bank: 'Nubank',
                bank_agency: '1000',
                bank_account: '501002713-9',
                pix_key_type: 'CHAVE_ALEATORIA',
                pix_key: '123e4567-e89b-12d3-a456-426614174000',
                email: 'rodrigo.kratzer@gmail.com',
                created_at: new Date(),
                updated_at: null
            };
            jest.spyOn(receiverRepository, 'createReceiver').mockResolvedValue(mockCreatedReceiver);

            const result = await service.createReceiver(createReceiverDTO);

            expect(result).toEqual(mockCreatedReceiver);
        });

        it('should create a receiver with TELEFONE', async () => {
            const createReceiverDTO: CreateReceiverDTO = {
                name: 'Bruno Alves Botelho',
                document: '13949999999',
                bank: 'Inter',
                bank_agency: '1234',
                bank_account: '56789-0',
                pix_key_type: 'TELEFONE',
                pix_key: '31975223474',
                email: 'bruno.botelho@gmail.com',
            };
            const mockCreatedReceiver: Receiver = {
                id: '60e9e428-71eb-4245-ad0b-342e65e836cf',
                name: 'Bruno Alves Botelho',
                status: 'Rascunho',
                document: '13949999999',
                bank: 'Inter',
                bank_agency: '1234',
                bank_account: '56789-0',
                pix_key_type: 'TELEFONE',
                pix_key: '31975223474',
                email: 'bruno.botelho@gmail.com',
                created_at: new Date(),
                updated_at: null
            };
            jest.spyOn(receiverRepository, 'createReceiver').mockResolvedValue(mockCreatedReceiver);

            const result = await service.createReceiver(createReceiverDTO);

            expect(result).toEqual(mockCreatedReceiver);
        });

    });

    describe('updateReceiver', () => {
        it('should update a receiver with status Rascunho', async () => {
            const receiverId = '99e9e428-71eb-4245-ad0b-342e65e836cg';

            const updateReceiverDTO: UpdateReceiverDTO = {
                name: 'Bruno Alves Botelho',
                document: '13949999999',
                bank: 'Inter',
                bank_agency: '1234',
                bank_account: '56789-0',
                pix_key_type: 'TELEFONE',
                pix_key: '31975223474',
                email: 'bruno.botelho@gmail.com',
            };

            const mockReceiver: Receiver = {
                id: receiverId,
                name: 'Bruno Alves Botelho',
                status: 'Rascunho',
                document: '08815211118',
                bank: 'Nubank',
                bank_agency: '1000',
                bank_account: '501002713-9',
                pix_key_type: 'CHAVE_ALEATORIA',
                pix_key: '123e4567-e89b-12d3-a456-426614174000',
                email: 'bruno.botelhob@transfeera.com',
                created_at: new Date(),
                updated_at: null
            };

            const updatedReceiver: Receiver = {
                id: receiverId,
                name: 'Bruno Alves Botelho',
                status: 'Rascunho',
                document: '13949999999',
                bank: 'Inter',
                bank_agency: '1234',
                bank_account: '56789-0',
                pix_key_type: 'TELEFONE',
                pix_key: '31975223474',
                email: 'bruno.botelho@gmail.com',
                created_at: new Date(),
                updated_at: null
            };
            jest.spyOn(receiverRepository, 'findReceiverById').mockResolvedValue(mockReceiver);
            jest.spyOn(receiverRepository, 'updateReceiver').mockResolvedValue(updatedReceiver);

            const result = await service.updateReceiver(receiverId, updateReceiverDTO);


            expect(receiverRepository.findReceiverById).toHaveBeenCalledWith(receiverId);
            expect(receiverRepository.updateReceiver).toHaveBeenCalledWith(receiverId, updateReceiverDTO);
            expect(result).toEqual(updatedReceiver);
        });

        it('should not update a receiver with status Validado', async () => {
            const receiverId = '99e9e428-71eb-4245-ad0b-342e65e836cg';

            const updateReceiverDTO: UpdateReceiverDTO = {
                name: 'Bruno Alves Botelho',
                document: '13949999999',
                bank: 'Inter',
                bank_agency: '1234',
                bank_account: '56789-0',
                pix_key_type: 'TELEFONE',
                pix_key: '31975223474',
                email: 'bruno.botelho@gmail.com',
            };

            const mockReceiver: Receiver = {
                id: receiverId,
                name: 'Bruno Alves Botelho',
                status: 'Validado',
                document: '08815211118',
                bank: 'Nubank',
                bank_agency: '1000',
                bank_account: '501002713-9',
                pix_key_type: 'CHAVE_ALEATORIA',
                pix_key: '123e4567-e89b-12d3-a456-426614174000',
                email: 'bruno.botelhob@transfeera.com',
                created_at: new Date(),
                updated_at: null
            };

            const updatedReceiver: Receiver = {
                id: receiverId,
                name: 'Bruno Alves Botelho',
                status: 'Rascunho',
                document: '13949999999',
                bank: 'Inter',
                bank_agency: '1234',
                bank_account: '56789-0',
                pix_key_type: 'TELEFONE',
                pix_key: '31975223474',
                email: 'bruno.botelho@gmail.com',
                created_at: new Date(),
                updated_at: null
            };
            jest.spyOn(receiverRepository, 'findReceiverById').mockResolvedValue(mockReceiver);
            jest.spyOn(receiverRepository, 'updateReceiver').mockResolvedValue(updatedReceiver);

            const exception = new BadRequestException('Only email can be updated for validated receivers')
            await expect(service.allowUpdate(mockReceiver, updateReceiverDTO)).rejects.toThrow(exception);

        });


        it('should  update only the email for a receiver with status Validado', async () => {
            const receiverId = '99e9e428-71eb-4245-ad0b-342e65e836cg';

            const updateReceiverDTO: UpdateReceiverDTO = {
                email: 'bruno.changedo@gmail.com',
            };

            const mockReceiver: Receiver = {
                id: receiverId,
                name: 'Bruno Alves Botelho',
                status: 'Validado',
                document: '08815211118',
                bank: 'Nubank',
                bank_agency: '1000',
                bank_account: '501002713-9',
                pix_key_type: 'CHAVE_ALEATORIA',
                pix_key: '123e4567-e89b-12d3-a456-426614174000',
                email: 'bruno.botelhob@transfeera.com',
                created_at: new Date(),
                updated_at: null
            };

            const updatedReceiver: Receiver = {
                id: receiverId,
                name: 'Bruno Alves Botelho',
                status: 'Rascunho',
                document: '13949999999',
                bank: 'Inter',
                bank_agency: '1234',
                bank_account: '56789-0',
                pix_key_type: 'TELEFONE',
                pix_key: '31975223474',
                email: 'bruno.changedo@gmail.com',
                created_at: new Date(),
                updated_at: null
            };
            jest.spyOn(receiverRepository, 'findReceiverById').mockResolvedValue(mockReceiver);
            jest.spyOn(receiverRepository, 'updateReceiver').mockResolvedValue(updatedReceiver);

            const result = await service.updateReceiver(receiverId, updateReceiverDTO);


            expect(receiverRepository.findReceiverById).toHaveBeenCalledWith(receiverId);
            expect(receiverRepository.updateReceiver).toHaveBeenCalledWith(receiverId, updateReceiverDTO);
            expect(result).toEqual(updatedReceiver);

        });

        it('should throw BadRequestException when trying to update fields other than email for "Validado" status', async () => {
            const receiverId = '99e9e428-71eb-4245-ad0b-342e65e836cg';

            const updateReceiverDTO: UpdateReceiverDTO = {
                name: 'Brnuo N',
            };

            const mockReceiver: Receiver = {
                id: receiverId,
                name: 'Bruno Alves Botelho',
                status: 'Validado',
                document: '08815211118',
                bank: 'Nubank',
                bank_agency: '1000',
                bank_account: '501002713-9',
                pix_key_type: 'CHAVE_ALEATORIA',
                pix_key: '123e4567-e89b-12d3-a456-426614174000',
                email: 'bruno.botelhob@transfeera.com',
                created_at: new Date(),
                updated_at: null
            };

            jest.spyOn(receiverRepository, 'findReceiverById').mockResolvedValue(mockReceiver);

            const exception = new BadRequestException('Only email can be updated for validated receivers');
            await expect(service.updateReceiver(receiverId, updateReceiverDTO)).rejects.toThrow(exception);
        });



        it('should throw BadRequestException when receiver not found', async () => {
            const receiverId = 'non-existing-id';
            const updateReceiverDTO: UpdateReceiverDTO = {
            };
            jest.spyOn(receiverRepository, 'findReceiverById').mockResolvedValue(null);

            await expect(service.updateReceiver(receiverId, updateReceiverDTO)).rejects.toThrow(NotFoundException);
        });

    });

    describe('deleteReceivers', () => {
        it('should delete receivers by IDs', async () => {
            const deleteReceiversDTO: DeleteReceiversDTO = {
                ids: ['id1', 'id2', 'id3'],
            };
            jest.spyOn(receiverRepository, 'deleteReceiversByIds').mockResolvedValue(undefined);


            await service.deleteReceivers(deleteReceiversDTO);

            expect(receiverRepository.deleteReceiversByIds).toHaveBeenCalledWith(deleteReceiversDTO);
        });
    });



});

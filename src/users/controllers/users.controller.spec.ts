import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from './../../products/products.module.js';
import { UserService } from './../services/user.service.js';
import { UsersController } from './users.controller.js';

describe('UsersController', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ProductsModule],
            controllers: [UsersController],
            providers: [UserService],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

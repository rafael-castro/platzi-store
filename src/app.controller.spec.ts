import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppModule } from './app.module.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule, DatabaseModule],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    });

    describe('greetings', () => {
        it('should return "hey"', () => {
            expect(appController.getGreetings()).toBe('hey');
        });
    });
});

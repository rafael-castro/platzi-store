import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';
import { assert } from 'console';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    it('/greetings (GET)', () => {
        return request(app.getHttpServer())
            .get('/greetings')
            .expect(200)
            .expect('hey');
    });
});

describe('CategoriesController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/categories (GET)', () => {
        return request(app.getHttpServer())
            .get('/categories')
            .expect(200)
            .expect([]);
    });

    it('/categories/1 (GET)', (done) => {
        request(app.getHttpServer())
            .get('/categories/1')
            .expect(404)
            .then((response) => {
                assert(response.body.statusCode, 404);
                done();
            })
            .catch((err) => done(err));
    });
});

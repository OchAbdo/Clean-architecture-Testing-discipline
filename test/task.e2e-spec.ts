import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('TaskController (e2e)', () => {
    let app: INestApplication<App>;
    let id: number;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /task/add', async () => {
        const res = await request(app.getHttpServer())
            .post('/task/add')
            .send({
                title: 'E2E Task',
                description: 'Task created by e2e test',
                isArchived: false
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('E2E Task');
        id = res.body.id

    });

    it('GET /task/all', async () => {
        const res = await request(app.getHttpServer())
            .get('/task/all')
            .expect(200);


        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /task/pagination', async () => {
        const res = await request(app.getHttpServer())
            .get('/task/pagination')
            .query({ page: 1, limit: 5 })
            .expect(200);

        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('meta');
    });

    it('GET /task/search?title=E2E Task', async () => {
        const res = await request(app.getHttpServer())
            .get('/task/search')
            .query({ title: 'E2E Task' })
            .expect(200);

        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].title).toContain('E2E');
    });

    it('PATCH /task/update/:id', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/task/update/${id}`)
            .send({
                title: 'Updated Task E2E',
            })
            .expect(200);

        expect(res.body.title).toBe('Updated Task E2E');
    });

    it('DELETE /task/:id', async () => {
        await request(app.getHttpServer())
            .delete(`/task/${id}`)
            .expect(200);
    });

});

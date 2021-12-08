import supertest from '../../../test/supertest';

describe('/notification API', () => {
    describe(':GET', () => {
        it('should return all notifications', async () => {
            expect.assertions(3);
            try {
                const res = await supertest.get('/api/v1/notification');

                expect(res.status).toBe(200);

                expect(res.body).toHaveProperty('notifications');
                expect(res.body.notifications).toBe([
                    {
                        id: 1,
                        typeId: 1,
                        subject: 'test',
                        body: 'test boadsdasdadsdy',
                        reminderMinutes: null,
                        updated_at: 1638906401769,
                    },
                    {
                        id: 2,
                        typeId: 1,
                        subject: 'test',
                        body: 'test body',
                        reminderMinutes: null,
                        updated_at: 1638905945695,
                    },
                ]);
            } finally {
                //
            }
        });
    });

    describe(':POST', () => {
        it('should return the id and location of the newly inserted notification', async () => {
            expect.assertions(3);
            try {
                const res = await supertest.post('/api/v1/notification').send({
                    subject: 'test subject',
                    body: 'test body',
                    typeId: 1,
                });

                expect(res.status).toBe(201);

                expect(res.body).toHaveProperty('id');
                expect(res.header.location).toBe(`/api/v1/notification/n/${res.body.id}`);
            } finally {
                //
            }
        });
    });

    describe(':PATCH', () => {
        it('should return the location of the updated notification', async () => {
            expect.assertions(3);
            try {
                const res = await supertest.post('/api/v1/notification').send({
                    subject: 'test subject',
                    body: 'test body',
                    typeId: 1,
                });

                expect(res.status).toBe(201);

                expect(res.body).toHaveProperty('id');
                expect(res.header.location).toBe(`/api/v1/notification/n/${res.body.id}`);
            } finally {
                //
            }
        });
    });
});

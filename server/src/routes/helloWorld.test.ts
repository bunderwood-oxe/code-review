import supertest from '../../../test/supertest';

describe('/helloWorld API', () => {
    it('should return a friendly response', async () => {
        expect.assertions(3);
        try {
            const res = await (await supertest.post('/api/v1/helloworld')).body({ city: "London", date: new Date()});

            expect(res.status).toBe(200);

            expect(res.body).toBe("Hello from London! the date is 03/11/2021")
        } finally {
            //
        }
    });
});

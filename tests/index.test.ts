import { app, server } from '../src/index';
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const request = require('supertest'); // Require import to prevent type error with supertest

const V2_API = '/api/v2';
const TEST_JWT_KEY = process.env.JWT_FOR_TEST || '';

describe('GET /', () => {
  afterAll(() => {
    server.close(); // Close the server to prevent open handle issues with Jest
  });

  it('should return Hello, Welcome!', async () => {
    // Make a GET request to the root endpoint ('/')
    const res = await request(app).get('/');

    // Assert that the HTTP status code of the response is 200 (OK)
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello, Welcome');
  });
});

describe(`POST ${V2_API}/a2p`, () => {
  afterAll(() => {
    server.close(); // Close the server to prevent open handle issues with Jest
  });

  // This is an individual test case
  it('should return message and id!', async () => {
    // Make a POST request to the endpoint ('/a2p')
    const res = await request(app)
      .post(`${V2_API}/a2p`)
      .set('Authorization', `Bearer ${TEST_JWT_KEY}`);

    // Assert that the HTTP status code of the response is 200 (OK)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: 'message queued successfully',
      id: '1234567890',
    });
  });
});

describe(`POST ${V2_API}/otp`, () => {
  afterAll(() => {
    server.close();
  });

  it('should return message and id!', async () => {
    // Make a POST request to the endpoint ('/otp')
    const res = await request(app)
      .post(`${V2_API}/otp`)
      .set('Authorization', `Bearer ${TEST_JWT_KEY}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: 'OTP message queued successfully',
      id: '1234567890',
    });
  });
});

describe(`POST ${V2_API}/otp/verify`, () => {
  afterAll(() => {
    server.close();
  });

  it('should return message and id!', async () => {
    // Make a POST request to the endpoint ('/otp/verify')
    const res = await request(app)
      .post(`${V2_API}/otp/verify`)
      .set('Authorization', `Bearer ${TEST_JWT_KEY}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: 'OTP is valid',
    });
  });
});

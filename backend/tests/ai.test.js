import request from 'supertest';
import app from '../src/app.js';

// mock del service de OpenAI
jest.mock('../src/services/openai.service.js', () => ({
  improveText: jest.fn(),
}));

import { improveText } from '../src/services/openai.service.js';

describe('POST /api/ai/improve-description', () => {
  it('devuelve texto mejorado', async () => {
    improveText.mockResolvedValue('Texto mejorado');

    const res = await request(app)
      .post('/api/ai/improve-description')
      .send({ text: 'texto viejo' });

    expect(res.statusCode).toBe(200);
    expect(res.body.improvedText).toBe('Texto mejorado');
  });

  it('devuelve 400 si no hay texto', async () => {
    const res = await request(app)
      .post('/api/ai/improve-description')
      .send({});

    expect(res.statusCode).toBe(400);
  });
});
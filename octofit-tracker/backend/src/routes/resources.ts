import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter<T>(
  resourceModel: Model<T>,
  sort: Record<string, 1 | -1> = {},
) {
  const router = Router();

  router.get('/', async (_request, response) => {
    const records = await resourceModel.find().sort(sort).lean();
    response.json(records);
  });

  router.get('/:id', async (request, response) => {
    const record = await resourceModel.findById(request.params.id).lean();
    if (!record) {
      response.status(404).json({ message: 'Record not found' });
      return;
    }

    response.json(record);
  });

  router.post('/', async (request, response) => {
    const record = await resourceModel.create(request.body);
    response.status(201).json(record);
  });

  return router;
}
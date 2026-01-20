import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ ok: true, route: 'property' });
});

export default router;

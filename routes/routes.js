import express from 'express';
import artistData from '../controllers/index.js';

const router = express.Router();

router.get('/:id', artistData);

export default router;

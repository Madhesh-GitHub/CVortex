import express from 'express';
import { analyzeJobDescription } from '../Controllers/jdAnalyzer.js';

const router = express.Router();

router.post('/analyze', analyzeJobDescription);

export default router;
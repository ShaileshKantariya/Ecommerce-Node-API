import express from 'express';
import { Request, Response } from 'express';
import authRoutes from './authRoutes';
//import { requestLogger } from '../middlewares/requestLogger';


const router = express.Router();
//router.use(requestLogger);

router.use('/test', (req: any, res: any) => {
	return res.json({ data: 'Hello world!' });
});

router.use('/auth', authRoutes);


export default router;
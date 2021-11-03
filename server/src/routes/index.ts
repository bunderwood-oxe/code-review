import { logger } from '../services';
import heartbeat from './heartbeat';
import helloWorld from './helloWorld';
import express from 'express';

import type { Request, Response, NextFunction } from 'express';
import type { HttpException } from '../utils';

const router = express.Router();

router.use('/', heartbeat);
router.use('/', helloWorld)

router.use(function (err: HttpException, req: Request, res: Response, next: NextFunction) {
    // global error handler
    if (err) logger.error('uncaught route error', { route: req.url, error: err });
    res.status(err.status || 500);
    res.end();
    next();
});

export default router;

import express from 'express';
import controller from '../controllers';

const router = express.Router();

router.post('/v1/helloworld', controller.helloworld);

export default router;

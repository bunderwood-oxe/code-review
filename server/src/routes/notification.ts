import express from 'express';
import controller from '../controllers';

const router = express.Router();

router.get('/v1/notification', controller.notificationController.get);
router.post('/v1/notification', controller.notificationController.insert);

router.get('/v1/notification/n/:id', controller.notificationController.findById);

export default router;

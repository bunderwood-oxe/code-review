import notificationModel from '../models/notification';

import path from 'path';

import type { Request, Response } from 'express';
import type { Notification } from '../models/notification';

const notificationController = {
    get: async (_req: Request, res: Response): Promise<void> => {
        const notifications = await notificationModel.get();
        return void res.status(200).send({ notifications });
    },

    findById: async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        if (!id || isNaN(id)) {
            return void res.status(400).send();
        }
        const notification = await notificationModel.findById(id);
        if (!notification) {
            return void res.status(404).send();
        } else return void res.status(200).send({ notification });
    },

    insert: async (req: Request, res: Response): Promise<void> => {
        const newNotification = req.body;
        if (!newNotification || !instanceOfNotification(newNotification)) {
            return void res.status(400).send();
        } else {
            const newNotificationId = await notificationModel.insert([newNotification]);
            const notificationPath = path.posix.join(req.originalUrl, 'n', newNotificationId[0].toString());
            return void res.location(notificationPath).status(201).send({ id: newNotificationId[0] });
        }
    },
};

export default notificationController;

function instanceOfNotification(object: unknown): object is Notification {
    return (
        Object.prototype.hasOwnProperty.call(object, 'typeId') &&
        Object.prototype.hasOwnProperty.call(object, 'subject') &&
        Object.prototype.hasOwnProperty.call(object, 'body')
    );
}

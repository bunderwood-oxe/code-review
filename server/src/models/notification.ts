import moment from 'moment';
import db from '../../db/db';
import { logger } from '../services';

export interface Notification {
    id: number;
    typeId: number;
    subject: string;
    body: string;
    reminderMinutes?: number;
    updated_at: number;
}

const notificationTbl = 'notification';

const notificationModel = {
    get: async function (): Promise<Notification[]> {
        try {
            return await db()(notificationTbl).select();
        } catch (err) {
            logger.error({ error: err, function: 'notification#get' });
            throw err;
        }
    },

    findById: async function (id: number): Promise<Notification[]> {
        try {
            return await db()(notificationTbl).select().where('id', id);
        } catch (err) {
            logger.error({ error: err, function: 'notification#get' });
            throw err;
        }
    },

    insert: async function (notifications: Omit<Notification, 'id' | 'updated_at'>[]): Promise<number[]> {
        try {
            if (!Array.isArray(notifications)) notifications = [notifications];

            const newNotifications = notifications.map(notification => ({
                ...notification,
                updated_at: moment().valueOf(),
            }));

            return await db()(notificationTbl).insert(newNotifications);
        } catch (err) {
            logger.error({ error: err, function: 'notification#insert' });
            throw err;
        }
    },

    updateById: async function (id: number, updates: Partial<Notification>): Promise<number> {
        try {
            return await db()(notificationTbl)
                .queryContext({ queryName: 'notification#updateById' })
                .where('id', id)
                .update({
                    // knex update skips undefined values
                    subject: updates.subject,
                    body: updates.body,
                    reminderMinutes: updates.reminderMinutes,
                    updated_at: moment().valueOf(),
                });
        } catch (err) {
            logger.error({ error: err, function: 'notification#updateById' });
            throw err;
        }
    },
};

export default notificationModel;

import express from 'express';
import routes from './routes';
import cors from 'cors';

import { socket, logger } from './services';

import type { Server } from 'http';

const { Api_Port, Api_Host } = process.env;

function startServer(): Server {
    const PORT = Api_Port ? parseInt(Api_Port) : 3010;
    const HOST = Api_Host || 'localhost';

    const server = app.listen({ port: PORT }, () => {
        logger.info(`Express Server is now running on http://${HOST}:${PORT}`);
    });

    socket(server);

    return server;
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

export { startServer };

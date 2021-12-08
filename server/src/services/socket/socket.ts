import http from 'http';
import { Server as socket } from 'socket.io';

const init = (app: http.Server): socket => {
    const socketServer = new socket(app, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
        serveClient: false,
    });

    // begin code challenge actions
    setInterval(() => socketServer.emit('roomState', getRoomState()), 1000);
    setInterval(() => i++, 5000);
    return socketServer;
};

let i = 0;

const states = ['In Room', 'In Bed', 'In Room', 'Out Of Room'];

function getRoomState() {
    return {
        room1: {
            state: states[(i + 0) % 4],
            timestampMs: Date.now(),
        },
        room2: {
            state: states[(i + 1) % 4],
            timestampMs: Date.now(),
        },
        room3: {
            state: states[(i + 2) % 4],
            timestampMs: Date.now(),
        },
    };
}

export default init;

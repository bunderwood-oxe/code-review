import { io } from 'socket.io-client';

const socketClient = () => {
    return io('ws://localhost:3010', {
        autoConnect: true,
    });
};

export default socketClient;

import React, { useContext } from 'react';

export const SocketContext = React.createContext(/** @type {Socket | undefined} */ (undefined));

export function useSocket() {
    const socket = useContext(SocketContext);
    if (!socket) throw new Error('Socket not defined');
    return socket;
}

export default SocketContext;

/**
 * @typedef {import('socket.io-client').Socket} Socket
 */

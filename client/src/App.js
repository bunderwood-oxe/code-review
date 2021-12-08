import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import SocketContext from './context/socketContext';
import socket from './services/socket/socket';
import { receiveSocketConnectionStatus } from './reducers/connectionStatus';

import Rooms from './components/Rooms';

const App = () => {
    const dispatch = useDispatch();

    const [socketClient, setSocketClient] = useState();

    useEffect(() => {
        setSocketClient(socket());
    }, []);

    useEffect(() => {
        socketClient && dispatch(receiveSocketConnectionStatus(socketClient));
    }, [socketClient]);

    const connectionStatus = useSelector(state => state.connectionStatus, shallowEqual);

    return (
        <SocketContext.Provider value={socketClient}>
            {socketClient && (
                <div>
                    <h2>App</h2>
                    <p>
                        <strong>socket connected: </strong> {connectionStatus.connected.toString()}
                    </p>
                    <Rooms />
                </div>
            )}
        </SocketContext.Provider>
    );
};

export default App;

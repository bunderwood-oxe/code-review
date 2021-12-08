import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSocket } from '../context/socketContext';
import { receiveSocketRoomState } from '../reducers/roomState';

import Room from './Room';

const rooms = () => {
    const socket = useSocket();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveSocketRoomState(socket));
    }, []);

    const roomStates = useSelector(state => state.roomStates);

    const rooms = roomStates.state ? Object.keys(roomStates?.state) : [];

    return (
        <div>
            <h2>Rooms</h2>
            {rooms.map(room => {
                const roomState = roomStates.state[room];
                return (
                    <Room
                        key={room}
                        roomName={room}
                        roomState={roomState.state}
                        stateTimestampMs={roomState.timestampMs}
                    />
                );
            })}
        </div>
    );
};

export default rooms;

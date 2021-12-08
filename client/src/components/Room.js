import React from 'react';

const room = ({ roomName, roomState, stateTimestampMs }) => {
    return (
        <div>
            <strong>{roomName}</strong> {roomState} - {new Date(stateTimestampMs).toLocaleTimeString()}
        </div>
    );
};

export default room;

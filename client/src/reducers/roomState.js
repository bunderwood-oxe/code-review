import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    connected: false,
    states: {},
};

const roomStateSlice = createSlice({
    name: 'roomState',
    initialState,
    reducers: {
        setRoomState: (state, action) => ({
            connected: true,
            state: { ...action.payload },
        }),
    },
});

export const { setRoomState } = roomStateSlice.actions;

export default roomStateSlice.reducer;

export const receiveSocketRoomState = socket => dispatch => {
    socket.on('roomState', roomStates => dispatch(setRoomState(roomStates)));
};

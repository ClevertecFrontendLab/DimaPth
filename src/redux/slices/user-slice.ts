import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/user';

const initialState: IUser = {
    jwt: '',
    user: {
        id: 0,
        username: '',
        email: '',
        provider: '',
        confirmed: false,
        blocked: false,
        createdAt: '',
        updatedAt: '',
        firstName: '',
        lastName: '',
        phone: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        setUser (state, action) {
            state.jwt = action.payload.jwt; // eslint-disable-line no-param-reassign
            state.user = action.payload.user; // eslint-disable-line no-param-reassign 
        },
        removeUser(state) {
            state.jwt = ''; // eslint-disable-line no-param-reassign 
            state.user = initialState.user // eslint-disable-line no-param-reassign 
        }
    }
})

export const {setUser} = userSlice.actions;
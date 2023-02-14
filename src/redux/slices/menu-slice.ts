import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isMenuOpen: boolean;
}

const initialState: MenuState = {
    isMenuOpen: false
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers : {
        setMenu (state, action) {
            state.isMenuOpen = action.payload; // eslint-disable-line no-param-reassign
        }
    }
})

export const {setMenu} = menuSlice.actions;
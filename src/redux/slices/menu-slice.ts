import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isMenuOpen: boolean;
    category: string;
}


const initialState: MenuState = {
    isMenuOpen: false,
    category: 'Все книги'
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers : {
        setMenu (state, action) {
            state.isMenuOpen = action.payload; // eslint-disable-line no-param-reassign
        },
        setCategory (state, action) {
            state.category = action.payload; // eslint-disable-line no-param-reassign
        }
    }
})

export const {setMenu, setCategory} = menuSlice.actions;
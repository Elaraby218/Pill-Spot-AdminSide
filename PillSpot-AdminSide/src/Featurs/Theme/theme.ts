import { createSlice } from "@reduxjs/toolkit";

interface IIstate {
    theme : 'light' | 'dark' ;
}

const initialState : IIstate = {
    theme : 'dark' ,
}

export const ThemeSlice = createSlice({
    name : 'themeSlice',
    initialState,
    reducers : {
        changeTheme : (state) => {
            if(state.theme ==='dark') state.theme = 'light' 
            else state.theme = 'dark'
        }
    }

});

export const {changeTheme} = ThemeSlice.actions ;
export default ThemeSlice.reducer ;
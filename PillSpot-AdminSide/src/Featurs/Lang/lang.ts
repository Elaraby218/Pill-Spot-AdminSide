import { createSlice } from "@reduxjs/toolkit";

interface IIstate {
    lang : 'ar' | 'en' ;
}

const initialState : IIstate = {
    lang : 'en' ,
}

export const LangSlice = createSlice({
    name : 'langSlice',
    initialState,
    reducers : {
        changeLang : (state) => {
            if(state.lang ==='en') state.lang = 'ar' 
            else state.lang = 'en'
        }
    }

});

export const {changeLang} = LangSlice.actions ;
export default LangSlice.reducer ;
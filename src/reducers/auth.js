import { createSlice } from '@reduxjs/toolkit';

const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;


const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = {
    name: 'auth',
    initialState,
    reducers: {
        /* define your reducer functions here */
        setUser: (state, { payload }) => {
            if (payload?.autoID) {
                state.user = payload;
                state.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(payload));
            }
        },
        logout: () => ({
            isLoggedIn: false,
            user: null,
            isSessionExpired: false,
            isEnoughPermission: false,
        }),
    },
};

const { reducer, actions } = createSlice(authSlice);
export const {
    setUser,
    logout,
} = actions;
export default reducer;

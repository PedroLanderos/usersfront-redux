import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    userId: null,
    name: null,
    email: null,
    role: null,
    token: null,
    expiresAt: null,
    isAuthenticated: false,
};

//crear el slice

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const token = action.payload;
            const decoded = jwtDecode(token);

            state.userId = decoded.UserId;
            state.name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            state.email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
            state.role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            state.expiresAt = decoded.exp;
            state.token = token;
            state.isAuthenticated = true;

            localStorage.setItem('token', token);
        },
        logout: (state) =>{
            state.userId = null;
            state.name = null;
            state.email = null;
            state.role = null;
            state.token = null;
            state.expiresAt = null;
            state.isAuthenticated = false;

            localStorage.removeItem('token');
        },

        loadFromStorage: (state) =>{
            const token = localStorage.getItem('token');
            if(token)
            {
                const decoded = jwtDecode(token);
                state.userId = decoded.UserId;
                state.name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                state.email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
                state.role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                state.expiresAt = decoded.exp;
                state.token = token;
                state.isAuthenticated = true;
            }   
        }
    }
});

export const {setCredentials, logout, loadFromStorage} = authSlice.actions;
export default authSlice.reducer;
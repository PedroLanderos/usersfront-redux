import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from './usersApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
});


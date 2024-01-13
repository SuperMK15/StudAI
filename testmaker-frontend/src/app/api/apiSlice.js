import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice';

const apiBaseUrl = (process.env.NODE_ENV === 'production' ? 'N/A' : 'http://localhost:3500/');

const baseQuery = fetchBaseQuery({
    baseUrl: apiBaseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) headers.set('authorization', `Bearer ${token}`);
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 403) {
        console.log('Reauthenticating...');
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult?.data) {
            console.log('Reauthentication successful, retrying original request...');
            api.dispatch(setCredentials({ ...refreshResult.data }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.message = 'Your session has expired. Please log in again.';
            }
            return refreshResult;
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Query', 'Users', 'Queries'],
    endpoints: (builder) => ({})
});
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const queriesAdapter = createEntityAdapter();

const initialState = queriesAdapter.getInitialState();

export const queriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQueries: builder.query({
            query: () => '/queries',
            transformResponse: (responseData) => {
                const loadedQueries = responseData.map((query) => {
                    query.id = query._id;
                    return query;
                });
                return queriesAdapter.setAll(initialState, loadedQueries);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        {type: 'Queries', id: 'LIST'},
                        ...result.ids.map((id) => ({type: 'Query', id}))
                    ]
                } else {
                    return [{type: 'Queries', id: 'LIST'}]
                }
            }
        }),

        getQueryByUserId: builder.query({
            query: (userId) => `/queries/${userId}`,
            transformResponse: (responseData) => {
                const loadedQueries = responseData.map((query) => {
                    query.id = query._id;
                    return query;
                });
                return queriesAdapter.setAll(initialState, loadedQueries);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        {type: 'Queries', id: 'LIST'},
                        ...result.ids.map((id) => ({type: 'Query', id}))
                    ]
                } else {
                    return [{type: 'Queries', id: 'LIST'}]
                }
            }
        }),

        addNewQuery: builder.mutation({
            query: newQuery => ({   
                url: '/queries',
                method: 'POST',
                body: { ...newQuery }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Query', id: ard.id}]
        }),

        deleteQuery: builder.mutation({
            query: ({ id }) => ({
                url: `/queries`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Query', id: arg.id}]
        })
    })
});


export const {
    useGetQueriesQuery,
    useGetQueryByUserIdQuery,
    useAddNewQueryMutation,
    useDeleteQueryMutation
} = queriesApiSlice;

export const selectQueryResult = queriesApiSlice.endpoints.getQueries.select();

const selectQueryData = createSelector(
    selectQueryResult,
    queryResult => queryResult.data
);

export const {
    selectAll: selectAllQueries,
    selectById: selectQueryById,
    selectIds: selectQueryIds
} = queriesAdapter.getSelectors(state => selectQueryData(state) || initialState);
import { store } from '../../app/store';
import { queriesApiSlice } from '../queries/queriesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('mounting...');
        const queries = store.dispatch(queriesApiSlice.endpoints.getQueries.initiate());

        return () => {
            console.log('unmounting...');
            queries.unsubscribe();
        }
    }, []);

    return <Outlet />;
}  

export default Prefetch;
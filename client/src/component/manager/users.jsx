import React from 'react';
import { useGetUsersQuery } from '../../features/user/userApiSlice';
import UserList from './usersList';
import NavManager from './navManager';
import { ProgressSpinner } from 'primereact/progressspinner';
const Users = () => {

    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetUsersQuery()
    if (isLoading) return <div className="card flex justify-content-center">
        <ProgressSpinner />
    </div>
    if (isError) return <h2>{error}</h2>

    return (
        <>
            <NavManager />
            <UserList />
        </>
    )

}
export default Users


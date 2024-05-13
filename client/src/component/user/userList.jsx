import React from 'react';
import { useGetUsersQuery} from '../../features/user/userApiSlice';
const UserList = () => {
    const {
        data:users,
        isLoading,
        isError,
        error
    } = useGetUsersQuery()
    if (isLoading) return <h1>Loading</h1>
    if(isError) return <h2>{error}</h2>
    return (
        <div className="User-list">
        {users.map((user) => (  <div>{user.username}</div>))}
        </div>

        
    );
};
export default UserList;
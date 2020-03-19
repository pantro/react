import React from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const UserTable = (props) => {
    return(
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {
                    props.users.map(user => (
                        <tr key = {user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>
                            <button className="button muted-button">Edit</button>
                            <button className="button muted-button">Delete</button>
                            </td>
                        </tr>
                    ))        
                }
            </tbody>
        </table>
    );
}

export default UserTable
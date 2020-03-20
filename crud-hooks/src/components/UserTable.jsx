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
                    //Para comprobar que haya usuarios
                    props.users.length > 0 ? (
                        props.users.map(user => (
                            <tr key = {user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>
                                <button 
                                    className="button muted-button"
                                    onClick={() => {props.editRow(user)}}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="button muted-button"
                                    onClick={() => {props.deleteUser(user.id)}}
                                >
                                    Delete</button>
                                </td>
                            </tr>
                        ))        
                    ) : (
                        <tr>
                            <td colSpan={3}>No users</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default UserTable
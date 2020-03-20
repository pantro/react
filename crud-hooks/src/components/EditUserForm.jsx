import React from 'react';
import { useForm } from 'react-hook-form';

const EditUserForm = (props) => {
    const {register, errors, handleSubmit, setValue} = useForm({
        defaultValues: props.currentUser
    });

    setValue('name', props.currentUser.name);
    setValue('username', props.currentUser.username);

    const onSubmit = (data, e) => {
        //Pasando el id
        data.id = props.currentUser.id;
        
        props.updateUser(props.currentUser.id, data);
        // limpiar campos
        e.target.reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input type="text" name="name" ref={
                register({
                    required: {value: true, message: "Campo requerido"}
                })
            }/>
            <span className="text-danger text-small d-block mb-2">
                {errors?.name?.message}
            </span>
            <label>Username</label>
            <input type="text" name="username"  ref={
                register({
                    required: {value: true, message: "Campo requerido"}
                })
            }/>
            <span className="text-danger text-small d-block mb-2">
                {errors?.username?.message}
            </span>
            <button>Edit user</button>
        </form>
    );
}

export default EditUserForm;
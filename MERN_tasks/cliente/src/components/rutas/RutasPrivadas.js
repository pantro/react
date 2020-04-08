import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const RutasPrivadas = ({ component: Component, ...props }) => {
    const authsContext = useContext(authContext);
    const { autenticado, cargando, UsuarioAutenticado } = authsContext;

    useEffect(() => {
        UsuarioAutenticado();
        //Para evitar que mande error por que sabemos que esta bien
        // eslint-disable-next-line
    }, []);

    return (
        <Route
            { ...props } render = { props => !autenticado && !cargando ? (
                <Redirect to="/"/>
            ) : (
                <Component {...props} />
            )}
        />
    );
}

export default RutasPrivadas;